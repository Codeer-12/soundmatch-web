"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";

interface HookProps {
  onNext: () => void;
}

export function Hook({ onNext }: HookProps) {
  const t = useTranslations("onboarding.hook");
  const [step, setStep] = useState(0);
  const [sweep, setSweep] = useState(0);

  useEffect(() => {
    const timers = [500, 1400, 2700].map((d, i) =>
      setTimeout(() => setStep(i + 1), d)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setSweep((a) => (a + 2) % 360), 20);
    return () => clearInterval(iv);
  }, []);

  const rad = Math.PI / 180;
  const cx = 110, cy = 110, R = 96;
  const sx = cx + R * Math.cos((sweep - 90) * rad);
  const sy = cy + R * Math.sin((sweep - 90) * rad);

  return (
    <div className="flex-1 flex flex-col justify-center px-7 py-8 relative">
      <Particles count={18} />

      <div className="relative z-10">
        {/* Radar visual */}
        <div
          className="relative w-[220px] h-[220px] mx-auto mb-10 transition-all duration-700"
          style={{
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? "scale(1)" : "scale(0.8)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <svg width={220} height={220} className="absolute inset-0">
            {[32, 64, 96].map((r, i) => (
              <circle
                key={r} cx={cx} cy={cy} r={r} fill="none"
                stroke="var(--color-sm-glow)" strokeWidth={1}
                opacity={0.18 - i * 0.04}
                strokeDasharray={i === 2 ? "5 5" : "none"}
              />
            ))}
            <line
              x1={cx} y1={cy} x2={sx} y2={sy}
              stroke="var(--color-sm-glow)" strokeWidth={1.5} opacity={0.65}
            />
          </svg>

          {/* Me dot */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[3]">
            <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-sm-accent to-sm-glow flex items-center justify-center text-[22px] shadow-[0_0_26px_var(--color-sm-glow)] border-[2.5px] border-sm-text">
              ⭐
            </div>
          </div>

          {/* Other user */}
          {step >= 2 && (
            <div className="absolute left-[64%] top-[25%] z-[3] animate-pop-in">
              <div className="absolute -inset-1.5 rounded-full border-[1.5px] border-sm-green-glow animate-ping-ring opacity-70" />
              <div className="w-[42px] h-[42px] rounded-full bg-sm-card border-2 border-sm-green-glow flex items-center justify-center text-[18px] shadow-[0_0_20px_rgba(52,211,153,0.53)]">
                🎧
              </div>
              {step >= 3 && (
                <div className="absolute top-[115%] left-1/2 -translate-x-1/2 glass border border-sm-green-glow/25 rounded-[9px] px-2.5 py-1 text-[10px] text-sm-green-glow font-bold whitespace-nowrap mt-1 animate-fade-up">
                  🎵 Do I Wanna Know? · 50m
                </div>
              )}
            </div>
          )}
        </div>

        {/* Text */}
        <div className="text-center">
          <h2
            className="text-[27px] font-black tracking-tight font-[family-name:var(--font-display)] leading-tight transition-all duration-500"
            style={{
              opacity: step >= 2 ? 1 : 0,
              transform: step >= 2 ? "translateY(0)" : "translateY(14px)",
            }}
          >
            {t("title1")}
            <br />
            <span className="gradient-text">{t("title2")}</span>
          </h2>

          <p
            className="text-sm text-sm-muted leading-relaxed mt-3 transition-all duration-500"
            style={{
              opacity: step >= 3 ? 1 : 0,
              transform: step >= 3 ? "translateY(0)" : "translateY(10px)",
              transitionDelay: "0.1s",
            }}
          >
            {t("desc")}
          </p>
        </div>

        {/* CTA */}
        <div
          className="mt-auto pt-10 transition-opacity duration-500"
          style={{ opacity: step >= 3 ? 1 : 0, transitionDelay: "0.8s" }}
        >
          <Button onClick={onNext}>{t("title2")} →</Button>
        </div>
      </div>
    </div>
  );
}
