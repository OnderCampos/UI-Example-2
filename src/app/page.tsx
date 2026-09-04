import { CircleAlert, CreditCard, Globe, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary text-primary">
        {icon}
      </div>
      <span className="text-[clamp(1.6rem,2vw,2.05rem)] font-bold tracking-[-0.02em] text-[color:var(--brand-blue)]">
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

        <section className="px-6 pt-12 md:px-6">
          <div className="max-w-[900px]">
            <h1 className="text-[46px] font-normal leading-[1.1] tracking-[-0.03em] text-[color:var(--brand-blue)]">
              Search for membership
            </h1>
            <p className="mt-3 max-w-[840px] text-[16px] leading-6 text-muted-foreground">
              Search for an existing profile before creating a new membership. Enter the
              customer&apos;s last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-5">
            <div className="relative w-full max-w-[445px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, mobile phone, email or membership number"
                className="h-10 rounded-[var(--radius-md)] border-border bg-card pl-12 text-[15px] shadow-none placeholder:text-[color:var(--placeholder)]"
              />
            </div>
            <Button
              variant="secondary"
              className="h-10 rounded-[var(--radius-md)] bg-[color:var(--button-muted)] px-8 text-[15px] font-semibold text-[color:var(--button-muted-foreground)] shadow-none hover:bg-[color:var(--button-muted-hover)]"
            >
              Search Membership
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}
