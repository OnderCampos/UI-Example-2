import { ChevronDown, CreditCard, Globe, MapPin, Search, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";

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
        "min-h-[124px] flex-row items-center gap-5 rounded-lg px-10 py-8 shadow-none",
        highlighted ? "border-transparent bg-[#f2f2f4]" : "border-[#d4d9e3] bg-white",
      ].join(" ")}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#2755d8] text-[#2755d8]">
        {icon}
      </div>
      <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-[#1f3f8e]">{title}</h2>
    </Card>
  );
}

function TopBarSelect({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-white/95">
      <span className="text-white/90">{icon}</span>
      <span>{label}</span>
      <ChevronDown className="h-4 w-4 text-white/80" />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f7f8] text-slate-900">
      <header>
        <div className="bg-[#13295f]">
          <div className="mx-auto flex h-[60px] max-w-[1080px] items-center justify-between px-6">
            <div className="flex items-center gap-2 text-white">
              <div className="relative h-6 w-6">
                <div className="absolute left-1/2 top-0 h-3.5 w-[2px] -translate-x-1/2 rounded-full bg-[#f15b2a]" />
                <div className="absolute left-1/2 top-0 h-[2px] w-3.5 -translate-x-1/2 rounded-full bg-[#f15b2a]" />
                <div className="absolute left-1/2 top-1/2 h-[2px] w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-[#f15b2a]" />
                <div className="absolute left-1/2 top-1/2 h-[2px] w-3.5 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-[#f15b2a]" />
              </div>
              <span className="text-[15px] font-semibold tracking-[-0.02em]">PriceSmart</span>
            </div>

            <div className="flex items-center gap-8">
              <TopBarSelect icon={<MapPin className="h-4 w-4" />} label="Miraflores" />
              <TopBarSelect icon={<Globe className="h-4 w-4" />} label="Guatemala" />
              <TopBarSelect icon={<Globe className="h-4 w-4" />} label="English" />
            </div>
          </div>
        </div>
        <div className="h-[39px] bg-[#1145d5]" />
      </header>

      <section className="mx-auto max-w-[1080px] px-[59px] pb-24 pt-[23px]">
        <div className="grid gap-6 md:grid-cols-2">
          <MembershipActionCard
            highlighted
            title="New Membership"
            icon={<CreditCard className="h-6 w-6 stroke-[1.75]" />}
          />
          <MembershipActionCard
            title="Pending process"
            icon={<ShieldAlert className="h-6 w-6 stroke-[1.75]" />}
          />
        </div>

        <Separator className="my-6 bg-[#d8dbe4]" />

        <div className="px-6 pt-[54px]">
          <div className="max-w-[885px]">
            <h1 className="text-[24px] font-normal tracking-[-0.02em] text-[#1f3f8e]">
              Search for membership
            </h1>
            <p className="mt-2 text-[15px] leading-6 text-[#4f638f]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s
              last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-7 flex flex-col items-center gap-[14px]">
            <InputGroup className="h-10 w-full max-w-[445px] rounded-[10px] border-[#cfd5df] bg-white shadow-none">
              <InputGroupAddon className="pl-3 text-[#6f7d96]">
                <InputGroupText>
                  <Search className="h-4 w-4" />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                aria-label="Search membership"
                defaultValue="Treviño"
                className="h-10 px-0 text-[14px] text-[#5d6c8a] placeholder:text-[#7b879a]"
              />
            </InputGroup>

            <Button className="h-9 rounded-md bg-[#1f3f8e] px-6 text-[14px] font-semibold text-white shadow-none hover:bg-[#1b387e]">
              Search Membership
            </Button>
          </div>

          <Empty className="mt-6 rounded-none border-0 bg-[#f4f4f6] px-6 py-[38px]">
            <EmptyHeader className="max-w-[510px] gap-4">
              <EmptyTitle className="text-[18px] font-semibold tracking-[-0.02em] text-[#1f3f8e]">
                No matching profiles found
              </EmptyTitle>
              <EmptyDescription className="text-[15px] leading-8 text-[#68768f]">
                We couldn&apos;t find any records with the information provided. Please verify the data or
                create a new membership.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="max-w-none gap-0">
              <Button
                variant="outline"
                className="h-[36px] rounded-md border-[#4f83e9] bg-white px-7 text-[14px] font-semibold text-[#3f78e2] shadow-none hover:bg-[#f7fbff] hover:text-[#3f78e2]"
              >
                Create new membership
              </Button>
            </EmptyContent>
          </Empty>
        </div>
      </section>
    </main>
  );
}
