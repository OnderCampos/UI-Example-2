"use client";

import {
  AlertTriangle,
  Ban,
  CalendarDays,
  Check,
  CreditCard,
  Dumbbell,
  Hash,
  ShieldCheck,
  Square,
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
  footerClassName: string;
  bannerIcon: typeof Check;
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
    name: "Sarah Johnson",
    memberNumber: "123456",
    membershipSince: "Jan 15, 2023",
    statusLabel: "Cancelled",
    avatarSrc: "/Frida.png",
    amenities: [
      { label: "Weights", icon: "weights" },
      { label: "Pool", icon: "pool" },
      { label: "Basketball Court", icon: "basketball" },
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
    footerClassName: "border-[color:color-mix(in_srgb,var(--status-success)_22%,white)] bg-[color:color-mix(in_srgb,var(--status-success)_14%,white)] text-[color:var(--status-success-deep)]",
    bannerIcon: Check,
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
    footerClassName: "border-[color:#ebc447] bg-[image:linear-gradient(180deg,#f7cf35_0%,#f3bb1f_100%)] text-[color:var(--foreground)]",
    bannerIcon: X,
    footerIcon: AlertTriangle,
  },
  "membership-cancelled-access-denied": {
    title: "Membership\nCancelled",
    subtitle: "Access Denied",
    footerTitle: "Membership Assistance Required",
    footerMessage: "Please speak with the front desk to review membership options.",
    badgeClassName: "border-transparent bg-[color:color-mix(in_srgb,var(--destructive)_12%,white)] text-[color:#b91c1c]",
    heroClassName: "bg-[image:linear-gradient(180deg,#f87171_0%,#ef4444_100%)] text-white",
    heroIconClassName: "border-white/50 text-white",
    footerClassName: "border-[color:color-mix(in_srgb,var(--destructive)_16%,white)] bg-[color:color-mix(in_srgb,var(--destructive)_10%,white)] text-[color:#991b1b]",
    bannerIcon: Ban,
    footerIcon: Ban,
  },
};

function AmenityIcon({ icon }: { icon: Amenity["icon"] }) {
  const className = "h-7 w-7 text-[color:var(--status-success)]";

  switch (icon) {
    case "weights":
      return <Dumbbell className={className} />;
    case "basketball":
      return <Square className={className} />;
    case "sauna":
      return <Waves className={className} />;
    case "pool":
      return <Waves className={className} />;
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

  const BannerIcon = config.bannerIcon;
  const FooterIcon = config.footerIcon;

  return (
    <main className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-3 py-3 lg:px-4">
        <header className="flex items-center justify-between border-b border-border pb-3">
          <div className="text-xl font-semibold text-foreground">Gym Member Check-In</div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
                TB
              </div>
              <div className="hidden leading-tight sm:block">
                <div className="font-medium text-foreground">Team Member</div>
                <div>.com</div>
              </div>
            </div>
          </div>
        </header>

        <section className="mx-auto mt-5 flex w-full max-w-[620px] flex-wrap items-center justify-center gap-2 text-xs">
          <label htmlFor="member-number" className="text-muted-foreground">
            Enter Member Number:
          </label>
          <Input
            id="member-number"
            value={resolvedMemberNumber}
            onChange={(event) => handleMemberNumberChange(event.target.value)}
            className="h-8 w-[120px] rounded-[4px] border-border bg-white px-2 text-xs shadow-none"
          />
          <Button
            type="button"
            onClick={handleSearch}
            className="h-8 rounded-[4px] bg-[color:#4d8f54] px-4 text-[11px] font-semibold uppercase tracking-[0.02em] text-white hover:bg-[color:#447d4a]"
          >
            Search
          </Button>
        </section>

        <Card className="mx-auto mt-4 w-full max-w-[1120px] gap-0 overflow-hidden rounded-[2px] border border-border bg-card py-0 shadow-[0_2px_10px_rgba(15,23,42,0.08)]">
          <div className={cn("grid items-center gap-4 px-3 py-3 md:grid-cols-[108px_1fr_180px] md:px-4 md:py-4", config.heroClassName)}>
            <Avatar className="mx-auto h-[94px] w-[94px] rounded-[2px] border-4 border-white/75 md:mx-0">
              {enteredMember.avatarSrc ? <AvatarImage src={enteredMember.avatarSrc} alt={enteredMember.name} className="object-cover" /> : null}
              <AvatarFallback className="rounded-[2px] bg-white/20 text-2xl font-bold text-white">
                {enteredMember.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="text-center md:text-left">
              <h1 className="whitespace-pre-line text-[30px] font-bold leading-[1.05] tracking-[-0.03em] text-balance">
                {config.title}
              </h1>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className={cn("flex h-[74px] w-[74px] items-center justify-center rounded-full border-[4px] bg-transparent", config.heroIconClassName)}>
                <BannerIcon className="h-10 w-10 stroke-[3]" />
              </div>
              <div className="text-base font-medium">{config.subtitle}</div>
            </div>
          </div>

          <CardContent className="grid gap-0 px-0 py-0 md:grid-cols-[330px_1fr]">
            <section className="border-b border-border px-3 py-4 md:border-r md:border-b-0 md:px-4">
              <div className="mb-3 flex items-center gap-2 text-[18px] font-semibold">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span>Member Details</span>
              </div>

              <div className="grid grid-cols-2 gap-x-5 gap-y-4 text-sm">
                <DetailItem label="Name" value={enteredMember.name} />
                <DetailItem label="Member Number" value={enteredMember.memberNumber} icon={<Hash className="h-3.5 w-3.5 text-muted-foreground" />} />
                <DetailItem label="Member Since" value={enteredMember.membershipSince} icon={<CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />} />
                <div className="space-y-1">
                  <div className="text-[12px] text-muted-foreground">Status</div>
                  <Badge className={cn("rounded-[4px] px-2 py-0.5 text-xs font-medium", config.badgeClassName)}>
                    {enteredMember.statusLabel}
                  </Badge>
                </div>
              </div>
            </section>

            <section className="px-3 py-4 md:px-4">
              <div className="mb-2 flex items-center gap-2 text-[18px] font-semibold">
                <X className="h-4 w-4 text-muted-foreground" />
                <span>Amenities Included</span>
              </div>
              <p className="mb-4 text-[12px] text-muted-foreground">
                This membership includes access to the following amenities:
              </p>
              <div className={cn("grid gap-3", enteredMember.amenities.length === 3 ? "grid-cols-3" : "grid-cols-2 lg:grid-cols-4")}>
                {enteredMember.amenities.map((amenity) => (
                  <div
                    key={amenity.label}
                    className="flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-[4px] border border-[#e6d7a2] bg-[#f3e4bb] px-2 py-3 text-center"
                  >
                    <AmenityIcon icon={amenity.icon} />
                    <div className="text-[12px] font-medium leading-4 text-foreground">{amenity.label}</div>
                  </div>
                ))}
              </div>
            </section>
          </CardContent>

          <CardFooter className={cn("block border-t px-3 py-3 text-center md:px-4", config.footerClassName)}>
            <div className="flex items-center justify-center gap-2 text-[16px] font-semibold">
              <FooterIcon className="h-4 w-4" />
              <span>{config.footerTitle}</span>
            </div>
            <p className="mt-2 text-[11px] font-normal leading-4">{config.footerMessage}</p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

type DetailItemProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

function DetailItem({ label, value, icon }: DetailItemProps) {
  return (
    <div className="space-y-1">
      <div className="text-[12px] text-muted-foreground">{label}</div>
      <div className="flex items-center gap-1.5 text-[14px] font-medium text-foreground">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}
