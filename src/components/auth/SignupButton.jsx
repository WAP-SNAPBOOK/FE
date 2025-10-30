// src/components/auth/SignupButton.jsx
import styled, { css } from 'styled-components';
import { BaseButton } from '../common/Button';
import theme from '../../styles/theme';

export const SignupButton = {
  Customer: styled(BaseButton).attrs({
    className: 'w-[143px] font-semibold',
    $height: '55px',
    $fontSize: '19px',
  })`
    background-color: ${theme.colors.gray[20]};
    color: ${theme.colors.black[75]};

    ${({ $isSelected }) =>
      $isSelected &&
      css`
        background-color: ${theme.colors.highlight[10]};
        color: ${theme.colors.highlight.DEFAULT};
        border: 2px solid ${theme.colors.highlight.DEFAULT};
      `}
  `,

  Owner: styled(BaseButton).attrs({
    className: 'w-[143px] font-semibold',
    $height: '55px',
    $fontSize: '19px',
  })`
    background-color: ${theme.colors.gray[20]};
    color: ${theme.colors.black[75]};

    ${({ $isSelected }) =>
      $isSelected &&
      css`
        background-color: ${theme.colors.highlight[10]};
        color: ${theme.colors.highlight.DEFAULT};
        border: 2px solid ${theme.colors.highlight.DEFAULT};
      `}
  `,
};
