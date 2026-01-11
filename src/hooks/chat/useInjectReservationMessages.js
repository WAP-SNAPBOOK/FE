import { useEffect } from 'react';
/**
 * 일반 메시지와 예약 상태 메시지 합치기
 * @param {Array} reservations 예약 상태 조회
 * @param {Function} setLiveMessages //실시간 메시지 상태함수
 */
export function useInjectReservationMessages(reservations, setLiveMessages) {
  useEffect(() => {
    if (!reservations || reservations.length === 0) return;

    // 예약 -> 메시지 변환
    const reservationMessages = reservations.map((r) => ({
      messageId: `reservation-${r.id}`,
      type: r.status,
      isReservationCard: true,
      payload: {
        id: r.id,
        name: r.customerName,
        date: r.date,
        time: r.time,
        photoCount: r.photoCount,
        info: {
          photoUrls: r.photoUrls,
          extendCount: r.extendCount,
          extendStatus: r.extendStatus,
          part: r.part,
          removal: r.removal,
          requests: r.requests,
          wrappingCount: r.wrappingCount,
          wrappingStatus: r.wrappingStatus,
        },
      },
      sentAt: r.createdAt,
      confirmationMessage: r.confirmationMessage,
      rejectionReason: r.rejectionReason,
      isSilent: true, //새 메시지 알림 제외
    }));

    // 기존 메시지 + 예약 메시지 병합 후 중복 제거
    setLiveMessages((prev) => {
      const merged = [...prev, ...reservationMessages];
      return Array.from(new Map(merged.map((m) => [m.messageId, m])).values());
    });
  }, [reservations, setLiveMessages]);
}
