import React, { useState } from "react";
import Container from "./common/Container"; // 경로는 프로젝트 구조에 맞게 조정
import ModalOverlay from "./ModalOverlay";
import StepBasic from "./StepBasic";
import StepOptions from "./StepOptions";
import StepPhotoNote from "./StepPhotoNote";
import "./ReservationModal.css";

export default function ReservationModal({ isOpen, onClose, onSubmit }) {
  const [step, setStep] = useState(1);

  // Step 1
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Step 2
  const [removeYn, setRemoveYn] = useState("유");
  const [handFootYn, setHandFootYn] = useState("유");
  const [extYn, setExtYn] = useState("무");
  const [extCount, setExtCount] = useState("");
  const [wrapYn, setWrapYn] = useState("무");
  const [wrapCount, setWrapCount] = useState("");

  // Step 3 (다중 파일)
  const [files, setFiles] = useState([]); // File[]
  const [notes, setNotes] = useState("");

  const isStep1Valid = name && phoneNumber && date && time;

  const handleClose = () => {
    setStep(1);
    setName("");
    setPhoneNumber("");
    setDate("");
    setTime("");
    setRemoveYn("유");
    setHandFootYn("유");
    setExtYn("무");
    setExtCount("");
    setWrapYn("무");
    setWrapCount("");
    setFiles([]);
    setNotes("");
    onClose?.();
  };

  const goNextFromBasic = () => setStep(2);
  const goNextFromOptions = () => setStep(3);

  const handleSubmit = () => {
    const payload = {
      name,
      phoneNumber,
      date,
      time,
      options: {
        remove: removeYn === "유",
        handFoot: handFootYn === "유",
        extension: extYn === "유" ? Number(extCount || 0) : 0,
        wrapping: wrapYn === "유" ? Number(wrapCount || 0) : 0,
      },
      files,                  // File[] (선택)
      notes: notes?.trim() || "", // 선택
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
            <StepBasic
              name={name}
              setName={setName}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
              onNext={goNextFromBasic}
              isValid={isStep1Valid}
            />
          )}

          {step === 2 && (
            <StepOptions
              removeYn={removeYn}
              setRemoveYn={setRemoveYn}
              handFootYn={handFootYn}
              setHandFootYn={setHandFootYn}
              extYn={extYn}
              setExtYn={setExtYn}
              extCount={extCount}
              setExtCount={setExtCount}
              wrapYn={wrapYn}
              setWrapYn={setWrapYn}
              wrapCount={wrapCount}
              setWrapCount={setWrapCount}
              onNext={goNextFromOptions}
            />
          )}

          {step === 3 && (
            <StepPhotoNote
              files={files}
              setFiles={setFiles}
              notes={notes}
              setNotes={setNotes}
              onSubmit={handleSubmit}
            />
          )}
          </div>

      </ModalOverlay>
    </Container>
  );
}
