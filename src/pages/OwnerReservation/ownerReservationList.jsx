import React, { useState, useEffect } from 'react';
import './ownerReservationList.css';
import { shopReservationService } from '../../api/services/shopReservation';
import { useConfirmReservation, useRejectReservation } from '../../query/reservationQueries';
export default function OwnerReservationList() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await shopReservationService.getShopReservations();

        const formatted = data.map((item) => ({
          id: item.id,
          name: item.customerName,
          date: item.date,
          time: item.time,
          photoUrl: item.photoUrls?.[0] || '',
          requestText: item.requestText || '',
          originalStatus: item.status, // PENDING/CONFIRMED/REJECTED
          extendCount: item.extendCount,
          wrappingCount: item.wrappingCount
        }));

        setReservations(formatted);
      } catch (err) {
        console.error('예약 데이터를 불러오지 못했습니다:', err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="owner-container">
      <h1 className="title-main">예약 내역</h1>

      <div className="owner-box-1">
        {reservations?.map((res) => (
          <ReservationCard key={res.id} res={res} />
        ))}
      </div>
    </div>
  );
}

function ReservationCard({ res }) {
  // 엔드 status → FE 상태칩 변환
  const statusMap = {
    PENDING: '접수 중',
    CONFIRMED: '예약 확정',
    REJECTED: '예약 거절',
  };

  const [status, setStatus] = useState(statusMap[res.originalStatus] || '접수 중');
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [totalMinutes, setTotalMinutes] = useState(60);

  //예약 확정 훅
  const { mutate: confirmReservation } = useConfirmReservation();
  //예약 거절 훅
  const { mutate: rejectReservation } = useRejectReservation();

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
    if (mode === 'confirm') {
      // 실제 API 호출 추가됨
      confirmReservation(
        { id: res.id, message },
        {
          onSuccess: () => {
            setStatus('예약 확정');
            setMode(null);
          },
        }
      );
      return;
    }

    if (mode === 'reject') {
      // 실제 API 호출 추가됨
      rejectReservation(
        { id: res.id, reason: message },
        {
          onSuccess: () => {
            setStatus('예약 거절');
            setMode(null);
          },
        }
      );
      return;
    }
  };

  return (
    <div className="card">
      {/* 이름 + 상태 */}
      <div className="usercard-header">
        <div className="user-wrap">
          <div className="user-icon">👤</div>
          <span className="user-name">{res.name}</span>

          <div
            className={`
              status-chip
              ${
                status === '예약 확정'
                  ? 'status-confirm'
                  : status === '예약 거절'
                    ? 'status-reject'
                    : 'status-pending'
              }
            `}
          >
            <span className="status-dot" />
            {status}
          </div>
        </div>
      </div>

      {/* 날짜/시간 */}
      <div className="basic-info">
        <div className="divider indented" />
        <div className="info-row">
          <span>예약 날짜</span>
          <span className="pink">{res.date}</span>
        </div>
        <div className="info-row">
          <span>예약 시간</span>
          <span className="pink">{res.time}</span>
        </div>
        <div className="divider indented" />
      </div>

      {/* 상세 보기 */}
      <div className="toggle" onClick={() => setIsOpen(!isOpen)}>
        <span>상세 보기</span>
        <span className={`toggle-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </div>

      {isOpen && (
        <div className="detail-section">
          {/* 손/발 / 제거 기본 옵션 */}
          {['손/발', '제거'].map((label) => (
            <div className="detail-row" key={label}>
              <span className="detail-key">{label}</span>
              <div className="detail-values">
                <span className="yes">유</span>
                <span className="no">무</span>
              </div>
            </div>
          ))}

          {/* 연장 / 랩핑 갯수 표시 추가 */}
          <div className="detail-row">
            <span className="detail-key">연장</span>
            <span className="detail-value">{res.extendCount ?? 0}회</span>
          </div>

          <div className="detail-row">
            <span className="detail-key">랩핑</span>
            <span className="detail-value">{res.wrappingCount ?? 0}개</span>
          </div>

          {/* 사진 */}
          <div className="photo-wrap">
            <span className="photo-label">사진</span>
            <div className="photo-list">
              <img src={res.photoUrl} alt="첨부" className="photo" />
            </div>
          </div>

          {/* 요구사항 */}
          <div className="request-wrap">
            <span className="request-label">요구사항</span>
            <div className="request-box">{res.requestText}</div>
            <div className="divider indented" />
          </div>
        </div>
      )}

      {/* 버튼 영역 */}
      {status === '접수 중' &s& !mode && (
        <div className="action-btns">
          <button className="btn reject-btn" onClick={handleReject}>
            거절
          </button>
          <button className="btn confirm-btn" onClick={handleConfirm}>
            수락
          </button>
        </div>
      )}

      {/* 수락 UI */}
      {mode === 'confirm' && (
        <div className="confirm-section">
          <div className="divider indented" />

          <div className="time-buttons">
            {['30분', '1시간', '1시간 30분', '2시간'].map((time) => (
              <button
                key={time}
                className={`time-btn ${selectedTime === time ? 'active' : ''}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>

          <div className="time-adjust-box">
            <button className="circle-btn" onClick={() => adjustTime(-30)}>
              −
            </button>

            <div className="time-display">
              <div className="main-time">{formatTime(totalMinutes)}</div>
              <div className="sub-time">{selectedTime || '시간 선택'}</div>
            </div>

            <button className="circle-btn plus" onClick={() => adjustTime(30)}>
              +
            </button>
          </div>

          <textarea
            className="textarea"
            placeholder="전달 사항을 입력해주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="submit-wrap">
            <button className="small-confirm-btn" onClick={handleSubmit}>
              확인
            </button>
          </div>
        </div>
      )}

      {/* 거절 UI */}
      {mode === 'reject' && (
        <div className="reject-section">
          <textarea
            className="textarea"
            placeholder="거절 사유를 입력해주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="submit-wrap">
            <button className="small-confirm-btn" onClick={handleSubmit}>
              확인
            </button>
          </div>
        </div>
      )}

      {/* 예약 확정 출력 */}
      {status === '예약 확정' && (
        <div className="final-box">
          <strong className="final-title">전달 사항</strong>
          {message || '전달사항이 없습니다.'}
        </div>
      )}

      {/* 예약 거절 출력 */}
      {status === '예약 거절' && (
        <div className="final-box">
          <strong className="final-title">거절 사유</strong>
          {message || '사유 없음'}
        </div>
      )}
    </div>
  );
}
