import { useRef, useState, useEffect } from 'react';
import { reservationService } from '../../api/services/reservationService';

export function useNormalizedMessages(rawMessages) {
  const cacheRef = useRef(new Map());

  const [normalized, setNormalized] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function normalize() {
      const result = await Promise.all(
        rawMessages.map(async (msg) => {
          if (msg.messageType !== 'RESERVATION_CREATED') {
            return msg;
          }

          // 🔥 이미 처리한 예약이면 재요청 X
          if (cacheRef.current.has(msg.reservationId)) {
            return cacheRef.current.get(msg.reservationId);
          }

          const r = await reservationService.getReservationById(msg.reservationId);

          const converted = {
            messageId: msg.messageId,
            sentAt: msg.sentAt,
            isReservationCard: true,
            type: r.status,
            payload: {
              id: r.id,
              name: r.customerName,
              date: r.date,
              time: r.time,
              photoCount: r.photoCount,
            },
          };

          cacheRef.current.set(msg.reservationId, converted);
          return converted;
        })
      );

      if (!cancelled) setNormalized(result);
    }

    normalize();
    return () => (cancelled = true);
  }, [rawMessages]);

  return normalized;
}
