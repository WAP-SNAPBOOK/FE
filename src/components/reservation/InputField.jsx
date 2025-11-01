import React from "react";


export default function InputField({ label, placeholder, type = "text", value, onChange }) {
	return (
			<div className="fieldGroup">
				{label && <label className="label">{label}</label>}
				<input
					className="field"
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
			</div>
	);
}