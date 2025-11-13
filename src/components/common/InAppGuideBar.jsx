import React, { useState, useEffect } from 'react';
import CommonModal from '../modal/CommonModal';
import { modalViews } from '../modal/modalViews';
import * as S from './InAppGuideBar.style';

export default function InAppGuideBar() {
  const [isInApp, setIsInApp] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [hidden, setHidden] = useState(false); // 사용자가 닫기 누를 경우 숨김

  //모달 관련 상태
  const [showModal, setShowModal] = useState(false);
  const [selectedOS, setSelectedOS] = useState('android'); //선택된 OS

  //PWA 안내 사항 모달 관련 데이터
  const view = modalViews(setShowModal);

  const handleClick = () => {
    setShowModal(true);
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

  const openIntent = () => {
    const currentUrl = window.location.href;
    const intentUrl = `intent://${currentUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end;`;
    window.location.href = intentUrl;
  };

  const activeView = view[selectedOS];

  //인앱이 아니거나 X버튼 누를시 언로딩
  if (!isInApp || hidden) return null;

  return (
    <S.Wrapper>
      <S.Card>
        <S.Text>
          <span>브라우저로 열어보세요!</span>
        </S.Text>
        <S.OpenButton onClick={handleClick}>열기</S.OpenButton>
        <S.CloseButton onClick={() => setHidden(true)}>✕</S.CloseButton>
      </S.Card>
      {showModal && (
        <CommonModal
          headerTop={
            <S.Tabs>
              <S.TabButton
                $active={selectedOS === 'android'}
                onClick={() => setSelectedOS('android')}
              >
                Android
              </S.TabButton>
              <S.TabButton $active={selectedOS === 'ios'} onClick={() => setSelectedOS('ios')}>
                iOS
              </S.TabButton>
            </S.Tabs>
          }
          title={activeView.title}
          text={activeView.content}
          buttons={activeView.buttons}
          onClose={() => setShowModal(false)}
        />
      )}
    </S.Wrapper>
  );
}
