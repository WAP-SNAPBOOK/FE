import React from 'react';

export default function OwnerReservationList({ reservations }) {
  return (
    <div
      style={{
        backgroundColor: '#f8f8f8',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Pretendard',
      }}
    >
      {/* 제목 */}
      <h1
        style={{
          fontSize: '20px',
          fontWeight: 700,
          marginBottom: '24px',
          alignSelf: 'flex-start',
          marginLeft: 'calc(50% - 170px)',
        }}
      >
        예약 내역
      </h1>

      {/* 회색 박스 */}
      <div
        style={{
          backgroundColor: '#e9e9e9',
          width: '341px',
          height: '652px',
          borderRadius: '16px',
          padding: '26px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflowY: 'auto',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
          margin: '26px',
        }}
      >
        {/* 카드 리스트 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
          }}
        >
          {reservations?.map((res) => (
            <div
              key={res.id}
              style={{
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid #eee',
                width: '298px',
                height: '337px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                boxSizing: 'border-box',
              }}
            >
              {/* 이름 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '14px',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: '1px solid #ddd',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '18px',
                    color: '#aaa',
                  }}
                >
                  👤
                </div>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: '15px',
                    color: '#222',
                  }}
                >
                  {res.name}
                </span>
              </div>

              {/* 예약 정보 */}
              <div
                style={{
                  fontSize: '13.5px',
                  color: '#999',
                  marginLeft: '48px',
                  marginBottom: '12px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                  }}
                >
                  <span>예약 날짜</span>
                  <span style={{ color: '#fb808a', fontWeight: 600 }}>
                    {res.date}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                  }}
                >
                  <span>예약 시간</span>
                  <span style={{ color: '#fb808a', fontWeight: 600 }}>
                    {res.time}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>첨부 사진</span>
                  <span style={{ color: '#333', fontWeight: 600 }}>
                    {res.photoCount}장
                  </span>
                </div>
              </div>

              {/* 사진 */}
              <div
                style={{
                  marginLeft: '48px',
                  marginBottom: '18px',
                }}
              >
                <img
                  src={res.photoUrl}
                  alt="첨부사진"
                  style={{
                    width: '130px',
                    height: '130px',
                    borderRadius: '10px',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* 버튼 */}
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  marginLeft: '48px',
                  marginTop: '-28px',
                  justifyContent: 'flex-start',
                }}
              >
                <button
                  style={{
                    background: '#ededed',
                    color: '#555',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: '8px',
                    width: '97px',
                    height: '37px',
                  }}
                >
                  거절
                </button>
                <button
                  style={{
                    background: '#fb808a',
                    color: '#fff',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: '8px',
                    width: '97px',
                    height: '37px',
                  }}
                >
                  수락
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
