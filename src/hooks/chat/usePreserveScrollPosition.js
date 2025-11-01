import { useEffect, useRef } from 'react';

export function usePreserveScrollPosition(listRef, isFetchingNextPage) {
  // 과거 메시지 로드 시 스크롤 위치 보정
  // 과거 메시지 prepend 시 스크롤 위치 유지
  const wasFetchingRef = useRef(false); //fetch 상태 전환 감지용 flag
  const prevHRef = useRef(0); //과거 스크롤 높이 ref
  const prevTopRef = useRef(0); //과거 스크롤 위치 ref

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    // 로드 시작 시점: 현재 높이/위치 저장
    if (!wasFetchingRef.current && isFetchingNextPage) {
      wasFetchingRef.current = true; //로드 시작표시
      prevHRef.current = list.scrollHeight; //과거의 전체 스크롤 영역 높이
      prevTopRef.current = list.scrollTop; //과거의 스크롤 위치
    }

    // 로드 종료 시점: DOM 붙은 뒤 보정
    if (wasFetchingRef.current && !isFetchingNextPage) {
      wasFetchingRef.current = false; //로드 끝 표시

      // 렌더 프레임 2번 넘겨서 레이아웃 확정 후 보정
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const newH = list.scrollHeight; //현재의 전체 스크롤 영역 높이
          const diff = newH - prevHRef.current; //과거의 스크롤 영역과의 높이의 차이
          list.scrollTop = prevTopRef.current + diff; // 차이만큼 더해 줘서 현재 보던 지점 유지
        });
      });
    }
  }, [isFetchingNextPage]);
}
