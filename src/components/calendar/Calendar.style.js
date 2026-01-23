import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const MonthText = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const NavButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: #f5f5f5;
  border-radius: 8px;
`;

export const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
  text-align: center;
`;

export const Weekday = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ $dayIndex }) => {
    if ($dayIndex === 0) return '#FF6A6A'; // SUN
    if ($dayIndex === 6) return '#4A90E2'; // SAT
    return '#999'; // 평일
  }};
`;

export const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

export const DayCell = styled.button`
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${({ $selected }) => ($selected ? '#FF8A8A' : 'transparent')};
  color: ${({ $selected }) => ($selected ? '#fff' : '#333')};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
`;

export const MonthControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8f8f8;
  border-radius: 12px;
  padding: 6px 10px;
`;

export const MonthButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: #fff;
  border-radius: 8px;
  font-size: 16px;
`;
