import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Container from '../../components/common/Container';
import * as S from './ChatRoomPage.Style';
import sendIcon from '../../assets/icons/send-icon.svg';
import addIcon from '../../assets/icons/add-icon.svg';
import backIcon from '../../assets/icons/back-icon.svg';
import { ChatRoomTitle } from '../../components/title/SignupTitle';

export default function ChatRoomPage() {
  const [message, setMessage] = useState(''); //입력 메시지 상태
  const [messages, setMessages] = useState([
    { id: 1, text: '안녕하세요! 예약 가능할까요?', sender: 'me', time: '오전 11:03' },
    { id: 2, text: '네 가능합니다. 언제 오실까요?', sender: 'other', time: '오전 11:12' },
    { id: 3, text: '오늘 오후 3시에요.', sender: 'me', time: '오전 11:14' },
  ]); //메세지 목록 상태

  //스크롤 제어용 Ref
  const bottomRef = useRef(null);

  //메시지 추가 시 자동 스크롤
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const navigate = useNavigate();
  const { chatRoomId } = useParams(); // URL 파라미터 추출

  // 메시지 전송 헨들러
  const handleSend = () => {
    if (!message.trim()) return;

    //현재 입력한 채팅 옆 시간 추가
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedTime = `${ampm} ${hours % 12 || 12}:${minutes}`;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'me',
      time: formattedTime,
    };
    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
  };

  return (
    <Container $start>
      <S.PageWrapper>
        <S.Header>
          <S.BackButton onClick={() => navigate(-1)}>
            <img src={backIcon} alt="back" />
          </S.BackButton>
          <ChatRoomTitle>채팅방 #{chatRoomId}</ChatRoomTitle>
          <S.BookButton>예약</S.BookButton>
        </S.Header>
        <S.MessageList>
          {messages.map((msg) => (
            <S.MessageRow key={msg.id} $isMine={msg.sender === 'me'}>
              {/*상대방, 본인을 구분하여 채팅 말풍선 정렬 */}
              {msg.sender === 'me' ? (
                <>
                  <S.Time>{msg.time}</S.Time>
                  <S.Bubble $isMine>{msg.text}</S.Bubble>
                </>
              ) : (
                <>
                  <S.Bubble $isMine={false}>{msg.text}</S.Bubble>
                  <S.Time>{msg.time}</S.Time>
                </>
              )}
            </S.MessageRow>
          ))}
          {/* 항상 마지막 메시지 뒤에 붙인 ref */}
          <div ref={bottomRef} />
        </S.MessageList>
        <S.InputBar>
          <S.AddButton>
            <img src={addIcon} alt="addMenu" />
          </S.AddButton>
          <S.ChatInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            maxLength={300}
          />
          <S.ChatButton onClick={handleSend}>
            <img src={sendIcon} alt="send" />
          </S.ChatButton>
        </S.InputBar>
      </S.PageWrapper>
    </Container>
  );
}
