"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  Check,
  CreditCard,
  Dumbbell,
  Lock,
  Search,
  UserRound,
  Waves,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CheckInState = "check-in-success" | "invalid-payment-method" | "membership-cancelled";

type Amenity = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

type MemberStateData = {
  title: string;
  rightLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  bannerClassName: string;
  bannerIconWrapClassName: string;
  detailsIconClassName: string;
  statusLabel: string;
  statusVariant: "success" | "warning" | "error";
  footerTitle: string;
  footerMessage: string;
  footerClassName: string;
  footerIcon: React.ComponentType<{ className?: string }>;
  member: {
    name: string;
    memberNumber: string;
    memberSince: string;
    imageSrc?: string;
    fallback: string;
  };
  amenities: Amenity[];
};

const stateOptions: { value: CheckInState; label: string }[] = [
  { value: "check-in-success", label: "Success" },
  { value: "invalid-payment-method", label: "Invalid payment" },
  { value: "membership-cancelled", label: "Membership cancelled" },
];

const stateData: Record<CheckInState, MemberStateData> = {
  "check-in-success": {
    title: "Welcome Back",
    rightLabel: "Check-In Successful",
    icon: Check,
    bannerClassName:
      "bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-success)_90%,#14532d),var(--color-success))] text-white",
    bannerIconWrapClassName: "border-white/25 bg-white/10",
    detailsIconClassName: "text-[color:color-mix(in_srgb,var(--color-success)_75%,#166534)]",
    statusLabel: "Active",
    statusVariant: "success",
    footerTitle: "See You Inside",
    footerMessage: "Enjoy your workout and thank you for checking in today.",
    footerClassName:
      "border-t-[color:var(--color-success)] bg-[color:color-mix(in_srgb,var(--color-success-soft)_88%,white)] text-[color:color-mix(in_srgb,var(--color-success)_70%,#166534)]",
    footerIcon: Check,
    member: {
      name: "Sarah Johnson",
      memberNumber: "987654",
      memberSince: "Jan 15, 2023",
      imageSrc: "/Frida.png",
      fallback: "SJ",
    },
    amenities: [
      { label: "Weights", icon: Dumbbell },
      { label: "Pool", icon: Waves },
      { label: "Basketball Court", icon: Dumbbell },
      { label: "Sauna", icon: Waves },
    ],
  },
  "invalid-payment-method": {
    title: "Invalid\nPayment Method",
    rightLabel: "Check-In Successful",
    icon: X,
    bannerClassName:
      "bg-[linear-gradient(135deg,#f7c832_0%,var(--color-warning)_62%,#f28c1b_100%)] text-[color:var(--foreground)]",
    bannerIconWrapClassName: "border-white/55 bg-white/10",
    detailsIconClassName: "text-[color:var(--color-warning-strong)]",
    statusLabel: "Past Due",
    statusVariant: "warning",
    footerTitle: "Please Update Payment Info",
    footerMessage:
      "To continue enjoying your membership, please update your payment information at your earliest convenience.",
    footerClassName:
      "border-t-[color:var(--color-warning)] bg-[color:color-mix(in_srgb,var(--color-warning-soft)_86%,#fef08a)] text-[color:#5b4106]",
    footerIcon: CreditCard,
    member: {
      name: "Michael Davis",
      memberNumber: "987654",
      memberSince: "Mar 10, 2023",
      imageSrc: "/Frida.png",
      fallback: "MD",
    },
    amenities: [
      { label: "Weights", icon: Dumbbell },
      { label: "Basketball Court", icon: Dumbbell },
      { label: "Sauna", icon: Waves },
    ],
  },
  "membership-cancelled": {
    title: "Membership\nCancelled",
    rightLabel: "Check-In Successful",
    icon: X,
    bannerClassName:
      "bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-error)_86%,#991b1b),#ff2f37_58%,var(--color-error)_100%)] text-white",
    bannerIconWrapClassName: "border-white/55 bg-white/6",
    detailsIconClassName: "text-[color:var(--color-error-strong)]",
    statusLabel: "Cancelled",
    statusVariant: "error",
    footerTitle: "Access Denied",
    footerMessage: "For assistance, please visit the front desk.",
    footerClassName: "border-t-[color:var(--color-error)] bg-[color:var(--color-error)] text-white",
    footerIcon: Lock,
    member: {
      name: "Lisa Roberts",
      memberNumber: "654321",
      memberSince: "Oct 1, 2022",
      imageSrc: undefined,
      fallback: "LR",
    },
    amenities: [
      { label: "Weights", icon: Dumbbell },
      { label: "Basketball Court", icon: Dumbbell },
      { label: "Sauna", icon: Waves },
    ],
  },
};

function StatusBadge({ status, variant }: { status: string; variant: MemberStateData["statusVariant"] }) {
  const className =
    variant === "success"
      ? "border-[color:var(--color-success-soft)] bg-[color:var(--color-success-soft)] text-[color:var(--color-success-strong)]"
      : variant === "warning"
        ? "border-[color:var(--color-warning-soft)] bg-[color:var(--color-warning-soft)] text-[color:var(--color-warning-strong)]"
        : "border-[color:var(--color-error-soft)] bg-[color:var(--color-error)] text-white";

  return <Badge className={cn("rounded-[var(--radius-sm)] px-2.5 py-1 text-xs font-semibold", className)}>{status}</Badge>;
}

function AmenityCard({ label, icon: Icon, toneClassName }: Amenity & { toneClassName: string }) {
  return (
    <div
      className={cn(
        "flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-transparent px-3 py-3 text-center",
        toneClassName,
      )}
    >
      <Icon className="h-7 w-7" />
      <span className="text-[11px] font-medium text-foreground">{label}</span>
    </div>
  );
}

export function MemberCheckInResult() {
  const [memberNumber, setMemberNumber] = useState("987654");
  const [viewState, setViewState] = useState<CheckInState>("membership-cancelled");

  const config = stateData[viewState];
  const BannerIcon = config.icon;
  const FooterIcon = config.footerIcon;

  const amenityToneClassName = useMemo(() => {
    if (viewState === "invalid-payment-method") {
      return "bg-[color:color-mix(in_srgb,var(--color-warning-soft)_82%,white)] text-[color:var(--color-warning-strong)]";
    }

    if (viewState === "membership-cancelled") {
      return "bg-[color:color-mix(in_srgb,var(--color-error-soft)_86%,white)] text-[color:#6b7280]";
    }

    return "bg-[color:color-mix(in_srgb,var(--color-success-soft)_72%,white)] text-[color:var(--color-success-strong)]";
  }, [viewState]);

  const displayedMemberNumber = memberNumber || config.member.memberNumber;

  return (
    <main className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1100px] flex-col px-3 py-4 sm:px-5 sm:py-6">
        <Card className="overflow-hidden border-border bg-card py-0 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between border-b border-border bg-[#f3f4f6] px-4 py-3 sm:px-5">
            <div className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">Gym Member Check-In</div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground sm:text-sm">
              <Bell className="h-4 w-4" />
              <div className="flex items-center gap-2 border-l border-border pl-3">
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-semibold text-muted-foreground">
                  TB
                </span>
                <div className="hidden leading-tight sm:block">
                  <div className="font-medium text-foreground">Team Member</div>
                  <div className="text-[11px] text-muted-foreground">.com</div>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="space-y-4 bg-[#f7f7f8] px-4 py-4 sm:px-5 sm:py-5">
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <label htmlFor="member-number" className="text-[11px] text-foreground">
                Enter Member Number:
              </label>
              <div className="flex w-full max-w-[420px] gap-2">
                <Input
                  id="member-number"
                  value={memberNumber}
                  onChange={(event) => setMemberNumber(event.target.value)}
                  className="h-8 rounded-[var(--radius-sm)] border-border bg-white text-sm"
                />
                <Button
                  type="button"
                  className="h-8 rounded-[var(--radius-sm)] bg-[#4b7b4c] px-4 text-xs font-semibold tracking-[0.02em] text-white hover:bg-[#3f693f]"
                >
                  SEARCH
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>State</span>
                <select
                  value={viewState}
                  onChange={(event) => {
                    const nextState = event.target.value as CheckInState;
                    setViewState(nextState);
                    setMemberNumber(stateData[nextState].member.memberNumber);
                  }}
                  className="h-9 rounded-[var(--radius-sm)] border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                >
                  {stateOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <section className="overflow-hidden rounded-[var(--radius-sm)] border border-border bg-card">
              <div className={cn("grid gap-4 px-3 py-3 sm:grid-cols-[112px_minmax(0,1fr)_150px] sm:items-center sm:px-4 sm:py-4", config.bannerClassName)}>
                <Avatar className="h-[92px] w-[110px] rounded-[var(--radius-sm)] border border-white/70 bg-[#676d78] shadow-sm">
                  <AvatarImage src={config.member.imageSrc} alt={config.member.name} className="object-cover" />
                  <AvatarFallback className="rounded-[var(--radius-sm)] bg-[#676d78] text-white">
                    <UserRound className="h-14 w-14" />
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h1 className="whitespace-pre-line text-[32px] leading-[1.02] font-bold tracking-[-0.03em] text-inherit sm:text-[44px]">
                    {config.title}
                  </h1>
                </div>

                <div className="flex flex-col items-end gap-3 justify-self-end text-right">
                  <div
                    className={cn(
                      "flex h-20 w-20 items-center justify-center rounded-full border-[4px] shadow-inner sm:h-[92px] sm:w-[92px]",
                      config.bannerIconWrapClassName,
                    )}
                  >
                    <BannerIcon className="h-10 w-10" />
                  </div>
                  <p className="text-sm font-medium text-inherit">{config.rightLabel}</p>
                </div>
              </div>

              <div className="grid divide-y divide-border sm:grid-cols-[330px_minmax(0,1fr)] sm:divide-x sm:divide-y-0">
                <section className="px-4 py-4 sm:px-5">
                  <div className="mb-4 flex items-center gap-2 text-[15px] font-semibold text-foreground">
                    <CreditCard className={cn("h-4 w-4", config.detailsIconClassName)} />
                    Member Details
                  </div>

                  <div className="grid grid-cols-[80px_1fr] gap-x-6 gap-y-3 text-sm">
                    <span className="text-foreground">Name</span>
                    <span className="font-medium text-foreground">{config.member.name}</span>
                    <span className="text-foreground">Member Number</span>
                    <span className="font-medium text-foreground">{displayedMemberNumber}</span>
                    <span className="text-foreground">Member Since</span>
                    <span className="font-medium text-foreground">{config.member.memberSince}</span>
                    <span className="text-foreground">Status</span>
                    <StatusBadge status={config.statusLabel} variant={config.statusVariant} />
                  </div>
                </section>

                <section className="px-4 py-4 sm:px-5">
                  <div className="mb-2 flex items-center gap-2 text-[15px] font-semibold text-foreground">
                    <X className={cn("h-4 w-4", config.detailsIconClassName)} />
                    Amenities Included
                  </div>
                  <p className="mb-4 text-sm text-foreground">
                    This membership includes access to the following amenities:
                  </p>
                  <div className={cn("grid gap-3", config.amenities.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4")}>
                    {config.amenities.map((amenity) => (
                      <AmenityCard key={amenity.label} {...amenity} toneClassName={amenityToneClassName} />
                    ))}
                  </div>
                </section>
              </div>
            </section>
          </CardContent>

          <CardFooter className={cn("justify-center px-4 py-4 text-center", config.footerClassName)}>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-[34px] font-semibold leading-none sm:text-[36px]">
                <FooterIcon className="h-8 w-8" />
                <span className="text-[18px] sm:text-[20px]">{config.footerTitle}</span>
              </div>
              <p className="max-w-3xl text-xs sm:text-sm">{config.footerMessage}</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
