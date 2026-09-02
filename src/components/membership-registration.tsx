import type { ReactNode } from "react";
import Image from "next/image";
import { MapPin, Phone, CircleAlert, ClipboardMinus, UserRound, ChevronDown, Globe, Smartphone, House, CreditCard } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type DetailItemProps = {
  label: string;
  value: string;
  className?: string;
};

function DetailItem({ label, value, className }: DetailItemProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="text-[11px] font-medium uppercase tracking-[0.02em] text-muted-foreground/90">{label}</div>
      <div className="text-[15px] font-medium text-foreground">{value}</div>
    </div>
  );
}

type SectionTitleProps = {
  icon: ReactNode;
  title: string;
};

function SectionTitle({ icon, title }: SectionTitleProps) {
  return (
    <div className="mb-6 flex items-center gap-2 text-[15px] font-semibold text-foreground">
      <span className="text-primary">{icon}</span>
      <h2>{title}</h2>
    </div>
  );
}

type SecondaryMemberCardProps = {
  name: string;
  image?: string;
};

function SecondaryMemberCard({ name, image }: SecondaryMemberCardProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex min-w-[150px] items-center justify-between gap-3 rounded-[12px] border border-border bg-card px-3 py-3 shadow-[0_1px_2px_rgba(15,23,42,0.02)]">
      <div className="flex items-center gap-3">
        <Avatar className="size-9 border border-border/80">
          {image ? <AvatarImage src={image} alt={name} /> : null}
          <AvatarFallback className="bg-muted text-[11px] font-semibold text-muted-foreground">{initials}</AvatarFallback>
        </Avatar>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold text-foreground">{name}</div>
          <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold text-primary">
            <button type="button">Edit</button>
            <span className="h-3 w-px bg-border" />
            <button type="button" className="text-error">Remove</button>
          </div>
        </div>
      </div>
      <CircleAlert className="size-4 text-warning" />
    </div>
  );
}

function TopBar() {
  return (
    <header className="shadow-[inset_0_-1px_0_rgba(15,23,42,0.08)]">
      <div className="bg-[var(--brand-header)] text-white">
        <div className="mx-auto flex h-11 w-full max-w-[1280px] items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[13px] font-semibold tracking-tight">
            <Image src="/next.svg" alt="PriceSmart" width={94} height={22} className="h-auto w-[94px] brightness-0 invert" />
            <span className="sr-only">PriceSmart</span>
          </div>
          <div className="hidden items-center gap-6 text-[12px] font-medium text-white/90 md:flex">
            <div className="flex items-center gap-1.5"><MapPin className="size-3.5" /> Miraflores</div>
            <div className="flex items-center gap-1.5"><Globe className="size-3.5" /> Guatemala <ChevronDown className="size-3.5" /></div>
            <div className="flex items-center gap-1.5"><Globe className="size-3.5" /> English <ChevronDown className="size-3.5" /></div>
          </div>
        </div>
      </div>
      <div className="h-7 bg-primary" />
    </header>
  );
}

function StepRail() {
  return (
    <aside className="w-[170px] shrink-0 border-r border-border px-2 py-2">
      <h1 className="mb-6 text-[42px] font-bold leading-none text-foreground md:hidden">New membership</h1>
      <div className="space-y-5 pt-2">
        <div className="flex items-center gap-3 text-[13px] font-semibold text-foreground">
          <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-[11px] text-background">1</span>
          Membership data
        </div>
        <div className="flex items-center gap-3 text-[13px] font-medium text-muted-foreground/70">
          <span className="flex size-5 items-center justify-center rounded-full border border-border bg-background text-[11px]">2</span>
          Payment
        </div>
      </div>
    </aside>
  );
}

export function MembershipRegistration() {
  return (
    <div className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <TopBar />
      <main className="mx-auto max-w-[1280px] px-5 pb-8 pt-5 lg:px-10">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[18px] font-semibold tracking-tight text-foreground md:text-[19px]">New membership</h1>
          </div>
          <Button variant="outline" className="h-9 rounded-md border-primary/35 px-4 text-[12px] font-semibold text-primary hover:bg-primary/5 hover:text-primary">
            Capture Member ID
          </Button>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
          <div className="flex flex-col md:flex-row">
            <StepRail />
            <section className="flex-1 px-5 py-6 md:px-6 lg:px-8">
              <SectionTitle icon={<ClipboardMinus className="size-4" />} title="Personal data" />
              <div className="grid gap-8 lg:grid-cols-[120px_1fr]">
                <div className="flex flex-col items-center pt-1">
                  <Avatar className="size-[96px] border border-border bg-muted">
                    <AvatarImage src="/Frida.png" alt="Nicolás Treviño" className="object-cover" />
                    <AvatarFallback>NT</AvatarFallback>
                  </Avatar>
                  <button type="button" className="mt-3 text-[11px] font-semibold text-primary">Change picture</button>
                </div>
                <div className="grid gap-y-7 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                  <DetailItem label="ID Type" value="DNI" />
                  <DetailItem label="ID Number" value="IDGTM1234567890123S0123" />
                  <DetailItem label="Membership Type" value="Diamond" />
                  <DetailItem label="Abbreviation" value="Mr." />
                  <DetailItem label="First Name" value="Nicolás" />
                  <DetailItem label="Last Name" value="Treviño" />
                  <DetailItem label="Gender" value="Male" />
                  <DetailItem label="Date of birth" value="13/09/1978" />
                  <DetailItem label="Occupation" value="Urban planner" />
                </div>
              </div>

              <Separator className="my-8" />

              <SectionTitle icon={<Phone className="size-4" />} title="Contact" />
              <div className="grid gap-y-8 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
                <DetailItem label="Email address *" value="Customer declined to provide email address" className="sm:col-span-2 lg:col-span-4" />
                <DetailItem label="Mobile phone number *" value="+502 1234 5678" />
                <div className="hidden lg:block" />
                <div className="flex items-end gap-2 text-warning lg:pb-1"><CircleAlert className="size-4" /></div>
                <DetailItem label="Home phone number *" value="+502 2345 6789" />
                <DetailItem label="Notifications" value="By email address" />
              </div>

              <Separator className="my-8" />

              <SectionTitle icon={<House className="size-4" />} title="Address" />
              <div className="grid gap-y-7 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
                <DetailItem label="Address *" value="Km 46.5 Salida A Ciudad Vieja" className="lg:col-span-2" />
                <DetailItem label="Country" value="Guatemala" />
                <DetailItem label="State" value="Antigua" />
                <DetailItem label="City" value="Sacatepequez" />
              </div>

              <Separator className="my-8" />

              <SectionTitle icon={<UserRound className="size-4" />} title="Secondary memberships" />
              <div className="flex flex-wrap gap-4">
                <SecondaryMemberCard name="Mayra Treviño" image="/Frida.png" />
                <SecondaryMemberCard name="Pablo Treviño" image="/Frida.png" />
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-3 border-t border-border bg-card px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="h-9 rounded-md border-primary/35 px-4 text-[12px] font-semibold text-primary hover:bg-primary/5 hover:text-primary">
                <House className="size-3.5" />
                Go back home
              </Button>
              <Button variant="outline" className="h-9 rounded-md border-primary/35 px-5 text-[12px] font-semibold text-primary hover:bg-primary/5 hover:text-primary">
                Save changes
              </Button>
            </div>
            <Button className="h-10 min-w-[132px] rounded-md bg-[var(--brand-button)] px-6 text-[12px] font-semibold text-white hover:bg-[var(--brand-button-hover)]">
              <CreditCard className="size-3.5" />
              Payment
            </Button>
          </div>
        </div>

        <button type="button" className="fixed right-4 top-[108px] flex size-12 items-center justify-center rounded-xl bg-[var(--brand-button)] text-white shadow-lg">
          <Smartphone className="size-5" />
        </button>
      </main>
    </div>
  );
}
