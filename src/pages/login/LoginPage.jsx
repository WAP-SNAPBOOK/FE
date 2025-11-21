import React from 'react';
import Container from '../../components/common/Container';
import { useLocation } from 'react-router-dom';
import KakaoLoginButton from '../../components/auth/KakaoLoginButton';
import logoImg from '../../assets/icons/logo-icon.svg';

export default function LoginPage() {
  const location = useLocation();
  const slug = new URLSearchParams(location.search).get('slug'); //링크 접속시 매장 식별코드
  return (
    <Container>
      <div className="flex flex-col">
        <div className="flex justify-center text-4x items-center gap-3">
          {/* 로고 이미지 */}
          <img src={logoImg} alt="SNAPBOOK 로고" />
        </div>
        <KakaoLoginButton slug={slug} /> {/*식별코드 전달*/}
      </div>
    </Container>
  );
}
