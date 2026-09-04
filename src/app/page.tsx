import Image from "next/image";
import { ChevronDown, CircleAlert, CreditCard, MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
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
        "flex min-h-[124px] flex-row items-center gap-6 rounded-lg border border-[#d8dde8] px-8 py-8 shadow-none",
        highlighted ? "bg-[#f2f3f5]" : "bg-white",
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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#233f8c]">
      <header className="w-full">
        <div className="bg-[#16295f] text-white">
          <div className="mx-auto flex h-[60px] max-w-[1120px] items-center justify-between px-6 lg:px-8">
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
                icon={<div className="h-4 w-4 rounded-full bg-white/80 ring-1 ring-white/50" />}
                label="Guatemala"
              />
              <HeaderSelection
                icon={<div className="flex h-4 w-4 items-center justify-center rounded-full border border-white/70 text-[8px] font-bold">◎</div>}
                label="English"
              />
            </div>
          </div>
        </div>
        <div className="h-[39px] bg-[#1f47b8]" />
      </header>

      <section className="mx-auto max-w-[1120px] px-6 pb-24 pt-6 lg:px-8">
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

        <Separator className="my-6 bg-[#d6dae2]" />

        <div className="px-6 pt-12">
          <div className="max-w-[820px]">
            <h1 className="text-[25px] font-medium tracking-[-0.01em] text-[#233f8c]">
              Search for membership
            </h1>
            <p className="mt-3 text-[14px] leading-6 text-[#37508f]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="relative w-full max-w-[445px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6d7890]" />
              <Input
                type="text"
                defaultValue="Treviño"
                className="h-10 rounded-[10px] border-[#ced5e1] bg-white pl-11 text-[14px] text-[#233f8c] shadow-none focus-visible:border-[#ced5e1] focus-visible:ring-0"
              />
            </div>

            <Button className="h-9 rounded-md bg-[#233f8c] px-8 text-[14px] font-semibold text-white hover:bg-[#233f8c]/95">
              Search Membership
            </Button>
          </div>

          <Empty className="mt-[22px] rounded-none border-0 bg-[#f3f4f7] px-6 py-12 md:px-12 md:py-16">
            <EmptyHeader className="max-w-[620px] gap-4">
              <EmptyTitle className="text-[24px] font-semibold text-[#233f8c]">
                No matching profiles found
              </EmptyTitle>
              <EmptyDescription className="text-[16px] leading-8 text-[#5d6885]">
                We couldn&apos;t find any records with the information provided. Please verify the data or create a new membership.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="mt-2">
              <Button
                variant="outline"
                className="h-10 rounded-md border-[#5d8ff1] bg-white px-11 text-[14px] font-semibold text-[#3180f9] hover:bg-white hover:text-[#3180f9]"
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
