import React, { useState } from 'react';

function CheckIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="15" r="15" fill="#FB808A" />
      <path
        d="M21 11.5L12.75 19.75L9 16"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ReservationCompleteMessage({
  name,
  date,
  time,
  selectedOptions,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '20px',
        width: '240px',
        height: isOpen ? 'auto' : '212px',
        padding: '22px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        fontFamily: 'Pretendard',
        overflow: 'hidden',
      }}
    >
      {/* 상단 아이콘 */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <CheckIcon />
      </div>

      {/* 타이틀 */}
      <h2
        style={{
          fontSize: '20px',
          fontWeight: 800,
          color: '#111',
          marginTop: '0px', // 🔹 마이너스 마진 제거
          marginBottom: '14px',
        }}
      >
        예약 접수 완료
      </h2>

      {/* 기본 예약 정보 */}
      <div style={{ fontSize: '13px', color: '#555', marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ color: '#aaa', fontWeight: 600 }}>고객명</span>
          <span style={{ color: '#222', fontWeight: 600 }}>
            {name || '정보 없음'}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ color: '#aaa', fontWeight: 600 }}>예약 날짜</span>
          <span style={{ color: '#FB808A', fontWeight: 600 }}>
            {date || '-'}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#aaa', fontWeight: 600 }}>예약 시간</span>
          <span style={{ color: '#FB808A', fontWeight: 600 }}>
            {time || '-'}
          </span>
        </div>
      </div>

      {/* 구분선 */}
      <div
        style={{
          height: '1px',
          background: '#eee',
          margin: '10px 0',
        }}
      />

      {/* 상세 보기 버튼 */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          cursor: 'pointer',
          color: '#aaa',
          fontWeight: 600,
          fontSize: '9px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>상세 보기</span>
        <span
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: '0.2s',
          }}
        >
          ▼
        </span>
      </div>

      {/* 상세 내용 */}
      <div
        style={{
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          pointerEvents: isOpen ? 'auto' : 'none',
          marginTop: isOpen ? '6px' : '0',
          fontSize: '9px',
          color: '#444',
          width: '100%',
        }}
      >
        {isOpen && (
          <>
            {/* 손/발, 제거, 연장, 램핑 */}
            {[
              { label: '손/발', options: ['손', '발'], selected: selectedOptions?.hand },
              { label: '제거', options: ['유', '무'], selected: selectedOptions?.remove },
              { label: '연장', options: ['유', '무'], selected: selectedOptions?.extension },
              { label: '램핑', options: ['유', '무'], selected: selectedOptions?.lamping },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: '#515151', fontWeight: 500 }}>{item.label}</span>
                <div
                  style={{
                    display: 'flex',
                    gap: '6px',
                    justifyContent: 'flex-end',
                    width: '80px',
                  }}
                >
                  {item.options.map((option) => {
                    const isSelected =
                      item.selected === option ||
                      (item.label === '손/발' && item.selected === '손발');
                    return (
                      <span
                        key={option}
                        style={{
                          color: isSelected ? 'rgba(0,0,0,0.5)' : '#C0C0C0',
                          fontWeight: 400,
                        }}
                      >
                        {option}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* 사진 미리보기 */}
            {selectedOptions?.photos?.length > 0 && (
              <div style={{ marginBottom: '12px', marginTop: '10px' }}>
                <span style={{ color: '#515151', display: 'block', marginBottom: '6px' }}>사진</span>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    gap: '6px',
                    overflowX: 'auto',
                    marginTop: '6px',
                    paddingBottom: '4px',
                    boxSizing: 'border-box',
                    scrollbarWidth: 'thin',
                  }}
                >
                  {selectedOptions.photos.map((url, i) => (
                    <div
                      key={i}
                      style={{
                        flex: '0 0 auto',
                        width: '52px',
                        height: '52px',
                        borderRadius: '10px',
                        background: `url(${url}) center/cover`,
                        border: '1px solid #D3D3D3',
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* 요구사항 */}
            <div>
              <span style={{ color: '#2b2b2b', display: 'block', marginBottom: '6px' }}>요구사항</span>
              <div
                style={{
                  width: '198px',
                  background: '#fff',
                  border: '1px solid #D3D3D3',
                  borderRadius: '10px',
                  padding: '10px',
                  lineHeight: 1.4,
                  color: '#000000',
                  fontFamily: 'Pretendard',
                  fontSize: '9px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {selectedOptions?.requestText || '요구사항이 없습니다.'}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
