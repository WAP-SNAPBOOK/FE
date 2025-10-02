const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
import axiosClient from '../axiosClient';

export const kakaoAuthService = {
  //카카오 로그인 URL 제공
  getAuthUrl: () =>
    `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,

  exchangeCodeForToken: async (code) => {
    const res = await axiosClient.post('/oauth/login/kakao', { accessCode: code });
    return res.data;
  },

  //회원탈퇴
  deleteUser: async () => {
    const res = await axiosClient.delete('/user');
    return res.data;
  },
};
