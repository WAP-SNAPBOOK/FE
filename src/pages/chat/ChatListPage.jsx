import React from 'react';
import { chatRoomsMockData } from '../../data/chatRoomsMockData';
import ChatRoomItem from '../../components/chat/ChatRoomItem';
import * as S from './ChatListPage.Style';
import Container from '../../components/common/Container';

export default function ChatListPage() {
  return (
    <Container $start>
      <S.PageWrapper>
        <S.Header>채팅</S.Header>
        <S.RoomList>
          {chatRoomsMockData.map((room) => (
            <ChatRoomItem key={room.chatRoomId} room={room} />
          ))}
        </S.RoomList>
      </S.PageWrapper>
    </Container>
  );
}
