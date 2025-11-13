//채팅 마지막 메시지 길이 제어 함수
export function truncateByVisualLength(str, maxLength) {
  str = str ?? ''; // null, undefined이면 ''으로 대체

  let visualLen = 0; // 화면상 누적 폭
  let result = ''; // 잘라낸 문자열 결과

  for (const ch of str) {
    // 한글, 한자, 일본어 폭 2로 계산, 나머지 폭 1로 계산
    visualLen += /[ㄱ-ㅎ가-힣\u3131-\uD79D\u4E00-\u9FFF]/.test(ch) ? 2 : 1;

    //폭 기준으로 초과한 시점
    if (visualLen > maxLength) {
      result += '…';
      break;
    }

    result += ch;
  }

  return result;
}
