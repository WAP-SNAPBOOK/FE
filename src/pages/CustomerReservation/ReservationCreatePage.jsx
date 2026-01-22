import { useState } from 'react';
import * as S from './ReservationCreatePage.styles';
import Container from '../../components/common/Container';
import StepUserInfo from './steps/StepUserInfo';
import StepDateTime from './steps/StepDateTime';
import StepPhotoNote from './steps/StepPhotoNote';
import StepOptions from './steps/StepOptions';
import { NextButton } from '@/components/common/NextButton';

export default function ReservationCreatePage() {
  const [step, setStep] = useState(1);
  const [canNext, setCanNext] = useState(false);

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

  const handleUserInfoChange = ({ name, phoneNumber, isValid }) => {
    setFormData((p) => ({
      ...p,
      basic: { ...p.basic, name, phoneNumber },
    }));
    setCanNext(isValid);
  };

  const handleDateTimeChange = ({ date, time, isValid }) => {
    setFormData((p) => ({
      ...p,
      basic: { ...p.basic, date, time },
    }));
    setCanNext(isValid);
  };

  const handlePhotoNoteChange = ({ files, notes, isValid }) => {
    setFormData((p) => ({
      ...p,
      photoNote: { files, notes },
    }));
    setCanNext(isValid);
  };

  const handleOptionsChange = ({ options, isValid }) => {
    setFormData((p) => ({
      ...p,
      options,
    }));
    setCanNext(isValid);
  };

  const stepHandlers = {
    1: handleUserInfoChange,
    2: handleDateTimeChange,
    3: handlePhotoNoteChange,
    4: handleOptionsChange,
  };

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const updateBasic = (patch) => setFormData((p) => ({ ...p, basic: { ...p.basic, ...patch } }));

  const submitReservation = () => {
    // TODO: API payload 조합 후 createReservation
    console.log('FINAL SUBMIT', formData);
  };

  return (
    <Container $start>
      <S.PageWrapper>
        <S.Header>
          <S.IconButton aria-label="뒤로가기">←</S.IconButton>

          <S.Title>예약하기</S.Title>

          <S.IconButton aria-label="닫기">✕</S.IconButton>
        </S.Header>

        <S.ProgressBar>
          <S.Progress $active />
          <S.Progress />
          <S.Progress />
          <S.Progress />
        </S.ProgressBar>

        <S.Content>
          {step === 1 && <StepUserInfo initialData={formData.basic} onChange={stepHandlers[1]} />}
          {step === 2 && (
            <StepDateTime initialData={formData.basic} onChange={stepHandlers[2]} onBack={prev} />
          )}
          {step === 3 && (
            <StepPhotoNote
              initialData={formData.photoNote}
              onChange={stepHandlers[3]}
              onBack={prev}
            />
          )}
          {step === 4 && (
            <StepOptions initialData={formData.options} onBack={prev} onSubmit={stepHandlers[4]} />
          )}
          <NextButton $width="100%" disabled={!canNext}>
            {step === 4 ? '예약 신청' : '다음 단계로'}
          </NextButton>
        </S.Content>
      </S.PageWrapper>
    </Container>
  );
}
