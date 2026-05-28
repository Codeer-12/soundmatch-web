"use client";

import { useRef } from "react";

interface WaveformProps {
  active?: boolean;
  count?: number;
  color?: string;
  height?: number;
}

const WAVE_ANIMS = ["waveform-1", "waveform-2", "waveform-3", "waveform-4", "waveform-5", "waveform-6"];

export function Waveform({ active = false, count = 7, color = "var(--color-sm-glow)", height = 26 }: WaveformProps) {
  const bars = useRef(
    Array.from({ length: count }, (_, i) => WAVE_ANIMS[i % WAVE_ANIMS.length])
  ).current;

  return (
    <div className="flex items-center gap-[2.5px]" style={{ height }}>
      {bars.map((anim, i) => (
        <div
          key={i}
          className="rounded-sm transition-opacity duration-300"
          style={{
            width: 3,
            background: color,
            height: active ? `${30 + i * 8}%` : "22%",
            opacity: active ? 0.9 : 0.3,
            animation: active
              ? `${anim} ${0.55 + i * 0.12}s ${i * 0.08}s infinite alternate ease-in-out`
              : "none",
          }}
        />
      ))}
    </div>
  );
}
