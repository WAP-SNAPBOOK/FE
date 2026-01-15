import { useEffect, useRef } from 'react';

export function usePreserveScrollPosition(listRef, isFetchingNextPage) {
  const prevHRef = useRef(0);
  const prevTopRef = useRef(0);
  const isPendingCorrection = useRef(false);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    // 1. 데이터 로딩이 시작될 때 현재 상태 저장
    if (isFetchingNextPage) {
      prevHRef.current = list.scrollHeight;
      prevTopRef.current = list.scrollTop;
      isPendingCorrection.current = true;
    }
  }, [isFetchingNextPage]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || !isPendingCorrection.current) return;

    // 2. DOM 변화를 감지하는 Observer 설정
    const observer = new MutationObserver(() => {
      if (isFetchingNextPage) return;

      const newH = list.scrollHeight;
      const diff = newH - prevHRef.current;

      if (diff > 0) {
        // 스크롤 위치 보정
        list.scrollTop = prevTopRef.current + diff;
        isPendingCorrection.current = false;
        observer.disconnect(); // 보정 완료 후 해제
      }
    });

    observer.observe(list, {
      childList: true, // 자식 요소(메시지) 추가 감지
      subtree: true,
    });

    return () => observer.disconnect();
  }, [isFetchingNextPage, listRef]);
}
