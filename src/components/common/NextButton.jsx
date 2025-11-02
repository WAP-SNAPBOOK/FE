// src/components/auth/SignupNextButton.jsx
import styled from 'styled-components';
import { BaseButton } from '../common/Button';
import theme from '../../styles/theme';

export const NextButton = styled(BaseButton).attrs({
  className: 'w-[100%]',
  $width: '305px',
  $height: '55px',
  $fontSize: '18px',
})`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
`;
