import styled, { keyframes } from 'styled-components';
import theme from '../../styles/theme';

export const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
`;

// 카드 등장 애니메이션 (왼쪽에서 슬라이드)
export const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

export const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #fff2f2;
  border: 1px solid rgba(240, 128, 128, 0.4);
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.6s ease-out both;
`;

export const Text = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  font-weight: 500;

  span {
    font-weight: 600;
    color: ${theme.colors.primary};
  }
`;

export const OpenButton = styled.button`
  background: ${theme.colors.primary};
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  animation: ${pulse} 1.6s ease-in-out infinite;

  &:hover {
    opacity: 0.9;
  }
`;

export const CloseButton = styled.button`
  margin-left: 0.25rem;
  color: #9ca3af;
  font-size: 0.75rem;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    color: #4b5563;
  }
`;

export const Tabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 12px;
`;

export const TabButton = styled.button`
  flex: 1;
  padding: 8px 0;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: ${(props) => (props.active ? theme.colors.primary : '#eee')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
`;
