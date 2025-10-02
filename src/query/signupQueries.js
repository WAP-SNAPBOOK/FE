import { useMutation } from '@tanstack/react-query';
import { signupService } from '../api/services/signupService';
import { authStorage } from '../utils/authStorage';
import { useNavigate } from 'react-router-dom';

export const useSignupCustomer = () => {
  const naviagate = useNavigate();
  return useMutation({
    mutationFn: (payload) => signupService.signupCustomer(payload),
    onSuccess: (data) => {
      //고객으로 회원가입 성공시 기존 데이터 다 날리기
      authStorage.clear();

      //응답 구조에 맞춰 사용자 정보 저장
      authStorage.save({
        accessToken: data.tokens.accessToken,
        refreshToken: data.tokens.refreshToken,
        nickname: data.nickname,
        authStatus: 'LOGIN_SUCCESS',
      });

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

      //응답 구조에 맞춰 사용자 정보 저장
      authStorage.save({
        accessToken: data.tokens.accessToken,
        refreshToken: data.tokens.refreshToken,
        nickname: data.nickname,
        businessName: data.businessName,
        businessNumber: data.businessNumber,
        address: data.businessNumber,
        phoneNumber: data.phoneNumber,
        authStatus: 'LOGIN_SUCCESS',
      });

      navigate('/');
    },
  });
};
