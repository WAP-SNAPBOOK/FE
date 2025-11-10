import React from "react";
import "./decision-card.css";

export default function DecisionCard({
  variant = "approved",
  title,
  labels = { customer: "고객명", date: "예약 날짜", time: "예약 시간" },
  customerName = "김와플",
  dateText = "25.11.26 (수)",
  timeText = "18:30",
  noteTitle,  // 기본: 전달 사항/거절 사유
  noteText, // 기본 문구는 아래 defaultNote 사용
}) {
  const isApproved = variant === "approved";
  const titleText = title ?? (isApproved ? "예약 확정" : "예약 거절");
  const sectionTitle = noteTitle ?? (isApproved ? "전달 사항" : "거절 사유");

  const defaultNote = isApproved
    ? "안녕하세요 고객님, ○○네일입니다!\n예약해주신 시간은 00월 00일 00시입니다.\n방문시간 5분 전 도착 부탁드리며, 10분 이상 지각 시 시술 내용이 변경되거나 예약이 취소될 수 있어요."
    : "현재 해당 시간은 예약이 모두 마감되었습니다.\n다른 시간으로 안내드려도 괜찮을까요?";

  return (
    <div
      className={`decision-card ${isApproved ? "card--approved" : "card--rejected"}`}
      role="region"
      aria-label={titleText}
    >
      {/* 헤더 */}
      <div className="card-header">
        <div className="status-badge" aria-hidden>
          {isApproved ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )}
        </div>
        <h2 className="card-title">{titleText}</h2>
      </div>

      {/* 정보 */}
      <div>
        <div className="info-row">
          <span className="label">{labels.customer}</span>
          <span className="value">{customerName}</span>
        </div>
        <div className="info-row">
          <span className="label">{labels.date}</span>
          <span className="value accent">{dateText}</span>
        </div>
        <div className="info-row">
          <span className="label">{labels.time}</span>
          <span className="value accent">{timeText}</span>
        </div>
      </div>

      {/* 전달사항/거절사유 */}
      <div className="section">
        <div className="section-title">{sectionTitle}</div>
        <div className="section-body">{noteText ?? defaultNote}</div>
      </div>
    </div>
  );
}
