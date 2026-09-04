import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  ChevronDown,
  Circle,
  FolderOpen,
  Globe,
  House,
  MapPin,
  Plus,
  UserRound,
} from "lucide-react";

const topLinks = [
  { icon: MapPin, label: "Miraflores" },
  { icon: Globe, label: "Guatemala", withCaret: true },
  { icon: Globe, label: "English", withCaret: true },
];

const personalFields = [
  [
    { label: "ID Type *", type: "select", placeholder: "Select" },
    { label: "ID Number *", type: "input", placeholder: "Enter ID number" },
    { label: "Membership type *", type: "select", placeholder: "Select" },
  ],
  [
    { label: "Abbreviation", type: "select", placeholder: "Select" },
    { label: "First Name *", type: "input", placeholder: "Enter first name" },
    { label: "Last Name *", type: "input", placeholder: "Enter last name" },
  ],
  [
    { label: "Gender", type: "select", placeholder: "Select" },
    { label: "Date of birth *", type: "date", placeholder: "Select" },
    { label: "Occupation", type: "select", placeholder: "Select" },
  ],
] as const;

const steps = ["Membership data", "Payment"];

function FieldControl({
  type,
  placeholder,
}: {
  type: "input" | "select" | "date";
  placeholder: string;
}) {
  if (type === "input") {
    return (
      <Input
        placeholder={placeholder}
        className="h-10 rounded-md border-[#d6dbe6] bg-white text-[13px] text-[#344869] placeholder:text-[#97a2b6] shadow-none focus-visible:ring-0"
      />
    );
  }

  if (type === "date") {
    return (
      <div className="relative">
        <Select>
          <SelectTrigger className="h-10 w-full rounded-md border-[#d6dbe6] bg-white pr-10 text-[13px] text-[#97a2b6] shadow-none focus-visible:ring-0">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="placeholder">{placeholder}</SelectItem>
          </SelectContent>
        </Select>
        <CalendarDays className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#a7b0c0]" />
      </div>
    );
  }

  return (
    <Select>
      <SelectTrigger className="h-10 w-full rounded-md border-[#d6dbe6] bg-white text-[13px] text-[#97a2b6] shadow-none focus-visible:ring-0">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="placeholder">{placeholder}</SelectItem>
      </SelectContent>
    </Select>
  );
}

function MembershipSectionTitle({
  icon,
  title,
  muted = false,
}: {
  icon: React.ReactNode;
  title: string;
  muted?: boolean;
}) {
  return (
    <div className="mb-5 flex items-center gap-2">
      <span className={muted ? "text-[#c2c8d4]" : "text-[#7787a5]"}>{icon}</span>
      <h2
        className={muted ? "text-[15px] font-medium text-[#c2c8d4]" : "text-[15px] font-medium text-[#4d5f83]"}
      >
        {title}
      </h2>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#22345e]">
      <header className="bg-[#172d6a] text-white">
        <div className="mx-auto flex h-[44px] max-w-[1440px] items-center justify-between px-[28px]">
          <div className="flex items-center gap-2 text-[13px] font-semibold tracking-[-0.02em]">
            <span className="text-[15px] text-[#f06e2c]">✶</span>
            <span>PriceSmart</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-white/95">
            {topLinks.map(({ icon: Icon, label, withCaret }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon className="size-3.5" />
                <span>{label}</span>
                {withCaret ? <ChevronDown className="size-3.5" /> : null}
              </div>
            ))}
          </div>
        </div>
        <div className="h-[26px] bg-[#1f49c7]" />
      </header>

      <section className="mx-auto max-w-[1440px] px-[42px] pt-[18px] pb-0">
        <div className="flex items-start justify-between">
          <h1 className="text-[22px] font-medium tracking-[-0.01em] text-[#324d86]">
            New membership
          </h1>
          <Button
            variant="outline"
            className="h-8 rounded-md border-[#7ca5ef] bg-white px-4 text-[11px] font-semibold text-[#4d7fea] shadow-none hover:bg-[#f7faff] hover:text-[#4d7fea]"
          >
            Capture Member ID
          </Button>
        </div>

        <div className="mt-3 overflow-hidden rounded-t-[4px] border border-[#e2e5ec] bg-white">
          <div className="grid grid-cols-[110px_1px_1fr]">
            <aside className="px-[18px] pt-[20px]">
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const active = index === 0;
                  return (
                    <div key={step} className="flex items-center gap-2.5">
                      <span
                        className={active ? "flex size-4 items-center justify-center rounded-full bg-[#21335f] text-[10px] font-semibold text-white" : "flex size-4 items-center justify-center rounded-full bg-[#eef1f6] text-[10px] font-semibold text-[#aeb7c8]"}
                      >
                        {index + 1}
                      </span>
                      <span
                        className={active ? "text-[10px] font-semibold text-[#25365a]" : "text-[10px] text-[#aeb7c8]"}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </aside>

            <Separator orientation="vertical" className="bg-[#e2e5ec]" />

            <div className="px-[18px] pt-[17px] pb-6">
              <MembershipSectionTitle
                icon={<FolderOpen className="size-4" />}
                title="Personal data"
              />

              <div className="grid grid-cols-[88px_1fr] gap-5">
                <div className="pt-2">
                  <div className="flex flex-col items-center">
                    <div className="flex size-[92px] items-center justify-center rounded-full bg-[#cfd3dd] shadow-[0_2px_4px_rgba(0,0,0,0.08)]" />
                    <button
                      type="button"
                      className="mt-2 text-[10px] font-medium text-[#4e7fe8]"
                    >
                      Take photo
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {personalFields.map((row) => (
                    <div key={row[0].label} className="grid grid-cols-3 gap-4">
                      {row.map((field) => (
                        <div key={field.label}>
                          <Label className="mb-1.5 text-[11px] font-medium text-[#566982]">
                            {field.label}
                          </Label>
                          <FieldControl type={field.type} placeholder={field.placeholder} />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-5 bg-[#e6e8ef]" />

              <MembershipSectionTitle
                icon={<UserRound className="size-4" />}
                title="Contact"
                muted
              />

              <div className="space-y-4">
                <div className="grid grid-cols-[1fr_96px_1fr] gap-4">
                  <div>
                    <Label className="mb-1.5 text-[11px] font-medium text-[#566982]">
                      Email address *
                    </Label>
                    <Input
                      placeholder="Enter your email address"
                      className="h-10 rounded-md border-[#d6dbe6] bg-white text-[13px] text-[#344869] placeholder:text-[#97a2b6] shadow-none focus-visible:ring-0"
                    />
                  </div>
                  <div className="self-end">
                    <Button
                      variant="outline"
                      className="h-10 w-full rounded-md border-[#dce1ea] bg-[#fafbfc] text-[12px] font-semibold text-[#a6b0c0] shadow-none hover:bg-[#fafbfc] hover:text-[#a6b0c0]"
                    >
                      Send code
                    </Button>
                  </div>
                  <Label className="mt-[27px] flex items-center gap-2 text-[12px] font-medium text-[#63728d]">
                    <Checkbox className="border-[#d6dbe6] data-[state=checked]:border-[#496fd8] data-[state=checked]:bg-[#496fd8]" />
                    Customer declines to provide email address
                  </Label>
                </div>

                <div className="grid grid-cols-[1fr_96px_1fr] gap-4">
                  <div>
                    <Label className="mb-1.5 text-[11px] font-medium text-[#566982]">
                      Mobile phone number *
                    </Label>
                    <Input
                      placeholder="Enter your phone number"
                      className="h-10 rounded-md border-[#d6dbe6] bg-white text-[13px] text-[#344869] placeholder:text-[#97a2b6] shadow-none focus-visible:ring-0"
                    />
                  </div>
                  <div className="self-end">
                    <Button
                      variant="outline"
                      className="h-10 w-full rounded-md border-[#dce1ea] bg-[#fafbfc] text-[12px] font-semibold text-[#a6b0c0] shadow-none hover:bg-[#fafbfc] hover:text-[#a6b0c0]"
                    >
                      Send code
                    </Button>
                  </div>
                  <Label className="mt-[27px] flex items-center gap-2 text-[12px] font-medium text-[#63728d]">
                    <Checkbox className="border-[#d6dbe6] data-[state=checked]:border-[#496fd8] data-[state=checked]:bg-[#496fd8]" />
                    Customer declines to provide mobile phone number
                  </Label>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="mb-1.5 text-[11px] font-medium text-[#566982]">
                      Home phone number
                    </Label>
                    <Input
                      placeholder="Enter your home phone number"
                      className="h-10 rounded-md border-[#d6dbe6] bg-white text-[13px] text-[#344869] placeholder:text-[#97a2b6] shadow-none focus-visible:ring-0"
                    />
                  </div>
                  <div>
                    <Label className="mb-1.5 text-[11px] font-medium text-[#566982]">
                      Notifications
                    </Label>
                    <FieldControl type="select" placeholder="Select" />
                  </div>
                </div>
              </div>

              <Separator className="my-5 bg-[#e6e8ef]" />

              <MembershipSectionTitle
                icon={<MapPin className="size-4" />}
                title="Address"
                muted
              />

              <div className="grid grid-cols-[1.45fr_0.7fr_0.7fr_0.7fr] gap-4">
                <div>
                  <Label className="mb-1.5 text-[11px] font-medium text-[#566982]">
                    Address *
                  </Label>
                  <Input
                    placeholder="Enter your address"
                    className="h-10 rounded-md border-[#d6dbe6] bg-white text-[13px] text-[#344869] placeholder:text-[#97a2b6] shadow-none focus-visible:ring-0"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 text-[11px] font-medium text-[#566982]">
                    Country
                  </Label>
                  <FieldControl type="select" placeholder="Select" />
                </div>
                <div>
                  <Label className="mb-1.5 text-[11px] font-medium text-[#566982]">
                    State
                  </Label>
                  <FieldControl type="select" placeholder="Select" />
                </div>
                <div>
                  <Label className="mb-1.5 text-[11px] font-medium text-[#566982]">
                    City
                  </Label>
                  <FieldControl type="select" placeholder="Select" />
                </div>
              </div>

              <Separator className="my-5 bg-[#e6e8ef]" />

              <MembershipSectionTitle
                icon={<Circle className="size-4" />}
                title="Secondary memberships"
                muted
              />

              <button
                type="button"
                className="flex items-center gap-1 text-[11px] font-medium text-[#c2c8d4]"
              >
                Add secondary
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#e2e5ec] px-[18px] py-[16px]">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="h-8 rounded-md border-[#5988ea] bg-white px-3 text-[11px] font-semibold text-[#3b74eb] shadow-none hover:bg-[#f7faff] hover:text-[#3b74eb]"
              >
                <House className="size-3.5" />
                Go back home
              </Button>
              <Button
                variant="outline"
                className="h-8 rounded-md border-[#d8dce5] bg-white px-4 text-[11px] font-semibold text-[#a3aec0] shadow-none hover:bg-white hover:text-[#a3aec0]"
              >
                Save changes
              </Button>
            </div>

            <Button
              disabled
              className="h-8 min-w-[96px] rounded-md bg-[#eceef2] px-5 text-[11px] font-semibold text-[#a8b0bd] shadow-none hover:bg-[#eceef2]"
            >
              Payment
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
