import styled, { css } from 'styled-components';
import { BaseInput } from '../common/BaseInput';
import theme from '../../styles/theme';

export const AuthInput = styled(BaseInput).attrs({
  $border: `1.5px solid ${theme.colors.gray.border}`,
  $color: `${theme.colors.black[90]}`,
  $placeholder: `${theme.colors.black[30]}`,
  $bg: 'white',
  $radius: '10px',
})`
  &::placeholder {
    color: ${({ $placeholder }) => $placeholder};
    font-weight: 900;
  }

  &:focus {
    border-color: ${theme.colors.highlight.DEFAULT};
  }

  &:disabled {
    background-color: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[400]};
    cursor: not-allowed;
  }
`;
