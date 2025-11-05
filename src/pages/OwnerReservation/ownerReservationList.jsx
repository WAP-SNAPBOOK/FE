import React from 'react';

export default function OwnerReservationList({ reservations }) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 0',
        fontFamily: 'Pretendard',
      }}
    >
      {/* 제목 */}
      <h1
        style={{
          fontSize: '20px',
          fontWeight: 700,
          marginBottom: '30px',
          alignSelf: 'flex-start',
          marginLeft: '24px',
        }}
      >
        예약 내역
      </h1>

      {/* 예약 카드 컨테이너 */}
      <div
        style={{
          width: '360px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {reservations?.map((res) => (
          <div
            key={res.id}
            style={{
              background: '#fff',
              border: '1px solid #eee',
              borderRadius: '16px',
              padding: '18px 20px 22px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            {/* 상단 이름 + 프로필 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid #ddd',
                  background: '#f9f9f9',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '18px',
                }}
              >
                👤
              </div>
              <span style={{ fontWeight: 600, fontSize: '16px', color: '#222' }}>
                {res.name}
              </span>
            </div>

            {/* 예약 정보 */}
            <div
              style={{
                fontSize: '14px',
                color: '#555',
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
                <span style={{ color: '#999' }}>예약 날짜</span>
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
                <span style={{ color: '#999' }}>예약 시간</span>
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
                <span style={{ color: '#999' }}>첨부 사진</span>
                <span style={{ color: '#333', fontWeight: 600 }}>
                  {res.photoCount}장
                </span>
              </div>
            </div>

            {/* 사진 미리보기 */}
            <div
              style={{
                marginTop: '10px',
                textAlign: 'center',
              }}
            >
              <img
                src={res.photoUrl}
                alt="첨부사진"
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  border: '1px solid #eee',
                }}
              />
            </div>

            {/* 버튼 */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                marginTop: '16px',
              }}
            >
              <button
                style={{
                  background: '#f2f2f2',
                  color: '#444',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: '8px',
                  width: '90px',
                  height: '36px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
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
                  width: '90px',
                  height: '36px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}
              >
                수락
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
