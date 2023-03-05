import { cn } from "@/lib/utils";

export const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      "rounded-full bg-slate-500/40 px-1.5 py-0.5 text-xs",
      className
    )}
  >
    {children}
  </span>
);
