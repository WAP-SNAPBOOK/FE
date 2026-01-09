import React, { useState } from 'react';
import * as S from './ReservationRejectForm.style';

export default function ReservationRejectForm({ onReject, isRejecting, rejected }) {
  const [reason, setReason] = useState('');

  return (
    <>
      <S.Textarea
        placeholder="거절 사유를 입력해 주세요."
        value={reason}
        maxLength={200}
        onChange={(e) => setReason(e.target.value)}
      />

      <div className="flex justify-end">
        <S.ConfirmButton
          disabled={isRejecting || rejected}
          $rejected={rejected}
          onClick={() => onReject({ reason })}
        >
          {isRejecting ? '처리 중...' : rejected ? '거절 완료' : '확인'}
        </S.ConfirmButton>
      </div>
    </>
  );
}
