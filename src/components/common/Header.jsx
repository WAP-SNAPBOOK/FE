import styled from 'styled-components';
import theme from '../../styles/theme';
import { BaseButton } from '../common/Button';
import SettingIcon from '../../assets/icons/setting-icon.svg';

export default function Header({ title, showSetting = false, onSettingClick }) {
  return (
    <HeaderWrapper>
      <Title>{title}</Title>
      {showSetting && (
        <SettingButton onClick={onSettingClick}>
          <img src={SettingIcon} alt="setting" />
        </SettingButton>
      )}
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 51px;
  padding: 0 21px;
  background-color: ${theme.colors.white};
`;

const Title = styled.h1`
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  color: ${theme.colors.black[90]};
`;

export const SettingButton = styled(BaseButton).attrs({
  $height: '31px',
})`
  width: 31px;
  padding: 0px;
  background-color: transparent;
  color: white;
`;
