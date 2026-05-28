interface OnlineDotProps {
  online: boolean;
  small?: boolean;
}

export function OnlineDot({ online, small = false }: OnlineDotProps) {
  if (!online) return null;

  const size = small ? "w-2 h-2" : "w-[11px] h-[11px]";

  return (
    <div
      className={`absolute bottom-0 ${small ? "-right-0.5" : "-right-0.5"} ${size} rounded-full bg-sm-green-glow border-[2.5px] border-sm-bg shadow-[0_0_6px_var(--color-sm-green-glow)]`}
    />
  );
}
