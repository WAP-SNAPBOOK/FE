import styled from 'styled-components';
import theme from '../../styles/theme';

export const Container = styled.div`
  display: flex;
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.gray[25]};
  }
`;

export const Avatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: ${theme.colors.highlight[10]};
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InfoWrapper = styled.div`
  flex: 1;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ShopName = styled.span`
  font-weight: 600;
  font-size: 15px;
  color: ${theme.colors.black.DEFAULT};
`;

export const Time = styled.span`
  font-size: 12px;
  color: ${theme.colors.gray.text};
`;

export const LastMessage = styled.span`
  flex: 1;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${theme.colors.gray.text};
`;

export const UnreadBadge = styled.div`
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${theme.colors.highlight.DEFAULT};
  color: white;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;
