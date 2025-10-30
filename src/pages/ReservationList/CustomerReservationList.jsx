import React from "react";

export default function CustomerReservationList({ reservations }) {
  const STATUS_STYLES = {
    접수중: { bg: "#0000FF33", text: "#0000FF" },
    예약확정: { bg: "#00800033", text: "#008000" },
    예약거절: { bg: "#FF000033", text: "#FF0000" },
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      {/* 예약 내역 제목 (회색 박스 바깥) */}
      <h1
        className="font-bold self-start"
        style={{ fontSize: "24px", marginBottom: "20px" }}
      >
        예약 내역
      </h1>

      {/* 회색 박스 */}
      <div
        className="#D3D3D3"
        style={{
          width: "341px",
          height: "652px",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "-110px",
          marginTop: "47px",
        }}
      >
        {/* 카드 리스트: 스크롤 가능, 스크롤바 숨김 */}
        <div className="flex-1 overflow-y-auto scrollbar-hide space-y-5">
          {reservations.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-2xl shadow flex flex-col relative"
              style={{
                width: "298px",
                height: "167px",
                padding: "14px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* 상단: 가게 사진 + 이름 + 상태 */}
              <div
                className="flex items-center justify-between mb-2"
                style={{ marginTop: "0px" }}
              >
                <div className="flex items-center">
                  <img
                    src={r.shopImageUrl}
                    alt={r.shopName}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                    }}
                  />
                  <h2
                    className="font-semibold ml-2"
                    style={{
                      fontSize: "16px",
                      lineHeight: "20px",
                      color: "#000",
                      marginLeft: "17px",
                      marginRight: "27px",
                    }}
                  >
                    {r.shopName}
                  </h2>
                </div>

                {/* 상태 박스 + 작은 원 */}
                <div
                  style={{
                    backgroundColor: STATUS_STYLES[r.status].bg,
                    color: STATUS_STYLES[r.status].text,
                    fontSize: "9px",
                    fontWeight: "600",
                    padding: "2px 6px",
                    borderRadius: "5px",
                    minWidth: "49px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "13px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: STATUS_STYLES[r.status].text,
                      display: "inline-block",
                      marginRight: "4px",
                    }}
                  />
                  {r.status}
                </div>
              </div>

              {/* ✅ 가게 이름 시작선 기준 회색 구분선 */}
              <div
                style={{
                  position: "absolute",
                  left: "73px",
                  top: "61px",
                  right: "27px",
                  borderTop: "0.5px solid #D3D3D3",
                  paddingTop: "5px",
                  pointerEvents: "none",
                }}
              />

              {/* 예약 정보: 가게 이름과 같은 정렬선 기준 */}
              <div
                className="flex flex-col gap-1"
                style={{
                  marginLeft: "57px",
                  paddingTop: "15px",
                  marginRight: "12px",
                }}
              >
                <div
                  className="flex justify-between"
                  style={{ fontSize: "13px", color: "#C0C0C0" }}
                >
                  <span className="font-semibold">고객명</span>
                  <span
                    style={{ color: "#000000", fontWeight: "600" }}
                  >
                    {r.customerName}
                  </span>
                </div>

                <div
                  className="flex justify-between"
                  style={{ fontSize: "13px", color: "#C0C0C0" }}
                >
                  <span className="font-semibold">예약 날짜</span>
                  <span
                    style={{ color: "#F08080", fontWeight: "600" }}
                  >
                    {r.date} ({r.day})
                  </span>
                </div>

                <div
                  className="flex justify-between"
                  style={{ fontSize: "13px", color: "#C0C0C0" }}
                >
                  <span className="font-semibold">예약 시간</span>
                  <span
                    style={{ color: "#F08080", fontWeight: "600" }}
                  >
                    {r.time}
                  </span>
                </div>

                <div
                  className="flex justify-between"
                  style={{
                    fontSize: "13px",
                    color: "#C0C0C0",
                    paddingBottom: "17px",
                  }}
                >
                  <span className="font-semibold">첨부 사진</span>
                  <span
                    style={{ color: "#C0C0C0", fontWeight: "600" }}
                  >
                    {r.floor}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
