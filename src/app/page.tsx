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

      <section className="mx-auto max-w-[1120px] px-6 pb-24 pt-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <MembershipActionCard
            icon={<CreditCard className="size-7" strokeWidth={1.75} />}
            title="New Membership"
            subtle
          />
          <MembershipActionCard
            icon={<AlertTriangle className="size-7" strokeWidth={1.75} />}
            title="Pending process"
          />
        </div>

        <Separator className="my-8" />

        <div className="max-w-[920px] px-6 pt-12 md:px-6">
          <h1 className="text-[24px] font-normal tracking-[-0.02em] text-[#1f3b82]">
            Search for membership
          </h1>
          <p className="mt-2 max-w-[860px] text-[14px] text-[#334a7d]">
            Search for an existing profile before creating a new membership.
            Enter the customer&apos;s last name, phone number, email, or
            membership ID.
          </p>

          <div className="mt-7 flex flex-col items-center gap-5">
            <div className="relative w-full max-w-[445px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, mobile phone, email or membership number"
                className="h-10 rounded-[10px] border-border bg-card pl-12 text-sm shadow-none placeholder:text-muted-foreground"
              />
            </div>

            <Button
              variant="secondary"
              className="h-9 rounded-[8px] bg-[#eef2f7] px-6 font-bold text-[#94a3b8] shadow-none hover:bg-[#e5ebf4]"
            >
              Search Membership
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
