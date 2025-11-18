import styled from 'styled-components';
import theme from '../../styles/theme';

export const MessageRow = styled.div`
  display: flex;
  justify-content: ${({ $isMine }) => ($isMine ? 'flex-end' : 'flex-start')};
  align-items: flex-end;
  gap: 4px;
  margin-bottom: 8px;
`;

export const Bubble = styled.div`
  max-width: 80%;
  align-self: ${({ $isMine }) => ($isMine ? 'flex-end' : 'flex-start')};
  background-color: ${({ $isMine }) =>
    $isMine ? theme.colors.primary : theme.colors.gray.dark[50]};
  color: ${({ $isMine }) => ($isMine ? theme.colors.white : theme.colors.black)};
  padding: 10px 14px;
  border-radius: 16px;
  border-top-right-radius: ${({ $isMine }) => ($isMine ? '4px' : '16px')};
  border-top-left-radius: ${({ $isMine }) => ($isMine ? '16px' : '4px')};
  word-break: break-word;
  font-size: 14px;
`;

export const Time = styled.span`
  font-size: 11px;
  color: ${theme.colors.black[50]};
`;
