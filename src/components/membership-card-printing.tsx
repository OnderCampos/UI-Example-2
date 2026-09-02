import Image from "next/image";
import {
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Globe,
  MapPin,
  Printer,
  Smartphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type SecondaryMember = {
  name: string;
  initials: string;
  accent: string;
  selected?: boolean;
};

const secondaryMembers: SecondaryMember[] = [
  { name: "Mayra Treviño", initials: "MT", accent: "from-zinc-200 to-zinc-100" },
  { name: "Mayra Treviño", initials: "MT", accent: "from-amber-200 to-orange-100", selected: true },
  { name: "Pablo Treviño", initials: "PT", accent: "from-slate-200 to-slate-100" },
];

const barcodeBars = [8, 3, 4, 10, 2, 6, 4, 8, 2, 9, 3, 5, 7, 2, 11, 3, 6, 8, 2, 5, 9, 3, 7, 2, 10, 4, 6, 8, 3, 7, 2, 9, 4, 6, 10, 2, 7, 3, 5, 9];

function MembershipTopBar() {
  return (
    <header className="shadow-[0_1px_0_rgba(15,23,42,0.06)]">
      <div className="bg-[var(--brand-header)] text-white">
        <div className="mx-auto flex h-[60px] max-w-[1360px] items-center justify-between px-20 text-[14px]">
          <div className="flex items-center gap-2 text-[18px] font-semibold tracking-[-0.02em]">
            <span className="text-[20px] text-[#f97316]">✶</span>
            <span>PriceSmart</span>
          </div>
          <div className="flex items-center gap-8 text-[14px] text-white/95">
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleDot className="size-4" />
              <span>Guatemala</span>
              <ChevronDown className="size-4" />
            </div>
            <div className="flex items-center gap-2">
              <Globe className="size-4" />
              <span>English</span>
              <ChevronDown className="size-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[38px] bg-[var(--brand-button)]" />
    </header>
  );
}

function MembershipCardPreview() {
  return (
    <Card className="w-[444px] gap-0 rounded-[var(--radius-lg)] border-[var(--border)] bg-surface p-0 shadow-[0_2px_8px_rgba(15,23,42,0.05)]">
      <div className="grid grid-cols-[160px_1fr] gap-5 p-4">
        <div>
          <div className="mb-3 flex h-[40px] items-center justify-center rounded-[4px] bg-[linear-gradient(180deg,#2f68b3_0%,#1d57a6_100%)] text-[19px] font-bold text-white">
            Diamond
          </div>
          <div className="overflow-hidden rounded-[8px] bg-[#f1f5f9]">
            <Image
              src="/Frida.png"
              alt="Member portrait"
              width={160}
              height={184}
              className="h-[184px] w-full object-cover"
            />
          </div>
        </div>

        <div className="pt-1 text-[14px] text-[var(--text)]">
          <div className="text-[13px] font-medium uppercase tracking-[0.04em] text-[var(--brand-label)]">Name</div>
          <div className="mt-1 text-[21px] font-bold tracking-[-0.02em]">NICOLAS TREVIÑO</div>

          <div className="mt-4 text-[13px] font-medium uppercase tracking-[0.04em] text-[var(--brand-label)]">
            Membership number
          </div>
          <div className="mt-1 text-[19px] font-bold">8596312475894</div>

          <div className="mt-4 text-[13px] font-medium uppercase tracking-[0.04em] text-[var(--brand-label)]">
            Expiration date
          </div>
          <div className="mt-1 text-[17px] font-bold text-[#4f7f43]">Mar 14, 2027</div>

          <div className="mt-5 flex h-[40px] items-end gap-[3px] overflow-hidden">
            {barcodeBars.map((width, index) => (
              <span
                key={`${width}-${index}`}
                className="block h-full bg-[#111827]"
                style={{ width }}
              />
            ))}
          </div>
          <div className="mt-3 text-[13px] text-[var(--brand-label)]">
            Personal and non transferable membership
          </div>
        </div>
      </div>
    </Card>
  );
}

function SecondaryMemberCard({ member }: { member: SecondaryMember }) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-3 rounded-[14px] border border-[var(--border)] bg-surface px-4 py-3 text-left shadow-[0_1px_4px_rgba(15,23,42,0.03)] transition-colors hover:border-[var(--primary)]/40",
        member.selected && "ring-1 ring-[var(--primary)]/15",
      )}
    >
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[13px] font-semibold text-[var(--text)]",
          member.accent,
        )}
      >
        {member.initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-semibold text-[var(--brand-label)]">{member.name}</div>
        <div className={cn("text-[14px] text-[var(--textMuted)]", member.selected && "font-semibold text-[var(--primary)]")}>Print membership</div>
      </div>
      <CheckCircle2 className="size-5 shrink-0 text-[#7aa112]" />
    </button>
  );
}

function FloatingPrinterAction() {
  return (
    <button
      type="button"
      className="fixed right-0 top-[144px] flex h-[52px] w-[52px] items-center justify-center rounded-l-[10px] bg-[#84a919] text-white shadow-[0_8px_20px_rgba(132,169,25,0.35)]"
      aria-label="Printer shortcut"
    >
      <div className="flex size-9 items-center justify-center rounded-[8px] border border-white/80 bg-white/12">
        <Smartphone className="size-4" />
      </div>
    </button>
  );
}

export function MembershipCardPrinting() {
  return (
    <div className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <MembershipTopBar />
      <FloatingPrinterAction />

      <main className="mx-auto max-w-[1360px] px-[84px] pb-10 pt-7">
        <h1 className="text-[44px] leading-none font-medium tracking-[-0.03em] text-[var(--brand-button)]">
          Nicolas Treviño - 8596312475894
        </h1>
        <p className="mt-3 text-[24px] text-[var(--brand-label)]">Primary membership</p>

        <section className="mt-14">
          <div className="flex items-center gap-3 text-[26px] font-medium text-[var(--brand-button)]">
            <Printer className="size-7 stroke-[1.8]" />
            <h2>Print membership card</h2>
          </div>

          <div className="mt-8 grid grid-cols-[212px_444px_212px] items-start gap-6">
            <div>
              <label className="mb-2 block text-[14px] font-medium text-[var(--brand-label)]">Printer</label>
              <Select>
                <SelectTrigger className="h-[44px] w-full rounded-[10px] border-[var(--border)] bg-white px-4 text-[16px] text-[var(--textMuted)] shadow-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]/20">
                  <SelectValue placeholder="Select printer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="front-desk">Front Desk Printer</SelectItem>
                  <SelectItem value="membership-center">Membership Center Printer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <MembershipCardPreview />

            <div className="space-y-6">
              {secondaryMembers.map((member) => (
                <SecondaryMemberCard key={`${member.name}-${member.initials}-${member.accent}`} member={member} />
              ))}
            </div>
          </div>
        </section>

        <Separator className="mt-[180px] bg-[var(--border)]" />

        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            className="h-[42px] rounded-[10px] border-[var(--primary)] bg-white px-5 text-[16px] font-semibold text-[var(--primary)] shadow-none hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
          >
            Go back home
          </Button>

          <Button
            disabled
            className="h-[42px] min-w-[134px] rounded-[10px] bg-[var(--disabled-surface)] px-7 text-[16px] font-semibold text-[var(--disabled-text)] shadow-none hover:bg-[var(--disabled-surface)]"
          >
            Print
          </Button>
        </div>
      </main>
    </div>
  );
}
