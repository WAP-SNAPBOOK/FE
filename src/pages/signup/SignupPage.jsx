import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SignupTitle } from '../../components/title/SignupTitle';
import { AuthInput } from '../../components/auth/AuthInput';
import Container from '../../components/common/Container';
import { NextButton } from '../../components/common/NextButton';
import { useSignupCustomer, useSignupOwner } from '../../query/signupQueries';

function SignupPage({ userType }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignupRequired = location.state?.isSignupRequired;

  // redirect 쿼리값 추출
  const redirect = new URLSearchParams(location.search).get('redirect');

  // redirect 있으면 무조건 CUSTOMER 로 고정 없다면 그대로 진행
  const effectiveUserType = redirect ? 'CUSTOMER' : userType;

  // 타입별 고객, 점주 회원가입 훅 선택
  const signup = effectiveUserType === 'CUSTOMER' ? useSignupCustomer() : useSignupOwner();

  // 입력폼 상태
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
  });

  ///비인가된 접근 시 홈으로
  useEffect(() => {
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

    // redirect 존재 + 점주 회원가입 시도 방지
    if (redirect && userType !== 'CUSTOMER') {
      alert('링크를 통한 회원가입은 고객만 가능합니다.');
      navigate('/'); // 홈으로 이동
      return;
    }

    signup.mutate(formData, {
      onSuccess: () => {
        // 회원가입 성공 시 redirect로 복귀
        if (redirect) {
          //식별코드 관련 리다이렉트 페이지로 다시 이동
          navigate(`/s/${redirect}`, { replace: true });
        } else {
          navigate('/'); // 기본 홈으로
        }
      },
    });
  };

  return (
    <Container>
      <div className="w-[305px] h-[530px] flex flex-col items-center">
        <SignupTitle>{userType === 'CUSTOMER' ? '고객 회원가입' : '점주 회원가입'}</SignupTitle>

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

export default SignupPage;
