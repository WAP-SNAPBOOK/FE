import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthRedirectPage from './pages/AuthRedirectPage';
import SignupGatePage from './pages/signup/SignupGatePage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/login/LoginPage';
import GlobalStyle from './styles/GlobalStyled';
import SignupPage from './pages/signup/SignupPage';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyle />

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/auth" element={<AuthRedirectPage />} />
              <Route path="/signup" element={<SignupGatePage />} />
              <Route path="/signup/customer" element={<SignupPage userType="CUSTOMER" />} />
              <Route path="/signup/owner" element={<SignupPage userType="OWNER" />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>

        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </QueryClientProvider>
    </>
  );
}

export default App;
