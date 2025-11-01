// components/ModalOverlay.jsx
import React, { useEffect } from "react";

export default function ModalOverlay({ children, onClose }) {
  // ESC로 닫기(옵션)
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
      <div
        className="modalOverlay"
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => {
          // 배경 자신을 눌렀을 때만 닫기
          if (e.target === e.currentTarget) onClose?.();
        }}
      >
        {/* 배경 전체는 pointer-events: none; 카드만 클릭 가능 */}
        <div className="modalCenter">
          {children}
        </div>
      </div>
  );
}
