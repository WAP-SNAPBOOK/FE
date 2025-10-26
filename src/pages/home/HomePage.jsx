import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export default function HomePage() {
  const { auth, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h2 className="text-2xl font-semibold mb-4">홈화면 (임시)</h2>
      {auth ? (
        <>
          <p className="mb-2">안녕하세요, {auth.name || '사용자'}님 </p>
          <Button onClick={logout}>임시 회원탈퇴</Button>
        </>
      ) : (
        <p>로그인 정보가 없습니다.</p>
      )}
    </div>
  );
}
