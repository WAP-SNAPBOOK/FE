import React, { useEffect, useMemo, useState } from "react";
import InputField from "./InputField";

export default function StepBasic({ initialData, onNext }) {
  const [values, setValues] = useState({
    name: "",
    phoneNumber: "",
    date: "",
    time: "",
  });

  // 초기값 반영 (앞/뒤 이동 없이도 재진입 시 값 보존)
  useEffect(() => {
    if (initialData) {
      setValues((v) => ({ ...v, ...initialData }));
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
        onChange={(e) =>
          setValues((v) => ({ ...v, phoneNumber: e.target.value }))
        }
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