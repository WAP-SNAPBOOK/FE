import React, { useEffect, useMemo, useState } from "react";
import InputField from "./InputField";
import { sanitizeDigits, validateMobile010 } from "../../utils/phoneNumber";

export default function StepBasic({ initialData, onNext }) {
  const [values, setValues] = useState({
    name: "",
    phoneNumber: "",
    date: "",
    time: "",
  });

  const [isComposing, setIsComposing] = useState(false);
  const MAX_NAME = 5;

  // 숫자만 남기고 11자리로 자르기
  const sanitizePhone = (val) => sanitizeDigits(val).slice(0, 11);

  useEffect(() => {
    if (initialData) {
      setValues((v) => ({
        ...v,
        ...initialData,
        name: (initialData.name ?? v.name ?? "").slice(0, MAX_NAME),
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
    const digitsOnly = sanitizePhone(e.target.value);
    setValues((v) => ({ ...v, phoneNumber: digitsOnly }));
  };

  // utils의 검증 함수 사용: 010으로 시작 + 정확히 11자리 (동일 숫자 반복 허용)
  const phoneCheck = validateMobile010(values.phoneNumber);
  const isPhoneValid = phoneCheck.valid;

  // 전체 유효성
  const isValid = useMemo(() => {
    const { name, date, time } = values;
    return name.trim() && isPhoneValid && date && time;
  }, [values, isPhoneValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onNext?.(values);
  };

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
      {!isPhoneValid && values.phoneNumber.length > 0 && (
        <div className="muted">010으로 시작하는 숫자 11자리를 입력해 주세요.</div>
      )}

      <div className="grid2" style={{ marginBottom: 6 }}>
        <label className="label">날짜</label>
        <label className="label">시간</label>

        <input
          className="field"
          type="date"
          value={values.date}
          min={new Date().toISOString().slice(0, 10)}
          onChange={(e) =>
            setValues((v) => ({ ...v, date: e.target.value }))
          }
        />
        <input
          className="field"
          type="time"
          value={values.time}
          onChange={(e) =>
            setValues((v) => ({ ...v, time: e.target.value }))
          }
        />
      </div>

      <form onSubmit={handleSubmit} className="submitRow">
        <button type="submit" className="submitBtn" disabled={!isValid}>
          다음
        </button>
      </form>
    </>
  );
}