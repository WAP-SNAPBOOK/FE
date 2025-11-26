import React, { useState, useEffect } from 'react';
import './CustomerReservationList.css';
import { myReservation } from '../../api/services/myReservation';

export default function CustomerReservationList() {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await myReservation.getMyReservations();
        setReservations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('예약 내역 불러오기 실패:', err);
        setError('예약 내역을 불러오는데 실패했습니다. 다시 시도해주세요.');
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
      {isLoading && <div className="reservation-empty-text">예약 내역을 불러오는 중입니다...</div>}
      {/* 에러처리 */}
      {!isLoading && error && <div className="reservation-empty-text">{error}</div>}
      {/* 2) 데이터가 없을 때: 회색 박스 없이 텍스트만 */}
      {!isLoading && !error && reservations.length === 0 && (
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
    PENDING: { bg: '#ababFF', text: '#3131f7' },
    CONFIRMED: { bg: '#E6FFE8', text: '#2ECC71' },
    REJECTED: { bg: '#FFE8E8', text: '#FF5A5A' },
  };

  //에약 상태 라벨링
  const STATUS_LABELS = {
    PENDING: '접수중',
    CONFIRMED: '예약 확정',
    REJECTED: '예약 거절',
  };

  const statusText = STATUS_LABELS[data.status];

  const statusStyle = STATUS_STYLES[data.status] || {
    bg: '#eeeeee',
    text: '#555555',
  };

  const timeText = data.time;
  const photoUrls = Array.isArray(data.photoUrls) ? data.photoUrls : [];
  const mapYesNoToYn = (v) => {
    if (v === '예') return '유';
    if (v === '아니오') return '무';
    return v ?? '';
  };

  const isYes = (v) => v === '유' || v === '예';

  const selectedOptions = {
    hand: data.part ?? '',
    remove: mapYesNoToYn(data.removal) ?? '',
    extension: data.extendStatus ?? '',
    wrap: data.wrappingStatus ?? '',
    requestText: data.requests ?? '',
  };

  const ownerMessage = data.status === 'REJECTED' ? data.rejectionReason : data.confirmationMessage;

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
          <span className="status-dot" style={{ backgroundColor: statusStyle.text }} />
          {statusText}
        </div>
      </div>

      {/* 본문 영역 */}
      <div className="card-body">
        <div className="divider" />

        <div className="info-section">
          <div className="info-row">
            <span className="label">고객명</span>
            <span className="value-1">{data.customerName}</span>
          </div>
          <div className="info-row">
            <span className="label">예약 날짜</span>
            <span className="value-1 highlight">{data.date}</span>
          </div>
          <div className="info-row">
            <span className="label">예약 시간</span>
            <span className="value-1 highlight">{timeText}</span>
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
              { key: 'hand', label: '손/발', options: ['손', '발'] },
              { key: 'remove', label: '제거', options: ['유', '무'] },
              { key: 'extension', label: '연장', options: ['유', '무'], countKey: 'extendCount' },
              { key: 'wrap', label: '랩핑', options: ['유', '무'], countKey: 'wrappingCount' },
            ].map((item) => {
              const selected = selectedOptions[item.key];
              const count =
                item.countKey && typeof data[item.countKey] === 'number' ? data[item.countKey] : 0;
              const showOptions = !(item.countKey && isYes(selected)); // ← 유일 때 false
              const showCount = item.countKey && isYes(selected) && count > 0;

              return (
                <div key={item.key} className="option-row">
                  <span className="option-label">{item.label}</span>

                  <div className="option-row">
                    {/* 손/발, 제거는 항상 / 연장·랩핑은 "무"일 때만 유/무 노출 */}
                    {showOptions && (
                      <div className="option-values">
                        {item.options.map((option) => {
                          const isSelected =
                            option === selected ||
                            // 손발 같이 선택된 경우(예: "손발") → 둘 다 강조
                            (item.key === 'hand' &&
                              selected === '손발' &&
                              (option === '손' || option === '발'));

                          return (
                            <span key={option} className={`option ${isSelected ? 'selected' : ''}`}>
                              {option}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* 연장/랩핑이 "유"일 때만 개수 pill 표시 */}
                    {showCount && <span className="option-count">{count}개</span>}
                  </div>
                </div>
              );
            })}

            {photoUrls.length > 0 && (
              <div className="photo-section">
                <span className="section-title">사진</span>
                <div className="photo-list">
                  {photoUrls.map((url, i) => (
                    <img key={i} className="photo-item" src={url} alt={`예약 사진 ${i + 1}`} />
                  ))}
                </div>
              </div>
            )}

            {selectedOptions?.requestText && (
              <div className="request-section">
                <span className="section-title">요구사항</span>
                <div className="request-box">{selectedOptions.requestText}</div>
              </div>
            )}

            {(data.status === 'CONFIRMED' || data.status === 'REJECTED') && (
              <div className="owner-section">
                <div className="divider" />
                <div className="owner-box">
                  <span className="owner-title">
                    {data.status === 'REJECTED' ? '거절 사유' : '전달 사항'}
                  </span>
                  <p className="owner-text">{ownerMessage}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
