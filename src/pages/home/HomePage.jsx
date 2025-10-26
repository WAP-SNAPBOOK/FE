import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { useDeleteUser } from '../../query/authQueries';

export default function HomePage() {
  //사용자 정보 전역 상태
  const { auth } = useAuth();
  //회원탈퇴 훅
  const deleteuser = useDeleteUser();

  //회원탈퇴 헨들러
  const deleteUserHandler = () => {
    deleteuser.mutate();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h2 className="text-2xl font-semibold mb-4">홈화면 (임시)</h2>
      {auth ? (
        <>
          <p className="mb-2">안녕하세요, {auth.name || '사용자'}님 </p>
          <Button onClick={deleteUserHandler}>임시 회원탈퇴</Button>
        </>
      ) : (
        <p>로그인 정보가 없습니다.</p>
      )}
    </div>
  );
}
