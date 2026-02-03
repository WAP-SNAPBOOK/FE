import { createPortal } from 'react-dom';
import * as S from './ImageModal.styles';

export default function ImageModal({ src, onClose }) {
  return createPortal(
    <S.Overlay onClick={onClose}>
      <S.ImageWrapper onClick={(e) => e.stopPropagation()}>
        <S.Image src={src} />
      </S.ImageWrapper>
    </S.Overlay>,
    document.body
  );
}
