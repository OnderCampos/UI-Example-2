import { AlertTriangle, CreditCard, Search } from "lucide-react";

import { MembershipActionCard } from "@/components/membership-action-card";
import { MembershipHeader } from "@/components/membership-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground" style={{ colorScheme: "light" }}>
      <MembershipHeader />

      <section className="mx-auto flex w-full max-w-[1080px] flex-col px-[60px] pt-6 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <MembershipActionCard title="New Membership" icon={CreditCard} highlighted />
          <MembershipActionCard title="Pending process" icon={AlertTriangle} />
        </div>

        <Separator className="mt-6 mb-16" />

        <div className="ml-6 max-w-[860px]">
          <h1 className="text-[24px] font-medium tracking-[-0.02em] text-[var(--brand-header)]">
            Search for membership
          </h1>
          <p className="mt-2 max-w-[860px] text-[14px] leading-6 text-[var(--brand-copy)]">
            Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
          </p>

          <div className="mt-7 flex flex-col items-center gap-5">
            <div className="relative w-full max-w-[445px]">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" strokeWidth={2} />
              <Input
                type="text"
                placeholder="Search by name, mobile phone, email or membership number"
                className="h-10 rounded-[var(--radius-md)] border-border bg-card pl-11 text-[14px] text-foreground shadow-none placeholder:text-muted-foreground focus-visible:ring-0"
              />
            </div>

            <Button
              className="h-9 rounded-[var(--radius-md)] bg-secondary px-10 text-[14px] font-semibold text-muted-foreground shadow-none hover:bg-secondary"
            >
              Search Membership
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
