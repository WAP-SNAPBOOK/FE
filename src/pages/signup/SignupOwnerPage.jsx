import React, { useEffect, useState } from 'react';
import { authStorage } from '../../utils/auth/authStorage';
import { useSignupOwner } from '../../query/signupQueries';
import { useNavigate } from 'react-router-dom';

function SignupOwnerPage() {
  const navigate = useNavigate();
  const status = authStorage.getStatus();
  const signup = useSignupOwner();

  const [form, setForm] = useState({
    nickname: '',
    businessName: '',
    businessNumber: '',
    address: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (status !== 'SIGNUP_REQUIRED') navigate('/');
  }, [status, navigate]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    signup.mutate(form);
  };

  return (
    <form onSubmit={onSubmit} style={{ padding: 24 }}>
      <h3>점주 가입</h3>

      {['nickname', 'businessName', 'businessNumber', 'address', 'phoneNumber'].map((key) => (
        <label key={key} style={{ display: 'block', marginTop: 8 }}>
          {key}
          <input name={key} value={form[key]} onChange={onChange} required />
        </label>
      ))}

      <div style={{ marginTop: 12 }}>
        <button type="submit" disabled={signup.isPending}>
          {signup.isPending ? '가입 중...' : '가입하기'}
        </button>
      </div>

      {signup.isError && <p style={{ color: 'red' }}>가입 실패: {signup.error?.message}</p>}
    </form>
  );
}

export default SignupOwnerPage;
