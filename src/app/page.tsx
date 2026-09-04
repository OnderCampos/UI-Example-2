import {
  CalendarDays,
  CircleUserRound,
  Folder,
  House,
  MapPinned,
  Phone,
  Plus,
} from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const selectOptions = ["Select", "Option 1", "Option 2"];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-[11px] font-medium text-foreground">{children}</label>;
}

function TextField({
  label,
  placeholder,
  rightIcon,
}: {
  label: string;
  placeholder: string;
  rightIcon?: React.ReactNode;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <Input
          placeholder={placeholder}
          className="h-[34px] rounded-[var(--radius-sm-token)] border-[color:var(--border)] bg-card pr-9 text-[12px] text-foreground shadow-none placeholder:text-[color:var(--placeholder)] focus-visible:ring-0"
        />
        {rightIcon ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--text-muted)]">
            {rightIcon}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function SelectField({ label }: { label: string }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <Select>
        <SelectTrigger className="h-[34px] w-full rounded-[var(--radius-sm-token)] border-[color:var(--border)] bg-card text-[12px] text-[color:var(--placeholder)] shadow-none focus-visible:ring-0">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {selectOptions.map((option) => (
            <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, "-")}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function DeclineOption({ id, text }: { id: string; text: string }) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 pt-6 text-[12px] font-medium text-[color:var(--text-subtle)]">
      <Checkbox id={id} className="border-[color:var(--border)] data-[state=checked]:border-primary" />
      <span>{text}</span>
    </label>
  );
}

function SectionTitle({ icon, title, faded = false }: { icon: React.ReactNode; title: string; faded?: boolean }) {
  return (
    <div className={["mb-5 flex items-center gap-2", faded ? "text-[color:#c3cad7]" : "text-[color:var(--brand-blue-deep)]"].join(" ")}>
      <span>{icon}</span>
      <h2 className="text-[14px] font-medium">{title}</h2>
    </div>
  );
}

function Stepper() {
  return (
    <aside className="w-[160px] shrink-0 border-r border-[color:var(--border)] pr-4 pt-6">
      <h1 className="text-[22px] font-normal tracking-[-0.02em] text-[color:var(--brand-blue-deep)]">New membership</h1>
      <div className="mt-7 space-y-4">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-[color:var(--brand-blue-deep)]">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[color:var(--brand-blue-deep)] text-[10px] text-white">1</span>
          <span>Membership data</span>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[color:#c6ceda]">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[color:#eef1f6] text-[10px] text-[color:#9aa7bc]">2</span>
          <span>Payment</span>
        </div>
      </div>
    </aside>
  );
}

function ProfilePhotoPanel() {
  return (
    <div className="flex flex-col items-center pt-3">
      <div className="flex h-[112px] w-[112px] items-center justify-center rounded-full bg-[color:#c7ccd7] shadow-[0_3px_8px_rgba(15,23,42,0.08)]" />
      <button className="mt-2 text-[11px] font-medium text-[color:var(--brand-link)]">Take photo</button>
    </div>
  );
}

function FooterActions() {
  return (
    <div className="mt-8 flex flex-col gap-4 border-t border-[color:var(--border)] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="h-[36px] rounded-[var(--radius-sm-token)] border-[color:var(--header-accent)] bg-card px-4 text-[13px] font-semibold text-[color:var(--header-accent)] shadow-none hover:bg-[color:var(--accent)] hover:text-[color:var(--header-accent)]"
        >
          <House className="h-4 w-4" />
          Go back home
        </Button>
        <Button
          disabled
          className="h-[36px] rounded-[var(--radius-sm-token)] border border-[color:var(--border)] bg-[color:var(--disabled-surface)] px-6 text-[13px] font-semibold text-[color:var(--disabled-foreground)] shadow-none hover:bg-[color:var(--disabled-surface)]"
        >
          Save changes
        </Button>
      </div>

      <Button
        disabled
        className="h-[36px] min-w-[112px] rounded-[var(--radius-sm-token)] border border-[color:var(--border)] bg-[color:var(--disabled-surface)] px-6 text-[13px] font-semibold text-[color:var(--disabled-foreground)] shadow-none hover:bg-[color:var(--disabled-surface)]"
      >
        Payment
      </Button>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <AppHeader />

      <section className="mx-auto max-w-[1120px] px-8 pb-8 pt-6 lg:px-6">
        <div className="rounded-[var(--radius-lg-token)] bg-background">
          <div className="flex items-start">
            <Stepper />

            <div className="flex-1 pl-6">
              <div className="flex items-start justify-between pt-4">
                <SectionTitle icon={<Folder className="h-4 w-4" strokeWidth={1.8} />} title="Personal data" />
                <Button
                  variant="outline"
                  className="h-[28px] rounded-[var(--radius-sm-token)] border-[color:var(--brand-link)] bg-card px-3 text-[11px] font-semibold text-[color:var(--brand-link)] shadow-none hover:bg-[color:var(--accent)] hover:text-[color:var(--brand-link)]"
                >
                  Capture Member ID
                </Button>
              </div>

              <div className="grid gap-6 lg:grid-cols-[118px_minmax(0,1fr)]">
                <ProfilePhotoPanel />

                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <SelectField label="ID Type *" />
                    <TextField label="ID Number *" placeholder="Enter ID number" />
                    <SelectField label="Membership type *" />
                    <SelectField label="Abbreviation" />
                    <TextField label="First Name *" placeholder="Enter first name" />
                    <TextField label="Last Name *" placeholder="Enter last name" />
                    <SelectField label="Gender" />
                    <TextField label="Date of birth *" placeholder="Select" rightIcon={<CalendarDays className="h-3.5 w-3.5" />} />
                    <SelectField label="Occupation" />
                  </div>

                  <Separator />

                  <section>
                    <SectionTitle icon={<Phone className="h-4 w-4" strokeWidth={1.8} />} title="Contact" faded />
                    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_96px_260px]">
                      <TextField label="Email address *" placeholder="Enter your email address" />
                      <div>
                        <FieldLabel>&nbsp;</FieldLabel>
                        <Button
                          disabled
                          className="h-[34px] w-full rounded-[var(--radius-sm-token)] border border-[color:var(--border)] bg-[color:var(--disabled-surface)] px-0 text-[12px] font-semibold text-[color:var(--disabled-foreground)] shadow-none hover:bg-[color:var(--disabled-surface)]"
                        >
                          Send code
                        </Button>
                      </div>
                      <DeclineOption id="decline-email" text="Customer declines to provide email address" />

                      <TextField label="Mobile phone number *" placeholder="Enter your phone number" />
                      <div>
                        <FieldLabel>&nbsp;</FieldLabel>
                        <Button
                          disabled
                          className="h-[34px] w-full rounded-[var(--radius-sm-token)] border border-[color:var(--border)] bg-[color:var(--disabled-surface)] px-0 text-[12px] font-semibold text-[color:var(--disabled-foreground)] shadow-none hover:bg-[color:var(--disabled-surface)]"
                        >
                          Send code
                        </Button>
                      </div>
                      <DeclineOption id="decline-mobile" text="Customer declines to provide mobile phone number" />
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      <TextField label="Home phone number" placeholder="Enter your home phone number" />
                      <SelectField label="Notifications" />
                    </div>
                  </section>

                  <Separator />

                  <section>
                    <SectionTitle icon={<MapPinned className="h-4 w-4" strokeWidth={1.8} />} title="Address" faded />
                    <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,0.65fr))]">
                      <TextField label="Address *" placeholder="Enter your address" />
                      <SelectField label="Country" />
                      <SelectField label="State" />
                      <SelectField label="City" />
                    </div>
                  </section>

                  <Separator />

                  <section>
                    <SectionTitle icon={<CircleUserRound className="h-4 w-4" strokeWidth={1.8} />} title="Secondary memberships" faded />
                    <button className="inline-flex items-center gap-1 text-[12px] font-medium text-[color:#c3cad7]">
                      Add secondary <Plus className="h-3.5 w-3.5" />
                    </button>
                  </section>
                </div>
              </div>
            </div>
          </div>

          <FooterActions />
        </div>
      </section>
    </main>
  );
}
