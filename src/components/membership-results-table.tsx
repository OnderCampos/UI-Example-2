import { ArrowDown, Search } from "lucide-react";

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

type MembershipStatus = "active" | "cancelled";

type MemberRecord = {
  member: string;
  idNumber: string;
  membershipNumber: string;
  email: string;
  phone: string;
  status: MembershipStatus;
};

const members: MemberRecord[] = [
  {
    member: "Sarah Treviño",
    idNumber: "**************856F",
    membershipNumber: "8596312475894",
    email: "sarah.j@email.com",
    phone: "+502 9874 5612",
    status: "active",
  },
  {
    member: "Michael Treviño",
    idNumber: "**************459G",
    membershipNumber: "8542135039750",
    email: "nicolas.trevino@gmail.com",
    phone: "+502 1234 5678",
    status: "active",
  },
  {
    member: "Nicolas Treviño",
    idNumber: "**************123S",
    membershipNumber: "25639885621471",
    email: "mtrevinob@email.com",
    phone: "+502 1472 5836",
    status: "cancelled",
  },
  {
    member: "Emily Treviño",
    idNumber: "**************234E",
    membershipNumber: "10254852306589",
    email: "emily.davis.t@email.com",
    phone: "+502 9638 5274",
    status: "active",
  },
];

const columns = [
  "Member",
  "ID Number",
  "Membership number",
  "Email address",
  "Phone number",
  "Membership status",
  "Actions",
] as const;

function StatusBadge({ status }: { status: MembershipStatus }) {
  if (status === "cancelled") {
    return (
      <Badge className="min-w-[74px] rounded-[6px] border-[var(--status-cancelled-border)] bg-[var(--status-cancelled-bg)] px-[10px] py-[3px] text-[13px] font-medium text-[var(--status-cancelled-text)]">
        Cancelled
      </Badge>
    );
  }

  return (
    <Badge className="min-w-[61px] rounded-[6px] border-[var(--status-active-border)] bg-[var(--status-active-bg)] px-[10px] py-[3px] text-[13px] font-medium text-[var(--status-active-text)]">
      Active
    </Badge>
  );
}

export function MembershipResultsTable() {
  return (
    <div className="px-6">
      <div className="max-w-[880px]">
        <h1 className="text-[24px] font-normal tracking-[-0.02em] text-[var(--brand-header)]">
          Search for membership
        </h1>
        <p className="mt-[6px] max-w-[860px] text-[14px] leading-6 text-[var(--brand-copy)]">
          Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
        </p>
      </div>

      <div className="mt-[22px] flex flex-col items-center">
        <div className="relative w-full max-w-[434px]">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-[17px] -translate-y-1/2 text-muted-foreground" strokeWidth={2} />
          <Input
            type="text"
            defaultValue="Treviño"
            aria-label="Search membership"
            className="h-[42px] rounded-[var(--radius-md)] border-[var(--color-border)] bg-card pl-11 text-[14px] text-[var(--brand-copy)] shadow-none focus-visible:ring-0"
          />
        </div>

        <Button className="mt-[10px] h-[34px] rounded-[8px] bg-[var(--brand-header)] px-[13px] text-[14px] font-semibold text-white shadow-none hover:bg-[var(--brand-header)]/95">
          Search Membership
        </Button>
      </div>

      <div className="mt-[24px] overflow-hidden rounded-[12px] border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map((column) => (
                <TableHead
                  key={column}
                  className="h-[31px] px-4 text-[11px] font-medium text-[var(--brand-copy)]"
                >
                  <div className="flex items-center gap-[6px] whitespace-nowrap">
                    <span>{column}</span>
                    {column !== "Actions" ? <ArrowDown className="size-3 text-[var(--brand-copy)]" strokeWidth={1.9} /> : null}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.membershipNumber} className="h-[52px] border-border hover:bg-transparent">
                <TableCell className="px-4 text-[12px] text-[var(--brand-copy)]">{member.member}</TableCell>
                <TableCell className="px-4 text-[12px] text-[var(--brand-copy)]">{member.idNumber}</TableCell>
                <TableCell className="px-4 text-[12px] text-[var(--brand-copy)]">{member.membershipNumber}</TableCell>
                <TableCell className="px-4 text-[12px] text-[var(--brand-copy)]">{member.email}</TableCell>
                <TableCell className="px-4 text-[12px] text-[var(--brand-copy)]">{member.phone}</TableCell>
                <TableCell className="px-4"><StatusBadge status={member.status} /></TableCell>
                <TableCell className="px-4 text-[12px] font-medium text-[var(--brand-link)]">
                  <button type="button" className="transition-opacity hover:opacity-80">
                    View membership
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
