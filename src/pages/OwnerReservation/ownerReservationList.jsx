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
  const [status, setStatus] = useState('접수 중'); // 상태
  const [isOpen, setIsOpen] = useState(false); // 상세 보기 토글
  const [mode, setMode] = useState(null); // confirm / reject
  const [message, setMessage] = useState(''); // 전달사항 or 거절사유
  const [selectedTime, setSelectedTime] = useState(''); // ✅ 예상 소요 시간
  const [totalMinutes, setTotalMinutes] = useState(60); // ✅ 초기값: 1시간

  // ✅ 시간 조절 함수
  const adjustTime = (delta) => {
    setTotalMinutes((prev) => Math.max(30, Math.min(prev + delta, 180))); 
    // 최소 30분, 최대 180분(3시간)
  };

  // ✅ 시간 표시 포맷 (예: 01:00)
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
          <span style={{ fontWeight: 600, fontSize: '15px', color: '#111' }}>{res.name}</span>
        </div>

        <div
          style={{
            background:
              status === '예약 확정'
                ? '#FFE8E8'
                : status === '예약 거절'
                ? '#F5F5F5'
                : '#ECE6FF',
            color:
              status === '예약 확정'
                ? '#EC6060'
                : status === '예약 거절'
                ? '#999'
                : '#6A45FF',
            fontWeight: 600,
            fontSize: '11px',
            padding: '4px 10px',
            borderRadius: '10px',
          }}
        >
          {status}
        </div>
      </div>

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
            animation: 'fadeIn 0.3s ease',
          }}
        >
          {[{ label: '손/발', left: '손', right: '발' },
            { label: '제거', left: '유', right: '무' },
            { label: '연장', left: '유', right: '무' },
            { label: '램핑', left: '유', right: '무' }].map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6px',
              }}
            >
              <span style={{ color: '#272727ff', fontWeight: 500 }}>{item.label}</span>
              <div style={{ display: 'flex', gap: '10px', color: '#bbb' }}>
                <span style={{ color: '#222' }}>{item.left}</span>
                <span>{item.right}</span>
              </div>
            </div>
          ))}

          {/* 사진 */}
          <div style={{ marginTop: '10px' }}>
            <span style={{ color: '#515151', display: 'block', marginBottom: '6px' }}>사진</span>
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
              <div
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '10px',
                  border: '1px dashed #ddd',
                }}
              ></div>
            </div>
          </div>

          {/* 요구사항 */}
          <div style={{ marginTop: '14px' }}>
            <span style={{ color: '#2b2b2b', display: 'block', marginBottom: '6px' }}>요구사항</span>
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
              cursor: 'pointer',
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
              cursor: 'pointer',
            }}
          >
            수락
          </button>
        </div>
      )}

      {/* ✅ 수락 시 전달사항 */}
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

            {/* ✅ 예상 소요 시간 선택 (버튼 + 증감식 타이머) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '10px',
                marginBottom: '16px',
              }}
            >
              {/* 시간 버튼 그룹 */}
              <div
                style={{
                  display: 'flex',
                  gap: '4px',
                }}
              >
                {['30분', '1시간', '1시간 30분', '2시간'].map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    style={{
                      background:
                        selectedTime === time ? '#f0f0f0' : '#fff',
                      border: selectedTime === time ? '1px solid #555' : '1px solid #ddd',
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

              {/* 증감 타이머 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '30px',
                  padding: '10px 20px',
                  width: '197px',
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
                    cursor: 'pointer',
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
                    cursor: 'pointer',
                  }}
                >
                  +
                </button>
              </div>
            </div>


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
                fontFamily: 'Pretendard',
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
                  cursor: 'pointer',
                }}
              >
                확인
              </button>
            </div>
          </div>
        </>
      )}

      {/* ✅ 거절 시 사유 입력 */}
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
                fontFamily: 'Pretendard',
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
                  cursor: 'pointer',
                }}
              >
                확인
              </button>
            </div>
          </div>
        </>
      )}

      {/* ✅ 전달사항 / 거절사유 최종 박스 */}
      {status === '예약 확정' && (
        <div
          style={{
            background: '#fff5f5',
            borderRadius: '12px',
            padding: '14px',
            paddngTop: '10px',
            marginTop: '12px',
            color: '#222',
            fontSize: '12px',
            lineHeight: 1.5,
            marginLeft: '48px',
          }}
        >
          <strong style={{ display: 'block', marginBottom: '6px' }}>전달 사항</strong>
          {selectedTime && (
            <div style={{ color: '#666', marginBottom: '4px', fontSize: '11px' }}>
              소요시간: {selectedTime}
            </div>
          )}
          {message || '전달사항이 없습니다.'}
        </div>
      )}

      {status === '예약 거절' && (
        <div
          style={{
            background: '#e5e7ec',
            borderRadius: '12px',
            width: '198px',
            padding: '14px',
            marginTop: '12px',
            color: '#555',
            fontSize: '12px',
            lineHeight: 1.5,
            marginLeft: '48px',
          }}
        >
          <strong style={{ display: 'block', marginBottom: '6px', paddingleft: '13px' }}>거절 사유</strong>
          {message || '사유 없음'}
        </div>
      )}
    </div>
  );
}
