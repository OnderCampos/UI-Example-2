import {
  AlertTriangle,
  Bell,
  CircleDollarSign,
  CreditCard,
  Search,
  UserRound,
  WalletCards,
  Waves,
  WavesLadder,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const member = {
  name: "Michael Davis",
  memberNumber: "997654",
  lookupNumber: "987654",
  memberSince: "Mar 10, 2023",
  status: "Past Due",
  avatar: "/Frida.png",
  bannerTitle: "Invalid\nPayment Method",
  amenities: [
    { label: "Weights", icon: WalletCards },
    { label: "Basketball Court", icon: WavesLadder },
    { label: "Sauna", icon: Waves },
  ],
};

function DetailItem({
  label,
  value,
  icon: Icon,
  valueClassName,
}: {
  label: string;
  value: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  valueClassName?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.02em] text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span>{label}</span>
      </div>
      <div className={valueClassName ?? "text-sm font-semibold text-foreground"}>{value}</div>
    </div>
  );
}

function AmenityTile({
  label,
  icon: Icon,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-md border border-[color:color-mix(in_srgb,var(--warning)_20%,var(--border))] bg-[color:color-mix(in_srgb,var(--warning)_14%,white)] px-3 py-3 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[color:color-mix(in_srgb,var(--warning)_28%,white)] text-[color:color-mix(in_srgb,var(--text,#0f172a)_88%,var(--warning))]">
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-xs font-semibold text-foreground">{label}</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background px-4 py-4 text-foreground sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 sm:px-5">
          <h1 className="text-base font-bold sm:text-lg">Gym Member Check-In</h1>
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

        <div className="bg-[color:color-mix(in_srgb,var(--muted)_60%,white)] px-4 py-5 sm:px-5 sm:py-6">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <label htmlFor="member-number" className="text-xs font-medium text-muted-foreground">
              Enter Member Number:
            </label>
            <Input
              id="member-number"
              defaultValue={member.lookupNumber}
              className="h-9 max-w-[160px] rounded-sm border-border bg-card text-sm shadow-none"
            />
            <Button className="h-9 rounded-sm bg-[color:color-mix(in_srgb,var(--success)_78%,black)] px-5 text-[11px] font-bold tracking-[0.04em] text-white hover:bg-[color:color-mix(in_srgb,var(--success)_68%,black)]">
              <Search className="h-3.5 w-3.5" />
              SEARCH
            </Button>
          </div>

          <Card className="mt-5 gap-0 overflow-hidden rounded-md border-border py-0 shadow-sm">
            <CardContent className="px-0">
              <section className="grid gap-0 lg:grid-cols-[1.45fr_0.9fr]">
                <div className="flex min-h-[170px] items-center gap-5 bg-[linear-gradient(135deg,#f7c929_0%,#f8bb1d_48%,#f3b016_100%)] px-4 py-6 sm:px-5">
                  <Avatar className="h-24 w-24 rounded-sm border-4 border-white/65 shadow-lg">
                    <AvatarImage src={member.avatar} alt={member.name} className="object-cover" />
                    <AvatarFallback className="rounded-sm bg-white/20 text-xl font-bold text-white">
                      MD
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-2">
                    <h2 className="whitespace-pre-line text-4xl font-bold leading-[0.95] tracking-tight text-foreground">
                      {member.bannerTitle}
                    </h2>
                  </div>
                </div>

                <div className="flex min-h-[170px] flex-col items-center justify-center bg-[linear-gradient(135deg,#f7c929_0%,#efb118_100%)] px-6 py-6 text-center text-foreground">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/40 bg-white/10">
                    <X className="h-12 w-12 stroke-[3] text-white" />
                  </div>
                  <p className="mt-4 text-sm font-medium">Check-In Successful</p>
                </div>
              </section>

              <section className="grid gap-0 lg:grid-cols-[0.95fr_1.4fr]">
                <div className="border-r-0 border-border bg-card p-4 lg:border-r">
                  <h3 className="mb-4 flex items-center gap-2 text-base font-bold">
                    <UserRound className="h-4 w-4 text-muted-foreground" />
                    Member Details
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <DetailItem icon={UserRound} label="Name" value={member.name} />
                    <DetailItem icon={CircleDollarSign} label="Member Number" value={member.memberNumber} />
                    <DetailItem icon={CreditCard} label="Member Since" value={member.memberSince} />
                    <DetailItem
                      icon={AlertTriangle}
                      label="Status"
                      value={
                        <Badge className="rounded-full border-transparent bg-[color:color-mix(in_srgb,var(--warning)_18%,white)] px-3 py-1 text-xs font-semibold text-[color:color-mix(in_srgb,var(--error)_65%,var(--warning))] hover:bg-[color:color-mix(in_srgb,var(--warning)_18%,white)]">
                          {member.status}
                        </Badge>
                      }
                      valueClassName=""
                    />
                  </div>
                </div>

                <div className="bg-card p-4">
                  <h3 className="flex items-center gap-2 text-base font-bold">
                    <X className="h-4 w-4 text-muted-foreground" />
                    Amenities Included
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    This membership includes access to the following amenities:
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {member.amenities.map((amenity) => (
                      <AmenityTile key={amenity.label} icon={amenity.icon} label={amenity.label} />
                    ))}
                  </div>
                </div>
              </section>
            </CardContent>

            <CardFooter className="flex-col justify-center gap-1 border-t border-[color:color-mix(in_srgb,var(--warning)_22%,white)] bg-[linear-gradient(180deg,#f7c929_0%,#f3b016_100%)] px-5 py-3 text-center">
              <div className="flex items-center gap-2 text-base font-bold text-foreground">
                <AlertTriangle className="h-4 w-4" />
                <span>Please Update Payment Info</span>
              </div>
              <p className="text-xs text-[color:color-mix(in_srgb,var(--foreground)_78%,white)]">
                To continue enjoying your membership, please update your payment information at your earliest convenience.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
