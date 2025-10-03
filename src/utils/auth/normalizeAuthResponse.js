// 응답 구조 → 통일된 스토리지 구조로 정규화
export default function normalizeAuthResponse(raw) {
  if (!raw || typeof raw !== 'object') return null;

  return {
    userType: raw.userType, // "CUSTOMER" | "OWNER"
    tokens: {
      accessToken: raw.tokens?.accessToken ?? raw.accessToken ?? null,
      refreshToken: raw.tokens?.refreshToken ?? raw.refreshToken ?? null,
    },
    profile: {
      nickname: raw.nickname ?? null,
      businessName: raw.businessName ?? null,
      businessNumber: raw.businessNumber ?? null,
      address: raw.address ?? null,
      phoneNumber: raw.phoneNumber ?? null,
    },
    authStatus: raw.authStatus ?? 'LOGIN_SUCCESS',
  };
}
