import { useState } from 'react';
import * as S from './ReservationCreatePage.styles';
import Container from '../../components/common/Container';
import StepUserInfo from './steps/StepUserInfo';
import StepDateTime from './steps/StepDateTime';
import StepPhotoNote from './steps/StepPhotoNote';
import StepOptions from './steps/StepOptions';

export default function ReservationCreatePage() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    basic: {
      name: '',
      phoneNumber: '',
      date: '',
      time: '',
    },
    photoNote: {
      files: [],
      notes: '',
    },
    options: {
      removeYn: '유',
      handFootYn: '손',
      extYn: '무',
      extCount: '',
      wrapYn: '무',
      wrapCount: '',
    },
  });

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const updateBasic = (patch) => setFormData((p) => ({ ...p, basic: { ...p.basic, ...patch } }));

  const submitReservation = () => {
    // TODO: API payload 조합 후 createReservation
    console.log('FINAL SUBMIT', formData);
  };

  return (
    <Container>
      <S.Header>
        <S.Title>예약하기</S.Title>
        <S.StepIndicator>{step} / 4</S.StepIndicator>
      </S.Header>

      {step === 1 && (
        <StepUserInfo
          initialData={formData.basic}
          onNext={(v) => {
            updateBasic(v);
            next();
          }}
        />
      )}

      {step === 2 && (
        <StepDateTime
          initialData={formData.basic}
          onNext={(v) => {
            updateBasic(v);
            next();
          }}
          onBack={prev}
        />
      )}

      {step === 3 && (
        <StepPhotoNote
          initialData={formData.photoNote}
          onNext={(photoNote) => {
            setFormData((p) => ({ ...p, photoNote }));
            next();
          }}
          onBack={prev}
        />
      )}

      {step === 4 && (
        <StepOptions
          initialData={formData.options}
          onBack={prev}
          onSubmit={(options) => {
            setFormData((p) => ({ ...p, options }));
            submitReservation();
          }}
        />
      )}
    </Container>
  );
}
