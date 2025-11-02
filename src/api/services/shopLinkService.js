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

