import { AlertTriangle, CreditCard } from "lucide-react";

import { MembershipActionCard } from "@/components/membership-action-card";
import { MembershipHeader } from "@/components/membership-header";
import { MembershipResultsTable } from "@/components/membership-results-table";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground" style={{ colorScheme: "light" }}>
      <MembershipHeader />

      <section className="mx-auto w-full max-w-[1080px] px-[58px] pt-[25px] pb-20">
        <div className="grid gap-[22px] md:grid-cols-2">
          <MembershipActionCard title="New Membership" icon={CreditCard} highlighted />
          <MembershipActionCard title="Pending process" icon={AlertTriangle} />
        </div>

        <Separator className="mt-[22px] mb-[54px]" />

        <MembershipResultsTable />
      </section>
    </main>
  );
}
