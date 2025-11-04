import { useMutation } from '@tanstack/react-query';
import { signupService } from '../api/services/signupService';
import { authStorage } from '../utils/auth/authStorage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export const useSignupCustomer = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // 매장 식별 코드
  const slug = new URLSearchParams(location.search).get('slug');

  return useMutation({
    mutationFn: (payload) => signupService.signupCustomer(payload),
    onSuccess: (data) => {
      //고객으로 회원가입 성공시 기존 데이터 다 날리기
      authStorage.clear();

      //사용자 정보 전역 상태 + 스토리지 저장
      login(data);

      // slug가 있으면 매장 채팅방 페이지로 이동
      if (slug) {
        navigate(`/s/${slug}`, { replace: true });
      } else {
        navigate('/'); // 기본 홈
      }
    },
  });
};

export const useSignupOwner = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload) => signupService.signupOwner(payload),
    onSuccess: (data) => {
      //점주로 회원가입 성공시 기존 데이터 다 날리기
      authStorage.clear();

      //사용자 정보 전역 상태 + 스토리지 저장
      login(data);

      //추가 정보(가게 등록) 페이지로 이동
      navigate('/signup/owner/shop-info', { state: { isSignupRequired: true } });
    },
  });
};

// 점주 추가정보 등록 (가게 정보 등록)
export const useRegisterShopInfo = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload) => signupService.registerShopInfo(payload),
    onSuccess: () => {
      navigate('/');
    },
  });
};
