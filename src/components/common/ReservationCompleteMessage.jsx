import React from 'react';

function CheckIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="20" fill="#fb808a" />
      <path
        d="M28 15L18 25L12 19"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ReservationCompleteMessage({
  brand,
  logoUrl,
  name,
  date,
  time,
  photoCount,
  footer,
}) {
  return (
    <div
      style={{
        background: '#fff',
        border: '4px solid #ededed',
        borderRadius: 16,
        width: 260,
        padding: '24px 18px 20px 18px',
        boxShadow: '0 2px 8px #eee',
        position: 'relative',
        margin: '12px 0'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
        <img
          src={logoUrl}
          alt="brand logo"
          style={{ width: 34, height: 34, borderRadius: '50%', marginRight: 8 }}
        />
        <span style={{
          fontWeight: 600,
          fontSize: '1.1rem',
          color: '#333'
        }}>{brand}</span>
      </div>
      <div style={{ position: 'absolute', left: 18, top: 58 }}>
        <CheckIcon />
      </div>
      <div style={{ marginLeft: 46 }}>
        <div style={{
          fontWeight: 700,
          fontSize: '1.2rem',
          letterSpacing: -1,
          marginBottom: 14,
          marginTop: 2,
        }}>예약 접수 완료</div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
          color: '#b3b3b3',
          fontWeight: 500,
          fontSize: 14
        }}>
          <span>고객명</span>
          <span style={{ color: '#222', fontWeight: 600 }}>{name}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
          color: '#b3b3b3',
          fontWeight: 500,
          fontSize: 14
        }}>
          <span>예약 날짜</span>
          <span style={{ color: '#fb808a', fontWeight: 700 }}>{date}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 8,
          color: '#b3b3b3',
          fontWeight: 500,
          fontSize: 14
        }}>
          <span>예약 시간</span>
          <span style={{ color: '#fb808a', fontWeight: 700 }}>{time}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#b3b3b3',
          fontWeight: 500,
          fontSize: 14
        }}>
          <span>첨부 사진</span>
          <span>{photoCount}장</span>
        </div>
      </div>
      {footer && (
        <span style={{ color: '#b3b3b3', marginTop: 10, fontSize: 13, display: 'block', textAlign: 'right' }}>
          {footer}
        </span>
      )}
    </div>
  );
}
