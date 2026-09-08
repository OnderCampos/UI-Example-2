import {
  Ban,
  Bell,
  Check,
  Dumbbell,
  Lock,
  Search,
  ShieldAlert,
  SquareGanttChart,
  User,
  X,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
  amenities: Amenity[];
};

type StateConfig = {
  title: string;
  mobileTitle?: string;
  titleClassName: string;
  headerClassName: string;
  heroTextClassName: string;
  heroIconWrapClassName: string;
  heroIconClassName: string;
  detailPanelClassName: string;
  amenitiesPanelClassName: string;
  amenityCardClassName: string;
  statusBadgeClassName: string;
  bannerClassName: string;
  bannerIconWrapClassName: string;
  bannerTitle: string;
  bannerDescription: string;
  resultLabel: string;
  message?: string;
  resultIcon: React.ComponentType<{ className?: string }>;
};

const membersByState: Record<MemberCheckInState, MemberRecord> = {
  "success-active-member": {
    name: "Michael Davis",
    memberNumber: "997654",
    enteredMemberNumber: "987654",
    memberSince: "Mar 10, 2023",
    status: "Active",
    amenities: [
      { name: "Weights", icon: Dumbbell },
      { name: "Basketball Court", icon: SquareGanttChart },
      { name: "Sauna", icon: Lock },
    ],
  },
  "payment-method-invalid-past-due": {
    name: "Michael Davis",
    memberNumber: "997654",
    enteredMemberNumber: "987654",
    memberSince: "Mar 10, 2023",
    status: "Past Due",
    amenities: [
      { name: "Weights", icon: Dumbbell },
      { name: "Basketball Court", icon: SquareGanttChart },
      { name: "Sauna", icon: Lock },
    ],
  },
  "membership-cancelled-access-denied": {
    name: "Lisa Roberts",
    memberNumber: "654321",
    enteredMemberNumber: "987654",
    memberSince: "Oct 1, 2022",
    status: "Cancelled",
    amenities: [
      { name: "Weights", icon: Dumbbell },
      { name: "Basketball Court", icon: SquareGanttChart },
      { name: "Sauna", icon: Lock },
    ],
  },
};

const stateConfig: Record<MemberCheckInState, StateConfig> = {
  "success-active-member": {
    title: "Check-In\nApproved",
    mobileTitle: "Check-In Approved",
    titleClassName: "text-[clamp(2.4rem,4vw,3.5rem)] text-emerald-950",
    headerClassName: "bg-[color-mix(in_srgb,var(--action-success)_68%,white)]",
    heroTextClassName: "text-white",
    heroIconWrapClassName: "border-white/80 bg-white/10",
    heroIconClassName: "text-white",
    detailPanelClassName: "bg-surface",
    amenitiesPanelClassName: "bg-surface",
    amenityCardClassName: "bg-[var(--status-success-panel)]",
    statusBadgeClassName: "border-transparent bg-[var(--status-success-badge)] text-emerald-950",
    bannerClassName: "bg-[color-mix(in_srgb,var(--action-success)_78%,white)] text-white",
    bannerIconWrapClassName: "bg-white/12 text-white",
    bannerTitle: "Check-In Approved",
    bannerDescription: "Welcome back. Your membership is active and all amenities are available today.",
    resultLabel: "Check-In Successful",
    message: "Welcome back! Your membership is active and ready for today’s workout.",
    resultIcon: Check,
  },
  "payment-method-invalid-past-due": {
    title: "Invalid\nPayment Method",
    mobileTitle: "Invalid Payment Method",
    titleClassName: "text-[clamp(2.2rem,4vw,3.35rem)] text-amber-950",
    headerClassName: "bg-[var(--status-warning-surface)]",
    heroTextClassName: "text-white",
    heroIconWrapClassName: "border-white/80 bg-white/10",
    heroIconClassName: "text-white",
    detailPanelClassName: "bg-surface",
    amenitiesPanelClassName: "bg-surface",
    amenityCardClassName: "bg-[var(--status-warning-panel)]",
    statusBadgeClassName: "border-transparent bg-[var(--status-warning-badge)] text-amber-950",
    bannerClassName: "bg-[var(--status-warning-surface)] text-white",
    bannerIconWrapClassName: "bg-white/12 text-white",
    bannerTitle: "Payment Attention Needed",
    bannerDescription: "Please update the payment method on file at the front desk or in your member account.",
    resultLabel: "Check-In Successful",
    message: "The payment method on file could not be processed.",
    resultIcon: X,
  },
  "membership-cancelled-access-denied": {
    title: "Membership\nCancelled",
    mobileTitle: "Membership Cancelled",
    titleClassName: "text-[clamp(2.2rem,4vw,3.4rem)] text-white",
    headerClassName: "bg-destructive",
    heroTextClassName: "text-white",
    heroIconWrapClassName: "border-white/75 bg-white/8",
    heroIconClassName: "text-white",
    detailPanelClassName: "bg-surface",
    amenitiesPanelClassName: "bg-surface",
    amenityCardClassName: "bg-[var(--status-error-panel)]",
    statusBadgeClassName: "border-transparent bg-destructive text-white",
    bannerClassName: "bg-destructive text-white",
    bannerIconWrapClassName: "bg-white/10 text-white",
    bannerTitle: "Access Denied",
    bannerDescription: "For assistance, please visit the front desk.",
    resultLabel: "Access Denied",
    message: "This membership has been cancelled and can no longer be used for club access.",
    resultIcon: XCircle,
  },
};

function splitTitle(title: string) {
  return title.split("\n");
}

function MemberPortrait() {
  return (
    <div className="flex h-28 w-28 items-center justify-center rounded-[var(--radius-sm)] border border-white/60 bg-[#737985] shadow-sm sm:h-32 sm:w-32">
      <User className="h-18 w-18 text-white/90 sm:h-20 sm:w-20" strokeWidth={1.75} />
    </div>
  );
}

function SectionHeader({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-[15px] font-semibold text-foreground">
      <Icon className="h-4 w-4 text-foreground" />
      <span>{title}</span>
    </div>
  );
}

export function MemberCheckInResult({ state = "payment-method-invalid-past-due" }: { state?: MemberCheckInState }) {
  const member = membersByState[state];
  const config = stateConfig[state];
  const ResultIcon = config.resultIcon;

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ colorScheme: "light" }}>
      <div className="border-b border-border bg-[#e5e7eb]">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between px-4 py-3 sm:px-5">
          <p className="text-[15px] font-semibold text-foreground">Gym Member Check-In</p>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Bell className="h-4 w-4" />
            <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-2.5 py-1.5">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-foreground">TB</span>
              <div className="hidden leading-tight sm:block">
                <p className="text-[11px] font-medium text-foreground">Team Member</p>
                <p className="text-[10px] text-muted-foreground">oom</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto flex max-w-[1000px] flex-col gap-5 px-4 py-5 sm:px-5">
        <div className="flex flex-col items-center justify-center gap-3 bg-[var(--color-layout-bar)] px-4 py-3 sm:flex-row">
          <label htmlFor="member-number" className="text-sm text-foreground">
            Enter Member Number:
          </label>
          <div className="flex w-full max-w-[430px] gap-2">
            <Input id="member-number" defaultValue={member.enteredMemberNumber} className="h-8 rounded-[var(--radius-sm)] border-border bg-surface text-sm shadow-none" />
            <Button className="h-8 rounded-[var(--radius-sm)] bg-[var(--color-action-success)] px-5 text-[12px] font-semibold tracking-[0.02em] text-white hover:bg-[var(--color-action-success-hover)]">
              SEARCH
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden rounded-[4px] border border-border bg-surface py-0 shadow-sm">
          <div className={cn("grid gap-0 md:grid-cols-[1fr_220px]", config.headerClassName)}>
            <div className="flex flex-col gap-5 p-3 sm:flex-row sm:items-center sm:px-3 sm:py-3 md:px-3">
              <MemberPortrait />
              <div className="space-y-2">
                <div className="hidden sm:block">
                  {splitTitle(config.title).map((line) => (
                    <h1 key={line} className={cn("font-bold leading-[0.97] tracking-[-0.04em]", config.titleClassName, config.heroTextClassName)}>
                      {line}
                    </h1>
                  ))}
                </div>
                <h1 className={cn("text-4xl font-bold leading-[0.97] tracking-[-0.04em] sm:hidden", config.titleClassName, config.heroTextClassName)}>
                  {config.mobileTitle ?? config.title.replaceAll("\n", " ")}
                </h1>
                {config.message ? <p className="max-w-xl text-sm text-white/90">{config.message}</p> : null}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 p-4 text-center sm:p-5">
              <div className={cn("flex h-[86px] w-[86px] items-center justify-center rounded-full border-[4px]", config.heroIconWrapClassName)}>
                <ResultIcon className={cn("h-11 w-11 stroke-[2.75]", config.heroIconClassName)} />
              </div>
              <p className="text-sm text-white">{config.resultLabel}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-[0.86fr_auto_1.14fr]">
            <section className={cn("p-4 sm:p-5", config.detailPanelClassName)}>
              <SectionHeader icon={ShieldAlert} title="Member Details" />
              <div className="grid grid-cols-[72px_1fr] gap-x-3 gap-y-3 text-sm sm:grid-cols-[86px_1fr]">
                <span className="text-foreground">Name</span>
                <span className="font-medium text-foreground">{member.name}</span>
                <span className="text-foreground">Member Number</span>
                <span className="font-medium text-foreground">{member.memberNumber}</span>
                <span className="text-foreground">Member Since</span>
                <span className="font-medium text-foreground">{member.memberSince}</span>
                <span className="text-foreground">Status</span>
                <div>
                  <Badge className={cn("rounded-[4px] px-2 py-0.5 text-[11px] font-semibold", config.statusBadgeClassName)}>
                    {member.status}
                  </Badge>
                </div>
              </div>
            </section>

            <Separator orientation="vertical" className="hidden md:block" />

            <section className={cn("p-4 sm:p-5", config.amenitiesPanelClassName)}>
              <SectionHeader icon={Ban} title="Amenities Included" />
              <p className="mb-4 text-sm text-foreground">
                This membership includes access to the following amenities:
              </p>
              <div className="flex flex-wrap gap-3">
                {member.amenities.map((amenity) => {
                  const AmenityIcon = amenity.icon;
                  return (
                    <div
                      key={amenity.name}
                      className={cn(
                        "flex w-[104px] flex-col items-center gap-2 rounded-[4px] border border-black/5 px-3 py-3 text-center",
                        config.amenityCardClassName
                      )}
                    >
                      <AmenityIcon className="h-7 w-7 text-foreground/80" />
                      <span className="text-[12px] leading-snug font-medium text-foreground/85">{amenity.name}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <div className={cn("px-5 py-3", config.bannerClassName)}>
            <div className="flex flex-col items-center justify-center gap-1 text-center sm:flex-row sm:gap-3">
              <div className={cn("flex items-center justify-center rounded-full p-1.5", config.bannerIconWrapClassName)}>
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[15px] font-semibold">{config.bannerTitle}</p>
                <p className="text-sm text-white/90">{config.bannerDescription}</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

export type { MemberCheckInState };
