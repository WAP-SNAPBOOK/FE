import React from 'react';
import {
  ModalBackdrop,
  ModalCard,
  ModalTitle,
  ModalText,
  ModalButton,
  ChoiceButtons,
} from './modal.style';

/**
 * 공통 모달 컴포넌트
 *  * @param {ReactNode} headerTop - 타이틀 위에 추가로 렌더링할 커스텀 UI
 * @param {string} title - 모달 제목
 * @param {string} text - 안내 문구
 * @param {Array} buttons - [{ label, onClick }]
 * @param {function} onClose - 바깥 클릭 시 닫기
 */
export default function CommonModal({ headerTop, title, text, buttons = [], onClose }) {
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        {/* --- 상단 슬롯 (탭 등) --- */}
        {headerTop && <div style={{ marginBottom: '10px' }}>{headerTop}</div>}

        {/* --- 타이틀 (문자열) --- */}
        {title && <ModalTitle>{title}</ModalTitle>}

        {text && <ModalText>{text}</ModalText>}

        {/* 여러 버튼이 필요한 경우 */}
        {buttons.length > 1 ? (
          <ChoiceButtons>
            {buttons.map((btn, idx) => (
              <ModalButton key={idx} onClick={btn.onClick}>
                {btn.label}
              </ModalButton>
            ))}
          </ChoiceButtons>
        ) : (
          buttons[0] && <ModalButton onClick={buttons[0].onClick}>{buttons[0].label}</ModalButton>
        )}
      </ModalCard>
    </ModalBackdrop>
  );
}
