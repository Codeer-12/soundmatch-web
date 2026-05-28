"use client";

import { useState, useEffect } from "react";

interface ParticlesProps {
  count?: number;
}

const FLOAT_ANIMS = ["float-0", "float-1", "float-2", "float-3", "float-4"];

// Seeded pseudo-random number generator (deterministic)
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: seededRandom(i * 7 + 1) * 100,
    y: seededRandom(i * 13 + 2) * 100,
    size: 1 + seededRandom(i * 17 + 3) * 2.2,
    dur: 4 + seededRandom(i * 23 + 4) * 6,
    delay: seededRandom(i * 29 + 5) * 6,
    opacity: 0.05 + seededRandom(i * 31 + 6) * 0.18,
    anim: FLOAT_ANIMS[i % FLOAT_ANIMS.length],
  }));
}

export function Particles({ count = 32 }: ParticlesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const particles = generateParticles(count);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-sm-bright"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `${p.anim} ${p.dur}s ${p.delay}s infinite alternate ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}
