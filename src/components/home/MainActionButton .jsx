import styled from 'styled-components';
import { BaseButton } from '../common/Button';
import theme from '../../styles/theme';

export const MainButton = styled(BaseButton).attrs({
  $height: '176px',
  $width: '176px',
  $gap: '18px',
})`
  background-color: ${theme.colors.mainButtonGray};
  color: ${theme.colors.black.DEFAULT};
  border-radius: ${theme.radius.lg};
  min-width: 150px;
  font-size: 20px;
  font-weight: 600;
`;

/**
 * 메인 액션 버튼 (홈 화면 등에서 사용)
 * @param {string} icon - 아이콘 이미지 경로
 * @param {string} label - 버튼 텍스트
 * @param {function} onClick - 클릭 이벤트
 */
function MainActionButton({ icon, label, onClick }) {
  return (
    <>
      <MainButton $column onClick={onClick}>
        <img src={icon} alt={`${label} icon`} />
        <span>{label}</span>
      </MainButton>
    </>
  );
}

export default MainActionButton;
