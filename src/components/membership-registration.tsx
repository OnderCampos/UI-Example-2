import Image from "next/image";
import {
  AlertTriangle,
  ChevronDown,
  CreditCard,
  Globe,
  MapPin,
  Search,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type ActionTileProps = {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
};

type MemberRow = {
  member: string;
  idNumber: string;
  membershipNumber: string;
  email: string;
  phone: string;
  status: "Active" | "Cancelled";
};

const memberRows: MemberRow[] = [
  {
    member: "Sarah Treviño",
    idNumber: "*************856F",
    membershipNumber: "8596312475894",
    email: "sarah.j@email.com",
    phone: "+502 9874 5612",
    status: "Active",
  },
  {
    member: "Michael Treviño",
    idNumber: "*************459G",
    membershipNumber: "8542135039750",
    email: "nicolas.trevino@gmail.com",
    phone: "+502 1234 5678",
    status: "Active",
  },
  {
    member: "Nicolas Treviño",
    idNumber: "*************123S",
    membershipNumber: "25639885621471",
    email: "mtrevinob@email.com",
    phone: "+502 1472 5836",
    status: "Cancelled",
  },
  {
    member: "Emily Treviño",
    idNumber: "*************234E",
    membershipNumber: "10254852306589",
    email: "emily.davis.t@email.com",
    phone: "+502 9638 5274",
    status: "Active",
  },
];

function ActionTile({ title, icon, active = false }: ActionTileProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex min-h-[152px] items-center gap-6 rounded-[var(--radius-md)] border px-11 py-9 text-left transition-colors",
        active
          ? "border-transparent bg-[#f0f1f4]"
          : "border-border bg-surface hover:bg-muted/50",
      )}
    >
      <span className="flex size-[56px] shrink-0 items-center justify-center rounded-full border-2 border-[var(--brand-button)] text-[var(--brand-button)]">
        {icon}
      </span>
      <span className="text-[20px] font-bold tracking-[-0.02em] text-[var(--brand-button)]">{title}</span>
    </button>
  );
}

function TopBar() {
  return (
    <header>
      <div className="bg-[var(--brand-header)] text-white">
        <div className="mx-auto flex h-[58px] w-full max-w-[1200px] items-center justify-between px-8">
          <Image
            src="/next.svg"
            alt="PriceSmart"
            width={118}
            height={24}
            className="h-auto w-[118px] brightness-0 invert"
          />
          <div className="hidden items-center gap-8 text-[15px] font-medium md:flex">
            <div className="flex items-center gap-2">
              <MapPin className="size-[16px]" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[15px]">🌐</span>
              <span>Guatemala</span>
              <ChevronDown className="size-4" />
            </div>
            <div className="flex items-center gap-2">
              <Globe className="size-[17px]" />
              <span>English</span>
              <ChevronDown className="size-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[36px] bg-[var(--brand-button)]" />
    </header>
  );
}

function MembershipStatusBadge({ status }: { status: MemberRow["status"] }) {
  if (status === "Cancelled") {
    return (
      <Badge className="rounded-[6px] border-[#f2cfc9] bg-[#fff2ef] px-[10px] py-[4px] text-[12px] font-medium text-[#d85a41] hover:bg-[#fff2ef]">
        {status}
      </Badge>
    );
  }

  return (
    <Badge className="rounded-[6px] border-[#c6dd8c] bg-[#e7f4bf] px-[10px] py-[4px] text-[12px] font-medium text-[#6f9600] hover:bg-[#e7f4bf]">
      {status}
    </Badge>
  );
}

export function MembershipRegistration() {
  return (
    <div className="min-h-screen bg-background text-foreground [color-scheme:light]">
      <TopBar />
      <main className="mx-auto max-w-[1200px] px-[58px] pb-16 pt-[26px]">
        <section className="grid gap-[22px] md:grid-cols-2">
          <ActionTile
            title="New Membership"
            active
            icon={<CreditCard className="size-[28px] stroke-[1.8]" />}
          />
          <ActionTile
            title="Pending process"
            icon={<AlertTriangle className="size-[28px] stroke-[1.8]" />}
          />
        </section>

        <div className="mt-[22px] border-t border-border" />

        <section className="px-6 pb-6 pt-[52px]">
          <div className="max-w-[920px]">
            <h1 className="text-[25px] font-normal tracking-[-0.02em] text-[var(--brand-button)]">
              Search for membership
            </h1>
            <p className="mt-[4px] text-[14px] text-[var(--brand-button)]/85">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-[22px] flex flex-col items-center gap-[10px]">
            <div className="relative w-full max-w-[434px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                defaultValue="Treviño"
                className="h-[42px] rounded-[10px] border-border bg-surface pl-9 pr-4 text-[14px] text-[var(--brand-button)] shadow-none placeholder:text-muted-foreground focus-visible:ring-[2px]"
              />
            </div>
            <Button className="h-[35px] rounded-[7px] bg-[var(--brand-button)] px-6 text-[14px] font-semibold text-white shadow-none hover:bg-[var(--brand-button-hover)]">
              Search Membership
            </Button>
          </div>

          <div className="mt-[24px] overflow-hidden rounded-[12px] border border-border bg-white">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-white">
                  {[
                    "Member",
                    "ID Number",
                    "Membership number",
                    "Email address",
                    "Phone number",
                    "Membership status",
                    "Actions",
                  ].map((heading) => (
                    <TableHead
                      key={heading}
                      className="h-[31px] px-4 text-[11px] font-medium text-[var(--brand-label)]"
                    >
                      <span className="inline-flex items-center gap-1">
                        {heading}
                        {heading !== "Actions" ? (
                          <span className="text-[13px] text-[var(--brand-label)]">↓</span>
                        ) : null}
                      </span>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {memberRows.map((row) => (
                  <TableRow key={`${row.member}-${row.membershipNumber}`} className="h-[52px] border-border hover:bg-[#fafbfd]">
                    <TableCell className="px-4 text-[12px] text-[#697586]">{row.member}</TableCell>
                    <TableCell className="px-4 text-[12px] text-[#697586]">{row.idNumber}</TableCell>
                    <TableCell className="px-4 text-[12px] text-[#697586]">{row.membershipNumber}</TableCell>
                    <TableCell className="px-4 text-[12px] text-[#697586]">{row.email}</TableCell>
                    <TableCell className="px-4 text-[12px] text-[#697586]">{row.phone}</TableCell>
                    <TableCell className="px-4"><MembershipStatusBadge status={row.status} /></TableCell>
                    <TableCell className="px-4 text-[12px] font-medium text-[#62a1fa]">
                      <button type="button">View membership</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </div>
  );
}
