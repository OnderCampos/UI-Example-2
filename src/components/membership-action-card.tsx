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
        "justify-center gap-0 rounded-[var(--radius-lg)] border border-border px-8 py-6 shadow-none",
        highlighted ? "bg-[#F1F2F4]" : "bg-card"
      )}
    >
      <div className="flex items-center justify-center gap-5 md:justify-start">
        <div className="flex size-14 items-center justify-center rounded-full border-2 border-[var(--brand-header-secondary)] text-[var(--brand-header-secondary)]">
          <Icon className="size-7" strokeWidth={1.8} />
        </div>
        <span className="text-[22px] font-bold tracking-[-0.02em] text-[var(--brand-header)]">
          {title}
        </span>
      </div>
    </Card>
  );
}
