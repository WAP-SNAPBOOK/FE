// src/components/auth/SignupNextButton.jsx
import styled from 'styled-components';
import { Button } from '../common/Button';
import theme from '../../styles/theme';

export const NextButton = styled(Button).attrs({
  className: 'w-[100%]',
  $height: '55px',
  $fontSize: '18px',
})`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
`;
