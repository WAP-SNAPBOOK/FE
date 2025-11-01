import { useEffect } from 'react';

/**
 * 채팅 리스트의 상단 감지를 통해 과거 메시지를 불러오는 옵저버 훅
 *
 * @param {boolean} isSuccess - 메시지 데이터 로드 성공 여부
 * @param {boolean} readyToObserve - 옵저버 활성화 여부
 * @param {React.RefObject} topObserverRef - 관찰할 상단 요소 ref
 * @param {React.RefObject} messageListRef - 스크롤 컨테이너 ref (root)
 * @param {boolean} hasNextPage - 다음 페이지 존재 여부
 * @param {boolean} isFetchingNextPage - 다음 페이지 로드 중 여부
 * @param {Function} fetchNextPage - 다음 페이지 요청 함수
 */
export function useTopObserver(
  isSuccess,
  readyToObserve,
  topObserverRef,
  messageListRef,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage
) {
  useEffect(() => {
    // 첫 페이지 마운트 이후 옵저버 등록
    if (!isSuccess || !readyToObserve) return;

    const target = topObserverRef.current;
    const root = messageListRef.current;
    if (!target || !root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage(); // 상단 도달 시 과거 메시지 요청
        }
      },
      {
        threshold: 1.0,
        root,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [readyToObserve]);
}
