"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Bell,
  CalendarDays,
  Check,
  Dumbbell,
  Search,
  ShieldCheck,
  Trees,
  UserRound,
  Waves,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CheckInState = "check-in-success" | "invalid-payment-method" | "membership-cancelled";

type MemberDetails = {
  name: string;
  memberNumber: string;
  memberSince: string;
  status: string;
  imageSrc?: string;
};

type Amenity = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

type CheckInStateConfig = {
  title: string;
  subtitle: string;
  bannerClassName: string;
  statusLabel: string;
  statusVariant: "success" | "warning" | "error";
  statusIcon: React.ComponentType<{ className?: string }>;
  footerMessage: string;
};

const amenities: Amenity[] = [
  { label: "Weights", icon: Dumbbell },
  { label: "Pool", icon: Waves },
  { label: "Recovery Room", icon: Trees },
  { label: "Basketball Court", icon: ShieldCheck },
];

const stateConfig: Record<CheckInState, CheckInStateConfig> = {
  "check-in-success": {
    title: "Welcome,\nSarah Johnson!",
    subtitle: "Check-In Successful",
    bannerClassName: "bg-[linear-gradient(135deg,var(--color-success-strong),var(--color-success))] text-white",
    statusLabel: "Active",
    statusVariant: "success",
    statusIcon: Check,
    footerMessage: "Enjoy your workout! Thank you for being a valued member.",
  },
  "invalid-payment-method": {
    title: "Unable to\nComplete Check-In",
    subtitle: "Payment Method Invalid",
    bannerClassName: "bg-[linear-gradient(135deg,var(--color-warning-strong),var(--color-warning))] text-white",
    statusLabel: "Payment Required",
    statusVariant: "warning",
    statusIcon: Bell,
    footerMessage: "Please update your payment method at the front desk to restore access.",
  },
  "membership-cancelled": {
    title: "Membership\nUnavailable",
    subtitle: "Membership Cancelled",
    bannerClassName: "bg-[linear-gradient(135deg,var(--color-error-strong),var(--color-error))] text-white",
    statusLabel: "Cancelled",
    statusVariant: "error",
    statusIcon: Bell,
    footerMessage: "Please speak with a team member if you believe this membership should be active.",
  },
};

const stateOptions: { value: CheckInState; label: string }[] = [
  { value: "check-in-success", label: "Success" },
  { value: "invalid-payment-method", label: "Invalid payment" },
  { value: "membership-cancelled", label: "Membership cancelled" },
];

function StatusBadge({ status, variant }: { status: string; variant: CheckInStateConfig["statusVariant"] }) {
  const className =
    variant === "success"
      ? "border-[color:var(--color-success-soft)] bg-[color:var(--color-success-soft)] text-[color:var(--color-success-strong)]"
      : variant === "warning"
        ? "border-[color:var(--color-warning-soft)] bg-[color:var(--color-warning-soft)] text-[color:var(--color-warning-strong)]"
        : "border-[color:var(--color-error-soft)] bg-[color:var(--color-error-soft)] text-[color:var(--color-error-strong)]";

  return <Badge className={cn("rounded-full px-3 py-1 text-xs font-semibold", className)}>{status}</Badge>;
}

export function MemberCheckInResult() {
  const [memberNumber, setMemberNumber] = useState("123456");
  const [viewState, setViewState] = useState<CheckInState>("check-in-success");

  const config = stateConfig[viewState];
  const StatusIcon = config.statusIcon;

  const member: MemberDetails = {
    name: "Sarah Johnson",
    memberNumber,
    memberSince: "Jan 15, 2023",
    status: config.statusLabel,
    imageSrc: "/Frida.png",
  };

  return (
    <main className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col p-4 sm:p-6 lg:p-10">
        <Card className="overflow-hidden rounded-[var(--radius-lg)] border-border bg-card py-0 shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between border-b border-border bg-card px-5 py-3 sm:px-6">
            <div className="text-sm font-semibold tracking-[-0.01em] text-foreground sm:text-base">
              Gym Member Check-In
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Bell className="h-4 w-4" />
              <div className="flex items-center gap-2 rounded-full border border-border px-2.5 py-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-muted-foreground">
                  TB
                </span>
                <span className="hidden sm:inline">Team Member</span>
              </div>
            </div>
          </div>

          <CardContent className="space-y-5 bg-background px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <label htmlFor="member-number" className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                Enter Member Number
              </label>
              <div className="flex w-full max-w-md flex-col gap-3 sm:w-auto sm:flex-row">
                <Input
                  id="member-number"
                  value={memberNumber}
                  onChange={(event) => setMemberNumber(event.target.value)}
                  className="h-10 w-full bg-card sm:w-44"
                />
                <Button className="h-10 gap-2 bg-[color:var(--color-success)] px-5 text-white hover:bg-[color:var(--color-success-strong)]">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>State</span>
                <select
                  value={viewState}
                  onChange={(event) => setViewState(event.target.value as CheckInState)}
                  className="h-9 rounded-md border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/40"
                >
                  {stateOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <section className="overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-success-soft)] bg-card">
              <div className={cn("grid gap-6 px-4 py-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-6 sm:py-6", config.bannerClassName)}>
                <Avatar className="h-24 w-24 rounded-md border-4 border-white/40 shadow-md">
                  <AvatarImage src={member.imageSrc} alt={member.name} className="object-cover" />
                  <AvatarFallback className="rounded-md bg-white/20 text-lg font-semibold text-white">
                    SJ
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                  <h1 className="whitespace-pre-line text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-5xl">
                    {config.title}
                  </h1>
                </div>

                <div className="flex flex-col items-center gap-3 justify-self-center sm:justify-self-end">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/25 bg-white/10 shadow-inner backdrop-blur-sm sm:h-28 sm:w-28">
                    <StatusIcon className="h-12 w-12" />
                  </div>
                  <p className="text-sm font-medium">{config.subtitle}</p>
                </div>
              </div>

              <div className="grid gap-6 px-4 py-5 sm:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] sm:px-6 sm:py-6">
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-base font-semibold text-foreground">
                    <UserRound className="h-4 w-4 text-muted-foreground" />
                    Member Details
                  </div>
                  <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium text-foreground">{member.name}</span>
                    <span className="text-muted-foreground">Member Number</span>
                    <span className="font-medium text-foreground">{member.memberNumber || "—"}</span>
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="flex items-center gap-2 font-medium text-foreground">
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                      {member.memberSince}
                    </span>
                    <span className="text-muted-foreground">Status</span>
                    <StatusBadge status={member.status} variant={config.statusVariant} />
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-base font-semibold text-foreground">
                    <Dumbbell className="h-4 w-4 text-muted-foreground" />
                    Amenities Included
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This membership includes access to the following amenities:
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {amenities.map((amenity) => {
                      const Icon = amenity.icon;
                      return (
                        <div
                          key={amenity.label}
                          className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-[var(--radius-md)] border border-border bg-secondary/55 px-3 py-4 text-center"
                        >
                          <Icon className="h-7 w-7 text-[color:var(--color-success-strong)]" />
                          <span className="text-xs font-medium text-foreground">{amenity.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </section>
          </CardContent>

          <CardFooter className="justify-center border-t border-[color:var(--color-success-soft)] bg-[color:var(--color-success-soft)] px-4 py-4 text-center text-sm text-[color:var(--color-success-strong)]">
            <div className="flex items-center gap-2 font-medium">
              <Check className="h-4 w-4" />
              <span>{config.footerMessage}</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
