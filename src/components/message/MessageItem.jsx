import React from 'react';
import * as S from './MessageItem.style';
import { formatTime } from '../../utils/formatTime';
import ReservationCompleteMessage from '../message/ReservationCompleteMessage';
import ReservationDecisionMessage from '../message/ReservationDecisionMessage';
import DecisionCard from '../message/DecisionCard';
import { useAuth } from '../../context/AuthContext';

export default function MessageItem({ msg, isMine }) {
  const { auth } = useAuth();
  const isOwner = auth?.userType === 'OWNER'; //점주 여부

  if (!msg?.isReservationCard && !msg?.message?.trim()) {
    return null;
  }

  // 예약 상태 카드 처리
  if (msg.isReservationCard) {
    let CardComponent = null;

    switch (msg.type) {
      case 'RESERVATION_CREATED':
        // 점주 → 수락/거절 카드
        if (isOwner) {
          CardComponent = <ReservationDecisionMessage reservation={msg.payload} />;
        } else {
          //일반 고객
          CardComponent = (
            <ReservationCompleteMessage
              name={msg.payload.customerName}
              date={msg.payload.date}
              time={msg.payload.time}
              photoCount={msg.payload.photoCount}
            />
          );
        }

        break;

      case 'RESERVATION_CONFIRMED':
        CardComponent = (
          <DecisionCard
            variant="approved"
            customerName={msg.payload.customerName}
            dateText={msg.payload.date}
            timeText={msg.payload.time}
            noteText={msg.payload.confirmationMessage}
          />
        );
        break;

      case 'RESERVATION_REJECTED':
        CardComponent = (
          <DecisionCard
            variant="rejected"
            customerName={msg.payload.customerName}
            dateText={msg.payload.date}
            timeText={msg.payload.time}
            noteText={msg.payload.rejectionReason ?? '예약이 불가한 시간입니다.'}
          />
        );
        break;
    }

    return (
      <S.MessageRow $isMine={false}>
        <S.Bubble $isMine={false}>{CardComponent}</S.Bubble>
        <S.Time>{formatTime(msg.sentAt)}</S.Time>
      </S.MessageRow>
    );
  }

  //일반 메시지 처리
  return (
    <S.MessageRow $isMine={isMine}>
      {/*상대방, 본인 메시지에 따른 정렬 */}
      {isMine ? (
        <>
          <S.Time>{formatTime(msg.sentAt)}</S.Time>
          <S.Bubble $isMine>{msg.message}</S.Bubble>
        </>
      ) : (
        <>
          <S.Bubble $isMine={false}>{msg.message}</S.Bubble>
          <S.Time>{formatTime(msg.sentAt)}</S.Time>
        </>
      )}
    </S.MessageRow>
  );
}
