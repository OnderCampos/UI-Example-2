import {
  Bell,
  ChevronDown,
  CircleCheckBig,
  CircleX,
  CreditCard,
  Dumbbell,
  Lock,
  SquareUserRound,
  Waves,
} from "lucide-react";
import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type MemberCheckInState =
  | "check-in-success-active-member"
  | "check-in-failed-past-due-payment-method-invalid"
  | "check-in-failed-membership-cancelled-access-denied";

type Amenity = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

type CheckInTone = "success" | "warning" | "error";

type MemberCheckInContent = {
  memberNumber: string;
  enteredMemberNumber: string;
  name: string;
  membershipSince: string;
  statusLabel: string;
  statusTone: CheckInTone;
  headerTitle: string;
  headerSubtitle: string;
  footerTitle: string;
  footerMessage: string;
  bannerTone: CheckInTone;
  amenities: Amenity[];
};

const amenityLibrary: Record<string, Amenity> = {
  weights: { label: "Weights", icon: Dumbbell },
  basketball: { label: "Basketball Court", icon: Waves },
  sauna: { label: "Sauna", icon: Waves },
};

const checkInStates: Record<MemberCheckInState, MemberCheckInContent> = {
  "check-in-success-active-member": {
    memberNumber: "123456",
    enteredMemberNumber: "123456",
    name: "Sarah Johnson",
    membershipSince: "Jan 15, 2023",
    statusLabel: "Active",
    statusTone: "success",
    headerTitle: "Check-In\nSuccessful",
    headerSubtitle: "Welcome Back",
    footerTitle: "Access Granted",
    footerMessage: "You are all set to use your membership today.",
    bannerTone: "success",
    amenities: [amenityLibrary.weights, amenityLibrary.basketball, amenityLibrary.sauna],
  },
  "check-in-failed-past-due-payment-method-invalid": {
    memberNumber: "997654",
    enteredMemberNumber: "987654",
    name: "Michael Davis",
    membershipSince: "Mar 10, 2023",
    statusLabel: "Past Due",
    statusTone: "warning",
    headerTitle: "Invalid\nPayment Method",
    headerSubtitle: "Check-In Failed",
    footerTitle: "Payment Issue",
    footerMessage:
      "Please update your payment information at the front desk to restore access.",
    bannerTone: "warning",
    amenities: [amenityLibrary.weights, amenityLibrary.basketball, amenityLibrary.sauna],
  },
  "check-in-failed-membership-cancelled-access-denied": {
    memberNumber: "654321",
    enteredMemberNumber: "987654",
    name: "Lisa Roberts",
    membershipSince: "Oct 1, 2022",
    statusLabel: "Cancelled",
    statusTone: "error",
    headerTitle: "Membership\nCancelled",
    headerSubtitle: "Check-In Successful",
    footerTitle: "Access Denied",
    footerMessage: "For assistance, please visit the front desk.",
    bannerTone: "error",
    amenities: [amenityLibrary.weights, amenityLibrary.basketball, amenityLibrary.sauna],
  },
};

const statusBadgeClassMap = {
  success: "border-transparent bg-[color-mix(in_oklab,var(--success)_18%,white)] text-[var(--success-strong)]",
  warning: "border-transparent bg-[var(--warning-soft)] text-[var(--warning-strong)]",
  error: "border-transparent bg-[var(--error-strong)] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]",
};

const bannerClassMap = {
  success:
    "bg-[linear-gradient(135deg,color-mix(in_oklab,var(--success)_86%,white),var(--success-strong))] text-white",
  warning: "bg-[linear-gradient(135deg,#f9cd33,#efb120)] text-[var(--foreground)]",
  error: "bg-[linear-gradient(135deg,#ff1e1e,#ef4444)] text-white",
};

const bannerAccentClassMap = {
  success: "border-white/30 text-white",
  warning: "border-white/50 text-white/90",
  error: "border-white/60 text-white",
};

const footerClassMap = {
  success: "border-transparent bg-[linear-gradient(135deg,var(--success),var(--success-strong))] text-white",
  warning: "border-transparent bg-[linear-gradient(135deg,#f4c625,#f1bf1d)] text-[var(--foreground)]",
  error: "border-transparent bg-[linear-gradient(135deg,#ff1e1e,#ef4444)] text-white",
};

const footerIconToneMap = {
  success: "text-white",
  warning: "text-[var(--foreground)]",
  error: "text-white",
};

const amenityCardClassMap = {
  success: "border-[color-mix(in_oklab,var(--success)_10%,var(--border))] bg-[color-mix(in_oklab,var(--success)_10%,white)]",
  warning: "border-[color-mix(in_oklab,var(--warning)_16%,var(--border))] bg-[color-mix(in_oklab,var(--warning)_18%,white)]",
  error: "border-[color-mix(in_oklab,var(--error)_14%,var(--border))] bg-[color-mix(in_oklab,var(--error)_16%,white)]",
};

const amenityIconToneMap = {
  success: "text-[var(--success-strong)]",
  warning: "text-[var(--warning-strong)]",
  error: "text-[var(--error-strong)]",
};

const stateVisuals = {
  success: {
    icon: CircleCheckBig,
    footerIcon: CircleCheckBig,
    sectionIcon: SquareUserRound,
    amenitiesIcon: Dumbbell,
  },
  warning: {
    icon: CircleX,
    footerIcon: CreditCard,
    sectionIcon: SquareUserRound,
    amenitiesIcon: Dumbbell,
  },
  error: {
    icon: CircleX,
    footerIcon: Lock,
    sectionIcon: SquareUserRound,
    amenitiesIcon: Dumbbell,
  },
};

function MemberCheckInShell({ state }: { state: MemberCheckInState }) {
  const content = checkInStates[state];
  const visuals = stateVisuals[content.bannerTone];
  const BannerIcon = visuals.icon;
  const FooterIcon = visuals.footerIcon;
  const MemberDetailsIcon = visuals.sectionIcon;
  const AmenitiesIcon = visuals.amenitiesIcon;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-surface shadow-[0_1px_0_rgba(15,23,42,0.04)]">
        <div className="mx-auto flex h-12 max-w-[1180px] items-center justify-between px-4 md:px-6">
          <div className="text-[14px] font-semibold">Gym Member Check-In</div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Bell className="size-4" />
            <div className="flex items-center gap-2">
              <Avatar className="size-6 bg-accent text-[11px] font-semibold text-muted-foreground">
                <AvatarFallback>TB</AvatarFallback>
              </Avatar>
              <span className="hidden max-w-[72px] text-[11px] leading-tight text-foreground sm:inline">
                Team Member room
              </span>
              <ChevronDown className="size-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] px-5 py-7 md:px-6 md:py-8">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-5 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:text-left">
            <label htmlFor="member-number" className="text-[12px] text-foreground">
              Enter Member Number:
            </label>
            <div className="flex w-full max-w-[430px] items-center gap-2">
              <Input
                id="member-number"
                value={content.enteredMemberNumber}
                readOnly
                className="h-8 rounded-[var(--radius-sm)] border-border bg-white px-2.5 text-[12px] shadow-none"
              />
              <Button className="h-8 rounded-[var(--radius-sm)] bg-[color-mix(in_oklab,var(--success-strong)_88%,black)] px-5 text-[10px] font-semibold tracking-[0.04em] text-white hover:bg-[var(--success-strong)]">
                SEARCH
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden rounded-[var(--radius-sm)] border border-border bg-surface py-0 shadow-[0_8px_20px_rgba(15,23,42,0.10)]">
            <div
              className={cn(
                "grid gap-5 px-3 py-3 md:grid-cols-[116px_1fr_176px] md:px-3.5 md:py-3",
                bannerClassMap[content.bannerTone]
              )}
            >
              <div className="flex items-center justify-center md:justify-start">
                <div className="overflow-hidden rounded-[var(--radius-sm)] border border-white/55 bg-[#7e7e86] shadow-[0_6px_12px_rgba(0,0,0,0.1)]">
                  <Image
                    src="/Frida.png"
                    alt={content.name}
                    width={106}
                    height={106}
                    className="h-[106px] w-[106px] object-cover grayscale"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <h1 className="whitespace-pre-line text-center text-[31px] leading-[1.05] font-bold tracking-[-0.04em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.14)] md:text-left">
                  {content.headerTitle}
                </h1>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 md:items-end">
                <div
                  className={cn(
                    "flex size-[82px] items-center justify-center rounded-full border-[4px]",
                    bannerAccentClassMap[content.bannerTone]
                  )}
                >
                  <BannerIcon className="size-11 stroke-[2.8]" />
                </div>
                <p className="text-center text-[13px] font-medium md:text-right">{content.headerSubtitle}</p>
              </div>
            </div>

            <CardContent className="grid gap-0 px-0 md:grid-cols-[1fr_1px_1.55fr]">
              <section className="px-3.5 py-4 md:px-4">
                <div className="mb-4 flex items-center gap-2 text-[18px] font-semibold">
                  <MemberDetailsIcon className="size-4 text-foreground" />
                  <span>Member Details</span>
                </div>

                <div className="grid grid-cols-2 gap-x-7 gap-y-4 text-[13px]">
                  <div>
                    <div className="mb-1 text-[11px] text-muted-foreground">Name</div>
                    <div>{content.name}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-[11px] text-muted-foreground">Member Number</div>
                    <div>{content.memberNumber}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-[11px] text-muted-foreground">Member Since</div>
                    <div>{content.membershipSince}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-[11px] text-muted-foreground">Status</div>
                    <Badge className={cn("rounded-[6px] px-2 py-0.5 text-[11px] font-semibold", statusBadgeClassMap[content.statusTone])}>
                      {content.statusLabel}
                    </Badge>
                  </div>
                </div>
              </section>

              <Separator orientation="vertical" className="hidden h-auto bg-border md:block" />

              <section className="border-t border-border px-3.5 py-4 md:border-t-0 md:px-4">
                <div className="mb-1 flex items-center gap-2 text-[18px] font-semibold">
                  <AmenitiesIcon className="size-4 text-foreground" />
                  <span>Amenities Included</span>
                </div>
                <p className="mb-4 text-[12px] text-foreground/75">
                  This membership includes access to the following amenities:
                </p>

                <div className="grid max-w-[430px] grid-cols-3 gap-3">
                  {content.amenities.map((amenity) => {
                    const Icon = amenity.icon;
                    return (
                      <div
                        key={amenity.label}
                        className={cn(
                          "flex min-h-[84px] flex-col items-center justify-center rounded-[var(--radius-sm)] px-2 py-3 text-center",
                          amenityCardClassMap[content.bannerTone]
                        )}
                      >
                        <Icon className={cn("mb-2.5 size-7", amenityIconToneMap[content.bannerTone])} />
                        <div className="text-[11px] leading-[1.2] text-foreground">{amenity.label}</div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </CardContent>

            <CardFooter
              className={cn(
                "justify-center gap-2 border-t px-4 py-2.5 text-center",
                footerClassMap[content.bannerTone]
              )}
            >
              <FooterIcon className={cn("size-5 shrink-0", footerIconToneMap[content.bannerTone])} />
              <div>
                <div className="text-[17px] font-semibold">{content.footerTitle}</div>
                <div className="text-[12px] opacity-95">{content.footerMessage}</div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ state?: string }>;
}) {
  const resolvedState = async () => {
    const params = (await searchParams) ?? {};
    const state = params.state;

    if (state && state in checkInStates) {
      return state as MemberCheckInState;
    }

    return "check-in-success-active-member" as MemberCheckInState;
  };

  return <MemberCheckInRoute statePromise={resolvedState()} />;
}

async function MemberCheckInRoute({ statePromise }: { statePromise: Promise<MemberCheckInState> }) {
  const state = await statePromise;
  return <MemberCheckInShell state={state} />;
}
