import { useCallback } from 'react';
import { reservationService } from '../../api/services/reservationService';

const RESERVATION_MESSAGE_TYPES = [
  'RESERVATION_CREATED',
  'RESERVATION_CONFIRMED',
  'RESERVATION_REJECTED',
];

export function useReservationSocketHandler(setLiveMessages) {
  const handleReservationMessage = useCallback(
    async (incoming) => {
      // 예약 메시지가 아니면 처리 안 함
      if (!RESERVATION_MESSAGE_TYPES.includes(incoming.messageType)) {
        return false;
      }

      try {
        const reservation = await reservationService.getReservationById(incoming.reservationId);

        setLiveMessages((prev) => {
          return [
            ...prev,
            {
              messageId: incoming.messageId,
              senderId: incoming.senderId,
              senderName: incoming.senderName,
              sentAt: incoming.sentAt,

              isReservationCard: true,
              type: incoming.messageType, // 예약 상태의  기준
              payload: {
                id: incoming.reservationId,
                customerName: reservation.customerName,
                date: reservation.date,
                time: reservation.time,
                photoCount: reservation.photoCount,
                photoUrls: reservation.photoUrls,
                part: reservation.part,
                removal: reservation.removal,
                requests: reservation.requests,
                extendCount: reservation.extendCount,
                wrappingCount: reservation.wrappingCount,
                extendStatus: reservation.extendStatus,
                wrappingStatus: reservation.wrappingStatus,
                confirmationMessage: reservation.confirmationMessage,
                rejectionReason: reservation.rejectionReason,
              },
            },
          ];
        });

        return true;
      } catch (e) {
        console.error('예약 단건 조회 실패', e);
        return true; // 예약 메시지였으니 여기서 소비
      }
    },
    [setLiveMessages]
  );

  return { handleReservationMessage };
}
