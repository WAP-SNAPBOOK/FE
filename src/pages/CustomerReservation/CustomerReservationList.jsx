import React, { useState, useEffect } from 'react';
import './CustomerReservationList.css';
import { myReservation } from '../../api/services/myReservation';

export default function CustomerReservationList() {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setIsLoading(true);
        const data = await myReservation.getMyReservations();
        setReservations(data || []);
      } catch (err) {
        console.error('예약 내역 불러오기 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="page">
      <div className="title-wrapper">
        <h1 className="title-header">예약 내역</h1>
      </div>

      {/* 1) 로딩 중일 때: 회색 박스 + 로딩 문구 */}
      {isLoading && (
        <div className="reservation-empty-text">
            예약 내역을 불러오는 중입니다...
        </div>
      )}

      {/* 2) 데이터가 없을 때: 회색 박스 없이 텍스트만 */}
      {!isLoading && reservations.length === 0 && (
        <div className="reservation-empty-text">아직 예약이 없습니다... 😭</div>
      )}

      {/* 3) 데이터가 있을 때 : 회색 박스 + 카드들 렌더링 */}
      {!isLoading && reservations.length > 0 && (
        <div className="gray-box">
          {reservations.map((r) => (
            <ReservationCard key={r.id} data={r} />
          ))}
        </div>
      )}
    </div>
  );
}


function ReservationCard({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  const STATUS_STYLES = {
    접수중: { bg: '#ababFF', text: '#3131f7' },
    예약확정: { bg: '#E6FFE8', text: '#2ECC71' },
    예약거절: { bg: '#FFE8E8', text: '#FF5A5A' },
  };

  const statusStyle = STATUS_STYLES[data.status] || {
    bg: '#eeeeee',
    text: '#555555',
  };

  const timeText =
    data.time && typeof data.time === 'object'
      ? `${String(data.time.hour ?? 0).padStart(2, '0')}:${String(
          data.time.minute ?? 0,
        ).padStart(2, '0')}`
      : data.time ?? '';

  const selectedOptions = data.selectedOptions || {};

  return (
    <div className="card">
      {/* 상단 영역 */}
      <div className="card-top">
        <div className="shop-info">
          <img
            src={data.shopImageUrl || 'https://placehold.co/80x80?text=SHOP'}
            alt={data.shopName}
            className="shop-img"
          />
          <h2 className="shop-name">{data.shopName}</h2>
        </div>

        {/* 상태 표시 */}
        <div
          className="status"
          style={{
            backgroundColor: statusStyle.bg,
            color: statusStyle.text,
          }}
        >
          <span
            className="status-dot"
            style={{ backgroundColor: statusStyle.text }}
          />
          {data.status}
        </div>
      </div>

      {/* 본문 영역 */}
      <div className="card-body">
        <div className="divider" />

        <div className="info-section">
          <div className="info-row">
            <span className="label">고객명</span>
            <span className="value">{data.customerName}</span>
          </div>
          <div className="info-row">
            <span className="label">예약 날짜</span>
            <span className="value highlight">{data.date}</span>
          </div>
          <div className="info-row">
            <span className="label">예약 시간</span>
            <span className="value highlight">{timeText}</span>
          </div>
        </div>

        <div className="divider" />

        <div className="toggle-customer" onClick={() => setIsOpen(!isOpen)}>
          <span>상세 보기</span>
          <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </div>

        {isOpen && (
          <div className="details">
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
                      <span
                        key={option}
                        className={`option ${isSelected ? 'selected' : ''}`}
                      >
                        {option}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}

            {selectedOptions?.requestText && (
              <div className="request-section">
                <span className="section-title">요구사항</span>
                <div className="request-box">{selectedOptions.requestText}</div>
              </div>
            )}

            {selectedOptions?.photos?.length > 0 && (
              <div className="photo-section">
                <span className="section-title">사진</span>
                <div className="photo-list">
                  {selectedOptions.photos.map((url, i) => (
                    <div
                      key={i}
                      className="photo-item"
                      style={{ backgroundImage: `url("${url}")` }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {(data.status === 'CONFIRMED' || data.status === 'REJECTED') && (
              <div className="owner-section">
                <div className="divider" />
                <div className="owner-box">
                  <span className="owner-title">
                    {data.status === 'REJECTED' ? '거절 사유' : '전달 사항'}
                  </span>
                  <p className="owner-text">{data.ownerMessage}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
