import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthRedirectPage from './pages/redirect/AuthRedirectPage';
import SignupGatePage from './pages/signup/SignupGatePage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/login/LoginPage';
import GlobalStyle from './styles/GlobalStyled';
import SignupPage from './pages/signup/SignupPage';
import ShopInfoPage from './pages/signup/ShopInfoPage';
import HomePage from './pages/home/HomePage';
import { useAuth } from './context/AuthContext';
import ChatListPage from './pages/chat/ChatListPage';
import ChatRoomPage from './pages/chat/ChatRoomPage';
import Mypage from './pages/profile/Mypage';
import ReservationList from './pages/ReservationList/ReservationList';
import LinkRedirectPage from './pages/redirect/LinkRedirectPage';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes /> {/* AuthProvider 내부로 분리 */}
          </BrowserRouter>
        </AuthProvider>

        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </QueryClientProvider>
    </>
  );
}

function AppRoutes() {
  const { auth } = useAuth();
  return (
    <Routes>
      {/* 로그인 여부에 따라 분기 */}
      <Route path="/" element={auth ? <HomePage /> : <LoginPage />} />
      <Route path="/auth" element={<AuthRedirectPage />} />
      {/* 인스타 링크 리다이렉트 */}
      <Route path="/s/:slugOrCode" element={<LinkRedirectPage />} />
      <Route path="/signup" element={<SignupGatePage />} />
      <Route path="/signup/customer" element={<SignupPage userType="CUSTOMER" />} />
      <Route path="/signup/owner" element={<SignupPage userType="OWNER" />} />
      <Route path="/signup/owner/shop-info" element={<ShopInfoPage />} />
      <Route path="/chat" element={<ChatListPage />} />
      <Route path="/chat/:chatRoomId" element={<ChatRoomPage />} />
      <Route path="/reservations" element={<ReservationList />} />
      <Route path="/mypage" element={<Mypage />} />
    </Routes>
  );
}

export default App;
