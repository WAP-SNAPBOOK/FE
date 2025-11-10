import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useSendMessage, useChatMessages } from '../../query/chatQueries';
import { chatSocketService } from '../../api/services/chatSocketService';
import DateDivider from '../../components/chat/DateDivider';
import dayjs from 'dayjs';
import { formatTime } from '../../utils/formatTime';
import Container from '../../components/common/Container';
import * as S from './ChatRoomPage.style';
import sendIcon from '../../assets/icons/send-icon.svg';
import addIcon from '../../assets/icons/add-icon.svg';
import backIcon from '../../assets/icons/back-icon.svg';
import { ChatRoomTitle } from '../../components/title/SignupTitle';
import ReservationModal from '../../components/reservation/ReservationModal';
import { authStorage } from '../../utils/auth/authStorage';
import { useAuth } from '../../context/AuthContext';
import { usePreserveScrollPosition } from '../../hooks/chat/usePreserveScrollPosition';
import { useInitScrollToBottom } from '../../hooks/chat/useInitScrollToBottom';
import { useTopObserver } from '../../hooks/chat/useTopObserver';
import { useShopInfoByCode } from '../../query/linkQueries';
import { ReservationCompleteMessage } from '../../components/message/ReservationCompleteMessage';
import AddMenuButton from '../../components/chat/AddMenuButton';
import ChatMenuPanel from '../../components/chat/ChatMenuPanel';
import ChatSumbitButton from '../../components/chat/chatSumbitButton';

export default function ChatRoomPage() {
  const [input, setInput] = useState('');
  const [liveMessages, setLiveMessages] = useState([]);
  const [readyToObserve, setReadyToObserve] = useState(false);

  //예약 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //메뉴 표시 여부 상태
  const [showMenu, setShowMenu] = useState(false);

  //링크 유입시 가게 정보 조회
  const [searchParams] = useSearchParams();
  const slugOrCode = searchParams.get('slug');
  const { data: shopInfo } = useShopInfoByCode(slugOrCode);

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1); // 이전 페이지가 존재할 경우 채팅 목록 이동
    } else {
      navigate('/'); // 외부 유입이라 이전 기록 없을 때 홈으로(링크 유입)
    }
  };

  //버튼 토글 핸들러
  const handleToggleMenu = () => {
    // 메뉴 표시/숨김 토글
    setTimeout(() => {
      setShowMenu((prev) => !prev);
    }, 150);
  };

  const { auth } = useAuth();
  const userId = auth?.userId;

  //스크롤 위치 제어용 ref
  const messageListRef = useRef(null);
  //스크롤 감지용 ref
  const topObserverRef = useRef(null);
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
        senderId: userId,
        senderName: 'me', // TODO: 백앤드에서 보낸 실제 사용자 본인 이름으로 교체
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

  // 실시간(내가 보낸 메시지 or 상대방 메시지 수신)일 때만 하단 이동
  useEffect(() => {
    if (liveMessages.length > 0) {
      scrollToBottom();
    }
  }, [liveMessages]);

  //메시지 prepend시 스크롤 제어
  usePreserveScrollPosition(messageListRef, isFetchingNextPage);

  //페이지 첫 마운트 시 스크롤 하단 제어
  useInitScrollToBottom(
    data,
    isFetchingNextPage,
    readyToObserve,
    scrollToBottom,
    setReadyToObserve
  );

  //상단 스크롤 제어를 통한 fetch 훅
  useTopObserver(
    isSuccess,
    readyToObserve,
    topObserverRef,
    messageListRef,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  );

  // 메시지 전송 핸들러
  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
  };

  //예약 전송 완료 메시지 처리 함수
  const onReservationComplete = (data) => {
    setLiveMessages((prev) => [
      ...prev,
      {
        messageId: `complete-${Date.now()}`,
        type: 'RESERVATION_COMPLETE',
        isReservationCard: true, //예약 완료 메시지임을 명시
        payload: data, // { name, date, time, photoCount }
        sentAt: new Date().toISOString(),
      },
    ]);
  };

  // 모든 메시지 병합 (기존 + 실시간, 중복 제거)
  const merged = [...(oldMessages ?? []), ...liveMessages];
  const allMessages = Array.from(new Map(merged.map((m) => [m.messageId, m])).values());
  return (
    <Container $start>
      <S.PageWrapper>
        <S.Header>
          <S.BackButton onClick={handleBack}>
            <img src={backIcon} alt="back" />
          </S.BackButton>
          {/*현재 링크 유입시만 가게이름 조회 가능*/}
          <ChatRoomTitle>
            {shopInfo?.shopName ? shopInfo.shopName : `채팅방 #${chatRoomId}`}
          </ChatRoomTitle>
          <S.BookButton onClick={openModal}>예약</S.BookButton>
        </S.Header>
        <S.MessageList ref={messageListRef}>
          {/*상단 스크롤 감지용 */}
          <div ref={topObserverRef} />
          {allMessages.map((msg, index) => {
            const isMine = msg.senderId === userId; //사용자 본인 Id를 통한 메시지 판별
            const isReservationCard = msg.isReservationCard; // 예약 전송 완료 메시지 여부

            const currentDate = dayjs(msg.sentAt).format('YYYY-MM-DD'); //현재 날짜
            const prevDate =
              index > 0 ? dayjs(allMessages[index - 1].sentAt).format('YYYY-MM-DD') : null; //이전 날짜, 메시지 하나일 시 null

            const showDateDivider = currentDate !== prevDate; //다른 날짜 판별 기준값

            return (
              <React.Fragment key={`${index}-${msg.messageId}`}>
                {/*이전 날짜와 현재 날짜과 다르다면 구분선 추가*/}
                {showDateDivider && <DateDivider date={msg.sentAt} />}
                {/*예약 완료 메시지*/}
                {isReservationCard ? (
                  <S.MessageRow $isMine={false}>
                    <S.Bubble $isMine={false}>
                      <ReservationCompleteMessage
                        name={msg.payload.name}
                        date={msg.payload.date}
                        time={msg.payload.time}
                        photoCount={msg.payload.photoCount}
                      />
                    </S.Bubble>
                  </S.MessageRow>
                ) : (
                  //일반 메시지 렌더링, 상대방, 본인 메시지에 따른 정렬

                  <S.MessageRow $isMine={isMine}>
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
                )}
              </React.Fragment>
            );
          })}
          {/* 하단 스크롤 고정용 */}
          <div ref={bottomRef} />
        </S.MessageList>
        {/* 채팅 메뉴 패널 */}
        <ChatMenuPanel visible={showMenu} />

        <S.InputBar>
          {/* 채팅 메뉴 목록 버튼 */}
          <AddMenuButton onToggleMenu={handleToggleMenu} />
          {/* 채팅 입력 바 */}
          <S.ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            maxLength={300}
            onFocus={() => setShowMenu(false)} //키보드 열릴때 메뉴 닫기
          />
          {/*채팅 전송 버튼*/}
          <ChatSumbitButton onClick={handleSend} />
        </S.InputBar>
      </S.PageWrapper>
      {/*예약 모달 */}
      <ReservationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        shopId={shopInfo?.shopId}
        onReservationComplete={onReservationComplete}
      />
    </Container>
  );
}
