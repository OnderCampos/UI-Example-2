"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  Check,
  ChevronDown,
  CircleX,
  CreditCard,
  Dumbbell,
  Hash,
  ShieldX,
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

type ResultTone = "success" | "warning" | "error";

type MemberCheckInResult = {
  memberName: string;
  memberNumber: string;
  startDate: string;
  statusLabel: string;
  enteredNumber: string;
  title: string;
  rightMessage: string;
  bannerLabel: string;
  bannerDescription: string;
  tone: ResultTone;
  icon: typeof Check;
  detailIcon: typeof CreditCard;
  amenitiesIntro: string;
  amenities: Amenity[];
};

const amenityFixtures: Record<CheckInViewState, Amenity[]> = {
  "success-active-member": [
    { label: "Weights", icon: Dumbbell },
    { label: "Pool", icon: Waves },
    { label: "Recovery Room", icon: CreditCard },
    { label: "Basketball Court", icon: Dumbbell },
  ],
  "payment-invalid-past-due": [
    { label: "Weights", icon: Dumbbell },
    { label: "Basketball Court", icon: Dumbbell },
    { label: "Sauna", icon: Waves },
  ],
  "membership-cancelled-access-denied": [
    { label: "Weights", icon: Dumbbell },
    { label: "Locker Room", icon: Waves },
    { label: "Group Fitness", icon: CreditCard },
  ],
};

const memberCheckInFixtures: Record<CheckInViewState, MemberCheckInResult> = {
  "success-active-member": {
    memberName: "Sarah Johnson",
    memberNumber: "123456",
    startDate: "Jan 15, 2023",
    statusLabel: "Active",
    enteredNumber: "123456",
    title: "Check-In Successful",
    rightMessage: "Welcome Back",
    bannerLabel: "Enjoy Your Workout",
    bannerDescription:
      "Your membership is active and all included amenities are available today.",
    tone: "success",
    icon: Check,
    detailIcon: Check,
    amenitiesIntro:
      "This membership includes access to the following amenities:",
    amenities: amenityFixtures["success-active-member"],
  },
  "payment-invalid-past-due": {
    memberName: "Michael Davis",
    memberNumber: "997654",
    startDate: "Mar 10, 2023",
    statusLabel: "Past Due",
    enteredNumber: "987654",
    title: "Invalid\nPayment Method",
    rightMessage: "Check-In Successful",
    bannerLabel: "Please Update Payment Info",
    bannerDescription:
      "To continue enjoying your membership, please update your payment information at your earliest convenience.",
    tone: "warning",
    icon: CircleX,
    detailIcon: CreditCard,
    amenitiesIntro:
      "This membership includes access to the following amenities:",
    amenities: amenityFixtures["payment-invalid-past-due"],
  },
  "membership-cancelled-access-denied": {
    memberName: "Taylor Brooks",
    memberNumber: "228410",
    startDate: "Aug 02, 2022",
    statusLabel: "Cancelled",
    enteredNumber: "228410",
    title: "Membership\nCancelled",
    rightMessage: "Access Denied",
    bannerLabel: "Contact Membership Services",
    bannerDescription:
      "This membership is no longer active. Please speak with the membership team to restore access.",
    tone: "error",
    icon: ShieldX,
    detailIcon: AlertTriangle,
    amenitiesIntro:
      "These amenities are currently unavailable while the membership remains cancelled:",
    amenities: amenityFixtures["membership-cancelled-access-denied"],
  },
};

const stateOptions: CheckInViewState[] = [
  "success-active-member",
  "payment-invalid-past-due",
  "membership-cancelled-access-denied",
];

function GymShellHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex h-11 items-center justify-between px-4 text-[11px] text-foreground">
        <div className="font-medium">Gym Member Check-In</div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-full p-1.5 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <Bell className="size-3.5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[9px] font-semibold text-foreground">
              TB
            </span>
            <div className="hidden leading-tight sm:block">
              <div className="font-medium text-foreground">Team Member</div>
              <div className="text-[9px]">com</div>
            </div>
            <ChevronDown className="size-3.5" />
          </div>
        </div>
      </div>
    </header>
  );
}

function getToneClasses(tone: ResultTone) {
  if (tone === "success") {
    return {
      hero: "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--success)_24%,#fff4d6_76%),color-mix(in_srgb,var(--warning)_18%,#fff4d6_82%))]",
      iconOuter: "border-white/70",
      iconInner: "bg-[color:color-mix(in_srgb,var(--success)_18%,white_82%)] text-[var(--success)]",
      tile: "bg-[color:color-mix(in_srgb,var(--success)_10%,#fef3c7_90%)]",
      badge: "border-transparent bg-[color:color-mix(in_srgb,var(--success)_18%,white_82%)] text-[var(--success-foreground)]",
      footer: "bg-[color:color-mix(in_srgb,var(--success)_12%,#fff4d6_88%)] text-[var(--success-foreground)]",
      footerIcon: "text-[var(--success)]",
    };
  }

  if (tone === "error") {
    return {
      hero: "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--error)_20%,#fff0f0_80%),color-mix(in_srgb,var(--warning)_15%,#fff0f0_85%))]",
      iconOuter: "border-white/75",
      iconInner: "bg-[color:color-mix(in_srgb,var(--error)_15%,white_85%)] text-[var(--error)]",
      tile: "bg-[color:color-mix(in_srgb,var(--error)_10%,#fff4d6_90%)]",
      badge: "border-transparent bg-[color:color-mix(in_srgb,var(--error)_16%,white_84%)] text-[var(--error-foreground)]",
      footer: "bg-[color:color-mix(in_srgb,var(--error)_12%,#fff4d6_88%)] text-[var(--error-foreground)]",
      footerIcon: "text-[var(--error)]",
    };
  }

  return {
    hero: "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--warning)_78%,#fde68a_22%),color-mix(in_srgb,#fbbf24_88%,#f59e0b_12%))]",
    iconOuter: "border-[#f8e2a2]",
    iconInner: "bg-[color:color-mix(in_srgb,#fef3c7_70%,white_30%)] text-[var(--warning)]",
    tile: "bg-[color:color-mix(in_srgb,var(--warning)_16%,white_84%)]",
    badge: "border-transparent bg-[color:color-mix(in_srgb,var(--warning)_20%,white_80%)] text-[var(--warning-foreground)]",
    footer: "bg-[color:color-mix(in_srgb,var(--warning)_82%,white_18%)] text-[var(--warning-foreground)]",
    footerIcon: "text-[var(--warning-foreground)]",
  };
}

function AmenityTile({ amenity, tone }: { amenity: Amenity; tone: ResultTone }) {
  const Icon = amenity.icon;
  const toneClasses = getToneClasses(tone);

  return (
    <div className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-border/60 ${toneClasses.tile} px-3 py-3 text-center`}>
      <div className="flex size-8 items-center justify-center rounded-[var(--radius-sm)] bg-card text-muted-foreground shadow-sm">
        <Icon className="size-4" />
      </div>
      <span className="text-[11px] font-medium leading-tight text-foreground">{amenity.label}</span>
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
  const toneClasses = getToneClasses(currentResult.tone);

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
      <main className="px-4 py-4">
        <div className="mx-auto max-w-[1120px]">
          <Card className="overflow-hidden rounded-[var(--radius-sm)] border-border py-0 shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
            <CardContent className="px-0">
              <div className="border-b border-border bg-muted/40 px-4 py-4">
                <div className="mx-auto flex max-w-[560px] items-center gap-2">
                  <Label htmlFor="member-number" className="shrink-0 text-[11px] text-muted-foreground">
                    Enter Member Number:
                  </Label>
                  <Input
                    id="member-number"
                    value={memberNumber}
                    onChange={(event) => setMemberNumber(event.target.value)}
                    className="h-8 rounded-[var(--radius-sm)] border-border bg-card px-2.5 text-[11px] shadow-none"
                  />
                  <Button
                    type="button"
                    onClick={handleSearch}
                    className="h-8 rounded-[var(--radius-sm)] bg-[var(--success)] px-5 text-[11px] font-semibold uppercase tracking-[0.02em] text-white hover:bg-[color:color-mix(in_srgb,var(--success)_86%,black_14%)]"
                  >
                    Search
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <section className={`grid gap-4 ${toneClasses.hero} px-3 py-4 sm:grid-cols-[96px_1fr_150px] sm:items-center sm:px-4 sm:py-5`}>
                  <div className="overflow-hidden rounded-[var(--radius-sm)] border-2 border-white/70 bg-white shadow-sm">
                    <Avatar className="h-[104px] w-[92px] rounded-none sm:h-[112px] sm:w-[96px]">
                      <AvatarImage src="/Frida.png" alt={currentResult.memberName} className="object-cover" />
                      <AvatarFallback className="rounded-none bg-muted text-sm font-semibold text-foreground">
                        {currentResult.memberName
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="space-y-1">
                    <h1 className="whitespace-pre-line text-[29px] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">
                      {currentResult.title}
                    </h1>
                  </div>

                  <div className="flex flex-col items-center gap-2 sm:items-end">
                    <div className={`flex size-[74px] items-center justify-center rounded-full border-[3px] ${toneClasses.iconOuter}`}>
                      <div className={`flex size-[54px] items-center justify-center rounded-full ${toneClasses.iconInner}`}>
                        <CurrentStatusIcon className="size-8 stroke-[2.8]" />
                      </div>
                    </div>
                    <p className="text-[13px] text-foreground">{currentResult.rightMessage}</p>
                  </div>
                </section>

                <div className="grid border-x border-b border-border sm:grid-cols-[0.9fr_1.1fr]">
                  <section className="border-b border-border bg-card p-4 sm:border-r sm:border-b-0">
                    <div className="mb-3 flex items-center gap-2 text-[15px] font-semibold text-foreground">
                      <Hash className="size-4 text-muted-foreground" />
                      <h2>Member Details</h2>
                    </div>
                    <Separator className="mb-4" />
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-[12px]">
                      <div className="space-y-0.5">
                        <dt className="text-muted-foreground">Name</dt>
                        <dd className="font-medium text-foreground">{currentResult.memberName}</dd>
                      </div>
                      <div className="space-y-0.5">
                        <dt className="text-muted-foreground">Member Number</dt>
                        <dd className="font-medium text-foreground">{currentResult.memberNumber}</dd>
                      </div>
                      <div className="space-y-0.5">
                        <dt className="text-muted-foreground">Member Since</dt>
                        <dd className="font-medium text-foreground">{currentResult.startDate}</dd>
                      </div>
                      <div className="space-y-0.5">
                        <dt className="text-muted-foreground">Status</dt>
                        <dd>
                          <Badge className={toneClasses.badge}>{currentResult.statusLabel}</Badge>
                        </dd>
                      </div>
                    </dl>
                  </section>

                  <section className="bg-card p-4">
                    <div className="mb-3 flex items-center gap-2 text-[15px] font-semibold text-foreground">
                      <currentResult.detailIcon className="size-4 text-muted-foreground" />
                      <h2>Amenities Included</h2>
                    </div>
                    <p className="mb-4 text-[12px] text-muted-foreground">
                      {currentResult.amenitiesIntro}
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {currentResult.amenities.map((amenity) => (
                        <AmenityTile key={amenity.label} amenity={amenity} tone={currentResult.tone} />
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </CardContent>

            <CardFooter className={`border-t border-border px-4 py-3 ${toneClasses.footer}`}>
              <div className="flex w-full items-start justify-center gap-2 text-center">
                <AlertTriangle className={`mt-0.5 size-4 shrink-0 ${toneClasses.footerIcon}`} />
                <div>
                  <p className="text-[13px] font-semibold">{currentResult.bannerLabel}</p>
                  <p className="mt-1 text-[10px] leading-relaxed">{currentResult.bannerDescription}</p>
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
  return <MemberCheckInResultView initialState="payment-invalid-past-due" />;
}
