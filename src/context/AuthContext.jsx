import { createContext, useContext, useState, useEffect } from 'react';
import { authStorage } from '../utils/auth/authStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ name: '', phoneNumber: '' });

  useEffect(() => {
    const stored = authStorage.get();
    if (stored) {
      //토큰을 제외한 사용자 정보만 관리
      const { userType, profile, authStatus } = stored;
      setAuth({ userType, profile, authStatus });
    }
  }, []);

  //로그인 후 받은 응답으로 토큰을 제외한 나머지 사용자 정보 상태만 관리
  const login = (response) => {
    if (!response) return;

    // 화면에서 관리할 사용자 정보만 설정 (토큰 제외)
    setAuth({
      name: response.name,
      phoneNumber: response.phoneNumber,
    });

    // 토큰 포함해서 모두 저장
    authStorage.save(response);
  };

  //사용자 정보, 로그인 상태 초기화(로그아웃)
  const logout = () => {
    setAuth(null);
    authStorage.clear();
  };

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
