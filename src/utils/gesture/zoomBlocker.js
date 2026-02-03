export function blockZoom() {
  // 핀치 줌 차단
  const handleTouchMove = (e) => {
    if (e.scale && e.scale !== 1) {
      e.preventDefault();
    }
  };
  document.addEventListener('touchmove', handleTouchMove, { passive: false });

  // 더블탭 확대 차단
  let lastTouchEnd = 0;
  const handleTouchEnd = (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  };

  document.addEventListener('touchend', handleTouchEnd, false);

  return () => {
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };
}
