import { useMutation } from '@tanstack/react-query';
import { kakaoAuthService } from '../api/services/kakaoAuthService';
import { authStorage } from '../utils/authStorage';
import { useNavigate } from 'react-router-dom';

export const useHandleAuthCode = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (code) => kakaoAuthService.exchangeCodeForToken(code),
    onSuccess: (data) => {
      // 로그인 성공 시 응답 데이터를 저장
      authStorage.save(data);

      const status = data?.authStatus;
      if (status === 'SIGNUP_REQUIRED') {
        navigate('/signup');
      } else {
        // 로그인 성공
        navigate('/');
      }
    },
  });
};
