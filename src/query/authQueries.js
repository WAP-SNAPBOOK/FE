import { useMutation } from '@tanstack/react-query';
import { kakaoAuthService } from '../api/auth/kakaoAuthService';

export const useHandleAuthCode = () => {
  return useMutation({
    mutationFn: (code) => kakaoAuthService.exchangeCodeForToken(code),
  });
};
