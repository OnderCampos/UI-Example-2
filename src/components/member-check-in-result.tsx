"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  Ban,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDot,
  CreditCard,
  Dumbbell,
  Lock,
  SquareUser,
  Waves,
  X,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type MemberCheckInState =
  | "check-in-success"
  | "payment-method-invalid"
  | "membership-cancelled";

export type MemberAmenity = {
  id: string;
  label: string;
  icon: "weights" | "pool" | "sauna" | "basketball";
};

export type MemberCheckInData = {
  name: string;
  memberNumber: string;
  membershipSince: string;
  statusLabel: string;
  statusTone?: "success" | "warning" | "error";
  avatarSrc?: string;
  avatarFallback: string;
  amenities: MemberAmenity[];
};

export type MemberCheckInResultProps = {
  state?: MemberCheckInState;
  member?: MemberCheckInData;
  defaultMemberNumber?: string;
  onSearch?: (memberNumber: string) => void;
};

const amenityIcons = {
  weights: Dumbbell,
  pool: Waves,
  sauna: Waves,
  basketball: CircleDot,
};

const stateConfig = {
  "check-in-success": {
    heading: ["Welcome", "Back"],
    resultLabel: "Check-In Successful",
    heroTone: "success",
    heroIcon: Check,
    detailIcon: CalendarDays,
    amenitiesIcon: Check,
    footerIcon: Check,
    footerTitle: "Check-In Successful",
    footerMessage: "Enjoy your workout and thank you for being a valued member.",
  },
  "payment-method-invalid": {
    heading: ["Invalid", "Payment Method"],
    resultLabel: "Check-In Successful",
    heroTone: "warning",
    heroIcon: X,
    detailIcon: CreditCard,
    amenitiesIcon: X,
    footerIcon: AlertCircle,
    footerTitle: "Please Update Payment Info",
    footerMessage:
      "To continue enjoying your membership, please update your payment information at your earliest convenience.",
  },
  "membership-cancelled": {
    heading: ["Membership", "Cancelled"],
    resultLabel: "Check-In Successful",
    heroTone: "error",
    heroIcon: X,
    detailIcon: SquareUser,
    amenitiesIcon: X,
    footerIcon: Lock,
    footerTitle: "Access Denied",
    footerMessage: "For assistance, please visit the front desk.",
  },
} as const;

const defaultMembers: Record<MemberCheckInState, MemberCheckInData> = {
  "check-in-success": {
    name: "Sarah Johnson",
    memberNumber: "123456",
    membershipSince: "Jan 15, 2023",
    statusLabel: "Active",
    statusTone: "success",
    avatarFallback: "SJ",
    amenities: [
      { id: "weights", label: "Weights", icon: "weights" },
      { id: "pool", label: "Pool", icon: "pool" },
      { id: "basketball", label: "Basketball Court", icon: "basketball" },
      { id: "sauna", label: "Sauna", icon: "sauna" },
    ],
  },
  "payment-method-invalid": {
    name: "Michael Davis",
    memberNumber: "997654",
    membershipSince: "Mar 10, 2023",
    statusLabel: "Past Due",
    statusTone: "warning",
    avatarFallback: "MD",
    amenities: [
      { id: "weights", label: "Weights", icon: "weights" },
      { id: "basketball", label: "Basketball Court", icon: "basketball" },
      { id: "sauna", label: "Sauna", icon: "sauna" },
    ],
  },
  "membership-cancelled": {
    name: "Lisa Roberts",
    memberNumber: "654321",
    membershipSince: "Oct 1, 2022",
    statusLabel: "Cancelled",
    statusTone: "error",
    avatarFallback: "LR",
    amenities: [
      { id: "weights", label: "Weights", icon: "weights" },
      { id: "basketball", label: "Basketball Court", icon: "basketball" },
      { id: "sauna", label: "Sauna", icon: "sauna" },
    ],
  },
};

function MemberAvatar({ state, fallback }: { state: MemberCheckInState; fallback: string }) {
  if (state === "membership-cancelled") {
    return (
      <div className="flex h-[82px] w-[108px] items-center justify-center rounded-[3px] border border-white/55 bg-[linear-gradient(180deg,#6b7280_0%,#4b5563_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
        <div className="flex flex-col items-center text-[#d1d5db]">
          <div className="h-8 w-8 rounded-full bg-current" />
          <div className="-mt-1 h-10 w-16 rounded-t-[24px] rounded-b-[8px] bg-current" />
        </div>
        <span className="sr-only">{fallback}</span>
      </div>
    );
  }

  return (
    <div className="h-[94px] w-[94px] overflow-hidden rounded-[8px] border border-white/45 bg-[linear-gradient(135deg,#d7dfe7_0%,#fbfcfe_55%,#c7a55c_100%)] shadow-[0_6px_16px_rgba(15,23,42,0.18)]">
      <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_30%,#f8dcc0_0%,#cc9a72_25%,#8a5d3b_26%,#8a5d3b_33%,#f0d8c2_34%,#f0d8c2_46%,#3c2a22_47%,#3c2a22_62%,#d1ae8d_63%,#bf8b5f_75%,#6c4b35_100%)] text-transparent">
        {fallback}
      </div>
      <span className="sr-only">{fallback}</span>
    </div>
  );
}

export function MemberCheckInResult({
  state = "check-in-success",
  member,
  defaultMemberNumber,
  onSearch,
}: MemberCheckInResultProps) {
  const resolvedMember = member ?? defaultMembers[state];
  const [memberNumber, setMemberNumber] = useState(defaultMemberNumber ?? resolvedMember.memberNumber);
  const config = stateConfig[state];

  const toneClasses = useMemo(() => {
    switch (config.heroTone) {
      case "warning":
        return {
          hero: "bg-[linear-gradient(180deg,#f7ca28_0%,#efb31a_100%)] text-[#1f2937]",
          iconShell: "border-[#f6dd8d] bg-transparent text-[#fff4cc]",
          detailsSurface: "bg-card text-foreground",
          amenityTile: "bg-[#efdfb7]",
          amenityGlow: "bg-[#8ab38c] text-[#205b33]",
          statusBadge: "bg-[color:var(--warning)] text-white",
          footer: "bg-[linear-gradient(180deg,#f6ca2b_0%,#efb21b_100%)] text-[#2d2412]",
          footerIcon: "text-[#2d2412]",
          footerBorder: "border-[#d3c5a1]",
          outerBorder: "border-[#ded6be]",
        };
      case "error":
        return {
          hero: "bg-[linear-gradient(180deg,#ff1b1b_0%,#ef4444_100%)] text-white",
          iconShell: "border-white bg-transparent text-white",
          detailsSurface: "bg-card text-foreground",
          amenityTile: "bg-[#f8d9d9]",
          amenityGlow: "bg-[#f0cdcd] text-[#4b5563]",
          statusBadge: "bg-[color:var(--error)] text-white",
          footer: "bg-[linear-gradient(180deg,#ff2323_0%,#ef4444_100%)] text-white",
          footerIcon: "text-white",
          footerBorder: "border-[#ef4444]",
          outerBorder: "border-[#e2e8f0]",
        };
      default:
        return {
          hero: "bg-[linear-gradient(180deg,#4ade80_0%,#22c55e_100%)] text-white",
          iconShell: "border-white/35 bg-white/10 text-white",
          detailsSurface: "bg-card text-foreground",
          amenityTile: "bg-[#dcfce7]",
          amenityGlow: "bg-[#bbf7d0] text-[#15803d]",
          statusBadge: "bg-[color:var(--success)] text-white",
          footer: "bg-[#dcfce7] text-[#14532d]",
          footerIcon: "text-[color:var(--success)]",
          footerBorder: "border-[#bbf7d0]",
          outerBorder: "border-[#e2e8f0]",
        };
    }
  }, [config.heroTone]);

  const HeroIcon = config.heroIcon;
  const FooterIcon = config.footerIcon;
  const DetailIcon = config.detailIcon;
  const AmenitiesIcon = config.amenitiesIcon;
  const isCancelled = state === "membership-cancelled";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-11 max-w-[1100px] items-center justify-between px-3 text-[13px]">
          <div className="font-medium">Gym Member Check-In</div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Bell className="h-3.5 w-3.5" />
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-border bg-muted text-[9px] font-semibold text-foreground">
                TB
              </div>
              <div className="hidden leading-tight sm:block">
                <div className="text-[10px] font-semibold text-foreground">Team Member</div>
                <div className="text-[9px]">com</div>
              </div>
              <ChevronDown className="h-3 w-3" />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-4 py-5">
        <div className="mx-auto flex w-full max-w-[980px] flex-col gap-4">
          <div className="mx-auto flex w-full max-w-[470px] items-end justify-center gap-2">
            <div className="flex-1">
              <label htmlFor="member-number" className="mb-1.5 block text-center text-[11px] text-foreground">
                Enter Member Number:
              </label>
              <Input
                id="member-number"
                value={memberNumber}
                onChange={(event) => setMemberNumber(event.target.value)}
                className="h-8 rounded-[var(--radius-sm-token)] border-border bg-card text-center text-[11px] shadow-none"
              />
            </div>
            <Button
              type="button"
              onClick={() => onSearch?.(memberNumber)}
              className="h-8 rounded-[var(--radius-sm-token)] bg-[color:var(--success)] px-6 text-[10px] font-semibold tracking-[0.04em] text-white hover:bg-[color:var(--success)]/90"
            >
              SEARCH
            </Button>
          </div>

          <Card className={cn("overflow-hidden rounded-[3px] bg-card py-0 shadow-[0_8px_18px_rgba(15,23,42,0.08)]", toneClasses.outerBorder)}>
            <div
              className={cn(
                "grid gap-4 px-3 py-3 md:grid-cols-[118px_1fr_175px] md:items-center",
                toneClasses.hero,
              )}
            >
              <div className="flex justify-center md:justify-start">
                <MemberAvatar state={state} fallback={resolvedMember.avatarFallback} />
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-[29px] font-bold leading-[1.02] tracking-[-0.03em] md:text-[42px]">
                  <span className="block">{config.heading[0]}</span>
                  <span className="block">{config.heading[1]}</span>
                </h1>
              </div>

              <div className="flex flex-col items-center gap-2.5 md:items-end">
                <div className={cn("flex h-[72px] w-[72px] items-center justify-center rounded-full border-[4px]", toneClasses.iconShell)}>
                  <HeroIcon className="h-10 w-10" strokeWidth={3.5} />
                </div>
                <div className="text-[18px] font-medium leading-tight">{config.resultLabel}</div>
              </div>
            </div>

            <CardContent className={cn("grid gap-0 px-0 md:grid-cols-[1fr_auto_1.1fr]", toneClasses.detailsSurface)}>
              <section className="px-4 py-4">
                <div className="mb-3 flex items-center gap-2 text-[15px] font-semibold text-foreground">
                  <DetailIcon className="h-4 w-4 text-foreground" />
                  Member Details
                </div>
                <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm">
                  <div>
                    <div className="text-[11px] text-foreground">Name</div>
                    <div className="mt-1 text-[13px]">{resolvedMember.name}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-foreground">Member Number</div>
                    <div className="mt-1 text-[13px]">{resolvedMember.memberNumber}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-foreground">Member Since</div>
                    <div className="mt-1 text-[13px]">{resolvedMember.membershipSince}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-foreground">Status</div>
                    <div className="mt-1">
                      <Badge className={cn("rounded-[4px] border-0 px-2 py-0.5 text-[11px] font-semibold shadow-none", toneClasses.statusBadge)}>
                        {resolvedMember.statusLabel}
                      </Badge>
                    </div>
                  </div>
                </div>
              </section>

              <div className="hidden py-4 md:block">
                <Separator orientation="vertical" className="bg-border" />
              </div>

              <section className="px-4 py-4">
                <div className="mb-1 flex items-center gap-2 text-[15px] font-semibold text-foreground">
                  <AmenitiesIcon className="h-4 w-4 text-foreground" />
                  Amenities Included
                </div>
                <p className="mb-3 text-[11px] text-foreground">
                  This membership includes access to the following amenities:
                </p>
                <div className={cn("grid gap-2", isCancelled ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-3") }>
                  {resolvedMember.amenities.map((amenity) => {
                    const AmenityIcon = amenityIcons[amenity.icon];
                    return (
                      <div
                        key={amenity.id}
                        className={cn(
                          "flex min-h-[88px] flex-col items-center justify-center rounded-[4px] border border-white/20 px-2 py-3 text-center",
                          toneClasses.amenityTile,
                        )}
                      >
                        <div className={cn("mb-2 rounded-[4px] px-3 py-2", toneClasses.amenityGlow)}>
                          <AmenityIcon className="h-5 w-5" />
                        </div>
                        <div className="text-[11px] font-medium leading-tight text-foreground">{amenity.label}</div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </CardContent>

            <div className={cn("border-t px-4 py-3", toneClasses.footer, toneClasses.footerBorder)}>
              <div className="flex items-center justify-center gap-2 text-center">
                <FooterIcon className={cn("h-4 w-4 shrink-0", toneClasses.footerIcon)} />
                <span className="text-[15px] font-semibold">{config.footerTitle}</span>
              </div>
              <p className="mt-1 text-center text-[10px] leading-relaxed">{config.footerMessage}</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
