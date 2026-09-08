import { Bell, CalendarDays, Check, Dumbbell, Hash, Search, ShieldCheck, Waves, WavesLadder } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const member = {
  name: "Sarah Johnson",
  memberNumber: "123456",
  startDate: "Jan 15, 2023",
  status: "Active",
  avatar: "/Frida.png",
  amenities: [
    { label: "Weights", icon: Dumbbell },
    { label: "Pool", icon: Waves },
    { label: "Recovery Room", icon: ShieldCheck },
    { label: "Basketball Court", icon: WavesLadder },
  ],
};

function DetailItem({
  icon: Icon,
  label,
  value,
  valueClassName,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span>{label}</span>
      </div>
      <div className={valueClassName ?? "text-sm font-semibold text-foreground"}>{value}</div>
    </div>
  );
}

function AmenityTile({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex min-h-28 flex-col items-center justify-center gap-3 rounded-lg border border-border bg-background px-3 py-4 text-center shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:color-mix(in_srgb,var(--success)_14%,white)] text-[var(--success)]">
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background px-4 py-4 text-foreground sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <header className="flex items-center justify-between border-b border-border bg-card px-5 py-3.5">
          <h1 className="text-lg font-bold">Gym Member Check-In</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Bell className="h-4 w-4" />
            <div className="flex items-center gap-2 text-xs font-medium text-foreground">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
                TB
              </div>
              <div className="hidden text-left sm:block">
                <div className="leading-none">Team Member</div>
                <div className="text-[10px] text-muted-foreground">staff</div>
              </div>
            </div>
          </div>
        </header>

        <div className="bg-[color:color-mix(in_srgb,var(--muted)_62%,white)] px-5 py-6">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <label htmlFor="member-number" className="text-xs font-medium text-muted-foreground">
              Enter Member Number
            </label>
            <Input
              id="member-number"
              defaultValue={member.memberNumber}
              className="h-10 max-w-[170px] border-border bg-card text-sm font-medium shadow-none"
            />
            <Button className="h-10 rounded-md bg-[var(--success)] px-5 text-xs font-semibold text-[var(--success-foreground)] hover:bg-[color:color-mix(in_srgb,var(--success)_88%,black)]">
              <Search className="h-3.5 w-3.5" />
              SEARCH
            </Button>
          </div>

          <Card className="mt-6 gap-0 overflow-hidden rounded-lg border-border py-0 shadow-md">
            <CardContent className="px-0">
              <section className="grid gap-0 lg:grid-cols-[1.45fr_0.95fr]">
                <div className="flex min-h-[205px] items-center gap-6 bg-[linear-gradient(135deg,#3ea754_0%,#2f9f50_45%,#2b8f49_100%)] px-5 py-7 text-white sm:px-7">
                  <Avatar className="h-24 w-24 rounded-md border-4 border-white/65 shadow-lg sm:h-28 sm:w-28">
                    <AvatarImage src={member.avatar} alt={member.name} className="object-cover" />
                    <AvatarFallback className="rounded-md bg-white/20 text-xl font-bold text-white">
                      SJ
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-3">
                    <div className="space-y-1 text-balance">
                      <p className="text-4xl font-bold leading-[1.05] tracking-tight">Welcome,</p>
                      <p className="text-4xl font-bold leading-[1.05] tracking-tight">Sarah Johnson!</p>
                    </div>
                  </div>
                </div>

                <div className="flex min-h-[205px] flex-col items-center justify-center bg-[linear-gradient(135deg,#45b758_0%,#34a853_100%)] px-6 py-7 text-center text-white">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/25 bg-white/10 shadow-inner">
                    <Check className="h-14 w-14 stroke-[3]" />
                  </div>
                  <p className="mt-5 text-lg font-semibold">Check-In Successful</p>
                </div>
              </section>

              <section className="grid gap-0 lg:grid-cols-[1fr_1.1fr]">
                <div className="border-r-0 border-border bg-card p-5 lg:border-r">
                  <h2 className="mb-5 text-lg font-bold">Member Details</h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <DetailItem icon={CalendarDays} label="Name" value={member.name} />
                    <DetailItem icon={Hash} label="Member Number" value={member.memberNumber} />
                    <DetailItem icon={CalendarDays} label="Member Since" value={member.startDate} />
                    <DetailItem
                      icon={ShieldCheck}
                      label="Status"
                      value={<Badge className="rounded-full bg-[color:color-mix(in_srgb,var(--success)_15%,white)] px-3 py-1 text-xs font-semibold text-[var(--success)] hover:bg-[color:color-mix(in_srgb,var(--success)_15%,white)]">{member.status}</Badge>}
                      valueClassName=""
                    />
                  </div>
                </div>

                <div className="bg-card p-5">
                  <h2 className="text-lg font-bold">Amenities Included</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This membership includes access to the following amenities:
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-4 xl:grid-cols-4">
                    {member.amenities.map((amenity) => (
                      <AmenityTile key={amenity.label} icon={amenity.icon} label={amenity.label} />
                    ))}
                  </div>
                </div>
              </section>
            </CardContent>

            <CardFooter className="justify-center gap-2 border-t border-[color:color-mix(in_srgb,var(--success)_24%,white)] bg-[color:color-mix(in_srgb,var(--success)_8%,white)] px-6 py-4 text-center text-sm font-medium text-[#3f4d3f]">
              <Check className="h-4 w-4 text-[var(--success)]" />
              <p>Enjoy your workout! Thank you for being a valued member.</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
