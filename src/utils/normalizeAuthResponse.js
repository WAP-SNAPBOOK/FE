// 통합된 회원가입, 로그인 응답 구조 정규화 함수
export default function normalizeAuthResponse(raw) {
  if (!raw || typeof raw !== 'object') return null;

  // tokens 구조 정규화
  const tokens = raw.tokens
    ? {
        accessToken: raw.tokens.accessToken ?? null,
        refreshToken: raw.tokens.refreshToken ?? null,
      }
    : {
        accessToken: raw.accessToken ?? null,
        refreshToken: raw.refreshToken ?? null,
      };

  // 공통 필드 통합
  return {
    userType: raw.userType ?? null,
    tokens,
    role: raw.role ?? null,
    message: raw.message ?? null,
    authStatus: raw.authStatus ?? null,
    name: raw.name ?? null,
    phoneNumber: raw.phoneNumber ?? null,
  };
}
