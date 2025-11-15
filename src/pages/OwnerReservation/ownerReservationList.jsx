import React, { useState } from 'react';

export default function OwnerReservationList({ reservations }) {
  return (
    <div
      style={{
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Pretendard',
        padding: '40px 0',
      }}
    >
      <h1
        style={{
          fontSize: '22px',
          fontWeight: 700,
          color: '#111',
          alignSelf: 'flex-start',
          marginLeft: 'calc(50% - 170px)',
          marginBottom: '24px',
        }}
      >
        예약 내역
      </h1>

      <div
        style={{
          backgroundColor: '#f1f1f1',
          width: '341px',
          height: '652px',
          borderRadius: '16px',
          padding: '26px',
          overflowY: 'auto',
        }}
      >
        {reservations?.map((res) => (
          <ReservationCard key={res.id} res={res} />
        ))}
      </div>
    </div>
  );
}

function ReservationCard({ res }) {
  const [status, setStatus] = useState('접수 중');
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState(null); // confirm / reject
  const [message, setMessage] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [totalMinutes, setTotalMinutes] = useState(60);

  // 시간 조절 버튼
  const adjustTime = (delta) => {
    setTotalMinutes((prev) => Math.max(30, Math.min(prev + delta, 180)));
  };

  const formatTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h.toString().padStart(2, '0')}:${m === 0 ? '00' : m}`;
  };

  const handleConfirm = () => setMode('confirm');
  const handleReject = () => setMode('reject');

  const handleSubmit = () => {
    if (mode === 'confirm') setStatus('예약 확정');
    if (mode === 'reject') setStatus('예약 거절');
    setMode(null);
  };

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '16px',
        border: '1px solid #eee',
        padding: '20px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      {/* 상단: 이름 + 상태 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              border: '1px solid #ddd',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#bbb',
              fontSize: '18px',
            }}
          >
            👤
          </div>
          <span style={{ fontWeight: 600, fontSize: '15px', color: '#111' }}>
            {res.name}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignitems: 'center',
            gap: '4px',
            background:
              status === '예약 확정'
                ? '#b8d3b8ff'
                : status === '예약 거절'
                ? '#ffd0d0ff'
                : '#b1b1f9ff',
            color:
              status === '예약 확정'
                ? '#008000'
                : status === '예약 거절'
                ? '#ff0000'
                : '#0000FF',
            fontWeight: 600,
            fontSize: '11px',
            padding: '3.5px 6px',
            borderRadius: '5px',
          }}
        >
          <span
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              background:
                status === '예약 확정'
                  ? '#008000'
                  : status === '예약 거절'
                  ? '#FF0000'
                  : '#0000FF',
              display: 'inline-block',
              position: 'relative',
              top: '4px',
            }}
          />

          {status}
        </div>
      </div>

      {/* 구분선 */}
      <div
        style={{
          height: '1px',
          background: '#eee',
          margin: '10px 0 10px 48px',
        }}
      />

      {/* 기본 예약 정보 */}
      <div style={{ marginLeft: '48px', fontSize: '13px', color: '#999' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>예약 날짜</span>
          <span style={{ color: '#fb808a', fontWeight: 600 }}>{res.date}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>예약 시간</span>
          <span style={{ color: '#fb808a', fontWeight: 600 }}>{res.time}</span>
        </div>
      </div>

      {/* 구분선 */}
      <div
        style={{
          height: '1px',
          background: '#eee',
          margin: '10px 0 10px 48px',
        }}
      />

      {/* 상세 보기 토글 */}
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
          marginTop: '10px',
          paddingLeft: '48px',
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
      {isOpen && (
        <div
          style={{
            marginTop: '12px',
            fontSize: '9px',
            color: '#444',
            paddingLeft: '48px',
          }}
        >
          {['손/발', '제거', '연장', '램핑'].map((label) => (
            <div
              key={label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6px',
              }}
            >
              <span style={{ color: '#272727ff', fontWeight: 500 }}>
                {label}
              </span>
              <div style={{ display: 'flex', gap: '10px', color: '#bbb' }}>
                <span style={{ color: '#222' }}>유</span>
                <span>무</span>
              </div>
            </div>
          ))}

          {/* 사진 */}
          <div style={{ marginTop: '10px' }}>
            <span
              style={{
                color: '#515151',
                display: 'block',
                marginBottom: '6px',
              }}
            >
              사진
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <img
                src={res.photoUrl}
                alt="첨부사진"
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  border: '1px solid #ddd',
                }}
              />
            </div>
          </div>

          {/* 요구사항 */}
          <div style={{ marginTop: '14px' }}>
            <span
              style={{
                color: '#2b2b2b',
                display: 'block',
                marginBottom: '6px',
              }}
            >
              요구사항
            </span>
            <div
              style={{
                background: '#fff',
                border: '1px solid #D3D3D3',
                borderRadius: '10px',
                padding: '10px',
                lineHeight: 1.5,
                marginBottom: '12px',
              }}
            >
              {res.requestText}
            </div>
          </div>
        </div>
      )}

      {/* 버튼 영역 */}
      {status === '접수 중' && !mode && (
        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginTop: '16px',
            justifyContent: 'center',
            paddingLeft: '48px',
          }}
        >
          <button
            onClick={handleReject}
            style={{
              background: '#ededed',
              color: '#555',
              fontWeight: 700,
              border: 'none',
              borderRadius: '8px',
              width: '95px',
              height: '37px',
              fontSize: '13px',
            }}
          >
            거절
          </button>
          <button
            onClick={handleConfirm}
            style={{
              background: '#ec6060',
              color: '#fff',
              fontWeight: 700,
              border: 'none',
              borderRadius: '8px',
              width: '95px',
              height: '37px',
              fontSize: '13px',
            }}
          >
            수락
          </button>
        </div>
      )}

      {/* 수락(확인 전) UI */}
      {mode === 'confirm' && (
        <>
          <div
            style={{
              height: '1px',
              background: '#eee',
              margin: '10px 0 10px 48px',
            }}
          />

          <div style={{ marginTop: '10px', paddingLeft: '48px' }}>
            {/* 시간 선택 버튼 */}
            <div
              style={{
                display: 'flex',
                gap: '4px',
                marginBottom: '10px',
              }}
            >
              {['30분', '1시간', '1시간 30분', '2시간'].map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  style={{
                    background: selectedTime === time ? '#f0f0f0' : '#fff',
                    border:
                      selectedTime === time
                        ? '1px solid #555'
                        : '1px solid #ddd',
                    borderRadius: '25px',
                    padding: '5px 6px',
                    fontSize: '8px',
                    fontWeight: selectedTime === time ? 700 : 500,
                    cursor: 'pointer',
                    transition: '0.2s',
                  }}
                >
                  {time}
                </button>
              ))}
            </div>

            {/* 시간 조절 UI */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '50px',
                border: '1px solid #ddd',
                borderRadius: '30px',
                padding: '10px 0px',
                width: '193px',
                height: '39px',
                background: '#fff',
              }}
            >
              <button
                onClick={() => adjustTime(-30)}
                style={{
                  width: '23px',
                  height: '23px',
                  borderRadius: '50%',
                  background: '#d3d3d3',
                  border: 'none',
                  fontSize: '12px',
                }}
              >
                −
              </button>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '12px', fontWeight: 700 }}>
                  {formatTime(totalMinutes)}
                </div>
                <div style={{ fontSize: '8px', color: '#777' }}>
                  {selectedTime || '시간 선택'}
                </div>
              </div>

              <button
                onClick={() => adjustTime(30)}
                style={{
                  width: '23px',
                  height: '23px',
                  borderRadius: '50%',
                  background: '#d3d3d3',
                  border: 'none',
                  fontSize: '16px',
                }}
              >
                +
              </button>
            </div>

            {/* 전달 사항 */}
            <textarea
              placeholder="전달 사항을 입력해주세요."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: '100%',
                height: '66px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '12px 13px',
                fontSize: '11px',
                resize: 'none',
                marginTop: '10px',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                onClick={handleSubmit}
                style={{
                  background: '#ec6060',
                  color: '#fff',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: '8px',
                  width: '56px',
                  height: '24px',
                  fontSize: '9px',
                  cursor: 'pointer',
                }}
              >
                확인
              </button>
            </div>
          </div>
        </>
      )}

      {/* 거절 입력창 */}
      {mode === 'reject' && (
        <>
          <div
            style={{
              height: '1px',
              background: '#eee',
              margin: '10px 0 10px 48px',
            }}
          />

          <div style={{ marginTop: '16px', paddingLeft: '48px' }}>
            <textarea
              placeholder="거절 사유를 입력해주세요."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: '100%',
                height: '66px',
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '12px 13px',
                fontSize: '11px',
                resize: 'none',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                onClick={handleSubmit}
                style={{
                  background: '#ec6060',
                  color: '#fff',
                  fontWeight: 700,
                  border: 'none',
                  borderRadius: '8px',
                  width: '56px',
                  height: '24px',
                  fontSize: '9px',
                }}
              >
                확인
              </button>
            </div>
          </div>
        </>
      )}

      {/* 최종 출력 — 예약 확정 */}
      {status === '예약 확정' && (

        <>
        {/* 구분선 */}
        <div
           style={{
            height: '1px',
            background: '#eee',
            margin: '10px 0 10px 48px',
          }}
        />

        <div
          style={{
            background: '#e5e7ec',
            border: '1px solid #d3d3d3',
            borderRadius: '12px',
            padding: '14px',
            marginTop: '12px',
            color: '#222',
            fontSize: '8px',
            lineHeight: 1.5,
            marginLeft: '48px',
          }}
        >
          <strong
            style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '11px',
            }}
          >
            전달 사항
          </strong>

          {selectedTime && (
            <div style={{ fontSize: '11px', marginBottom: '4px', color: '#666' }}>
              소요시간: {selectedTime}
            </div>
          )}

          {message || '전달사항이 없습니다.'}
        </div>
        </>
      )}

      

      {/* 최종 출력 — 예약 거절 */}
      {status === '예약 거절' && (

      <>
        {/* 구분선 */}
        <div
           style={{
            height: '1px',
            background: '#eee',
            margin: '10px 0 10px 48px',
          }}
        />

        <div
          style={{
            background: '#e5e7ec',
            borderRadius: '12px',
            padding: '14px',
            marginTop: '12px',
            color: '#000',
            fontSize: '8px',
            lineHeight: 1.5,
            marginLeft: '48px',
          }}
        >
          <strong style={{ display: 'block', marginBottom: '6px', fontSize: '11px' }}>
            거절 사유
          </strong>
          {message || '사유 없음'}
        </div>
        </>
      )}
    </div>
  );
}
