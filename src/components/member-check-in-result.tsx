"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  CalendarDays,
  Check,
  CreditCard,
  Dumbbell,
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
      "bg-[linear-gradient(135deg,#f7c832_0%,var(--color-warning)_62%,#f28c1b_100%)] text-[color:var(--color-text)]",
    bannerIconWrapClassName: "border-white/55 bg-white/10",
    detailsIconClassName: "text-[color:var(--color-warning-strong)]",
    statusLabel: "Past Due",
    statusVariant: "warning",
    footerTitle: "Please Update Payment Info",
    footerMessage:
      "To continue enjoying your membership, please update your payment information at your earliest convenience.",
    footerClassName:
      "border-t-[color:var(--color-warning)] bg-[color:color-mix(in_srgb,var(--color-warning-soft)_86%,#fef08a)] text-[color:#5b4106]",
    footerIcon: AlertTriangle,
    member: {
      name: "Michael Davis",
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
    rightLabel: "Unable to Check In",
    icon: Bell,
    bannerClassName:
      "bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-error)_88%,#7f1d1d),var(--color-error))] text-white",
    bannerIconWrapClassName: "border-white/25 bg-white/10",
    detailsIconClassName: "text-[color:var(--color-error-strong)]",
    statusLabel: "Cancelled",
    statusVariant: "error",
    footerTitle: "Contact Member Services",
    footerMessage:
      "Please speak with a team member if you believe this membership should still be active.",
    footerClassName:
      "border-t-[color:var(--color-error)] bg-[color:color-mix(in_srgb,var(--color-error-soft)_90%,white)] text-[color:var(--color-error-strong)]",
    footerIcon: AlertTriangle,
    member: {
      name: "Jordan Lee",
      memberSince: "Sep 02, 2021",
      imageSrc: "/Frida.png",
      fallback: "JL",
    },
    amenities: [
      { label: "Weights", icon: Dumbbell },
      { label: "Pool", icon: Waves },
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
        : "border-[color:var(--color-error-soft)] bg-[color:var(--color-error-soft)] text-[color:var(--color-error-strong)]";

  return <Badge className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", className)}>{status}</Badge>;
}

function AmenityCard({ label, icon: Icon, toneClassName }: Amenity & { toneClassName: string }) {
  return (
    <div
      className={cn(
        "flex min-h-[92px] flex-col items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-border px-3 py-3 text-center",
        toneClassName,
      )}
    >
      <Icon className="h-7 w-7" />
      <span className="text-xs font-semibold text-foreground">{label}</span>
    </div>
  );
}

export function MemberCheckInResult() {
  const [memberNumber, setMemberNumber] = useState("987654");
  const [viewState, setViewState] = useState<CheckInState>("invalid-payment-method");

  const config = stateData[viewState];
  const BannerIcon = config.icon;
  const FooterIcon = config.footerIcon;

  const amenityToneClassName = useMemo(() => {
    if (viewState === "invalid-payment-method") {
      return "bg-[color:color-mix(in_srgb,var(--color-warning-soft)_78%,white)] text-[color:var(--color-warning-strong)]";
    }

    if (viewState === "membership-cancelled") {
      return "bg-[color:color-mix(in_srgb,var(--color-error-soft)_78%,white)] text-[color:var(--color-error-strong)]";
    }

    return "bg-[color:color-mix(in_srgb,var(--color-success-soft)_72%,white)] text-[color:var(--color-success-strong)]";
  }, [viewState]);

  return (
    <main className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1100px] flex-col px-3 py-4 sm:px-6 sm:py-6">
        <Card className="overflow-hidden border-border bg-card py-0 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 sm:px-5">
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

          <CardContent className="space-y-4 bg-[color:color-mix(in_srgb,var(--color-background)_88%,white)] px-4 py-4 sm:px-5 sm:py-5">
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <label htmlFor="member-number" className="text-[11px] text-muted-foreground">
                Enter Member Number:
              </label>
              <div className="flex w-full max-w-[420px] gap-2">
                <Input
                  id="member-number"
                  value={memberNumber}
                  onChange={(event) => setMemberNumber(event.target.value)}
                  className="h-8 rounded-[var(--radius-sm)] bg-white text-sm"
                />
                <Button
                  type="button"
                  className="h-8 rounded-[var(--radius-sm)] bg-[color:#4b7b4c] px-4 text-xs font-semibold tracking-[0.02em] text-white hover:bg-[color:#3f693f]"
                >
                  <Search className="h-3.5 w-3.5" />
                  SEARCH
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>State</span>
                <select
                  value={viewState}
                  onChange={(event) => setViewState(event.target.value as CheckInState)}
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
              <div className={cn("grid gap-4 px-3 py-3 sm:grid-cols-[108px_minmax(0,1fr)_150px] sm:items-center sm:px-4 sm:py-4", config.bannerClassName)}>
                <Avatar className="h-[94px] w-[94px] rounded-[var(--radius-sm)] border border-white/70 bg-white shadow-sm">
                  <AvatarImage src={config.member.imageSrc} alt={config.member.name} className="object-cover" />
                  <AvatarFallback className="rounded-[var(--radius-sm)] bg-secondary text-base font-semibold text-foreground">
                    {config.member.fallback}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h1 className="whitespace-pre-line text-[30px] leading-[1.05] font-bold tracking-[-0.03em] text-inherit sm:text-[42px]">
                    {config.title}
                  </h1>
                </div>

                <div className="flex flex-col items-end gap-3 justify-self-end text-right">
                  <div
                    className={cn(
                      "flex h-20 w-20 items-center justify-center rounded-full border-[3px] shadow-inner sm:h-[90px] sm:w-[90px]",
                      config.bannerIconWrapClassName,
                    )}
                  >
                    <BannerIcon className="h-10 w-10" />
                  </div>
                  <p className="text-sm font-medium text-inherit">{config.rightLabel}</p>
                </div>
              </div>

              <div className="grid divide-y divide-border sm:grid-cols-[320px_minmax(0,1fr)] sm:divide-x sm:divide-y-0">
                <section className="px-4 py-4 sm:px-5">
                  <div className="mb-4 flex items-center gap-2 text-[15px] font-semibold text-foreground">
                    <CreditCard className={cn("h-4 w-4", config.detailsIconClassName)} />
                    Member Details
                  </div>

                  <div className="grid grid-cols-[74px_1fr] gap-x-6 gap-y-3 text-sm">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium text-foreground">{config.member.name}</span>
                    <span className="text-muted-foreground">Member Number</span>
                    <span className="font-medium text-foreground">{memberNumber || "—"}</span>
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="flex items-center gap-2 font-medium text-foreground">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      {config.member.memberSince}
                    </span>
                    <span className="text-muted-foreground">Status</span>
                    <StatusBadge status={config.statusLabel} variant={config.statusVariant} />
                  </div>
                </section>

                <section className="px-4 py-4 sm:px-5">
                  <div className="mb-2 flex items-center gap-2 text-[15px] font-semibold text-foreground">
                    <X className={cn("h-4 w-4", config.detailsIconClassName)} />
                    Amenities Included
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground">
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

          <CardFooter className={cn("justify-center px-4 py-3 text-center", config.footerClassName)}>
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-base font-semibold">
                <FooterIcon className="h-4 w-4" />
                <span>{config.footerTitle}</span>
              </div>
              <p className="max-w-3xl text-xs sm:text-sm">{config.footerMessage}</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
