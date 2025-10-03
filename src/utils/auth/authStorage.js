const STORAGE_KEY = 'authData';

export const authStorage = {
  //로그인 관련 데이터 자장
  save: (normalized) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  },

  //로그인 데이터 꺼내기
  get: () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  //로그인 데이터 초기화
  clear: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  //엑세스토큰 꺼내기
  getAccessToken: () => authStorage.get()?.tokens?.accessToken || null,

  //리프레쉬토큰 꺼내기
  getRefreshToken: () => authStorage.get()?.tokens?.refreshToken || null,

  //사용자 유형(CUSTOMER | OWNER)
  getUserType: () => authStorage.get()?.getUserType || null,

  //사용자 로그인 상태 꺼내기
  getStatus: () => authStorage.get()?.authStatus || null,

  // 공통 프로필 (닉네임 등)
  getNickname: () => authStorage.get()?.profile?.nickname ?? null,

  // 점주 전용 정보
  getBusinessName: () => authStorage.get()?.profile?.businessName ?? null,
  getBusinessNumber: () => authStorage.get()?.profile?.businessNumber ?? null,
  getAddress: () => authStorage.get()?.profile?.address ?? null,
  getPhoneNumber: () => authStorage.get()?.profile?.phoneNumber ?? null,
};
