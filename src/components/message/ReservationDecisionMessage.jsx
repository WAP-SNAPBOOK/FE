import React, { useState } from 'react';
import * as S from './ReservationDecisionMessage.style';
import { useConfirmReservation, useRejectReservation } from '../../query/reservationQueries';

export default function ReservationDecisionMessage({ reservation }) {
  const [open, setOpen] = useState(false); //상세보기 기준 상태

  if (!reservation) return null;

  const { id, name, date, time, info } = reservation;
  const { mutate: confirm, isLoading: isConfirming } = useConfirmReservation();
  const { mutate: reject, isLoading: isRejecting } = useRejectReservation();

  return (
    <S.Card>
      <S.Title>{name}</S.Title>

      <S.InfoRow>
        <S.Label>예약 날짜</S.Label>
        <S.Value highlight>{date}</S.Value>
      </S.InfoRow>
      <S.InfoRow>
        <S.Label>예약 시간</S.Label>
        <S.Value highlight>{time}</S.Value>
      </S.InfoRow>

      <S.Divider />

      <S.Toggle onClick={() => setOpen((v) => !v)}>
        상세 보기
        <span>{open ? '▲' : '▼'}</span>
      </S.Toggle>

      {open && (
        <>
          <S.DetailSection>
            <S.DetailRow>
              <S.DetailLabel>손/발</S.DetailLabel>
              <S.OptionGroup>
                <S.Option active={info.part === '손'}>손</S.Option>
                <S.Option active={info.part === '발'}>발</S.Option>
              </S.OptionGroup>
            </S.DetailRow>
            <S.DetailRow>
              <S.Label>제거</S.Label>
              <S.OptionGroup>
                <S.Option active={info.removal === '예'}>유</S.Option>
                <S.Option active={info.removal === '아니오'}>무</S.Option>
              </S.OptionGroup>
            </S.DetailRow>
            <S.DetailRow>
              <S.Label>연장</S.Label>
              <S.DetailValues>
                <S.Chip>{info.extendCount}개</S.Chip>
              </S.DetailValues>
            </S.DetailRow>
            <S.DetailRow>
              <S.Label>랩핑</S.Label>
              <S.DetailValues>
                <S.Chip>{info.wrappingCount}개</S.Chip>
              </S.DetailValues>
            </S.DetailRow>

            {info.photoUrls?.length > 0 && (
              <>
                <S.Label>사진</S.Label>
                <S.PhotoGrid>
                  {info.photoUrls.map((url, i) => (
                    <S.Photo key={i} src={url} />
                  ))}
                </S.PhotoGrid>
              </>
            )}

            <S.Label>요구사항</S.Label>
            <S.RequestBox>{info.requests || '없음'}</S.RequestBox>
          </S.DetailSection>
        </>
      )}

      <S.Actions>
        <S.RejectButton onClick={() => reject({ id, reason: '' })}>거절</S.RejectButton>
        <S.ApproveButton onClick={() => confirm({ id, message: '확인했습니다.' })}>
          수락
        </S.ApproveButton>
      </S.Actions>
    </S.Card>
  );
}
