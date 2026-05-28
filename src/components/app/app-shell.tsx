"use client";

import { useTranslations } from "next-intl";
import { useAppStore, ONBOARDING_TOTAL } from "@/stores/app-store";
import { Dots } from "@/components/ui/dots";
import { Particles } from "@/components/ui/particles";
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

/* ────────────────────────────────────────
   Desktop Branding Sidebar
   Visible only on lg+ screens
──────────────────────────────────────── */
function DesktopSidebar() {
  return (
    <div className="hidden lg:flex flex-col justify-center items-start px-16 xl:px-24 max-w-[560px] relative">
      <Particles count={20} />
      <div className="relative z-10">
        {/* Logo */}
        <div className="w-16 h-16 rounded-[18px] mb-8 flex items-center justify-center text-[32px] bg-gradient-to-br from-sm-accent via-sm-glow to-sm-teal/60 animate-pulse-glow shadow-[0_0_50px_rgba(139,92,246,0.3)]">
          ♫
        </div>

        <h1 className="text-[52px] xl:text-[64px] font-black tracking-tighter font-[family-name:var(--font-display)] leading-[1.05] mb-6 gradient-text">
          Sound<br/>match
        </h1>

        <p className="text-lg text-sm-muted leading-relaxed max-w-[380px] mb-10 font-[family-name:var(--font-body)]">
          Finde Menschen mit derselben musikalischen DNA – basierend auf deinem echten Musikgeschmack.
        </p>

        {/* Feature highlights */}
        <div className="flex flex-col gap-4 mb-12">
          {[
            { icon: "◉", title: "Radar", desc: "Wer hört was in deiner Nähe" },
            { icon: "♫", title: "Match-Score", desc: "Algorithmische Kompatibilität in %" },
            { icon: "▶", title: "Lokalradio", desc: "Teile Musik – nur Metadaten" },
            { icon: "🔒", title: "Privacy-First", desc: "4 Stufen – alle gratis" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-sm-card border border-sm-border flex items-center justify-center text-sm-glow text-lg flex-shrink-0">
                {f.icon}
              </div>
              <div>
                <div className="text-sm font-bold text-sm-text">{f.title}</div>
                <div className="text-xs text-sm-muted">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {["🎧", "🥁", "🎸", "🎤"].map((e, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-sm-card border-2 border-sm-bg flex items-center justify-center text-sm">
                {e}
              </div>
            ))}
          </div>
          <div className="text-xs text-sm-muted">
            <span className="text-sm-bright font-bold">1&apos;247</span> auf der Warteliste
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────
   Phone Frame (Desktop wrapper)
──────────────────────────────────────── */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Mobile: no frame, full screen */}
      <div className="lg:hidden min-h-screen flex flex-col">
        {children}
      </div>

      {/* Desktop: phone mockup centered */}
      <div className="hidden lg:flex items-center justify-center min-h-screen py-8">
        <div className="relative">
          {/* Phone bezel */}
          <div className="relative w-[420px] h-[860px] rounded-[48px] border-[3px] border-sm-border-hi bg-sm-bg shadow-[0_0_80px_rgba(139,92,246,0.15),0_0_200px_rgba(109,40,217,0.08)] overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140px] h-[28px] bg-sm-bg rounded-b-2xl z-30 flex items-center justify-center">
              <div className="w-16 h-1 rounded-full bg-sm-border-hi" />
            </div>

            {/* Screen content */}
            <div className="h-full overflow-hidden flex flex-col">
              {children}
            </div>
          </div>

          {/* Reflection glow */}
          <div className="absolute -inset-4 rounded-[56px] bg-gradient-to-b from-sm-glow/5 to-transparent pointer-events-none" />
        </div>
      </div>
    </>
  );
}

/* ────────────────────────────────────────
   Main AppShell
──────────────────────────────────────── */
export function AppShell() {
  const t = useTranslations("nav");
  const {
    phase, onboardingStep, activeTab,
    nextOnboarding, prevOnboarding, setActiveTab, restart,
  } = useAppStore();

  // ── Phone content (used in both mobile and desktop frame) ──
  const phoneContent = (() => {
    // ── Onboarding ──
    if (phase === "onboarding") {
      const Screen = ONBOARDING_SCREENS[onboardingStep];
      return (
        <div className="font-[family-name:var(--font-body)] bg-sm-bg text-sm-text flex-1 flex flex-col overflow-hidden">
          <div key={onboardingStep} className="flex-1 flex flex-col animate-fade-up">
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
      <div className="font-[family-name:var(--font-body)] bg-sm-bg text-sm-text flex-1 flex flex-col overflow-hidden">
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
  })();

  return (
    <div className="min-h-screen bg-sm-bg relative overflow-hidden">
      {/* Desktop background ambient */}
      <div className="hidden lg:block fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, rgba(109,40,217,0.08) 0%, transparent 70%)" }} />
        <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(8,145,178,0.06) 0%, transparent 70%)" }} />
        <div className="absolute top-[50%] left-[50%] w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 60%)" }} />
      </div>

      {/* Layout: sidebar + phone frame on desktop, full screen on mobile */}
      <div className="relative z-10 lg:flex lg:items-center lg:justify-center lg:min-h-screen lg:gap-8 xl:gap-16">
        <DesktopSidebar />
        <PhoneFrame>{phoneContent}</PhoneFrame>
      </div>
    </div>
  );
}
