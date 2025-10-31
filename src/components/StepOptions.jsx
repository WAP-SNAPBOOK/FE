import React from "react";
import OptionRow from "./OptionRow";

export default function StepOptions({
	removeYn,
	setRemoveYn,
	handFootYn,
	setHandFootYn,
	extYn,
	setExtYn,
	extCount,
	setExtCount,
	wrapYn,
	setWrapYn,
	wrapCount,
	setWrapCount,
	onNext,
}) {
	const handleChangeExtYn = (v) => {
		setExtYn(v);
		if (v === "무") setExtCount("");
	};
		const handleChangeWrapYn = (v) => {
		setWrapYn(v);
		if (v === "무") setWrapCount("");
	};
	
	
	return (
			<>
				<OptionRow label="제거 유무" name="removeYn" value={removeYn} onChange={setRemoveYn} />
				<OptionRow label="손 / 발" name="handFootYn" value={handFootYn} onChange={setHandFootYn} />
				<OptionRow
					label="연장"
					name="extYn"
					value={extYn}
					onChange={handleChangeExtYn}
					showCount
					countValue={extCount}
					onCountChange={setExtCount}
				/>
				<OptionRow
					label="래핑"
					name="wrapYn"
					value={wrapYn}
					onChange={handleChangeWrapYn}
					showCount
					countValue={wrapCount}
					onCountChange={setWrapCount}
				/>
				
				
				<form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="submitRow">
					<button type="submit" className="submitBtn">다음</button>
				</form>
			</>
	);
}