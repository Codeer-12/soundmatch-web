"use client";

import { useState, useEffect } from "react";
import { getMatchColor } from "@/lib/demo-data";

interface MatchRingProps {
  score: number;
  size?: number;
  animate?: boolean;
  className?: string;
}

export function MatchRing({ score, size = 88, animate = false, className }: MatchRingProps) {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : score);
  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = (displayValue / 100) * circumference;
  const color = getMatchColor(displayValue);

  useEffect(() => {
    if (!animate) {
      setDisplayValue(score);
      return;
    }

    let startTime: number | null = null;
    const animateStep = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1800, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(animateStep);
    };

    requestAnimationFrame(animateStep);
  }, [animate, score]);

  return (
    <svg
      width={size}
      height={size}
      className={className}
      style={{ transform: "rotate(-90deg)", flexShrink: 0 }}
    >
      {/* Background ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-sm-dim)"
        strokeWidth={5.5}
      />
      {/* Glow ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius - 2}
        fill="none"
        stroke={`${color}18`}
        strokeWidth={10}
      />
      {/* Score ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={5.5}
        strokeDasharray={`${dashOffset} ${circumference}`}
        strokeLinecap="round"
        style={{
          filter: `drop-shadow(0 0 9px ${color}cc)`,
          transition: "stroke-dasharray 0.04s linear",
        }}
      />
      {/* Score text */}
      <text
        x={size / 2}
        y={size / 2 + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize={size * 0.165}
        fontWeight="900"
        style={{
          transform: "rotate(90deg)",
          transformOrigin: `${size / 2}px ${size / 2}px`,
          fontFamily: "monospace",
        }}
      >
        {displayValue}%
      </text>
    </svg>
  );
}
