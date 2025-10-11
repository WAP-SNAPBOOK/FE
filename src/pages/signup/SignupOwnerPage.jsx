import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSignupOwner } from '../../query/signupQueries';
import { useNavigate } from 'react-router-dom';
import { SignupTitle } from '../../components/title/SignupTitle';
import { AuthInput } from '../../components/auth/AuthInput';
import Container from '../../components/common/Container';
import { NextButton } from '../../components/common/NextButton';

//필드 라벨 전환 객체
const fieldLabels = {
  nickname: '이름',
  businessName: '상호명',
  businessNumber: '가게 전화번호',
  address: '주소',
  phoneNumber: '전화번호',
};

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
    <Container>
      <div className="w-[305px] h-[529.600px] flex flex-col items-center">
        <SignupTitle>점주 회원가입</SignupTitle>
        <form onSubmit={onSubmit} className="w-full flex flex-col items-center">
          {Object.entries(fieldLabels).map(([key, label]) => (
            <label key={key} className="w-full block mb-[15px]">
              <AuthInput name={key} value={form[key]} placeholder={label} onChange={onChange} />
            </label>
          ))}
          <NextButton type="submit" disabled={signup.isPending} className="mt-[30px]">
            {signup.isPending ? '가입중...' : '가입하기'}
          </NextButton>
          {signup.isError && <p style={{ color: 'red' }}>가입 실패: {signup.error?.message}</p>}
        </form>
      </div>
    </Container>
  );
}

export default SignupOwnerPage;
