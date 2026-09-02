import Image from "next/image";
import { AlertTriangle, CreditCard, Globe, MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ActionTileProps = {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
};

function ActionTile({ title, icon, active = false }: ActionTileProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex min-h-[124px] items-center gap-6 rounded-[var(--radius-md)] border px-11 py-9 text-left transition-colors",
        active
          ? "border-transparent bg-[#f1f1f3]"
          : "border-border bg-surface hover:bg-muted/50",
      )}
    >
      <span className="flex size-[56px] shrink-0 items-center justify-center rounded-full border-2 border-[var(--brand-button)] text-[var(--brand-button)]">
        {icon}
      </span>
      <span className="text-[20px] font-bold tracking-[-0.02em] text-[var(--brand-button)]">{title}</span>
    </button>
  );
}

function TopBar() {
  return (
    <header>
      <div className="bg-[var(--brand-header)] text-white">
        <div className="mx-auto flex h-[60px] w-full max-w-[1200px] items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/next.svg"
              alt="PriceSmart"
              width={118}
              height={24}
              className="h-auto w-[118px] brightness-0 invert"
            />
          </div>
          <div className="hidden items-center gap-8 text-[15px] font-medium md:flex">
            <div className="flex items-center gap-2">
              <MapPin className="size-[16px]" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[15px]">🌐</span>
              <span>Guatemala</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="size-[17px]" />
              <span>English</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[39px] bg-[var(--brand-button)]" />
    </header>
  );
}

export function MembershipRegistration() {
  return (
    <div className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <TopBar />
      <main className="mx-auto max-w-[1200px] px-[60px] pb-16 pt-[23px]">
        <section className="grid gap-6 md:grid-cols-2">
          <ActionTile
            title="New Membership"
            active
            icon={<CreditCard className="size-[28px] stroke-[1.8]" />}
          />
          <ActionTile
            title="Pending process"
            icon={<AlertTriangle className="size-[28px] stroke-[1.8]" />}
          />
        </section>

        <div className="mt-[22px] border-t border-border" />

        <section className="px-6 pb-6 pt-[56px]">
          <div className="max-w-[920px]">
            <h1 className="text-[25px] font-normal tracking-[-0.02em] text-[var(--brand-button)]">
              Search for membership
            </h1>
            <p className="mt-[2px] text-[14px] text-[var(--brand-button)]/85">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-[22px] flex flex-col items-center gap-[14px]">
            <div className="relative w-full max-w-[445px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                defaultValue="Treviño"
                className="h-[40px] rounded-[var(--radius-md)] border-border bg-surface pl-9 pr-4 text-[14px] text-[var(--brand-button)] shadow-none placeholder:text-muted-foreground focus-visible:ring-[2px]"
              />
            </div>
            <Button className="h-[36px] rounded-[8px] bg-[var(--brand-button)] px-6 text-[14px] font-semibold text-white shadow-none hover:bg-[var(--brand-button-hover)]">
              Search Membership
            </Button>
          </div>

          <div className="mt-[56px] rounded-[2px] bg-[#f8f8fb] px-6 py-[23px] text-center">
            <h2 className="text-[22px] font-bold tracking-[-0.02em] text-[var(--brand-button)]">
              No matching profiles found
            </h2>
            <p className="mx-auto mt-[12px] max-w-[590px] text-[16px] text-muted-foreground">
              We couldn&apos;t find any records with the information provided. Please verify the data or create a new membership.
            </p>
            <Button
              variant="outline"
              className="mt-[24px] h-[36px] rounded-[8px] border-[var(--primary)] bg-white px-6 text-[14px] font-semibold text-[var(--primary)] shadow-none hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
            >
              Create new membership
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
