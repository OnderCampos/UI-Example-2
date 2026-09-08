"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Bell,
  ChevronDown,
  CircleAlert,
  CircleX,
  Dumbbell,
  Lock,
  ShieldAlert,
  Trophy,
  Waves,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CheckInViewState =
  | "success-active-member"
  | "payment-invalid-past-due"
  | "membership-cancelled-access-denied";

type ResultTone = "success" | "warning" | "error";

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
  title: string;
  sideMessage: string;
  bannerLabel: string;
  bannerDescription: string;
  tone: ResultTone;
  statusIcon: typeof X;
  amenities: Amenity[];
};

const stateOptions: CheckInViewState[] = [
  "success-active-member",
  "payment-invalid-past-due",
  "membership-cancelled-access-denied",
];

const defaultCheckInViewState: CheckInViewState = "success-active-member";

const memberCheckInFixtures: Record<CheckInViewState, MemberCheckInResult> = {
  "success-active-member": {
    memberName: "Sarah Johnson",
    memberNumber: "123456",
    startDate: "Jan 15, 2023",
    statusLabel: "Active",
    enteredNumber: "123456",
    title: "Check-In\nSuccessful",
    sideMessage: "Check-In Successful",
    bannerLabel: "Access Granted",
    bannerDescription: "Welcome in. Enjoy your workout and included amenities.",
    tone: "success",
    statusIcon: Trophy,
    amenities: [
      { label: "Weights", icon: Dumbbell },
      { label: "Pool", icon: Waves },
      { label: "Basketball Court", icon: Trophy },
    ],
  },
  "payment-invalid-past-due": {
    memberName: "Michael Davis",
    memberNumber: "997654",
    startDate: "Mar 10, 2023",
    statusLabel: "Past Due",
    enteredNumber: "987654",
    title: "Invalid\nPayment Method",
    sideMessage: "Check-In Successful",
    bannerLabel: "Payment Update Needed",
    bannerDescription:
      "For continued access, please update your payment method at the front desk.",
    tone: "warning",
    statusIcon: CircleAlert,
    amenities: [
      { label: "Weights", icon: Dumbbell },
      { label: "Basketball Court", icon: Trophy },
      { label: "Sauna", icon: Waves },
    ],
  },
  "membership-cancelled-access-denied": {
    memberName: "Lisa Roberts",
    memberNumber: "654321",
    startDate: "Oct 1, 2022",
    statusLabel: "Cancelled",
    enteredNumber: "654321",
    title: "Membership\nCancelled",
    sideMessage: "Check-In Successful",
    bannerLabel: "Access Denied",
    bannerDescription: "For assistance, please visit the front desk.",
    tone: "error",
    statusIcon: X,
    amenities: [
      { label: "Weights", icon: Dumbbell },
      { label: "Basketball Court", icon: Trophy },
      { label: "Sauna", icon: Waves },
    ],
  },
};

function isCheckInViewState(value: string | null): value is CheckInViewState {
  return value !== null && stateOptions.includes(value as CheckInViewState);
}

function GymShellHeader() {
  return (
    <header className="border-b border-border bg-[color:color-mix(in_srgb,var(--surface-elevated)_88%,white_12%)]">
      <div className="flex h-12 items-center justify-between px-4">
        <div className="text-[11px] font-semibold text-foreground sm:text-[13px]">
          Gym Member Check-In
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-full p-1.5 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <Bell className="size-4" />
          </button>
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px]">
            <span className="flex size-5 items-center justify-center rounded-full bg-muted font-medium text-foreground">
              TB
            </span>
            <div className="hidden leading-tight sm:block">
              <div className="font-medium text-foreground">Team Member</div>
              <div>com</div>
            </div>
            <ChevronDown className="size-3.5" />
          </div>
        </div>
      </div>
    </header>
  );
}

function getToneStyles(tone: ResultTone) {
  if (tone === "success") {
    return {
      hero: "bg-[linear-gradient(90deg,#dcfce7_0%,#bbf7d0_100%)]",
      iconRing: "border-white/80",
      iconText: "text-[var(--success)]",
      tile: "bg-[color:color-mix(in_srgb,var(--success)_14%,white_86%)]",
      badge: "bg-[var(--success)] text-white",
      footer: "bg-[var(--success)] text-white",
      footerIcon: "text-white",
    };
  }

  if (tone === "warning") {
    return {
      hero: "bg-[linear-gradient(90deg,#fef3c7_0%,#fcd34d_100%)]",
      iconRing: "border-white/80",
      iconText: "text-[var(--warning)]",
      tile: "bg-[color:color-mix(in_srgb,var(--warning)_18%,white_82%)]",
      badge: "bg-[var(--warning)] text-[var(--warning-foreground)]",
      footer: "bg-[var(--warning)] text-[var(--warning-foreground)]",
      footerIcon: "text-[var(--warning-foreground)]",
    };
  }

  return {
    hero: "bg-[linear-gradient(90deg,#ef161d_0%,#ff2026_100%)]",
    iconRing: "border-white/90",
    iconText: "text-white",
    tile: "bg-[var(--error-soft)]",
    badge: "bg-[var(--error)] text-white",
    footer: "bg-[linear-gradient(90deg,#ef161d_0%,#ff2026_100%)] text-white",
    footerIcon: "text-white",
  };
}

function AmenityTile({ amenity, tone }: { amenity: Amenity; tone: ResultTone }) {
  const Icon = amenity.icon;
  const toneStyles = getToneStyles(tone);

  return (
    <div
      className={`flex min-h-[84px] flex-col items-center justify-center gap-2 rounded-[var(--radius-sm-token)] border border-border/50 px-2 py-3 text-center ${toneStyles.tile}`}
    >
      <Icon className="size-7 text-foreground/70" strokeWidth={1.9} />
      <span className="text-[11px] text-foreground">{amenity.label}</span>
    </div>
  );
}

function MemberCheckInResultView({
  initialState = defaultCheckInViewState,
}: {
  initialState?: CheckInViewState;
}) {
  const [viewState, setViewState] = useState<CheckInViewState>(initialState);
  const [memberNumber, setMemberNumber] = useState(
    memberCheckInFixtures[initialState].enteredNumber,
  );

  const currentResult = useMemo(() => memberCheckInFixtures[viewState], [viewState]);
  const toneStyles = getToneStyles(currentResult.tone);
  const StatusIcon = currentResult.statusIcon;

  const handleSearch = () => {
    const matchedState =
      stateOptions.find(
        (state) => memberCheckInFixtures[state].enteredNumber === memberNumber,
      ) ?? viewState;

    setViewState(matchedState);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GymShellHeader />
      <main className="px-5 py-3 sm:px-6">
        <div className="mx-auto max-w-[980px]">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Label
              htmlFor="member-number"
              className="text-[11px] font-medium text-foreground"
            >
              Enter Member Number:
            </Label>
            <Input
              id="member-number"
              value={memberNumber}
              onChange={(event) => setMemberNumber(event.target.value)}
              className="h-8 w-[170px] rounded-[var(--radius-sm-token)] border-border bg-surface px-2 text-[11px] shadow-none"
            />
            <Button
              type="button"
              onClick={handleSearch}
              className="h-8 rounded-[var(--radius-sm-token)] bg-[var(--success-deep)] px-5 text-[11px] font-semibold uppercase text-white hover:bg-[color:color-mix(in_srgb,var(--success-deep)_84%,black_16%)]"
            >
              Search
            </Button>
          </div>

          <Card className="overflow-hidden rounded-[var(--radius-sm-token)] border-border bg-surface py-0 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
            <CardContent className="px-0">
              <section className={`grid gap-4 px-3 py-3 sm:grid-cols-[110px_1fr_150px] sm:items-center sm:px-4 sm:py-4 ${toneStyles.hero}`}>
                <div className="overflow-hidden rounded-[var(--radius-sm-token)] border border-white/80 bg-[color:color-mix(in_srgb,#475569_92%,white_8%)] shadow-sm">
                  <Avatar className="h-[82px] w-[106px] rounded-none sm:h-[84px] sm:w-[108px]">
                    <AvatarImage src="/Frida.png" alt={currentResult.memberName} className="object-cover opacity-80 grayscale" />
                    <AvatarFallback className="rounded-none bg-slate-500 text-lg font-semibold text-white">
                      {currentResult.memberName
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div>
                  <h1 className="whitespace-pre-line text-[32px] font-bold leading-[0.95] tracking-[-0.03em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.16)]">
                    {currentResult.title}
                  </h1>
                </div>

                <div className="flex flex-col items-center gap-2 sm:items-end">
                  <div className={`flex size-[74px] items-center justify-center rounded-full border-[4px] ${toneStyles.iconRing}`}>
                    <StatusIcon className={`size-10 ${toneStyles.iconText}`} strokeWidth={3} />
                  </div>
                  <p className="text-[13px] text-white">{currentResult.sideMessage}</p>
                </div>
              </section>

              <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
                <section className="border-r border-t border-border bg-surface px-4 py-4">
                  <div className="mb-3 flex items-center gap-2 text-[15px] font-semibold">
                    <CircleX className="size-4 text-foreground" />
                    <h2>Member Details</h2>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-[12px]">
                    <div>
                      <dt className="text-muted-foreground">Name</dt>
                      <dd className="mt-1 text-foreground">{currentResult.memberName}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Member Number</dt>
                      <dd className="mt-1 text-foreground">{currentResult.memberNumber}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Member Since</dt>
                      <dd className="mt-1 text-foreground">{currentResult.startDate}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Status</dt>
                      <dd className="mt-1">
                        <Badge className={`rounded-[6px] px-2 py-0.5 text-[11px] font-semibold ${toneStyles.badge}`}>
                          {currentResult.statusLabel}
                        </Badge>
                      </dd>
                    </div>
                  </dl>
                </section>

                <section className="border-t border-border bg-surface px-4 py-4">
                  <div className="mb-3 flex items-center gap-2 text-[15px] font-semibold">
                    <ShieldAlert className="size-4 text-foreground" />
                    <h2>Amenities Included</h2>
                  </div>
                  <p className="mb-4 text-[12px] text-foreground/80">
                    This membership includes access to the following amenities:
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {currentResult.amenities.map((amenity) => (
                      <AmenityTile key={amenity.label} amenity={amenity} tone={currentResult.tone} />
                    ))}
                  </div>
                </section>
              </div>
            </CardContent>

            <CardFooter className={`px-4 py-2.5 ${toneStyles.footer}`}>
              <div className="flex w-full items-center justify-center gap-2 text-center">
                <Lock className={`size-5 shrink-0 ${toneStyles.footerIcon}`} />
                <div>
                  <p className="text-[14px] font-semibold leading-none">
                    {currentResult.bannerLabel}
                  </p>
                  <p className="mt-1 text-[11px]">{currentResult.bannerDescription}</p>
                </div>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-4 flex flex-wrap gap-2">
            {stateOptions.map((state) => (
              <Button
                key={state}
                type="button"
                variant={state === viewState ? "default" : "outline"}
                onClick={() => {
                  setViewState(state);
                  setMemberNumber(memberCheckInFixtures[state].enteredNumber);
                }}
                className="text-xs capitalize"
              >
                {state.replaceAll("-", " ")}
              </Button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const requestedState = searchParams.get("state");
  const initialState = isCheckInViewState(requestedState)
    ? requestedState
    : defaultCheckInViewState;

  return <MemberCheckInResultView initialState={initialState} />;
}
