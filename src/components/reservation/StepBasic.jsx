import React, { useEffect, useMemo, useState } from "react";
import InputField from "./InputField";

export default function StepBasic({ initialData, onNext }) {
  const [values, setValues] = useState({
    name: "",
    phoneNumber: "",
    date: "",
    time: "",
  });

  const [isComposing, setIsComposing] = useState(false);
  const MAX_NAME = 5;

  const sanitizePhone = (val) => String(val ?? "").replace(/\D/g, "").slice(0, 11);

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

  // 전화번호 onChange
  const handlePhoneChange = (e) => {
    const digitsOnly = sanitizePhone(e.target.value);
    setValues((v) => ({ ...v, phoneNumber: digitsOnly }));
  };

  // 전화번호는 "정확히 11자리"여야 함
  const isPhoneValid = values.phoneNumber.length === 11;

  // 간단 유효성 (전화번호는 정확히 11자리)
  const isValid = useMemo(() => {
    const { name, date, time } = values;
    return name.trim() && isPhoneValid && date && time;
  }, [values, isPhoneValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return; // 가드
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
      {/* 선택: 안내 문구 */}
      {!isPhoneValid && values.phoneNumber.length > 0 && (
        <div className="muted">
          전화번호는 숫자 11자리여야 합니다.
        </div>
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