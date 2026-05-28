import { create } from "zustand";

type Phase = "onboarding" | "app";
type Tab = "radar" | "matches" | "radio" | "creators" | "profile";

interface AppState {
  // Navigation
  phase: Phase;
  onboardingStep: number;
  activeTab: Tab;

  // Actions
  setPhase: (phase: Phase) => void;
  nextOnboarding: () => void;
  prevOnboarding: () => void;
  setOnboardingStep: (step: number) => void;
  setActiveTab: (tab: Tab) => void;
  restart: () => void;
}

export const ONBOARDING_TOTAL = 5;

export const useAppStore = create<AppState>((set) => ({
  phase: "onboarding",
  onboardingStep: 0,
  activeTab: "radar",

  setPhase: (phase) => set({ phase }),
  nextOnboarding: () =>
    set((state) => {
      if (state.onboardingStep < ONBOARDING_TOTAL - 1) {
        return { onboardingStep: state.onboardingStep + 1 };
      }
      return { phase: "app" };
    }),
  prevOnboarding: () =>
    set((state) => ({
      onboardingStep: Math.max(0, state.onboardingStep - 1),
    })),
  setOnboardingStep: (step) => set({ onboardingStep: step }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  restart: () =>
    set({
      phase: "onboarding",
      onboardingStep: 0,
      activeTab: "radar",
    }),
}));
