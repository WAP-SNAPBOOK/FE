import { useQuery, useMutation } from '@tanstack/react-query';
import { reservationService } from '../api/services/reservationService';
import { useAuth } from '../context/AuthContext';

//예약 폼 조회 훅
export const useReservationForm = (shopId, enabled) => {
  return useQuery({
    queryKey: ['reservationForm', shopId],
    queryFn: () => reservationService.getFormConfig(shopId),
    enabled, // 모달이 열릴 때만 실행되도록 제어
  });
};

//예약 생성 훅
export const useCreateReservation = (
  onReservationComplete,
  handleClose,
  formDataRef,
  photoCountRef
) => {
  return useMutation({
    mutationFn: (payload) => reservationService.createReservation(payload),
    onSuccess: () => {
      alert('예약이 완료되었습니다!');

      //예약 완료 메시지 생성
      const current = formDataRef?.current;
      const photoCount = photoCountRef?.current;
      if (current) {
        onReservationComplete?.({
          name: current.basic?.name || '',
          date: current.basic?.date || '',
          time: current.basic?.time || '',
          photoCount: photoCount || 0,
        });
      }

      //모달 닫기까지 훅 내부에서 처리
      handleClose?.();
    },

    onError: (error) => {
      const status = error?.response?.status;
      const code = error?.response?.data?.code;

      // 409 충돌 (이미 예약된 시간)
      if (status === 409 && code === 'TIME_SLOT_ALREADY_BOOKED') {
        alert('해당 시간은 이미 예약되었거나 접수 대기 중입니다.');
        return;
      }

      //기타 오류 처리
      console.error('예약 실패:', error);
      alert('예약 중 오류가 발생했습니다.');
    },
  });
};

//채팅방 내 고객 예약 조회 훅
export const useCustomerChatReservations = (shopId) => {
  const { auth } = useAuth();
  return useQuery({
    queryKey: ['customerChatReservations', shopId, auth?.userId],
    queryFn: () => reservationService.getCustomerChatReservations(shopId),
    enabled: !!shopId && !!auth?.userId, // shopId 있을 때만 요청
  });
};
