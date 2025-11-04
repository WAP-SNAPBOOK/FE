export const sanitizeDigits = (s) => String(s ?? "").replace(/\D/g, "");

/**
 * 한국 휴대폰(010) 전용 검증
 * - 숫자만 11자리
 * - 010으로 시작
 * 반환: { valid, digits, reason }
 */
export function validateMobile010(input) {
  const digits = sanitizeDigits(input);

  if (digits.length !== 11) {
    return { valid: false, digits, reason: "length" };
  }
  if (!/^010\d{8}$/.test(digits)) {
    return { valid: false, digits, reason: "format" };
  }
  return { valid: true, digits, reason: null };
}