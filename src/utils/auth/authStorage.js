const STORAGE_KEY = 'authTokens';

export const authStorage = {
  saveTokens({ accessToken, refreshToken }) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accessToken, refreshToken }));
  },

  //전체 토큰 반환
  getTokens() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  //로컬 스토리지 초기화
  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },

  //엑세스 토큰 반환
  getAccessToken() {
    return authStorage.getTokens()?.accessToken ?? null;
  },

  //리프레쉬 토큰 반환
  getRefreshToken() {
    return authStorage.getTokens()?.refreshToken ?? null;
  },
};
