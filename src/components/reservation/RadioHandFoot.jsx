import React from "react";


export default function RadioHandFoot({ label, name, value, onChange }) {
    return (
        <div className="row">
			<span className="label">{label}</span>
            <div className="radioGroup">
                <label className="radioLabel">
                    <input type="radio" name={name} checked={value === "손"} onChange={() => onChange("손")} />
                    손
                </label>
                <label className="radioLabel">
                    <input type="radio" name={name} checked={value === "발"} onChange={() => onChange("발")} />
                    발
                </label>
            </div>
        </div>
    );
}