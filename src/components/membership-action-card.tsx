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
        "flex min-h-[124px] flex-row items-center gap-5 rounded-md border px-10 py-8 shadow-none",
        subtle ? "bg-[#f1f2f6]" : "bg-card"
      )}
    >
      <div className="flex size-[56px] items-center justify-center rounded-full border-2 border-[#3663d8] text-[#3663d8]">
        {icon}
      </div>
      <h2 className="text-[21px] font-bold tracking-[-0.02em] text-[#223b7b]">
        {title}
      </h2>
    </Card>
  );
}
