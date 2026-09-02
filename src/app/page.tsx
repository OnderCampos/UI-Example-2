import { CreditCard, Globe, MapPin, Search, ShieldAlert, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  muted = false,
}: {
  icon: React.ReactNode;
  title: string;
  muted?: boolean;
}) {
  return (
    <Card
      className={[
        "flex min-h-[124px] flex-row items-center gap-5 rounded-lg border px-8 py-8 shadow-none",
        muted ? "border-transparent bg-[#f1f1f4]" : "border-[#d7dbe5] bg-white",
      ].join(" ")}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#2755d8] text-[#2755d8]">
        {icon}
      </div>
      <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#1f3f8e]">
        {title}
      </h2>
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
        <div className="h-[38px] bg-[#0f46d7]" />
      </header>

      <section className="mx-auto max-w-[1080px] px-[60px] pb-24 pt-6">
        <div className="grid gap-6 md:grid-cols-2">
          <MembershipActionCard
            muted
            title="New Membership"
            icon={<CreditCard className="h-6 w-6 stroke-[1.75]" />}
          />
          <MembershipActionCard
            title="Pending process"
            icon={<ShieldAlert className="h-6 w-6 stroke-[1.75]" />}
          />
        </div>

        <Separator className="my-6 bg-[#d8dbe4]" />

        <div className="px-6 pt-14">
          <div className="max-w-[840px]">
            <h1 className="text-[24px] font-medium tracking-[-0.02em] text-[#1f3f8e]">
              Search for membership
            </h1>
            <p className="mt-2 text-[15px] leading-6 text-[#4f638f]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s
              last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-7 flex flex-col items-center gap-5">
            <InputGroup className="h-10 w-full max-w-[444px] rounded-[10px] border-[#cfd5df] bg-white shadow-none">
              <InputGroupAddon className="pl-3 text-[#6f7d96]">
                <InputGroupText>
                  <Search className="h-4 w-4" />
                </InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                aria-label="Search membership"
                placeholder="Search by name, mobile phone, email or membership number"
                className="h-10 px-0 text-[14px] text-[#394867] placeholder:text-[#7b879a]"
              />
            </InputGroup>

            <Button
              className="h-9 rounded-md bg-[#eef1f6] px-6 text-[14px] font-semibold text-[#8c98ad] shadow-none hover:bg-[#e7ebf2]"
              disabled
            >
              Search Membership
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
