import {
  Bell,
  CheckSquare2,
  Dumbbell,
  Lock,
  Search,
  UserRound,
  Waves,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const member = {
  name: "Lisa Roberts",
  memberNumber: "654321",
  lookupNumber: "987654",
  memberSince: "Oct 1, 2022",
  status: "Cancelled",
  bannerTitle: "Membership\nCancelled",
  amenities: [
    { label: "Weights", icon: Dumbbell },
    { label: "Basketball Court", icon: CheckSquare2 },
    { label: "Sauna", icon: Waves },
  ],
};

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[88px_1fr] items-start gap-x-4 gap-y-1 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <div className="font-medium text-foreground">{value}</div>
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
    <div className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-[var(--radius-sm)] border border-[color:color-mix(in_srgb,var(--error)_10%,var(--border))] bg-[color:color-mix(in_srgb,var(--error)_16%,white)] px-3 py-3 text-center">
      <Icon className="h-7 w-7 text-[color:color-mix(in_srgb,var(--foreground)_70%,var(--error))]" />
      <span className="text-xs font-medium text-foreground">{label}</span>
    </div>
  );
}

function MemberSilhouette() {
  return (
    <div className="relative h-24 w-28 rounded-[var(--radius-sm)] border border-white/60 bg-[linear-gradient(180deg,#6b7280_0%,#52525b_100%)] shadow-sm">
      <div className="absolute left-1/2 top-4 h-10 w-10 -translate-x-1/2 rounded-full bg-[#c9c9cf]" />
      <div className="absolute left-1/2 top-12 h-7 w-14 -translate-x-1/2 rounded-full bg-[#c9c9cf]" />
      <div className="absolute bottom-3 left-1/2 h-9 w-20 -translate-x-1/2 rounded-t-full bg-[#d4d4d8]" />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background px-4 py-4 text-foreground sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[var(--radius-md)] border border-border bg-card shadow-sm">
        <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 sm:px-5">
          <h1 className="text-base font-bold sm:text-lg">Gym Member Check-In</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Bell className="h-4 w-4" />
            <div className="flex items-center gap-2 text-xs text-foreground">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                TB
              </div>
              <div className="hidden leading-tight sm:block">
                <div className="font-medium">Team Member</div>
                <div className="text-[10px] text-muted-foreground">oom</div>
              </div>
            </div>
          </div>
        </header>

        <div className="bg-[color:color-mix(in_srgb,var(--muted)_55%,white)] px-4 py-5 sm:px-5 sm:py-6">
          <div className="mx-auto flex max-w-xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <label htmlFor="member-number" className="text-xs text-foreground">
              Enter Member Number:
            </label>
            <Input
              id="member-number"
              defaultValue={member.lookupNumber}
              className="h-8 max-w-[172px] rounded-[4px] border-border bg-card px-2 text-xs shadow-none focus-visible:ring-0"
            />
            <Button className="h-8 rounded-[4px] bg-[color:color-mix(in_srgb,var(--success)_72%,black)] px-5 text-[11px] font-bold tracking-[0.04em] text-white hover:bg-[color:color-mix(in_srgb,var(--success)_62%,black)]">
              SEARCH
            </Button>
          </div>

          <Card className="mt-5 gap-0 overflow-hidden rounded-[4px] border-border py-0 shadow-sm">
            <CardContent className="px-0">
              <section className="grid gap-0 md:grid-cols-[1.5fr_0.75fr]">
                <div className="flex min-h-[168px] items-center gap-5 bg-[linear-gradient(180deg,#ff1730_0%,#ef161f_100%)] px-3 py-6 text-white sm:px-5">
                  <MemberSilhouette />
                  <div>
                    <h2 className="whitespace-pre-line text-[clamp(2.25rem,6vw,3.25rem)] font-bold leading-[0.95] tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]">
                      {member.bannerTitle}
                    </h2>
                  </div>
                </div>

                <div className="flex min-h-[168px] flex-col items-center justify-center bg-[linear-gradient(180deg,#ff1730_0%,#ef161f_100%)] px-6 py-6 text-center text-white">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-[5px] border-white/75">
                    <X className="h-12 w-12 stroke-[3] text-white" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-white/95">Check-In Successful</p>
                </div>
              </section>

              <section className="grid gap-0 md:grid-cols-[0.9fr_1.2fr]">
                <div className="border-border bg-card p-4 md:border-r md:p-5">
                  <h3 className="mb-4 flex items-center gap-2 text-base font-bold">
                    <UserRound className="h-4 w-4 text-foreground" />
                    Member Details
                  </h3>
                  <div className="space-y-3.5">
                    <DetailItem label="Name" value={member.name} />
                    <DetailItem label="Member Number" value={member.memberNumber} />
                    <DetailItem label="Member Since" value={member.memberSince} />
                    <DetailItem
                      label="Status"
                      value={
                        <Badge className="rounded-[4px] border-transparent bg-error px-2 py-0.5 text-[11px] font-bold text-white hover:bg-error">
                          {member.status}
                        </Badge>
                      }
                    />
                  </div>
                </div>

                <div className="bg-card p-4 md:p-5">
                  <h3 className="flex items-center gap-2 text-base font-bold">
                    <X className="h-4 w-4 text-foreground" />
                    Amenities Included
                  </h3>
                  <p className="mt-1 text-sm text-foreground/80">
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

            <CardFooter className="flex-col justify-center gap-1 border-t border-[color:color-mix(in_srgb,var(--error)_18%,white)] bg-[linear-gradient(180deg,#ff1730_0%,#ef161f_100%)] px-5 py-3 text-center text-white">
              <div className="flex items-center gap-2 text-[1.65rem] font-bold leading-none">
                <Lock className="h-5 w-5" />
                <span>Access Denied</span>
              </div>
              <p className="text-xs text-white/90">
                For assistance, please visit the front desk.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
