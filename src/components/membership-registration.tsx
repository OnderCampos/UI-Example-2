import Image from "next/image";
import { AlertTriangle, CreditCard, Globe, MapPin, Search, WalletCards } from "lucide-react";

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
        "flex min-h-[124px] items-center gap-6 rounded-[10px] border px-11 py-9 text-left transition-colors",
        active
          ? "border-transparent bg-muted"
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
          <div className="hidden items-center gap-8 text-[18px] font-medium md:flex">
            <div className="flex items-center gap-2">
              <MapPin className="size-[16px]" />
              <span className="text-[18px]">Miraflores</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[18px]">🌎</span>
              <span className="text-[18px]">Guatemala</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="size-[17px]" />
              <span className="text-[18px]">English</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[38px] bg-[var(--brand-button)]" />
    </header>
  );
}

export function MembershipRegistration() {
  return (
    <div className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <TopBar />
      <main className="mx-auto max-w-[1200px] px-[60px] pb-16 pt-6">
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

        <div className="mt-6 border-t border-border" />

        <section className="px-6 pt-16">
          <div className="max-w-[860px]">
            <h1 className="text-[25px] font-normal tracking-[-0.02em] text-[var(--brand-button)]">
              Search for membership
            </h1>
            <p className="mt-1 text-[14px] text-[var(--brand-button)]/85">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-7 flex flex-col items-center gap-5">
            <div className="relative w-full max-w-[445px]">
              <Search className="pointer-events-none absolute left-14 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, mobile phone, email or membership number"
                className="h-[42px] rounded-[10px] border-border bg-surface pl-[58px] pr-4 text-[14px] placeholder:text-muted-foreground focus-visible:ring-[2px]"
              />
            </div>
            <Button
              variant="outline"
              className="h-[36px] rounded-[8px] bg-muted px-6 text-[14px] font-semibold text-muted-foreground shadow-none hover:bg-muted hover:text-muted-foreground"
            >
              <WalletCards className="size-4 opacity-0" />
              Search Membership
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
