import { useState } from 'react';
import * as S from './ReservationCreatePage.styles';
import Container from '../../components/common/Container';
import StepUserInfo from './steps/StepUserInfo';
import StepDateTime from './steps/StepDateTime';
import StepPhotoNote from './steps/StepPhotoNote';
import StepOptions from './steps/StepOptions';
import { NextButton } from '@/components/common/NextButton';
import backIcon from '@/assets/icons/back-icon.svg';
import xIcon from '@/assets/icons/X-icon.svg';
import { useReservationFormHandlers } from './hooks/useReservationFormHandlers';
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

  //각 예약 단계 폼 입력 헨들러
  const { handleUserInfoChange, handleDateTimeChange, handlePhotoNoteChange, handleOptionsChange } =
    useReservationFormHandlers(setFormData, setCanNext);

  const stepHandlers = {
    1: handleUserInfoChange,
    2: handleDateTimeChange,
    3: handlePhotoNoteChange,
    4: handleOptionsChange,
  };

  const handleNextClick = () => {
    if (!canNext) return;

    if (step === 4) {
      submitReservation();
      return;
    }

    next(); // step 증가
    setCanNext(false); // 다음 step 진입 시 초기화
  };

  //다음 단계 이동으로 step증가
  const next = () => setStep((s) => Math.min(s + 1, 4));
  //이전 단계 이동으로 step감소
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
          <S.IconButton aria-label="뒤로가기">
            <img src={backIcon} alt="back" />
          </S.IconButton>

          <S.Title>예약하기</S.Title>

          <S.IconButton aria-label="닫기">
            <img src={xIcon} alt="close" />
          </S.IconButton>
        </S.Header>

        <S.ProgressBar>
          {[1, 2, 3, 4].map((n) => (
            //현재 단계에 따른 Progress 색상 채우기
            <S.Progress key={n} $active={step >= n} />
          ))}
        </S.ProgressBar>

        <S.Content>
          {step === 1 && <StepUserInfo initialData={formData.basic} onChange={stepHandlers[1]} />}
          {step === 2 && <StepDateTime initialData={formData.basic} onChange={stepHandlers[2]} />}
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
          <NextButton $width="100%" disabled={!canNext} onClick={handleNextClick}>
            {step === 4 ? '예약 신청' : '다음 단계로'}
          </NextButton>
        </S.Content>
      </S.PageWrapper>
    </Container>
  );
}
