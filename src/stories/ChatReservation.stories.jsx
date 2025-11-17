import React, { useState } from 'react';
import MessageList from '../components/message/MessageList';
import * as S from '../pages/chat/ChatRoomPage.style';

export default {
  title: 'Chat/Reservation',
};

export const ReservationFlow = () => {
  const [messages, setMessages] = useState([]);

  const onReservationComplete = (data) => {
    setMessages((prev) => [
      ...prev,
      {
        messageId: `complete-${Date.now()}`,
        type: 'RESERVATION_COMPLETE',
        isReservationCard: true,
        payload: data,
        senderId: 999, // 예약카드는 항상 상대 메시지처럼 처리됨
        sentAt: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div style={{ width: 400, height: 600, border: '1px solid #ddd', padding: 16 }}>
      <button
        onClick={() =>
          onReservationComplete({
            name: '김진오',
            date: '11월 25일',
            time: '18:30',
          })
        }
      >
        예약 완료 이벤트 발생시키기
      </button>
      <S.PageWrapper>
        <S.Messages>
          <MessageList messages={messages} userId={1} />
        </S.Messages>
      </S.PageWrapper>
    </div>
  );
};
