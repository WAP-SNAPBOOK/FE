import React, { useEffect, useMemo, useState } from "react";
import InputField from "./InputField";

export default function StepBasic({ initialData, onNext }) {
  const [values, setValues] = useState({
    name: "",
    phoneNumber: "",
    date: "",
    time: "",
  });

  // 숫자만 남기고 11자리 제한
  const sanitizePhone = (val) => String(val ?? "") .replace(/\D/g, "").slice(0, 11);

  // 초기값 반영 시에도 전화번호 정규화
  useEffect(() => {
    if (initialData) {
      setValues((v) => ({
        ...v,
        ...initialData,
        phoneNumber: sanitizePhone(initialData.phoneNumber ?? v.phoneNumber),
      }));
    }
  }, [initialData]);

  // 간단 유효성
  const isValid = useMemo(() => {
    const { name, phoneNumber, date, time } = values;
    return name.trim() && phoneNumber.trim() && date && time;
  }, [values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onNext?.(values);
  };

  // 전화번호 onChange 핸들러
  const handlePhoneChange = (e) => {
    const digitsOnly = sanitizePhone(e.target.value);
    setValues((v) => ({ ...v, phoneNumber: digitsOnly }));
  };

  return (
    <>
      <label className="label">이름</label>
      <InputField
        placeholder="이름을 입력해 주세요."
        value={values.name}
        onChange={(e) =>
          setValues((v) => ({ ...v, name: e.target.value }))
        }
      />

      <label className="label">전화번호</label>
      <InputField
        placeholder="전화번호를 입력해 주세요."
        value={values.phoneNumber}
        onChange={handlePhoneChange}
        type="tel"            // 모바일 숫자 키패드 유도
        inputMode="numeric"   // 데스크톱 가상키패드 힌트
        pattern="[0-9]*"      // 브라우저 유효성 힌트
        maxLength={11}        // UI 상 제한
        autoComplete="tel"
      />

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