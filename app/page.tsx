"use client";

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "duplicate"
  >("idle");
  const [isSampleOpen, setIsSampleOpen] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const { error } = await supabase.from("subscribers").insert({ email });

      if (error) {
        if (error.code === "23505") {
          setStatus("duplicate");
          return;
        }
        throw error;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* 1. Header / Nav */}
      <header className="border-b-2 border-black p-4 flex justify-between items-center sticky top-0 bg-white z-50">
        <div className="flex items-center gap-6">
          <h1 className="font-bold text-xl tracking-tighter uppercase">
            Morning News
          </h1>
          <Link
            href="/archive"
            className="text-sm font-mono hover:underline underline-offset-4"
          >
            [Tin cũ]
          </Link>
        </div>
        <span className="text-xs font-mono border border-black px-2 py-1 rounded-full bg-neutral-100 font-bold">
          BETA
        </span>
      </header>

      <main className="max-w-3xl mx-auto px-6">
        {/* 2. Hero Section: Tuyên ngôn */}
        <section className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8 tracking-tight">
            Sáng nay, <br />
            Điều làm hỏng tâm trạng của bạn <br />
            Không phải là bạn.
          </h2>
          <p className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-10 text-neutral-800">
            Tin tức giật gân kích thích tiết cortisol trong não, phá hỏng cả ngày của bạn.{" "}
            <br className="hidden md:block" />
            Chúng tôi loại bỏ 'Dopamine' và 'Nỗi sợ hãi', chỉ giữ lại{" "}
            <strong>Bối cảnh cấu trúc (Context)</strong>.
          </p>

          {/* Khu vực Micro Copy */}
          <div className="flex flex-col items-center gap-4">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input
              type="email"
              placeholder="Địa chỉ email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-black p-3 focus:outline-none focus:ring-4 focus:ring-neutral-200 transition-all placeholder:text-neutral-400 font-mono text-sm"
              required
            />

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="flex-1 bg-black text-white px-6 py-3 font-bold hover:bg-neutral-800 disabled:bg-neutral-500 transition-colors border-2 border-black whitespace-nowrap disabled:cursor-not-allowed"
              >
                {status === "loading"
                  ? "Đang xử lý..."
                  : status === "success"
                  ? "Đã hoàn tất"
                  : "Nhận miễn phí"}
              </button>

              <button
                type="button"
                onClick={() => setIsSampleOpen(true)}
                className="px-6 py-3 font-bold bg-white text-black border-2 border-black hover:bg-neutral-100 transition-colors whitespace-nowrap"
              >
                Xem mẫu
              </button>
            </div>

            {/* Khu vực Micro Copy */}
            <div className="mt-2">
              <p className="text-xs text-neutral-500 font-mono flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Gửi lúc 7 giờ 30 phút sáng mỗi ngày. Không quảng cáo. Hủy bất cứ lúc nào.
              </p>
            </div>

            {status === "success" && (
              <p className="text-sm font-mono text-green-700 font-bold mt-2">
                ✓ Đăng ký thành công. Hẹn gặp lại vào sáng mai.
              </p>
            )}
            {status === "duplicate" && (
              <p className="text-sm font-mono text-orange-600 mt-2">
                ⚠️ Email này đã được đăng ký.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm font-mono text-red-600 mt-2">
                ✕ Đã xảy ra lỗi. Vui lòng thử lại.
              </p>
            )}
          </form>
          </div>
        </section>

        <hr className="border-black" />

        {/* 3. Authority: Thẩm quyền và Căn cứ */}
        <section className="py-20">
          <blockquote className="text-2xl md:text-3xl font-serif italic mb-6">
            "Tin tức là đường của tâm trí.
            <br />
            Giống như bạn không nạp đồ ăn vặt vào cơ thể,
            <br />
            Đừng nạp tin tức độc hại vào não."
          </blockquote>
          <cite className="not-italic text-sm font-bold uppercase tracking-widest">
            — Rolf Dobelli, &lt;News Diet&gt;
          </cite>
        </section>

        <hr className="border-black" />

        {/* 4. Comparison: Trước & Sau (Quan trọng nhất) */}
        <section className="py-20">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-10 text-neutral-500">
            Cách hoạt động
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Bad Case */}
            <div className="border border-neutral-300 p-6 opacity-50 bg-neutral-50">
              <span className="text-xs font-bold text-red-600 uppercase mb-2 block">
                Trước (Tiếng ồn)
              </span>
              <h4 className="text-xl font-bold mb-3 text-neutral-400 line-through decoration-red-500">
                [Sốc] Chính sách OO cuối cùng cũng sụp đổ... Người dân "bùng nổ giận dữ"
              </h4>
              <p className="text-sm text-neutral-400">
                Phản ứng dữ dội đang đổ về. Cư dân mạng không ngừng chỉ trích rằng "đây là hành động vô lý"...
              </p>
            </div>

            {/* Good Case */}
            <div className="border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
              <span className="text-xs font-bold text-green-700 uppercase mb-2 block">
                Sau (Bối cảnh)
              </span>
              <h4 className="text-xl font-bold mb-3">
                Công bố thay đổi chính sách OO và phân tích tác động kinh tế
              </h4>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li>
                  <strong>Sự kiện:</strong> Nội dung cốt lõi của đề xuất thay đổi chính sách là A và B.
                </li>
                <li>
                  <strong>Bối cảnh:</strong> Sự thay đổi lần này là biện pháp đối phó với sự sụt giảm chỉ số tháng trước.
                </li>
                <li>
                  <strong>Hàm ý:</strong> Dự kiến sẽ có biến động ngắn hạn đối với nợ hộ gia đình.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="border-black" />

        {/* 5. Features: Mô tả tính năng (Giảm thiểu nhắc đến AI) */}
        <section className="py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-2">① Noise Filtering</h4>
            <p className="text-sm text-neutral-600">
              Ngay lập tức chặn các tiêu đề câu view, ngôn từ kích động thù địch và các tính từ không cần thiết bằng thuật toán.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">② Context Synthesis</h4>
            <p className="text-sm text-neutral-600">
              Tổng hợp các bài xã luận thiên kiến, chỉ trích xuất{" "}
              <strong>'vấn đề cấu trúc'</strong> ẩn sau logic phe phái.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">③ Daily 7:30 AM</h4>
            <p className="text-sm text-neutral-600">
              Nắm bắt dòng chảy Việt Nam và thế giới chỉ trong 3 phút trên đường đi làm mà không tốn cảm xúc.
            </p>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <footer className="border-t-2 border-black py-10 text-center">
        <p className="text-sm font-mono text-neutral-500 mb-4">
          Noise Off, Context On.
        </p>
        <p className="text-xs text-neutral-400">
          © 2026 Morning News. All rights reserved.
        </p>
      </footer>

      {/* Sample Modal */}
      {isSampleOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsSampleOpen(false)}
        >
          <div
            className="bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto border-2 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsSampleOpen(false)}
              className="absolute top-4 right-4 text-2xl font-bold hover:text-neutral-500"
            >
              ×
            </button>

            <div className="text-center mb-8 border-b-2 border-black pb-4">
              <span className="text-xs font-mono bg-black text-white px-2 py-1 mb-2 inline-block">
                EMAIL MẪU
              </span>
              <h2 className="text-2xl font-bold">Morning News</h2>
              <p className="text-xs text-neutral-400 mt-1">
                Tắt tiếng ồn thế giới, chỉ giữ lại bối cảnh cấu trúc
              </p>
              <p className="text-sm text-neutral-500 mt-2">2025-12-27</p>
            </div>

            <div className="space-y-8 font-sans">
              {/* Protection Log */}
              <div className="bg-neutral-100 p-4 border-l-4 border-green-500">
                <p className="text-sm font-bold text-green-700">
                  🛡️ Hôm nay AI đã quét tổng cộng 1,247 tin, chặn 45 tin tội phạm, 89 tin đồn nhảm,
                  123 tin phỉ báng chính trị.
                </p>
              </div>

              {/* Phần Kinh tế */}
              <div>
                <h3 className="text-lg font-bold border-b-2 border-neutral-200 pb-2 mb-4">
                  📌 Kinh tế
                </h3>
                <div className="bg-neutral-50 p-4 rounded border-l-4 border-neutral-600">
                  <p className="text-xs text-neutral-400 line-through mb-2">
                    Khủng hoảng tỷ giá 1500 won, đô la cạn kiệt nhưng chính phủ lại rải tiền... Lo ngại tăng trưởng thấp kéo dài
                  </p>
                  <h4 className="text-base font-bold mb-3">
                    Tỷ giá Won/USD ghi nhận mức 1480 won, ảnh hưởng đến giá nhập khẩu tăng
                  </h4>
                  <div className="bg-white p-3 text-sm space-y-2 border border-neutral-200">
                    <p>
                      <span className="font-bold text-blue-600">📍 Sự kiện:</span>{" "}
                      Tỷ giá Won/USD ghi nhận mức cao nhất trong 8 tháng là 1483.6 won vào tháng 12 năm 2025, làm tăng chỉ số giá nhập khẩu bao gồm nguyên liệu thô và giá tiêu dùng.
                    </p>
                    <p>
                      <span className="font-bold text-yellow-600">
                        📍 Bối cảnh:
                      </span>{" "}
                      Tình trạng cung tiền Won trong nước nhiều và dòng vốn USD vào thiếu hụt được chỉ ra là nguyên nhân chính khiến đồng Won suy yếu, và đồng Won đang cho thấy mức giảm giá lớn nhất trong số các loại tiền tệ chính.
                    </p>
                    <p>
                      <span className="font-bold text-green-600">
                        📍 Hàm ý:
                      </span>{" "}
                      Tỷ giá hối đoái cao kéo dài sẽ gây áp lực tăng giá, gia tăng gánh nặng cho hộ gia đình và có thể ảnh hưởng tiêu cực đến tốc độ tăng trưởng kinh tế.
                    </p>
                  </div>
                </div>
              </div>

              {/* Phần Công nghệ */}
              <div>
                <h3 className="text-lg font-bold border-b-2 border-neutral-200 pb-2 mb-4">
                  📌 Công nghệ
                </h3>
                <div className="bg-neutral-50 p-4 rounded border-l-4 border-neutral-600">
                  <p className="text-xs text-neutral-400 line-through mb-2">
                    "Không còn đi vay mượn nữa"... Samsung tuyên bố 'độc lập công nghệ' phát triển GPU riêng
                  </p>
                  <h4 className="text-base font-bold mb-3">
                    Samsung Electronics thành công phát triển GPU di động 100% công nghệ độc quyền
                  </h4>
                  <div className="bg-white p-3 text-sm space-y-2 border border-neutral-200">
                    <p>
                      <span className="font-bold text-blue-600">📍 Sự kiện:</span>{" "}
                      Samsung Electronics đã giới thiệu GPU di động được phát triển bằng 100% công nghệ độc quyền mà không phụ thuộc vào công nghệ bên ngoài, và dự kiến sẽ được trang bị cho các sản phẩm Exynos tiếp theo.
                    </p>
                    <p>
                      <span className="font-bold text-yellow-600">
                        📍 Bối cảnh:
                      </span>{" "}
                      Trước đây, GPU được thiết kế dựa trên công nghệ của AMD Mỹ, nhưng với thành công trong việc phát triển GPU riêng lần này, họ muốn giảm sự phụ thuộc vào sở hữu trí tuệ bên ngoài và tiết kiệm chi phí bản quyền khổng lồ.
                    </p>
                    <p>
                      <span className="font-bold text-green-600">
                        📍 Hàm ý:
                      </span>{" "}
                      Việc phát triển GPU riêng sẽ củng cố khả năng cạnh tranh của Samsung Electronics trong lĩnh vực bán dẫn hệ thống và trở thành bước ngoặt quan trọng để đảm bảo sự độc lập về công nghệ trong kỷ nguyên AI.
                    </p>
                  </div>
                </div>
              </div>

              {/* Phân tích xã luận */}
              <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 rounded-lg border border-neutral-200">                <h3 className="text-lg font-bold mb-2">⚖️ Phân tích xã luận hôm nay</h3>
                <p className="font-semibold text-neutral-700 mb-3">
                  Tranh luận về việc áp dụng chế độ làm việc 35 giờ/tuần
                </p>

                <div className="bg-white p-3 rounded mb-3 border border-neutral-200">
                  <p className="text-sm text-neutral-700">
                    <span className="font-bold text-red-600">
                      🔴 Vấn đề cốt lõi:
                    </span>{" "}
                    Nâng cao chất lượng cuộc sống người lao động vs Lo ngại giảm sức cạnh tranh của doanh nghiệp. Hai bên đang đối đầu gay gắt về tính cấp thiết và phương pháp rút ngắn thời gian làm việc.
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="bg-red-50 p-3 rounded text-neutral-700">
                    <span className="font-bold text-red-700 block mb-1">
                      Logic phe bảo thủ
                    </span>
                    Năng suất lao động của Hàn Quốc thấp hơn mức trung bình của OECD. Trong tình hình này, việc đơn phương rút ngắn thời gian làm việc có thể dẫn đến suy yếu sức cạnh tranh của doanh nghiệp, và cuối cùng có thể gây ra tác dụng ngược là giảm việc làm.
                  </div>
                  <div className="bg-blue-50 p-3 rounded text-neutral-700">
                    <span className="font-bold text-blue-700 block mb-1">
                      Logic phe tiến bộ
                    </span>
                    Làm việc nhiều giờ xâm phạm quyền sức khỏe của người lao động và làm giảm chất lượng cuộc sống. Rút ngắn thời gian làm việc là cần thiết để bảo vệ các quyền cơ bản của người lao động, và thậm chí có thể góp phần tăng năng suất trong dài hạn thông qua việc cải thiện sự tập trung và giảm tỷ lệ nghỉ việc.
                  </div>
                  <div className="bg-neutral-200 p-3 rounded font-medium text-neutral-800">
                    💡 Ý nghĩa cấu trúc: Cuộc tranh luận này không chỉ là vấn đề thời gian làm việc đơn thuần, mà là câu hỏi căn bản về mô hình tăng trưởng và giá trị cuộc sống mà xã hội Hàn Quốc theo đuổi.
                  </div>
                </div>
              </div>

              <div className="text-center mt-8 pt-4 border-t border-neutral-200">
                <button
                  onClick={() => setIsSampleOpen(false)}
                  className="bg-black text-white px-8 py-3 font-bold hover:bg-neutral-800"
                >
                  Tôi muốn nhận tin tức như thế này
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
