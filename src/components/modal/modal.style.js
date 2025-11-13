import { keyframes } from 'styled-components';
import styled from 'styled-components';
import theme from '../../styles/theme';

export const slideIn = keyframes`
  0% { opacity: 0; transform: translateX(-40px); }
  100% { opacity: 1; transform: translateX(0); }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const ModalCard = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  width: 85%;
  height: 85vh;
  overflow-y: auto;
  max-width: 360px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 0.5s ease-out;
`;

export const ModalTitle = styled.h2`
  font-size: 1.1rem;
  color: ${theme.colors.primary};
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const ModalText = styled.p`
  font-size: 0.9rem;
  color: #444;
  white-space: pre-line;
  margin-bottom: 1rem;
`;

export const ModalButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;

export const ChoiceButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
