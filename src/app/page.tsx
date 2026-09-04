import Image from "next/image";
import { CircleAlert, CreditCard, Globe, MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
        "flex min-h-[124px] flex-row items-center gap-6 rounded-lg border border-[#d8dde8] px-8 py-8 shadow-none",
        muted ? "bg-[#f2f3f5]" : "bg-white",
      ].join(" ")}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#2f5edb] text-[#2f5edb]">
        {icon}
      </div>
      <span className="text-[19px] font-semibold tracking-[-0.01em] text-[#233f8c]">{title}</span>
    </Card>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#233f8c]">
      <header className="w-full">
        <div className="bg-[#16295f] text-white">
          <div className="mx-auto flex h-[60px] max-w-[1120px] items-center justify-between px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Image
                src="/Frida.png"
                alt="PriceSmart"
                width={155}
                height={36}
                className="h-auto w-[128px] object-contain brightness-0 invert"
                priority
              />
            </div>

            <div className="flex items-center gap-7 text-sm font-medium text-white/95">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Miraflores</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Guatemala</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>English</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[38px] bg-[#1f47b8]" />
      </header>

      <section className="mx-auto max-w-[1120px] px-6 pb-24 pt-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <MembershipActionCard
            icon={<CreditCard className="h-7 w-7 stroke-[1.8]" />}
            title="New Membership"
            muted
          />
          <MembershipActionCard
            icon={<CircleAlert className="h-7 w-7 stroke-[1.8]" />}
            title="Pending process"
          />
        </div>

        <Separator className="my-6 bg-[#d6dae2]" />

        <div className="px-6 pt-12 md:px-6 lg:px-6">
          <div className="max-w-[760px]">
            <h1 className="text-[24px] font-medium tracking-[-0.01em] text-[#233f8c]">
              Search for membership
            </h1>
            <p className="mt-3 text-[14px] leading-6 text-[#37508f]">
              Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-5">
            <div className="relative w-full max-w-[445px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6d7890]" />
              <Input
                type="text"
                placeholder="Search by name, mobile phone, email or membership number"
                className="h-10 rounded-[10px] border-[#ced5e1] bg-white pl-11 text-[14px] text-[#233f8c] shadow-none placeholder:text-[#7b859b] focus-visible:ring-0"
              />
            </div>

            <Button
              variant="secondary"
              className="h-10 rounded-md bg-[#eceef2] px-10 text-[14px] font-semibold text-[#9ca6bb] hover:bg-[#eceef2]"
            >
              Search Membership
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
