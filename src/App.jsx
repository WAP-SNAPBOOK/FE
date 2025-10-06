import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KakaoLoginButton from './components/auth/KakaoLoginButton';
import AuthRedirectPage from './pages/AuthRedirectPage';
import SignupGatePage from './pages/signup/SignupGatePage';
import SignupOwnerPage from './pages/signup/SignupOwnerPage';
import SignupCustomerPage from './pages/signup/SignupCustomerPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<KakaoLoginButton />} />
            <Route path="/auth" element={<AuthRedirectPage />} />
            <Route path="/signup" element={<SignupGatePage />} />
            <Route path="/signup/owner" element={<SignupOwnerPage />} />
            <Route path="/signup/customer" element={<SignupCustomerPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}

export default App;
