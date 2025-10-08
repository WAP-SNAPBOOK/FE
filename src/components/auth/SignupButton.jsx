// src/components/auth/SignupButton.jsx
import styled from 'styled-components';
import { Button } from '../common/Button';
import theme from '../../styles/theme';

export const SignupButton = {
  Customer: styled(Button).attrs({
    className: 'w-[143px] font-semibold',
    $height: '55px',
    $fontSize: '19px',
  })`
    background-color: ${theme.colors.gray[20]};
    color: ${theme.colors.black[75]};

    &:hover {
      background-color: #43a047;
    }
  `,

  Owner: styled(Button).attrs({
    className: 'w-[143px] font-semibold',
    $height: '55px',
    $fontSize: '19px',
  })`
    background-color: ${theme.colors.gray[20]};
    color: ${theme.colors.black[75]};

    &:hover {
      background-color: #1565c0;
    }
  `,
};
