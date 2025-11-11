import { useEffect } from 'react';
/**
 * 페이지 첫 마운트 시 스크롤을 하단으로 이동시키고,
 * 옵저버를 켤 준비 신호(readyToObserve)를 설정하는 훅
 *
 * @param {object} data - 메시지 데이터 (React Query pages 형태)
 * @param {boolean} isFetchingNextPage - 다음 페이지 로딩 여부
 * @param {boolean} readyToObserve - 옵저버 활성화 여부
 * @param {Function} scrollToBottom - 스크롤 하단 이동 함수
 * @param {Function} setReadyToObserve - 옵저버 활성화 상태 setter
 */
export function useInitScrollToBottom(
  data,
  isFetchingNextPage,
  readyToObserve,
  scrollToBottom,
  setReadyToObserve
) {
  useEffect(() => {
    if (!data || isFetchingNextPage || readyToObserve) return;

    // DOM 렌더 완료 이후로 확실히 미루기
    requestAnimationFrame(() => {
      setTimeout(() => {
        scrollToBottom(false);
        setReadyToObserve(true); // 옵저버 켜질 수 있는 신호
      }, 50);
    });
  }, [data?.pages?.length]);
}
