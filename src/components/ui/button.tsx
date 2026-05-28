import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "spotify";
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  fullWidth = true,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-[14px] font-extrabold text-[15px] cursor-pointer font-[family-name:var(--font-body)] transition-all duration-200 tracking-tight",
        fullWidth && "w-full",
        variant === "primary" &&
          "py-[15px] px-6 text-white bg-gradient-to-br from-sm-accent to-sm-glow shadow-[0_0_26px_var(--color-sm-glow-44),0_4px_14px_var(--color-sm-accent-44)] hover:shadow-[0_0_36px_var(--color-sm-glow-66)] active:scale-[0.98]",
        variant === "secondary" &&
          "py-[13px] px-4 text-sm-muted bg-sm-glass border border-sm-border backdrop-blur-lg hover:border-sm-border-hi hover:text-sm-text",
        variant === "spotify" &&
          "py-[15px] px-6 text-white bg-[#1DB954] shadow-[0_4px_24px_rgba(29,185,84,0.33)] hover:bg-[#1ed760] active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
