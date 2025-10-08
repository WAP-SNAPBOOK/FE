// pages/SignupGate.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from '../../components/common/Container';
import { SignupButton } from '../../components/auth/SignupButton';
import { NextButton } from '../../components/common/NextButton';

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
    <Container>
      <div className="w-[305px] flex flex-col items-center">
        <h1 className="mb-[73px] text-[30px] font-semibold border-b-2">회원가입</h1>
        <div className="w-full flex justify-between mb-[300px]">
          <SignupButton.Customer
            onClick={() => navigate('/signup/customer', { state: { isSignupRequired: true } })}
          >
            고객
          </SignupButton.Customer>
          <SignupButton.Owner
            onClick={() => navigate('/signup/owner', { state: { isSignupRequired: true } })}
          >
            점주
          </SignupButton.Owner>
        </div>
        <NextButton>다음</NextButton>
      </div>
    </Container>
  );
}

export default SignupGatePage;
