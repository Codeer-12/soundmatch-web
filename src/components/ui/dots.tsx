interface DotsProps {
  total: number;
  current: number;
}

export function Dots({ total, current }: DotsProps) {
  return (
    <div className="flex gap-1.5 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-1 rounded-sm transition-all duration-400"
          style={{
            width: i === current ? 22 : 5,
            background: i === current ? "var(--color-sm-glow)" : "var(--color-sm-dim)",
            boxShadow: i === current ? "0 0 8px var(--color-sm-glow)" : "none",
          }}
        />
      ))}
    </div>
  );
}
