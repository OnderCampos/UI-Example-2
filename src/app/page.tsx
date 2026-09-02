import { AlertTriangle, ArrowDown, CreditCard, MapPin, Search } from "lucide-react";

import { MembershipActionCard } from "@/components/membership-action-card";
import { MembershipTopbar } from "@/components/membership-topbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    id: "**************856F",
    membership: "8596312475894",
    email: "sarah.j@email.com",
    phone: "+502 9874 5612",
    status: "Active",
    statusTone: "success",
  },
  {
    member: "Michael Treviño",
    id: "**************459G",
    membership: "8542135039750",
    email: "nicolas.trevino@gmail.com",
    phone: "+502 1234 5678",
    status: "Active",
    statusTone: "success",
  },
  {
    member: "Nicolas Treviño",
    id: "**************123S",
    membership: "25639885621471",
    email: "mtrevinob@email.com",
    phone: "+502 1472 5836",
    status: "Cancelled",
    statusTone: "error",
  },
  {
    member: "Emily Treviño",
    id: "**************234E",
    membership: "10254852306589",
    email: "emily.davis.t@email.com",
    phone: "+502 9638 5274",
    status: "Active",
    statusTone: "success",
  },
] as const;

const statusClasses = {
  success: "border-[color:color-mix(in_srgb,var(--success)_28%,white)] bg-[color:color-mix(in_srgb,var(--success)_16%,white)] text-[#6a8b00]",
  error: "border-[color:color-mix(in_srgb,var(--error)_22%,white)] bg-[color:color-mix(in_srgb,var(--error)_10%,white)] text-[#cd4b3d]",
} as const;

function SortableHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1 text-[11px] font-medium text-[color:color-mix(in_srgb,var(--foreground)_72%,white)]">
      <span>{label}</span>
      <ArrowDown className="size-3.5 stroke-[2.2] text-[color:color-mix(in_srgb,var(--foreground)_68%,white)]" />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <MembershipTopbar />

      <section className="mx-auto max-w-[1120px] px-6 pb-24 pt-[26px] lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <MembershipActionCard
            icon={<CreditCard className="size-7" strokeWidth={1.8} />}
            title="New Membership"
            subtle
          />
          <MembershipActionCard
            icon={<AlertTriangle className="size-7" strokeWidth={1.8} />}
            title="Pending process"
          />
        </div>

        <Separator className="my-6 bg-border" />

        <div className="px-6 pt-[50px]">
          <div className="max-w-[940px]">
            <h1 className="text-[25px] font-normal tracking-[-0.03em] text-[color:color-mix(in_srgb,var(--primary)_32%,#0b245f)]">
              Search for membership
            </h1>
            <p className="mt-1.5 text-[14px] leading-6 text-[color:color-mix(in_srgb,var(--primary)_18%,var(--foreground)_82%)]">
              Search for an existing profile before creating a new membership. Enter the
              customer&apos;s last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3.5">
            <div className="relative w-full max-w-[434px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-[17px] -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                defaultValue="Treviño"
                className="h-[42px] rounded-md border-border bg-card pl-11 text-sm text-[color:color-mix(in_srgb,var(--foreground)_70%,white)] shadow-none"
              />
            </div>

            <Button className="h-[35px] rounded-[6px] bg-[color:color-mix(in_srgb,var(--primary)_42%,#0b245f)] px-7 text-[14px] font-semibold text-white shadow-none hover:bg-[color:color-mix(in_srgb,var(--primary)_28%,#0b245f)]">
              Search Membership
            </Button>
          </div>

          <div className="mt-6 overflow-hidden rounded-[10px] border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-[31px] px-4 py-0"><SortableHeader label="Member" /></TableHead>
                  <TableHead className="h-[31px] px-4 py-0"><SortableHeader label="ID Number" /></TableHead>
                  <TableHead className="h-[31px] px-4 py-0"><SortableHeader label="Membership number" /></TableHead>
                  <TableHead className="h-[31px] px-4 py-0"><SortableHeader label="Email address" /></TableHead>
                  <TableHead className="h-[31px] px-4 py-0"><SortableHeader label="Phone number" /></TableHead>
                  <TableHead className="h-[31px] px-4 py-0"><SortableHeader label="Membership status" /></TableHead>
                  <TableHead className="h-[31px] px-4 py-0 text-[11px] font-medium text-[color:color-mix(in_srgb,var(--foreground)_72%,white)]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {membershipRows.map((row) => (
                  <TableRow key={`${row.member}-${row.membership}`} className="h-[52px] border-border/90 bg-card hover:bg-muted/20">
                    <TableCell className="px-4 py-4 text-[11px] font-normal text-[color:color-mix(in_srgb,var(--foreground)_62%,white)]">
                      {row.member}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-[11px] text-[color:color-mix(in_srgb,var(--foreground)_62%,white)]">
                      {row.id}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-[11px] text-[color:color-mix(in_srgb,var(--foreground)_62%,white)]">
                      {row.membership}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-[11px] text-[color:color-mix(in_srgb,var(--foreground)_62%,white)]">
                      {row.email}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-[11px] text-[color:color-mix(in_srgb,var(--foreground)_62%,white)]">
                      {row.phone}
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <Badge
                        variant="outline"
                        className={`h-[22px] rounded-[6px] px-3 text-[11px] font-medium ${statusClasses[row.statusTone]}`}
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-4 text-[11px]">
                      <a
                        href="#"
                        className="font-medium text-[color:color-mix(in_srgb,var(--primary)_70%,white)] hover:text-primary"
                      >
                        View membership
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </main>
  );
}
