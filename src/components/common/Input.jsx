// src/components/common/BaseInput.jsx
import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  height: ${({ $height }) => $height || '48px'};
  padding: 0 14px;

  border: ${({ $border }) => $border || '1.5px solid transparent'};
  border-radius: ${({ $radius }) => $radius || '10px'};

  font-size: ${({ $fontSize }) => $fontSize || '15px'};
  font-weight: ${({ $fontWeight }) => $fontWeight || '400'};
  color: ${({ $color }) => $color || 'inherit'};
  background-color: ${({ $bg }) => $bg || 'white'};

  outline: none;
  transition:
    border 0.2s ease,
    box-shadow 0.2s ease,
    color 0.2s ease,
    background-color 0.2s ease;

  &::placeholder {
    color: ${({ $placeholder }) => $placeholder || 'inherit'};
  }

  &:focus {
    ${({ $focusStyle }) => $focusStyle && $focusStyle};
  }

  &:disabled {
    ${({ $disabledStyle }) => $disabledStyle && $disabledStyle};
  }
`;
