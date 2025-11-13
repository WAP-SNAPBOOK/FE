import styled, { keyframes } from 'styled-components';
import React, { useState, useEffect } from 'react';
import theme from '../../styles/theme';

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
`;

// 카드 등장 애니메이션 (왼쪽에서 슬라이드)
const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #fff2f2;
  border: 1px solid rgba(240, 128, 128, 0.4);
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.6s ease-out both;
`;

const Text = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  font-weight: 500;

  span {
    font-weight: 600;
    color: ${theme.colors.primary};
  }
`;

const OpenButton = styled.button`
  background: ${theme.colors.primary};
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  animation: ${pulse} 1.6s ease-in-out infinite;

  &:hover {
    opacity: 0.9;
  }
`;

const CloseButton = styled.button`
  margin-left: 0.25rem;
  color: #9ca3af;
  font-size: 0.75rem;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    color: #4b5563;
  }
`;

export default function InAppGuideBar() {
  const [isInApp, setIsInApp] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [hidden, setHidden] = useState(false); // 사용자가 닫기 누를 경우 숨김

  const handleClick = () => {
    if (isAndroid) {
      const currentUrl = window.location.href;
      const intentUrl = `intent://${currentUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end;`;
      window.location.href = intentUrl;
    } else if (isIOS) {
      alert(
        'Safari에서 열면 앱 설치가 가능합니다.\n오른쪽 위 점 세 개 → Safari로 열기를 눌러주세요!'
      );
    }
  };

  useEffect(() => {
    //  실제 배포 시엔 아래 주석 해제
    // const ua = navigator.userAgent || navigator.vendor || window.opera;
    // const inApp = ua.includes('Instagram');

    const ua =
      'Mozilla/5.0 (Linux; Android 14; SM-G998N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36 Instagram 321.0.0.18.119 Android';
    const inApp = true; // 강제 인앱 환경으로 설정

    setIsInApp(inApp);
    setIsAndroid(/Android/i.test(ua));
    setIsIOS(/iPhone|iPad|iPod/i.test(ua));
  }, []);

  //인앱이 아니거나 X버튼 누를시 언로딩
  if (!isInApp || hidden) return null;

  return (
    <Wrapper>
      <Card>
        <Text>
          <span>브라우저로 열어보세요!</span>
        </Text>
        <OpenButton onClick={handleClick}>열기</OpenButton>
        <CloseButton onClick={() => setHidden(true)}>✕</CloseButton>
      </Card>
    </Wrapper>
  );
}
