import { ArrowDown, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MembershipRecord {
  member: string;
  idNumber: string;
  membershipNumber: string;
  email: string;
  phone: string;
  status: "Active" | "Cancelled";
}

const membershipResults: MembershipRecord[] = [
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

const headers = [
  "Member",
  "ID Number",
  "Membership number",
  "Email address",
  "Phone number",
  "Membership status",
  "Actions",
] as const;

export function MembershipResultsTable() {
  return (
    <div className="overflow-hidden rounded-[10px] border border-border bg-card shadow-none">
      <Table>
        <TableHeader>
          <TableRow className="h-[48px] border-border hover:bg-transparent">
            {headers.map((header, index) => (
              <TableHead
                key={header}
                className="px-4 text-[12px] font-medium text-[color:rgb(from_var(--brand-navy)_r_g_b_/_0.78)]"
              >
                <div className="flex items-center gap-1.5">
                  <span>{header}</span>
                  {index < headers.length - 1 ? (
                    index === 0 ? (
                      <ArrowDown className="size-3.5 text-[var(--brand-navy)]" strokeWidth={1.8} />
                    ) : (
                      <ArrowUpDown className="size-3.5 text-[var(--brand-navy)]" strokeWidth={1.8} />
                    )
                  ) : null}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {membershipResults.map((row) => (
            <TableRow key={row.membershipNumber} className="h-[52px] border-border hover:bg-muted/20">
              <TableCell className="px-4 text-[14px] text-[color:rgb(from_var(--foreground)_r_g_b_/_0.62)]">
                {row.member}
              </TableCell>
              <TableCell className="px-4 text-[14px] text-[color:rgb(from_var(--foreground)_r_g_b_/_0.62)]">
                {row.idNumber}
              </TableCell>
              <TableCell className="px-4 text-[14px] text-[color:rgb(from_var(--foreground)_r_g_b_/_0.62)]">
                {row.membershipNumber}
              </TableCell>
              <TableCell className="px-4 text-[14px] text-[color:rgb(from_var(--foreground)_r_g_b_/_0.62)]">
                {row.email}
              </TableCell>
              <TableCell className="px-4 text-[14px] text-[color:rgb(from_var(--foreground)_r_g_b_/_0.62)]">
                {row.phone}
              </TableCell>
              <TableCell className="px-4">
                <Badge
                  className={
                    row.status === "Active"
                      ? "rounded-[6px] border-[#c4df89] bg-[#e8f4c8] px-3 py-1 text-[13px] font-medium text-[#6c8a12]"
                      : "rounded-[6px] border-[#f0c0ba] bg-[#f8e1de] px-3 py-1 text-[13px] font-medium text-[#c44a3d]"
                  }
                  variant="outline"
                >
                  {row.status}
                </Badge>
              </TableCell>
              <TableCell className="px-4">
                <button
                  type="button"
                  className="text-[14px] font-medium text-[#60a5fa] transition-colors hover:text-primary"
                >
                  View membership
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
