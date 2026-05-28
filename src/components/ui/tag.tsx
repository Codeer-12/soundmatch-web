import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  color?: string;
  small?: boolean;
  className?: string;
}

export function Tag({ children, color = "var(--color-sm-glow)", small = false, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-bold font-[family-name:var(--font-body)]",
        small ? "px-2 py-0.5 text-[10px]" : "px-3 py-0.5 text-[11px]",
        className
      )}
      style={{
        background: `${color}14`,
        border: `1px solid ${color}2e`,
        color,
      }}
    >
      {children}
    </span>
  );
}
