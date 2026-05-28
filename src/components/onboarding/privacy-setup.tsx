"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

interface PrivacySetupProps {
  onNext: () => void;
}

const LEVEL_CONFIG = [
  { level: 1 as const, icon: "🌍", key: "open", color: "var(--color-sm-green-glow)" },
  { level: 2 as const, icon: "👁", key: "selective", color: "var(--color-sm-bright)" },
  { level: 3 as const, icon: "🌫", key: "anonymous", color: "var(--color-sm-amber-glow)" },
  { level: 4 as const, icon: "⬛", key: "invisible", color: "var(--color-sm-pink-glow)" },
];

export function PrivacySetup({ onNext }: PrivacySetupProps) {
  const t = useTranslations("onboarding.privacy");
  const [selected, setSelected] = useState(2);

  return (
    <div className="flex-1 flex flex-col px-6 py-8 relative">
      <div className="flex-1">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-[38px] mb-3">🔒</div>
          <h2 className="text-[27px] font-black tracking-tight font-[family-name:var(--font-display)]">
            {t("title")}
          </h2>
          <p className="text-sm text-sm-muted mt-2 leading-relaxed">
            {t("desc")}
          </p>
        </div>

        {/* Privacy levels */}
        <div className="flex flex-col gap-2.5">
          {LEVEL_CONFIG.map((lv) => {
            const isSelected = selected === lv.level;
            return (
              <div
                key={lv.level}
                onClick={() => setSelected(lv.level)}
                className="flex items-center gap-3.5 rounded-[14px] px-4 py-3.5 cursor-pointer transition-all duration-200"
                style={{
                  background: isSelected ? `${lv.color}0d` : "var(--color-sm-glass)",
                  border: `1.5px solid ${isSelected ? lv.color + "66" : "var(--color-sm-border)"}`,
                  backdropFilter: "blur(8px)",
                  boxShadow: isSelected ? `0 0 22px ${lv.color}18` : "none",
                }}
              >
                <span className="text-[22px]">{lv.icon}</span>
                <div className="flex-1">
                  <div
                    className="font-bold text-sm"
                    style={{ color: isSelected ? lv.color : "var(--color-sm-text)" }}
                  >
                    {t(`levels.${lv.key}.label`)}
                  </div>
                  <div className="text-[11px] text-sm-muted mt-0.5">
                    {t(`levels.${lv.key}.desc`)}
                  </div>
                </div>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white transition-all duration-200"
                  style={{
                    border: `2px solid ${isSelected ? lv.color : "var(--color-sm-dim)"}`,
                    background: isSelected ? lv.color : "transparent",
                  }}
                >
                  {isSelected ? "✓" : ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="pt-5">
        <Button onClick={onNext}>{t("cta")}</Button>
      </div>
    </div>
  );
}
