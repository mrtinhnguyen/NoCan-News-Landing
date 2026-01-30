"use client";

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [status, setStatus] = useState<"processing" | "success" | "error">(
    "processing"
  );

  useEffect(() => {
    const processUnsubscribe = async () => {
      if (!id) {
        setStatus("error");
        return;
      }
    
      const { data, error } = await supabase
        .from("subscribers")
        .update({ is_active: false })
        .eq("id", id)
        .select();  // Trả về hàng đã cập nhật
    
      if (error || !data || data.length === 0) {
        console.error("Unsubscribe failed:", error);
        setStatus("error");
      } else {
        setStatus("success");
      }
    };

    processUnsubscribe();
  }, [id]);

  return (
    <div className="max-w-md w-full border-2 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
      {status === "processing" && (
        <div className="py-10">
          <div className="animate-spin w-8 h-8 border-4 border-neutral-300 border-t-black rounded-full mx-auto mb-4"></div>
          <p className="font-mono text-sm">Đang xử lý yêu cầu...</p>
        </div>
      )}

      {status === "success" && (
        <div className="py-6">
          <div className="text-4xl mb-4">👋</div>
          <h1 className="text-xl font-bold mb-4">Đã hủy đăng ký.</h1>
          <p className="text-sm text-neutral-600 mb-8 leading-relaxed">
            Bạn sẽ không nhận được bản tin nữa.
            <br />
            Cảm ơn bạn đã sử dụng Morning News trong thời gian qua.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 font-bold text-sm hover:bg-neutral-800 transition-colors border-2 border-black"
          >
            Quay lại trang chủ
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="py-6">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold mb-4 text-red-600">
            Đã xảy ra lỗi.
          </h1>
          <p className="text-sm text-neutral-600 mb-6">
            Liên kết không hợp lệ hoặc
            <br />
            yêu cầu có thể đã được xử lý.
          </p>
          <Link href="/" className="underline text-sm font-mono">
            Về trang chủ
          </Link>
        </div>
      )}
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black font-sans p-4 selection:bg-black selection:text-white">
      <Suspense fallback={<div>Loading...</div>}>
        <UnsubscribeContent />
      </Suspense>
    </div>
  );
}
