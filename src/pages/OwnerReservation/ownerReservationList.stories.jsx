import React from 'react';
import OwnerReservationList from './ownerReservationList.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default {
  title: 'Pages/OwnerReservationList',
  component: OwnerReservationList,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export const Default = {};
