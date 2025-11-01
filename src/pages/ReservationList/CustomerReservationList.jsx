import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerReservationList() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const STATUS_STYLES = {
    접수중: { bg: "bg-blue-100", text: "text-blue-500", dot: "bg-blue-500" },
    예약확정: { bg: "bg-green-100", text: "text-green-600", dot: "bg-green-600" },
    예약거절: { bg: "bg-red-100", text: "text-red-500", dot: "bg-red-500" },
  };

  // 컴포넌트가 렌더링될 때 백엔드에서 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/reservations"); // 🔗 실제 API 주소로 교체
        setReservations(res.data);
      } catch (err) {
        console.error("예약 데이터 불러오기 실패:", err);
        setError("예약 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 로딩 상태
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        데이터를 불러오는 중입니다...
      </div>
    );

  // 에러 상태
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );

  // 데이터 없음
  if (reservations.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        예약 내역이 없습니다.
      </div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen bg-white pt-10">
      {/* 제목 */}
      <h1 className="text-[24px] font-bold mb-[20px] self-start">
        예약 내역
      </h1>

      {/* 회색 박스 */}
      <div
        className="
          bg-[#D3D3D3]
          w-[341px]
          h-[652px]
          overflow-y-auto
          pt-[22px] pb-[22px] px-[21px]
          scrollbar-hide
          mx-auto
          my-[47px]
        "
      >
        <div className="flex flex-col gap-[15px] items-center">
          {reservations.map((r) => (
            <div
              key={r.id}
              className="
                bg-white
                rounded-[15px]
                flex flex-col
                relative
                p-[14px]
                w-[298px]
                h-[167px]
              "
            >
              {/* 상단: 가게 사진 + 이름 + 상태 */}
              <div className="flex justify-between items-center mb-[4px]">
                <div className="flex items-center">
                  <img
                    src={r.shopImageUrl}
                    alt={r.shopName}
                    className="w-[40px] h-[40px] rounded-[8px]"
                  />
                  <h2
                    className="
                      font-semibold
                      ml-[17px]
                      text-[16px]
                      leading-[20px]
                      text-black
                    "
                    style={{ letterSpacing: "-0.3px" }}
                  >
                    {r.shopName}
                  </h2>
                </div>

                {/* 상태 */}
                <div
                  className={`
                    flex items-center justify-center
                    px-[6px] py-[2px]
                    rounded-[5px]
                    text-[9px] font-semibold
                    min-w-[49px]
                    ${STATUS_STYLES[r.status]?.bg || "bg-gray-100"}
                    ${STATUS_STYLES[r.status]?.text || "text-gray-500"}
                    mr-[13px]
                  `}
                >
                  <span
                    className={`
                      w-[8px] h-[8px] rounded-full mr-[4px]
                      ${STATUS_STYLES[r.status]?.dot || "bg-gray-400"}
                    `}
                  ></span>
                  {r.status}
                </div>
              </div>

              {/* 회색 구분선 */}
              <div className="absolute left-[73px] right-[27px] top-[61px] border-t border-[#D3D3D3]" />

              {/* 예약 상세 */}
              <div
                className="flex flex-col gap-[1px] mt-[15px] ml-[52px] mr-[12px]"
                style={{ fontSize: "13px", color: "#C0C0C0", lineHeight: "1.2" }}
              >
                <div className="flex justify-between">
                  <span>고객명</span>
                  <span className="text-black font-semibold">{r.customerName}</span>
                </div>

                <div className="flex justify-between">
                  <span>예약 날짜</span>
                  <span className="text-[#F08080] font-semibold">
                    {r.date} ({r.day})
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>예약 시간</span>
                  <span className="text-[#F08080] font-semibold">{r.time}</span>
                </div>

                <div className="flex justify-between pb-[17px]">
                  <span>첨부 사진</span>
                  <span className="text-[#C0C0C0] font-semibold">{r.floor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
