import Image from "next/image";
import {
  CalendarDays,
  ChevronDown,
  FolderOpen,
  Globe,
  House,
  MapPin,
  Phone,
  Plus,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Separator } from "@/components/ui/separator";

function HeaderSelection({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-white/95">
      {icon}
      <span>{label}</span>
      <ChevronDown className="h-4 w-4" />
    </div>
  );
}

function StepItem({ active, index, label }: { active?: boolean; index: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold ${
          active ? "bg-[#1f2f5c] text-white" : "bg-[#ebedf2] text-[#98a2b6]"
        }`}
      >
        {index}
      </div>
      <span
        className={`text-[12px] ${active ? "font-semibold text-[#293b74]" : "text-[#a1aaba]"}`}
      >
        {label}
      </span>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
  muted,
}: {
  icon: React.ReactNode;
  title: string;
  muted?: boolean;
}) {
  return (
    <div className={`mb-5 flex items-center gap-2 ${muted ? "text-[#c4cad6]" : "text-[#334a86]"}`}>
      {icon}
      <h2 className="text-[15px] font-medium">{title}</h2>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-[11px] font-medium text-[#5f6d84]">{children}</label>;
}

function FormInput(props: React.ComponentProps<typeof Input>) {
  return (
    <Input
      {...props}
      className="h-[30px] rounded-[5px] border-[#d7dce5] bg-white px-3 text-[12px] text-[#52617a] placeholder:text-[#97a1b3] focus-visible:ring-0"
    />
  );
}

function FormSelect({ children, ...props }: React.ComponentProps<typeof NativeSelect>) {
  return (
    <NativeSelect
      {...props}
      className="h-[30px] w-full rounded-[5px] border-[#d7dce5] bg-white text-[12px] text-[#7d8798] shadow-none focus-visible:ring-0"
    >
      {children}
    </NativeSelect>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f6f7] text-[#1f2f5c]">
      <header className="w-full">
        <div className="bg-[#16295f] text-white">
          <div className="mx-auto flex h-[43px] max-w-[1280px] items-center justify-between px-7">
            <Image
              src="/Frida.png"
              alt="PriceSmart"
              width={120}
              height={28}
              className="h-auto w-[96px] object-contain brightness-0 invert"
              priority
            />

            <div className="flex items-center gap-7 text-[12px]">
              <HeaderSelection icon={<MapPin className="h-3.5 w-3.5" />} label="Miraflores" />
              <HeaderSelection
                icon={<div className="h-3.5 w-3.5 rounded-full bg-white/85 ring-1 ring-white/50" />}
                label="Guatemala"
              />
              <HeaderSelection icon={<Globe className="h-3.5 w-3.5" />} label="English" />
            </div>
          </div>
        </div>
        <div className="h-[27px] bg-[#1f47b8]" />
      </header>

      <section className="mx-auto max-w-[1280px] px-[42px] pb-0 pt-[18px]">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-[19px] font-medium tracking-[-0.02em] text-[#2a438b]">New membership</h1>
          <Button
            variant="outline"
            className="h-[28px] rounded-md border-[#76a1f2] bg-white px-3 text-[11px] font-semibold text-[#3d82f6] hover:bg-white hover:text-[#3d82f6]"
          >
            Capture Member ID
          </Button>
        </div>

        <div className="rounded-sm bg-transparent">
          <div className="grid grid-cols-[111px_1fr] gap-0">
            <aside className="border-r border-[#dddfe6] pr-4 pt-1">
              <div className="space-y-4">
                <StepItem active index={1} label="Membership data" />
                <StepItem index={2} label="Payment" />
              </div>
            </aside>

            <div className="pl-4">
              <SectionTitle icon={<FolderOpen className="h-4 w-4" />} title="Personal data" />

              <div className="grid grid-cols-[88px_1fr] gap-6">
                <div className="pt-2 text-center">
                  <div className="mx-auto h-[92px] w-[92px] rounded-full bg-[#cfd4de] shadow-[inset_0_-2px_0_rgba(255,255,255,0.7),0_2px_4px_rgba(0,0,0,0.08)]" />
                  <button className="mt-2 text-[10px] font-medium text-[#5d97ea]">Take photo</button>
                </div>

                <div className="grid grid-cols-3 gap-x-16 gap-y-4 pr-3">
                  <div>
                    <FieldLabel>ID Type *</FieldLabel>
                    <FormSelect defaultValue="">
                      <NativeSelectOption value="" disabled>
                        Select
                      </NativeSelectOption>
                    </FormSelect>
                  </div>
                  <div>
                    <FieldLabel>ID Number *</FieldLabel>
                    <FormInput placeholder="Enter ID number" />
                  </div>
                  <div>
                    <FieldLabel>Membership type *</FieldLabel>
                    <FormSelect defaultValue="">
                      <NativeSelectOption value="" disabled>
                        Select
                      </NativeSelectOption>
                    </FormSelect>
                  </div>

                  <div>
                    <FieldLabel>Abbreviation</FieldLabel>
                    <FormSelect defaultValue="">
                      <NativeSelectOption value="" disabled>
                        Select
                      </NativeSelectOption>
                    </FormSelect>
                  </div>
                  <div>
                    <FieldLabel>First Name *</FieldLabel>
                    <FormInput placeholder="Enter first name" />
                  </div>
                  <div>
                    <FieldLabel>Last Name *</FieldLabel>
                    <FormInput placeholder="Enter last name" />
                  </div>

                  <div>
                    <FieldLabel>Gender</FieldLabel>
                    <FormSelect defaultValue="">
                      <NativeSelectOption value="" disabled>
                        Select
                      </NativeSelectOption>
                    </FormSelect>
                  </div>
                  <div>
                    <FieldLabel>Date of birth *</FieldLabel>
                    <div className="relative">
                      <FormSelect defaultValue="">
                        <NativeSelectOption value="" disabled>
                          Select
                        </NativeSelectOption>
                      </FormSelect>
                      <CalendarDays className="pointer-events-none absolute right-8 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#aab2c0]" />
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Occupation</FieldLabel>
                    <FormSelect defaultValue="">
                      <NativeSelectOption value="" disabled>
                        Select
                      </NativeSelectOption>
                    </FormSelect>
                  </div>
                </div>
              </div>

              <Separator className="my-5 bg-[#e2e5eb]" />

              <SectionTitle icon={<Phone className="h-4 w-4" />} title="Contact" muted />

              <div className="grid grid-cols-3 gap-x-16 gap-y-4 pr-3">
                <div>
                  <FieldLabel>Email address *</FieldLabel>
                  <div className="flex items-center gap-4">
                    <FormInput placeholder="Enter your email address" />
                    <Button
                      variant="outline"
                      className="h-[30px] min-w-[95px] rounded-[5px] border-[#d7dce5] bg-[#f8f9fb] px-3 text-[11px] font-semibold text-[#a0a9b8] hover:bg-[#f8f9fb] hover:text-[#a0a9b8]"
                    >
                      Send code
                    </Button>
                  </div>
                </div>
                <div className="col-span-2 flex items-end pb-1">
                  <label className="flex items-center gap-2 text-[12px] text-[#5f6d84]">
                    <Checkbox className="size-3.5 rounded-[3px] border-[#d5dbe4] data-[state=checked]:bg-[#2f5edb]" />
                    Customer declines to provide email address
                  </label>
                </div>

                <div>
                  <FieldLabel>Mobile phone number *</FieldLabel>
                  <div className="flex items-center gap-4">
                    <FormInput placeholder="Enter your phone number" />
                    <Button
                      variant="outline"
                      className="h-[30px] min-w-[95px] rounded-[5px] border-[#d7dce5] bg-[#f8f9fb] px-3 text-[11px] font-semibold text-[#a0a9b8] hover:bg-[#f8f9fb] hover:text-[#a0a9b8]"
                    >
                      Send code
                    </Button>
                  </div>
                </div>
                <div className="col-span-2 flex items-end pb-1">
                  <label className="flex items-center gap-2 text-[12px] text-[#5f6d84]">
                    <Checkbox className="size-3.5 rounded-[3px] border-[#d5dbe4] data-[state=checked]:bg-[#2f5edb]" />
                    Customer declines to provide mobile phone number
                  </label>
                </div>

                <div>
                  <FieldLabel>Home phone number</FieldLabel>
                  <FormInput placeholder="Enter your home phone number" />
                </div>
                <div>
                  <FieldLabel>Notifications</FieldLabel>
                  <FormSelect defaultValue="">
                    <NativeSelectOption value="" disabled>
                      Select
                    </NativeSelectOption>
                  </FormSelect>
                </div>
              </div>

              <Separator className="my-5 bg-[#e2e5eb]" />

              <SectionTitle icon={<MapPin className="h-4 w-4" />} title="Address" muted />

              <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-x-16 pr-3">
                <div>
                  <FieldLabel>Address *</FieldLabel>
                  <FormInput placeholder="Enter your address" />
                </div>
                <div>
                  <FieldLabel>Country</FieldLabel>
                  <FormSelect defaultValue="">
                    <NativeSelectOption value="" disabled>
                      Select
                    </NativeSelectOption>
                  </FormSelect>
                </div>
                <div>
                  <FieldLabel>State</FieldLabel>
                  <FormSelect defaultValue="">
                    <NativeSelectOption value="" disabled>
                      Select
                    </NativeSelectOption>
                  </FormSelect>
                </div>
                <div>
                  <FieldLabel>City</FieldLabel>
                  <FormSelect defaultValue="">
                    <NativeSelectOption value="" disabled>
                      Select
                    </NativeSelectOption>
                  </FormSelect>
                </div>
              </div>

              <Separator className="my-5 bg-[#e2e5eb]" />

              <SectionTitle
                icon={<UserRound className="h-4 w-4" />}
                title="Secondary memberships"
                muted
              />
              <button className="mb-8 flex items-center gap-1 text-[11px] font-medium text-[#c4cad6]">
                Add secondary <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        <Separator className="bg-[#d6dbe4]" />

        <div className="flex items-center justify-between px-[18px] py-[16px]">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="h-[28px] rounded-md border-[#4f85ea] px-3 text-[11px] font-semibold text-[#3d82f6] hover:bg-white hover:text-[#3d82f6]"
            >
              <House className="h-3.5 w-3.5" />
              Go back home
            </Button>
            <Button
              disabled
              variant="outline"
              className="h-[28px] min-w-[95px] rounded-md border-[#dde1e8] bg-[#f4f5f7] text-[11px] font-semibold text-[#a8b0be] hover:bg-[#f4f5f7] hover:text-[#a8b0be]"
            >
              Save changes
            </Button>
          </div>

          <Button
            disabled
            className="h-[28px] min-w-[95px] rounded-md bg-[#eef0f4] px-4 text-[11px] font-semibold text-[#aab3c2] hover:bg-[#eef0f4]"
          >
            Payment
          </Button>
        </div>
      </section>
    </main>
  );
}
