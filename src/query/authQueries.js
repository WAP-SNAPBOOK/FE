import { useMutation } from '@tanstack/react-query';
import { kakaoAuthService } from '../api/services/kakaoAuthService';
import { authStorage } from '../utils/authStorage';

export const useHandleAuthCode = () => {
  return useMutation({
    mutationFn: (code) => kakaoAuthService.exchangeCodeForToken(code),
    onSuccess: (data) => {
      //로그인 성공 시 응답 데이터를 저장
      authStorage.save(data);
    },
  });
};
