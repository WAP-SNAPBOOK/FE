import styled, { keyframes } from 'styled-components';

/* 확대 애니메이션 */
const zoomIn = keyframes`
  from {
    transform: scale(0.85);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 9999;
`;

export const ImageWrapper = styled.div`
  animation: ${zoomIn} 0.35s ease-out;
`;

export const Image = styled.img`
  max-width: 90vw;
  max-height: 85vh;

  border-radius: 12px;
  object-fit: contain;

  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;
