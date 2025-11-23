import axiosClient from '../axiosClient';

export const shopReservationService = {
  /**
   * 상점 예약 목록 가져오기
   * GET /api/reservations/shop
   * @returns {Promise<Array>} 예약 배열
   */
  getShopReservations: async () => {
    const response = await axiosClient.get('/api/reservations/shop');
    return response.data;
  },
};
