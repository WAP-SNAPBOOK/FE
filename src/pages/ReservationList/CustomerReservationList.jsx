import React, { useState } from "react";

export default function CustomerReservationList({ reservations }) {
  return (
    <div
      className="bg-white min-h-screen flex flex-col items-center"
      style={{
        fontFamily: "Pretendard",
        paddingTop: "40px",
      }}
    >
      {/* 제목 */}
      <div
        style={{
          width: "341px",
          textAlign: "left",
        }}
      >
        <h1
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#000",
            marginBottom: "20px",
          }}
        >
          예약 내역
        </h1>
      </div>

      {/* 회색 박스 */}
      <div
        style={{
          width: "341px",
          height: "652px",
          backgroundColor: "#F6F6F6",
          padding: "22px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          boxSizing: "border-box",
          overflowY: "auto",
          scrollbarWidth: "thin",
        }}
      >
        {reservations.map((r) => (
          <ReservationCard key={r.id} data={r} />
        ))}
      </div>
    </div>
  );
}

function ReservationCard({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  const STATUS_STYLES = {
    접수중: { bg: "#ababFF", text: "#3131f7", opacity: "0.7" },
    예약확정: { bg: "#E6FFE8", text: "#2ECC71" },
    예약거절: { bg: "#FFE8E8", text: "#FF5A5A" },
  };

  const selectedOptions = data.selectedOptions || {};

  return (
    <div
      style={{
        width: "298px",
        backgroundColor: "#fff",
        borderRadius: "14px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        padding: "17px 26px 26px 17px",
        boxSizing: "border-box",
        transition: "height 0.3s ease",
      }}
    >
      {/* 상단 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={data.shopImageUrl}
            alt={data.shopName}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <h2
            style={{
              fontSize: "15px",
              fontWeight: "600",
              marginLeft: "10px",
            }}
          >
            {data.shopName}
          </h2>
        </div>

        {/* 상태 표시 */}
        <div
          style={{
            backgroundColor: STATUS_STYLES[data.status].bg,
            color: STATUS_STYLES[data.status].text,
            fontSize: "9px",
            fontWeight: "600",
            borderRadius: "5px",
            padding: "4px 7px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            minWidth: "49px",
            justifyContent: "center",
            marginRight: "10px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: STATUS_STYLES[data.status].text,
            }}
          />
          {data.status}
        </div>
      </div>

      {/* 내용 */}
      <div
        style={{
          marginLeft: "46px",
          width: "calc(100% - 56px)",
          fontSize: "13px",
        }}
      >
        <div
          style={{
            height: "1px",
            background: "#eee",
            margin: "10px 0",
          }}
        />

        <div>
          <div className="flex justify-between">
            <span style={{ color: "#A0A0A0" }}>고객명</span>
            <span style={{ fontWeight: 600 }}>{data.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#A0A0A0" }}>예약 날짜</span>
            <span style={{ color: "#FB808A", fontWeight: 600 }}>
              {data.date} ({data.day})
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#A0A0A0" }}>예약 시간</span>
            <span style={{ color: "#FB808A", fontWeight: 600 }}>
              {data.time}
            </span>
          </div>
        </div>

        <div
          style={{
            height: "1px",
            background: "#eee",
            margin: "10px 0",
          }}
        />

        {/* 상세 보기 */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            cursor: "pointer",
            color: "#aaa",
            fontWeight: 600,
            fontSize: "9px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "8px",
          }}
        >
          <span>상세 보기</span>
          <span
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.2s",
            }}
          >
            ▼
          </span>
        </div>

        {/* 상세 내용 */}
        {isOpen && (
          <div
            style={{
              marginTop: "8px",
              fontSize: "9px",
              color: "#444",
              transition: "all 0.3s ease",
            }}
          >
            {/* 손/발, 제거, 연장, 램핑 */}
            {[
              { label: "손/발", options: ["손", "발"], selected: selectedOptions?.hand },
              { label: "제거", options: ["유", "무"], selected: selectedOptions?.remove },
              { label: "연장", options: ["유", "무"], selected: selectedOptions?.extension },
              { label: "램핑", options: ["유", "무"], selected: selectedOptions?.lamping },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "4px",
                }}
              >
                <span style={{ color: "#515151", fontWeight: 500 }}>
                  {item.label}
                </span>
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    justifyContent: "flex-end",
                    width: "80px",
                  }}
                >
                  {item.options.map((option) => {
                    const isSelected =
                      item.selected === option ||
                      (item.label === "손/발" && item.selected === "손발");
                    return (
                      <span
                        key={option}
                        style={{
                          color: isSelected ? "rgba(0,0,0,0.5)" : "#C0C0C0",
                          fontWeight: 400,
                        }}
                      >
                        {option}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* 사진 */}
            {selectedOptions?.photos?.length > 0 && (
              <div style={{ marginBottom: "12px", marginTop: "10px" }}>
                <span
                  style={{
                    color: "#515151",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  사진
                </span>
                <div
                  style={{
                    display: "flex",
                    gap: "6px",
                    overflowX: "auto",
                    marginTop: "6px",
                    paddingBottom: "4px",
                    scrollbarWidth: "thin",
                  }}
                >
                  {selectedOptions.photos.map((url, i) => (
                    <div
                      key={i}
                      style={{
                        flex: "0 0 auto",
                        width: "52px",
                        height: "52px",
                        borderRadius: "10px",
                        background: `url("${url}") center/cover`,
                        border: "1px solid #D3D3D3",
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* 요구사항: 있을 때만 표시 */}
            {selectedOptions?.requestText &&
              selectedOptions.requestText.trim() !== "" && (
                <div style={{ marginTop: "10px" }}>
                  <span
                    style={{
                      color: "#2b2b2b",
                      display: "block",
                      marginBottom: "5px",
                    }}
                  >
                    요구사항
                  </span>
                  <div
                    style={{
                      width: "198px",
                      background: "#fff",
                      border: "1px solid #D3D3D3",
                      borderRadius: "10px",
                      padding: "10px",
                      lineHeight: 1.4,
                      color: "#000000",
                      fontFamily: "Pretendard",
                      fontSize: "9px",
                      whiteSpace: "pre-wrap",
                      boxSizing: "border-box",
                    }}
                  >
                    {selectedOptions.requestText}
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
