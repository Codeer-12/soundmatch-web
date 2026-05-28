"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { MatchRing } from "@/components/ui/match-ring";
import { Tag } from "@/components/ui/tag";
import { LiveBadge } from "@/components/ui/live-badge";
import { OnlineDot } from "@/components/ui/online-dot";
import { Button } from "@/components/ui/button";
import { USERS, EVENTS, ME, getMatchColor, formatDistance, type DemoUser } from "@/lib/demo-data";

export function RadarTab() {
  const t = useTranslations("radar");
  const [selected, setSelected] = useState<DemoUser | null>(null);
  const [sweep, setSweep] = useState(0);
  const [filter, setFilter] = useState("alle");

  useEffect(() => {
    const iv = setInterval(() => setSweep((a) => (a + 1.6) % 360), 20);
    return () => clearInterval(iv);
  }, []);

  const visible = filter === "alle" ? USERS : USERS.filter((u) => u.match >= parseInt(filter));

  return (
    <div className="flex flex-col">
      {/* Live banner */}
      <div className="flex items-center gap-2.5 rounded-[13px] px-3.5 py-2.5 mb-3.5 border border-sm-teal-glow/20 bg-gradient-to-r from-sm-teal/10 to-sm-green/5">
        <LiveBadge />
        <span className="text-xs text-sm-teal-glow font-bold flex-1">
          Lea M. · Do I Wanna Know? · <span className="text-sm-muted">50m</span>
        </span>
        <span className="text-xl">🎧</span>
      </div>

      {/* Radar map */}
      <div className="relative w-full pb-[62%] rounded-[20px] border border-sm-border-hi overflow-hidden mb-3.5 flex-shrink-0 shadow-[0_0_50px_rgba(109,40,217,0.1)]"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(46,16,101,0.33) 0%, var(--color-sm-surface) 72%)" }}
      >
        <div className="absolute inset-0">
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full">
            {[22, 44, 66].map((r, i) => (
              <ellipse key={r} cx="50%" cy="50%" rx={`${r / 2}%`} ry={`${r * 0.4}%`}
                fill="none" stroke="var(--color-sm-glow)" strokeWidth={1}
                opacity={0.16 - i * 0.04} strokeDasharray={i === 2 ? "5 5" : "none"}
              />
            ))}
            <line x1="50%" y1="1%" x2="50%" y2="99%" stroke="var(--color-sm-glow)" strokeWidth={0.6} opacity={0.07} />
            <line x1="1%" y1="50%" x2="99%" y2="50%" stroke="var(--color-sm-glow)" strokeWidth={0.6} opacity={0.07} />
          </svg>

          {/* Sweep line */}
          <div
            className="absolute left-1/2 top-1/2 w-0.5 h-1/2 origin-[0%_0%]"
            style={{
              transform: `rotate(${sweep}deg)`,
              background: "linear-gradient(to top, rgba(139,92,246,0.66), transparent)",
            }}
          />

          {/* Me */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[5]">
            <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-sm-accent to-sm-glow flex items-center justify-center text-[22px] shadow-[0_0_30px_var(--color-sm-glow)] border-[2.5px] border-sm-text">
              ⭐
            </div>
          </div>

          {/* Users */}
          {visible.map((u) => {
            const col = getMatchColor(u.match);
            const isSel = selected?.id === u.id;
            return (
              <div
                key={u.id}
                onClick={() => setSelected(isSel ? null : u)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-[3]"
                style={{ left: `${u.x}%`, top: `${u.y}%` }}
              >
                <div
                  className="absolute -inset-2 rounded-full animate-ping-ring"
                  style={{ border: `1.5px solid ${col}`, opacity: u.online ? 0.65 : 0.15 }}
                />
                <div
                  className="rounded-full bg-sm-card flex items-center justify-center transition-all duration-250"
                  style={{
                    width: isSel ? 46 : 36, height: isSel ? 46 : 36,
                    border: `2.5px solid ${col}`,
                    fontSize: isSel ? 19 : 14,
                    boxShadow: `0 0 ${isSel ? 24 : 11}px ${col}88`,
                    opacity: u.online ? 1 : 0.55,
                    transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  {u.avatar}
                </div>
                <div
                  className="absolute top-[112%] left-1/2 -translate-x-1/2 bg-sm-surface rounded-md px-1.5 py-0.5 text-[9px] font-extrabold whitespace-nowrap mt-1 font-[family-name:var(--font-mono)]"
                  style={{ border: `1px solid ${col}33`, color: col }}
                >
                  {u.match}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 mb-3 overflow-x-auto">
        {[["alle", "Alle"], ["70", "70%+"], ["80", "80%+"], ["90", "90%+"]].map(([v, lb]) => (
          <button
            key={v}
            onClick={() => setFilter(v)}
            className="px-3.5 py-1.5 rounded-full text-[11px] font-bold cursor-pointer whitespace-nowrap transition-all duration-200"
            style={{
              border: `1px solid ${filter === v ? "var(--color-sm-glow)" : "var(--color-sm-border)"}`,
              background: filter === v ? "rgba(139,92,246,0.1)" : "transparent",
              color: filter === v ? "var(--color-sm-glow)" : "var(--color-sm-muted)",
            }}
          >
            {lb}
          </button>
        ))}
        <span className="text-[10px] text-sm-muted font-[family-name:var(--font-mono)] flex items-center ml-auto whitespace-nowrap">
          {visible.length} {t("filters.visible", { count: visible.length })}
        </span>
      </div>

      {/* Selected card */}
      {selected && (
        <div className="glass rounded-[17px] border border-sm-glow/25 p-4 mb-3.5 animate-fade-up shadow-[0_0_28px_rgba(139,92,246,0.08)]">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <span className="text-[34px]">{selected.avatar}</span>
              <OnlineDot online={selected.online} />
            </div>
            <div className="flex-1">
              <div className="font-extrabold text-[15px] font-[family-name:var(--font-display)]">{selected.name}</div>
              <div className="text-[11px] text-sm-muted mt-0.5">🎵 {selected.song} · {selected.songArtist}</div>
              <div className="text-[11px] text-sm-muted">📍 {formatDistance(selected.dist)}</div>
            </div>
            <MatchRing score={selected.match} size={70} />
          </div>
          <div className="flex gap-1.5 flex-wrap mt-2.5">
            {selected.genres.map((g) => (
              <Tag key={g} small>{g}</Tag>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <Button className="flex-1 !py-2.5">♫ {t("viewMatch")}</Button>
            <Button variant="secondary" fullWidth={false} className="!px-3.5 !py-2.5" onClick={() => setSelected(null)}>
              ✕
            </Button>
          </div>
        </div>
      )}

      {/* Nearby list */}
      <div className="text-[9px] font-bold text-sm-muted mb-2.5 tracking-[2px] font-[family-name:var(--font-mono)]">
        {t("nearby")}
      </div>
      {[...visible].sort((a, b) => a.dist - b.dist).map((u) => {
        const col = getMatchColor(u.match);
        const isSel = selected?.id === u.id;
        return (
          <div
            key={u.id}
            onClick={() => setSelected(isSel ? null : u)}
            className="flex items-center gap-3 py-3 px-3.5 rounded-[13px] cursor-pointer mb-1 transition-all duration-200"
            style={{
              background: isSel ? "var(--color-sm-glass)" : "transparent",
              border: `1px solid ${isSel ? "rgba(139,92,246,0.2)" : "transparent"}`,
              backdropFilter: isSel ? "blur(8px)" : "none",
            }}
          >
            <div className="relative">
              <span className="text-2xl">{u.avatar}</span>
              <OnlineDot online={u.online} small />
            </div>
            <div className="flex-1">
              <div className="font-bold text-[13px]">{u.name}</div>
              <div className="text-[11px] text-sm-muted">🎵 {u.song} · {formatDistance(u.dist)}</div>
            </div>
            <div className="font-black text-[15px] font-[family-name:var(--font-mono)]" style={{ color: col }}>
              {u.match}%
            </div>
          </div>
        );
      })}

      {/* Events */}
      <div className="text-[9px] font-bold text-sm-muted mb-2.5 mt-5 tracking-[2px] font-[family-name:var(--font-mono)]">
        {t("events")}
      </div>
      {EVENTS.map((ev, i) => (
        <div
          key={i}
          className="glass rounded-[13px] border border-sm-border p-3 mb-2.5 flex gap-3 items-center"
        >
          <span className="text-[26px]">{ev.icon}</span>
          <div className="flex-1">
            <div className="font-bold text-[13px]">{ev.name}</div>
            <div className="text-[11px] text-sm-muted">{ev.dist} · {ev.time}</div>
            <div className="text-[10px] text-sm-teal-glow mt-0.5">💡 {ev.tip}</div>
          </div>
          <Tag color="var(--color-sm-teal-glow)" small>{ev.tag}</Tag>
        </div>
      ))}
    </div>
  );
}
