import * as S from './TimeSlot.style';
import { isPastTime } from '@/utils/dateTime';

const TIME_SLOTS = [
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
];

export default function TimeSlots({ date, value, onSelect }) {
  if (!date) {
    return;
  }

  return (
    <S.TimeGrid>
      {TIME_SLOTS
        // 이전 시간은 아예 제거
        .filter((time) => !isPastTime(date, time))
        .map((time) => (
          <S.TimeButton key={time} $selected={value === time} onClick={() => onSelect(time)}>
            {time}
          </S.TimeButton>
        ))}
    </S.TimeGrid>
  );
}
