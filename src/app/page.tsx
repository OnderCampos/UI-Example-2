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

      <section className="mx-auto w-full max-w-[1080px] px-[60px] pt-[23px] pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          <MembershipActionCard title="New Membership" icon={CreditCard} highlighted />
          <MembershipActionCard title="Pending process" icon={AlertTriangle} />
        </div>

        <Separator className="mt-[23px] mb-[58px]" />

        <div className="px-6">
          <div className="max-w-[880px]">
            <h1 className="text-[24px] font-normal tracking-[-0.02em] text-[var(--brand-header)]">
              Search for membership
            </h1>
            <p className="mt-[6px] max-w-[860px] text-[14px] leading-6 text-[var(--brand-copy)]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-[22px] flex flex-col items-center">
            <div className="relative w-full max-w-[446px]">
              <Search className="pointer-events-none absolute top-1/2 left-4 size-[17px] -translate-y-1/2 text-muted-foreground" strokeWidth={2} />
              <Input
                type="text"
                defaultValue="Treviño"
                aria-label="Search membership"
                className="h-[40px] rounded-[var(--radius-md)] border-[var(--color-border)] bg-card pl-11 text-[14px] text-[var(--brand-copy)] shadow-none focus-visible:ring-0"
              />
            </div>

            <Button className="mt-[14px] h-[36px] rounded-[8px] bg-[var(--brand-header)] px-5 text-[14px] font-semibold text-white shadow-none hover:bg-[var(--brand-header)]/95">
              Search Membership
            </Button>
          </div>

          <div className="mt-[25px] rounded-[2px] bg-[#F8F8FA] px-6 py-[26px] text-center">
            <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-[var(--brand-header)]">
              No matching profiles found
            </h2>
            <p className="mx-auto mt-[14px] max-w-[620px] text-[16px] leading-8 text-[var(--brand-copy)]">
              We couldn&apos;t find any records with the information provided. Please verify the data or create a new membership.
            </p>
            <Button
              variant="outline"
              className="mt-[20px] h-[36px] rounded-[8px] border-[#6AA0FF] bg-transparent px-[20px] text-[14px] font-semibold text-[#3B82F6] shadow-none hover:bg-transparent hover:text-[#3B82F6]"
            >
              Create new membership
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
