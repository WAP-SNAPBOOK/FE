import { useMutation } from '@tanstack/react-query';
import { signupService } from '../api/services/signupService';
import { authStorage } from '../utils/auth/authStorage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export const useSignupCustomer = () => {
  const { login } = useAuth();
  const naviagate = useNavigate();
  return useMutation({
    mutationFn: (payload) => signupService.signupCustomer(payload),
    onSuccess: (data) => {
      //고객으로 회원가입 성공시 기존 데이터 다 날리기
      authStorage.clear();

      //사용자 정보 전역 상태 + 스토리지 저장
      login(data);

      //마지막으로 홈화면 이동
      naviagate('/');
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
