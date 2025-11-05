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
      <h1
        style={{
          fontSize: '20px',
          fontWeight: 700,
          marginBottom: '30px',
          alignSelf: 'flex-start',
          marginLeft: '20px',
        }}
      >
        예약 내역
      </h1>

      <div
        style={{
          width: '360px',
          display: 'flex',
          flexDirection: 'column',
          gap: '25px',
        }}
      >
        {reservations?.map((res) => (
          <div
            key={res.id}
            style={{
              background: '#fafafa',
              border: '1px solid #f0f0f0',
              borderRadius: '16px',
              padding: '18px 20px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#eee',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '18px',
                }}
              >
                👤
              </div>
              <span style={{ fontWeight: 600, fontSize: '16px' }}>
                {res.name}
              </span>
            </div>

            <div style={{ marginTop: '14px', fontSize: '14px' }}>
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

            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <img
                src={res.photoUrl}
                alt="첨부사진"
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '12px',
              }}
            >
              <button
                style={{
                  background: '#ededed',
                  color: '#555',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius: '8px',
                  width: '80px',
                  height: '34px',
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
                  width: '80px',
                  height: '34px',
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
