import React from 'react';
import { kakaoAuthService } from '../../api/services/kakaoAuthService';
import { BaseButton } from '../common/Button';
import styled from 'styled-components';
import theme from '../../styles/theme';
import kakaoIcon from '../../assets/icons/kakao-icon.svg';

const KakaoButton = styled(BaseButton).attrs({
  $align: 'flex-start',
  $gap: '35px',
})`
  background: ${theme.colors.kakakoYellow};
  color: ${theme.colors.kakaoTextBlack};
  border-radius: ${theme.radius.md};

  min-width: 220px;

  /* 호버 시 살짝 더 진하게 */
  &:hover {
    background: #fdd835;
  }
`;

function KakaoLoginButton() {
  //카카오 로그인 URL변경
  const handleLogin = () => {
    window.location.href = kakaoAuthService.getAuthUrl();
  };

  return (
    <>
      <KakaoButton onClick={handleLogin}>
        <img src={kakaoIcon} alt="kakao symbol" aria-hidden="true" />
        <span>카카오로 계속하기</span>
      </KakaoButton>
    </>
  );
}

export default KakaoLoginButton;
