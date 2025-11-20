import axiosClient from '../axiosClient';

export const myReservation = {
    /**
     * 고객 본인의 예약 내역 조회
     * @returns {Promise<Array>} 예약 목록
     */
    getMyReservations: async () => {
        const res = await axiosClient.get('/api/reservations/my');
        return res.data;
    },
};