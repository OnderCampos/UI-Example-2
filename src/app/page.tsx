import { MembershipActionCard } from "@/components/membership-action-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  ArrowDown,
  ChevronDown,
  CreditCard,
  Globe,
  MapPin,
  Search,
} from "lucide-react";

const quickActions = [
  {
    title: "New Membership",
    icon: CreditCard,
    subtle: true,
  },
  {
    title: "Pending process",
    icon: AlertTriangle,
  },
];

const members = [
  {
    member: "Sarah Treviño",
    id: "*************856F",
    membershipNumber: "8596312475894",
    email: "sarah.j@email.com",
    phone: "+502 9874 5612",
    status: "Active",
    tone: "active",
  },
  {
    member: "Michael Treviño",
    id: "*************459G",
    membershipNumber: "8542135039750",
    email: "nicolas.trevino@gmail.com",
    phone: "+502 1234 5678",
    status: "Active",
    tone: "active",
  },
  {
    member: "Nicolas Treviño",
    id: "*************123S",
    membershipNumber: "25639885621471",
    email: "mtrevinob@email.com",
    phone: "+502 1472 5836",
    status: "Cancelled",
    tone: "cancelled",
  },
  {
    member: "Emily Treviño",
    id: "*************234E",
    membershipNumber: "10254852306589",
    email: "emily.davis.t@email.com",
    phone: "+502 9638 5274",
    status: "Active",
    tone: "active",
  },
];

const tableHeaders = [
  "Member",
  "ID Number",
  "Membership number",
  "Email address",
  "Phone number",
  "Membership status",
  "Actions",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f6f8] text-[#243b7b]">
      <header className="bg-[#162b69] text-white">
        <div className="mx-auto flex h-[58px] max-w-[1120px] items-center justify-between px-10">
          <div className="flex items-center gap-2 text-[17px] font-semibold tracking-[-0.02em]">
            <span className="relative inline-flex size-5 items-center justify-center">
              <span className="absolute text-[20px] leading-none text-[#f26722]">✶</span>
            </span>
            <span>PriceSmart</span>
          </div>

          <div className="flex items-center gap-8 text-[14px] font-medium text-white/95">
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex size-4 items-center justify-center rounded-full bg-white/20 text-[10px]">
                🌐
              </span>
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
        <div className="h-[35px] bg-[#1e46bc]" />
      </header>

      <section className="mx-auto max-w-[1120px] px-[58px] pt-[25px] pb-20">
        <div className="grid gap-[22px] md:grid-cols-2">
          {quickActions.map((action) => (
            <MembershipActionCard key={action.title} {...action} />
          ))}
        </div>

        <Separator className="my-[22px] bg-[#d9dee7]" />

        <div className="px-6 pt-[33px] text-[#253f82]">
          <h1 className="text-[24px] font-normal tracking-[0.01em]">
            Search for membership
          </h1>
          <p className="mt-2 max-w-[900px] text-[15px] leading-6 text-[#41598f]">
            Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
          </p>

          <div className="mt-7 flex flex-col items-center">
            <InputGroup className="h-[42px] w-full max-w-[435px] rounded-[10px] border-[#d0d6e0] bg-white shadow-none">
              <InputGroupAddon className="pl-3 pr-2 text-[#6f7a93]">
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                aria-label="Search membership"
                defaultValue="Treviño"
                className="h-[42px] px-0 text-[15px] text-[#526488] placeholder:text-[#7c879f]"
              />
            </InputGroup>

            <Button
              type="button"
              className="mt-[10px] h-[35px] rounded-md bg-[#27438f] px-6 text-[14px] font-semibold text-white shadow-none hover:bg-[#233f88]"
            >
              Search Membership
            </Button>
          </div>

          <div className="mx-auto mt-6 max-w-[915px] overflow-hidden rounded-xl border border-[#dadfe7] bg-white">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#dde2e8] bg-white hover:bg-white">
                  {tableHeaders.map((header) => (
                    <TableHead
                      key={header}
                      className="h-[31px] px-4 text-[11px] font-medium text-[#4e5d79]"
                    >
                      <span className="inline-flex items-center gap-1">
                        {header}
                        {header !== "Actions" && <ArrowDown className="size-3.5 stroke-[1.9]" />}
                      </span>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow
                    key={member.membershipNumber}
                    className="h-[52px] border-b border-[#eceff4] text-[14px] text-[#66758e] hover:bg-[#fafbfc]"
                  >
                    <TableCell className="px-4 py-3 text-[#68768c]">{member.member}</TableCell>
                    <TableCell className="px-4 py-3 tracking-[0.03em] text-[#606d84]">{member.id}</TableCell>
                    <TableCell className="px-4 py-3 text-[#606d84]">{member.membershipNumber}</TableCell>
                    <TableCell className="px-4 py-3 text-[#606d84]">{member.email}</TableCell>
                    <TableCell className="px-4 py-3 text-[#606d84]">{member.phone}</TableCell>
                    <TableCell className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={member.tone === "active"
                          ? "rounded-md border-[#c6de89] bg-[#e0efb5] px-3 py-1 text-[12px] font-medium text-[#66861a]"
                          : "rounded-md border-[#f2c4b9] bg-[#fde8e1] px-3 py-1 text-[12px] font-medium text-[#cf5b43]"
                        }
                      >
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <button
                        type="button"
                        className="text-[14px] font-medium text-[#5792f9] hover:text-[#3777ea]"
                      >
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
