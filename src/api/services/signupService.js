import axiosClient from '../axiosClient';

export const signupService = {
  signupCustomer: async (payload) => {
    const res = await axiosClient.post('/user/customer/signup', payload);
    return res.data;
  },

  signupOwner: async (payload) => {
    const res = await axiosClient.post('/user/owner/signup', payload);
    return res.data;
  },
};
