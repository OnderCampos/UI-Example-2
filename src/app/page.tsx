import Image from "next/image";
import {
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
    idNumber: "**************856F",
    membershipNumber: "8596312475894",
    email: "sarah.j@email.com",
    phone: "+502 9874 5612",
    status: "Active",
  },
  {
    member: "Michael Treviño",
    idNumber: "**************459G",
    membershipNumber: "8542135039750",
    email: "nicolas.trevino@gmail.com",
    phone: "+502 1234 5678",
    status: "Active",
  },
  {
    member: "Nicolas Treviño",
    idNumber: "**************123S",
    membershipNumber: "25639885621471",
    email: "mtrevinob@email.com",
    phone: "+502 1472 5836",
    status: "Cancelled",
  },
  {
    member: "Emily Treviño",
    idNumber: "**************234E",
    membershipNumber: "10254852306589",
    email: "emily.davis.t@email.com",
    phone: "+502 9638 5274",
    status: "Active",
  },
];

function MembershipActionCard({
  icon,
  title,
  highlighted = false,
}: {
  icon: React.ReactNode;
  title: string;
  highlighted?: boolean;
}) {
  return (
    <Card
      className={[
        "flex min-h-[152px] flex-row items-center gap-7 rounded-lg border border-[#d6dae3] px-14 py-11 shadow-none",
        highlighted ? "bg-[#f1f1f3]" : "bg-white",
      ].join(" ")}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#2f5edb] text-[#2f5edb]">
        {icon}
      </div>
      <span className="text-[19px] font-semibold tracking-[-0.01em] text-[#233f8c]">{title}</span>
    </Card>
  );
}

function HeaderSelection({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-white/95">
      {icon}
      <span>{label}</span>
      <ChevronDown className="h-4 w-4" />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isActive = status === "Active";

  return (
    <Badge
      variant="outline"
      className={[
        "rounded-md border px-3 py-1 text-[12px] font-medium shadow-none",
        isActive
          ? "border-[#bddc7a] bg-[#e7f2c5] text-[#658d18]"
          : "border-[#f1c4ba] bg-[#fdf0ec] text-[#d35a43]",
      ].join(" ")}
    >
      {status}
    </Badge>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f7f8] text-[#233f8c]">
      <header className="w-full">
        <div className="bg-[#16295f] text-white">
          <div className="mx-auto flex h-[58px] max-w-[1120px] items-center justify-between px-6 lg:px-8">
            <Image
              src="/Frida.png"
              alt="PriceSmart"
              width={155}
              height={36}
              className="h-auto w-[128px] object-contain brightness-0 invert"
              priority
            />

            <div className="flex items-center gap-7">
              <HeaderSelection icon={<MapPin className="h-4 w-4" />} label="Miraflores" />
              <HeaderSelection
                icon={<div className="h-4 w-4 rounded-full bg-white/85 ring-1 ring-white/50" />}
                label="Guatemala"
              />
              <HeaderSelection icon={<Globe className="h-4 w-4" />} label="English" />
            </div>
          </div>
        </div>
        <div className="h-[38px] bg-[#1f47b8]" />
      </header>

      <section className="mx-auto max-w-[1120px] px-6 pb-20 pt-7 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <MembershipActionCard
            icon={<CreditCard className="h-7 w-7 stroke-[1.8]" />}
            title="New Membership"
            highlighted
          />
          <MembershipActionCard
            icon={<CircleAlert className="h-7 w-7 stroke-[1.8]" />}
            title="Pending process"
          />
        </div>

        <Separator className="my-6 bg-[#d9dde4]" />

        <div className="px-6 pt-12">
          <div className="max-w-[860px]">
            <h1 className="text-[25px] font-medium tracking-[-0.01em] text-[#233f8c]">
              Search for membership
            </h1>
            <p className="mt-3 text-[14px] leading-6 text-[#37508f]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="relative w-full max-w-[434px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6d7890]" />
              <Input
                type="text"
                defaultValue="Treviño"
                className="h-[42px] rounded-[10px] border-[#ced5e1] bg-white pl-11 text-[14px] text-[#233f8c] shadow-none focus-visible:border-[#ced5e1] focus-visible:ring-0"
              />
            </div>

            <Button className="h-[35px] rounded-md bg-[#233f8c] px-9 text-[14px] font-semibold text-white hover:bg-[#233f8c]/95">
              Search Membership
            </Button>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-[#d9dde4] bg-white">
            <Table>
              <TableHeader>
                <TableRow className="border-[#e5e8ee] hover:bg-transparent">
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
                      className="h-[31px] px-4 text-[12px] font-medium text-[#57647f]"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{heading}</span>
                        {heading !== "Actions" && <ChevronDown className="h-3.5 w-3.5" />}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {membershipRows.map((row) => (
                  <TableRow
                    key={`${row.member}-${row.membershipNumber}`}
                    className="h-[52px] border-[#e5e8ee] bg-white hover:bg-white"
                  >
                    <TableCell className="px-4 text-[12px] text-[#667289]">{row.member}</TableCell>
                    <TableCell className="px-4 text-[12px] text-[#667289]">{row.idNumber}</TableCell>
                    <TableCell className="px-4 text-[12px] text-[#667289]">{row.membershipNumber}</TableCell>
                    <TableCell className="px-4 text-[12px] text-[#667289]">{row.email}</TableCell>
                    <TableCell className="px-4 text-[12px] text-[#667289]">{row.phone}</TableCell>
                    <TableCell className="px-4">
                      <StatusBadge status={row.status} />
                    </TableCell>
                    <TableCell className="px-4 text-[12px] font-medium text-[#4b94f6]">
                      <button type="button" className="hover:underline">
                        View membership
                      </button>
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
