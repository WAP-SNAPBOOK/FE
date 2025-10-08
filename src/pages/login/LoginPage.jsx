import React from 'react';
import Container from '../../components/common/Container';
import KakaoLoginButton from '../../components/auth/KakaoLoginButton';
import logoImg from '../../assets/icons/logo-icon.svg';

export default function LoginPage() {
  return (
    <Container>
      <div className="flex flex-col">
        <div className="flex justify-center mb-[68px] text-4xl font-medium items-center gap-3">
          {/* 로고 이미지 */}
          <img src={logoImg} alt="SNAPBOOK 로고" />
          {/* 타이틀 */}
          <h1>SNAPBOOK</h1>
        </div>
        <KakaoLoginButton />
      </div>
    </Container>
  );
}
