import dayjs from 'dayjs';

/** 오늘(로컬) YYYY-MM-DD */
export function todayYMD() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export const isYMD = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s);
export const isHM = (s) => /^\d{2}:\d{2}$/.test(s);

/** 로컬 타임존으로 안전하게 Date 생성 (문자열 파싱 회피) */
export function buildLocalDate(dateStr, timeStr = '00:00') {
  if (!isYMD(dateStr) || !isHM(timeStr)) return null;
  const [y, m, d] = dateStr.split('-').map(Number);
  const [hh, mm] = timeStr.split(':').map(Number);
  return new Date(y, m - 1, d, hh, mm, 0, 0); // 로컬
}

/** 오늘 이전인지 검사 (분 단위 비교) */
export function isPast(dateStr, timeStr = '00:00') {
  const dt = buildLocalDate(dateStr, timeStr);
  if (!dt) return true;
  const now = new Date();
  // 초/밀리초 차이로 인한 경계 이슈 방지
  now.setSeconds(0, 0);
  return dt.getTime() < now.getTime();
}

/** 예약 일시 유효성: 형식 OK + 과거 아님 */
export function validateReservationDateTime(dateStr, timeStr) {
  if (!isYMD(dateStr) || !isHM(timeStr)) {
    return { valid: false, reason: 'format' };
  }
  if (isPast(dateStr, timeStr)) {
    return { valid: false, reason: 'past' };
  }
  return { valid: true, reason: null };
}

/**
 * 선택한 날짜/시간이 현재 시각보다 과거인지 여부
 * @param {string} date - YYYY-MM-DD
 * @param {string} time - HH:mm
 */
export function isPastTime(date, time) {
  if (!date || !time) return true;

  const selected = dayjs(`${date} ${time}`);
  const nowPlus30 = dayjs().add(30, 'minute');

  return selected.isBefore(nowPlus30); //선
}

const WEEKDAY_KR = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * YYYY-MM-DD → "1월 8일 (수)"
 */
export function formatKoreanDate(date) {
  if (!date) return '';

  const d = dayjs(date);
  const month = d.month() + 1; // 0-based
  const day = d.date();
  const weekday = WEEKDAY_KR[d.day()];

  return `${month}월 ${day}일 (${weekday})`;
}
