"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { SCAN_ARTISTS } from "@/lib/demo-data";

interface ConnectProps {
  onNext: () => void;
}

export function Connect({ onNext }: ConnectProps) {
  const t = useTranslations("onboarding.connect");
  const [state, setState] = useState<"idle" | "scanning" | "done">("idle");
  const [idx, setIdx] = useState(0);

  const handleConnect = () => {
    setState("scanning");
    const iv = setInterval(() => {
      setIdx((i) => {
        if (i >= SCAN_ARTISTS.length - 1) {
          clearInterval(iv);
          setState("done");
          setTimeout(onNext, 1100);
          return i;
        }
        return i + 1;
      });
    }, 105);
  };

  return (
    <div className="flex-1 flex flex-col px-6 py-9 relative">
      <div className="flex-1 flex flex-col justify-center relative z-10">
        {/* Header */}
        <div className="text-center mb-7">
          <div className="w-[74px] h-[74px] rounded-[22px] mx-auto mb-5 bg-[#1DB954] flex items-center justify-center text-[36px] shadow-[0_0_38px_rgba(29,185,84,0.4)]">
            🎵
          </div>
          <h2 className="text-[27px] font-black tracking-tight font-[family-name:var(--font-display)]">
            {t("title")}
          </h2>
          <p className="text-sm text-sm-muted mt-2.5 leading-relaxed">
            {t("desc")}
          </p>
        </div>

        {/* Scanning animation / Privacy points */}
        {state !== "idle" ? (
          <div className="glass rounded-[14px] border border-sm-border p-4 mb-5 animate-fade-up">
            <div
              className="text-[9px] font-[family-name:var(--font-mono)] tracking-[1.8px] mb-3"
              style={{ color: state === "done" ? "var(--color-sm-green-glow)" : "var(--color-sm-teal-glow)" }}
            >
              {state === "done" ? `✓ ${t("done")}` : `⟳ ${t("scanning")}`}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SCAN_ARTISTS.slice(0, idx + 1).map((a, i) => (
                <span
                  key={a}
                  className="text-[11px] font-semibold rounded-md px-2 py-0.5 transition-all duration-150"
                  style={{
                    color:
                      state === "done"
                        ? "var(--color-sm-green-glow)"
                        : i === idx
                        ? "var(--color-sm-bright)"
                        : "var(--color-sm-muted)",
                    background:
                      state === "done"
                        ? "rgba(5,150,105,0.07)"
                        : i === idx
                        ? "rgba(139,92,246,0.1)"
                        : "transparent",
                  }}
                >
                  {state === "done" ? "✓ " : ""}
                  {a}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="glass rounded-[14px] border border-sm-border p-4 mb-5">
            {(
              [
                ["🔒", t("points.metadata")],
                ["🚫", t("points.noAudio")],
                ["👁", t("points.privacy")],
                ["🗑", t("points.delete")],
              ] as const
            ).map(([icon, text]) => (
              <div key={text} className="flex gap-3 items-center mb-3 last:mb-0 text-[13px]">
                <span className="text-[17px]">{icon}</span>
                <span className="text-sm-muted">{text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        {state === "idle" && (
          <>
            <Button variant="spotify" onClick={handleConnect}>
              {t("title")}
            </Button>
            <div className="flex gap-2 mt-2.5">
              <Button variant="secondary" onClick={onNext}>
                Apple Music
              </Button>
              <Button variant="secondary" onClick={onNext}>
                Deezer
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
