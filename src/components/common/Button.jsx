import styled from 'styled-components';

export const BaseButton = styled.button`
  display: flex;
  align-items: center;
  flex-direction: ${({ $column }) => ($column ? 'column' : 'row')};
  justify-content: ${({ $align }) => $align || 'center'};
  gap: ${({ $gap }) => $gap || '8px'};
  width: ${({ $width }) => $width || 'auto'};

  height: ${({ $height }) => $height || 'auto'};
  padding: ${({ $padding }) => $padding || '0 16px'};
  border: none;
  border-radius: ${({ $radius }) => $radius || '12px'}; /* 공통 라운드 */
  font-size: ${({ $fontSize }) => $fontSize || '15px'};
  font-weight: 700;
  cursor: pointer;
  user-select: none;

  transition:
    transform 0.06s ease,
    background 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    opacity: 0.95;
  }
  &:active {
    transform: translateY(1px);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  /* 접근성: 키보드 포커스 */
  &:focus-visible {
    outline: 2px solid rgba(0, 0, 0, 0.4);
    outline-offset: 2px;
  }

  /* 가로로 꽉 차게 쓰고 싶을 때 */
  ${({ $fullWidth }) => $fullWidth && `width: 100%;`}
`;
