import React from 'react';
import Container from '../../components/common/Container';
import { useLocation } from 'react-router-dom';
import KakaoLoginButton from '../../components/auth/KakaoLoginButton';
import logoImg from '../../assets/icons/logo-icon.svg';

export default function LoginPage() {
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('redirect'); //링크 접속시 매장 식별코드
  console.log('LoginPage: ', redirect);
  return (
    <Container>
      <div className="flex flex-col">
        <div className="flex justify-center mb-[68px] text-4xl font-semibold items-center gap-3">
          {/* 로고 이미지 */}
          <img src={logoImg} alt="SNAPBOOK 로고" />
          {/* 타이틀 */}
          <h1>SNAPBOOK</h1>
        </div>
        <KakaoLoginButton redirect={redirect} /> {/*식별코드 전달*/}
      </div>
    </Container>
  );
}
