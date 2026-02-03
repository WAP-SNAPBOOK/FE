import { useState } from 'react';
import ImageModal from '../modal/ImageModal';
import * as S from './ReservationInfoView.style';

export default function ReservationInfoView({ info }) {
  const [activeIndex, setActiveIndex] = useState(null); //모달 활성화 된 사진 index

  return (
    <S.DetailSection>
      <S.DetailRow>
        <S.Label>손/발</S.Label>
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
              //선택 사진 모달 활성화
              <S.Photo key={i} src={url} onClick={() => setActiveIndex(i)} />
            ))}
          </S.PhotoGrid>
          {activeIndex !== null && (
            <ImageModal src={info.photoUrls[activeIndex]} onClose={() => setActiveIndex(null)} />
          )}
        </>
      )}

      <S.Label>요구사항</S.Label>
      <S.RequestBox>{info.requests || '없음'}</S.RequestBox>
    </S.DetailSection>
  );
}
