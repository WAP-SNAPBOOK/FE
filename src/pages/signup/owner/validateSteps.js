import { validateMobile010 } from '../../../utils/phoneNumber';

export const validateStep1 = ({ name, phoneNumber, businessName, address }) => {
  if (!name || !phoneNumber || !businessName || !address) {
    alert('모든 항목을 입력해주세요.');
    return false;
  }
  const { valid, reason } = validateMobile010(phoneNumber);
  if (!valid) {
    alert(
      reason === 'length'
        ? '전화번호는 숫자만 11자리여야 합니다.'
        : '정확한 휴대폰 번호(010으로 시작)를 입력해주세요.'
    );
    return false;
  }
  return true;
};
// export const validateStep2 = (step2Data) => true; // 추후 추가
