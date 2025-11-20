import React, { useState } from 'react';
import MessageList from '../../components/message/MessageList';
import * as S from '../../pages/chat/ChatRoomPage.style';
import ChatStories from './chatStories';
import { messages } from './storyMessages';

export default {
  title: 'Chat/ReservationStates',
  component: ChatStories,
};

const textOnly = messages.filter((m) => m.messageType === 'TEXT');

const reservationOnly = messages.filter((m) => m.isReservationCard);

const mixedMessages = messages;

const oneReservation = [messages.find((m) => m.isReservationCard)];

const manyReservations = messages.filter((m) => m.isReservationCard).slice(0, 5);

const latestMessage = [messages[messages.length - 1]];

const emptyMessages = [];

export const TextOnly = {
  args: {
    messages: textOnly,
  },
};

export const OnlyReservations = {
  args: {
    messages: reservationOnly,
  },
};

export const Mixed = {
  args: {
    messages: mixedMessages,
  },
};

export const OneReservation = {
  args: {
    messages: oneReservation,
  },
};

export const ManyReservations = {
  args: {
    messages: manyReservations,
  },
};

export const LatestMessageOnly = {
  args: {
    messages: latestMessage,
  },
};

export const EmptyState = {
  args: {
    messages: emptyMessages,
  },
};

export const ReservationFlow = () => {
  const [messages, setMessages] = useState([]);
  const onReservationComplete = (data) => {
    setMessages((prev) => [
      ...prev,
      {
        messageId: `complete-${Date.now()}`,
        type: 'PENDING',
        isReservationCard: true,
        payload: data,
        senderId: 999, // 예약카드는 항상 상대 메시지처럼 처리됨
        sentAt: new Date().toISOString(),
      },
    ]);
  };

  return (
    <>
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
    </>
  );
};
