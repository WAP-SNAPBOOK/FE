import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useSendMessage, useChatMessages } from '../../query/chatQueries';
import { chatSocketService } from '../../api/services/chatSocketService';
import Container from '../../components/common/Container';
import * as S from './ChatRoomPage.style';
import backIcon from '../../assets/icons/back-icon.svg';
import { ChatRoomTitle } from '../../components/title/SignupTitle';
import ReservationModal from '../../components/reservation/ReservationModal';
import { authStorage } from '../../utils/auth/authStorage';
import { useAuth } from '../../context/AuthContext';
import { usePreserveScrollPosition } from '../../hooks/chat/usePreserveScrollPosition';
import { useTopObserver } from '../../hooks/chat/useTopObserver';
import { useShopInfoByCode } from '../../query/linkQueries';
import AddMenuButton from '../../components/chat/AddMenuButton';
import ChatMenuPanel from '../../components/chat/ChatMenuPanel';
import ChatSumbitButton from '../../components/chat/chatSumbitButton';
import MessageList from '../../components/message/MessageList';
import { useOptimisticMessage } from '../../hooks/chat/useOptimisticMessage';
import { useQueryClient } from '@tanstack/react-query';
import { useNewMessageNotice } from '../../hooks/chat/useNewMessageNotice';
import NewMessageCard from '../../components/notification/NewMessageCard';
import InAppGuideBar from '../../components/common/InAppGuideBar';
import { useCustomerChatReservations } from '../../query/reservationQueries';
import { useInjectReservationMessages } from '../../hooks/chat/useInjectReservationMessages';
import { useShopInfoById } from '../../query/shopQueries';
import { useInitFullReadyScroll } from '../../hooks/chat/useInitFullReadyScroll';

export default function ChatRoomPage() {
  const [input, setInput] = useState(''); //메시지 입력 상태
  const [liveMessages, setLiveMessages] = useState([]); //실시간 추가 메시지 상태
  const [readyToObserve, setReadyToObserve] = useState(false); //옵저버 등록 제어 상태

  //예약 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //메뉴 표시 여부 상태
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  //매장 식별 코드
  const slugOrCode = searchParams.get('slug');

  //매장 id
  const shopIdFromQuery = searchParams.get('shopId') ? Number(searchParams.get('shopId')) : null;

  //링크 유입시 가게 정보 조회
  const { data: shopInfoBySlug } = useShopInfoByCode(slugOrCode);

  //일반 유입시 가게 id조회
  const { data: shopInfoById } = useShopInfoById(shopIdFromQuery);

  //매장 정보 하나로 통합(같은 응답 구조)
  const shopInfo = shopInfoBySlug || shopInfoById;

  //모달 재오픈 방지용 ref
  const hasAutoOpened = useRef(false);

  // 링크 유입(slug 존재) + shopInfo 로딩 완료 시 모달 자동 오픈
  // 인앱에서 1회만
  useEffect(() => {
    if (slugOrCode && shopInfo && !hasAutoOpened.current) {
      hasAutoOpened.current = true;
      openModal();
    }
  }, [shopInfo, hasAutoOpened]);

  //전역 상태 사용자 ID
  const { auth } = useAuth();
  const userId = auth?.userId;

  const accessToken = authStorage.getAccessToken();

  //해당 채팅방 ID
  const { chatRoomId } = useParams();

  const queryClient = useQueryClient();

  //메세지 전송 관련 훅
  const { addOptimisticMessage, replaceWithServerMessage } = useOptimisticMessage(
    setLiveMessages,
    userId,
    chatRoomId
  );

  // 기존 메시지, cursor (HTTP GET 기반)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
    useChatMessages(chatRoomId);

  // shopId를 통한 예약 내역(상태) 조회 훅
  const { data: reservations } = useCustomerChatReservations(shopInfo?.shopId);
  //메시지에 예약 상태 메시지 반영
  useInjectReservationMessages(reservations, setLiveMessages, userId);

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

  //스크롤 위치 제어용 ref
  const messageListRef = useRef(null);
  //스크롤 감지용 ref
  const topObserverRef = useRef(null);
  //스크롤 제어 ref
  const bottomRef = useRef(null);

  // 모든 페이지 메시지(기존) 합치기
  const oldMessages = data?.pages.flatMap((page) => page.messages).reverse() ?? [];
  //메시지 전송 훅
  const { mutate: sendMessage } = useSendMessage(chatRoomId, (message) => {
    //메시지 낙관적 업데이트
    addOptimisticMessage(message);
  });

  // React Query 캐시 초기화
  useEffect(() => {
    return () => {
      queryClient.removeQueries(['messages', chatRoomId]);
    };
  }, [chatRoomId]);

  //WebSocket 연결
  useEffect(() => {
    chatSocketService.connect(accessToken, () => {
      //구독시 상대방 메시지 실시간 업데이트
      chatSocketService.subscribe(chatRoomId, (incoming) => {
        // 낙관적 메시지를 서버 메시지로 교체
        replaceWithServerMessage(incoming);
      });
    });

    return () => {
      chatSocketService.disconnect();
    };
  }, [chatRoomId, replaceWithServerMessage]);

  //스크롤 제어(새로운 메시지 추가시 추가된 매시지 보기)
  // 메시지 전송 후 호출, behavior를 선택 가능
  const scrollToBottom = (smooth = false) => {
    bottomRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  };

  // 실시간(내가 보낸 메시지)일 때만 하단 이동
  useEffect(() => {
    if (liveMessages.length === 0) return;

    const latest = liveMessages[liveMessages.length - 1];

    //내가 보낸 메시지일 때만 스크롤
    if (latest.senderId === userId) {
      scrollToBottom(true);
    }
  }, [liveMessages]);

  // 새 메시지 관련 스크롤 동기화 훅
  const { showNewMessageCard, newMessagePreview, handleScroll, handleClickCard } =
    useNewMessageNotice(liveMessages, messageListRef, scrollToBottom, userId);

  //메시지 prepend시 스크롤 제어
  usePreserveScrollPosition(messageListRef, isFetchingNextPage);

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
        type: 'PENDING',
        isReservationCard: true, //예약 완료 메시지임을 명시
        payload: data, // { name, date, time, photoCount }
        sentAt: new Date().toISOString(),
      },
    ]);
  };

  // 모든 메시지 병합 (기존 + 실시간, 중복 제거)
  const merged = [...(oldMessages ?? []), ...liveMessages];
  //오름차순 시간 정렬
  const allMessages = Array.from(new Map(merged.map((m) => [m.messageId, m])).values()).sort(
    (a, b) => new Date(a.sentAt) - new Date(b.sentAt)
  );

  //페이지 첫 마운트 시 스크롤 하단 제어
  useInitFullReadyScroll(
    data,
    reservations,
    allMessages,
    isFetchingNextPage,
    readyToObserve,
    scrollToBottom,
    setReadyToObserve
  );

  return (
    <Container $start>
      <S.PageWrapper>
        <div className="absolute bottom-[80px] left-3 z-20">
          <InAppGuideBar />
        </div>
        <S.Header>
          <S.BackButton onClick={handleBack}>
            <img src={backIcon} alt="back" />
          </S.BackButton>
          <ChatRoomTitle>{shopInfo?.shopName}</ChatRoomTitle>
          <S.BookButton onClick={openModal}>예약</S.BookButton>
        </S.Header>
        <S.Messages ref={messageListRef} onScroll={handleScroll}>
          {/*상단 스크롤 감지용 */}
          <div ref={topObserverRef} />
          <MessageList messages={allMessages} userId={userId} />
          {/* 하단 스크롤 고정용 */}
          <div ref={bottomRef} />
        </S.Messages>
        {/* 채팅 메뉴 패널 */}
        <ChatMenuPanel visible={showMenu} />
        {/*새 메시지 알림 카드 */}
        {
          <NewMessageCard
            preview={newMessagePreview}
            onClick={handleClickCard}
            visible={showNewMessageCard}
          />
        }

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
