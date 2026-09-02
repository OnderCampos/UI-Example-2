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
        "flex min-h-[124px] flex-row items-center gap-5 rounded-[10px] border border-border px-10 py-8 shadow-none",
        subtle ? "bg-[#f1f5f9]" : "bg-card"
      )}
    >
      <div className="flex size-[58px] items-center justify-center rounded-full border-2 border-primary text-primary">
        {icon}
      </div>
      <h2 className="text-[22px] font-bold tracking-[-0.02em] text-[#1f3b82]">
        {title}
      </h2>
    </Card>
  );
}
