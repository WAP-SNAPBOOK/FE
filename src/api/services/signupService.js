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

  //점주 가게정보 추가 회원가입 요청
  registerShopInfo: async (playload) => {
    const res = await axiosClient.post('/shop', payload);
    return res.data;
  },
};
