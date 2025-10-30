import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSendMessage, useChatMessages } from '../../query/chatQueries';
import { chatSocketService } from '../../api/services/chatSocketService';
import { formatTime } from '../../utils/formatTime';
import Container from '../../components/common/Container';
import * as S from './ChatRoomPage.Style';
import sendIcon from '../../assets/icons/send-icon.svg';
import addIcon from '../../assets/icons/add-icon.svg';
import backIcon from '../../assets/icons/back-icon.svg';
import { ChatRoomTitle } from '../../components/title/SignupTitle';
import { authStorage } from '../../utils/auth/authStorage';

export default function ChatRoomPage() {
  const [input, setInput] = useState('');
  const [liveMessages, setLiveMessages] = useState([]);
  const [readyToObserve, setReadyToObserve] = useState(false);

  //스크롤 위치 제어용 ref
  const messageListRef = useRef(null);

  //스크롤 감지용 ref
  const topObserberRef = useRef(null);
  //스크롤 제어 ref
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  //해당 채팅방 ID
  const { chatRoomId } = useParams();

  const accessToken = authStorage.getAccessToken();

  // 기존 메시지, cursor (HTTP GET 기반)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
    useChatMessages(chatRoomId);

  // 모든 페이지 메시지(기존) 합치기
  const oldMessages = data?.pages.flatMap((page) => page.messages).reverse() ?? [];
  //메시지 전송 훅
  const { mutate: sendMessage } = useSendMessage(chatRoomId, (message) => {
    // 낙관적 업데이트(즉시 메시지 표시)
    const now = new Date();
    const tempId = `temp-${Date.now()}`;

    // 서버와 동일한 구조로 임시 메시지 반영
    setLiveMessages((prev) => [
      ...prev,
      {
        clientId: tempId,
        messageId: Date.now(), // 임시 ID
        senderId: 0, //  TODO: 백엔드에서 보낸 실제 사용자 본인 ID로 교체
        senderName: '박진오', // TODO: 백앤드에서 보낸 실제 사용자 본인 이름으로 교체
        message,
        sentAt: now.toISOString(),
        pending: true,
        roomId: Number(chatRoomId),
      },
    ]);
  });

  //WebSocket 연결
  useEffect(() => {
    chatSocketService.connect(accessToken, () => {
      //구독시 상대방 메시지 실시간 업데이트
      chatSocketService.subscribe(chatRoomId, (incoming) => {
        setLiveMessages((prev) => {
          // 1. 같은 메시지(내가 낙관적으로 추가한 메시지)인지 확인
          const idx = prev.findIndex(
            (m) =>
              m.pending &&
              m.clientId &&
              m.message === incoming.message &&
              Math.abs(new Date(m.sentAt) - new Date(incoming.sentAt)) < 2000
          );

          if (idx >= 0) {
            // 2. 낙관적 메시지를 서버 메시지로 교체
            const updated = [...prev];
            updated[idx] = { ...incoming, pending: false };
            return updated;
          }

          // 3. 새로운 메시지면 그냥 추가
          return [...prev, incoming];
        });
      });
    });

    return () => {
      chatSocketService.disconnect();
    };
  }, [chatRoomId]);

  //스크롤 제어(새로운 메시지 추가시 추가된 매시지 보기)
  // 메시지 전송 후 호출
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  //스크롤 제어(사용자가 메시지 추가시)
  useEffect(() => {
    scrollToBottom();
  }, [liveMessages]);

  // 과거 메시지 로드 시 스크롤 위치 보정
  // 과거 메시지 prepend 시 스크롤 위치 유지
  const wasFetchingRef = useRef(false);
  const prevHRef = useRef(0);
  const prevTopRef = useRef(0);

  useEffect(() => {
    const list = messageListRef.current;
    if (!list) return;

    // 로드 시작 시점: 현재 높이/위치 저장
    if (!wasFetchingRef.current && isFetchingNextPage) {
      wasFetchingRef.current = true;
      prevHRef.current = list.scrollHeight; //과거의 전체 스크롤 영역 높이
      prevTopRef.current = list.scrollTop; //과거의 스크롤 위치
    }

    // 로드 종료 시점: DOM 붙은 뒤 보정
    if (wasFetchingRef.current && !isFetchingNextPage) {
      wasFetchingRef.current = false;

      // 렌더 프레임 2번 넘겨서 레이아웃 확정 후 보정
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const newH = list.scrollHeight; //현재의 전체 스크롤 영역 높이
          const diff = newH - prevHRef.current; //과거와의 스크롤과의 차이

          // 차이만큼 더해 줘서 현재 보던 지점 유지
          list.scrollTop = prevTopRef.current + diff;
        });
      });
    }
  }, [isFetchingNextPage]);

  //스크롤 감지를 통한 다음 메시지 불러오기
  useEffect(() => {
    if (!topObserberRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      console.log('감지됨: 다음 50개 불러오기');
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage(); // 다음 50개
        observer.unobserve(first.target); // 중복 방지: 잠시 해제
      }
    });

    observer.observe(topObserberRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 메시지 전송 핸들러
  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
  };

  // 모든 메시지 병합 (기존 + 실시간)
  const allMessages = [...(oldMessages ?? []), ...liveMessages];
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
          {allMessages.map((msg, pageIndex) => {
            const isMine = msg.senderName === '박진오'; // TODO: senderId 비교
            return (
              //상대방, 본인 메시지에 따른 정렬
              <S.MessageRow key={`${pageIndex}-${msg.messageId}`} $isMine={isMine}>
                {isMine ? (
                  <>
                    <S.Time>{formatTime(msg.sentAt)}</S.Time>
                    <S.Bubble $isMine>{msg.message}</S.Bubble>
                  </>
                ) : (
                  <>
                    <S.Bubble $isMine={false}>{msg.message}</S.Bubble>
                    <S.Time>{formatTime(msg.sentAt)}</S.Time>
                  </>
                )}
              </S.MessageRow>
            );
          })}
          {/* 하단 스크롤 고정용 */}
          <div ref={bottomRef} />
        </S.MessageList>

        <S.InputBar>
          <S.AddButton>
            <img src={addIcon} alt="addMenu" />
          </S.AddButton>
          <S.ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
