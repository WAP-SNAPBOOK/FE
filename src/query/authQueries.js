import { useMutation } from '@tanstack/react-query';
import { kakaoAuthService } from '../api/services/kakaoAuthService';
import { authStorage } from '../utils/auth/authStorage';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const useHandleAuthCode = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  //링크 접속 시 식별코드 읽기
  const redirect = new URLSearchParams(location.search).get('redirect');
  return useMutation({
    mutationFn: (code) => kakaoAuthService.exchangeCodeForToken(code),
    onSuccess: (data) => {
      //로그인 후 회원 정보 전역 상태로 저장
      login(data);

      //회언가입 분기처리
      if (data.authStatus === 'SIGNUP_REQUIRED') {
        //신규 유저 -> 가입 선택 화면으로(링크 접속 사용자는 식별코드 가지고)
        navigate(`/signup?redirect=${redirect || ''}`, { state: { isSignupRequired: true } });
      } else {
        // 로그인 성공
        navigate('/');
      }
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      alert('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
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
