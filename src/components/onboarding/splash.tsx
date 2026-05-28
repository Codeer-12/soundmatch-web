"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";

interface SplashProps {
  onNext: () => void;
}

export function Splash({ onNext }: SplashProps) {
  const t = useTranslations("onboarding.splash");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center relative px-7 py-8">
      <Particles count={42} />

      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[380px] h-[380px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(109,40,217,0.04) 0%, transparent 70%)",
            animation: "sweep-rotate 9s linear infinite",
          }}
        />
        <div
          className="absolute top-[28%] left-[35%] w-[280px] h-[280px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(8,145,178,0.03) 0%, transparent 70%)",
            animation: "sweep-rotate 13s linear infinite reverse",
          }}
        />
      </div>

      <div
        className="relative z-10 transition-all duration-900"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
        }}
      >
        {/* Logo */}
        <div className="w-24 h-24 rounded-[28px] mx-auto mb-7 flex items-center justify-center text-[44px] bg-gradient-to-br from-sm-accent via-sm-glow to-sm-teal/60 animate-pulse-glow">
          ♫
        </div>

        {/* Title */}
        <h1 className="text-[46px] font-black tracking-tighter font-[family-name:var(--font-display)] mb-3.5 gradient-text">
          {t("title")}
        </h1>

        {/* Subtitle */}
        <p className="text-[15px] text-sm-muted leading-relaxed max-w-[268px] mx-auto mb-12 font-[family-name:var(--font-body)]">
          {t("subtitle")}
        </p>

        {/* CTA */}
        <Button onClick={onNext}>{t("cta")}</Button>

        {/* Waitlist info */}
        <p className="text-[10px] text-sm-dim mt-4 font-[family-name:var(--font-mono)] tracking-wide">
          {t("waitlist")}
        </p>
      </div>
    </div>
  );
}
