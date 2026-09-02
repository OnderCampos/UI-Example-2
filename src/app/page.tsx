import { AlertTriangle, CreditCard, Search } from "lucide-react";
import { MembershipActionCard } from "@/components/membership-action-card";
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
          <div className="max-w-[900px]">
            <h1 className="text-[25px] font-[700] tracking-[-0.02em] text-[var(--brand-navy)]">
              Search for membership
            </h1>
            <p className="mt-1 text-[15px] text-[color:rgb(from_var(--brand-navy)_r_g_b_/_0.78)]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s
              last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="relative w-full max-w-[445px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" strokeWidth={1.8} />
              <Input
                type="text"
                defaultValue="Treviño"
                className="h-10 rounded-[10px] border-input bg-card pl-9 text-sm text-[var(--brand-navy)] shadow-none"
              />
            </div>

            <Button
              className="h-9 rounded-[6px] bg-[var(--brand-navy)] px-6 text-[14px] font-semibold text-white shadow-none hover:bg-[color:rgb(from_var(--brand-navy)_r_g_b_/_0.92)]"
            >
              Search Membership
            </Button>
          </div>

          <div className="mt-24 rounded-[2px] bg-[color:rgb(from_var(--brand-navy)_r_g_b_/_0.03)] px-6 py-16 text-center">
            <h2 className="text-[18px] font-[700] text-[var(--brand-navy)]">No matching profiles found</h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[15px] leading-8 text-[color:rgb(from_var(--foreground)_r_g_b_/_0.68)]">
              We couldn&apos;t find any records with the information provided. Please verify the data or
              create a new membership.
            </p>
            <Button
              variant="outline"
              className="mt-6 h-9 rounded-[6px] border-[var(--primary)] bg-transparent px-12 text-[14px] font-semibold text-[var(--primary)] shadow-none hover:bg-[color:rgb(from_var(--primary)_r_g_b_/_0.06)] hover:text-[var(--primary-hover)]"
            >
              Create new membership
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
