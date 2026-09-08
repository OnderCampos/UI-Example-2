"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Bell,
  Check,
  ChevronDown,
  Dumbbell,
  Hash,
  Leaf,
  ShieldCheck,
  Trees,
  Waves,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type CheckInViewState =
  | "success-active-member"
  | "payment-invalid-past-due"
  | "membership-cancelled-access-denied";

type Amenity = {
  label: string;
  icon: typeof Dumbbell;
};

type MemberCheckInResult = {
  memberName: string;
  memberNumber: string;
  startDate: string;
  statusLabel: string;
  enteredNumber: string;
  headline: string;
  subheadline: string;
  footerMessage: string;
  panelTone: string;
  panelTextTone: string;
  badgeClassName: string;
  accentRing: string;
  iconWrapperClassName: string;
  icon: typeof Check;
  amenitiesIntro: string;
  amenities: Amenity[];
};

const amenities: Amenity[] = [
  { label: "Weights", icon: Dumbbell },
  { label: "Pool", icon: Waves },
  { label: "Recovery Room", icon: Leaf },
  { label: "Basketball Court", icon: Trees },
];

const memberCheckInFixtures: Record<CheckInViewState, MemberCheckInResult> = {
  "success-active-member": {
    memberName: "Sarah Johnson",
    memberNumber: "123456",
    startDate: "Jan 15, 2023",
    statusLabel: "Active",
    enteredNumber: "123456",
    headline: "Welcome, Sarah Johnson!",
    subheadline: "Check-In Successful",
    footerMessage: "Enjoy your workout! Thank you for being a valued member.",
    panelTone:
      "bg-[linear-gradient(135deg,color-mix(in_srgb,var(--success)_88%,white_12%),color-mix(in_srgb,var(--success)_74%,#166534_26%))]",
    panelTextTone: "text-white",
    badgeClassName:
      "border-transparent bg-[color:color-mix(in_srgb,var(--success)_20%,white_80%)] text-[var(--success-foreground)]",
    accentRing:
      "border-[color:color-mix(in_srgb,var(--success)_24%,white_76%)] bg-[color:color-mix(in_srgb,var(--success)_16%,white_84%)] text-white",
    iconWrapperClassName:
      "bg-[color:color-mix(in_srgb,var(--success)_16%,white_84%)] text-white shadow-[0_0_0_10px_color-mix(in_srgb,var(--success)_20%,transparent)]",
    icon: Check,
    amenitiesIntro:
      "This membership includes access to the following amenities:",
    amenities,
  },
  "payment-invalid-past-due": {
    memberName: "Sarah Johnson",
    memberNumber: "123456",
    startDate: "Jan 15, 2023",
    statusLabel: "Past Due",
    enteredNumber: "123456",
    headline: "Payment issue for Sarah Johnson",
    subheadline: "Membership payment past due",
    footerMessage: "Please visit the front desk to update payment and restore access.",
    panelTone:
      "bg-[linear-gradient(135deg,color-mix(in_srgb,var(--warning)_86%,white_14%),color-mix(in_srgb,var(--warning)_72%,#92400e_28%))]",
    panelTextTone: "text-white",
    badgeClassName:
      "border-transparent bg-[color:color-mix(in_srgb,var(--warning)_20%,white_80%)] text-[var(--warning-foreground)]",
    accentRing:
      "border-[color:color-mix(in_srgb,var(--warning)_26%,white_74%)] bg-[color:color-mix(in_srgb,var(--warning)_14%,white_86%)] text-white",
    iconWrapperClassName:
      "bg-[color:color-mix(in_srgb,var(--warning)_14%,white_86%)] text-white shadow-[0_0_0_10px_color-mix(in_srgb,var(--warning)_18%,transparent)]",
    icon: ShieldCheck,
    amenitiesIntro:
      "Amenity access will resume after the balance is resolved:",
    amenities,
  },
  "membership-cancelled-access-denied": {
    memberName: "Sarah Johnson",
    memberNumber: "123456",
    startDate: "Jan 15, 2023",
    statusLabel: "Cancelled",
    enteredNumber: "123456",
    headline: "Access denied for Sarah Johnson",
    subheadline: "Membership cancelled",
    footerMessage: "Contact the membership team if you believe this status is incorrect.",
    panelTone:
      "bg-[linear-gradient(135deg,color-mix(in_srgb,var(--destructive)_86%,white_14%),color-mix(in_srgb,var(--destructive)_74%,#7f1d1d_26%))]",
    panelTextTone: "text-white",
    badgeClassName:
      "border-transparent bg-[color:color-mix(in_srgb,var(--destructive)_18%,white_82%)] text-[var(--destructive-foreground)]",
    accentRing:
      "border-[color:color-mix(in_srgb,var(--destructive)_26%,white_74%)] bg-[color:color-mix(in_srgb,var(--destructive)_14%,white_86%)] text-white",
    iconWrapperClassName:
      "bg-[color:color-mix(in_srgb,var(--destructive)_14%,white_86%)] text-white shadow-[0_0_0_10px_color-mix(in_srgb,var(--destructive)_18%,transparent)]",
    icon: ShieldCheck,
    amenitiesIntro:
      "Amenity access is unavailable while the membership remains cancelled:",
    amenities,
  },
};

function GymShellHeader() {
  return (
    <header className="border-b bg-card">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="text-[19px] font-bold tracking-[-0.02em] text-foreground">
          Gym Member Check-In
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-full border border-transparent p-2 transition hover:border-border hover:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none"
          >
            <Bell className="size-4" />
          </button>
          <div className="flex items-center gap-2 rounded-full px-2 py-1.5 hover:bg-muted">
            <Avatar className="size-7">
              <AvatarFallback className="bg-muted text-[11px] font-semibold text-muted-foreground">
                TB
              </AvatarFallback>
            </Avatar>
            <div className="hidden text-left leading-tight sm:block">
              <div className="text-[11px] font-semibold text-foreground">Team Member</div>
              <div className="text-[10px] text-muted-foreground">Front Desk</div>
            </div>
            <ChevronDown className="size-4" />
          </div>
        </div>
      </div>
    </header>
  );
}

function AmenityTile({ amenity }: { amenity: Amenity }) {
  const Icon = amenity.icon;

  return (
    <div className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-[var(--radius-md)] border border-border/70 bg-[color:color-mix(in_srgb,var(--muted)_60%,white_40%)] px-3 py-4 text-center shadow-sm">
      <div className="flex size-11 items-center justify-center rounded-full bg-[color:color-mix(in_srgb,var(--success)_12%,white_88%)] text-[var(--success)]">
        <Icon className="size-5" />
      </div>
      <span className="text-sm font-medium text-foreground">{amenity.label}</span>
    </div>
  );
}

function MemberCheckInResultView({
  initialState = "success-active-member",
}: {
  initialState?: CheckInViewState;
}) {
  const [viewState, setViewState] = useState<CheckInViewState>(initialState);
  const [memberNumber, setMemberNumber] = useState(
    memberCheckInFixtures[initialState].enteredNumber,
  );

  const currentResult = useMemo(
    () => memberCheckInFixtures[viewState],
    [viewState],
  );

  const CurrentStatusIcon = currentResult.icon;

  const handleSearch = () => {
    const matchedState = (
      Object.entries(memberCheckInFixtures).find(([, result]) => result.enteredNumber === memberNumber)
        ?.[0] as CheckInViewState | undefined
    ) ?? viewState;

    setViewState(matchedState);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GymShellHeader />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-border/80 py-0 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <CardContent className="space-y-0 px-0">
            <div className="flex flex-col gap-4 border-b border-border/80 bg-[color:color-mix(in_srgb,var(--muted)_36%,white_64%)] px-4 py-5 sm:flex-row sm:items-end sm:justify-center sm:px-8">
              <div className="w-full max-w-md space-y-2">
                <Label htmlFor="member-number" className="text-xs font-medium tracking-[0.02em] text-muted-foreground">
                  Enter Member Number
                </Label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Hash className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="member-number"
                      value={memberNumber}
                      onChange={(event) => setMemberNumber(event.target.value)}
                      className="h-11 border-border bg-surface pl-9 text-sm shadow-none"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleSearch}
                    className="h-11 rounded-[var(--radius-sm)] bg-primary px-6 text-xs font-semibold tracking-[0.04em] text-primary-foreground uppercase hover:bg-[var(--primary-hover)]"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <section className={`grid gap-6 rounded-[var(--radius-lg)] ${currentResult.panelTone} p-4 ${currentResult.panelTextTone} sm:grid-cols-[112px_1fr_150px] sm:items-center sm:p-5`}>
                <div className="mx-auto overflow-hidden rounded-[var(--radius-md)] border-4 border-white/45 shadow-lg sm:mx-0">
                  <Avatar className="h-28 w-24 rounded-none sm:h-32 sm:w-28">
                    <AvatarImage src="/Frida.png" alt={currentResult.memberName} className="object-cover" />
                    <AvatarFallback className="rounded-none bg-white/20 text-lg font-bold text-white">
                      SJ
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <h1 className="max-w-[14ch] text-4xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-[3rem]">
                    {currentResult.headline}
                  </h1>
                </div>
                <div className="flex flex-col items-center gap-3 sm:items-end">
                  <div className={`flex size-24 items-center justify-center rounded-full border-2 ${currentResult.accentRing}`}>
                    <div className={`flex size-18 items-center justify-center rounded-full ${currentResult.iconWrapperClassName}`}>
                      <CurrentStatusIcon className="size-11 stroke-[3]" />
                    </div>
                  </div>
                  <p className="text-center text-sm font-semibold text-white/95">
                    {currentResult.subheadline}
                  </p>
                </div>
              </section>

              <div className="grid gap-6 bg-card px-3 py-5 sm:grid-cols-[1fr_1.15fr] sm:px-2">
                <section className="space-y-4 rounded-[var(--radius-md)] border border-border/60 bg-card p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <ShieldCheck className="size-5 text-muted-foreground" />
                    <h2>Member Details</h2>
                  </div>
                  <Separator />
                  <dl className="grid gap-x-4 gap-y-4 text-sm sm:grid-cols-2">
                    <div className="space-y-1 sm:col-span-1">
                      <dt className="text-xs font-medium tracking-[0.02em] text-muted-foreground uppercase">Name</dt>
                      <dd className="font-semibold text-foreground">{currentResult.memberName}</dd>
                    </div>
                    <div className="space-y-1 sm:col-span-1">
                      <dt className="text-xs font-medium tracking-[0.02em] text-muted-foreground uppercase">Member Number</dt>
                      <dd className="font-semibold text-foreground">{currentResult.memberNumber}</dd>
                    </div>
                    <div className="space-y-1 sm:col-span-1">
                      <dt className="text-xs font-medium tracking-[0.02em] text-muted-foreground uppercase">Member Since</dt>
                      <dd className="font-semibold text-foreground">{currentResult.startDate}</dd>
                    </div>
                    <div className="space-y-1 sm:col-span-1">
                      <dt className="text-xs font-medium tracking-[0.02em] text-muted-foreground uppercase">Status</dt>
                      <dd>
                        <Badge className={currentResult.badgeClassName}>{currentResult.statusLabel}</Badge>
                      </dd>
                    </div>
                  </dl>
                </section>

                <section className="space-y-4 rounded-[var(--radius-md)] border border-border/60 bg-card p-4 sm:p-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                      <Dumbbell className="size-5 text-muted-foreground" />
                      <h2>Amenities Included</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">{currentResult.amenitiesIntro}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {currentResult.amenities.map((amenity) => (
                      <AmenityTile key={amenity.label} amenity={amenity} />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t border-border/80 bg-[color:color-mix(in_srgb,var(--success)_10%,white_90%)] px-5 py-4 text-sm text-[var(--success-foreground)]">
            <div className="flex w-full items-center justify-center gap-2 text-center font-medium">
              <Check className="size-4 text-[var(--success)]" />
              <p>{currentResult.footerMessage}</p>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {(
            [
              "success-active-member",
              "payment-invalid-past-due",
              "membership-cancelled-access-denied",
            ] satisfies CheckInViewState[]
          ).map((state) => (
            <Button
              key={state}
              type="button"
              variant={state === viewState ? "default" : "outline"}
              onClick={() => {
                setViewState(state);
                setMemberNumber(memberCheckInFixtures[state].enteredNumber);
              }}
              className="capitalize"
            >
              {state.replaceAll("-", " ")}
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function HomePage() {
  return <MemberCheckInResultView initialState="success-active-member" />;
}
