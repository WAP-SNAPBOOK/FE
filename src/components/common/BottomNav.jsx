import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '../../assets/icons/home-icon.svg';
import UserIcon from '../../assets/icons/user-icon.svg';
import theme from '../../styles/theme';
import { BaseButton } from './Button';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  //바텀 메뉴 내용 배열
  const tabs = [
    { path: '/', label: '홈', icon: HomeIcon },
    { path: '/mypage', label: '마이', icon: UserIcon },
  ];

  return (
    <NavContainer>
      {tabs.map(({ path, label, icon }) => {
        //현재 경로로 현재 활성화된 페이지 구별
        const active = location.pathname === path;
        return (
          <TabButton key={path} $active={active} onClick={() => navigate(path)}>
            <img src={icon} alt={label} />
            <span>{label}</span>
          </TabButton>
        );
      })}
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 132px;
  height: 53px;
  background: white;
  border: 2px solid ${theme.colors.gray.border};
  border-radius: 30px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

export const TabButton = styled(BaseButton).attrs({
  $column: true, // 아이콘 + 텍스트 세로 정렬
  $gap: '2px',
  $padding: '0',
  $radius: '0',
})`
  flex: 1;
  background: transparent;
  color: ${({ $active }) =>
    $active ? theme.colors.black.DEFAULT : theme.colors.gray.dark.DEFAULT};

  img {
    width: 22px;
    height: 22px;
    opacity: ${({ $active }) => ($active ? 1 : 0.5)};
    transition: opacity 0.2s ease;
  }

  span {
    font-size: 12px;
  }
`;
