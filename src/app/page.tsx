import {
  BadgeCheck,
  ChevronDown,
  CircleAlert,
  CreditCard,
  Globe,
  MapPin,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const membershipRows = [
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

function MembershipActionCard({
  icon,
  title,
  emphasized = false,
}: {
  icon: React.ReactNode;
  title: string;
  emphasized?: boolean;
}) {
  return (
    <Card
      className={[
        "min-h-[152px] flex-row items-center gap-5 rounded-[var(--radius-panel)] border border-border px-10 py-8 shadow-none",
        emphasized ? "bg-[color:var(--surface-muted)]" : "bg-card",
      ].join(" ")}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[color:var(--brand-blue)] text-[color:var(--brand-blue)]">
        {icon}
      </div>
      <span className="text-[clamp(1.75rem,2vw,2.15rem)] font-bold tracking-[-0.02em] text-[color:var(--brand-blue)]">
        {title}
      </span>
    </Card>
  );
}

function TopBar() {
  return (
    <header className="w-full">
      <div className="bg-[color:var(--navy)] text-white">
        <div className="mx-auto flex h-[58px] w-full max-w-[1060px] items-center justify-between px-6 lg:px-4">
          <div className="flex items-center gap-2.5 text-[14px] font-semibold tracking-[-0.02em]">
            <span className="relative inline-flex h-5 w-5 items-center justify-center text-[color:var(--brand-orange)]">
              <span className="absolute text-[18px] leading-none">✶</span>
            </span>
            <span className="text-[15px]">PriceSmart</span>
          </div>
          <div className="flex items-center gap-7 text-[14px] font-medium text-white/95">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Guatemala</span>
              <ChevronDown className="h-4 w-4 text-white/70" />
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>English</span>
              <ChevronDown className="h-4 w-4 text-white/70" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[36px] bg-[color:var(--brand-blue)]" />
    </header>
  );
}

function StatusBadge({ status }: { status: string }) {
  const active = status === "Active";

  return (
    <Badge
      variant="outline"
      className={[
        "min-w-[50px] rounded-[8px] border px-2.5 py-1 text-[12px] font-medium shadow-none",
        active
          ? "border-[#B7DB7A] bg-[#E8F4C8] text-[#6A911A]"
          : "border-[#F2C0B5] bg-[#FFF1EC] text-[#CC5A41]",
      ].join(" ")}
    >
      {status}
    </Badge>
  );
}

function MembersTable() {
  return (
    <div className="mt-8 overflow-hidden rounded-[12px] border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-border bg-card hover:bg-card">
            {[
              "Member",
              "ID Number",
              "Membership number",
              "Email address",
              "Phone number",
              "Membership status",
            ].map((label) => (
              <TableHead
                key={label}
                className="h-[32px] px-4 text-[11px] font-medium text-[color:var(--text-subtle)]"
              >
                <span className="inline-flex items-center gap-1.5">
                  {label}
                  <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-[color:var(--text-subtle)]" />
                </span>
              </TableHead>
            ))}
            <TableHead className="h-[32px] px-4 text-[11px] font-medium text-[color:var(--text-subtle)]">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {membershipRows.map((row) => (
            <TableRow key={row.membershipNumber} className="h-[52px] border-border hover:bg-muted/30">
              <TableCell className="px-4 py-4 text-[13px] text-[color:var(--table-text)]">
                {row.member}
              </TableCell>
              <TableCell className="px-4 py-4 text-[13px] text-[color:var(--table-text)]">
                {row.idNumber}
              </TableCell>
              <TableCell className="px-4 py-4 text-[13px] text-[color:var(--table-text)]">
                {row.membershipNumber}
              </TableCell>
              <TableCell className="px-4 py-4 text-[13px] text-[color:var(--table-text)]">
                {row.email}
              </TableCell>
              <TableCell className="px-4 py-4 text-[13px] text-[color:var(--table-text)]">
                {row.phone}
              </TableCell>
              <TableCell className="px-4 py-4">
                <StatusBadge status={row.status} />
              </TableCell>
              <TableCell className="px-4 py-4 text-[13px] font-medium">
                <button className="text-[color:var(--brand-link)] hover:underline">View membership</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <TopBar />

      <section className="mx-auto flex w-full max-w-[1060px] flex-col px-6 pb-16 pt-6 lg:px-4">
        <div className="grid gap-6 md:grid-cols-2">
          <MembershipActionCard
            emphasized
            icon={<CreditCard className="h-6 w-6 stroke-[1.75]" />}
            title="New Membership"
          />
          <MembershipActionCard
            icon={<CircleAlert className="h-6 w-6 stroke-[1.75]" />}
            title="Pending process"
          />
        </div>

        <Separator className="my-6" />

        <section className="px-6 pt-12">
          <div className="max-w-[900px]">
            <h1 className="text-[24px] font-normal tracking-[-0.02em] text-[color:var(--brand-blue)]">
              Search for membership
            </h1>
            <p className="mt-2 max-w-[860px] text-[15px] leading-6 text-[color:var(--brand-blue)]/85">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s
              last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="relative w-full max-w-[435px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                defaultValue="Treviño"
                className="h-[42px] rounded-[var(--radius-md)] border-border bg-card pl-11 text-[15px] text-[color:var(--brand-blue)] shadow-none"
              />
            </div>
            <Button className="h-[34px] rounded-[var(--radius-sm)] bg-[color:var(--brand-blue)] px-7 text-[15px] font-semibold text-white shadow-none hover:bg-[color:var(--brand-blue-hover)]">
              Search Membership
            </Button>
          </div>

          <MembersTable />

          <div className="mt-8 flex justify-center">
            <Button
              variant="outline"
              className="h-[42px] rounded-[var(--radius-md)] border-[color:var(--button-muted-border)] bg-[color:var(--button-muted)] px-6 text-[15px] font-medium text-[color:var(--button-muted-foreground)] shadow-none hover:bg-[color:var(--button-muted-hover)] hover:text-[color:var(--button-muted-foreground)]"
            >
              <BadgeCheck className="h-4.5 w-4.5" />
              Proceed with the new membership
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}
