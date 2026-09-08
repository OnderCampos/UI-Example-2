import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronDown,
  CircleX,
  CreditCard,
  Dumbbell,
  Search,
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
    headerTitle: "Check-In Successful",
    headerSubtitle: "Welcome back, Sarah Johnson",
    footerTitle: "Enjoy Your Workout",
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
    headerSubtitle: "Check-In Successful",
    footerTitle: "Please Update Payment Info",
    footerMessage:
      "To continue enjoying your membership, please update your payment information at your earliest convenience.",
    bannerTone: "warning",
    amenities: [amenityLibrary.weights, amenityLibrary.basketball, amenityLibrary.sauna],
  },
  "check-in-failed-membership-cancelled-access-denied": {
    memberNumber: "452819",
    enteredMemberNumber: "452819",
    name: "Jordan Smith",
    membershipSince: "Aug 02, 2021",
    statusLabel: "Cancelled",
    statusTone: "error",
    headerTitle: "Membership\nCancelled",
    headerSubtitle: "Access Denied",
    footerTitle: "Please See Front Desk",
    footerMessage: "A team member can help review renewal options and restore access.",
    bannerTone: "error",
    amenities: [amenityLibrary.weights, amenityLibrary.basketball, amenityLibrary.sauna],
  },
};

const statusBadgeClassMap = {
  success: "border-transparent bg-[color-mix(in_oklab,var(--success)_18%,white)] text-[var(--success)]",
  warning: "border-transparent bg-[var(--warning-soft)] text-[var(--warning-strong)]",
  error: "border-transparent bg-[var(--error-soft)] text-[var(--error-strong)]",
};

const bannerClassMap = {
  success: "bg-[linear-gradient(135deg,color-mix(in_oklab,var(--success)_86%,white),var(--success-strong))] text-white",
  warning: "bg-[linear-gradient(135deg,#f9cd33,#efb120)] text-[var(--text)]",
  error: "bg-[linear-gradient(135deg,color-mix(in_oklab,var(--error)_88%,white),var(--error-strong))] text-white",
};

const bannerAccentClassMap = {
  success: "border-white/30 text-white",
  warning: "border-[#f7e3a0] text-[#fef7d6]",
  error: "border-white/30 text-white",
};

const footerClassMap = {
  success: "border-[color-mix(in_oklab,var(--success)_14%,white)] bg-[color-mix(in_oklab,var(--success)_12%,white)]",
  warning: "border-[color-mix(in_oklab,var(--warning)_22%,white)] bg-[linear-gradient(180deg,#f4c625,#f1bf1d)] text-[var(--text)]",
  error: "border-[color-mix(in_oklab,var(--error)_15%,white)] bg-[color-mix(in_oklab,var(--error)_12%,white)]",
};

const footerIconToneMap = {
  success: "text-[var(--success)]",
  warning: "text-[var(--text)]",
  error: "text-[var(--error-strong)]",
};

const amenityCardClassMap = {
  success: "bg-[color-mix(in_oklab,var(--success)_10%,white)]",
  warning: "bg-[color-mix(in_oklab,var(--warning)_18%,white)]",
  error: "bg-[color-mix(in_oklab,var(--error)_8%,white)]",
};

const amenityIconToneMap = {
  success: "text-[var(--success-strong)]",
  warning: "text-[var(--warning-strong)]",
  error: "text-[var(--error-strong)]",
};

const stateVisuals = {
  success: {
    icon: CheckCircle2,
    footerIcon: CheckCircle2,
    sectionIcon: SquareUserRound,
    amenitiesIcon: Dumbbell,
  },
  warning: {
    icon: CircleX,
    footerIcon: CreditCard,
    sectionIcon: SquareUserRound,
    amenitiesIcon: CircleX,
  },
  error: {
    icon: CircleX,
    footerIcon: AlertTriangle,
    sectionIcon: SquareUserRound,
    amenitiesIcon: CircleX,
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
        <div className="mx-auto flex h-11 max-w-[1180px] items-center justify-between px-4 md:px-6">
          <div className="text-[15px] font-semibold">Gym Member Check-In</div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Bell className="size-4" />
            <div className="flex items-center gap-2">
              <Avatar className="size-6 bg-accent text-[11px] font-semibold text-muted-foreground">
                <AvatarFallback>TB</AvatarFallback>
              </Avatar>
              <span className="hidden text-[12px] font-medium text-foreground sm:inline">Team Member</span>
              <ChevronDown className="size-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-5 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:text-left">
            <label htmlFor="member-number" className="text-[12px] text-muted-foreground">
              Enter Member Number:
            </label>
            <div className="flex w-full max-w-[425px] items-center gap-2">
              <Input
                id="member-number"
                value={content.enteredMemberNumber}
                readOnly
                className="h-9 rounded-[var(--radius-sm)] border-border bg-white text-[13px] shadow-none"
              />
              <Button className="h-9 rounded-[var(--radius-sm)] bg-[var(--success-strong)] px-5 text-[11px] font-semibold tracking-wide text-white hover:bg-[var(--success)]">
                SEARCH
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden rounded-[var(--radius-md-token)] border border-border bg-surface py-0 shadow-[0_10px_24px_rgba(15,23,42,0.10)]">
            <div className={cn("grid gap-5 px-3 py-4 md:grid-cols-[112px_1fr_170px] md:px-4 md:py-3.5", bannerClassMap[content.bannerTone])}>
              <div className="flex items-center justify-center md:justify-start">
                <div className="overflow-hidden rounded-[var(--radius-sm)] border border-white/55 bg-white/70 shadow-[0_6px_12px_rgba(0,0,0,0.08)]">
                  <Image src="/Frida.png" alt={content.name} width={98} height={98} className="h-[98px] w-[98px] object-cover" />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <h1 className="whitespace-pre-line text-center text-[31px] leading-[1.05] font-bold tracking-[-0.03em] md:text-left">
                  {content.headerTitle}
                </h1>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 md:items-end">
                <div className={cn("flex size-[78px] items-center justify-center rounded-full border-[3px]", bannerAccentClassMap[content.bannerTone])}>
                  <BannerIcon className="size-11 stroke-[2.4]" />
                </div>
                <p className="text-center text-[14px] font-medium md:text-right">{content.headerSubtitle}</p>
              </div>
            </div>

            <CardContent className="grid gap-0 px-0 md:grid-cols-[1fr_1px_1.72fr]">
              <section className="px-4 py-4 md:px-5">
                <div className="mb-4 flex items-center gap-2 text-[17px] font-semibold">
                  <MemberDetailsIcon className="size-4 text-muted-foreground" />
                  <span>Member Details</span>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-[13px]">
                  <div>
                    <div className="mb-1 text-[11px] text-muted-foreground">Name</div>
                    <div className="font-medium">{content.name}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-[11px] text-muted-foreground">Member Number</div>
                    <div className="font-medium">{content.memberNumber}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-[11px] text-muted-foreground">Member Since</div>
                    <div className="font-medium">{content.membershipSince}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-[11px] text-muted-foreground">Status</div>
                    <Badge className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", statusBadgeClassMap[content.statusTone])}>
                      {content.statusLabel}
                    </Badge>
                  </div>
                </div>
              </section>

              <Separator orientation="vertical" className="hidden h-auto bg-border md:block" />

              <section className="border-t border-border px-4 py-4 md:border-t-0 md:px-5">
                <div className="mb-1 flex items-center gap-2 text-[17px] font-semibold">
                  <AmenitiesIcon className="size-4 text-muted-foreground" />
                  <span>Amenities Included</span>
                </div>
                <p className="mb-4 text-[12px] text-muted-foreground">
                  This membership includes access to the following amenities:
                </p>

                <div className="grid max-w-[430px] grid-cols-3 gap-3">
                  {content.amenities.map((amenity) => {
                    const Icon = amenity.icon;
                    return (
                      <div
                        key={amenity.label}
                        className={cn(
                          "flex min-h-[82px] flex-col items-center justify-center rounded-[var(--radius-sm)] border border-border px-2 py-3 text-center",
                          amenityCardClassMap[content.bannerTone]
                        )}
                      >
                        <Icon className={cn("mb-2.5 size-7", amenityIconToneMap[content.bannerTone])} />
                        <div className="text-[11px] font-medium leading-[1.2] text-foreground">{amenity.label}</div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </CardContent>

            <CardFooter
              className={cn(
                "justify-center gap-2 border-t px-4 py-3 text-center text-[13px]",
                footerClassMap[content.bannerTone]
              )}
            >
              <FooterIcon className={cn("size-4 shrink-0", footerIconToneMap[content.bannerTone])} />
              <div>
                <div className="font-semibold">{content.footerTitle}</div>
                <div className="text-[11px] opacity-90">{content.footerMessage}</div>
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
