import React, { useEffect, useState } from 'react';
import { authStorage } from '../../utils/auth/authStorage';
import { useSignupCustomer } from '../../query/signupQueries';
import { useNavigate } from 'react-router-dom';
import { SignupTitle } from '../../components/title/SignupTitle';

function SignupCustomerPage() {
  const navigate = useNavigate();
  const signup = useSignupCustomer();
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    if (status !== 'SIGNUP_REQUIRED') navigate('/');
  }, [status, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    signup.mutate({ nickname });
  };

  return (
    <form onSubmit={onSubmit} style={{ padding: 24 }}>
      <SignupTitle>고객 회원가입</SignupTitle>
      <label>
        닉네임
        <input value={nickname} onChange={(e) => setNickname(e.target.value)} required />
      </label>
      <div style={{ marginTop: 12 }}>
        <button type="submit" disabled={signup.isPending}>
          {signup.isPending ? '가입 중...' : '가입하기'}
        </button>
      </div>
      {signup.isError && <p style={{ color: 'red' }}>가입 실패: {signup.error?.message}</p>}
    </form>
  );
}

export default SignupCustomerPage;
