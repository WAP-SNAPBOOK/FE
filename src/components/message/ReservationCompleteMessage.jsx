import React from 'react';
import CheckIcon from '../../assets/icons/check-icon.svg';
import './ReservationCompleteMessage.css';

export default function ReservationCompleteMessage({ name, date, time, photoCount }) {
  return (
    <div className="reservation-message">
      {/* 체크 아이콘 */}
      <div className="check-icon-wrapper">
        <img src={CheckIcon} alt="check icon" />
      </div>

      {/* 예약 접수 완료 텍스트 */}
      <div className="message-title">예약 접수 완료</div>

      {/* 예약 정보 */}
      <div className="reservation-info">
        <div className="info-row">
          <span className="label">고객명</span>
          <span className="value name">{name}</span>
        </div>
        <div className="info-row">
          <span className="label">예약 날짜</span>
          <span className="value date">{date}</span>
        </div>
        <div className="info-row">
          <span className="label">예약 시간</span>
          <span className="value time">{time}</span>
        </div>
        <div className="info-row">
          <span className="label">첨부 사진</span>
          <span className="value photo-count">{photoCount ?? 0}장</span>
        </div>
      </div>
    </div>
  );
}
