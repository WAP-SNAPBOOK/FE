import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); //사용자 정보(nickname, userTpye 등)
  const [status, setStatus] = useState('UNAUTHENTICATED'); //로그인 상태

  //로그인 후 받은 profile로  사용자 상태로 변경
  const login = (profile) => {
    setUser(profile);
    setStatus('AUTHENTICATED'); //로그인 한 상태로 변경
  };

  //사용자 정보, 로그인 상태 초기화(로그아웃)
  const logout = () => {
    setUser(null);
    setStatus('UNAUTHENTICATED');
  };

  return (
    <AuthContext.Provider value={{ user, status, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAUth() {
  return useContext(AuthContext);
}
