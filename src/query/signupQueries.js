import { useMutation } from '@tanstack/react-query';
import { signupService } from '../api/services/signupService';
import { authStorage } from '../utils/auth/authStorage';
import { useNavigate } from 'react-router-dom';
import normalizeAuthResponse from '../utils/auth/normalizeAuthResponse';
export const useSignupCustomer = () => {
  const naviagate = useNavigate();
  return useMutation({
    mutationFn: (payload) => signupService.signupCustomer(payload),
    onSuccess: (data) => {
      //고객으로 회원가입 성공시 기존 데이터 다 날리기
      authStorage.clear();
      //회원가입 정보 정규화
      const normalized = normalizeAuthResponse(data);

      //응답 구조에 맞춰 사용자 정보 저장
      authStorage.save(normalized);

      //마지막으로 홈화면 이동
      naviagate('/');
    },
  });
};

export const useSignupOwner = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (payload) => signupService.signupOwner(payload),
    onSuccess: (data) => {
      //점주로 회원가입 성공시 기존 데이터 다 날리기
      authStorage.clear();

      //회원가입 정보 정규화
      const normalized = normalizeAuthResponse(data);

      //응답 구조에 맞춰 사용자 정보 저장
      authStorage.save(normalized);

      navigate('/');
    },
  });
};
