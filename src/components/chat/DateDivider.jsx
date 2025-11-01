import styled from 'styled-components';
import dayjs from 'dayjs';
import theme from '../../styles/theme';
import 'dayjs/locale/ko';
dayjs.locale('ko');

export default function DateDivider({ date }) {
  const formatted = dayjs(date).format('YYYY년 M월 D일 dddd'); // 예: 2025년 11월 18일 금요일
  return (
    <Wrapper>
      <Line />
      <Label>{formatted}</Label>
      <Line />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0;
  color: ${theme.colors.gray.dark.DEFAULT};
  font-size: 13px;
  font-weight: 500;
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background-color: ${theme.colors.gray.border};
  margin: 0 10px;
`;

const Label = styled.span`
  white-space: nowrap;
  color: ${theme.colors.gray.dark.DEFAULT};
`;
