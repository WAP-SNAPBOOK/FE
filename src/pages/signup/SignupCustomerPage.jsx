import React, { useEffect, useState } from 'react';
import { useSignupCustomer } from '../../query/signupQueries';
import { useLocation, useNavigate } from 'react-router-dom';
import { SignupTitle } from '../../components/title/SignupTitle';
import Container from '../../components/common/Container';
import { AuthInput } from '../../components/auth/AuthInput';
import { NextButton } from '../../components/common/NextButton';

function SignupCustomerPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignupRequired = location.state?.isSignupRequired;
  const signup = useSignupCustomer();
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    ///비인가된 접근 시 홈으로
    if (!isSignupRequired) navigate('/');
  }, [navigate]);

  const onChange = (e) => setNickname(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    signup.mutate({ nickname });
  };

  return (
    <Container>
      <div className="w-[305px] h-[530px] flex flex-col items-center">
        <SignupTitle>고객 회원가입</SignupTitle>
        <form onSubmit={onSubmit} className="w-full flex flex-col items-center">
          <label key={'닉네임'} className="w-full block mb-[15px]">
            <AuthInput
              name={'닉네임'}
              value={nickname}
              placeholder={'닉네임'}
              onChange={onChange}
            />
          </label>
          <NextButton type="submit" disabled={signup.isPending} className="mt-[30px]">
            {signup.isPending ? '가입중...' : '가입하기'}
          </NextButton>
          {signup.isError && <p style={{ color: 'red' }}>가입 실패: {signup.error?.message}</p>}
        </form>
      </div>
    </Container>
  );
}

export default SignupCustomerPage;
