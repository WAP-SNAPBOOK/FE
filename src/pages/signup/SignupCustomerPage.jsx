import React, { useEffect, useState } from 'react';
import { authStorage } from '../../utils/auth/authStorage';
import { useSignupCustomer } from '../../query/signupQueries';
import { useNavigate } from 'react-router-dom';

function SignupCustomerPage() {
  const navigate = useNavigate();
  const status = authStorage.getStatus();
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
      <h3>일반 고객 가입</h3>
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
