import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MembershipActionCardProps {
  icon: LucideIcon;
  title: string;
  active?: boolean;
}

export function MembershipActionCard({
  icon: Icon,
  title,
  active = false,
}: MembershipActionCardProps) {
  return (
    <Card
      className={cn(
        "min-h-[124px] flex-row items-center gap-5 rounded-[8px] border px-10 py-8 shadow-none",
        active ? "border-transparent bg-[#f3f4f6]" : "bg-card"
      )}
    >
      <div className="flex size-[56px] items-center justify-center rounded-full border-2 border-brand-blue text-brand-blue">
        <Icon className="size-6" strokeWidth={1.8} />
      </div>
      <span className="text-[18px] font-bold text-[var(--brand-navy)]">{title}</span>
    </Card>
  );
}
