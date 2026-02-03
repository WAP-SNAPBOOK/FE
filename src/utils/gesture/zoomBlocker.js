export function blockZoom() {
  // 핀치 줌 차단
  document.addEventListener(
    'touchmove',
    (e) => {
      if (e.scale && e.scale !== 1) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  // 더블탭 확대 차단
  let lastTouchEnd = 0;
  document.addEventListener(
    'touchend',
    (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );
}
