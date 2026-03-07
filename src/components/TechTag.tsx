import type React from "react";

export default function TechTag({
  icon: Icon,
  label,
  className = "",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`
        border border-border bg-card text-muted-foreground
        flex shrink-0 items-center gap-2 rounded-full px-4 py-2
        ${className}
      `}
    >
      <Icon className="text-primary" />
      <span className="text-foreground whitespace-nowrap font-medium">{label}</span>
    </div>
  );
}
