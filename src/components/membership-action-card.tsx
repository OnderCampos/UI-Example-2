import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface MembershipActionCardProps {
  title: string;
  icon: LucideIcon;
  subtle?: boolean;
}

export function MembershipActionCard({
  title,
  icon: Icon,
  subtle = false,
}: MembershipActionCardProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-31 w-full items-center gap-8 rounded-lg border px-12 text-left transition-transform duration-150 hover:-translate-y-0.5",
        subtle
          ? "border-[#d7dce8] bg-[#f3f4f6]"
          : "border-[#cfd5e3] bg-white"
      )}
    >
      <span className="flex size-14 items-center justify-center rounded-full border-2 border-[#2d59d8] text-[#2d59d8]">
        <Icon className="size-7 stroke-[1.75]" />
      </span>
      <span className="text-[22px] font-semibold text-[#233a7a]">{title}</span>
    </button>
  );
}
