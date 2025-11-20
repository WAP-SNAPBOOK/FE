import React, { useEffect, useMemo, useState } from 'react';
import InputField from './InputField';
import { sanitizeDigits, validateMobile010 } from '../../utils/phoneNumber';
import { todayYMD, validateReservationDateTime } from '../../utils/dateTime';
import './stepBasic.css';

export default function StepBasic({ initialData, onNext, visibleFields }) {
  const [values, setValues] = useState({
    name: '',
    phoneNumber: '',
    date: '',
    time: '',
  });
  //시간 선택 상태
  const [openTimeList, setOpenTimeList] = useState(false);

  const [isComposing, setIsComposing] = useState(false);
  const MAX_NAME = 5;

  const sanitizePhone = (val) => sanitizeDigits(val).slice(0, 11);

  useEffect(() => {
    if (initialData) {
      setValues((v) => ({
        ...v,
        ...initialData,
        name: (initialData.name ?? v.name ?? '').slice(0, MAX_NAME),
        phoneNumber: sanitizePhone(initialData.phoneNumber ?? v.phoneNumber),
      }));
    }
  }, [initialData]);

  const handleNameChange = (e) => {
    const raw = e.target.value;
    setValues((v) => ({
      ...v,
      name: isComposing ? raw : raw.slice(0, MAX_NAME),
    }));
  };
  const handleNameCompositionEnd = (e) => {
    setIsComposing(false);
    setValues((v) => ({ ...v, name: e.target.value.slice(0, MAX_NAME) }));
  };

  const handlePhoneChange = (e) => {
    setValues((v) => ({ ...v, phoneNumber: sanitizePhone(e.target.value) }));
  };

  const STEP_MIN = 30;
  const OPEN_TIME = '09:00';
  const CLOSE_TIME = '22:00';

  const pad2 = (n) => String(n).padStart(2, '0');

  // 30분 간격 타임슬롯 생성 (영업시간 + 오늘이면 현재 이후만)
  const buildTimeSlots = (
    dateStr,
    stepMin = STEP_MIN,
    open = OPEN_TIME,
    closeExclusive = CLOSE_TIME
  ) => {
    const toMinutes = (hhmm) => {
      const [h, m] = hhmm.split(':').map(Number);
      return h * 60 + m;
    };
    const fromMinutes = (mins) => `${pad2(Math.floor(mins / 60))}:${pad2(mins % 60)}`;

    let startMin = toMinutes(open);
    const lastStartMin = toMinutes(closeExclusive) - stepMin; // 22:00 시작 금지 → 21:30까지 허용

    // 오늘이면 현재시간의 다음 30분 경계부터 시작  →  오늘이면 '현재시간 + 1시간' 이후부터 시작
    if (dateStr && dateStr === todayYMD()) {
      const now = new Date();
      const nowMin = now.getHours() * 60 + now.getMinutes();

      // 1시간(60분) 이후를 기준으로 잡기
      const OFFSET_MIN = 60;
      const targetMin = nowMin + OFFSET_MIN;

      // targetMin 이후의 가장 가까운 30분 단위로 올림
      const ceilToStep = Math.ceil(targetMin / stepMin) * stepMin;

      // 영업 시작 시간(startMin)과 비교해서 더 늦은 쪽을 시작 시각으로
      startMin = Math.max(startMin, ceilToStep);
    }

    if (startMin > lastStartMin) return []; // 오늘 남은 슬롯이 없을 때

    const slots = [];
    for (let m = startMin; m <= lastStartMin; m += stepMin) {
      slots.push(fromMinutes(m));
    }
    return slots;
  };

  const timeOptions = useMemo(
    () => buildTimeSlots(values.date, STEP_MIN, OPEN_TIME, CLOSE_TIME),
    [values.date]
  );

  // 옵션 리스트가 바뀌었을 때, 현재 선택값이 범위 밖이면 비웁니다.
  useEffect(() => {
    if (values.time && !timeOptions.includes(values.time)) {
      setValues((v) => ({ ...v, time: '' }));
    }
  }, [timeOptions]);

  useEffect(() => {
    // timeOptions: 09:00~21:30, 오늘이면 현재 이후부터
    if (!values.date) return;
    if (timeOptions.length === 0) {
      if (values.time) setValues((v) => ({ ...v, time: '' }));
      return;
    }
    if (!values.time || !timeOptions.includes(values.time)) {
      setValues((v) => ({ ...v, time: timeOptions[0] })); // 허용된 첫 슬롯 자동 선택
    }
  }, [values.date, timeOptions]);

  // 검증들
  const phoneValid = validateMobile010(values.phoneNumber).valid;
  const dateTimeCheck = validateReservationDateTime(values.date, values.time);
  const isValid = useMemo(() => {
    const { name } = values;
    return name.trim() && phoneValid && dateTimeCheck.valid;
  }, [values, phoneValid, dateTimeCheck.valid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onNext?.(values);
  };

  const handleBasicChange = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const formattedDate = useMemo(() => {
    if (!values.date) return '';
    const d = new Date(values.date);
    return d.toLocaleDateString('ko-KR').replace(/\./g, '.').trim();
  }, [values.date]);

  return (
    <>
      <label className="label">이름</label>
      <InputField
        placeholder="이름을 입력해 주세요."
        value={values.name}
        onChange={handleNameChange}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={handleNameCompositionEnd}
        maxLength={MAX_NAME}
      />

      <label className="label">전화번호</label>
      <InputField
        placeholder="전화번호를 입력해 주세요."
        value={values.phoneNumber}
        onChange={handlePhoneChange}
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={11}
        autoComplete="tel"
      />
      {!phoneValid && values.phoneNumber.length > 0 && (
        <div className="muted">010으로 시작하는 숫자 11자리를 입력해 주세요.</div>
      )}

      <div className="grid2" style={{ marginBottom: 6 }}>
        <label className="label">날짜</label>
        <label className="label">시간</label>

        {/** ===== 날짜 ===== */}
        <div className="selectWrapper">
          <input
            type="date"
            min={todayYMD()}
            className="realInput"
            value={values.date}
            onChange={(e) => handleBasicChange('date', e.target.value)}
          />

          <div className="fakeInput">
            <span>{formattedDate || '날짜 선택'}</span>
            <span className="arrow">▼</span>
          </div>
        </div>

        {/** ===== 시간 ===== */}
        <div className="selectWrapper">
          <div className="fakeInput" onClick={() => setOpenTimeList((o) => !o)}>
            <span>{values.time || '시간 선택'}</span>
            <span className="arrow">▼</span>
          </div>

          {/* 타임슬롯 리스트 */}
          {openTimeList && (
            <div className="dropdown">
              {timeOptions.map((t) => (
                <div
                  key={t}
                  className="option-1"
                  onClick={() => {
                    handleBasicChange('time', t);
                    setOpenTimeList(false);
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 날짜/시간 에러 메시지 */}
      {!dateTimeCheck.valid && values.date && values.time && (
        <div className="muted">
          {dateTimeCheck.reason === 'format'
            ? '날짜/시간 형식이 올바르지 않습니다.'
            : '현재 시각 이전으로는 예약할 수 없습니다.'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="submitRow">
        <button type="submit" className="submitBtn" disabled={!isValid}>
          다음
        </button>
      </form>
    </>
  );
}
