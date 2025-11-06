import React, { useEffect, useMemo, useState } from "react";

export default function StepPhotoNote({ initialData, onSubmit }) {
  const MAX_FILES = 3;
  const MAX_NOTES = 250;

  const [values, setValues] = useState({ files: [], notes: "" });

  useEffect(() => {
    if (initialData) {
      setValues((v) => ({
        ...v,
        files: Array.isArray(initialData.files) ? initialData.files.slice(0, MAX_FILES) : [],
        notes: String(initialData.notes ?? "").slice(0, MAX_NOTES),
      }));
    }
  }, [initialData]);

  const [previews, setPreviews] = useState([]);
  useEffect(() => {
    const urls = (values.files || []).map((f) => ({
      url: URL.createObjectURL(f),
      name: f.name,
    }));
    setPreviews(urls);
    return () => urls.forEach((p) => URL.revokeObjectURL(p.url));
  }, [values.files]);

  const onFileChange = (e) => {
    const picked = Array.from(e.target.files ?? []);
    if (picked.length === 0) return;

    // 기존 + 신규 병합 후 (name+size) 기준 중복 제거
    const merged = [...(values.files || []), ...picked];
    const deduped = [];
    const seen = new Set();
    for (const f of merged) {
      const key = `${f.name}_${f.size}`;
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push(f);
      }
    }

    // ✅ 최대 3개로 제한 (기존 선택을 우선하여 보존)
    const limited = deduped.slice(0, MAX_FILES);
    setValues((prev) => ({ ...prev, files: limited }));
    e.target.value = "";
  };

  const removeAt = (idx) => {
    setValues((prev) => ({
      ...prev,
      files: (prev.files || []).filter((_, i) => i !== idx),
    }));
  };

  const fileLabelText = useMemo(() => {
    const arr = values.files || [];
    if (arr.length === 0) return "사진을 선택해 주세요. 🖼️";
    if (arr.length === 1) return arr[0].name;
    return `${arr.length}개 선택됨`;
  }, [values.files]);

  // ✅ 요청사항 250자 제한 (붙여넣기 포함)
  const handleNotesChange = (e) => {
    const val = e.target.value.slice(0, MAX_NOTES);
    setValues((prev) => ({ ...prev, notes: val }));
  };

  // 제출
  const submit = (e) => {
    e.preventDefault();
    onSubmit?.(values);
  };

  return (
    <>
      {/* 파일 선택 */}
      <div className="fieldGroup">
        <label className="label" style={{ marginBottom: 6 }}>사진</label>
        <label className="selectControl">
          {fileLabelText}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onFileChange}
            style={{ display: "none" }}
          />
        </label>
        <div className="muted" style={{ marginTop: 6 }}>
          최대 {MAX_FILES}장까지 첨부 가능합니다.
        </div>
      </div>

      {/* 미리보기: 가로 스크롤 */}
      {previews.length > 0 && (
        <div className="previewRow">
          <div className="previewList">
            {previews.map((p, idx) => (
              <div className="previewItem" key={`${p.name}_${idx}`}>
                <img className="previewThumb" src={p.url} alt={`미리보기 ${idx + 1}`} />
                <button
                  type="button"
                  className="thumbRemove"
                  aria-label="삭제"
                  onClick={() => removeAt(idx)}
                >
                  ×
                </button>
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
          value={values.notes}
          onChange={handleNotesChange}
          maxLength={MAX_NOTES}   // UI 단에서도 제한
        />
        <div className="muted" style={{ textAlign: "right" }}>
          {values.notes.length}/{MAX_NOTES}
        </div>
      </div>

      <form onSubmit={submit} className="submitRow">
        <button type="submit" className="submitBtn">예약 신청</button>
      </form>
    </>
  );
}
