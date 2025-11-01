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

  useEffect(() => {
    if (initialData) setValues((v) => ({ ...v, ...initialData }));
  }, [initialData]);

  const setField = (k, val) => setValues((p) => ({ ...p, [k]: val }));
  const handleChangeExtYn = (v) =>
    setValues((p) => ({ ...p, extYn: v, extCount: v === "무" ? "" : p.extCount }));
  const handleChangeWrapYn = (v) =>
    setValues((p) => ({ ...p, wrapYn: v, wrapCount: v === "무" ? "" : p.wrapCount }));

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
        onCountChange={(cnt) => setField("extCount", cnt)}
      />
      <OptionRow
        label="래핑"
        name="wrapYn"
        value={values.wrapYn}
        onChange={handleChangeWrapYn}
        showCount
        countValue={values.wrapCount}
        onCountChange={(cnt) => setField("wrapCount", cnt)}
      />

      <form onSubmit={handleSubmit} className="submitRow">
        <button type="submit" className="submitBtn">다음</button>
      </form>
    </>
  );
}
