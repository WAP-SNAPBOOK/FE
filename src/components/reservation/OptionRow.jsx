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
  countPlaceholder = "개수 선택",
}) {
  const [isComposing, setIsComposing] = useState(false);

  // 숫자만 보존
  const sanitize = (s) => String(s ?? "").replace(/\D/g, "");

  // min=1 유지
  const commitSanitized = (raw) => {
    let digits = sanitize(raw);
    if (digits !== "" && Number(digits) < 1) digits = "1";
    onCountChange?.(digits);
  };

  return (
    <div className="row">
      <span className="label">{label}</span>

      <div className="radioGroup">
        <RadioYesNo name={name} value={value} onChange={onChange} />

        {showCount && value === "유" && (
          <select
            className="countSelect"
            aria-label={`${label} 갯수`}
            value={String(countValue ?? "")}
            onChange={(e) => commitSanitized(e.target.value)}
          >
            <option value="">{countPlaceholder}</option>
            {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
