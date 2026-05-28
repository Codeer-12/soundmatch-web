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

/* ────────────────────────────────────────
   Onboarding Layout — works on web + mobile
──────────────────────────────────────── */
function OnboardingLayout() {
  const { onboardingStep, nextOnboarding, prevOnboarding } = useAppStore();
  const Screen = ONBOARDING_SCREENS[onboardingStep];

  return (
    <div className="min-h-screen bg-sm-bg text-sm-text flex flex-col font-[family-name:var(--font-body)]">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[5%] right-[10%] w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(8,145,178,0.12) 0%, transparent 70%)" }}
        />
      </div>

      {/* Centered content column */}
      <div className="relative z-10 flex-1 flex flex-col w-full max-w-md mx-auto px-5">
        <div key={onboardingStep} className="flex-1 flex flex-col animate-fade-up">
          {onboardingStep > 0 && (
            <div className="pt-6 flex items-center justify-between">
              <button
                onClick={prevOnboarding}
                className="bg-transparent border-none text-sm-muted text-[22px] cursor-pointer p-1 hover:text-sm-text transition-colors"
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
    </div>
  );
}

/* ────────────────────────────────────────
   Desktop Sidebar Navigation
──────────────────────────────────────── */
function DesktopSidebar() {
  const t = useTranslations("nav");
  const { activeTab, setActiveTab, restart } = useAppStore();

  return (
    <aside className="hidden lg:flex flex-col w-[260px] xl:w-[280px] flex-shrink-0 h-screen sticky top-0 border-r border-sm-border bg-sm-surface/40 backdrop-blur-xl">
      {/* Logo */}
      <div className="px-6 pt-7 pb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sm-accent via-sm-glow to-sm-teal/70 flex items-center justify-center text-xl shadow-[0_0_24px_rgba(139,92,246,0.4)]">
            ♫
          </div>
          <div>
            <div className="text-lg font-black tracking-tight font-[family-name:var(--font-display)] gradient-text leading-none">
              Soundmatch
            </div>
            <div className="text-[10px] text-sm-muted mt-1 font-[family-name:var(--font-mono)] uppercase tracking-wider">
              {ME.city}
            </div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 flex flex-col gap-1">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border-none cursor-pointer text-left transition-all duration-200 font-semibold text-sm font-[family-name:var(--font-body)] group"
              style={{
                background: isActive
                  ? "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(124,58,237,0.08))"
                  : "transparent",
                color: isActive ? "var(--color-sm-text)" : "var(--color-sm-muted)",
                boxShadow: isActive ? "inset 0 0 0 1px rgba(139,92,246,0.3)" : "none",
              }}
            >
              <span
                className="text-lg w-6 text-center transition-transform"
                style={{ color: isActive ? "var(--color-sm-glow)" : "var(--color-sm-muted)" }}
              >
                {tab.icon}
              </span>
              <span className="capitalize">{t(tab.label)}</span>
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sm-glow shadow-[0_0_8px_var(--color-sm-glow)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User card at bottom */}
      <div className="p-4 border-t border-sm-border">
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-sm-card/60 transition-colors cursor-pointer">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sm-accent to-sm-glow flex items-center justify-center text-lg">
              ⭐
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-sm-green-glow border-2 border-sm-bg" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold truncate">{ME.name}</div>
            <div className="text-[10px] text-sm-muted font-[family-name:var(--font-mono)]">online</div>
          </div>
        </div>
        <button
          onClick={restart}
          className="w-full mt-2 text-[11px] text-sm-muted hover:text-sm-text border border-sm-border rounded-lg py-2 cursor-pointer transition-colors"
        >
          ↺ Demo neu starten
        </button>
      </div>
    </aside>
  );
}

/* ────────────────────────────────────────
   Mobile Bottom Tab Bar
──────────────────────────────────────── */
function MobileTabBar() {
  const t = useTranslations("nav");
  const { activeTab, setActiveTab } = useAppStore();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-sm-border bg-sm-bg/95 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around px-2 py-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center justify-center gap-1 px-2 py-1.5 rounded-xl border-none cursor-pointer min-w-[56px] transition-all duration-200"
              style={{
                background: isActive ? "rgba(139,92,246,0.12)" : "transparent",
                color: isActive ? "var(--color-sm-glow)" : "var(--color-sm-muted)",
              }}
            >
              <span className="text-lg leading-none">{tab.icon}</span>
              <span className="text-[9px] font-bold tracking-wide capitalize">{t(tab.label)}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ────────────────────────────────────────
   Mobile Top Header
──────────────────────────────────────── */
function MobileHeader() {
  const onlineCount = USERS.filter((u) => u.online).length;
  const nearbyCount = USERS.filter((u) => u.dist < 500).length;

  return (
    <header className="lg:hidden sticky top-0 z-20 px-5 pt-4 pb-3 bg-gradient-to-b from-sm-bg via-sm-bg/95 to-transparent">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-black tracking-tight font-[family-name:var(--font-display)] gradient-text">
            ♫ Soundmatch
          </div>
          <div className="text-[10px] text-sm-muted mt-0.5 font-[family-name:var(--font-mono)]">
            {ME.city} · {onlineCount} online · {nearbyCount} in 500m
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-sm-green-glow shadow-[0_0_8px_var(--color-sm-green-glow)] animate-live-pulse" />
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sm-accent to-sm-glow flex items-center justify-center text-base shadow-[0_0_14px_rgba(139,92,246,0.4)] cursor-pointer">
            ⭐
          </div>
        </div>
      </div>
    </header>
  );
}

/* ────────────────────────────────────────
   Desktop Content Header
──────────────────────────────────────── */
function DesktopHeader() {
  const t = useTranslations("nav");
  const { activeTab } = useAppStore();
  const onlineCount = USERS.filter((u) => u.online).length;
  const nearbyCount = USERS.filter((u) => u.dist < 500).length;

  return (
    <div className="hidden lg:flex items-center justify-between px-10 pt-8 pb-6 border-b border-sm-border">
      <div>
        <h1 className="text-3xl font-black tracking-tight font-[family-name:var(--font-display)] capitalize">
          {t(activeTab)}
        </h1>
        <div className="text-xs text-sm-muted mt-1 font-[family-name:var(--font-mono)]">
          {ME.city} · {onlineCount} online · {nearbyCount} in 500m
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sm-card border border-sm-border">
          <div className="w-2 h-2 rounded-full bg-sm-green-glow shadow-[0_0_8px_var(--color-sm-green-glow)] animate-live-pulse" />
          <span className="text-xs font-bold text-sm-green-glow font-[family-name:var(--font-mono)]">LIVE</span>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────
   Tab Content Router
──────────────────────────────────────── */
function TabContent() {
  const { activeTab } = useAppStore();

  return (
    <div key={activeTab} className="animate-fade-up">
      {activeTab === "radar" && <RadarTab />}
      {activeTab === "matches" && <ComingSoon icon="♫" label="Matches" />}
      {activeTab === "radio" && <ComingSoon icon="▶" label="Radio" />}
      {activeTab === "creators" && <ComingSoon icon="★" label="Creator" />}
      {activeTab === "profile" && <ComingSoon icon="👤" label="Profil" />}
    </div>
  );
}

function ComingSoon({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 text-sm-muted">
      <div className="text-6xl mb-6 opacity-60">{icon}</div>
      <h2 className="text-2xl font-black font-[family-name:var(--font-display)] text-sm-text mb-2">
        {label}
      </h2>
      <p className="text-sm">Dieser Tab kommt als Nächstes.</p>
    </div>
  );
}

/* ────────────────────────────────────────
   Main App Layout
──────────────────────────────────────── */
function MainApp() {
  return (
    <div className="min-h-screen bg-sm-bg text-sm-text font-[family-name:var(--font-body)] flex">
      {/* Ambient bg on desktop */}
      <div className="hidden lg:block fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute top-[-10%] right-[10%] w-[700px] h-[700px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(109,40,217,0.25) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(8,145,178,0.18) 0%, transparent 70%)" }}
        />
      </div>

      <DesktopSidebar />

      {/* Main content area */}
      <main className="flex-1 min-w-0 relative z-10 flex flex-col">
        <MobileHeader />
        <DesktopHeader />

        <div className="flex-1 px-4 lg:px-10 py-4 lg:py-8 pb-24 lg:pb-12">
          <div className="max-w-5xl mx-auto w-full">
            <TabContent />
          </div>
        </div>
      </main>

      <MobileTabBar />
    </div>
  );
}

/* ────────────────────────────────────────
   AppShell (entry point)
──────────────────────────────────────── */
export function AppShell() {
  const { phase } = useAppStore();

  if (phase === "onboarding") return <OnboardingLayout />;
  return <MainApp />;
}
