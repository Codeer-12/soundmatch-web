"use client";

import { useTranslations } from "next-intl";
import { useAppStore, ONBOARDING_TOTAL } from "@/stores/app-store";
import { Dots } from "@/components/ui/dots";
import { ME, USERS } from "@/lib/demo-data";

// Onboarding screens
import { Splash } from "@/components/onboarding/splash";
import { Hook } from "@/components/onboarding/hook";
import { Connect } from "@/components/onboarding/connect";
import { FirstMatch } from "@/components/onboarding/first-match";
import { PrivacySetup } from "@/components/onboarding/privacy-setup";

// App tabs
import { RadarTab } from "@/components/app/radar-tab";

const ONBOARDING_SCREENS = [Splash, Hook, Connect, FirstMatch, PrivacySetup];

const TABS = [
  { id: "radar" as const, icon: "◉", label: "radar" },
  { id: "matches" as const, icon: "♫", label: "matches" },
  { id: "radio" as const, icon: "▶", label: "radio" },
  { id: "creators" as const, icon: "★", label: "creators" },
  { id: "profile" as const, icon: "👤", label: "profile" },
];

export function AppShell() {
  const t = useTranslations("nav");
  const {
    phase, onboardingStep, activeTab,
    nextOnboarding, prevOnboarding, setActiveTab, restart,
  } = useAppStore();

  // ── Onboarding ──
  if (phase === "onboarding") {
    const Screen = ONBOARDING_SCREENS[onboardingStep];
    return (
      <div className="font-[family-name:var(--font-body)] bg-sm-bg text-sm-text min-h-screen max-w-[430px] mx-auto relative flex flex-col overflow-hidden">
        <div key={onboardingStep} className="flex-1 flex flex-col animate-fade-up">
          {/* Top bar with back + dots */}
          {onboardingStep > 0 && (
            <div className="px-5 pt-4 flex items-center justify-between z-10">
              <button
                onClick={prevOnboarding}
                className="bg-transparent border-none text-sm-muted text-[22px] cursor-pointer p-1"
              >
                ←
              </button>
              <Dots total={ONBOARDING_TOTAL} current={onboardingStep} />
              <div className="w-9" />
            </div>
          )}
          <Screen onNext={nextOnboarding} />
        </div>
      </div>
    );
  }

  // ── Main App ──
  const onlineCount = USERS.filter((u) => u.online).length;
  const nearbyCount = USERS.filter((u) => u.dist < 500).length;

  return (
    <div className="font-[family-name:var(--font-body)] bg-sm-bg text-sm-text min-h-screen max-w-[430px] mx-auto relative flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col animate-slide-in">
        {/* Header */}
        <div className="px-5 pt-4 sticky top-0 z-20" style={{ background: "linear-gradient(180deg, var(--color-sm-bg) 82%, transparent)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[22px] font-black tracking-tight font-[family-name:var(--font-display)] gradient-text">
                ♫ Soundmatch
              </div>
              <div className="text-[10px] text-sm-muted mt-0.5 font-[family-name:var(--font-mono)]">
                {ME.city} · {onlineCount} online · {nearbyCount} in 500m
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-sm-green-glow shadow-[0_0_8px_var(--color-sm-green-glow)] animate-live-pulse" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sm-accent to-sm-glow flex items-center justify-center text-[18px] shadow-[0_0_18px_rgba(139,92,246,0.33)] cursor-pointer">
                ⭐
              </div>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex gap-0.5 bg-sm-surface rounded-[15px] p-0.5 border border-sm-border mb-0.5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 py-2 rounded-[12px] border-none cursor-pointer font-bold text-[9px] font-[family-name:var(--font-body)] transition-all duration-200"
                style={{
                  background: activeTab === tab.id
                    ? "linear-gradient(135deg, var(--color-sm-accent), var(--color-sm-accent-mid))"
                    : "transparent",
                  color: activeTab === tab.id ? "#fff" : "var(--color-sm-muted)",
                  boxShadow: activeTab === tab.id ? "0 0 14px rgba(139,92,246,0.33)" : "none",
                }}
              >
                <div className="text-[13px] mb-0.5">{tab.icon}</div>
                {t(tab.label)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div key={activeTab} className="flex-1 overflow-auto px-4 pt-3 pb-28 animate-fade-up">
          {activeTab === "radar" && <RadarTab />}
          {activeTab === "matches" && (
            <div className="text-center text-sm-muted py-20">
              <div className="text-4xl mb-4">♫</div>
              <p>Matches Tab – coming next</p>
            </div>
          )}
          {activeTab === "radio" && (
            <div className="text-center text-sm-muted py-20">
              <div className="text-4xl mb-4">▶</div>
              <p>Radio Tab – coming next</p>
            </div>
          )}
          {activeTab === "creators" && (
            <div className="text-center text-sm-muted py-20">
              <div className="text-4xl mb-4">★</div>
              <p>Creator Tab – coming next</p>
            </div>
          )}
          {activeTab === "profile" && (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">👤</div>
              <p className="text-sm-muted mb-6">Profil Tab – coming next</p>
              <button
                onClick={restart}
                className="text-sm text-sm-muted border border-sm-border rounded-[14px] px-6 py-3 cursor-pointer hover:text-sm-text transition-colors"
              >
                ↺ Demo neu starten
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
