// src/components/ui/InsightsCard.tsx
import * as React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Tone = "default" | "success" | "warning";

interface InsightsCardProps {
  label: string;
  value?: string | number;
  hint?: string;
  icon?: React.ReactNode;
  loading?: boolean;
  tone?: Tone;
}

const toneClasses: Record<Tone, string> = {
  default: "",
  success: "text-emerald-500",
  warning: "text-amber-500",
};

export function InsightsCard({
  label,
  value,
  hint,
  icon,
  loading = false,
  tone = "default",
}: InsightsCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
        <div className="text-sm font-medium text-muted-foreground">
          {label}
          </div>
        {icon ? <div className="text-muted-foreground">{icon}</div> : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {loading ? (
          <div className="h-7 w-24 animate-pulse rounded bg-muted" />
        ) : (
          <div
            className={cn(
              "text-2xl font-semibold leading-tight tracking-tight",
              toneClasses[tone]
            )}
          >
            {value ?? "—"}
          </div>
        )}
        {hint ? (
          <p className="text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default InsightsCard;
