"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface SplashProps {
  onNext: () => void;
}

export function Splash({ onNext }: SplashProps) {
  const t = useTranslations("onboarding.splash");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const tm = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(tm);
  }, []);

  return (
    <div
      className="w-full flex flex-col items-center text-center transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-live-pulse" />
        <span className="text-[11px] font-medium tracking-wider text-white/60 font-[family-name:var(--font-mono)] uppercase">
          Beta · 2026
        </span>
      </div>

      {/* Logomark */}
      <div className="relative mb-10">
        <div className="absolute inset-0 blur-2xl opacity-60 bg-gradient-to-br from-violet-500 to-cyan-400 rounded-full" />
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-2xl">
          <svg viewBox="0 0 24 24" className="w-9 h-9 text-white" fill="currentColor">
            <path d="M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Headline */}
      <h1 className="font-[family-name:var(--font-display)] font-black tracking-[-0.04em] leading-[0.95] text-[44px] sm:text-[56px] md:text-[64px] mb-6">
        <span className="text-white">Find your</span>
        <br />
        <span className="bg-gradient-to-br from-white via-violet-200 to-cyan-300 bg-clip-text text-transparent">
          sound tribe.
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-white/55 leading-relaxed max-w-md mb-12 font-[family-name:var(--font-body)]">
        {t("subtitle")}
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mb-10">
        <button
          onClick={onNext}
          className="flex-1 group relative px-6 py-4 rounded-2xl bg-white text-black font-bold text-[15px] cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)]"
        >
          <span className="flex items-center justify-center gap-2">
            {t("cta")}
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </span>
        </button>
        <button
          onClick={onNext}
          className="px-6 py-4 rounded-2xl border border-white/15 text-white/80 font-semibold text-[15px] cursor-pointer transition-all duration-200 hover:border-white/30 hover:bg-white/[0.04]"
        >
          Tour ansehen
        </button>
      </div>

      {/* Social proof */}
      <div className="flex items-center gap-3 text-[12px] text-white/40 font-[family-name:var(--font-mono)]">
        <div className="flex -space-x-2">
          {["from-violet-400 to-fuchsia-500", "from-cyan-400 to-blue-500", "from-emerald-400 to-teal-500", "from-amber-400 to-rose-500"].map((g, i) => (
            <div key={i} className={`w-6 h-6 rounded-full bg-gradient-to-br ${g} border-2 border-black`} />
          ))}
        </div>
        <span>
          <span className="text-white/70 font-bold">1&apos;247</span> auf der Warteliste · Zürich
        </span>
      </div>
    </div>
  );
}
