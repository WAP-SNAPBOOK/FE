import React, { useState } from "react";
import RadioYesNo from "./RadioYesNo";

export default function OptionRow({
  label,
  name,
  value,
  onChange,
  showCount = false,
  countValue,
  onCountChange,
  countPlaceholder = "갯수 입력",
}) {
  const [isComposing, setIsComposing] = useState(false);

  // 숫자만 보존 (자릿수 제한 원하면 .slice(0, 2) 등 추가)
  const sanitize = (s) => String(s ?? "").replace(/\D/g, "");

  // min=1 동작을 유지하고 싶을 때의 커밋 함수
  const commitSanitized = (raw) => {
    let digits = sanitize(raw);
    if (digits !== "" && Number(digits) < 1) digits = "1";
    onCountChange?.(digits);
  };

  const handleCountChange = (e) => {
    // 한글 조합 중에는 부모 상태를 변경하지 않음(조합 끊김 방지)
    if (e.nativeEvent.isComposing || isComposing) return;
    commitSanitized(e.target.value);
  };

  const handleCompositionStart = () => setIsComposing(true);

  const handleCompositionEnd = (e) => {
    setIsComposing(false);
    commitSanitized(e.target.value); // 조합 종료 시 한 번에 정규화
  };

  return (
    <div className="row">
      <span className="label">{label}</span>

      {/* ✅ CSS(.radioGroup) 적용을 위해 클래스 부여 */}
      <div className="radioGroup">
        <RadioYesNo name={name} value={value} onChange={onChange} />

        {showCount && value === "유" && (
          <input
            className="field smallField"
            type="tel"               // 숫자 키패드 유도 (모바일)
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder={countPlaceholder}
            value={countValue ?? ""}
            onChange={handleCountChange}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            aria-label={`${label} 갯수`}
          />
        )}
      </div>
    </div>
  );
}