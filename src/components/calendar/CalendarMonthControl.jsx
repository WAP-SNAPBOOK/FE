import * as S from './Calendar.style';

export default function CalendarMonthControl({ currentMonth, onPrev, onNext }) {
  return (
    <S.MonthControl>
      <S.MonthButton onClick={onPrev}>‹</S.MonthButton>
      <S.MonthText>{currentMonth.format('YYYY. MM')}</S.MonthText>
      <S.MonthButton onClick={onNext}>›</S.MonthButton>
    </S.MonthControl>
  );
}
