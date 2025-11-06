import axiosClient from '../axiosClient';

export const reservationService = {
  /**
   * 상점별 예약 폼 구성 가져오기
   * @param {number} shopId - 상점 ID (path param)
   * @returns {Promise<Array>} 예약 폼 필드 배열
   */
  getFormConfig: async (shopId) => {
    const res = await axiosClient.get(`/api/v1/form/${shopId}`, {
      params: {
        shopId,
      },
    });
    return res.data;
  },
};
