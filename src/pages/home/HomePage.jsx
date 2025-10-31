import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDeleteUser } from '../../query/authQueries';
import * as S from './HomePage.styles';
import ChatIcon from '../../assets/icons/mainChat-icon.svg';
import BookIcon from '../../assets/icons/book-icon.svg';
import Container from '../../components/common/Container';
import Header from '../../components/common/Header';
import MainActionButton from '../../components/home/MainActionButton ';

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
    <Container $start $padding="23px 0">
      <Header title="SNAPBOOK" showSetting={true} />
      <S.CenterArea>
        <S.ButtonGroup>
          <MainActionButton onClick={goToChat} icon={ChatIcon} label="채팅방 조회" />
          <MainActionButton onClick={goToChat} icon={BookIcon} label="예약 내역" />
        </S.ButtonGroup>
        <BottomNav />
      </S.CenterArea>
    </Container>
  );
}
