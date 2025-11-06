import React, { useEffect, useState, useMemo } from 'react';
import OptionRow from './OptionRow';
import RadioHandFoot from './RadioHandFoot';

export default function StepOptions({ initialData, onNext, visibleFields }) {
  const [values, setValues] = useState({
    removeYn: '유',
    handFootYn: '손',
    extYn: '무',
    extCount: '',
    wrapYn: '무',
    wrapCount: '',
  });

  // 1~10 선택지
  const COUNT_OPTIONS = useMemo(() => Array.from({ length: 10 }, (_, i) => String(i + 1)), []);

  const sanitizeCount = (val) => String(val ?? '').replace(/\D/g, '');

  useEffect(() => {
    if (initialData) {
      setValues((v) => ({
        ...v,
        ...initialData,
        extCount: sanitizeCount(initialData.extCount ?? v.extCount),
        wrapCount: sanitizeCount(initialData.wrapCount ?? v.wrapCount),
      }));
    }
  }, [initialData]);

  const setField = (k, val) => setValues((p) => ({ ...p, [k]: val }));

  const handleChangeExtYn = (v) =>
    setValues((p) => ({
      ...p,
      extYn: v,
      extCount: v === '무' ? '' : p.extCount, // 유일 때만 유지
    }));

  const handleChangeWrapYn = (v) =>
    setValues((p) => ({
      ...p,
      wrapYn: v,
      wrapCount: v === '무' ? '' : p.wrapCount,
    }));

  const handleExtCountChange = (cnt) => setField('extCount', sanitizeCount(cnt));
  const handleWrapCountChange = (cnt) => setField('wrapCount', sanitizeCount(cnt));

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext?.(values);
  };

  return (
    <>
      {/* 제거 유무 */}
      {visibleFields?.removal && (
        <OptionRow
          label="제거 유무"
          name="removeYn"
          value={values.removeYn}
          onChange={(v) => setField('removeYn', v)}
        />
      )}

      {/* 손/발 */}
      {visibleFields?.part && (
        <RadioHandFoot
          label="손 / 발"
          name="handFootYn"
          value={values.handFootYn}
          onChange={(v) => setField('handFootYn', v)}
        />
      )}

      {visibleFields?.extend && (
        <>
          <OptionRow
            label="연장"
            name="extYn"
            value={values.extYn}
            onChange={handleChangeExtYn}
            showCount
            countValue={values.extCount}
            onCountChange={handleExtCountChange}
            countAs="select"
            countOptions={COUNT_OPTIONS}
          />
        </>
      )}

      {visibleFields?.wrapping && (
        <>
          <OptionRow
            label="래핑"
            name="wrapYn"
            value={values.wrapYn}
            onChange={handleChangeWrapYn}
            showCount
            countValue={values.wrapCount}
            onCountChange={handleWrapCountChange}
            countAs="select"
            countOptions={COUNT_OPTIONS}
          />
        </>
      )}

      <form onSubmit={handleSubmit} className="submitRow">
        <button type="submit" className="submitBtn">
          다음
        </button>
      </form>
    </>
  );
}
