import React, { useEffect, useState } from 'react';
import Container from '../common/Container';
import ModalOverlay from './ModalOverlay';
import StepBasic from './StepBasic';
import StepOptions from './StepOptions';
import StepPhotoNote from './StepPhotoNote';
import './ReservationModal.css';
import { useReservationForm } from '../../query/reservationQueries';
import { getVisibleFields } from '../../utils/form/formFieldVisibility';

export default function ReservationModal({ isOpen, onClose, onSubmit, shopId }) {
  const [step, setStep] = useState(1);

  const { data: formConfig, isLoading, error } = useReservationForm(shopId, isOpen);
  const fields = formConfig?.formFields ?? [];

  //필드 존재 여부 정보
  const visible = getVisibleFields(fields);

  const [formData, setFormData] = useState({
    basic: { name: '', phoneNumber: '', date: '', time: '' },
    options: {
      removeYn: '유',
      handFootYn: '손',
      extYn: '무',
      extCount: '',
      wrapYn: '무',
      wrapCount: '',
    },
    photoNote: { files: [], notes: '' },
  });

  const handleClose = () => {
    setStep(1);
    setFormData({
      basic: { name: '', phoneNumber: '', date: '', time: '' },
      options: {
        removeYn: '유',
        handFootYn: '손',
        extYn: '무',
        extCount: '',
        wrapYn: '무',
        wrapCount: '',
      },
      photoNote: { files: [], notes: '' },
    });
    onClose?.();
  };
  // ✅ 모달 열리는 동안 배경 스크롤 완전 잠금 (iOS 포함 안정적인 fixed-lock)
  useEffect(() => {
    if (!isOpen) return;

    const scrollY =
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // 기존 인라인 스타일 백업
    const prev = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };

    // 배경 고정 & 스크롤 차단
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    // 클린업: 스타일 복원 + 원래 위치로 스크롤 이동
    return () => {
      document.body.style.position = prev.position;
      document.body.style.top = prev.top;
      document.body.style.width = prev.width;
      document.body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Step1 -> Step2
  const handleNextFromBasic = (basicValues) => {
    setFormData((prev) => ({ ...prev, basic: basicValues }));
    setStep(2);
  };

  // Step2 -> Step3
  const handleNextFromOptions = (optionsValues) => {
    setFormData((prev) => ({ ...prev, options: optionsValues }));
    setStep(3);
  };

  // 최종 제출 (Step3에서 호출)
  const handleSubmit = (photoNoteValues) => {
    const merged = { ...formData, photoNote: photoNoteValues };

    const { basic, options, photoNote } = merged;
    const payload = {
      name: basic.name,
      phoneNumber: basic.phoneNumber,
      date: basic.date,
      time: basic.time,
      options: {
        remove: options.removeYn === '유',
        handFoot: options.handFootYn === '손',
        extension: options.extYn === '유' ? Number(options.extCount || 0) : 0,
        wrapping: options.wrapYn === '유' ? Number(options.wrapCount || 0) : 0,
      },
      files: photoNote.files,
      notes: photoNote.notes?.trim() || '',
    };
    onSubmit ? onSubmit(payload) : console.log('payload:', payload);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <Container>
      <ModalOverlay onClose={handleClose}>
        <div className="modalCard">
          <button className="closeBtn" aria-label="닫기" onClick={handleClose}>
            x
          </button>
          <h2 id="modal-title" className="title">
            예약하기
          </h2>

          {step === 1 && <StepBasic initialData={formData.basic} onNext={handleNextFromBasic} />}

          {step === 2 && (
            <StepOptions
              initialData={formData.options}
              onNext={handleNextFromOptions}
              visibleFields={visible}
            />
          )}

          {step === 3 && (
            <StepPhotoNote
              initialData={formData.photoNote}
              onSubmit={handleSubmit}
              visibleFields={visible}
            />
          )}
        </div>
      </ModalOverlay>
    </Container>
  );
}
