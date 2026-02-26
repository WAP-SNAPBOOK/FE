import { AuthInput } from '../../../../../components/auth/AuthInput';

export default function StepBasicInfo({ initialData, onChange }) {
  return (
    <div className="w-full flex flex-col gap-[15px]">
      <AuthInput
        name="name"
        value={initialData.name}
        placeholder="이름"
        maxLength={5}
        onChange={onChange}
      />
      <AuthInput
        name="phoneNumber"
        value={initialData.phoneNumber}
        placeholder="전화번호"
        onChange={onChange}
      />
      <AuthInput
        name="businessName"
        value={initialData.businessName}
        placeholder="상호명"
        onChange={onChange}
      />
      <AuthInput
        name="address"
        value={initialData.address}
        placeholder="주소"
        onChange={onChange}
      />
    </div>
  );
}
