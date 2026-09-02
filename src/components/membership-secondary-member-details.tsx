import { CircleHelp, CreditCard, Globe, House, IdCard, Mail, MapPin, Pencil, Phone, Receipt, RefreshCcw, UserRound, UserRoundPlus, CircleX, ChevronDown, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type SidebarItem = {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

type DetailItem = {
  label: string;
  value: string;
};

const sidebarItems: SidebarItem[] = [
  { label: "Membership information", icon: <IdCard className="size-[16px] stroke-[1.7]" /> },
  { label: "Secondary memberships", icon: <UserRoundPlus className="size-[16px] stroke-[1.7]" />, active: true },
  { label: "Renew membership", icon: <RefreshCcw className="size-[16px] stroke-[1.7]" /> },
  { label: "Upgrade membership", icon: <ChevronDown className="size-[16px] rotate-180 stroke-[1.7]" /> },
  { label: "Day Pass", icon: <CreditCard className="size-[16px] stroke-[1.7]" /> },
  { label: "Card reprint", icon: <Receipt className="size-[16px] stroke-[1.7]" /> },
  { label: "Membership refund", icon: <Globe className="size-[16px] stroke-[1.7]" /> },
  { label: "Cancel membership", icon: <CircleX className="size-[16px] stroke-[1.7]" /> },
];

const personalData: DetailItem[] = [
  { label: "ID Type", value: "DNI" },
  { label: "ID Number", value: "IDGTM1234567890123S04566" },
  { label: "Membership Type", value: "Diamond" },
  { label: "Abbreviation", value: "-" },
  { label: "First Name", value: "Mayra" },
  { label: "Last Name", value: "Treviño" },
  { label: "Gender", value: "Female" },
  { label: "Date of birth", value: "10/12/1987" },
  { label: "Occupation", value: "-" },
];

const contactData: DetailItem[] = [
  { label: "Email address *", value: "Customer declined to provide email address" },
  { label: "Mobile phone number *", value: "+502 98876 5432" },
  { label: "Home phone number *", value: "+502 2345 6789" },
  { label: "Notifications", value: "By SMS" },
];

const addressData: DetailItem[] = [
  { label: "Address *", value: "Km 46.5 Salida A Ciudad Vieja" },
  { label: "Country", value: "Guatemala" },
  { label: "State", value: "Antigua" },
  { label: "City", value: "Sacatepequez" },
];

function MembershipTopBar() {
  return (
    <header className="shadow-[0_1px_0_rgba(15,23,42,0.06)]">
      <div className="bg-[var(--brand-header)] text-white">
        <div className="mx-auto flex h-[58px] max-w-[1360px] items-center justify-between px-[58px] text-[13px]">
          <div className="flex items-center gap-2 text-[19px] font-semibold tracking-[-0.02em]">
            <span className="text-[18px] text-[#ef6a22]">✶</span>
            <span>PriceSmart</span>
          </div>
          <div className="flex items-center gap-7 text-white/95">
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5 stroke-[2]" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="size-3.5 stroke-[2]" />
              <span>Guatemala</span>
              <ChevronDown className="size-3.5 stroke-[2]" />
            </div>
            <div className="flex items-center gap-1.5">
              <Globe className="size-3.5 stroke-[2]" />
              <span>English</span>
              <ChevronDown className="size-3.5 stroke-[2]" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[42px] bg-[var(--brand-button)]" />
    </header>
  );
}

function SidebarNav() {
  return (
    <aside className="w-[158px] shrink-0 pr-4">
      <nav className="space-y-[12px] pt-2">
        {sidebarItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={cn(
              "flex w-full items-center gap-2 rounded-[8px] px-[8px] py-[8px] text-left text-[11px] leading-[1.25] text-muted-foreground transition-colors",
              item.active ? "bg-[var(--secondary)] text-[var(--brand-button)]" : "hover:bg-white/70",
            )}
          >
            <span className={cn("text-[#c6ced9]", item.active && "text-[var(--brand-button)]")}>{item.icon}</span>
            <span className={cn(item.active && "font-semibold")}>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-[17px] font-medium text-[var(--brand-button)]">
      {icon}
      <h2>{title}</h2>
    </div>
  );
}

function DetailGrid({ items, columns = 3 }: { items: DetailItem[]; columns?: 2 | 3 | 4 }) {
  return (
    <div
      className={cn(
        "grid gap-y-6",
        columns === 2 && "grid-cols-2 gap-x-16",
        columns === 3 && "grid-cols-3 gap-x-14",
        columns === 4 && "grid-cols-4 gap-x-10",
      )}
    >
      {items.map((item) => (
        <div key={item.label}>
          <p className="text-[10px] font-medium text-[var(--brand-label)]">{item.label}</p>
          <p className="mt-[4px] text-[14px] text-[var(--brand-button)]">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function EditLink() {
  return (
    <button type="button" className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:text-[var(--primary-hover)]">
      <span>Edit data</span>
      <Pencil className="size-3.5 stroke-[2]" />
    </button>
  );
}

export function MembershipSecondaryMemberDetails() {
  return (
    <div className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <MembershipTopBar />

      <main className="mx-auto max-w-[1360px] px-[42px] pb-[30px] pt-[14px]">
        <div className="pl-[18px]">
          <h1 className="text-[18px] font-medium tracking-[-0.02em] text-[var(--brand-button)]">
            Nicolas Treviño - 8596312475894
          </h1>
          <p className="mt-[2px] text-[12px] text-[var(--brand-label)]">Primary membership</p>
        </div>

        <section className="mt-5 grid grid-cols-[150px_1px_1fr] items-start gap-4">
          <SidebarNav />
          <div className="min-h-[620px] bg-border" />

          <div className="relative pl-2 pr-4 pt-1">
            <Button
              size="icon"
              className="absolute right-0 top-0 h-[41px] w-[41px] rounded-[10px] bg-[var(--brand-button)] shadow-[0_8px_18px_rgba(35,58,132,0.24)] hover:bg-[var(--brand-button-hover)]"
            >
              <Smartphone className="size-4" />
            </Button>

            <div className="max-w-[980px]">
              <div className="mb-4 text-[18px] font-medium text-[var(--brand-button)]">Secondary membership</div>

              <section>
                <SectionTitle icon={<UserRound className="size-4 stroke-[2]" />} title="Personal data" />

                <div className="mt-5 grid grid-cols-[92px_1fr] gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-[92px] w-[92px] overflow-hidden rounded-full bg-[var(--avatar-bg)] shadow-[0_2px_10px_rgba(15,23,42,0.08)]">
                      <img src="/Frida.png" alt="Member portrait" className="h-full w-full object-cover" />
                    </div>
                    <button type="button" className="mt-3 text-[10px] font-medium text-primary hover:text-[var(--primary-hover)]">
                      Take photo
                    </button>
                  </div>

                  <div className="pt-1">
                    <DetailGrid items={personalData} columns={3} />
                    <div className="mt-6">
                      <EditLink />
                    </div>
                  </div>
                </div>
              </section>

              <Separator className="my-6 bg-[var(--border-strong)]" />

              <section>
                <SectionTitle icon={<Phone className="size-4 stroke-[2]" />} title="Contact" />

                <div className="mt-5 grid grid-cols-2 gap-x-18 gap-y-6 max-w-[650px]">
                  <div className="col-span-2">
                    <p className="text-[10px] font-medium text-[var(--brand-label)]">Email address *</p>
                    <p className="mt-[6px] text-[14px] text-[var(--brand-button)]">Customer declined to provide email address</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-medium text-[var(--brand-label)]">Mobile phone number *</p>
                    <div className="mt-[6px] flex items-center gap-2 text-[14px] text-[var(--brand-button)]">
                      <span>+502 98876 5432</span>
                      <CircleHelp className="size-3.5 text-[var(--warning)]" />
                    </div>
                  </div>

                  <div />

                  <div>
                    <p className="text-[10px] font-medium text-[var(--brand-label)]">Home phone number *</p>
                    <p className="mt-[6px] text-[14px] text-[var(--brand-button)]">+502 2345 6789</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-medium text-[var(--brand-label)]">Notifications</p>
                    <p className="mt-[6px] text-[14px] text-[var(--brand-button)]">By SMS</p>
                  </div>
                </div>

                <div className="mt-6">
                  <EditLink />
                </div>
              </section>

              <Separator className="my-6 bg-[var(--border-strong)]" />

              <section>
                <SectionTitle icon={<House className="size-4 stroke-[2]" />} title="Address" />

                <div className="mt-5">
                  <label className="flex items-center gap-2 text-[12px] text-[var(--brand-label)]">
                    <Checkbox checked disabled className="size-4 rounded-[4px] border-border data-[state=checked]:bg-muted data-[state=checked]:text-[var(--brand-label)] data-[state=checked]:border-border" />
                    <span>Same address as primary member</span>
                  </label>

                  <div className="mt-5">
                    <DetailGrid items={addressData} columns={4} />
                  </div>
                </div>

                <div className="mt-6">
                  <EditLink />
                </div>
              </section>
            </div>
          </div>
        </section>

        <Separator className="mt-[22px] bg-[var(--border-strong)]" />

        <div className="pl-[18px] pt-[18px]">
          <Button
            variant="outline"
            className="h-[34px] rounded-[8px] border-primary bg-white px-3 text-[12px] font-medium text-primary shadow-none hover:bg-[var(--secondary)] hover:text-primary"
          >
            <House className="size-3.5" />
            Go back home
          </Button>
        </div>
      </main>
    </div>
  );
}
