import { Check, ChevronDown, Dumbbell, Bell, Waves, Leaf, Trophy, Search } from "lucide-react";
import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type MemberCheckInState = "check-in-success-active-member" | "check-in-failed-past-due-payment-method-invalid" | "check-in-failed-membership-cancelled-access-denied";

type Amenity = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

type MemberCheckInContent = {
  memberNumber: string;
  enteredMemberNumber: string;
  name: string;
  membershipSince: string;
  statusLabel: string;
  statusTone: "success" | "warning" | "error";
  headerTitle: string;
  headerSubtitle: string;
  footerMessage: string;
  bannerTone: "success" | "warning" | "error";
  amenities: Amenity[];
};

const amenities: Amenity[] = [
  { label: "Weights", icon: Dumbbell },
  { label: "Pool", icon: Waves },
  { label: "Recovery Room", icon: Leaf },
  { label: "Basketball Court", icon: Trophy },
];

const checkInStates: Record<MemberCheckInState, MemberCheckInContent> = {
  "check-in-success-active-member": {
    memberNumber: "123456",
    enteredMemberNumber: "123456",
    name: "Sarah Johnson",
    membershipSince: "Jan 15, 2023",
    statusLabel: "Active",
    statusTone: "success",
    headerTitle: "Welcome, Sarah Johnson!",
    headerSubtitle: "Check-In Successful",
    footerMessage: "Enjoy your workout! Thank you for being a valued member.",
    bannerTone: "success",
    amenities,
  },
  "check-in-failed-past-due-payment-method-invalid": {
    memberNumber: "123456",
    enteredMemberNumber: "123456",
    name: "Sarah Johnson",
    membershipSince: "Jan 15, 2023",
    statusLabel: "Past Due",
    statusTone: "warning",
    headerTitle: "Checkout paused for Sarah Johnson",
    headerSubtitle: "Payment method needs attention",
    footerMessage: "Please update billing with the front desk before entering the facility.",
    bannerTone: "warning",
    amenities,
  },
  "check-in-failed-membership-cancelled-access-denied": {
    memberNumber: "123456",
    enteredMemberNumber: "123456",
    name: "Sarah Johnson",
    membershipSince: "Jan 15, 2023",
    statusLabel: "Cancelled",
    statusTone: "error",
    headerTitle: "Access unavailable for Sarah Johnson",
    headerSubtitle: "Membership cancelled",
    footerMessage: "Please speak with a team member to restore access.",
    bannerTone: "error",
    amenities,
  },
};

const statusBadgeClassMap = {
  success: "border-transparent bg-[var(--success-soft)] text-[var(--success)]",
  warning: "border-transparent bg-[var(--warning-soft)] text-[var(--warning)]",
  error: "border-transparent bg-[var(--error-soft)] text-[var(--error)]",
};

const bannerClassMap = {
  success: "from-[var(--success)] to-[var(--success-strong)] text-white",
  warning: "from-[var(--warning)] to-[var(--warning-strong)] text-white",
  error: "from-[var(--error)] to-[var(--error-strong)] text-white",
};

const bannerAccentClassMap = {
  success: "border-white/25 bg-white/14 text-white",
  warning: "border-white/25 bg-white/16 text-white",
  error: "border-white/25 bg-white/16 text-white",
};

const stateIconMap = {
  success: Check,
  warning: Bell,
  error: Bell,
};

function MemberCheckInShell({ state }: { state: MemberCheckInState }) {
  const content = checkInStates[state];
  const StatusIcon = stateIconMap[content.bannerTone];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-surface shadow-[0_1px_0_rgba(15,23,42,0.04)]">
        <div className="mx-auto flex h-11 max-w-[1180px] items-center justify-between px-4 md:px-6">
          <div className="text-[15px] font-semibold">Gym Member Check-In</div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Bell className="size-4" />
            <div className="flex items-center gap-2">
              <Avatar className="size-6 bg-[var(--accent)] text-[11px] font-semibold text-muted-foreground">
                <AvatarFallback>TB</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-[12px] font-medium text-foreground">Team Member</span>
              <ChevronDown className="size-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1180px] px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-5 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:text-left">
            <label htmlFor="member-number" className="text-[12px] text-muted-foreground">
              Enter Member Number
            </label>
            <div className="flex w-full max-w-[420px] items-center gap-2">
              <Input
                id="member-number"
                value={content.enteredMemberNumber}
                readOnly
                className="h-9 rounded-sm border-border bg-white text-[13px] shadow-none"
              />
              <Button className="h-9 rounded-sm bg-[var(--success)] px-5 text-[11px] font-semibold tracking-wide text-white hover:bg-[var(--success-strong)]">
                <Search className="size-3.5" />
                SEARCH
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface py-0 shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
            <div className={cn("grid gap-5 bg-linear-to-r px-4 py-5 md:grid-cols-[112px_1fr_186px] md:px-5", bannerClassMap[content.bannerTone])}>
              <div className="flex items-center justify-center md:justify-start">
                <div className="overflow-hidden rounded-[var(--radius-sm)] border-4 border-white/65 shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
                  <Image src="/Frida.png" alt={content.name} width={92} height={92} className="h-[92px] w-[92px] object-cover" />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <h1 className="max-w-[340px] text-center text-[29px] leading-[1.14] font-bold tracking-[-0.02em] md:text-left">
                  {content.headerTitle}
                </h1>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 md:items-end">
                <div className={cn("flex size-[86px] items-center justify-center rounded-full border-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]", bannerAccentClassMap[content.bannerTone])}>
                  <StatusIcon className="size-12 stroke-[2.6]" />
                </div>
                <p className="text-center text-[18px] font-medium md:w-full md:text-right md:text-[16px]">{content.headerSubtitle}</p>
              </div>
            </div>

            <CardContent className="grid gap-0 px-0 md:grid-cols-[1fr_1fr]">
              <section className="px-5 py-4">
                <div className="mb-4 flex items-center gap-2 text-[18px] font-semibold">
                  <Bell className="size-4 text-muted-foreground" />
                  <span>Member Details</span>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-[13px]">
                  <div>
                    <div className="mb-1 text-[11px] text-muted-foreground">Name</div>
                    <div className="font-semibold">{content.name}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-[11px] text-muted-foreground">Member Number</div>
                    <div className="font-semibold">{content.memberNumber}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-[11px] text-muted-foreground">Member Since</div>
                    <div className="font-semibold">{content.membershipSince}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-[11px] text-muted-foreground">Status</div>
                    <Badge className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold", statusBadgeClassMap[content.statusTone])}>
                      {content.statusLabel}
                    </Badge>
                  </div>
                </div>
              </section>

              <div className="hidden md:block">
                <Separator orientation="vertical" className="bg-border" />
              </div>

              <section className="border-t border-border px-5 py-4 md:border-t-0">
                <div className="mb-1 flex items-center gap-2 text-[18px] font-semibold">
                  <Dumbbell className="size-4 text-muted-foreground" />
                  <span>Amenities Included</span>
                </div>
                <p className="mb-4 text-[12px] text-muted-foreground">
                  This membership includes access to the following amenities:
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {content.amenities.map((amenity) => {
                    const Icon = amenity.icon;
                    return (
                      <div key={amenity.label} className="flex min-h-[98px] flex-col items-center justify-center rounded-[var(--radius-sm)] border border-border bg-[var(--card-soft)] px-2 py-3 text-center">
                        <Icon className="mb-3 size-8 text-[var(--success-strong)]" />
                        <div className="text-[12px] font-medium text-foreground">{amenity.label}</div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </CardContent>

            <CardFooter className="justify-center gap-2 border-t border-[var(--success-soft)] bg-[var(--success-soft)] px-4 py-3 text-center text-[13px] text-foreground">
              <Check className="size-4 text-[var(--success)]" />
              <span>{content.footerMessage}</span>
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
