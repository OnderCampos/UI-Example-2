import { MembershipActionCard } from "@/components/membership-action-card";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Globe, IdCard, MapPin, Search } from "lucide-react";

const quickActions = [
  {
    title: "New Membership",
    icon: IdCard,
    subtle: true,
  },
  {
    title: "Pending process",
    icon: AlertTriangle,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#243b7b]">
      <header className="bg-[#162b69] text-white">
        <div className="mx-auto flex h-[58px] max-w-[1160px] items-center justify-between px-8">
          <div className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em]">
            <span className="relative inline-flex size-5 items-center justify-center">
              <span className="absolute text-[20px] leading-none text-[#f26722]">✶</span>
            </span>
            <span className="text-[17px] font-semibold">PriceSmart</span>
          </div>
          <div className="flex items-center gap-8 text-sm font-medium text-white/95">
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>Miraflores</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base">🌐</span>
              <span>Guatemala</span>
              <span className="text-xs">⌄</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="size-4" />
              <span>English</span>
              <span className="text-xs">⌄</span>
            </div>
          </div>
        </div>
        <div className="h-[40px] bg-[#1f45b8]" />
      </header>

      <section className="mx-auto max-w-[1160px] px-8 pt-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {quickActions.map((action) => (
            <MembershipActionCard key={action.title} {...action} />
          ))}
        </div>

        <Separator className="my-8 bg-[#d9dde6]" />

        <div className="max-w-[930px] px-6 pt-12">
          <h1 className="text-[22px] font-medium tracking-[0.01em] text-[#233a7a]">
            Search for membership
          </h1>
          <p className="mt-3 max-w-[860px] text-[15px] leading-6 text-[#435a92]">
            Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
          </p>

          <div className="mt-7 flex flex-col items-center">
            <InputGroup className="h-10 max-w-[445px] border-[#cfd5e3] bg-white shadow-none">
              <InputGroupAddon className="pl-3 pr-2 text-[#7d879e]">
                <Search className="size-4" />
              </InputGroupAddon>
              <InputGroupInput
                aria-label="Search membership"
                placeholder="Search by name, mobile phone, email or membership number"
                className="h-10 px-0 text-[15px] text-[#334b86] placeholder:text-[#7d879e]"
              />
            </InputGroup>

            <Button
              type="button"
              variant="secondary"
              className="mt-5 h-9 rounded-md bg-[#eceef2] px-6 text-[15px] font-semibold text-[#97a0b2] shadow-none hover:bg-[#e5e8ee]"
            >
              Search Membership
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
