import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const revalidate = 600; // 10 phút một lần ISR

export default async function ArchiveList() {
  // Lấy dữ liệu từ DB (trừ nội dung HTML, lấy nhẹ nhàng)
  const { data: newsletters } = await supabase
    .from("newsletters")
    .select("id, title, send_date")
    .order("send_date", { ascending: false });

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Header */}
      <header className="border-b-2 border-black p-4 flex justify-between items-center sticky top-0 bg-white z-50">
        <Link href="/" className="font-bold text-xl tracking-tighter uppercase">
          Morning News
        </Link>
        <span className="text-xs font-mono border border-black px-2 py-1 rounded-full bg-neutral-100 font-bold">
          ARCHIVE
        </span>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Past Issues
          </h2>
          <p className="text-lg text-neutral-600 font-medium">
            Tin tức đã qua là tiếng ồn, nhưng <br className="md:hidden" />
            ngữ cảnh đã qua là lịch sử.
          </p>
        </div>

        {/* Khu vực danh sách */}
        <div className="border-t-2 border-black">
          {newsletters?.map((item) => (
            <Link
              key={item.id}
              href={`/archive/${item.id}`}
              className="group block border-b-2 border-black hover:bg-neutral-50 transition-colors"
            >
              <div className="py-6 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                {/* Ngày: Font monospace tạo cảm giác "số tài liệu" */}
                <span className="font-mono text-sm text-neutral-500 shrink-0 w-32 group-hover:text-black transition-colors">
                  {item.send_date}
                </span>

                {/* Tiêu đề: Đậm và lớn */}
                <h3 className="text-xl font-bold group-hover:underline underline-offset-4 decoration-2">
                  {item.title}
                </h3>

                {/* Icon mũi tên (góc phải) */}
                <span className="hidden md:block ml-auto opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xl">
                  →
                </span>
              </div>
            </Link>
          ))}

          {(!newsletters || newsletters.length === 0) && (
            <div className="py-20 text-center text-neutral-400 font-mono">
              Chưa có bản tin nào được phát hành.
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-black py-10 text-center">
        <p className="text-xs text-neutral-400">© 2025 Morning News Archive.</p>
      </footer>
    </div>
  );
}
