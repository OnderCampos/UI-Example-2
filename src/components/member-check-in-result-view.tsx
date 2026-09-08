"use client";

import {
  AlertTriangle,
  Ban,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Dumbbell,
  Hash,
  Lock,
  ShieldCheck,
  Square,
  UserRound,
  Waves,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CheckInState = "success-active-member" | "payment-method-invalid-past-due" | "membership-cancelled-access-denied";

type Amenity = {
  label: string;
  icon: "weights" | "basketball" | "sauna" | "pool";
};

type MemberRecord = {
  name: string;
  memberNumber: string;
  membershipSince: string;
  statusLabel: string;
  avatarSrc?: string;
  amenities: Amenity[];
};

type StateConfig = {
  title: string;
  subtitle: string;
  footerTitle: string;
  footerMessage: string;
  badgeClassName: string;
  heroClassName: string;
  heroIconClassName: string;
  amenityCardClassName: string;
  amenityIconClassName: string;
  footerClassName: string;
  topStatusIcon: typeof Check;
  footerIcon: typeof Check;
};

export type MemberCheckInResultViewProps = {
  state?: CheckInState;
  memberNumber?: string;
  defaultMemberNumber?: string;
  onMemberNumberChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  member?: MemberRecord;
};

const defaultMembers: Record<CheckInState, MemberRecord> = {
  "success-active-member": {
    name: "Sarah Johnson",
    memberNumber: "123456",
    membershipSince: "Jan 15, 2023",
    statusLabel: "Active",
    avatarSrc: "/Frida.png",
    amenities: [
      { label: "Weights", icon: "weights" },
      { label: "Pool", icon: "pool" },
      { label: "Basketball Court", icon: "basketball" },
      { label: "Sauna", icon: "sauna" },
    ],
  },
  "payment-method-invalid-past-due": {
    name: "Michael Davis",
    memberNumber: "997654",
    membershipSince: "Mar 10, 2023",
    avatarSrc: "/Frida.png",
    statusLabel: "Past Due",
    amenities: [
      { label: "Weights", icon: "weights" },
      { label: "Basketball Court", icon: "basketball" },
      { label: "Sauna", icon: "sauna" },
    ],
  },
  "membership-cancelled-access-denied": {
    name: "Lisa Roberts",
    memberNumber: "654321",
    membershipSince: "Oct 1, 2022",
    statusLabel: "Cancelled",
    amenities: [
      { label: "Weights", icon: "weights" },
      { label: "Basketball Court", icon: "basketball" },
      { label: "Sauna", icon: "sauna" },
    ],
  },
};

const stateConfigs: Record<CheckInState, StateConfig> = {
  "success-active-member": {
    title: "Welcome\nBack",
    subtitle: "Check-In Successful",
    footerTitle: "Enjoy Your Visit",
    footerMessage: "Thanks for checking in. Have a great workout.",
    badgeClassName: "border-transparent bg-[color:color-mix(in_srgb,var(--status-success)_16%,white)] text-[color:var(--status-success-deep)]",
    heroClassName: "bg-[image:linear-gradient(180deg,#34d399_0%,#22c55e_100%)] text-white",
    heroIconClassName: "border-white/60 text-white",
    amenityCardClassName: "border-[color:#cce9d7] bg-[color:#eefaf2]",
    amenityIconClassName: "text-[color:var(--status-success)]",
    footerClassName: "border-[color:color-mix(in_srgb,var(--status-success)_22%,white)] bg-[color:color-mix(in_srgb,var(--status-success)_14%,white)] text-[color:var(--status-success-deep)]",
    topStatusIcon: Check,
    footerIcon: Check,
  },
  "payment-method-invalid-past-due": {
    title: "Invalid\nPayment Method",
    subtitle: "Check-In Successful",
    footerTitle: "Please Update Payment Info",
    footerMessage: "To continue enjoying your membership, please update your payment information at your earliest convenience.",
    badgeClassName: "border-transparent bg-[color:color-mix(in_srgb,var(--status-warning)_18%,white)] text-[#b45309]",
    heroClassName: "bg-[image:linear-gradient(180deg,#f7cf35_0%,#f3bb1f_100%)] text-[color:var(--foreground)]",
    heroIconClassName: "border-[#f6e3a4] text-[#fff5ce]",
    amenityCardClassName: "border-[color:#e6d7a2] bg-[#f3e4bb]",
    amenityIconClassName: "text-[#4b5563]",
    footerClassName: "border-[color:#ebc447] bg-[image:linear-gradient(180deg,#f7cf35_0%,#f3bb1f_100%)] text-[color:var(--foreground)]",
    topStatusIcon: X,
    footerIcon: AlertTriangle,
  },
  "membership-cancelled-access-denied": {
    title: "Membership\nCancelled",
    subtitle: "Check-In Successful",
    footerTitle: "Access Denied",
    footerMessage: "For assistance, please visit the front desk.",
    badgeClassName: "border-transparent bg-[color:var(--destructive)] text-white",
    heroClassName: "bg-[image:linear-gradient(180deg,#ff1c1c_0%,#ef2525_100%)] text-white",
    heroIconClassName: "border-white/70 text-white",
    amenityCardClassName: "border-[color:#f0d0d0] bg-[#f2cccc]",
    amenityIconClassName: "text-[#51535c]",
    footerClassName: "border-[#ef2525] bg-[image:linear-gradient(180deg,#ff1c1c_0%,#ef2525_100%)] text-white",
    topStatusIcon: X,
    footerIcon: Lock,
  },
};

function AmenityIcon({ icon, className }: { icon: Amenity["icon"]; className?: string }) {
  const shared = cn("h-7 w-7", className);

  switch (icon) {
    case "weights":
      return <Dumbbell className={shared} />;
    case "basketball":
      return <Square className={shared} />;
    case "sauna":
      return <Waves className={shared} />;
    case "pool":
      return <Waves className={shared} />;
    default:
      return null;
  }
}

export function MemberCheckInResultView({
  state = "success-active-member",
  memberNumber,
  defaultMemberNumber,
  onMemberNumberChange,
  onSearch,
  member,
}: MemberCheckInResultViewProps) {
  const fallbackMember = member ?? defaultMembers[state];
  const config = stateConfigs[state];
  const [localMemberNumber, setLocalMemberNumber] = useState(defaultMemberNumber ?? fallbackMember.memberNumber);
  const resolvedMemberNumber = memberNumber ?? localMemberNumber;
  const enteredMember = useMemo(
    () => ({ ...fallbackMember, memberNumber: resolvedMemberNumber }),
    [fallbackMember, resolvedMemberNumber]
  );

  const handleMemberNumberChange = (value: string) => {
    if (memberNumber === undefined) {
      setLocalMemberNumber(value);
    }
    onMemberNumberChange?.(value);
  };

  const handleSearch = () => {
    onSearch?.(resolvedMemberNumber);
  };

  const TopStatusIcon = config.topStatusIcon;
  const FooterIcon = config.footerIcon;
  const isCancelledState = state === "membership-cancelled-access-denied";

  return (
    <main className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1080px] flex-col bg-background">
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="text-[14px] font-semibold text-foreground">Gym Member Check-In</div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <button
              type="button"
              aria-label="Notifications"
              className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Bell className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full px-1 py-1 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
                TB
              </span>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block font-medium text-foreground">Team Member</span>
                <span className="block text-[10px]">oom</span>
              </span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </header>

        <section className="mx-auto mt-4 flex w-full max-w-[520px] items-center justify-center gap-2 px-4 text-[11px]">
          <label htmlFor="member-number" className="text-foreground">
            Enter Member Number:
          </label>
          <Input
            id="member-number"
            value={resolvedMemberNumber}
            onChange={(event) => handleMemberNumberChange(event.target.value)}
            className="h-7 w-[160px] rounded-[2px] border-border bg-white px-2 text-[11px] shadow-none focus-visible:ring-1"
          />
          <Button
            type="button"
            onClick={handleSearch}
            className="h-7 rounded-[2px] bg-[#4f8753] px-4 text-[11px] font-semibold uppercase tracking-[0.01em] text-white hover:bg-[#447748]"
          >
            Search
          </Button>
        </section>

        <Card className="mx-5 mt-4 gap-0 overflow-hidden rounded-[3px] border border-border bg-card py-0 shadow-[0_1px_3px_rgba(15,23,42,0.1)]">
          <div className={cn("grid items-center gap-4 px-3 py-3 md:grid-cols-[112px_1fr_194px] md:px-4 md:py-3", config.heroClassName)}>
            <Avatar className="mx-auto h-[86px] w-[108px] rounded-[3px] border border-white/60 bg-[#70757f] md:mx-0">
              {enteredMember.avatarSrc && !isCancelledState ? (
                <AvatarImage src={enteredMember.avatarSrc} alt={enteredMember.name} className="object-cover" />
              ) : null}
              <AvatarFallback className="rounded-[3px] bg-[#70757f] text-white">
                <UserRound className="h-14 w-14 fill-[#d1d5db] text-[#d1d5db]" />
              </AvatarFallback>
            </Avatar>

            <div className="text-center md:text-left">
              <h1 className="whitespace-pre-line text-[31px] font-bold leading-[1] tracking-[-0.04em]">{config.title}</h1>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className={cn("flex h-[70px] w-[70px] items-center justify-center rounded-full border-[4px] bg-transparent", config.heroIconClassName)}>
                <TopStatusIcon className="h-9 w-9 stroke-[3]" />
              </div>
              <div className="text-[16px] font-medium">{config.subtitle}</div>
            </div>
          </div>

          <CardContent className="grid gap-0 px-0 py-0 md:grid-cols-[38%_62%]">
            <section className="border-b border-border px-3 py-4 md:border-r md:border-b-0 md:px-4">
              <div className="mb-3 flex items-center gap-2 text-[20px] font-semibold text-foreground">
                <Hash className="h-4 w-4 text-foreground" />
                <span>Member Details</span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <DetailItem label="Name" value={enteredMember.name} />
                <DetailItem label="Member Number" value={enteredMember.memberNumber} />
                <DetailItem label="Member Since" value={enteredMember.membershipSince} />
                <div className="space-y-1">
                  <div className="text-[12px] text-muted-foreground">Status</div>
                  <Badge className={cn("rounded-[4px] px-2 py-0.5 text-[11px] font-semibold", config.badgeClassName)}>
                    {enteredMember.statusLabel}
                  </Badge>
                </div>
              </div>
            </section>

            <section className="px-3 py-4 md:px-4">
              <div className="mb-2 flex items-center gap-2 text-[20px] font-semibold text-foreground">
                <Ban className="h-4 w-4 text-foreground" />
                <span>Amenities Included</span>
              </div>
              <p className="mb-4 text-[12px] text-foreground/80">
                This membership includes access to the following amenities:
              </p>
              <div className={cn("grid gap-3", enteredMember.amenities.length === 3 ? "grid-cols-3" : "grid-cols-2 lg:grid-cols-4")}>
                {enteredMember.amenities.map((amenity) => (
                  <div
                    key={amenity.label}
                    className={cn(
                      "flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-[4px] border px-2 py-3 text-center",
                      config.amenityCardClassName
                    )}
                  >
                    <AmenityIcon icon={amenity.icon} className={config.amenityIconClassName} />
                    <div className="text-[11px] font-medium leading-4 text-foreground">{amenity.label}</div>
                  </div>
                ))}
              </div>
            </section>
          </CardContent>

          <CardFooter className={cn("relative block border-t px-3 py-2.5 text-center md:px-4", config.footerClassName)}>
            <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 md:block">
              <div className="text-white/85">✦</div>
            </div>
            <div className="flex items-center justify-center gap-2 text-[17px] font-semibold">
              <FooterIcon className="h-4.5 w-4.5" />
              <span>{config.footerTitle}</span>
            </div>
            <p className="mt-1 text-[11px] leading-4 opacity-95">{config.footerMessage}</p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

type DetailItemProps = {
  label: string;
  value: string;
};

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="space-y-1">
      <div className="text-[12px] text-muted-foreground">{label}</div>
      <div className="flex items-center gap-1.5 text-[14px] font-medium text-foreground">
        <span>{value}</span>
      </div>
    </div>
  );
}
