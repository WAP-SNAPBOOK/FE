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
  //회원가입 입력 폼 상태
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
  });

  useEffect(() => {
    ///비인가된 접근 시 홈으로
    if (!isSignupRequired) navigate('/');
  }, [navigate]);

  //회원가입 입력 폼 헨들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //회원가입 입력폼 제출 헨들러
  const onSubmit = (e) => {
    e.preventDefault();

    const { name, phoneNumber } = formData;
    if (!name || !phoneNumber) {
      alert('이름과 전화번호를 모두 입력해주세요.');
      return;
    }

    signup.mutate(formData);
  };

  return (
    <Container>
      <div className="w-[305px] h-[530px] flex flex-col items-center">
        <SignupTitle>고객 회원가입</SignupTitle>
        <form onSubmit={onSubmit} className="w-full flex flex-col items-center">
          <label className="w-full block mb-[15px]">
            <AuthInput
              name="name"
              value={formData.name}
              placeholder="이름"
              onChange={handleChange}
            />
          </label>

          <label className="w-full block mb-[15px]">
            <AuthInput
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder="전화번호"
              onChange={handleChange}
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
