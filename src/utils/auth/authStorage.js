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
};
