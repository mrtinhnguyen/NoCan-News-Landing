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

      <main className="max-w-4xl mx-auto px-6">
        {/* 2. Hero Section: Tuyên ngôn */}
        <section className="relative z-10 w-full max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8 tracking-tight">
            Sáng nay, <br />
            Điều làm hỏng tâm trạng của bạn <br />
            Không phải là bạn.
          </h2>
          <p className="text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto mb-10 text-neutral-800">
            Tin tức giật gân kích thích tiết cortisol trong não, phá hỏng cả ngày của bạn.{" "}
            <br className="hidden md:block" />
            Chúng tôi loại bỏ 'Dopamine' và 'Nỗi sợ hãi', chỉ giữ lại{" "}
            <strong>Bối cảnh cấu trúc (Context)</strong>.
          </p>

          {/* Khu vực Form đăng ký mới */}
          <div className="w-full max-w-4xl mx-auto mt-12">
            <form onSubmit={handleSubscribe} className="flex flex-col gap-6 w-full">
              {/* Row 1: Input & Subscribe Button */}
              <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full">
                <input
                  type="email"
                  placeholder="Địa chỉ email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="grow h-16 border-2 border-black px-6 text-lg focus:outline-none focus:ring-4 focus:ring-neutral-200 transition-all placeholder:text-neutral-400 font-mono min-w-0"
                  required
                />
                
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="h-16 px-8 bg-black text-white text-lg font-bold border-2 border-black hover:bg-neutral-800 disabled:bg-neutral-500 transition-colors whitespace-nowrap min-w-[200px] shrink-0"
                >
                  {status === "loading"
                    ? "..."
                    : status === "success"
                    ? "✓ Đã gửi"
                    : "Nhận miễn phí"}
                </button>
              </div>

              {/* Row 2: Sample Button & Info Text */}
              <div className="flex flex-row items-center gap-6">
                <button
                  type="button"
                  onClick={() => setIsSampleOpen(true)}
                  className="h-14 px-6 bg-white text-black text-base font-bold border-2 border-black hover:bg-neutral-100 transition-colors whitespace-nowrap"
                >
                  Xem mẫu
                </button>

                <p className="text-xs font-mono text-neutral-500 leading-relaxed pl-4 border-l-2 border-neutral-200">
                  Gửi lúc 7:30 sáng mỗi ngày.
                  <br />
                  Không quảng cáo. Hủy bất cứ lúc nào.
                </p>
              </div>
            </form>

            {/* Status Messages */}
            <div className="mt-4 text-left">
              {status === "success" && (
                <p className="text-sm font-mono text-green-700 font-bold">
                  ✓ Đăng ký thành công. Hẹn gặp lại vào sáng mai.
                </p>
              )}
              {status === "duplicate" && (
                <p className="text-sm font-mono text-orange-600">
                  ⚠️ Email này đã được đăng ký.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-mono text-red-600">
                  ✕ Đã xảy ra lỗi. Vui lòng thử lại.
                </p>
              )}
            </div>
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
                  🛡️ Hôm nay AI đã quét tổng cộng 1,542 tin, chặn 68 tin lừa đảo tài chính, 120 tin đồn thất thiệt,
                  215 tin giật gân câu view.
                </p>
              </div>

              {/* Phần Kinh tế */}
              <div>
                <h3 className="text-lg font-bold border-b-2 border-neutral-200 pb-2 mb-4">
                  📌 Kinh tế
                </h3>
                <div className="bg-neutral-50 p-4 rounded border-l-4 border-neutral-600">
                  <p className="text-xs text-neutral-400 line-through mb-2">
                    "Đô la chợ đen loạn giá, Ngân hàng Nhà nước sắp phá giá tiền đồng? Dân buôn gom hàng tích trữ..."
                  </p>
                  <h4 className="text-base font-bold mb-3">
                    Tỷ giá USD/VND biến động mạnh, Ngân hàng Nhà nước linh hoạt điều hành
                  </h4>
                  <div className="bg-white p-3 text-sm space-y-2 border border-neutral-200">
                    <p>
                      <span className="font-bold text-blue-600">📍 Sự kiện:</span>{" "}
                      Tỷ giá bán ra tại các NHTM vượt mốc 25.400 VND/USD, mức cao nhất từ đầu năm, trong khi tỷ giá trung tâm tiếp tục được điều chỉnh tăng.
                    </p>
                    <p>
                      <span className="font-bold text-yellow-600">
                        📍 Bối cảnh:
                      </span>{" "}
                      Chỉ số DXY tăng mạnh trên thị trường quốc tế do Fed duy trì lãi suất cao, cộng hưởng với nhu cầu thanh toán ngoại tệ nhập khẩu nguyên liệu cuối năm tăng cao.
                    </p>
                    <p>
                      <span className="font-bold text-green-600">
                        📍 Hàm ý:
                      </span>{" "}
                      Tỷ giá tăng gây áp lực lên chi phí đầu vào của doanh nghiệp sản xuất và chỉ số CPI, buộc NHNN phải cân nhắc các công cụ thị trường mở và bán ngoại tệ để ổn định thị trường.
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
                    "Lộ diện siêu chip AI của Việt Nam đánh bại Nvidia? Sự thật gây sốc về công nghệ lõi..."
                  </p>
                  <h4 className="text-base font-bold mb-3">
                    Việt Nam chính thức thương mại hóa 5G, mở đường cho kinh tế số
                  </h4>
                  <div className="bg-white p-3 text-sm space-y-2 border border-neutral-200">
                    <p>
                      <span className="font-bold text-blue-600">📍 Sự kiện:</span>{" "}
                      Các nhà mạng lớn đồng loạt cung cấp dịch vụ 5G thương mại tại các thành phố lớn với tốc độ truy cập trung bình gấp 10 lần so với 4G.
                    </p>
                    <p>
                      <span className="font-bold text-yellow-600">
                        📍 Bối cảnh:
                      </span>{" "}
                      Chiến lược chuyển đổi số quốc gia đặt mục tiêu phổ cập hạ tầng số, cùng với nhu cầu kết nối IoT cho nhà máy thông minh và xe tự lái đang tăng trưởng mạnh tại Việt Nam.
                    </p>
                    <p>
                      <span className="font-bold text-green-600">
                        📍 Hàm ý:
                      </span>{" "}
                      Tạo hạ tầng thiết yếu cho phát triển công nghiệp 4.0 và ứng dụng AI, tuy nhiên thách thức nằm ở giá thành thiết bị đầu cuối và độ phủ sóng rộng khắp ngoài các đô thị lớn.
                    </p>
                  </div>
                </div>
              </div>

              {/* Phân tích xã luận */}
              <div className="bg-linear-to-br from-neutral-50 to-neutral-100 p-4 rounded-lg border border-neutral-200">                <h3 className="text-lg font-bold mb-2">⚖️ Phân tích xã luận hôm nay</h3>
                <p className="font-semibold text-neutral-700 mb-3">
                  Tranh luận về quy định nồng độ cồn "bằng 0"
                </p>

                <div className="bg-white p-3 rounded mb-3 border border-neutral-200">
                  <p className="text-sm text-neutral-700">
                    <span className="font-bold text-red-600">
                      🔴 Vấn đề cốt lõi:
                    </span>{" "}
                    An toàn giao thông tuyệt đối vs Tính thực tiễn và tác động kinh tế. Sự đối đầu giữa quan điểm "Zero Tolerance" và nhu cầu có ngưỡng cho phép.
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="bg-red-50 p-3 rounded text-neutral-700">
                    <span className="font-bold text-red-700 block mb-1">
                      Logic phe ủng hộ (An toàn)
                    </span>
                    Quy định nghiêm ngặt đã giúp giảm rõ rệt số vụ tai nạn giao thông nghiêm trọng liên quan đến rượu bia. Cần duy trì kỷ cương "Đã uống rượu bia thì không lái xe" để thay đổi triệt để thói quen văn hóa nhậu nhẹt gây hại.
                  </div>
                  <div className="bg-blue-50 p-3 rounded text-neutral-700">
                    <span className="font-bold text-blue-700 block mb-1">
                      Logic phe phản biện (Thực tế)
                    </span>
                    Quy định "tuyệt đối" là quá cứng nhắc, không tính đến yếu tố sinh học (cồn nội sinh) và đi ngược lại thông lệ của nhiều nước phát triển (có ngưỡng cho phép). Điều này gây khó khăn không cần thiết cho người dân và ảnh hưởng tiêu cực đến ngành F&B, du lịch.
                  </div>
                  <div className="bg-neutral-200 p-3 rounded font-medium text-neutral-800">
                    💡 Ý nghĩa cấu trúc: Phản ánh tư duy quản lý nhà nước đang chuyển dịch sang mô hình kiểm soát chặt chẽ, đặt sự an toàn công cộng lên hàng đầu, chấp nhận đánh đổi lợi ích kinh tế ngắn hạn của một số ngành dịch vụ.
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
