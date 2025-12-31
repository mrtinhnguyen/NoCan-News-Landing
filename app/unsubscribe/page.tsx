"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

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

      const { error } = await supabase
        .from("subscribers")
        .update({ is_active: false })
        .eq("id", id);

      if (error) {
        console.error("Unsubscribe error:", error);
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
          <p className="font-mono text-sm">요청을 처리하고 있습니다...</p>
        </div>
      )}

      {status === "success" && (
        <div className="py-6">
          <div className="text-4xl mb-4">👋</div>
          <h1 className="text-xl font-bold mb-4">구독이 취소되었습니다.</h1>
          <p className="text-sm text-neutral-600 mb-8 leading-relaxed">
            더 이상 뉴스레터가 발송되지 않습니다.
            <br />
            그동안 NoCan News를 이용해 주셔서 감사합니다.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 font-bold text-sm hover:bg-neutral-800 transition-colors border-2 border-black"
          >
            메인으로 돌아가기
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="py-6">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold mb-4 text-red-600">
            오류가 발생했습니다.
          </h1>
          <p className="text-sm text-neutral-600 mb-6">
            유효하지 않은 링크이거나
            <br />
            이미 처리된 요청일 수 있습니다.
          </p>
          <Link href="/" className="underline text-sm font-mono">
            홈으로 이동
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
