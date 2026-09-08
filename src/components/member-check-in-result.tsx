"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDot,
  CreditCard,
  Dumbbell,
  Leaf,
  ShieldX,
  Waves,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type MemberCheckInState =
  | "check-in-success"
  | "payment-method-invalid"
  | "membership-cancelled";

export type MemberAmenity = {
  id: string;
  label: string;
  icon: "weights" | "pool" | "recovery" | "basketball";
};

export type MemberCheckInData = {
  name: string;
  memberNumber: string;
  membershipSince: string;
  statusLabel: string;
  statusTone?: "success" | "warning" | "error";
  avatarSrc?: string;
  avatarFallback: string;
  amenities: MemberAmenity[];
};

export type MemberCheckInResultProps = {
  state?: MemberCheckInState;
  member?: MemberCheckInData;
  defaultMemberNumber?: string;
  onSearch?: (memberNumber: string) => void;
};

const amenityIcons = {
  weights: Dumbbell,
  pool: Waves,
  recovery: Leaf,
  basketball: CircleDot,
};

const stateConfig = {
  "check-in-success": {
    title: "Welcome,",
    headlineSuffix: "Check-In Successful",
    heroTone: "success",
    heroIcon: Check,
    footerIcon: Check,
    footerMessage: "Enjoy your workout! Thank you for being a valued member.",
  },
  "payment-method-invalid": {
    title: "Unable to complete check-in for",
    headlineSuffix: "Payment Method Invalid",
    heroTone: "warning",
    heroIcon: CreditCard,
    footerIcon: AlertCircle,
    footerMessage: "Please update your payment method at the front desk.",
  },
  "membership-cancelled": {
    title: "Check-in unavailable for",
    headlineSuffix: "Membership Cancelled",
    heroTone: "error",
    heroIcon: ShieldX,
    footerIcon: AlertCircle,
    footerMessage: "Please speak with staff for membership assistance.",
  },
} as const;

const defaultMember: MemberCheckInData = {
  name: "Sarah Johnson",
  memberNumber: "123456",
  membershipSince: "Jan 15, 2023",
  statusLabel: "Active",
  statusTone: "success",
  avatarSrc: "/Frida.png",
  avatarFallback: "SJ",
  amenities: [
    { id: "weights", label: "Weights", icon: "weights" },
    { id: "pool", label: "Pool", icon: "pool" },
    { id: "recovery", label: "Recovery Room", icon: "recovery" },
    { id: "basketball", label: "Basketball Court", icon: "basketball" },
  ],
};

export function MemberCheckInResult({
  state = "check-in-success",
  member = defaultMember,
  defaultMemberNumber,
  onSearch,
}: MemberCheckInResultProps) {
  const [memberNumber, setMemberNumber] = useState(defaultMemberNumber ?? member.memberNumber);
  const config = stateConfig[state];

  const toneClasses = useMemo(() => {
    switch (config.heroTone) {
      case "warning":
        return {
          banner: "from-[color:var(--warning)] to-[#fbbf24]",
          iconBg: "bg-white/18",
          iconRing: "ring-white/20",
          status: "bg-[color:var(--warning)]/15 text-[color:var(--warning)]",
          footer: "bg-[color:var(--warning)]/10 text-[color:var(--foreground)]",
        };
      case "error":
        return {
          banner: "from-[color:var(--error)] to-[#f87171]",
          iconBg: "bg-white/18",
          iconRing: "ring-white/20",
          status: "bg-[color:var(--error)]/15 text-[color:var(--error)]",
          footer: "bg-[color:var(--error)]/10 text-[color:var(--foreground)]",
        };
      default:
        return {
          banner: "from-[color:var(--success)] to-[#16a34a]",
          iconBg: "bg-white/18",
          iconRing: "ring-white/20",
          status: "bg-[color:var(--success)]/15 text-[color:var(--success)]",
          footer: "bg-[color:var(--success)]/10 text-[color:var(--foreground)]",
        };
    }
  }, [config.heroTone]);

  const HeroIcon = config.heroIcon;
  const FooterIcon = config.footerIcon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-11 max-w-[1100px] items-center justify-between px-4 text-[13px]">
          <div className="font-semibold">Gym Member Check-In</div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Bell className="h-4 w-4" />
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-muted-foreground">
                TB
              </div>
              <div className="hidden leading-tight sm:block">
                <div className="text-[11px] font-medium text-foreground">Team Member</div>
                <div className="text-[10px]">Ops</div>
              </div>
              <ChevronDown className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-[1100px] flex-col px-4 py-5">
        <div className="mx-auto flex w-full max-w-[860px] flex-col gap-4">
          <div className="mx-auto flex w-full max-w-[520px] items-end justify-center gap-2">
            <div className="flex-1">
              <label htmlFor="member-number" className="mb-1.5 block text-center text-[11px] text-muted-foreground">
                Enter Member Number
              </label>
              <Input
                id="member-number"
                value={memberNumber}
                onChange={(event) => setMemberNumber(event.target.value)}
                className="h-9 rounded-[var(--radius-sm-token)] border-border bg-card text-center text-sm shadow-none"
              />
            </div>
            <Button
              type="button"
              onClick={() => onSearch?.(memberNumber)}
              className="h-9 rounded-[var(--radius-sm-token)] bg-[color:var(--success)] px-5 text-[11px] font-semibold tracking-[0.03em] text-white hover:bg-[#16a34a]"
            >
              SEARCH
            </Button>
          </div>

          <Card className="overflow-hidden rounded-[var(--radius-lg-token)] border-border py-0 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
            <div className={cn("grid gap-4 bg-gradient-to-r px-4 py-4 text-white md:grid-cols-[104px_1fr_150px] md:items-center", toneClasses.banner)}>
              <div className="flex justify-center md:justify-start">
                <Avatar className="h-[90px] w-[90px] rounded-[12px] border-4 border-white/40 shadow-md">
                  <AvatarImage src={member.avatarSrc} alt={member.name} className="object-cover" />
                  <AvatarFallback className="rounded-[12px] bg-white/20 text-xl font-semibold text-white">
                    {member.avatarFallback}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="text-center md:text-left">
                <p className="text-[17px] font-semibold leading-tight md:text-[20px]">{config.title}</p>
                <h1 className="text-[30px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[44px]">
                  {member.name}!
                </h1>
              </div>

              <div className="flex flex-col items-center gap-3 md:items-end">
                <div className={cn("flex h-[72px] w-[72px] items-center justify-center rounded-full ring-4", toneClasses.iconBg, toneClasses.iconRing)}>
                  <HeroIcon className="h-9 w-9" strokeWidth={3} />
                </div>
                <div className="text-sm font-medium md:text-right">{config.headlineSuffix}</div>
              </div>
            </div>

            <CardContent className="grid gap-0 px-0 md:grid-cols-[1fr_auto_1.15fr]">
              <section className="px-5 py-4">
                <div className="mb-3 flex items-center gap-2 text-[15px] font-semibold">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  Member Details
                </div>
                <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm">
                  <div>
                    <div className="text-[11px] text-muted-foreground">Name</div>
                    <div className="mt-1 font-medium">{member.name}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground">Member Number</div>
                    <div className="mt-1 font-medium">{member.memberNumber}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground">Member Since</div>
                    <div className="mt-1 font-medium">{member.membershipSince}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground">Status</div>
                    <div className="mt-1">
                      <Badge className={cn("rounded-full border-0 px-2 py-0.5 text-[11px] font-semibold", toneClasses.status)}>
                        {member.statusLabel}
                      </Badge>
                    </div>
                  </div>
                </div>
              </section>

              <div className="hidden py-4 md:block">
                <Separator orientation="vertical" />
              </div>

              <section className="px-5 py-4">
                <div className="mb-1 flex items-center gap-2 text-[15px] font-semibold">
                  <Dumbbell className="h-4 w-4 text-muted-foreground" />
                  Amenities Included
                </div>
                <p className="mb-4 text-[11px] text-muted-foreground">
                  This membership includes access to the following amenities:
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {member.amenities.map((amenity) => {
                    const AmenityIcon = amenityIcons[amenity.icon];
                    return (
                      <div
                        key={amenity.id}
                        className="flex min-h-[86px] flex-col items-center justify-center rounded-[var(--radius-md-token)] bg-muted px-2 py-3 text-center"
                      >
                        <div className="mb-2 rounded-full bg-[color:var(--success-soft)] p-2.5 text-[color:var(--success)]">
                          <AmenityIcon className="h-5 w-5" />
                        </div>
                        <div className="text-[11px] font-medium leading-tight text-foreground">
                          {amenity.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </CardContent>

            <div className={cn("flex items-center justify-center gap-2 border-t border-border px-5 py-3 text-center text-[12px]", toneClasses.footer)}>
              <FooterIcon className="h-4 w-4 shrink-0 text-[color:var(--success)]" />
              <span>{config.footerMessage}</span>
            </div>
          </Card>
        </div>
      </main>

      <div className="sr-only">
        <Image src="/Frida.png" alt="" width={1} height={1} priority />
      </div>
    </div>
  );
}
