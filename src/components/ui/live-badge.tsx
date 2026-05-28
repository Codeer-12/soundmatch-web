export function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-extrabold font-[family-name:var(--font-mono)] tracking-widest bg-sm-pink-glow/10 border border-sm-pink-glow/25 text-sm-pink-glow">
      <span className="w-[5px] h-[5px] rounded-full bg-sm-pink-glow animate-live-pulse" />
      LIVE
    </span>
  );
}
