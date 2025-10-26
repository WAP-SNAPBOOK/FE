import * as S from './ChatRoomItem.styles';

export default function ChatRoomItem({ room }) {
  const { shopBusinessName, otherUserName, lastMessageContent, lastMessageAt, unreadCount } = room;

  return (
    <S.Container>
      <S.Avatar>{otherUserName[0]}</S.Avatar>
      <S.InfoWrapper>
        <S.TopRow>
          <S.ShopName>{shopBusinessName}</S.ShopName>
          <S.Time>
            {new Date(lastMessageAt).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </S.Time>
        </S.TopRow>
        <S.BottomRow>
          <S.LastMessage>{lastMessageContent}</S.LastMessage>
          {unreadCount > 0 && <S.UnreadBadge>{unreadCount}</S.UnreadBadge>}
        </S.BottomRow>
      </S.InfoWrapper>
    </S.Container>
  );
}
