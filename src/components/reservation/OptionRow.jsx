import React from "react";
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
	return (
			<div className="row">
				<span className="label">{label}</span>
				<div>
					<RadioYesNo name={name} value={value} onChange={onChange} />
					{showCount && value === "유" && (
						<input
						className="field smallField"
						type="number"
						min={1}
						placeholder={countPlaceholder}
						value={countValue}
						onChange={(e) => onCountChange?.(e.target.value)}
						/>
					)}
				</div>
			</div>
	);
}