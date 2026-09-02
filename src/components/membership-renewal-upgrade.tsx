import Image from "next/image";
import {
  BadgeCheck,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  Globe,
  IdCard,
  Layers3,
  MapPin,
  RefreshCcw,
  Receipt,
  ScrollText,
  UserRoundPlus,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type SidebarItem = {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

type SummaryLine = {
  label: string;
  value: string;
  tone?: "default" | "success" | "strong";
};

const sidebarItems: SidebarItem[] = [
  { label: "Membership information", icon: <BadgeCheck className="size-4 stroke-[1.7]" /> },
  { label: "Secondary memberships", icon: <UserRoundPlus className="size-4 stroke-[1.7]" /> },
  { label: "Renew membership", icon: <RefreshCcw className="size-4 stroke-[1.7]" />, active: true },
  { label: "Upgrade membership", icon: <Layers3 className="size-4 stroke-[1.7]" /> },
  { label: "Day Pass", icon: <IdCard className="size-4 stroke-[1.7]" /> },
  { label: "Card reprint", icon: <CreditCard className="size-4 stroke-[1.7]" /> },
  { label: "Membership refund", icon: <Receipt className="size-4 stroke-[1.7]" /> },
  { label: "Cancel membership", icon: <XCircle className="size-4 stroke-[1.7]" /> },
];

function MembershipTopBar() {
  return (
    <header className="shadow-[0_1px_0_rgba(15,23,42,0.06)]">
      <div className="bg-[var(--brand-header)] text-white">
        <div className="mx-auto flex h-[42px] max-w-[1360px] items-center justify-between px-[58px] text-[12px]">
          <Image
            src="/next.svg"
            alt="PriceSmart"
            width={95}
            height={20}
            className="h-auto w-[95px] brightness-0 invert"
          />
          <div className="flex items-center gap-6 text-white/95">
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="size-3.5" />
              <span>Guatemala</span>
              <ChevronDown className="size-3.5" />
            </div>
            <div className="flex items-center gap-1.5">
              <CircleDollarSign className="size-3.5" />
              <span>English</span>
              <ChevronDown className="size-3.5" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[28px] bg-[var(--brand-button)]" />
    </header>
  );
}

function SidebarNav() {
  return (
    <aside className="w-[93px] shrink-0 border-r border-border px-3 py-7">
      <nav className="space-y-[10px]">
        {sidebarItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={cn(
              "flex w-full flex-col items-start gap-1 rounded-[8px] px-[8px] py-[8px] text-left text-[10px] leading-[1.25] text-[var(--text-subtle)] transition-colors",
              item.active ? "bg-[var(--secondary)] text-[var(--brand-button)]" : "hover:bg-white/70",
            )}
          >
            <span className="text-[var(--text-subtle)]">{item.icon}</span>
            <span className={cn(item.active && "font-semibold text-[var(--brand-button)]")}>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-2 text-[14px] font-medium text-[var(--brand-button)]">
      <span className="text-[var(--brand-button)]">{icon}</span>
      <h2>{children}</h2>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-[10px] font-semibold text-[var(--brand-label)]">{children}</label>;
}

function SummaryCard({
  rows,
  cta,
  footer,
}: {
  rows: SummaryLine[];
  cta?: string;
  footer?: React.ReactNode;
}) {
  return (
    <div className="rounded-[8px] border border-border bg-surface p-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <h3 className="text-[13px] font-bold text-[var(--brand-button)]">Your membership</h3>
      <div className="mt-4 space-y-2.5 text-[11px] text-[var(--brand-label)]">
        {rows.map((row) => (
          <div key={`${row.label}-${row.value}`} className="flex items-start justify-between gap-4">
            <span
              className={cn(
                row.tone === "strong" && "font-semibold text-[var(--brand-button)]",
                row.tone === "success" && "text-[#7aa112]",
              )}
            >
              {row.label}
            </span>
            <span
              className={cn(
                "text-right",
                row.tone === "strong" && "text-[12px] font-bold text-[var(--brand-button)]",
                row.tone === "success" && "text-[#7aa112]",
              )}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
      {cta ? (
        <>
          <Separator className="my-4 bg-border" />
          <Button
            variant="outline"
            className="h-[26px] w-full rounded-[5px] border-[var(--primary)] bg-transparent text-[10px] font-semibold text-[var(--primary)] shadow-none hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
          >
            {cta}
          </Button>
        </>
      ) : null}
      {footer ? <div className="mt-4 text-[9px] leading-[1.35] text-[var(--text-subtle)]">{footer}</div> : null}
    </div>
  );
}

function BenefitsPanel() {
  return (
    <div className="grid grid-cols-2 gap-0 rounded-[2px] bg-[#f3f5f8] px-4 py-4">
      <div className="border-r border-border pr-4">
        <h4 className="mb-3 text-[9px] font-semibold uppercase tracking-[0.02em] text-[var(--brand-label)]">Current benefits</h4>
        <ul className="space-y-3 text-[10px] text-[var(--brand-label)]">
          <li className="flex gap-2"><span className="mt-[1px] text-[var(--brand-button)]">✓</span><span>Includes 2 cards</span></li>
          <li className="flex gap-2"><span className="mt-[1px] text-[var(--brand-button)]">✓</span><span>Access to all PriceSmart Club and Services</span></li>
          <li className="flex gap-2"><span className="mt-[1px] text-[var(--brand-button)]">✓</span><span>Automatic renewal</span></li>
        </ul>
      </div>
      <div className="pl-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h4 className="text-[9px] font-semibold uppercase tracking-[0.02em] text-[var(--brand-label)]">New benefits</h4>
          <Select defaultValue="platinum">
            <SelectTrigger className="h-[26px] w-[96px] rounded-[5px] border-border bg-white px-2 text-[10px] text-[var(--brand-button)] shadow-none focus-visible:ring-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="platinum">Platinum</SelectItem>
              <SelectItem value="diamond">Diamond</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ul className="space-y-3 text-[10px] text-[var(--brand-label)]">
          <li className="flex gap-2"><span className="mt-[1px] text-[var(--brand-button)]">✓</span><span>Includes 2 cards</span></li>
          <li className="flex gap-2"><span className="mt-[1px] text-[var(--brand-button)]">✓</span><span>Access to all PriceSmart Club and Services</span></li>
        </ul>
        <p className="mt-4 max-w-[210px] text-[9px] leading-[1.35] text-[var(--brand-label)]">
          Upgrade any membership to Platinum and get 2% Rewards on most PriceSmart purchases redeemable as store credit.
        </p>
      </div>
    </div>
  );
}

export function MembershipRenewalUpgrade() {
  return (
    <div className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <MembershipTopBar />
      <main className="mx-auto max-w-[1360px] px-[60px] pb-[28px] pt-[14px]">
        <h1 className="text-[17px] font-medium text-[var(--brand-button)]">New membership</h1>

        <section className="mt-3 grid grid-cols-[93px_1fr] border-b border-border pb-4">
          <SidebarNav />

          <div className="pl-4">
            <div className="grid grid-cols-[1fr_261px] gap-8">
              <div className="pt-5">
                <SectionTitle icon={<RefreshCcw className="size-4 stroke-[1.8]" />}>Renew membership</SectionTitle>
                <div className="grid max-w-[240px] gap-4">
                  <div>
                    <FieldLabel>NIT/TIN</FieldLabel>
                    <Input
                      defaultValue="12345678"
                      className="h-[28px] rounded-[5px] border-border bg-white px-2.5 text-[10px] text-[var(--brand-button)] shadow-none focus-visible:ring-2"
                    />
                  </div>
                  <div>
                    <FieldLabel>Payment method</FieldLabel>
                    <Select defaultValue="credit-card">
                      <SelectTrigger className="h-[28px] w-full rounded-[5px] border-border bg-white px-2.5 text-[10px] text-[var(--brand-button)] shadow-none focus-visible:ring-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit-card">Credit card</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="transfer">Bank transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <SummaryCard
                  rows={[
                    { label: "Diamond membership", value: "Q 355.00 GTQ/Ann." },
                    { label: "Status", value: "Upgradeable", tone: "success" },
                    { label: "", value: "" },
                    { label: "Subtotal", value: "Q 316.96" },
                    { label: "Taxes", value: "Q 38.04" },
                    { label: "Total to pay", value: "Q 355.00 GTQ/Ann.", tone: "strong" },
                  ]}
                  cta="Pay"
                />
              </div>
            </div>

            <Separator className="my-5 bg-border" />

            <div className="grid grid-cols-[1fr_261px] gap-8">
              <div>
                <SectionTitle icon={<RefreshCcw className="size-4 stroke-[1.8]" />}>Renew and upgrade</SectionTitle>
                <BenefitsPanel />

                <div className="mt-4 grid max-w-[240px] gap-4">
                  <div>
                    <FieldLabel>NIT/TIN</FieldLabel>
                    <Input
                      placeholder="Enter your NIT/TIN"
                      className="h-[28px] rounded-[5px] border-border bg-white px-2.5 text-[10px] text-[var(--brand-button)] shadow-none placeholder:text-muted-foreground focus-visible:ring-2"
                    />
                  </div>
                  <div>
                    <FieldLabel>Payment method</FieldLabel>
                    <Select>
                      <SelectTrigger className="h-[28px] w-full rounded-[5px] border-border bg-white px-2.5 text-[10px] text-muted-foreground shadow-none focus-visible:ring-2">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit-card">Credit card</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="transfer">Bank transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="pt-[2px]">
                <SummaryCard
                  rows={[
                    { label: "Previous cost", value: "Q 355.00 GTQ/Ann." },
                    { label: "New membership cost", value: "Q 710.00 GTQ/Ann." },
                    { label: 'Pro-rated credit*', value: 'Q 50.00' },
                    { label: "", value: "" },
                    { label: "Subtotal", value: "Q 316.96" },
                    { label: "Taxes", value: "Q 38.04" },
                    { label: "Total to pay", value: "Q 660.00 GTQ/Ann.", tone: "strong" },
                  ]}
                  footer={
                    <p>
                      *This amount reflects the cost for the remaining period of your current membership tier. Upon your next renewal, you will be charged the full price of the new membership level, minus any pro-rated credit from your previous plan.
                    </p>
                  }
                />
              </div>
            </div>
          </div>
        </section>

        <div className="pt-[18px]">
          <Button
            variant="outline"
            className="h-[26px] rounded-[6px] border-[var(--primary)] bg-white px-3 text-[10px] font-semibold text-[var(--primary)] shadow-none hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
          >
            Go back home
          </Button>
        </div>
      </main>
    </div>
  );
}
