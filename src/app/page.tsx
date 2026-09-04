import { MembershipActionCard } from "@/components/membership-action-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f7f9] text-[#243b7b]">
      <header className="bg-[#162b69] text-white">
        <div className="mx-auto flex h-[60px] max-w-[1120px] items-center justify-between px-10">
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
        <div className="h-[39px] bg-[#1d46bd]" />
      </header>

      <section className="mx-auto max-w-[1120px] px-[60px] pt-[23px] pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {quickActions.map((action) => (
            <MembershipActionCard key={action.title} {...action} />
          ))}
        </div>

        <Separator className="my-[22px] bg-[#d7dce4]" />

        <div className="px-6 pt-[34px] text-[#253f82]">
          <h1 className="text-[24px] font-normal tracking-[0.01em]">
            Search for membership
          </h1>
          <p className="mt-2 max-w-[900px] text-[15px] leading-6 text-[#41598f]">
            Search for an existing profile before creating a new membership. Enter the customer&apos;s last name, phone number, email, or membership ID.
          </p>

          <div className="mt-7 flex flex-col items-center">
            <InputGroup className="h-[42px] w-full max-w-[445px] rounded-[10px] border-[#cfd4df] bg-white shadow-none">
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
              className="mt-[14px] h-[36px] rounded-md bg-[#27438f] px-6 text-[14px] font-semibold text-white shadow-none hover:bg-[#233f88]"
            >
              Search Membership
            </Button>
          </div>

          <Card className="mx-auto mt-6 w-full max-w-[914px] rounded-none border-0 bg-[#f9f9fb] py-0 shadow-none">
            <CardContent className="flex flex-col items-center px-8 py-[43px] text-center">
              <h2 className="text-[21px] font-semibold text-[#243b7b]">
                No matching profiles found
              </h2>
              <p className="mt-4 max-w-[520px] text-[15px] leading-8 text-[#5f6f8d]">
                We couldn&apos;t find any records with the information provided. Please verify the data or create a new membership.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-5 h-[36px] rounded-md border-[#4a83f1] bg-white px-6 text-[14px] font-semibold text-[#3b82f6] shadow-none hover:bg-[#f5f9ff]"
              >
                Create new membership
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
