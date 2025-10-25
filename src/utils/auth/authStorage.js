import normalizeAuthResponse from '../normalizeAuthResponse';

const STORAGE_KEY = 'authData';

export const authStorage = {
  //로그인 관련 데이터 자장
  save: (raw) => {
    if (raw === undefined) return; // 저장하지 않음
    const normalized = normalizeAuthResponse(raw);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  },

  //로그인 데이터 꺼내기
  get: () => {
    const authData = localStorage.getItem(STORAGE_KEY);

    if (!authData || authData === 'undefined') return null;
    return JSON.parse(authData);
  },

  //로그인 데이터 초기화
  clear: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  //엑세스 토큰 접근
  getAccessToken: () => authStorage.get()?.tokens?.accessToken || null,
  //리프레쉬 토큰 접근
  getRefreshToken: () => authStorage.get()?.tokens?.refreshToken || null,
};
