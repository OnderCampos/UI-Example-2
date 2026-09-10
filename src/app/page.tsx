"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  FolderKanban,
  Github,
  Menu,
  Monitor,
  Package,
  Search,
  Star,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type UserProfileOverviewState = "default";

type ProfileRepository = {
  name: string;
  description?: string;
  language: string;
  languageColor: string;
  forkedFrom?: string;
  visibility: "Public";
};

type ContributionLevel = 0 | 1 | 2 | 3 | 4;

type ContributionWeek = {
  month?: string;
  days: ContributionLevel[];
};

type UserProfileOverviewProps = {
  state?: UserProfileOverviewState;
  activeTab?: string;
  selectedYear?: string;
};

const profileRepositories: ProfileRepository[] = [
  {
    name: "open-interpreter",
    forkedFrom: "Forked from openinterpreter/openinterpreter",
    description: "A natural language interface for computers",
    language: "Python",
    languageColor: "#3572A5",
    visibility: "Public",
  },
  {
    name: "CountBoxingSofttek",
    language: "Python",
    languageColor: "#3572A5",
    visibility: "Public",
  },
  {
    name: "count_colors",
    language: "Python",
    languageColor: "#3572A5",
    visibility: "Public",
  },
  {
    name: "pushtest",
    language: "Python",
    languageColor: "#3572A5",
    visibility: "Public",
  },
  {
    name: "SAP-Cleaning-Frontend",
    language: "TypeScript",
    languageColor: "#3178C6",
    visibility: "Public",
  },
  {
    name: "FridaProductPlannerWebBackend",
    language: "Python",
    languageColor: "#3572A5",
    visibility: "Public",
  },
];

const contributionWeeks: ContributionWeek[] = [
  { month: "Sep", days: [0, 0, 0, 1, 0, 0, 0] },
  { month: "Oct", days: [1, 0, 2, 0, 1, 0, 0] },
  { month: "", days: [0, 0, 1, 0, 0, 0, 0] },
  { month: "Nov", days: [0, 0, 0, 0, 0, 1, 0] },
  { month: "", days: [0, 1, 0, 0, 1, 0, 0] },
  { month: "Dec", days: [0, 0, 0, 0, 0, 0, 0] },
  { month: "", days: [0, 1, 0, 0, 0, 0, 0] },
  { month: "Jan", days: [0, 0, 0, 1, 1, 0, 0] },
  { month: "", days: [1, 0, 0, 0, 1, 1, 0] },
  { month: "Feb", days: [2, 1, 0, 3, 1, 0, 1] },
  { month: "", days: [2, 0, 3, 0, 2, 1, 0] },
  { month: "Mar", days: [1, 0, 1, 1, 0, 0, 0] },
  { month: "", days: [2, 1, 2, 0, 1, 2, 0] },
  { month: "Apr", days: [1, 1, 0, 2, 0, 0, 1] },
  { month: "", days: [0, 2, 0, 0, 0, 0, 0] },
  { month: "May", days: [1, 0, 0, 0, 2, 1, 0] },
  { month: "", days: [2, 0, 0, 0, 0, 0, 0] },
  { month: "Jun", days: [0, 0, 0, 0, 0, 0, 0] },
  { month: "", days: [1, 0, 0, 0, 1, 1, 0] },
  { month: "Jul", days: [0, 0, 0, 0, 0, 0, 0] },
  { month: "", days: [0, 0, 0, 0, 0, 0, 0] },
  { month: "Aug", days: [1, 0, 0, 0, 2, 0, 1] },
  { month: "", days: [0, 3, 3, 0, 4, 3, 2] },
  { month: "", days: [2, 3, 0, 4, 2, 1, 0] },
];

const years = ["2026", "2025", "2024", "2023"];
const contributionColors: Record<ContributionLevel, string> = {
  0: "bg-[#263040]",
  1: "bg-[#0e4429]",
  2: "bg-[#006d32]",
  3: "bg-[#26a641]",
  4: "bg-[#39d353]",
};
const tabItems = [
  { value: "overview", label: "Overview", icon: BookOpen },
  { value: "repositories", label: "Repositories", icon: BookOpen, count: "16" },
  { value: "projects", label: "Projects", icon: FolderKanban },
  { value: "packages", label: "Packages", icon: Package },
  { value: "stars", label: "Stars", icon: Star },
] as const;

function HeaderIconButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={cn("size-8 rounded-md border border-border bg-transparent text-foreground hover:bg-card", className)}
    >
      {children}
    </Button>
  );
}

function ProfileTab({ value, label, count, icon: Icon }: { value: string; label: string; count?: string; icon: typeof BookOpen }) {
  return (
    <TabsTrigger
      value={value}
      className="h-11 flex-none rounded-none border-x-0 border-t-0 border-b-2 border-transparent bg-transparent px-3 text-sm font-medium text-foreground shadow-none data-[state=active]:border-[#f78166] data-[state=active]:bg-transparent data-[state=active]:text-foreground"
    >
      <Icon className="size-4 text-muted-foreground" />
      <span>{label}</span>
      {count ? <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[12px] leading-none text-foreground">{count}</span> : null}</n></TabsTrigger>
  );
}

function RepositoryCard({ repository }: { repository: ProfileRepository }) {
  return (
    <div className="rounded-lg border border-border bg-transparent p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-base font-semibold text-[#58a6ff]">{repository.name}</div>
          {repository.forkedFrom ? <div className="mt-1 text-[12px] text-muted-foreground">{repository.forkedFrom}</div> : null}
        </div>
        <span className="rounded-full border border-border px-2 py-0.5 text-[12px] text-muted-foreground">{repository.visibility}</span>
      </div>
      {repository.description ? <p className="mt-5 text-sm text-muted-foreground">{repository.description}</p> : <div className="mt-5 h-[21px]" />}
      <div className="mt-5 flex items-center gap-1.5 text-[12px] text-muted-foreground">
        <span className="size-3 rounded-full" style={{ backgroundColor: repository.languageColor }} />
        <span>{repository.language}</span>
      </div>
    </div>
  );
}

function ContributionHeatmap({ selectedYear, onYearChange }: { selectedYear: string; onYearChange: (value: string) => void }) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-[30px] font-normal leading-none">471 contributions in the last year</h2>
        <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
          <button className="hover:text-foreground">Contribution settings ▾</button>
          <Select value={selectedYear} onValueChange={onYearChange}>
            <SelectTrigger className="h-8 w-[104px] rounded-md border-[#2f81f7] bg-[#2f81f7] px-3 text-sm text-white hover:bg-[#1f6feb] focus-visible:border-[#2f81f7] focus-visible:ring-[#2f81f7]/30 [&_svg]:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border border-border p-4">
        <div className="flex gap-4">
          <div className="pt-7 text-[12px] text-muted-foreground">
            <div className="h-5">Mon</div>
            <div className="mt-2 h-5">Wed</div>
            <div className="mt-2 h-5">Fri</div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 grid grid-cols-24 gap-[4px] text-[12px] text-muted-foreground">
              {contributionWeeks.map((week, weekIndex) => (
                <div key={`label-${weekIndex}`} className="h-5 text-left">
                  {week.month}
                </div>
              ))}
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-[4px] overflow-hidden">
              {contributionWeeks.map((week, weekIndex) =>
                week.days.map((level, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={cn("size-[11px] rounded-[2px] border border-black/10", contributionColors[level])}
                  />
                ))
              )}
            </div>
            <div className="mt-3 flex items-center justify-between text-[12px] text-muted-foreground">
              <button className="hover:text-foreground">Learn how we count contributions</button>
              <div className="flex items-center gap-2">
                <span>Less</span>
                <div className="flex gap-[4px]">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <span key={level} className={cn("size-[10px] rounded-[2px]", contributionColors[level as ContributionLevel])} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardHeader({ search, onSearchChange }: { search: string; onSearchChange: (value: string) => void }) {
  return (
    <header className="border-b border-border bg-background">
      <div className="flex h-[88px] items-start justify-between px-4 pt-3">
        <div className="flex items-center gap-3">
          <HeaderIconButton>
            <Menu className="size-4" />
          </HeaderIconButton>
          <Github className="size-8" />
          <div className="text-xl font-semibold">OnderCampos</div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden h-8 w-[340px] items-center rounded-md border border-border bg-transparent px-3 lg:flex">
            <Search className="size-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Type / to search"
              className="h-7 border-0 bg-transparent px-2 text-sm shadow-none focus-visible:ring-0"
            />
          </div>
          <HeaderIconButton className="hidden lg:flex">
            <Building2 className="size-4" />
          </HeaderIconButton>
          <HeaderIconButton>
            <span className="text-base leading-none">＋</span>
          </HeaderIconButton>
          <HeaderIconButton>
            <span className="text-base leading-none">◌</span>
          </HeaderIconButton>
          <HeaderIconButton>
            <span className="text-sm leading-none">⌁</span>
          </HeaderIconButton>
          <HeaderIconButton>
            <Monitor className="size-4" />
          </HeaderIconButton>
          <Avatar className="size-8 border border-border">
            <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" alt="OnderCampos" />
            <AvatarFallback>OC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

function UserProfileOverview({ state = "default", activeTab = "overview", selectedYear: initialYear = "2026" }: UserProfileOverviewProps) {
  const [tab, setTab] = useState(activeTab);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [search, setSearch] = useState("");

  const filteredRepositories = useMemo(() => {
    const query = search.toLowerCase();
    return profileRepositories.filter((repository) => {
      return `${repository.name} ${repository.description ?? ""} ${repository.language}`.toLowerCase().includes(query);
    });
  }, [search]);

  return (
    <div className="min-h-screen bg-background text-foreground" data-state={state}>
      <DashboardHeader search={search} onSearchChange={setSearch} />

      <Tabs value={tab} onValueChange={setTab} className="gap-0">
        <div className="border-b border-border px-4">
          <TabsList className="h-auto gap-1 rounded-none bg-transparent p-0">
            {tabItems.map((item) => (
              <ProfileTab key={item.value} value={item.value} label={item.label} count={item.count} icon={item.icon} />
            ))}
          </TabsList>
        </div>
      </Tabs>

      <main className="mx-auto grid max-w-[1120px] grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[296px_minmax(0,1fr)]">
        <aside>
          <div className="sticky top-6">
            <div className="relative w-fit">
              <Avatar className="size-[260px] border border-border">
                <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80" alt="OnderCampos profile" />
                <AvatarFallback>OC</AvatarFallback>
              </Avatar>
              <button className="absolute right-3 bottom-7 flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-[var(--shadow-card)] hover:text-foreground">
                <span className="text-base">☺</span>
              </button>
            </div>

            <div className="mt-4">
              <h1 className="text-[40px] leading-[1.1] font-semibold">Onder Francisco Campos Garcia</h1>
              <div className="mt-1 text-[28px] font-light text-muted-foreground">OnderCampos</div>
            </div>

            <Button variant="outline" className="mt-4 h-8 w-full rounded-md border-border bg-secondary text-sm font-medium hover:bg-[#353c46]">
              Edit profile
            </Button>

            <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="size-4" />
              <span>
                <span className="text-foreground">2</span> followers · <span className="text-foreground">1</span> following
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-foreground">
              <BriefcaseBusiness className="size-4 text-muted-foreground" />
              <span>Softtek</span>
            </div>

            <div className="mt-5 border-t border-border pt-5">
              <h2 className="text-lg font-semibold">Achievements</h2>
              <div className="mt-3 flex items-center gap-2">
                {[
                  { label: "Heart", tone: "from-pink-300 to-orange-200", text: "💖" },
                  { label: "Mascot", tone: "from-yellow-200 to-orange-400", text: "🥸" },
                  { label: "Arctic", tone: "from-sky-300 to-blue-500", text: "🐻", count: "x2" },
                  { label: "Pair", tone: "from-green-300 to-lime-400", text: "🫛" },
                ].map((badge) => (
                  <div key={badge.label} className="relative">
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/60 bg-gradient-to-br text-[24px] shadow-[var(--shadow-card)]",
                        badge.tone
                      )}
                    >
                      <span>{badge.text}</span>
                    </div>
                    {badge.count ? (
                      <span className="absolute right-[-6px] bottom-[-4px] rounded-full bg-[#f2cc60] px-1.5 py-0.5 text-[11px] font-semibold text-black">
                        {badge.count}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-border pt-5">
              <h2 className="text-lg font-semibold">Organizations</h2>
            </div>
          </div>
        </aside>

        <section>
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-normal">Popular repositories</h2>
            <button className="text-sm text-[#58a6ff] hover:underline">Customize your pins</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredRepositories.map((repository) => (
              <RepositoryCard key={repository.name} repository={repository} />
            ))}
          </div>

          <ContributionHeatmap selectedYear={selectedYear} onYearChange={setSelectedYear} />

          <section className="mt-8">
            <h2 className="text-[32px] font-normal">Contribution activity</h2>
            <div className="mt-5 flex items-center gap-4 text-sm text-foreground">
              <span className="font-semibold">September 2026</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default function HomePage() {
  return <UserProfileOverview state="default" />;
}
