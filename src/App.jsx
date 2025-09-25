import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KakaoLoginButton from './components/auth/KakaoLoginButton';
import AuthRedirectPage from './pages/AuthRedirectPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<KakaoLoginButton />} />
          <Route path="/auth" element={<AuthRedirectPage />} />
        </Routes>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}

export default App;
