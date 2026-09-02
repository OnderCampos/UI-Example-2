import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MembershipActionCard({
  icon,
  title,
  subtle = false,
}: {
  icon: React.ReactNode;
  title: string;
  subtle?: boolean;
}) {
  return (
    <Card
      className={cn(
        "flex min-h-[124px] flex-row items-center gap-5 rounded-[8px] border border-border px-10 py-8 shadow-none",
        subtle ? "bg-muted" : "bg-card"
      )}
    >
      <div className="flex size-[56px] items-center justify-center rounded-full border-2 border-[color:color-mix(in_srgb,var(--primary)_68%,white)] text-[color:color-mix(in_srgb,var(--primary)_68%,white)]">
        {icon}
      </div>
      <h2 className="text-[21px] font-bold tracking-[-0.02em] text-[color:color-mix(in_srgb,var(--primary)_35%,#0b245f)]">
        {title}
      </h2>
    </Card>
  );
}
