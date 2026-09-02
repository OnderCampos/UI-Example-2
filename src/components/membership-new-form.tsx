import Image from "next/image";
import {
  CalendarDays,
  ChevronDown,
  Circle,
  CreditCard,
  Globe,
  House,
  IdCard,
  MapPin,
  Phone,
  UserRound,
  UserRoundPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const selectOptions = ["Select", "Option 1", "Option 2"];

function TopBar() {
  return (
    <header className="shadow-[0_1px_0_rgba(15,23,42,0.06)]">
      <div className="bg-[var(--brand-header)] text-white">
        <div className="mx-auto flex h-[43px] max-w-[1280px] items-center justify-between px-14">
          <Image
            src="/next.svg"
            alt="PriceSmart"
            width={96}
            height={18}
            className="h-auto w-[96px] brightness-0 invert"
          />
          <div className="flex items-center gap-6 text-[11px] font-medium text-white/95">
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
              <Circle className="size-1.5 fill-current stroke-0" />
              <span>English</span>
              <ChevronDown className="size-3.5" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[27px] bg-[var(--brand-button)]" />
    </header>
  );
}

type FieldProps = {
  label: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  type?: string;
  icon?: React.ReactNode;
};

function TextField({ label, required, placeholder, className, type, icon }: FieldProps) {
  return (
    <label className={className}>
      <span className="mb-1.5 block text-[10px] font-medium text-[var(--brand-label)]">
        {label}
        {required ? " *" : ""}
      </span>
      <div className="relative">
        <Input
          type={type}
          placeholder={placeholder}
          className="h-[31px] rounded-[5px] border-[var(--border-strong)] bg-white px-3 text-[11px] shadow-none placeholder:text-muted-foreground/80 focus-visible:ring-2"
        />
        {icon ? <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/80">{icon}</span> : null}
      </div>
    </label>
  );
}

function DropdownField({ label, required, className }: FieldProps) {
  return (
    <label className={className}>
      <span className="mb-1.5 block text-[10px] font-medium text-[var(--brand-label)]">
        {label}
        {required ? " *" : ""}
      </span>
      <Select defaultValue="Select">
        <SelectTrigger className="h-[31px] w-full rounded-[5px] border-[var(--border-strong)] bg-white px-3 text-[11px] font-normal text-muted-foreground shadow-none focus-visible:ring-2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {selectOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

function SectionHeading({ icon, title, faded = false }: { icon: React.ReactNode; title: string; faded?: boolean }) {
  return (
    <div className="mb-4 flex items-center gap-2 text-[11px] font-medium">
      <span className={faded ? "text-muted-foreground/45" : "text-muted-foreground/70"}>{icon}</span>
      <span className={faded ? "text-muted-foreground/45" : "text-[var(--section-heading)]"}>{title}</span>
    </div>
  );
}

function InlineCheckbox({ label }: { label: string }) {
  return (
    <label className="inline-flex items-center gap-2 text-[10px] font-medium text-[var(--brand-label)]">
      <Checkbox className="size-[13px] rounded-[3px] border-[var(--border-strong)] data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
      <span>{label}</span>
    </label>
  );
}

export function MembershipNewForm() {
  return (
    <div className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <TopBar />
      <main className="mx-auto max-w-[1280px] px-[42px] py-4">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h1 className="text-[18px] font-medium tracking-[-0.01em] text-[var(--brand-button)]">New membership</h1>
          </div>
          <Button
            variant="outline"
            className="mt-1 h-[28px] rounded-[6px] border-[var(--primary)] bg-white px-3 text-[10px] font-medium text-[var(--primary)] shadow-none hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
          >
            Capture Member ID
          </Button>
        </div>

        <div className="grid grid-cols-[110px_1fr] gap-0">
          <aside className="border-r border-border pr-4 pt-1">
            <div className="space-y-4">
              <div className="flex items-start gap-2 text-[10px] font-semibold text-[var(--brand-label)]">
                <span className="mt-[2px] inline-flex size-[14px] items-center justify-center rounded-full bg-[var(--brand-button)] text-[9px] text-white">
                  1
                </span>
                <span>Membership data</span>
              </div>
              <div className="flex items-start gap-2 text-[10px] font-medium text-muted-foreground/45">
                <span className="mt-[2px] inline-flex size-[14px] items-center justify-center rounded-full bg-muted text-[9px] text-muted-foreground/60">
                  2
                </span>
                <span>Payment</span>
              </div>
            </div>
          </aside>

          <section className="pl-4">
            <SectionHeading icon={<IdCard className="size-4 stroke-[1.7]" />} title="Personal data" />

            <div className="grid grid-cols-[92px_1fr] gap-4">
              <div className="flex flex-col items-center pt-3">
                <div className="mb-2 size-[86px] rounded-full bg-[var(--avatar-bg)] shadow-[0_3px_8px_rgba(15,23,42,0.08)]" />
                <button type="button" className="text-[9px] font-medium text-[var(--primary)]">
                  Take photo
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                  <DropdownField label="ID Type" required />
                  <TextField label="ID Number" required placeholder="Enter ID number" />
                  <DropdownField label="Membership type" required />
                  <DropdownField label="Abbreviation" />
                  <TextField label="First Name" required placeholder="Enter first name" />
                  <TextField label="Last Name" required placeholder="Enter last name" />
                  <DropdownField label="Gender" />
                  <TextField label="Date of birth" required placeholder="Select" icon={<CalendarDays className="size-3.5" />} />
                  <DropdownField label="Occupation" />
                </div>

                <div className="border-t border-border pt-4">
                  <SectionHeading icon={<Phone className="size-4 stroke-[1.7]" />} title="Contact" faded />
                  <div className="space-y-3">
                    <div className="grid grid-cols-[1fr_95px_1fr] items-end gap-4">
                      <TextField label="Email address" required placeholder="Enter your email address" />
                      <Button
                        variant="outline"
                        className="h-[31px] rounded-[5px] border-[var(--border-strong)] bg-[var(--muted)] px-3 text-[10px] font-semibold text-muted-foreground shadow-none hover:bg-[var(--muted)]"
                      >
                        Send code
                      </Button>
                      <div className="pb-[6px]">
                        <InlineCheckbox label="Customer declines to provide email address" />
                      </div>
                    </div>

                    <div className="grid grid-cols-[1fr_95px_1fr] items-end gap-4">
                      <TextField label="Mobile phone number" required placeholder="Enter your phone number" />
                      <Button
                        variant="outline"
                        className="h-[31px] rounded-[5px] border-[var(--border-strong)] bg-[var(--muted)] px-3 text-[10px] font-semibold text-muted-foreground shadow-none hover:bg-[var(--muted)]"
                      >
                        Send code
                      </Button>
                      <div className="pb-[6px]">
                        <InlineCheckbox label="Customer declines to provide mobile phone number" />
                      </div>
                    </div>

                    <div className="grid grid-cols-[1fr_95px_1fr] items-end gap-4">
                      <TextField label="Home phone number" placeholder="Enter your home phone number" />
                      <DropdownField label="Notifications" />
                      <div />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <SectionHeading icon={<UserRound className="size-4 stroke-[1.7]" />} title="Address" faded />
                  <div className="grid grid-cols-[1.5fr_0.7fr_0.7fr_0.7fr] gap-4">
                    <TextField label="Address" required placeholder="Enter your address" />
                    <DropdownField label="Country" />
                    <DropdownField label="State" />
                    <DropdownField label="City" />
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <SectionHeading icon={<UserRoundPlus className="size-4 stroke-[1.7]" />} title="Secondary memberships" faded />
                  <button type="button" className="text-[10px] font-medium text-muted-foreground/55">
                    Add secondary +
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="h-[34px] rounded-[6px] border-[var(--brand-button)] bg-white px-4 text-[11px] font-semibold text-[var(--brand-button)] shadow-none hover:bg-[var(--secondary)] hover:text-[var(--brand-button)]"
            >
              <House className="size-3.5" />
              Go back home
            </Button>
            <Button
              variant="outline"
              className="h-[34px] rounded-[6px] border-[var(--border-strong)] bg-white px-5 text-[11px] font-semibold text-muted-foreground shadow-none hover:bg-[var(--muted)] hover:text-muted-foreground"
            >
              Save changes
            </Button>
          </div>

          <Button
            disabled
            className="h-[34px] rounded-[6px] bg-[var(--disabled-surface)] px-8 text-[11px] font-semibold text-[var(--disabled-text)] hover:bg-[var(--disabled-surface)]"
          >
            Payment
          </Button>
        </div>
      </main>
    </div>
  );
}
