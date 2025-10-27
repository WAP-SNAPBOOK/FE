import styled from 'styled-components';
import theme from '../../styles/theme';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: white;
`;

export const Header = styled.h2`
  padding: 20px 26px;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 1px solid ${theme.colors.gray.DEFAULT};
`;

export const RoomList = styled.div`
  flex: 1;
  overflow-y: auto;
`;
