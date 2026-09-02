import Image from "next/image";
import {
  Check,
  ChevronDown,
  CreditCard,
  Globe,
  House,
  MapPin,
  Smartphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

function MembershipHeader() {
  return (
    <header className="shadow-[0_1px_0_rgba(15,23,42,0.06)]">
      <div className="bg-[var(--brand-header)] text-white">
        <div className="mx-auto flex h-[60px] max-w-[1280px] items-center justify-between px-[84px]">
          <Image
            src="/next.svg"
            alt="PriceSmart"
            width={110}
            height={24}
            className="h-auto w-[110px] brightness-0 invert"
          />
          <div className="flex items-center gap-8 text-[18px] font-medium text-white">
            <div className="flex items-center gap-2 text-[18px]">
              <MapPin className="size-4" />
              <span className="text-[18px]">Miraflores</span>
            </div>
            <div className="flex items-center gap-2 text-[18px]">
              <span className="text-[16px]">🌎</span>
              <span>Guatemala</span>
              <ChevronDown className="size-4" />
            </div>
            <div className="flex items-center gap-2 text-[18px]">
              <Globe className="size-4" />
              <span>English</span>
              <ChevronDown className="size-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[39px] bg-[var(--brand-button)]" />
    </header>
  );
}

function StepRail() {
  return (
    <aside className="w-[132px] border-r border-border pr-5 pt-7">
      <div className="space-y-5">
        <div className="flex items-center gap-2 text-[15px] font-semibold text-[#7aa112]">
          <span className="inline-flex size-[18px] items-center justify-center rounded-full bg-[#76a30f] text-white">
            <Check className="size-3.5 stroke-[3]" />
          </span>
          <span>Membership data</span>
        </div>
        <div className="flex items-center gap-3 text-[15px] font-semibold text-[var(--brand-button)]">
          <span className="inline-flex size-[18px] items-center justify-center rounded-full bg-[var(--brand-button)] text-[11px] text-white">
            2
          </span>
          <span>Payment</span>
        </div>
      </div>
    </aside>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="mb-2 block text-[14px] font-semibold text-[var(--brand-label)]">{children}</span>;
}

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 text-[18px]">
      <span className={strong ? "font-bold text-[var(--brand-button)]" : "text-[var(--brand-label)]"}>{label}</span>
      <span className={strong ? "font-bold text-[32px] leading-none text-[var(--brand-button)]" : "text-[var(--brand-label)]"}>{value}</span>
    </div>
  );
}

function MembershipSummaryCard() {
  return (
    <div className="w-[370px] rounded-[8px] border border-border bg-surface px-4 py-4 shadow-[0_0_0_1px_rgba(15,23,42,0.02)]">
      <h2 className="text-[18px] font-bold text-[var(--brand-button)]">Your membership</h2>
      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between gap-4 text-[17px] text-[var(--brand-label)]">
          <span>Diamond membership</span>
          <span>Q 355.00</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-[17px] text-[var(--brand-label)]">
          <span>Secondary membership</span>
          <span>Free</span>
        </div>
      </div>
      <Separator className="my-4 bg-border" />
      <div className="space-y-2.5">
        <SummaryRow label="Subtotal" value="Q 316.96" />
        <SummaryRow label="Taxes" value="Q 38.04" />
        <SummaryRow label="Total to pay" value="Q 355.00" strong />
      </div>
      <Separator className="my-5 bg-border" />
      <Button className="h-[36px] w-full rounded-[5px] bg-[#74a30e] text-[15px] font-semibold text-white shadow-none hover:bg-[#678f0c]">
        Payment completed
        <Check className="size-4 stroke-[3]" />
      </Button>
    </div>
  );
}

export function MembershipPaymentForm() {
  return (
    <div className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <MembershipHeader />
      <main className="mx-auto max-w-[1280px] px-[60px] pb-[34px] pt-[18px]">
        <h1 className="text-[23px] font-medium tracking-[-0.01em] text-[var(--brand-button)]">New membership</h1>

        <section className="mt-5 grid grid-cols-[132px_1fr]">
          <StepRail />

          <div className="pl-6 pt-4">
            <div className="grid grid-cols-[1fr_370px] gap-[78px]">
              <div className="max-w-[410px]">
                <div className="mb-7 flex items-center gap-2 text-[17px] font-medium text-[var(--brand-button)]">
                  <CreditCard className="size-5 stroke-[1.8]" />
                  <span>Payment</span>
                </div>

                <div className="space-y-6">
                  <label className="block">
                    <FieldLabel>Payment method</FieldLabel>
                    <Select defaultValue="banking-card">
                      <SelectTrigger className="h-[34px] w-[212px] rounded-[6px] border-[var(--border-strong)] bg-white text-[13px] font-medium text-[var(--brand-button)] shadow-none focus-visible:ring-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="banking-card">Banking card</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="transfer">Bank transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </label>

                  <label className="block">
                    <FieldLabel>Ticket number</FieldLabel>
                    <Input
                      defaultValue="TKY-1234558"
                      className="h-[34px] w-[212px] rounded-[6px] border-[var(--border-strong)] bg-white text-[13px] text-[var(--brand-button)] shadow-none focus-visible:ring-2"
                    />
                  </label>

                  <label className="flex items-center gap-3 text-[15px] font-medium text-[var(--brand-button)]">
                    <Checkbox defaultChecked className="size-[15px] rounded-[4px] border-[var(--brand-button)] data-[state=checked]:border-[var(--brand-button)] data-[state=checked]:bg-[var(--brand-button)]" />
                    <span>Do you need an invoice?</span>
                  </label>

                  <label className="block">
                    <FieldLabel>NIT/TIN</FieldLabel>
                    <Input
                      defaultValue="12345678"
                      className="h-[34px] w-[212px] rounded-[6px] border-[var(--border-strong)] bg-white text-[13px] text-[var(--brand-button)] shadow-none focus-visible:ring-2"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-8">
                <MembershipSummaryCard />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-[140px] flex items-center justify-between border-t border-border pt-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="h-[36px] rounded-[8px] border-[var(--primary)] bg-white px-4 text-[14px] font-medium text-[var(--primary)] shadow-none hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
            >
              <House className="size-4" />
              Go back home
            </Button>
            <Button
              variant="outline"
              disabled
              className="h-[36px] rounded-[8px] border-[var(--border-strong)] bg-white px-7 text-[14px] font-medium text-[var(--disabled-text)] shadow-none hover:bg-white hover:text-[var(--disabled-text)]"
            >
              Save changes
            </Button>
          </div>

          <div className="flex items-center gap-6">
            <Button
              variant="outline"
              disabled
              className="h-[36px] rounded-[8px] border-[var(--border-strong)] bg-white px-10 text-[14px] font-medium text-[var(--disabled-text)] shadow-none hover:bg-white hover:text-[var(--disabled-text)]"
            >
              Previous
            </Button>
            <Button className="h-[36px] rounded-[8px] bg-[var(--brand-button)] px-14 text-[15px] font-semibold text-white shadow-none hover:bg-[var(--brand-button-hover)]">
              Finish
            </Button>
          </div>
        </div>

        <button
          type="button"
          className="fixed right-0 top-[144px] flex h-[52px] w-[52px] items-center justify-center rounded-l-[12px] bg-[#84ab1b] text-white shadow-[0_6px_16px_rgba(15,23,42,0.18)]"
          aria-label="Support"
        >
          <span className="flex size-[32px] items-center justify-center rounded-[8px] border-2 border-white/80">
            <Smartphone className="size-4" />
          </span>
        </button>
      </main>
    </div>
  );
}
