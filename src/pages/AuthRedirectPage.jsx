import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useHandleAuthCode } from '../query/authQueries';

function AuthRedirectPage() {
  const [searchParams] = useSearchParams();
  const handleAuthCode = useHandleAuthCode();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      handleAuthCode.mutate(code);
    }
  }, [searchParams]);

  if (handleAuthCode.isPending) return <div>로그인 처리 중</div>;

  if (handleAuthCode.isError) return <div>로그인 실패</div>;

  if (handleAuthCode.isSuccess) return <div>로그인 성공!</div>;

  return <div>인가 코드 확인 중</div>;
}

export default AuthRedirectPage;
