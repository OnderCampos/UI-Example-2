import Image from "next/image";
import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Circle,
  Globe,
  IdCard,
  MapPin,
  Smartphone,
  User,
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
          <div className="flex items-center gap-3 text-[12px] font-semibold">
            <Image
              src="/next.svg"
              alt="PriceSmart"
              width={96}
              height={18}
              className="h-auto w-[96px] brightness-0 invert"
            />
          </div>
          <div className="flex items-center gap-6 text-[11px] font-medium text-white/95">
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="size-3.5" />
              <span>Guatemala</span>
              <ChevronRight className="size-3.5 rotate-90" />
            </div>
            <div className="flex items-center gap-1.5">
              <Circle className="size-1.5 fill-current stroke-0" />
              <span>English</span>
              <ChevronRight className="size-3.5 rotate-90" />
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
};

function TextField({ label, required, placeholder, className }: FieldProps) {
  return (
    <label className={className}>
      <span className="mb-1.5 block text-[10px] font-medium text-[var(--brand-label)]">
        {label}
        {required ? " *" : ""}
      </span>
      <Input
        placeholder={placeholder}
        className="h-[31px] rounded-[5px] border-[var(--border-strong)] bg-white px-3 text-[11px] shadow-none placeholder:text-muted-foreground/80 focus-visible:ring-2"
      />
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

function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-2 text-[11px] font-medium text-[var(--section-heading)]">
      <span className="text-muted-foreground/70">{icon}</span>
      <span>{title}</span>
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

export function MembershipSecondaryForm() {
  return (
    <div className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <TopBar />
      <main className="mx-auto max-w-[1280px] px-[42px] py-4">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h1 className="text-[18px] font-medium tracking-[-0.01em] text-[var(--brand-button)]">Nicolas Treviño</h1>
            <p className="mt-1 text-[12px] text-[var(--brand-label)]">Primary membership</p>
          </div>
          <div className="flex items-center gap-5 pt-3">
            <Button
              variant="outline"
              className="h-[28px] rounded-[6px] border-[var(--primary)] bg-white px-3 text-[10px] font-medium text-[var(--primary)] shadow-none hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
            >
              Capture Member ID
            </Button>
            <button
              type="button"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-[var(--brand-button)] text-white shadow-[0_10px_24px_rgba(35,58,132,0.25)]"
            >
              <Smartphone className="size-4" />
            </button>
          </div>
        </div>

        <h2 className="mb-4 text-[16px] font-medium text-[var(--brand-button)]">New secondary membership</h2>

        <div className="rounded-[2px] bg-transparent">
          <div className="grid grid-cols-[110px_1fr] gap-0">
            <aside className="border-r border-border pr-4 pt-1">
              <div className="flex items-start gap-2 text-[10px] font-semibold text-[var(--brand-label)]">
                <span className="mt-[2px] inline-flex size-[14px] items-center justify-center rounded-full bg-[var(--brand-button)] text-[9px] text-white">
                  1
                </span>
                <span>Membership data</span>
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
                    <TextField label="Date of birth" required placeholder="Select" />
                    <DropdownField label="Occupation" />
                  </div>

                  <div className="border-t border-border pt-4">
                    <SectionHeading icon={<Smartphone className="size-4 stroke-[1.7]" />} title="Contact" />
                    <div className="space-y-3">
                      <div className="grid grid-cols-[1fr_95px_1fr] gap-4 items-end">
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

                      <div className="grid grid-cols-[1fr_95px_1fr] gap-4 items-end">
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

                      <div className="grid grid-cols-[1fr_95px_1fr] gap-4 items-end">
                        <TextField label="Home phone number" placeholder="Enter your home phone number" />
                        <DropdownField label="Notifications" />
                        <div />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <SectionHeading icon={<User className="size-4 stroke-[1.7]" />} title="Address" />
                    <div className="space-y-3">
                      <InlineCheckbox label="Same address as primary member" />
                      <div className="grid grid-cols-[1.5fr_0.7fr_0.7fr_0.7fr] gap-4">
                        <TextField label="Address" required placeholder="Enter your address" />
                        <DropdownField label="Country" />
                        <DropdownField label="State" />
                        <DropdownField label="City" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="h-[34px] rounded-[6px] border-[var(--brand-button)] bg-white px-4 text-[11px] font-semibold text-[var(--brand-button)] shadow-none hover:bg-[var(--secondary)] hover:text-[var(--brand-button)]"
            >
              <ChevronLeft className="size-3.5" />
              Go back home
            </Button>
            <Button
              variant="outline"
              className="h-[34px] rounded-[6px] border-[var(--brand-button)] bg-white px-5 text-[11px] font-semibold text-[var(--primary)] shadow-none hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
            >
              Save changes
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button className="h-[34px] rounded-[6px] bg-[var(--action-danger)] px-8 text-[11px] font-semibold text-white hover:bg-[var(--action-danger-hover)]">
              Previous
            </Button>
            <Button
              disabled
              className="h-[34px] rounded-[6px] bg-[var(--disabled-surface)] px-8 text-[11px] font-semibold text-[var(--disabled-text)] hover:bg-[var(--disabled-surface)]"
            >
              Add member
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
