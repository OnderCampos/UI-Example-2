"use client";

import { Check, CircleAlert, CreditCard, Dumbbell, ShieldCheck, Waves, Leaf, Trophy, CalendarDays, Hash, BadgeCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CheckInState = "success-active-member" | "payment-method-invalid-past-due" | "membership-cancelled-access-denied";

type Amenity = {
  label: string;
  icon: "weights" | "pool" | "recovery" | "basketball";
};

type MemberRecord = {
  name: string;
  memberNumber: string;
  membershipSince: string;
  statusLabel: string;
  avatarSrc?: string;
  amenities: Amenity[];
};

type StateConfig = {
  tone: "success" | "warning" | "error";
  title: string;
  subtitle: string;
  footerMessage: string;
  bannerIcon: typeof Check;
  badgeClassName: string;
  bannerClassName: string;
  bannerIconWrapClassName: string;
  footerClassName: string;
  footerIcon: typeof Check;
};

export type MemberCheckInResultViewProps = {
  state?: CheckInState;
  memberNumber?: string;
  defaultMemberNumber?: string;
  onMemberNumberChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  member?: MemberRecord;
};

const defaultMembers: Record<CheckInState, MemberRecord> = {
  "success-active-member": {
    name: "Sarah Johnson",
    memberNumber: "123456",
    membershipSince: "Jan 15, 2023",
    statusLabel: "Active",
    avatarSrc: "/Frida.png",
    amenities: [
      { label: "Weights", icon: "weights" },
      { label: "Pool", icon: "pool" },
      { label: "Recovery Room", icon: "recovery" },
      { label: "Basketball Court", icon: "basketball" },
    ],
  },
  "payment-method-invalid-past-due": {
    name: "Sarah Johnson",
    memberNumber: "123456",
    membershipSince: "Jan 15, 2023",
    statusLabel: "Past Due",
    avatarSrc: "/Frida.png",
    amenities: [
      { label: "Weights", icon: "weights" },
      { label: "Pool", icon: "pool" },
      { label: "Recovery Room", icon: "recovery" },
      { label: "Basketball Court", icon: "basketball" },
    ],
  },
  "membership-cancelled-access-denied": {
    name: "Sarah Johnson",
    memberNumber: "123456",
    membershipSince: "Jan 15, 2023",
    statusLabel: "Cancelled",
    avatarSrc: "/Frida.png",
    amenities: [
      { label: "Weights", icon: "weights" },
      { label: "Pool", icon: "pool" },
      { label: "Recovery Room", icon: "recovery" },
      { label: "Basketball Court", icon: "basketball" },
    ],
  },
};

const stateConfigs: Record<CheckInState, StateConfig> = {
  "success-active-member": {
    tone: "success",
    title: "Welcome, Sarah Johnson!",
    subtitle: "Check-In Successful",
    footerMessage: "Enjoy your workout! Thank you for being a valued member.",
    bannerIcon: Check,
    badgeClassName: "border-transparent bg-[color:var(--status-success-soft)] text-[color:var(--status-success)]",
    bannerClassName: "bg-[image:linear-gradient(135deg,var(--status-success)_0%,color-mix(in_srgb,var(--status-success)_86%,black)_100%)] text-[color:var(--status-success-foreground)]",
    bannerIconWrapClassName: "bg-white/16 text-[color:var(--status-success-foreground)] ring-1 ring-white/16",
    footerClassName: "border-[color:var(--status-success-soft)] bg-[color:var(--status-success-bg)] text-[color:var(--status-success-deep)]",
    footerIcon: Check,
  },
  "payment-method-invalid-past-due": {
    tone: "warning",
    title: "Payment issue for Sarah Johnson",
    subtitle: "Billing Update Needed",
    footerMessage: "Please update your payment method at the front desk before continuing.",
    bannerIcon: CreditCard,
    badgeClassName: "border-transparent bg-[color:var(--status-warning-soft)] text-[color:var(--status-warning)]",
    bannerClassName: "bg-[image:linear-gradient(135deg,var(--status-warning)_0%,color-mix(in_srgb,var(--status-warning)_84%,black)_100%)] text-white",
    bannerIconWrapClassName: "bg-white/16 text-white ring-1 ring-white/16",
    footerClassName: "border-[color:var(--status-warning-soft)] bg-[#fffbeb] text-[#b45309]",
    footerIcon: CreditCard,
  },
  "membership-cancelled-access-denied": {
    tone: "error",
    title: "Access denied for Sarah Johnson",
    subtitle: "Membership Cancelled",
    footerMessage: "Please speak with the front desk for membership assistance.",
    bannerIcon: CircleAlert,
    badgeClassName: "border-transparent bg-[color:var(--status-error-soft)] text-[color:var(--status-error)]",
    bannerClassName: "bg-[image:linear-gradient(135deg,var(--status-error)_0%,color-mix(in_srgb,var(--status-error)_84%,black)_100%)] text-white",
    bannerIconWrapClassName: "bg-white/16 text-white ring-1 ring-white/16",
    footerClassName: "border-[color:var(--status-error-soft)] bg-[#fef2f2] text-[#b91c1c]",
    footerIcon: CircleAlert,
  },
};

function AmenityIcon({ icon }: { icon: Amenity["icon"] }) {
  const className = "h-7 w-7 text-[color:var(--status-success)]";

  switch (icon) {
    case "weights":
      return <Dumbbell className={className} />;
    case "pool":
      return <Waves className={className} />;
    case "recovery":
      return <Leaf className={className} />;
    case "basketball":
      return <Trophy className={className} />;
    default:
      return null;
  }
}

export function MemberCheckInResultView({
  state = "success-active-member",
  memberNumber,
  defaultMemberNumber,
  onMemberNumberChange,
  onSearch,
  member,
}: MemberCheckInResultViewProps) {
  const fallbackMember = member ?? defaultMembers[state];
  const config = stateConfigs[state];
  const [localMemberNumber, setLocalMemberNumber] = useState(defaultMemberNumber ?? fallbackMember.memberNumber);
  const resolvedMemberNumber = memberNumber ?? localMemberNumber;
  const enteredMember = useMemo(
    () => ({ ...fallbackMember, memberNumber: resolvedMemberNumber }),
    [fallbackMember, resolvedMemberNumber]
  );

  const handleMemberNumberChange = (value: string) => {
    if (memberNumber === undefined) {
      setLocalMemberNumber(value);
    }
    onMemberNumberChange?.(value);
  };

  const handleSearch = () => {
    onSearch?.(resolvedMemberNumber);
  };

  const BannerIcon = config.bannerIcon;
  const FooterIcon = config.footerIcon;

  return (
    <main className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-4 py-3 sm:px-6 lg:px-10">
        <header className="flex items-center justify-between border-b border-border pb-3">
          <div className="text-[22px] font-bold tracking-[-0.02em] text-foreground">Gym Member Check-In</div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-muted-foreground">TB</div>
              <div className="hidden text-right leading-tight sm:block">
                <div className="font-medium text-foreground">Team Member</div>
                <div>Desk</div>
              </div>
            </div>
          </div>
        </header>

        <section className="mx-auto mt-8 flex w-full max-w-[720px] items-center justify-center gap-3">
          <label htmlFor="member-number" className="text-sm text-muted-foreground">
            Enter Member Number
          </label>
          <Input
            id="member-number"
            value={resolvedMemberNumber}
            onChange={(event) => handleMemberNumberChange(event.target.value)}
            className="h-11 max-w-[340px] bg-surface shadow-none"
          />
          <Button
            type="button"
            onClick={handleSearch}
            className="h-11 bg-primary px-6 text-primary-foreground hover:bg-[color:var(--primary-hover)]"
          >
            Search
          </Button>
        </section>

        <Card className="mx-auto mt-8 w-full max-w-[1120px] gap-0 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-card py-0 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
          <div className={cn("grid gap-6 px-5 py-5 md:grid-cols-[120px_minmax(0,1fr)_180px] md:items-center md:px-7 md:py-6", config.bannerClassName)}>
            <div className="flex justify-center md:justify-start">
              <Avatar className="h-[104px] w-[104px] rounded-[var(--radius-md)] border-4 border-white/60 shadow-lg">
                {enteredMember.avatarSrc ? (
                  <AvatarImage src={enteredMember.avatarSrc} alt={enteredMember.name} className="object-cover" />
                ) : null}
                <AvatarFallback className="rounded-[var(--radius-md)] bg-white/15 text-3xl font-bold text-white">
                  {enteredMember.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-3 text-center md:text-left">
              <h1 className="max-w-[430px] text-4xl font-bold leading-[1.08] tracking-[-0.03em]">{config.title}</h1>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <div className={cn("flex h-28 w-28 items-center justify-center rounded-full", config.bannerIconWrapClassName)}>
                <BannerIcon className="h-14 w-14 stroke-[2.8]" />
              </div>
              <div className="text-base font-semibold">{config.subtitle}</div>
            </div>
          </div>

          <CardContent className="grid gap-8 px-5 py-5 md:grid-cols-[1fr_1.25fr] md:px-7 md:py-6">
            <section>
              <div className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <BadgeCheck className="h-5 w-5 text-muted-foreground" />
                <span>Member Details</span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
                <DetailItem label="Name" value={enteredMember.name} />
                <DetailItem label="Member Number" value={enteredMember.memberNumber} icon={<Hash className="h-4 w-4 text-muted-foreground" />} />
                <DetailItem label="Member Since" value={enteredMember.membershipSince} icon={<CalendarDays className="h-4 w-4 text-muted-foreground" />} />
                <div className="space-y-2">
                  <div className="text-[13px] text-muted-foreground">Status</div>
                  <Badge className={cn("rounded-full px-3 py-1 text-sm font-semibold", config.badgeClassName)}>
                    {enteredMember.statusLabel}
                  </Badge>
                </div>
              </div>
            </section>

            <section>
              <div className="mb-2 flex items-center gap-2 text-xl font-semibold">
                <Dumbbell className="h-5 w-5 text-muted-foreground" />
                <span>Amenities Included</span>
              </div>
              <p className="mb-5 text-sm text-muted-foreground">
                This membership includes access to the following amenities:
              </p>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {enteredMember.amenities.map((amenity) => (
                  <div
                    key={amenity.label}
                    className="flex min-h-[108px] flex-col items-center justify-center gap-3 rounded-[var(--radius-md)] border border-border bg-muted/50 px-3 py-4 text-center"
                  >
                    <AmenityIcon icon={amenity.icon} />
                    <div className="text-sm font-medium text-foreground">{amenity.label}</div>
                  </div>
                ))}
              </div>
            </section>
          </CardContent>

          <CardFooter className={cn("justify-center border-t px-5 py-4 text-center text-sm font-medium md:px-7", config.footerClassName)}>
            <div className="flex items-center gap-2">
              <FooterIcon className="h-4 w-4" />
              <span>{config.footerMessage}</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

type DetailItemProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

function DetailItem({ label, value, icon }: DetailItemProps) {
  return (
    <div className="space-y-2">
      <div className="text-[13px] text-muted-foreground">{label}</div>
      <div className="flex items-center gap-2 text-base font-semibold text-foreground">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}
