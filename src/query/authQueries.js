import { useMutation } from '@tanstack/react-query';

export const useHandleAuthCode = () => {
  return useMutation({
    mutationFn: (code) => {
      //TODO : 서버 인가코드 전달
      return code;
    },
  });
};
