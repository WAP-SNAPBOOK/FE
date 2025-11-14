import React, { useState } from 'react';
import './ReservationCompleteMeassage.css';
import CheckIcon from '../../assets/icons/check-icon.svg';

export default function ReservationCompleteMessage({ name, date, time, selectedOptions }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`reservation-card ${isOpen ? 'open' : ''}`}>
      <div className="icon-wrapper">
        <img src={CheckIcon} alt="checkIcon" />
      </div>

      <h2 className="title-complete">예약 접수 완료</h2>

      <div className="info-section">
        <div className="info-row">
          <span className="label">고객명</span>
          <span className="value name">{name || '정보 없음'}</span>
        </div>
        <div className="info-row">
          <span className="label">예약 날짜</span>
          <span className="value date">{date || '-'}</span>
        </div>
        <div className="info-row">
          <span className="label">예약 시간</span>
          <span className="value time">{time || '-'}</span>
        </div>
      </div>

      <div className="divider" />

      <div className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
        <span>상세 보기</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </div>

      {isOpen && (
        <div className="detail-section">
          {[
            { label: '손/발', options: ['손', '발'], selected: selectedOptions?.hand },
            { label: '제거', options: ['유', '무'], selected: selectedOptions?.remove },
            { label: '연장', options: ['유', '무'], selected: selectedOptions?.extension },
            { label: '램핑', options: ['유', '무'], selected: selectedOptions?.lamping },
          ].map((item) => (
            <div key={item.label} className="option-row">
              <span className="option-label">{item.label}</span>
              <div className="option-values">
                {item.options.map((option) => {
                  const isSelected =
                    item.selected === option ||
                    (item.label === '손/발' && item.selected === '손발');
                  return (
                    <span key={option} className={`option ${isSelected ? 'selected' : ''}`}>
                      {option}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}

          {selectedOptions?.photos?.length > 0 && (
            <div className="photo-section">
              <span className="photo-title">사진</span>
              <div className="photo-list">
                {selectedOptions.photos.map((url, i) => (
                  <div key={i} className="photo-thumb" style={{ backgroundImage: `url(${url})` }} />
                ))}
              </div>
            </div>
          )}

          <div className="request-section">
            <span className="request-title">요구사항</span>
            <div className="request-box">
              {selectedOptions?.requestText || '요구사항이 없습니다.'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
