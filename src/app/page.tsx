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

      <div className="mx-auto max-w-[1190px] px-6 pb-24 pt-6 lg:px-8">
        <section className="grid gap-6 md:grid-cols-2">
          <MembershipActionCard icon={CreditCard} title="New Membership" active />
          <MembershipActionCard icon={AlertTriangle} title="Pending process" />
        </section>

        <Separator className="my-6 bg-border" />

        <section className="px-[26px] pt-[52px] text-center md:text-left">
          <div className="max-w-[920px]">
            <h1 className="text-[24px] font-bold tracking-[-0.01em] text-[var(--brand-navy)]">
              Search for membership
            </h1>
            <p className="mt-2 max-w-[860px] text-[15px] text-[var(--brand-navy)]/80">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s
              last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-7 flex flex-col items-center gap-5 md:items-center">
            <div className="relative w-full max-w-[445px]">
              <Search className="pointer-events-none absolute left-14 top-1/2 size-5 -translate-y-1/2 text-muted-foreground md:left-4" />
              <Input
                type="text"
                placeholder="Search by name, mobile phone, email or membership number"
                className="h-10 rounded-[10px] border-input bg-card pl-20 text-sm shadow-none placeholder:text-muted-foreground md:pl-10"
              />
            </div>

            <Button
              variant="secondary"
              className="h-9 rounded-[6px] bg-muted px-8 text-sm font-semibold text-muted-foreground shadow-none hover:bg-muted"
            >
              Search Membership
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
