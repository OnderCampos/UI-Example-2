import { AlertTriangle, CreditCard, Search } from "lucide-react";
import { MembershipActionCard } from "@/components/membership-action-card";
import { MembershipResultsTable } from "@/components/membership-results-table";
import { MembershipTopbar } from "@/components/membership-topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <MembershipTopbar />

      <div className="mx-auto max-w-[1032px] px-6 pb-24 pt-6 lg:px-8">
        <section className="grid gap-6 md:grid-cols-2">
          <MembershipActionCard icon={CreditCard} title="New Membership" active />
          <MembershipActionCard icon={AlertTriangle} title="Pending process" />
        </section>

        <Separator className="my-6 bg-border" />

        <section className="px-6 pt-[54px] text-center md:text-left">
          <div className="max-w-[920px]">
            <h1 className="text-[25px] font-[700] tracking-[-0.02em] text-[var(--brand-navy)]">
              Search for membership
            </h1>
            <p className="mt-1 text-[15px] text-[color:rgb(from_var(--brand-navy)_r_g_b_/_0.78)]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s
              last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-[10px]">
            <div className="relative w-full max-w-[445px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" strokeWidth={1.8} />
              <Input
                type="text"
                defaultValue="Treviño"
                className="h-[42px] rounded-[10px] border-input bg-card pl-9 text-sm text-[var(--brand-navy)] shadow-none"
              />
            </div>

            <Button className="h-[36px] rounded-[6px] bg-[var(--brand-navy)] px-6 text-[14px] font-semibold text-white shadow-none hover:bg-[color:rgb(from_var(--brand-navy)_r_g_b_/_0.92)]">
              Search Membership
            </Button>
          </div>

          <div className="mt-[58px]">
            <MembershipResultsTable />
          </div>
        </section>
      </div>
    </main>
  );
}
