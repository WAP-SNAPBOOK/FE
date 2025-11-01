import React from "react";
import InputField from "./InputField";


export default function StepBasic({
	name,
	setName,
	phoneNumber,
	setPhoneNumber,
	date,
	setDate,
	time,
	setTime,
	onNext,
	isValid,
}) {
	return (
			<>
				<label className="label">이름</label>
				<InputField placeholder="이름을 입력해 주세요." value={name} onChange={(e) => setName(e.target.value)} />
				<label className="label">전화번호</label>
				<InputField placeholder="전화번호를 입력해 주세요." value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
				
				<div className="grid2" style={{ marginBottom: 6 }}>
					<label className="label">날짜</label>
					<label className="label">시간</label>
					<input className="field" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
					<input className="field" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
				</div>
				
				
				<form onSubmit={(e) => { e.preventDefault(); isValid && onNext(); }} className="submitRow">
					<button type="submit" className="submitBtn" disabled={!isValid}>
						다음
					</button>
				</form>
			</>
	);
}