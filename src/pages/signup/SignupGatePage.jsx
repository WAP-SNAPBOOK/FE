// pages/SignupGate.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStorage } from '../../utils/authStorage';

function SignupGatePage() {
  const navigate = useNavigate();
  const status = authStorage.getStatus();

  useEffect(() => {
    if (status !== 'SIGNUP_REQUIRED') {
      // 새로고침 등으로 직접 접근했는데 가입 단계가 아니면 홈으로
      navigate('/');
    }
  }, [status, navigate]);

  return (
    <div style={{ padding: 24 }}>
      <h2>회원가입</h2>
      <p>일반 고객으로 가입하시겠어요, 점주로 가입하시겠어요?</p>
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button onClick={() => navigate('/signup/customer')}>일반 고객</button>
        <button onClick={() => navigate('/signup/owner')}>점주</button>
      </div>
    </div>
  );
}

export default SignupGatePage;
