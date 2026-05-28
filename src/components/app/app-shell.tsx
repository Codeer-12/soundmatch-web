"use client";

import { useTranslations } from "next-intl";
import { useAppStore, ONBOARDING_TOTAL } from "@/stores/app-store";
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

type TabId = "radar" | "matches" | "radio" | "creators" | "profile";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "radar",    label: "radar",    icon: <RadarIcon />    },
  { id: "matches",  label: "matches",  icon: <HeartIcon />    },
  { id: "radio",    label: "radio",    icon: <RadioIcon />    },
  { id: "creators", label: "creators", icon: <SparkleIcon /> },
  { id: "profile",  label: "profile",  icon: <UserIcon />     },
];

/* ────────────────────────────────────────
   Icon set (clean inline SVG)
──────────────────────────────────────── */
function RadarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      <path d="M12 12 L18 6" />
    </svg>
  );
}
function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}
function RadioIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9M19.1 4.9c3.9 3.9 3.9 10.2 0 14.1" />
      <circle cx="12" cy="12" r="2" />
      <path d="M7.8 16.2a6 6 0 010-8.5M16.2 7.8a6 6 0 010 8.5" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <path d="M12 3l1.9 5.3 5.3 1.9-5.3 1.9L12 17.4 10.1 12.1 4.8 10.2l5.3-1.9z" />
      <path d="M19 14l.7 1.7 1.7.7-1.7.7-.7 1.7-.7-1.7-1.7-.7 1.7-.7z" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  );
}
function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <div
      className="rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" className="text-white" style={{ width: size * 0.5, height: size * 0.5 }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm12-2a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
  );
}

/* ────────────────────────────────────────
   Ambient background — used everywhere
──────────────────────────────────────── */
function Ambient() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full opacity-[0.18] blur-[120px]"
           style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }} />
      <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.12] blur-[100px]"
           style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full opacity-[0.10] blur-[120px]"
           style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)" }} />
      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.025]"
           style={{
             backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
             backgroundSize: "60px 60px",
           }} />
    </div>
  );
}

/* ────────────────────────────────────────
   Onboarding Layout — properly centered
──────────────────────────────────────── */
function OnboardingLayout() {
  const { onboardingStep, prevOnboarding } = useAppStore();
  const Screen = ONBOARDING_SCREENS[onboardingStep];
  const { nextOnboarding } = useAppStore();

  return (
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-body)] relative overflow-x-hidden">
      <Ambient />

      {/* Top progress bar (sticky) */}
      <header className="relative z-20 sticky top-0 px-6 lg:px-10 py-5 backdrop-blur-md bg-black/40 border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoMark size={32} />
            <span className="font-[family-name:var(--font-display)] font-black tracking-tight text-base">Soundmatch</span>
          </div>

          {onboardingStep > 0 ? (
            <div className="flex items-center gap-4">
              <ProgressBar step={onboardingStep} total={ONBOARDING_TOTAL} />
              <button
                onClick={prevOnboarding}
                className="text-xs text-white/50 hover:text-white transition-colors px-2 py-1 cursor-pointer"
              >
                Zurück
              </button>
            </div>
          ) : (
            <button
              onClick={() => useAppStore.getState().setPhase("app")}
              className="text-xs text-white/50 hover:text-white transition-colors px-2 py-1 cursor-pointer"
            >
              Überspringen
            </button>
          )}
        </div>
      </header>

      {/* Centered hero stage */}
      <main className="relative z-10 flex items-center justify-center px-6 py-10 lg:py-20 min-h-[calc(100vh-72px)]">
        <div key={onboardingStep} className="w-full max-w-2xl mx-auto animate-fade-up">
          <Screen onNext={nextOnboarding} />
        </div>
      </main>
    </div>
  );
}

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = (step / (total - 1)) * 100;
  return (
    <div className="hidden sm:flex items-center gap-3">
      <span className="text-[10px] font-[family-name:var(--font-mono)] text-white/40 tracking-wider">
        {String(step + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <div className="w-32 h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-400 to-cyan-400 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────
   Desktop Sidebar
──────────────────────────────────────── */
function DesktopSidebar() {
  const t = useTranslations("nav");
  const { activeTab, setActiveTab, restart } = useAppStore();

  return (
    <aside className="hidden lg:flex flex-col w-[240px] flex-shrink-0 h-screen sticky top-0 border-r border-white/[0.06] bg-black/30 backdrop-blur-xl z-20">
      {/* Brand */}
      <div className="px-5 pt-6 pb-8">
        <div className="flex items-center gap-3">
          <LogoMark size={36} />
          <div>
            <div className="font-[family-name:var(--font-display)] font-black tracking-tight text-base leading-none">Soundmatch</div>
            <div className="text-[10px] text-white/40 mt-1 font-[family-name:var(--font-mono)] tracking-wider uppercase">v0.1 Beta</div>
          </div>
        </div>
      </div>

      {/* Section label */}
      <div className="px-5 mb-2">
        <div className="text-[10px] font-[family-name:var(--font-mono)] tracking-[0.2em] text-white/30 uppercase">Discover</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 flex flex-col gap-0.5">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="group flex items-center gap-3 px-3 py-2.5 rounded-xl border-none cursor-pointer text-left transition-all duration-150 font-medium text-[13.5px]"
              style={{
                background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.55)",
              }}
            >
              <span
                className="flex items-center justify-center w-6 h-6 transition-colors"
                style={{ color: isActive ? "#a78bfa" : "rgba(255,255,255,0.5)" }}
              >
                {tab.icon}
              </span>
              <span className="capitalize">{t(tab.label)}</span>
              {isActive && (
                <span className="ml-auto w-1 h-4 rounded-full bg-gradient-to-b from-violet-400 to-cyan-400" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User card */}
      <div className="p-3 border-t border-white/[0.06] mt-2">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
              {ME.name?.[0] ?? "U"}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate text-white">{ME.name}</div>
            <div className="text-[10px] text-white/40 font-[family-name:var(--font-mono)]">{ME.city}</div>
          </div>
        </div>
        <button
          onClick={restart}
          className="w-full mt-2 text-[11px] text-white/40 hover:text-white/80 border border-white/[0.06] hover:border-white/15 rounded-lg py-2 cursor-pointer transition-colors"
        >
          Demo neu starten
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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-white/[0.06] bg-black/85 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around px-2 py-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-xl border-none cursor-pointer min-w-[56px] transition-all duration-150"
              style={{
                color: isActive ? "#a78bfa" : "rgba(255,255,255,0.45)",
              }}
            >
              <span>{tab.icon}</span>
              <span className="text-[9.5px] font-semibold capitalize">{t(tab.label)}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ────────────────────────────────────────
   Mobile Top Bar
──────────────────────────────────────── */
function MobileTopBar() {
  return (
    <header className="lg:hidden sticky top-0 z-20 px-5 pt-5 pb-3 bg-gradient-to-b from-black via-black/95 to-transparent">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LogoMark size={32} />
          <span className="font-[family-name:var(--font-display)] font-black tracking-tight">Soundmatch</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-live-pulse" />
            <span className="text-[10px] font-[family-name:var(--font-mono)] text-emerald-300 font-semibold">LIVE</span>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ────────────────────────────────────────
   Page header (desktop)
──────────────────────────────────────── */
function PageHeader() {
  const t = useTranslations("nav");
  const { activeTab } = useAppStore();
  const onlineCount = USERS.filter((u) => u.online).length;
  const nearbyCount = USERS.filter((u) => u.dist < 500).length;

  return (
    <div className="hidden lg:block px-10 pt-10 pb-6">
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="text-[11px] font-[family-name:var(--font-mono)] tracking-[0.2em] text-white/40 uppercase mb-2">
            {ME.city}
          </div>
          <h1 className="font-[family-name:var(--font-display)] font-black tracking-[-0.03em] text-4xl capitalize text-white">
            {t(activeTab)}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Pill icon={<span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-live-pulse" />}>{onlineCount} online</Pill>
          <Pill>{nearbyCount} in 500m</Pill>
        </div>
      </div>
    </div>
  );
}

function Pill({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-white/70 font-[family-name:var(--font-mono)]">
      {icon}
      <span>{children}</span>
    </div>
  );
}

/* ────────────────────────────────────────
   Tab Content
──────────────────────────────────────── */
function TabContent() {
  const { activeTab } = useAppStore();
  return (
    <div key={activeTab} className="animate-fade-up">
      {activeTab === "radar" && <RadarTab />}
      {activeTab === "matches" && <ComingSoon icon={<HeartIcon />} label="Matches" />}
      {activeTab === "radio" && <ComingSoon icon={<RadioIcon />} label="Radio" />}
      {activeTab === "creators" && <ComingSoon icon={<SparkleIcon />} label="Creators" />}
      {activeTab === "profile" && <ComingSoon icon={<UserIcon />} label="Profil" />}
    </div>
  );
}

function ComingSoon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 text-white/50">
      <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/[0.02] flex items-center justify-center mb-6 [&>svg]:w-7 [&>svg]:h-7 [&>svg]:text-white/60">
        {icon}
      </div>
      <h2 className="text-2xl font-black font-[family-name:var(--font-display)] text-white mb-2 tracking-tight">
        {label}
      </h2>
      <p className="text-sm max-w-xs">Dieser Bereich wird gerade gebaut. Bleib dran.</p>
    </div>
  );
}

/* ────────────────────────────────────────
   Main App Layout
──────────────────────────────────────── */
function MainApp() {
  return (
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-body)] flex relative">
      <Ambient />
      <DesktopSidebar />

      <main className="flex-1 min-w-0 relative z-10 flex flex-col">
        <MobileTopBar />
        <PageHeader />
        <div className="flex-1 px-4 lg:px-10 pb-28 lg:pb-14">
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
   AppShell entry
──────────────────────────────────────── */
export function AppShell() {
  const { phase } = useAppStore();
  if (phase === "onboarding") return <OnboardingLayout />;
  return <MainApp />;
}
