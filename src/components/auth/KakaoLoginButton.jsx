import React from 'react';
import { kakaoAuthService } from '../../api/auth/kakaoAuthService';

const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

function KakaoLoginButton() {
  const handleLogin = () => {
    window.location.href = kakaoAuthService.getAuthUrl(); //카카오 로그인 URL변경
  };

  return <button onClick={handleLogin}>카카오 로그인</button>;
}

export default KakaoLoginButton;
