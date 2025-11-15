import axios from 'axios';
import { authStorage } from '../utils/auth/authStorage';

let isRefreshing = false;
let refreshQueue = [];

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosClient.interceptors.request.use((config) => {
  const token = authStorage.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 응답 인터셉터: 401 처리(엑세스 토큰 만료)
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    // access 토큰 만료 + 최초 재시도
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const refreshToken = authStorage.getRefreshToken();

      if (!refreshToken) {
        authStorage.clear();
        window.location.href = '/';
        return;
      }

      // 이미 refresh 진행 중이면 큐에 적재
      if (isRefreshing) {
        console.log('already refreshing → queue push');

        return new Promise((resolve) => {
          refreshQueue.push((newAccessToken) => {
            original.headers['Authorization'] = `Bearer ${newAccessToken}`;
            resolve(axiosClient(original));
          });
        });
      }

      isRefreshing = true;

      try {
        console.log('refresh API 호출');
        // refresh API 호출
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
          token: refreshToken,
        });

        // 전체 auth 데이터 저장
        authStorage.save(res.data);

        // 새 accessToken 추출
        const newAccessToken = authStorage.getAccessToken();
        // 대기중인 요청 처리
        refreshQueue.forEach((cb) => cb(newAccessToken));
        refreshQueue = [];
        isRefreshing = false;

        // 원래 요청 재실행
        original.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosClient(original);
      } catch (refreshError) {
        // refresh 실패: 로그인 필요
        isRefreshing = false;
        refreshQueue = [];
        authStorage.clear();
        window.location.href = '/';
        return;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
