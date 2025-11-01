import React, { useState } from "react";
import Container from "./common/Container";
import ModalOverlay from "./ModalOverlay";
import StepBasic from "./StepBasic";
import StepOptions from "./StepOptions";
import StepPhotoNote from "./StepPhotoNote";
import "./ReservationModal.css";

export default function ReservationModal({ isOpen, onClose, onSubmit }) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    basic: { name: "", phoneNumber: "", date: "", time: "" },
    options: {
      removeYn: "유",
      handFootYn: "손",
      extYn: "무",
      extCount: "",
      wrapYn: "무",
      wrapCount: "",
    },
    photoNote: { files: [], notes: "" },
  });

  const handleClose = () => {
    setStep(1);
    setFormData({
      basic: { name: "", phoneNumber: "", date: "", time: "" },
      options: {
        removeYn: "유",
        handFootYn: "손",
        extYn: "무",
        extCount: "",
        wrapYn: "무",
        wrapCount: "",
      },
      photoNote: { files: [], notes: "" },
    });
    onClose?.();
  };

  // Step1 -> Step2
  const handleNextFromBasic = (basicValues) => { setFormData((prev) => ({ ...prev, basic: basicValues })); setStep(2); };

  // Step2 -> Step3
  const handleNextFromOptions = (optionsValues) => { setFormData((prev) => ({ ...prev, options: optionsValues })); setStep(3); };

  // 최종 제출 (Step3에서 호출)
  const handleSubmit = (photoNoteValues) => {
    const merged = { ...formData, photoNote: photoNoteValues, };

    const { basic, options, photoNote } = merged;
    const payload = {
      name: basic.name,
      phoneNumber: basic.phoneNumber,
      date: basic.date,
      time: basic.time,
      options: {
        remove: options.removeYn === "유",
        handFoot: options.handFootYn === "손",
        extension: options.extYn === "유" ? Number(options.extCount || 0) : 0,
        wrapping: options.wrapYn === "유" ? Number(options.wrapCount || 0) : 0,
      },
      files: photoNote.files,
      notes: photoNote.notes?.trim() || "",
    };
    onSubmit ? onSubmit(payload) : console.log("payload:", payload);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <Container>
      <ModalOverlay onClose={handleClose}>
        <div className="modalCard">
          <button className="closeBtn" aria-label="닫기" onClick={handleClose}>x</button>
          <h2 id="modal-title" className="title">예약하기</h2>

          {step === 1 && (
            <StepBasic initialData={formData.basic} onNext={handleNextFromBasic} />
          )}

          {step === 2 && (
            <StepOptions initialData={formData.options} onNext={handleNextFromOptions} />
          )}

          {step === 3 && (
            <StepPhotoNote initialData={formData.photoNote} onSubmit={handleSubmit} />
          )}
        </div>
      </ModalOverlay>
    </Container>
  );
}
