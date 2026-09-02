import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MembershipActionCardProps = {
  title: string;
  icon: LucideIcon;
  highlighted?: boolean;
};

export function MembershipActionCard({
  title,
  icon: Icon,
  highlighted = false,
}: MembershipActionCardProps) {
  return (
    <Card
      className={cn(
        "justify-center rounded-[12px] border border-border px-8 py-[34px] shadow-none",
        highlighted ? "bg-[var(--brand-surface-muted)]" : "bg-card"
      )}
    >
      <div className="flex items-center justify-center gap-5 md:justify-start">
        <div className="flex size-[58px] items-center justify-center rounded-full border-2 border-[var(--brand-header-secondary)] text-[var(--brand-header-secondary)]">
          <Icon className="size-[28px]" strokeWidth={1.75} />
        </div>
        <span className="text-[18px] font-semibold tracking-[-0.02em] text-[var(--brand-header)]">
          {title}
        </span>
      </div>
    </Card>
  );
}
