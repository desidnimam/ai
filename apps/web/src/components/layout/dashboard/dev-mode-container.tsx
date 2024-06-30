import { cn } from "@designali/ui";

export default function DevModeContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative -m-2 rounded-lg border-2 border-destructive/80 p-2",
        className,
      )}
    >
      <p className="absolute -top-2 left-3 bg-background px-1 text-xs font-medium uppercase text-destructive">
        dev mode
      </p>
      {children}
    </div>
  );
}
