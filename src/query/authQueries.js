import { useMutation } from '@tanstack/react-query';
import { kakaoAuthService } from '../api/services/kakaoAuthService';
import { authStorage } from '../utils/auth/authStorage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import normalizeAuthResponse from '../utils/auth/normalizeAuthResponse';

export const useHandleAuthCode = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (code) => kakaoAuthService.exchangeCodeForToken(code),
    onSuccess: (data) => {
      const normalized = normalizeAuthResponse(data);
      //토큰은 스토리지에 저장
      authStorage.saveTokens(normalized.tokens);

      //사용자 정보는 Context에 따로 관리
      login(normalized.profile);

      //회언가입 분기처리
      if (data.authStatus === 'SIGNUP_REQUIRED') {
        //신규 유저 -> 가입 선택 화면으로
        navigate('/signup', { state: { isSignupRequired: true } });
      } else {
        // 로그인 성공
        navigate('/');
      }
    },
  });
};

// 회원탈퇴
export function useDeleteUser() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: kakaoAuthService.deleteUser,
    onSuccess: () => {
      //기존 사용자 정보 다 날리기
      logout();

      //스토리지 초기화
      authStorage.clear();

      //홈 화면 이동
      navigate('/');
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
    },
  });
}
