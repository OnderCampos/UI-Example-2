import { CheckCircle2, CircleAlert, UserRoundPlus, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type VerificationCodeRow = {
  id: string;
  label: string;
  code: string;
};

type MemberVerificationItem = {
  id: string;
  name?: string;
  contact: string;
  avatarSrc?: string;
  avatarFallback: string;
  verified?: boolean;
  codes?: VerificationCodeRow[];
};

const members: MemberVerificationItem[] = [
  {
    id: "nicolas",
    name: "Nicolás Treviño",
    contact: "+502 1234 5678",
    avatarSrc: "/Frida.png",
    avatarFallback: "NT",
    verified: true,
  },
  {
    id: "mayra",
    name: "Mayra Treviño",
    contact: "+502 98876 5432",
    avatarSrc: "/Frida.png",
    avatarFallback: "MT",
    codes: [{ id: "mayra-phone", label: "Enter code", code: "0000" }],
  },
  {
    id: "pablo",
    name: "Pablo Treviño",
    contact: "trevino.pablo@gmail.com",
    avatarSrc: "/Frida.png",
    avatarFallback: "PT",
    codes: [
      { id: "pablo-email", label: "Enter code", code: "0000" },
      { id: "pablo-phone", label: "Enter code", code: "0000" },
    ],
  },
];

function VerificationBadge({ verified }: { verified?: boolean }) {
  return verified ? (
    <div className="flex items-center gap-2 text-[11px] font-semibold text-success">
      <CheckCircle2 className="size-4 stroke-[2.2]" />
      <span>Member verified</span>
    </div>
  ) : (
    <CircleAlert className="size-4 shrink-0 text-warning stroke-[2.2]" />
  );
}

function CodeInputRow({ label, code }: VerificationCodeRow) {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <Label className="text-[8px] font-medium text-muted-foreground">{label}</Label>
      <InputOTP maxLength={4} value={code} containerClassName="gap-1.5">
        <InputOTPGroup className="gap-1.5">
          {Array.from({ length: 4 }).map((_, index) => (
            <InputOTPSlot
              key={`${label}-${index}`}
              index={index}
              className="h-8 w-8 rounded-[6px] border border-border bg-background text-[22px] font-semibold text-slate-300 shadow-none first:rounded-[6px] first:border last:rounded-[6px]"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <button type="button" className="text-[8px] font-medium text-primary hover:text-[var(--primary-hover)]">
        Resend code
      </button>
    </div>
  );
}

function MemberVerificationRow({ item }: { item: MemberVerificationItem }) {
  const hasCodes = Boolean(item.codes?.length);

  return (
    <div className="grid grid-cols-[1fr_auto] items-start gap-4 py-3.5 first:pt-0 last:pb-0">
      <div className="flex min-w-0 items-center gap-3">
        {item.name ? (
          <Avatar className="size-8 border border-border">
            {item.avatarSrc ? <AvatarImage src={item.avatarSrc} alt={item.name} /> : null}
            <AvatarFallback className="bg-secondary text-[11px] font-semibold text-primary">
              {item.avatarFallback}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="size-8 shrink-0" />
        )}
        <div className="min-w-0 space-y-0.5">
          {item.name ? <p className="truncate text-[12px] font-semibold text-foreground">{item.name}</p> : null}
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="truncate">{item.contact}</span>
            {!item.verified ? <VerificationBadge /> : null}
          </div>
        </div>
      </div>

      {item.verified ? (
        <div className="pt-1">
          <VerificationBadge verified />
        </div>
      ) : hasCodes ? (
        <div className="space-y-2">
          {item.codes?.map((codeRow) => (
            <CodeInputRow key={codeRow.id} {...codeRow} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function MembershipVerificationDialog() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-500/85 px-4 py-10 [color-scheme:light]">
      <Card className="w-full max-w-[318px] gap-0 rounded-[10px] border border-border bg-surface px-4 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.16)] sm:max-w-[360px]">
        <div className="absolute sr-only">Membership verification dialog</div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative flex size-11 items-center justify-center overflow-hidden rounded-[12px] border border-border bg-muted text-muted-foreground">
              <span className="absolute inset-0 rounded-[12px] bg-[radial-gradient(circle_at_center,transparent_45%,rgba(226,232,240,0.7)_46%,transparent_47%)] opacity-40" />
              <UserRoundPlus className="relative z-10 size-4 stroke-[2]" />
            </div>
          </div>
          <button type="button" className="mt-0.5 text-muted-foreground transition-colors hover:text-foreground">
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <div className="mt-2.5 space-y-1">
          <h1 className="text-[16px] font-bold tracking-[-0.02em] text-[var(--brand-button)]">Verify memberships</h1>
          <p className="max-w-[255px] text-[9px] leading-[1.55] text-muted-foreground">
            Send a code to the registered contact of each member. You will enter the code number in the next screen.
          </p>
        </div>

        <div className="mt-4 space-y-0">
          {members.map((member, index) => (
            <div key={member.id}>
              {index > 0 ? <Separator className="my-0" /> : null}
              <MemberVerificationRow item={member} />
            </div>
          ))}
        </div>

        <Separator className="mt-4" />

        <Button className="mt-3 h-9 w-full rounded-[6px] bg-[var(--brand-button)] text-[12px] font-semibold text-white hover:bg-[var(--brand-button-hover)]">
          Done
        </Button>
      </Card>
    </div>
  );
}
