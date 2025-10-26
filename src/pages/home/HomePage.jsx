import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { useDeleteUser } from '../../query/authQueries';

export default function HomePage() {
  const navigate = useNavigate();
  //사용자 정보 전역 상태
  const { auth } = useAuth();
  //회원탈퇴 훅
  const deleteuser = useDeleteUser();

  //회원탈퇴 헨들러
  const deleteUserHandler = () => {
    deleteuser.mutate();
  };

  const goToChat = () => {
    navigate('/chat'); //chat 경로로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h2 className="text-2xl font-semibold mb-4">홈화면 (임시)</h2>
      {auth ? (
        <>
          <p className="mb-2">안녕하세요, {auth.name || '사용자'}님 </p>
          <div className="flex gap-4 mt-4">
            <Button onClick={goToChat}>💬 채팅 목록 보기</Button>
            <Button onClick={deleteUserHandler}>임시 회원탈퇴</Button>
          </div>
        </>
      ) : (
        <p>로그인 정보가 없습니다.</p>
      )}
      <Button></Button>
    </div>
  );
}
