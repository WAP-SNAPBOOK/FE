import React, { useEffect, useState } from "react";
import OptionRow from "./OptionRow";
import RadioHandFoot from "./RadioHandFoot";

export default function StepOptions({ initialData, onNext }) {
  const [values, setValues] = useState({
    removeYn: "유",
    handFootYn: "손",
    extYn: "무",
    extCount: "",
    wrapYn: "무",
    wrapCount: "",
  });

  // ✅ 숫자만 남기기(자릿수 제한 원하면 .slice(0, 2) 등 추가)
  const sanitizeCount = (val) => String(val ?? "").replace(/\D/g, "");

  useEffect(() => {
    if (initialData) {
      setValues((v) => ({
        ...v,
        ...initialData,
        // 초기값에도 숫자만 유지
        extCount: sanitizeCount(initialData.extCount ?? v.extCount),
        wrapCount: sanitizeCount(initialData.wrapCount ?? v.wrapCount),
      }));
    }
  }, [initialData]);

  const setField = (k, val) => setValues((p) => ({ ...p, [k]: val }));
  
  const handleChangeExtYn = (v) =>
    setValues((p) => ({ ...p, extYn: v, extCount: v === "무" ? "" : sanitizeCount(p.extCount), }));

  const handleChangeWrapYn = (v) =>
    setValues((p) => ({ ...p, wrapYn: v, wrapCount: v === "무" ? "" : sanitizeCount(p.wrapCount), }));

  // ✅ 개수 입력도 숫자만 반영
  const handleExtCountChange = (cnt) => setField("extCount", sanitizeCount(cnt));
  const handleWrapCountChange = (cnt) => setField("wrapCount", sanitizeCount(cnt));

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext?.(values);
  };

  return (
    <>
      <OptionRow
        label="제거 유무"
        name="removeYn"
        value={values.removeYn}
        onChange={(v) => setField("removeYn", v)}
      />
      <RadioHandFoot
        label="손 / 발"
        name="handFootYn"
        value={values.handFootYn}
        onChange={(v) => setField("handFootYn", v)}
      />
      <OptionRow
        label="연장"
        name="extYn"
        value={values.extYn}
        onChange={handleChangeExtYn}
        showCount
        countValue={values.extCount}
        onCountChange={handleExtCountChange}
      />
      <OptionRow
        label="래핑"
        name="wrapYn"
        value={values.wrapYn}
        onChange={handleChangeWrapYn}
        showCount
        countValue={values.wrapCount}
        onCountChange={handleWrapCountChange}
      />

      <form onSubmit={handleSubmit} className="submitRow">
        <button type="submit" className="submitBtn">다음</button>
      </form>
    </>
  );
}
