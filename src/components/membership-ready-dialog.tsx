import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const membershipDetails = {
  memberName: "Nicolas Treviño",
  membershipNumber: "8596312475894",
};

function MembershipReadyIcon() {
  return (
    <div className="relative flex size-[42px] items-center justify-center rounded-full bg-[color:var(--membership-ready-icon-bg)] text-[color:var(--membership-ready-icon-foreground)]">
      <div className="absolute inset-[-22px] rounded-full border border-[color:var(--membership-ready-ripple)] opacity-90" />
      <div className="absolute inset-[-38px] rounded-full border border-[color:var(--membership-ready-ripple)] opacity-70" />
      <div className="absolute inset-[-54px] rounded-full border border-[color:var(--membership-ready-ripple)] opacity-50" />
      <Check className="relative z-10 size-[18px] stroke-[2.4]" />
    </div>
  );
}

function MembershipReadyActions() {
  return (
    <div className="space-y-[10px] px-[18px] py-[18px]">
      <Button
        variant="outline"
        className="h-[34px] w-full rounded-[var(--radius-sm)] border-[color:var(--brand-button)] bg-transparent text-[13px] font-semibold text-primary shadow-none hover:bg-secondary hover:text-primary"
      >
        Print membership card
      </Button>
      <Button
        variant="outline"
        className="h-[34px] w-full rounded-[var(--radius-sm)] border-[color:var(--brand-button)] bg-transparent text-[13px] font-semibold text-primary shadow-none hover:bg-secondary hover:text-primary"
      >
        Add secondary membership
      </Button>
      <Button className="h-[34px] w-full rounded-[var(--radius-sm)] bg-[var(--brand-button)] text-[13px] font-semibold text-white shadow-none hover:bg-[var(--brand-button-hover)]">
        Go back home
      </Button>
    </div>
  );
}

export function MembershipReadyDialog() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--overlay)] px-4 py-10 [color-scheme:light]">
      <Card className="w-full max-w-[300px] gap-0 overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface py-0 shadow-[0_14px_40px_rgba(15,23,42,0.14)]">
        <div className="flex items-start justify-between px-[18px] pb-[24px] pt-[18px]">
          <MembershipReadyIcon />
          <button
            type="button"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-[18px]" />
          </button>
        </div>

        <div className="px-[18px] pb-[22px]">
          <h1 className="text-[13px] font-bold text-[var(--brand-button)]">
            The membership is ready!
          </h1>
          <div className="mt-[6px] space-y-[2px] text-[13px] leading-[1.45] text-[var(--brand-label)]">
            <p>
              Name: <span className="font-semibold text-foreground">{membershipDetails.memberName}</span>
            </p>
            <p>Membership number:</p>
            <p className="font-semibold tracking-[0.01em] text-foreground">
              {membershipDetails.membershipNumber}
            </p>
          </div>
        </div>

        <div className="border-t border-border">
          <MembershipReadyActions />
        </div>
      </Card>
    </div>
  );
}
