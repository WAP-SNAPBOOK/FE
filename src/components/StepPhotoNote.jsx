import React, { useEffect, useMemo, useState } from "react";

export default function StepPhotoNote({ files, setFiles, notes, setNotes, onSubmit }) {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    // 생성된 URL 정리용 클린업 포함
    const urls = files.map((f) => ({ url: URL.createObjectURL(f), name: f.name }));
    setPreviews(urls);
    return () => urls.forEach((p) => URL.revokeObjectURL(p.url));
  }, [files]);

  const onFileChange = (e) => {
    const list = Array.from(e.target.files ?? []);
    if (list.length === 0) return;
    // 기존 + 신규 병합 (이름/사이즈 기준 중복 제거)
    const merged = [...files, ...list];
    const deduped = [];
    const seen = new Set();
    for (const f of merged) {
      const key = `${f.name}_${f.size}`;
      if (!seen.has(key)) { seen.add(key); deduped.push(f); }
    }
    setFiles(deduped);
    e.target.value = ""; // 같은 파일 다시 선택할 수 있게 리셋
  };

  const removeAt = (idx) => {
    const next = files.filter((_, i) => i !== idx);
    setFiles(next);
  };

  const fileLabelText = useMemo(() => {
    if (!files || files.length === 0) return "사진을 선택해 주세요. 🖼️";
    if (files.length === 1) return files[0].name;
    return `${files.length}개 선택됨`;
  }, [files]);

  return (
      <>
        {/* 파일 선택 */}
        <div className="fieldGroup">
          <label className="label" style={{ marginBottom: 6}}>사진</label>
          <label className="selectControl">
              {fileLabelText}
              <input type="file" accept="image/*" multiple onChange={onFileChange} style={{ display: "none"}} />
          </label>
        </div>

        {/* 미리보기: 가로 스크롤 */}
        {previews.length > 0 && (
          <div className="previewRow">
            <div className="previewList">
              {previews.map((p, idx) => (
                <div className="previewItem" key={`${p.name}_${idx}`}>
                  <img className="previewThumb" src={p.url} alt={`미리보기 ${idx + 1}`} />
                  <button type="button" className="thumbRemove" aria-label="삭제" onClick={() => removeAt(idx)}>×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 요구사항(선택) */}
        <div className="fieldGroup">
          <label className="label">
            요구사항 <span className="muted">(선택)</span>
          </label>
          <textarea
            className="textarea"
            placeholder="요구사항을 입력해 주세요."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="submitRow">
          <button type="submit" className="submitBtn">예약 신청</button>
        </form>
      </>
  );
}
