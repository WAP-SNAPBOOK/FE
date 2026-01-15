import React, { useEffect, useState, useRef } from 'react';
import Container from '../common/Container';
import ModalOverlay from './ModalOverlay';
import StepBasic from './StepBasic';
import StepOptions from './StepOptions';
import StepPhotoNote from './StepPhotoNote';
import './ReservationModal.css';
import { useCreateReservation, useReservationForm } from '../../query/reservationQueries';
import { useUploadMultipleFiles } from '../../query/fileQueries';
import { getVisibleFields } from '../../utils/form/formFieldVisibility';

export default function ReservationModal({ isOpen, onClose, shopId }) {
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
  //formData를 ref로 보관해서 훅에 넘기기
  const formDataRef = useRef(formData);
  const photoCountRef = useRef(0);
  useEffect(() => {
    formDataRef.current = formData;
    photoCountRef.current = formData.photoNote.files.length;
  }, [formData]);

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

  //예약 생성 query 훅
  const { mutate: createReservation } = useCreateReservation(handleClose);

  //파일(사진) 전송 query 훅
  const { mutateAsync: uploadMultiple, isPending } = useUploadMultipleFiles();

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
  const handleSubmit = async (photoNoteValues) => {
    const merged = { ...formData, photoNote: photoNoteValues };

    const { basic, options, photoNote } = merged;
    photoCountRef.current = photoNote.files.length;
    let uploadedUrls = [];
    // 파일 존재하면 먼저 업로드
    if (photoNote.files.length > 0) {
      uploadedUrls = await uploadMultiple(photoNote.files);
      uploadedUrls = uploadedUrls.map((item) => item.fileUrl);
    }

    const payload = {
      shopId,
      formData: {
        name: basic.name,
        phone: basic.phoneNumber,
        date: basic.date,
        time: basic.time,
        removal: options.removeYn === '유' ? '예' : '아니오',
        part: String(options.handFootYn ?? ''),
        wrapping: Number(options.wrapCount),
        extend: Number(options.extCount) > 0 ? Number(options.extCount) : 0,
        photo: uploadedUrls.length ? JSON.stringify(uploadedUrls) : '[]',
        requests: photoNote.notes?.trim() || '',
      },
    };
    //예약 생성
    createReservation(payload);
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
              isUploading={isPending}
            />
          )}
        </div>
      </ModalOverlay>
    </Container>
  );
}
