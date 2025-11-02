import axiosClient from '../axiosClient';

export const shopLinkService = {
  /**
   * 매장 링크 조회 (점주용)
   * 항상 user라는 이름으로 빈 객체를 파라미터에 포함
   * @returns {Promise<Object>} fullUrl, canonicalUrl, slug, publicCode
   */
  getShopLink: async () => {
    const res = await axiosClient.get('/shop/link', {
      params: {
        user: {},
      },
    });
    return res.data;
  },

  /**
   * 공개 링크로 채팅방 조회 or 생성
   * @param {string} slugOrCode - 매장 식별 코드
   */
  getChatRoomByCode: async (slugOrCode) => {
    const res = await axiosClient.get(`/link/chat/${slugOrCode}`, {
      params: {
        user: {},
      },
    });
    return res.data;
  },
};
