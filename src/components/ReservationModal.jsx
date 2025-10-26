import React, { use, useState } from "react";
import Container from "./common/Container";

function ReservationModal({ isOpen, onClose, onSubmit }){
    const [name, setName] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [file, setFile] = useState(null);

    const handleClose = () => {
        setName("");
        setphoneNumber("");
        setDate("");
        setTime("");
        setFile(null);
        onClose?.();
    };

    const handleSubmit = () => {
    const payload = { name, phoneNumber, date, time, file };
    onSubmit ? onSubmit(payload) : console.log("payload:", payload);
    handleClose();
  };


    if (!isOpen) return null;

    const fieldStyle = {
        fontFamily: "Pretendard",
        width: "100%",
        height: 43,
        borderRadius: 8,
        border: "1px solid #e5e5e5",
        padding: "4px 4px",
        outline: "none",
        marginBottom: 12,
    };

    const ruleStyle = {
        height: 1,
        background: "#eee",
        border: 0,
        margin: "4px 0 14px",
    };

    return(
        <Container>
            <div
            onClick={handleClose}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 999,
            }}
            />
            <div
            className="modal-container"
            onClick={handleClose}
            style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(0,0,0,0.5)",
                zIndex: 1000,
            }}
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title">
                
                <div
                className="modal-card"
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: 322,
                    minHeight: 600,
                    background: "#fff",
                    borderRadius: 16,
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                    padding: "60px 24px 28px",
                    position: "relative",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <button
                    aria-label="닫기"
                    onClick={handleClose}
                    style={{
                        fontFamily: "Pretendard",
                        position: "absolute",
                        right: 12,
                        top: 10,
                        border: "none",
                        background: "transparent",
                        fontSize: 20,
                        cursor: "pointer",
                        lineHeight: 1,
                    }}>x</button>
                    <h2
                    id="modal-title"
                    style={{
                        fontFamily: "Pretendard",
                        fontSize: 24,
                        fontWeight: 600,
                        textAlign: "center",
                        margin: "8px 0 60px",
                        display: "inline-block",
                        borderBottom: "3px solid #f08080",
                        paddingBottom: 4,
                        alignSelf: "center",
                    }}>예약하기</h2>
                    <input
                    className="modal-input"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={fieldStyle}
                    />
                    <input
                    className="modal-input"
                    placeholder="전화번호"
                    value={phoneNumber}
                    onChange={(e) => setphoneNumber(e.target.value)}
                    style={fieldStyle}
                    />

                    <hr style={ruleStyle} />

                    

                    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 6 }}>
                            <label
                            style={{
                                fontFamily: "Pretendard",
                                fontSize: 14,
                                color: "#333",
                                fontWeight: 600,
                            }}
                            >
                            날짜
                            </label>
                            <label
                            style={{
                                fontFamily: "Pretendard",
                                fontSize: 14,
                                color: "#333",
                                fontWeight: 600,
                            }}
                            >
                            시간
                            </label>
                        <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={fieldStyle}
                        />
                        <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        style={fieldStyle}
                        />
                    </div>

                    <hr style={ruleStyle} />

                    <label
                    style={{
                        fontFamily: "Pretendard",
                        display: "block",
                        width: "100%",
                        height: 38,
                        borderRadius: 8,
                        border: "1px solid #e5e5e5",
                        padding: "0 12px",
                        color: "#9e9e9e",
                        lineHeight: "38px",
                        cursor: "pointer",
                        marginTop: 0,
                        marginBottom: 12,
                    }}
                    >사진 선택하기🖼️
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    style={{ display: "none" }}
                    />
                    </label>

                    <button
                    type="button"
                    onClick={handleSubmit}
                    style={{
                        fontFamily: "Pretendard",
                        width: "100%",
                        height: 50,
                        borderRadius: 10,
                        border: "none",
                        background: "#f08080",
                        color: "#fff",
                        fontWeight: 700,
                        cursor: "pointer",
                        marginTop: "auto",
                    }}
                    >
                        예약 신청</button>
                </div>
            </div>
        </Container>
    );
}


export default ReservationModal;