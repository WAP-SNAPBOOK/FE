//시간 포맷 함수
export const formatTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
