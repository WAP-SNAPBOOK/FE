import { useMutation } from '@tanstack/react-query';
import { kakaoAuthService } from '../api/services/kakaoAuthService';
import { authStorage } from '../utils/auth/authStorage';
import { useNavigate } from 'react-router-dom';
import normalizeAuthResponse from '../utils/auth/normalizeAuthResponse';

export const useHandleAuthCode = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (code) => kakaoAuthService.exchangeCodeForToken(code),
    onSuccess: (data) => {
      const normalized = normalizeAuthResponse(data);
      // 로그인 성공 시 응답 데이터를 저장
      authStorage.save(normalized);

      const status = data?.authStatus;
      if (status === 'SIGNUP_REQUIRED') {
        //신규 유저 -> 가입 선택 화면으로
        navigate('/signup');
      } else {
        // 로그인 성공
        navigate('/');
      }
    },
  });
};

// 회원탈퇴
export function useDeleteUser() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: kakaoAuthService.deleteUser,
    onSuccess: () => {
      //기존 사용자 정보 다 날리기
      authStorage.clear();

      //홈 화면 이동
      navigate('/');
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
    },
  });
}
