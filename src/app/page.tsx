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

      <section className="mx-auto max-w-[1120px] px-6 pb-24 pt-[22px] lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <MembershipActionCard
            icon={<CreditCard className="size-7" strokeWidth={1.8} />}
            title="New Membership"
            subtle
          />
          <MembershipActionCard
            icon={<AlertTriangle className="size-7" strokeWidth={1.8} />}
            title="Pending process"
          />
        </div>

        <Separator className="my-6 bg-border" />

        <div className="px-6 pt-[58px]">
          <div className="max-w-[930px]">
            <h1 className="text-[25px] font-normal tracking-[-0.03em] text-[#223b7b]">
              Search for membership
            </h1>
            <p className="mt-1.5 text-[14px] leading-6 text-[#425983]">
              Search for an existing profile before creating a new membership. Enter the
              customer&apos;s last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="relative w-full max-w-[446px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                defaultValue="Treviño"
                className="h-10 rounded-md border-border bg-card pl-11 text-sm text-[#475569] shadow-none"
              />
            </div>

            <Button className="h-9 rounded-[6px] bg-[#233f83] px-6 text-[14px] font-semibold text-white shadow-none hover:bg-[#1d356f]">
              Search Membership
            </Button>
          </div>

          <div className="mx-auto mt-6 max-w-[915px] rounded-sm bg-[#f8f8fc] px-8 py-14 text-center">
            <h2 className="text-[20px] font-bold tracking-[-0.03em] text-[#223b7b]">
              No matching profiles found
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-8 text-[#5f6f86]">
              We couldn&apos;t find any records with the information provided. Please verify the
              data or create a new membership.
            </p>
            <Button
              variant="outline"
              className="mt-6 h-9 rounded-[8px] border-[#6c94ea] bg-white px-11 text-[14px] font-semibold text-[#3b82f6] shadow-none hover:bg-[#f8fbff] hover:text-[#2563eb]"
            >
              Create new membership
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
