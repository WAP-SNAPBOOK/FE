import React from "react";


export default function RadioYesNo({ name, value, onChange }) {
	return (
			<div className="radioGroup">
				<label className="radioLabel">
					<input type="radio" name={name} checked={value === "유"} onChange={() => onChange("유")} />
					유
				</label>
				<label className="radioLabel">
					<input type="radio" name={name} checked={value === "무"} onChange={() => onChange("무")} />
					무
				</label>
			</div>
	);
}