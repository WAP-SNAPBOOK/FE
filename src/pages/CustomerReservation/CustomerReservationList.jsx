import React, { useState, useEffect } from 'react';
import './CustomerReservationList.css';

export default function CustomerReservationList() {
  const [reservations, setReservations] = useState([]);

  // 더미데이터
  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        shopImageUrl: 'https://placekitten.com/80/80',
        shopName: '마야네일',
        status: '예약확정',
        ownerMessage:
          '안녕하세요 고객님, OO네일입니다!\n예약해주신 시간은 11월 07일 14시입니다.\n방문시간 5분 전 도착 부탁드려요 💅',
        customerName: '김민주',
        date: '11.07',
        day: '목',
        time: '14:00',
        selectedOptions: {
          hand: '손',
          remove: '유',
          extension: '무',
          lamping: '유',
          requestText: '프렌치 네일로 하고 싶어요 💅',
          photos: ['https://placekitten.com/100/100'],
        },
      },
      {
        id: 2,
        shopImageUrl: 'https://placekitten.com/81/81',
        shopName: '말랑뷰티샵',
        status: '예약거절',
        ownerMessage: '죄송합니다 😢 해당 시간대는 이미 예약이 꽉 찼어요.',
        customerName: '김나현',
        date: '11.09',
        day: '토',
        time: '16:30',
        selectedOptions: {
          hand: '발',
          remove: '무',
          extension: '유',
          lamping: '무',
          requestText: '지난번처럼 은은한 컬러로 부탁드려요 ✨',
          photos: ['https://placekitten.com/104/104'],
        },
      },
      {
        id: 3,
        shopImageUrl: 'https://placekitten.com/82/82',
        shopName: '말랑뷰티샵',
        status: '접수중',
        ownerMessage: '',
        customerName: '염승혜',
        date: '11.09',
        day: '토',
        time: '16:30',
        selectedOptions: {
          hand: '발',
          remove: '무',
          extension: '유',
          lamping: '무',
          requestText: '지난번처럼 은은한 컬러로 부탁드려요 ✨',
          photos: ['https://placekitten.com/104/104'],
        },
      },
    ];

    setReservations(dummyData);
  }, []);

  return (
    <div className="page">
      <div className="title-wrapper">
        <h1 className="title-header">예약 내역</h1>
      </div>

      <div className="gray-box">
        {reservations.map((r) => (
          <ReservationCard key={r.id} data={r} />
        ))}
      </div>
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

  const selectedOptions = data.selectedOptions || {};

  return (
    <div className="card">
      {/* 상단 영역 */}
      <div className="card-top">
        <div className="shop-info">
          <img src={data.shopImageUrl} alt={data.shopName} className="shop-img" />
          <h2 className="shop-name">{data.shopName}</h2>
        </div>

        {/* 상태 표시 */}
        <div
          className="status"
          style={{
            backgroundColor: STATUS_STYLES[data.status].bg,
            color: STATUS_STYLES[data.status].text,
          }}
        >
          <span
            className="status-dot"
            style={{ backgroundColor: STATUS_STYLES[data.status].text }}
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
            <span className="value highlight">
              {data.date} ({data.day})
            </span>
          </div>
          <div className="info-row">
            <span className="label">예약 시간</span>
            <span className="value highlight">{data.time}</span>
          </div>
        </div>

        <div className="divider" />

        {/* 상세 보기 토글 */}
        <div className="toggle-customer" onClick={() => setIsOpen(!isOpen)}>
          <span>상세 보기</span>
          <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </div>

        {/* 상세 내용 */}
        {isOpen && (
          <div className="details">
            {/* 옵션 */}
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

            {/* 요구사항 */}
            {selectedOptions?.requestText && (
              <div className="request-section">
                <span className="section-title">요구사항</span>
                <div className="request-box">{selectedOptions.requestText}</div>
              </div>
            )}

            {/* 사진 */}
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

            {/* 사장님 전달사항 / 거절 사유 */}
            {(data.status === '예약확정' || data.status === '예약거절') && (
              <div className="owner-section">
                <div className="divider" />
                <div className="owner-box">
                  <span className="owner-title">
                    {data.status === '예약거절' ? '거절 사유' : '전달 사항'}
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
