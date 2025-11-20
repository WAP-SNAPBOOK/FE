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
          <span className="label-com">고객명</span>
          <span className="value-1 name">{name}</span>
        </div>
        <div className="info-row">
          <span className="label-com">예약 날짜</span>
          <span className="value-1 date-1">{date}</span>
        </div>
        <div className="info-row">
          <span className="label-com">예약 시간</span>
          <span className="value-1 time-1">{time}</span>
        </div>
        <div className="info-row">
          <span className="label-com">첨부 사진</span>
          <span className="value-1 photo-count">{photoCount ?? 0}장</span>
        </div>
      </div>
    </div>
  );
}
