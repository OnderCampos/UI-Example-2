import { AlertTriangle, Bell, Check, Search, Wallet, X, XCircle } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type MemberCheckInState = "success-active-member" | "payment-method-invalid-past-due" | "membership-cancelled-access-denied";

type Amenity = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
};

type MemberRecord = {
  name: string;
  memberNumber: string;
  enteredMemberNumber: string;
  memberSince: string;
  status: string;
  photo?: string;
  amenities: Amenity[];
};

type StateConfig = {
  title: string;
  titleClassName: string;
  headerClassName: string;
  panelClassName: string;
  iconWrapClassName: string;
  statusBadgeClassName: string;
  message: string;
  bannerTitle: string;
  bannerDescription: string;
  resultLabel: string;
  resultIcon: React.ComponentType<{ className?: string }>;
  resultIconClassName: string;
};

const membersByState: Record<MemberCheckInState, MemberRecord> = {
  "success-active-member": {
    name: "Michael Davis",
    memberNumber: "997654",
    enteredMemberNumber: "987654",
    memberSince: "Mar 10, 2023",
    status: "Active",
    photo: "/Frida.png",
    amenities: [
      { name: "Weights", icon: Wallet },
      { name: "Basketball Court", icon: Check },
      { name: "Sauna", icon: Bell },
    ],
  },
  "payment-method-invalid-past-due": {
    name: "Michael Davis",
    memberNumber: "997654",
    enteredMemberNumber: "987654",
    memberSince: "Mar 10, 2023",
    status: "Past Due",
    photo: "/Frida.png",
    amenities: [
      { name: "Weights", icon: Wallet },
      { name: "Basketball Court", icon: Check },
      { name: "Sauna", icon: Bell },
    ],
  },
  "membership-cancelled-access-denied": {
    name: "Michael Davis",
    memberNumber: "997654",
    enteredMemberNumber: "987654",
    memberSince: "Mar 10, 2023",
    status: "Cancelled",
    photo: "/Frida.png",
    amenities: [
      { name: "Weights", icon: Wallet },
      { name: "Basketball Court", icon: Check },
      { name: "Sauna", icon: Bell },
    ],
  },
};

const stateConfig: Record<MemberCheckInState, StateConfig> = {
  "success-active-member": {
    title: "Check-In Approved",
    titleClassName: "text-[clamp(2rem,4vw,3.2rem)] text-emerald-950",
    headerClassName: "bg-[var(--status-success-surface)]",
    panelClassName: "bg-[var(--status-success-panel)]",
    iconWrapClassName: "border-white/70 bg-white/15 text-white",
    statusBadgeClassName: "border-transparent bg-[var(--status-success-badge)] text-emerald-950",
    message: "Welcome back! Your membership is active and ready for today&apos;s workout.",
    bannerTitle: "Enjoy Your Workout",
    bannerDescription: "Your account is in good standing and all included amenities are available.",
    resultLabel: "Check-In Successful",
    resultIcon: Check,
    resultIconClassName: "text-white",
  },
  "payment-method-invalid-past-due": {
    title: "Invalid\nPayment Method",
    titleClassName: "text-[clamp(2rem,4vw,3.15rem)] text-amber-950",
    headerClassName: "bg-[var(--status-warning-surface)]",
    panelClassName: "bg-[var(--status-warning-panel)]",
    iconWrapClassName: "border-white/70 bg-white/12 text-white",
    statusBadgeClassName: "border-transparent bg-[var(--status-warning-badge)] text-amber-950",
    message: "The payment method on file could not be processed.",
    bannerTitle: "Please Update Payment Info",
    bannerDescription: "To continue enjoying your membership, please update your payment information at your earliest convenience.",
    resultLabel: "Check-In Successful",
    resultIcon: X,
    resultIconClassName: "text-white",
  },
  "membership-cancelled-access-denied": {
    title: "Access\nDenied",
    titleClassName: "text-[clamp(2rem,4vw,3.15rem)] text-red-950",
    headerClassName: "bg-[var(--status-error-surface)]",
    panelClassName: "bg-[var(--status-error-panel)]",
    iconWrapClassName: "border-white/70 bg-white/12 text-white",
    statusBadgeClassName: "border-transparent bg-[var(--status-error-badge)] text-red-950",
    message: "This membership has been cancelled and can no longer be used for club access.",
    bannerTitle: "Membership Cancelled",
    bannerDescription: "Please visit the front desk to reactivate the account or discuss membership options.",
    resultLabel: "Access Denied",
    resultIcon: XCircle,
    resultIconClassName: "text-white",
  },
};

function splitTitle(title: string) {
  return title.split("\n");
}

export function MemberCheckInResult({ state = "payment-method-invalid-past-due" }: { state?: MemberCheckInState }) {
  const member = membersByState[state];
  const config = stateConfig[state];
  const ResultIcon = config.resultIcon;

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ colorScheme: "light" }}>
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div>
            <p className="text-lg font-semibold leading-none">Gym Member Check-In</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Bell className="h-4 w-4" />
            <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-foreground">TB</span>
              <span className="font-medium text-foreground">Team Member</span>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 border border-border bg-[var(--color-layout-bar)] px-4 py-3 shadow-xs sm:flex-row sm:items-center sm:justify-center">
          <label htmlFor="member-number" className="text-sm text-muted-foreground">
            Enter Member Number:
          </label>
          <div className="flex w-full max-w-xl gap-2">
            <Input id="member-number" defaultValue={member.enteredMemberNumber} className="h-9 bg-surface" />
            <Button className="h-9 rounded-[var(--radius-sm)] bg-[var(--color-action-success)] px-5 text-white hover:bg-[var(--color-action-success-hover)]">
              <Search className="h-4 w-4" />
              SEARCH
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden rounded-[var(--radius-lg)] border-border bg-surface py-0 shadow-[0_10px_28px_rgba(15,23,42,0.08)]">
          <div className={cn("grid gap-0 lg:grid-cols-[1.15fr_0.55fr]", config.headerClassName)}>
            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-7">
              <Avatar className="h-28 w-24 overflow-hidden rounded-[var(--radius-md)] border-4 border-white/70 shadow-md sm:h-32 sm:w-28">
                <AvatarImage src={member.photo} alt={member.name} className="object-cover" />
                <AvatarFallback className="rounded-[var(--radius-md)] bg-white/50 text-xl font-bold text-foreground">
                  MD
                </AvatarFallback>
              </Avatar>
              <div className="space-y-3">
                <div className="space-y-1">
                  {splitTitle(config.title).map((line) => (
                    <h1 key={line} className={cn("font-extrabold leading-[0.95] tracking-[-0.03em]", config.titleClassName)}>
                      {line}
                    </h1>
                  ))}
                </div>
                <p className="max-w-xl text-sm font-medium text-foreground/70 sm:text-base">{config.message}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 p-6 text-center">
              <div className={cn("flex h-24 w-24 items-center justify-center rounded-full border-4", config.iconWrapClassName)}>
                <ResultIcon className={cn("h-14 w-14 stroke-[2.5]", config.resultIconClassName)} />
              </div>
              <p className="text-base font-medium text-foreground/80">{config.resultLabel}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[0.95fr_auto_1.45fr]">
            <section className="p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2 text-[15px] font-semibold text-foreground">
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                Member Details
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 text-sm">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{member.name}</span>
                <span className="text-muted-foreground">Member Number</span>
                <span className="font-medium">{member.memberNumber}</span>
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium">{member.memberSince}</span>
                <span className="text-muted-foreground">Status</span>
                <div>
                  <Badge className={cn("rounded-[var(--radius-sm)] px-2.5 py-1 text-xs font-semibold", config.statusBadgeClassName)}>
                    {member.status}
                  </Badge>
                </div>
              </div>
            </section>

            <Separator orientation="vertical" className="hidden lg:block" />

            <section className="p-5 sm:p-6">
              <div className="mb-1 flex items-center gap-2 text-[15px] font-semibold text-foreground">
                <X className="h-4 w-4 text-muted-foreground" />
                Amenities Included
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                This membership includes access to the following amenities:
              </p>
              <div className="flex flex-wrap gap-3">
                {member.amenities.map((amenity) => {
                  const AmenityIcon = amenity.icon;
                  return (
                    <div
                      key={amenity.name}
                      className={cn(
                        "flex min-w-28 flex-col items-center gap-2 rounded-[var(--radius-md)] border border-black/5 px-4 py-3 text-center shadow-sm",
                        config.panelClassName
                      )}
                    >
                      <AmenityIcon className="h-7 w-7 text-foreground/80" />
                      <span className="text-sm font-semibold text-foreground/80">{amenity.name}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <div className={cn("border-t border-black/5 px-5 py-4 sm:px-6", config.headerClassName)}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-black/8 p-1.5 text-foreground/80">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">{config.bannerTitle}</p>
                <p className="text-sm text-foreground/75">{config.bannerDescription}</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

export type { MemberCheckInState };
