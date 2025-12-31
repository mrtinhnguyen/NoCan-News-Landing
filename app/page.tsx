"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const { error } = await supabase.from("subscribers").insert({ email });

      if (error) throw error;
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
        <h1 className="font-bold text-xl tracking-tighter uppercase">
          NoCan News
        </h1>
        <span className="text-xs font-mono border border-black px-2 py-1 rounded-full">
          BETA
        </span>
      </header>

      <main className="max-w-3xl mx-auto px-6">
        {/* 2. Hero Section: 선언문 */}
        <section className="py-24 md:py-32">
          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8 tracking-tight">
            오늘 아침, <br />
            당신의 기분을 망친 건 <br />
            당신이 아닙니다.
          </h2>
          <p className="text-lg md:text-xl font-medium leading-relaxed max-w-xl mb-10 text-neutral-800">
            자극적인 뉴스는 뇌의 코르티솔을 분비시켜 하루를 망칩니다.{" "}
            <br className="hidden md:block" />
            우리는 '도파민'과 '공포'를 제거하고, 오직{" "}
            <strong>구조적 맥락(Context)</strong>만 남깁니다.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-3 max-w-md"
          >
            {/* 입력창과 버튼을 감싸는 div */}
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border-2 border-black p-3 focus:outline-none focus:ring-4 focus:ring-neutral-200 transition-all placeholder:text-neutral-400 font-mono text-sm"
                required
              />
              <button
                disabled={status === "loading" || status === "success"}
                className="bg-black text-white px-6 py-3 font-bold hover:bg-neutral-800 disabled:bg-neutral-500 transition-colors border-2 border-black whitespace-nowrap"
              >
                {status === "loading"
                  ? "처리 중..."
                  : status === "success"
                  ? "완료되었습니다"
                  : "무료로 받아보기"}
              </button>
            </div>

            {/* ★ 추가된 마이크로 카피: 여기에 약속을 적습니다 ★ */}
            <p className="text-xs text-neutral-500 font-mono flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              매일 아침 7시 발송. 광고 없음. 언제든 구독 취소 가능.
            </p>
          </form>
          {status === "success" && (
            <p className="mt-4 text-sm font-mono text-green-700">
              ✓ 내일 아침 7시부터 발송됩니다.
            </p>
          )}
        </section>

        <hr className="border-black" />

        {/* 3. Authority: 권위와 근거 */}
        <section className="py-20">
          <blockquote className="text-2xl md:text-3xl font-serif italic mb-6">
            "뉴스는 마음의 설탕이다.
            <br />
            당신의 몸에 정크푸드를 넣지 않듯,
            <br />
            뇌에도 독성 뉴스를 넣지 마라."
          </blockquote>
          <cite className="not-italic text-sm font-bold uppercase tracking-widest">
            — Rolf Dobelli, &lt;News Diet&gt;
          </cite>
        </section>

        <hr className="border-black" />

        {/* 4. Comparison: Before & After (가장 중요) */}
        <section className="py-20">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-10 text-neutral-500">
            How It Works
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Bad Case */}
            <div className="border border-neutral-300 p-6 opacity-50 bg-neutral-50">
              <span className="text-xs font-bold text-red-600 uppercase mb-2 block">
                Before (Noise)
              </span>
              <h4 className="text-xl font-bold mb-3 text-neutral-400 line-through decoration-red-500">
                [충격] OO 정책 결국 파국 맞이하나... 시민들 "분노 폭발"
              </h4>
              <p className="text-sm text-neutral-400">
                격앙된 반응이 쏟아지고 있다. 네티즌들은 "말도 안 되는 처사"라며
                비난을 멈추지 않고 있으며...
              </p>
            </div>

            {/* Good Case */}
            <div className="border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
              <span className="text-xs font-bold text-green-700 uppercase mb-2 block">
                After (Context)
              </span>
              <h4 className="text-xl font-bold mb-3">
                OO 정책 변경 발표 및 경제적 영향 분석
              </h4>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li>
                  <strong>Fact:</strong> 정책 변경안의 핵심 내용은 A와 B입니다.
                </li>
                <li>
                  <strong>Context:</strong> 이번 변경은 지난달 지표 하락에 대한
                  대응책입니다.
                </li>
                <li>
                  <strong>Implication:</strong> 가계 부채에 단기적 변동이
                  예상됩니다.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="border-black" />

        {/* 5. Features: 기능 설명 (AI 언급 최소화) */}
        <section className="py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-2">① Noise Filtering</h4>
            <p className="text-sm text-neutral-600">
              낚시성 헤드라인, 혐오 표현, 불필요한 형용사를 알고리즘으로 즉시
              차단합니다.
            </p>
          </div>
          <div>
            {/* 여기를 수정했습니다: Structural Briefing -> Editorial Synthesis */}
            <h4 className="font-bold text-lg mb-2">② Context Synthesis</h4>
            <p className="text-sm text-neutral-600">
              편향된 사설들을 통합하여, 진영 논리 뒤에 숨겨진{" "}
              <strong>'구조적 쟁점'</strong>만 추출합니다.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">③ Daily 7:00 AM</h4>
            <p className="text-sm text-neutral-600">
              출근길, 감정 소모 없이 3분 만에 세상의 흐름을 파악하세요.
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
          © 2025 NoCan News. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
