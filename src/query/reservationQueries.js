import { useQuery, useMutation } from '@tanstack/react-query';
import { reservationService } from '../api/services/reservationService';

//예약 폼 조회 훅
export const useReservationForm = (shopId, enabled) => {
  return useQuery({
    queryKey: ['reservationForm', shopId],
    queryFn: () => reservationService.getFormConfig(shopId),
    enabled, // 모달이 열릴 때만 실행되도록 제어
  });
};

//예약 생성 훅
export const useCreateReservation = () => {
  return useMutation({
    mutationFn: (payload) => reservationService.createReservation(payload),
    onSuccess: (data) => {
      console.log('예약 성공:', data);
      alert('예약이 완료되었습니다!');
    },

    onError: (error) => {
      console.error('예약 실패:', error);
      alert('예약 중 오류가 발생했습니다.');
    },
  });
};
