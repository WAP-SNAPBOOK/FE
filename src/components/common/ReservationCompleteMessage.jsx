import React from 'react';

function CheckIcon() {
  return (
    
      <svg width="30px" height="30px" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="15" cy="15" r="15" fill="#F08080"/>
      <path d="M21 11.5L12.75 19.75L9 16" stroke="#FEE9E7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

  );
}

export function ReservationCompleteMessage({
  name,
  date,
  time,
  photoCount,

}) {
  return (
    <div
      style={{
        background: '#fff',
        border: '4px solid #ededed',
        borderRadius: 16,
        width: '240px',
        height: '201px',
        padding: '15px',
        boxShadow: '0 2px 8px #eee',
        position: 'relative',
        fontFamily: 'Pretendard',
        color: '#b3b3b3',
        fontSize: '13px',
      }}
    >
      {/* 체크 아이콘 왼쪽 위 고정 */}
      <div style={{
        position: 'absolute',
        top: 19,
        left: 15,
      }}>
        <CheckIcon />
      </div>

      {/* '예약 접수 완료' 중앙 정렬 */}
      <div style={{
        textAlign: 'left',
        fontWeight: 800,
        fontSize: '22px',
        color: '#222',
        marginBottom: 18,
        marginTop: 38,
        letterSpacing: '-2px',
      }}>
        예약 접수 완료
      </div>

      {/* 예약 정보 영역 */}
      <div style={{ marginLeft: 0 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 1,
        }}>
          <span style={{ color: '#C0C0C0', fontWeight: 600 }}>고객명</span>
          <span style={{ color: '#222', fontWeight: 600 }}>{name}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 1,
        }}>
          <span style={{ color: '#C0C0C0', fontWeight: 600, letterSpacing: '-0.5px', }}>예약 날짜</span>
          <span style={{ color: '#F08080', fontWeight: 600, letterSpacing: '-0.5px', }}>{date}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 1,
        }}>
          <span style={{ color: '#C0C0C0', fontWeight: 600, letterSpacing: '-0.5px', }}>예약 시간</span>
          <span style={{ color: '#F08080', fontWeight: 600 }}>{time}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <span style={{ color: '#C0C0C0', fontWeight: 600, letterSpacing: '-0.5px', }}>첨부 사진</span>
          <span style={{ color: '#C0C0C0', fontWeight: 600 }}>{photoCount}장</span>
        </div>
      </div>
    </div>
  );
}
