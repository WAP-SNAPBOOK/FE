import { useNavigate } from 'react-router-dom';
import { truncateByVisualLength } from '../../utils/truncateByVisualLength';
import * as S from './ChatRoomItem.styles';

//메시지 최대 길이
const MAX_LENGTH = 30;

export default function ChatRoomItem({ room }) {
  const navigate = useNavigate();
  const { shopBusinessName, otherUserName, lastMessageContent, lastMessageAt, unreadCount } = room;

  //해당 채팅방 이동 헨들러
  const handleClick = () => {
    navigate(`/chat/${room.chatRoomId}`);
  };

  //일정 길이 이상일때 마지막 메시지 길이 줄이기
  const shortMessage = truncateByVisualLength(lastMessageContent, MAX_LENGTH);

  return (
    <S.Container>
      <S.Avatar>{otherUserName[0]}</S.Avatar>
      <S.InfoWrapper onClick={handleClick}>
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
          <S.LastMessage>{shortMessage}</S.LastMessage>
          {unreadCount > 0 && <S.UnreadBadge>{unreadCount}</S.UnreadBadge>}
        </S.BottomRow>
      </S.InfoWrapper>
    </S.Container>
  );
}
