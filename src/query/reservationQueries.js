import { useQuery } from '@tanstack/react-query';
import { reservationService } from '../api/services/reservationService';

//예약 폼 조회 훅
export const useReservationForm = (shopId, enabled) => {
  return useQuery({
    queryKey: ['reservationForm', shopId],
    queryFn: () => reservationService.getFormConfig(shopId),
    enabled, // 모달이 열릴 때만 실행되도록 제어
  });
};
