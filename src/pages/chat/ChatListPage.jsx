import React from 'react';
import { chatRoomsMockData } from '../../data/chatRoomsMockData';
import ChatRoomItem from '../../components/chat/ChatRoomItem';
import * as S from './ChatListPage.Style';
import Container from '../../components/common/Container';
import MenuIcon from '../../assets/menus/chatMenu-icon.svg';
import { useChatRooms } from '../../query/chatQueries';

export default function ChatListPage() {
  const { data: rooms } = useChatRooms();

  return (
    <Container $start>
      <S.PageWrapper>
        <S.HeaderBar>
          <S.Header>채팅</S.Header>
          <S.MenuButton>
            <img src={MenuIcon} alt="menu" />
          </S.MenuButton>
        </S.HeaderBar>
        <S.RoomList>
          {rooms?.map((room) => (
            <ChatRoomItem key={room.chatRoomId} room={room} />
          ))}
        </S.RoomList>
      </S.PageWrapper>
    </Container>
  );
}
