import {
  ChevronDown,
  Check,
  CircleX,
  CreditCard,
  Globe,
  IdCard,
  MapPin,
  RefreshCcw,
  Receipt,
  UserRound,
  UserRoundPlus,
  ArrowUpDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type SidebarItem = {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

type SecondaryMembershipRow = {
  status: "Active" | "Inactive";
  customer: string;
  membershipNumber: string;
  membershipType: "Primary" | "Secondary";
  created: string;
  enabled: boolean;
};

const sidebarItems: SidebarItem[] = [
  { label: "Membership information", icon: <UserRound className="size-[18px] stroke-[1.6]" /> },
  { label: "Secondary memberships", icon: <UserRoundPlus className="size-[18px] stroke-[1.6]" />, active: true },
  { label: "Renew membership", icon: <RefreshCcw className="size-[18px] stroke-[1.6]" /> },
  { label: "Upgrade membership", icon: <ChevronDown className="size-[18px] rotate-180 stroke-[1.6]" /> },
  { label: "Day Pass", icon: <IdCard className="size-[18px] stroke-[1.6]" /> },
  { label: "Card reprint", icon: <CreditCard className="size-[18px] stroke-[1.6]" /> },
  { label: "Membership refund", icon: <Receipt className="size-[18px] stroke-[1.6]" /> },
  { label: "Cancel membership", icon: <CircleX className="size-[18px] stroke-[1.6]" /> },
];

const rows: SecondaryMembershipRow[] = [
  {
    status: "Active",
    customer: "Sarah Treviño",
    membershipNumber: "8596312475894",
    membershipType: "Primary",
    created: "2025/12/10",
    enabled: true,
  },
  {
    status: "Active",
    customer: "Michael Treviño",
    membershipNumber: "8542135039750",
    membershipType: "Secondary",
    created: "2025/12/10",
    enabled: true,
  },
  {
    status: "Inactive",
    customer: "Nicolas Treviño",
    membershipNumber: "25639885621471",
    membershipType: "Secondary",
    created: "2025/12/10",
    enabled: false,
  },
];

function MembershipTopBar() {
  return (
    <header className="shadow-[0_1px_0_rgba(15,23,42,0.06)]">
      <div className="bg-[var(--brand-header)] text-white">
        <div className="mx-auto flex h-[60px] max-w-[1360px] items-center justify-between px-[84px] text-[14px]">
          <div className="flex items-center gap-2 text-[18px] font-semibold tracking-[-0.02em]">
            <span className="text-[20px] text-[#f97316]">✶</span>
            <span>PriceSmart</span>
          </div>
          <div className="flex items-center gap-8 text-white/95">
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="size-4" />
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

function SidebarNav() {
  return (
    <aside className="w-[156px] shrink-0 pr-6">
      <nav className="space-y-[18px] pt-5">
        {sidebarItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={cn(
              "flex w-full items-center gap-3 rounded-[10px] px-[10px] py-[9px] text-left text-[14px] leading-[1.2] text-muted-foreground transition-colors",
              item.active ? "bg-[var(--secondary)] text-[var(--brand-button)]" : "hover:bg-white/70",
            )}
          >
            <span className={cn("text-[#c2cad6]", item.active && "text-[var(--brand-button)]")}>{item.icon}</span>
            <span className={cn(item.active && "font-semibold")}>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function SortableHead({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1 text-[11px] font-medium text-[var(--brand-label)]">
      <span>{label}</span>
      <ArrowUpDown className="size-3 stroke-[1.8]" />
    </div>
  );
}

export function MembershipSecondaryMemberships() {
  return (
    <div className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <MembershipTopBar />

      <main className="mx-auto max-w-[1360px] px-[60px] pb-[28px] pt-[18px]">
        <div className="pl-[24px]">
          <h1 className="text-[24px] font-medium tracking-[-0.02em] text-[var(--brand-button)]">
            Nicolas Treviño - 8596312475894
          </h1>
          <p className="mt-[2px] text-[14px] text-[var(--brand-label)]">Primary membership</p>
        </div>

        <section className="mt-6 grid grid-cols-[156px_1px_1fr] items-start gap-6">
          <SidebarNav />
          <div className="min-h-[486px] bg-border" />

          <div className="pt-3">
            <div className="max-w-[820px]">
              <div className="flex items-center gap-3 text-[18px] font-medium text-[var(--brand-button)]">
                <UserRoundPlus className="size-5 stroke-[1.8]" />
                <h2>Secondary membehrips</h2>
              </div>
              <p className="mt-1 max-w-[780px] text-[12px] leading-[1.35] text-[var(--text-subtle)]">
                Manage the additional cards linked to this account. You can register new secondary members according to the available slots for this membership tier. Memberships currently deactivated cannot be reactivated from this section and will require a different process.
              </p>

              <div className="mt-6 overflow-hidden rounded-[12px] border border-border bg-surface shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
                <Table>
                  <TableHeader>
                    <TableRow className="h-[32px] border-border bg-white hover:bg-white">
                      <TableHead className="px-[18px]"><SortableHead label="Status" /></TableHead>
                      <TableHead className="w-[36px] px-0" />
                      <TableHead className="px-[10px]"><SortableHead label="Customer name" /></TableHead>
                      <TableHead className="px-[10px]"><SortableHead label="Membership number" /></TableHead>
                      <TableHead className="px-[10px]"><SortableHead label="Membership type" /></TableHead>
                      <TableHead className="px-[10px]"><SortableHead label="Created" /></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.membershipNumber} className="h-[54px] border-border bg-white hover:bg-white">
                        <TableCell className="px-[18px] py-0">
                          <div className="flex items-center gap-3">
                            <Switch checked={row.enabled} className="h-[22px] w-[36px] data-[state=checked]:bg-[var(--brand-button)] data-[state=unchecked]:bg-[#edf1f5]" />
                            <span className={cn("text-[14px]", row.enabled ? "font-medium text-[var(--brand-button)]" : "text-[var(--brand-label)]")}>{row.status}</span>
                          </div>
                        </TableCell>
                        <TableCell className="px-0 py-0">
                          <Checkbox checked={false} className="size-4 rounded-full border-[#d5dce6] data-[state=checked]:rounded-[4px] data-[state=checked]:border-primary" aria-label={`Select ${row.customer}`}>
                            <Check className="size-3" />
                          </Checkbox>
                        </TableCell>
                        <TableCell className="px-[10px] py-0 text-[14px] font-medium text-[var(--brand-button)]">{row.customer}</TableCell>
                        <TableCell className="px-[10px] py-0 text-[14px] text-[var(--brand-label)]">{row.membershipNumber}</TableCell>
                        <TableCell className="px-[10px] py-0 text-[14px] text-[var(--brand-label)]">{row.membershipType}</TableCell>
                        <TableCell className="px-[10px] py-0 text-[14px] text-[var(--brand-label)]">{row.created}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>

        <Separator className="mt-[42px] bg-border" />

        <div className="pt-[24px] pl-[24px]">
          <Button
            variant="outline"
            className="h-[36px] rounded-[8px] border-[var(--primary)] bg-white px-4 text-[14px] font-semibold text-[var(--primary)] shadow-none hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
          >
            Go back home
          </Button>
        </div>
      </main>
    </div>
  );
}
