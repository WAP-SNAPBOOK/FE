import { useEffect, useState } from 'react';
import RadioOption from '@/pages/CustomerReservation/steps/RadioOption';
import * as S from './steps.styles';

export default function StepOptions({ initialData, onSubmit }) {
  const [values, setValues] = useState({
    removeYn: '유',
    handFootYn: '손',
    extYn: '무',
    extCount: '',
    wrapYn: '무',
    wrapCount: '',
  });

  useEffect(() => {
    if (initialData) {
      setValues((v) => ({ ...v, ...initialData }));
    }
  }, [initialData]);

  //각 입력 필드 변경 함수
  const setField = (key, value) => setValues((p) => ({ ...p, [key]: value }));

  // step4 변경 시 상위로 전달
  useEffect(() => {
    onSubmit?.(values);
  }, [values, onSubmit]);

  return (
    <>
      <S.SectionHeading>
        상세 예약 내용을
        <br />
        만들어주세요
      </S.SectionHeading>
      {/* 제거 유무 */}
      <RadioOption
        label="제거 유무"
        options={['유', '무']}
        value={values.removeYn}
        onChange={(v) => setField('removeYn', v)}
        layout="vertical"
        variant="large"
      />

      {/* 시술 부위 */}
      <RadioOption
        label="시술 부위"
        options={['손', '발']}
        value={values.handFootYn}
        onChange={(v) => setField('handFootYn', v)}
        layout="vertical"
        variant="large"
      />

      {/* 연장 */}
      <RadioOption
        label="연장"
        options={['유', '무']}
        value={values.extYn}
        onChange={(v) =>
          setValues((p) => ({
            ...p,
            extYn: v,
            extCount: v === '무' ? '' : p.extCount,
          }))
        }
        variant="toggle"
        withCount
        countValue={values.extCount}
        onCountChange={(v) => setField('extCount', v)}
      />

      {/* 래핑 */}
      <RadioOption
        label="래핑"
        options={['유', '무']}
        value={values.wrapYn}
        onChange={(v) =>
          setValues((p) => ({
            ...p,
            wrapYn: v,
            wrapCount: v === '무' ? '' : p.wrapCount,
          }))
        }
        withCount
        variant="toggle"
        countValue={values.wrapCount}
        onCountChange={(v) => setField('wrapCount', v)}
      />
    </>
  );
}
