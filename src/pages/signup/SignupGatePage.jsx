// pages/SignupGate.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function SignupGatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignupRequired = location.state?.isSignupRequired;

  useEffect(() => {
    if (!isSignupRequired) {
      //비인가된 접근 시 홈으로
      navigate('/');
    }
  }, [navigate]);

  return (
    <div style={{ padding: 24 }}>
      <h2>회원가입</h2>
      <p>일반 고객으로 가입하시겠어요, 점주로 가입하시겠어요?</p>
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <button onClick={() => navigate('/signup/customer', { state: { isSignupRequired: true } })}>
          일반 고객
        </button>
        <button onClick={() => navigate('/signup/owner', { state: { isSignupRequired: true } })}>
          점주
        </button>
      </div>
    </div>
  );
}

export default SignupGatePage;
