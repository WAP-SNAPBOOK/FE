/**
 * 주어진 formFields 배열에서 각 필드 존재 여부를 Boolean으로 매핑해 반환
 * @param {Array} fields - formFields 응답 배열
 * @returns {{
 *   name: boolean,
 *   phone: boolean,
 *   date: boolean,
 *   removal: boolean,
 *   part: boolean,
 *   wrapping: boolean,
 *   photo: boolean,
 *   requests: boolean
 * }}
 */
export function getVisibleFields(fields = []) {
  if (!Array.isArray(fields)) return {};

  //해당 필드id가 있는지 확인
  const has = (id) => fields.some((f) => f.fieldId === id);

  return {
    removal: has('removal'),
    part: has('part'),
    wrapping: has('wrapping'),
    photo: has('photo'),
    requests: has('requests'),
  };
}
