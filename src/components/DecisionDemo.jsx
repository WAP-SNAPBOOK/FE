import React from "react";
import DecisionCard from "./DecisionCard";

export default function DecisionDemo() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(313px, 1fr))", alignItems: "start", }}>
      <DecisionCard
        variant="approved"
        customerName="김와플"
        dateText="25.11.26 (수)"
        timeText="18:30"
      />
      <DecisionCard
        variant="rejected"
        customerName="김와플"
        dateText="25.11.26 (수)"
        timeText="18:30"
      />
    </div>
  );
}
