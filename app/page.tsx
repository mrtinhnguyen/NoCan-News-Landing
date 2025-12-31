"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const LIMIT = 300;

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "duplicate"
  >("idle");
  const [isSampleOpen, setIsSampleOpen] = useState(false);
  const [isFull, setIsFull] = useState(false);

  // 초기 로드 시 구독자 수 체크 (RPC 함수 사용)
  useEffect(() => {
    const checkCount = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase.rpc as any)(
        "get_subscriber_count"
      );
      if (!error && data !== null && data >= LIMIT) {
        setIsFull(true);
      }
    };
    checkCount();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (isFull) return; // Double Check
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
        <h1 className="font-bold text-xl tracking-tighter uppercase">
          NoCan News
        </h1>
        {isFull ? (
          <span className="text-xs font-mono border border-black px-2 py-1 rounded-full bg-black text-white font-bold animate-pulse">
            CLOSED
          </span>
        ) : (
          <span className="text-xs font-mono border border-black px-2 py-1 rounded-full bg-neutral-100 font-bold">
            BETA : LIMIT {LIMIT}
          </span>
        )}
      </header>

      <main className="max-w-3xl mx-auto px-6">
        {/* 2. Hero Section: 선언문 */}
        <section className="py-24 md:py-32">
          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8 tracking-tight">
            오늘 아침, <br />
            당신의 기분을 망친 건 <br />
            당신이 아닙니다.
          </h2>
          <p className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl mb-10 text-neutral-800">
            자극적인 뉴스는 뇌의 코르티솔을 분비시켜 하루를 망칩니다.{" "}
            <br className="hidden md:block" />
            우리는 '도파민'과 '공포'를 제거하고, 오직{" "}
            <strong>구조적 맥락(Context)</strong>만 남깁니다.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-3 max-w-md relative"
          >
            {/* 마감 시 폼을 덮는 오버레이 */}
            {isFull && (
              <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-[1px] flex items-center justify-center border-2 border-black border-dashed">
                <div className="text-center">
                  <span className="bg-black text-white text-lg font-bold px-4 py-2 font-mono block mb-2 transform -rotate-2 shadow-lg">
                    SOLD OUT
                  </span>
                  <p className="text-xs font-bold text-neutral-600 uppercase tracking-widest">
                    선착순 300명 마감
                  </p>
                </div>
              </div>
            )}

            <input
              type="email"
              placeholder={
                isFull ? "현재 모집이 마감되었습니다." : "이메일 주소"
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full border-2 border-black p-3 focus:outline-none focus:ring-4 focus:ring-neutral-200 transition-all placeholder:text-neutral-400 font-mono text-sm ${
                isFull ? "bg-neutral-100 cursor-not-allowed opacity-50" : ""
              }`}
              required
              disabled={isFull}
            />

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={
                  status === "loading" || status === "success" || isFull
                }
                className="flex-1 bg-black text-white px-6 py-3 font-bold hover:bg-neutral-800 disabled:bg-neutral-500 transition-colors border-2 border-black whitespace-nowrap disabled:cursor-not-allowed"
              >
                {isFull
                  ? "모집 마감 (Closed)"
                  : status === "loading"
                  ? "처리 중..."
                  : status === "success"
                  ? "완료되었습니다"
                  : "무료로 받아보기"}
              </button>

              <button
                type="button"
                onClick={() => setIsSampleOpen(true)}
                className="px-6 py-3 font-bold bg-white text-black border-2 border-black hover:bg-neutral-100 transition-colors whitespace-nowrap"
              >
                샘플 보기
              </button>
            </div>

            {/* 마이크로 카피 영역 */}
            <div className="mt-2 space-y-1">
              <p className="text-xs text-neutral-500 font-mono flex items-center gap-2">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    isFull ? "bg-red-500" : "bg-green-500 animate-pulse"
                  }`}
                ></span>
                {isFull
                  ? "현재 베타 모집이 마감되었습니다."
                  : "매일 아침 7시 발송. 광고 없음. 언제든 취소 가능."}
              </p>
              {!isFull && (
                <p className="text-xs text-neutral-500 font-mono flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  현재 선착순 {LIMIT}명 제한.
                </p>
              )}
            </div>

            {status === "success" && (
              <p className="text-sm font-mono text-green-700 font-bold mt-2">
                ✓ 구독이 완료되었습니다. 내일 아침에 만나요.
              </p>
            )}
            {status === "duplicate" && (
              <p className="text-sm font-mono text-orange-600 mt-2">
                ⚠️ 이미 구독 중인 이메일입니다.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm font-mono text-red-600 mt-2">
                ✕ 오류가 발생했습니다. 다시 시도해주세요.
              </p>
            )}
          </form>
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
                SAMPLE EMAIL
              </span>
              <h2 className="text-2xl font-bold">NoCan News</h2>
              <p className="text-xs text-neutral-400 mt-1">
                세상의 소음은 끄고, 구조적 맥락만 남긴다
              </p>
              <p className="text-sm text-neutral-500 mt-2">2025-12-27</p>
            </div>

            <div className="space-y-8 font-sans">
              {/* Protection Log */}
              <div className="bg-neutral-100 p-4 border-l-4 border-green-500">
                <p className="text-sm font-bold text-green-700">
                  🛡️ 오늘 AI가 총 1,247건을 스캔하여 범죄 45건, 가십 89건,
                  정치적 비방 123건을 차단했습니다.
                </p>
              </div>

              {/* 경제 섹션 */}
              <div>
                <h3 className="text-lg font-bold border-b-2 border-neutral-200 pb-2 mb-4">
                  📌 경제
                </h3>
                <div className="bg-neutral-50 p-4 rounded border-l-4 border-neutral-600">
                  <p className="text-xs text-neutral-400 line-through mb-2">
                    1500원 환율 위기, 달러는 마르는데 돈 뿌리는 정부...저성장
                    고착화될라
                  </p>
                  <h4 className="text-base font-bold mb-3">
                    원/달러 환율 1480원대 기록, 수입 물가 상승에 영향
                  </h4>
                  <div className="bg-white p-3 text-sm space-y-2 border border-neutral-200">
                    <p>
                      <span className="font-bold text-blue-600">📍 Fact:</span>{" "}
                      원/달러 환율이 2025년 12월 1483.6원으로 8개월 만에
                      최고치를 기록하며, 원자재를 포함한 수입 물가 지수와 소비자
                      물가가 상승했습니다.
                    </p>
                    <p>
                      <span className="font-bold text-yellow-600">
                        📍 Context:
                      </span>{" "}
                      국내에 원화 공급이 많고 달러 유입이 부족한 상황이 원화
                      약세의 주요 원인으로 지목되며, 주요국 통화 중 원화가 가장
                      큰 폭의 약세를 보이고 있습니다.
                    </p>
                    <p>
                      <span className="font-bold text-green-600">
                        📍 Implication:
                      </span>{" "}
                      지속적인 고환율은 물가 상승 압력으로 작용하여 가계 부담을
                      가중시키고 경제 성장률에 부정적인 영향을 줄 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 기술 섹션 */}
              <div>
                <h3 className="text-lg font-bold border-b-2 border-neutral-200 pb-2 mb-4">
                  📌 기술
                </h3>
                <div className="bg-neutral-50 p-4 rounded border-l-4 border-neutral-600">
                  <p className="text-xs text-neutral-400 line-through mb-2">
                    &quot;더 이상 빌려 쓰지 않는다&quot;...삼성, 자체 GPU 개발
                    &apos;기술 독립 선언&apos;
                  </p>
                  <h4 className="text-base font-bold mb-3">
                    삼성전자, 100% 독자 기술 모바일 GPU 개발 성공
                  </h4>
                  <div className="bg-white p-3 text-sm space-y-2 border border-neutral-200">
                    <p>
                      <span className="font-bold text-blue-600">📍 Fact:</span>{" "}
                      삼성전자가 외부 기술 의존 없이 100% 독자 기술로 개발한
                      모바일 GPU를 선보였으며, 이는 차기 엑시노스 제품에 탑재될
                      예정입니다.
                    </p>
                    <p>
                      <span className="font-bold text-yellow-600">
                        📍 Context:
                      </span>{" "}
                      기존에는 미국 AMD의 기술을 토대로 GPU를 설계해왔으나, 이번
                      자체 GPU 개발 성공으로 외부 지식 재산권 의존도를 낮추고
                      막대한 수수료 지불을 절감하고자 합니다.
                    </p>
                    <p>
                      <span className="font-bold text-green-600">
                        📍 Implication:
                      </span>{" "}
                      자체 GPU 개발은 삼성전자의 시스템 반도체 경쟁력을 강화하고
                      AI 시대에 기술 독립성을 확보하는 중요한 전환점이 될
                      것입니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 사설 분석 */}
              <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 rounded-lg border border-neutral-200">
                <h3 className="text-lg font-bold mb-2">⚖️ 오늘의 사설 분석</h3>
                <p className="font-semibold text-neutral-700 mb-3">
                  주 35시간 근로제 도입 논쟁
                </p>

                <div className="bg-white p-3 rounded mb-3 border border-neutral-200">
                  <p className="text-sm text-neutral-700">
                    <span className="font-bold text-red-600">
                      🔴 핵심 쟁점:
                    </span>{" "}
                    노동자 삶의 질 향상 vs 기업 경쟁력 저하 우려. 양측은
                    근로시간 단축의 시급성과 방법론에서 첨예하게 대립하고 있다.
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="bg-red-50 p-3 rounded text-neutral-700">
                    <span className="font-bold text-red-700 block mb-1">
                      보수 측 논리
                    </span>
                    한국의 노동생산성은 OECD 평균 대비 낮은 수준이다. 이
                    상황에서 근로시간을 일방적으로 단축하면 기업의 경쟁력 약화로
                    이어질 수 있으며, 결국 고용 감소라는 역효과를 초래할 수
                    있다.
                  </div>
                  <div className="bg-blue-50 p-3 rounded text-neutral-700">
                    <span className="font-bold text-blue-700 block mb-1">
                      진보 측 논리
                    </span>
                    장시간 노동은 노동자의 건강권을 침해하고 삶의 질을
                    저하시킨다. 근로시간 단축은 노동자의 기본권 보호 차원에서
                    필수적이며, 오히려 집중력 향상과 이직률 감소를 통해
                    장기적으로 생산성 향상에 기여할 수 있다.
                  </div>
                  <div className="bg-neutral-200 p-3 rounded font-medium text-neutral-800">
                    💡 구조적 의미: 이 논쟁은 단순한 노동시간의 문제가 아니라,
                    한국 사회가 추구하는 성장 모델과 삶의 가치에 대한 근본적
                    질문이다.
                  </div>
                </div>
              </div>

              <div className="text-center mt-8 pt-4 border-t border-neutral-200">
                <button
                  onClick={() => setIsSampleOpen(false)}
                  className="bg-black text-white px-8 py-3 font-bold hover:bg-neutral-800"
                >
                  이런 뉴스를 받아볼래요
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
