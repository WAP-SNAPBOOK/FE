import { useEffect, useRef } from 'react';

/**
 * oldMessages + reservationMessages + liveMessages
 * 모든 메시지가 준비된 뒤 최초 1회만 스크롤을 하단으로 내리는 훅
 *
 * @param {object} data - useChatMessages의 data (infiniteQuery pages)
 * @param {Array} reservations - 예약 상태 메시지 목록
 * @param {Array} allMessages - 병합된 최종 메시지 목록
 * @param {boolean} isFetchingNextPage - 다음 페이지 로딩 중 여부
 * @param {boolean} readyToObserve - 옵저버 활성화 여부
 * @param {Function} scrollToBottom - 하단 스크롤 함수
 * @param {Function} setReadyToObserve - 옵저버 활성화 setter
 */
export function useInitFullReadyScroll(
  data,
  allMessages,
  isFetchingNextPage,
  readyToObserve,
  scrollToBottom,
  setReadyToObserve
) {
  const initialScrollDone = useRef(false);

  useEffect(() => {
    if (!data || isFetchingNextPage || readyToObserve) return;

    // 1) oldMessages 준비 여부
    const oldReady = data?.pages?.length > 0;

    // 3) 최종 합쳐진 메시지가 있는지
    const hasMessages = allMessages.length > 0;

    if (!oldReady || !hasMessages) return;

    // 최초 1회만 실행
    if (initialScrollDone.current) return;
    initialScrollDone.current = true;

    requestAnimationFrame(() => {
      setTimeout(() => {
        scrollToBottom(false);
        setReadyToObserve(true); // 옵저버 켤 조건 전달
      }, 50);
    });
  }, [data?.pages?.length, allMessages.length, isFetchingNextPage, readyToObserve]);
}
