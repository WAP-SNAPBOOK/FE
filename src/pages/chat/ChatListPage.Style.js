import styled from 'styled-components';
import { BaseButton } from '../../components/common/Button';
import theme from '../../styles/theme';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: white;
`;

export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid ${theme.colors.gray.DEFAULT};
`;

export const Header = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

export const MenuButton = styled(BaseButton).attrs({
  $height: '24px',
  $padding: '0px',
})`
  width: 24px;
  background: transparent;
`;

export const RoomList = styled.div`
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
`;
