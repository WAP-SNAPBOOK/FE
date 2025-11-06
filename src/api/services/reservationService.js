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

  /**
   * 예약 생성 API
   * @param {Object} payload - 예약 데이터 (shopId, formData)
   * @returns {Promise<Object>} 생성된 예약 정보
   */
  createReservation: async (payload) => {
    const res = await axiosClient.post(`/api/reservations`, payload);
    return res.data;
  },
};
