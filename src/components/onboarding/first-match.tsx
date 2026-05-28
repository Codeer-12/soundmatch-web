"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Particles } from "@/components/ui/particles";
import { MatchRing } from "@/components/ui/match-ring";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { USERS, ME } from "@/lib/demo-data";

interface FirstMatchProps {
  onNext: () => void;
}

export function FirstMatch({ onNext }: FirstMatchProps) {
  const t = useTranslations("onboarding.match");
  const [phase, setPhase] = useState(0);
  const user = USERS[0];

  useEffect(() => {
    const timers = [200, 1000, 2600].map((d, i) =>
      setTimeout(() => setPhase(i + 1), d)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const sharedArtists = user.artists.filter((a) => ME.artists.includes(a));

  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center px-7 py-9 relative">
      <Particles count={30} />

      {/* Burst effect */}
      {phase >= 1 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 40%, rgba(5,150,105,0.1) 0%, transparent 65%)",
            animation: "fade-up 1.5s ease-out forwards",
          }}
        />
      )}

      <div className="relative z-10 w-full">
        {/* Ring + Avatar */}
        <div
          className="mb-6 flex flex-col items-center transition-all duration-750"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? "scale(1)" : "scale(0.35)",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <div className="relative">
            <MatchRing score={user.match} size={162} animate={phase >= 1} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-11">
              <span className="text-[40px]">{user.avatar}</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div
          className="mb-2 transition-all duration-500"
          style={{
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? "translateY(0)" : "translateY(18px)",
          }}
        >
          <div className="text-[9px] text-sm-teal-glow font-[family-name:var(--font-mono)] tracking-[2.5px] mb-3">
            ◉ {t("found")}
          </div>
          <h2 className="text-[27px] font-black tracking-tight font-[family-name:var(--font-display)] mb-2">
            {t("title", { name: user.name })}
          </h2>
          <p className="text-[13px] text-sm-muted">
            {t("listening")} · <span className="text-sm-text">{user.song}</span>
            <br />
            <span className="text-sm-green-glow">📍 {user.dist}m</span>
          </p>
        </div>

        {/* Shared artists */}
        {phase >= 2 && (
          <div className="flex gap-1.5 flex-wrap justify-center my-4 animate-fade-up">
            {sharedArtists.map((a) => (
              <Tag key={a} color="var(--color-sm-green-glow)">
                ✓ {a}
              </Tag>
            ))}
          </div>
        )}

        {/* CTAs */}
        <div
          className="transition-all duration-500"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <Button onClick={onNext}>Zum Radar →</Button>
          <Button variant="secondary" className="mt-2.5">
            ↑ {t("share", { score: user.match })}
          </Button>
        </div>
      </div>
    </div>
  );
}
