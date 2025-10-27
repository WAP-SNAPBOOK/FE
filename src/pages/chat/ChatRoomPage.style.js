import styled from 'styled-components';
import theme from '../../styles/theme';
import { BaseButton } from '../../components/common/Button';
import { BaseInput } from '../../components/common/Input';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: white;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid ${theme.colors.gray.DEFAULT};
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
`;
export const BackButton = styled(BaseButton).attrs({
  $height: '31px',
  $radius: '9999px',
  $padding: '0px',
})`
  width: 62px;
  background: transparent;
`;

export const BookButton = styled(BaseButton).attrs({
  $height: '37px',
  $radius: '12px',
})`
  color: ${theme.colors.white};
  background-color: ${theme.colors.primary};
`;

export const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const InputBar = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${theme.colors.gray.DEFAULT};
  padding: 12px 16px;
  background: white;
`;

export const ChatInput = styled(BaseInput).attrs({
  $radius: '12px',
  $fontSize: '14px',
  $border: `1px solid ${theme.colors.gray.border}`,
  $focusStyle: `border-color: ${theme.colors.highlight.DEFAULT}`,
  $height: '35px',
  $radius: '25px',
  $bg: theme.colors.gray[20],
})`
  flex: 1;
`;

export const ChatIconButton = styled(BaseButton).attrs({
  $height: '31px',
  $radius: '9999px',
})`
  width: 31px;
  padding: 0px;
  background-color: ${theme.colors.primary};
  color: white;
`;

export const AddButton = styled(ChatIconButton)`
  margin-right: 10px;
`;

export const ChatButton = styled(ChatIconButton)`
  margin-left: 10px;
`;
