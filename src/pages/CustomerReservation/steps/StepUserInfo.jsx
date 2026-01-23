import { useState, useEffect } from 'react';
import { sanitizeDigits, validateMobile010 } from '@/utils/phoneNumber';
import * as S from './steps.styles';

export default function StepUserInfo({ initialData, onChange }) {
  const [name, setName] = useState(initialData.name);
  const [phone, setPhone] = useState(initialData.phoneNumber);

  const isValid = name.trim().length > 0 && validateMobile010(phone).valid;

  //예약 폼 정보 변경(이름, 전화 번호)
  useEffect(() => {
    onChange({
      name,
      phoneNumber: phone,
      isValid, //입력 유효성 여부
    });
  }, [name, phone, isValid, onChange]);

  return (
    <>
      <S.StepTitle>기본 정보 입력</S.StepTitle>
      <div className="flex flex-col items-center mb-[320px]">
        <S.Field>
          <S.Label>이름</S.Label>
          <S.Input
            placeholder="이름을 입력해 주세요"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 5))}
          />
        </S.Field>

        <S.Field>
          <S.Label>전화번호</S.Label>
          <S.Input
            placeholder="전화번호를 입력해 주세요"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(sanitizeDigits(e.target.value))}
          />
        </S.Field>
      </div>
    </>
  );
}
