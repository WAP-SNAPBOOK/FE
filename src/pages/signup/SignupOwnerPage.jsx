import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSignupOwner } from '../../query/signupQueries';
import { useNavigate } from 'react-router-dom';
import { SignupTitle } from '../../components/title/SignupTitle';

function SignupOwnerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignupRequired = location.state?.isSignupRequired;
  const signup = useSignupOwner();

  const [form, setForm] = useState({
    nickname: '',
    businessName: '',
    businessNumber: '',
    address: '',
    phoneNumber: '',
  });

  useEffect(() => {
    //비인가된 접근 시 홈으로
    if (!isSignupRequired) navigate('/');
  }, [navigate]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    signup.mutate(form);
  };

  return (
    <form onSubmit={onSubmit} style={{ padding: 24 }}>
      <SignupTitle>점주 회원가입</SignupTitle>

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
