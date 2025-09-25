import React from 'react';
import { kakaoAuthService } from '../../api/auth/kakaoAuthService';

function KakaoLoginButton() {
  const handleLogin = () => {
    window.location.href = kakaoAuthService.getAuthUrl(); //카카오 로그인 URL변경
  };

  return <button onClick={handleLogin}>카카오 로그인</button>;
}

export default KakaoLoginButton;
