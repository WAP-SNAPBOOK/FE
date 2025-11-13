import androidGuideImg_1 from '../../assets/info/android_chrome_pwa_1.png';
import androidGuideImg_2 from '../../assets/info/android_chrome_pwa_2.png';
import iosGuideImg_1 from '../../assets/info/ios_safari_pwa_1.png';
import iosGuideImg_2 from '../../assets/info/ios_safari_pwa_2.png';

export const modalViews = (setShowModal) => ({
  android: {
    title: 'Android 안내',
    content: (
      <>
        인앱에서는 설치가 불가능합니다.
        <br />
        아래 안내를 참고해 Chrome에서 열어주세요.
        <br />
        1. 크롬 오른쪽 위 ⋮ 메뉴를 누르세요.
        <br />
        2. [홈 화면에 추가]를 선택하세요.
        <br />
        3. SNAPBOOK 아이콘이 홈 화면에 추가됩니다.
        <br />
        <img
          src={androidGuideImg_1}
          alt="안드로이드 브라우저 메뉴 안내"
          style={{ width: '100%', borderRadius: '12px', marginTop: '12px' }}
        />
        <img
          src={androidGuideImg_2}
          alt="안드로이드 브라우저 메뉴 안내"
          style={{ width: '100%', borderRadius: '12px', marginTop: '12px' }}
        />
      </>
    ),
    buttons: [{ label: '크롬으로 열기', onClick: () => console.log('안드로이드 크롬') }],
  },

  ios: {
    title: 'iOS 안내',
    content: (
      <>
        Safari에서 열면 홈 화면에 추가할 수 있습니다.
        <br />
        아래 안내를 따라주세요.
        <br />
        1. 인앱 브라우저 내 좌상단 ⋮를 눌러서 safari로 이동하세요.
        <br />
        2. 좌하단 …버튼을 누르고 공유버튼을 누르세요.
        <br />
        3. 메뉴에서 [홈 화면에 추가]를 선택하세요.
        <br />
        4. SNAPBOOK 아이콘이 홈 화면에 추가됩니다.
        <br />
        <img
          src={iosGuideImg_1}
          alt="Safari 공유 버튼 안내"
          style={{ width: '100%', borderRadius: '12px', marginTop: '12px' }}
        />
        <img
          src={iosGuideImg_2}
          alt="홈 화면에 추가 안내"
          style={{ width: '100%', borderRadius: '12px', marginTop: '12px' }}
        />
      </>
    ),
    buttons: [{ label: '확인', onClick: () => setShowModal(false) }],
  },
});
