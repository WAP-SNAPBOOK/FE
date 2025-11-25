import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteUser } from '../../query/authQueries';
import * as S from './HomePage.styles';
import ChatIcon from '../../assets/icons/mainChat-icon.svg';
import BookIcon from '../../assets/icons/book-icon.svg';
import Container from '../../components/common/Container';
import Header from '../../components/common/Header';
import MainActionButton from '../../components/home/MainActionButton ';
import BottomNav from '../../components/common/BottomNav';

export default function HomePage() {
  const navigate = useNavigate();

  //채팅방 목록 이동
  const goToChat = () => {
    navigate('/chat');
  };

  // 예약 내역 이동
  const goToReservationList = () => {
    navigate('/reservations'); // or 실제 라우트 이름에 맞게 수정
  };

  return (
    <Container $start $padding="23px 0">
      <Header title="SNAPBOOK" showSetting={true} />
      <S.CenterArea>
        <S.ButtonGroup>
          <MainActionButton onClick={goToChat} icon={ChatIcon} label="채팅방 조회" />
          <MainActionButton onClick={goToReservationList} icon={BookIcon} label="예약 내역" />
        </S.ButtonGroup>
        <BottomNav />
      </S.CenterArea>
    </Container>
  );
}
