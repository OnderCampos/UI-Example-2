import { CircleAlert, CreditCard, Globe, MapPin, Search, UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function MembershipActionCard({
  icon,
  title,
  emphasized = false,
}: {
  icon: React.ReactNode;
  title: string;
  emphasized?: boolean;
}) {
  return (
    <Card
      className={[
        "min-h-[124px] flex-row items-center gap-5 rounded-[var(--radius-panel)] border border-border px-10 py-8 shadow-none",
        emphasized ? "bg-[color:var(--surface-muted)]" : "bg-card",
      ].join(" ")}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[color:var(--brand-blue)] text-[color:var(--brand-blue)]">
        {icon}
      </div>
      <span className="text-[clamp(1.55rem,2vw,2.05rem)] font-bold tracking-[-0.02em] text-[color:var(--brand-blue)]">
        {title}
      </span>
    </Card>
  );
}

function TopBar() {
  return (
    <header className="w-full">
      <div className="bg-[color:var(--navy)] text-white">
        <div className="mx-auto flex h-[60px] w-full max-w-[1060px] items-center justify-between px-6 lg:px-4">
          <div className="flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.02em]">
            <span className="relative inline-flex h-5 w-5 items-center justify-center text-[color:var(--brand-orange)]">
              <span className="absolute text-[18px] leading-none">✶</span>
            </span>
            <span>PriceSmart</span>
          </div>
          <div className="flex items-center gap-7 text-sm font-medium text-white/95">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Guatemala</span>
              <span className="text-white/70">⌄</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>English</span>
              <span className="text-white/70">⌄</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[39px] bg-[color:var(--brand-blue)]" />
    </header>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopBar />

      <section className="mx-auto flex w-full max-w-[1060px] flex-col px-6 pb-16 pt-6 lg:px-4">
        <div className="grid gap-6 md:grid-cols-2">
          <MembershipActionCard
            emphasized
            icon={<CreditCard className="h-6 w-6 stroke-[1.75]" />}
            title="New Membership"
          />
          <MembershipActionCard
            icon={<CircleAlert className="h-6 w-6 stroke-[1.75]" />}
            title="Pending process"
          />
        </div>

        <Separator className="my-6" />

        <section className="px-6 pt-12">
          <div className="max-w-[900px]">
            <h1 className="text-[24px] font-normal tracking-[-0.02em] text-[color:var(--brand-blue)]">
              Search for membership
            </h1>
            <p className="mt-2 max-w-[850px] text-[15px] leading-6 text-[color:var(--brand-blue)]/85">
              Search for an existing profile before creating a new membership. Enter the
              customer&apos;s last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="relative w-full max-w-[445px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                defaultValue="Treviño"
                className="h-10 rounded-[var(--radius-md)] border-border bg-card pl-12 text-[15px] text-[color:var(--brand-blue)] shadow-none"
              />
            </div>
            <Button
              className="h-9 rounded-[var(--radius-sm)] bg-[color:var(--brand-blue)] px-7 text-[15px] font-semibold text-white shadow-none hover:bg-[color:var(--brand-blue)]/95"
            >
              Search Membership
            </Button>
          </div>

          <Empty className="mt-6 rounded-none border-0 bg-[color:var(--surface-muted)] px-6 py-10 md:px-10 md:py-12">
            <EmptyHeader className="max-w-[560px] gap-4">
              <EmptyTitle className="text-[18px] font-bold text-[color:var(--brand-blue)]">
                No matching profiles found
              </EmptyTitle>
              <EmptyDescription className="text-[16px] leading-8 text-foreground/65">
                We couldn&apos;t find any records with the information provided. Please verify the
                data or create a new membership.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="pt-1">
              <Button
                variant="outline"
                className="h-9 rounded-[var(--radius-sm)] border-[color:var(--primary)] bg-transparent px-11 text-[15px] font-semibold text-[color:var(--primary)] shadow-none hover:bg-[color:var(--secondary)] hover:text-[color:var(--primary)]"
              >
                <UserRoundPlus className="h-4 w-4" />
                Create new membership
              </Button>
            </EmptyContent>
          </Empty>
        </section>
      </section>
    </main>
  );
}
