import React from 'react';
import MessageList from '../../components/message/MessageList';
import * as S from '../../pages/chat/ChatRoomPage.style';
import Container from '../../components/common/Container';

export default function ChatStories({ messages }) {
  return (
    <Container $start>
      <S.PageWrapper>
        <S.Messages>
          <MessageList messages={messages} userId={1} />
        </S.Messages>
      </S.PageWrapper>
    </Container>
  );
}
