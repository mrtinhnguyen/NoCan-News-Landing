import NewsletterIframe from "@/components/NewsletterIframe";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ArchiveDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: newsletter } = await supabase
    .from("newsletters")
    .select("*")
    .eq("id", id)
    .single();

  if (!newsletter) return notFound();

  return (
    <div className="min-h-screen bg-neutral-50 text-black font-sans">
      {/* Header: Bao gồm chức năng quay lại */}
      <header className="border-b-2 border-black p-4 flex justify-between items-center sticky top-0 bg-white z-50">
        <Link href="/archive" className="font-mono text-sm hover:underline">
          ← BACK TO LIST
        </Link>
        <span className="text-xs font-mono font-bold">
          {newsletter.send_date}
        </span>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 md:py-16">
        {/* Khu vực tiêu đề */}
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-4xl font-black mb-2 tracking-tight">
            {newsletter.title}
          </h1>
          <p className="text-neutral-500 font-mono text-xs md:text-sm">
            Morning News Archived Issue
          </p>
        </div>

        {/* Container trình xem bản tin */}
        <div className="bg-white border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          {/* Cảm giác thanh cửa sổ trên cùng */}
          <div className="border-b-2 border-black p-2 bg-neutral-100 flex gap-2">
            <div className="w-3 h-3 rounded-full border border-black bg-white"></div>
            <div className="w-3 h-3 rounded-full border border-black bg-white"></div>
          </div>

          {/* Nội dung thực tế */}
          <NewsletterIframe htmlContent={newsletter.content_html} />
        </div>

        {/* CTA phía dưới: Thu hút người chưa đăng ký */}
        <div className="mt-16 text-center">
          <p className="font-bold mb-4">
            Nhận ngữ cảnh gọn gàng này mỗi sáng.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-8 py-3 font-bold hover:bg-neutral-800 transition-colors border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
          >
            Đăng ký miễn phí
          </Link>
        </div>
      </main>
    </div>
  );
}
