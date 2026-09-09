"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  Building2,
  Grid3X3,
  Menu,
  Package,
  Plus,
  Search,
  Smile,
  Star,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type ProfileTab = "overview" | "repositories" | "projects" | "packages";

type RepositoryItem = {
  id: string;
  name: string;
  description?: string;
  language: string;
  languageColor: string;
  forkedFrom?: string;
  visibility?: "Public";
};

type AchievementItem = {
  id: string;
  emoji: string;
  accent: string;
  count?: number;
};

type ContributionCell = {
  id: string;
  level: 0 | 1 | 2 | 3 | 4;
};

type ContributionMonth = {
  label: string;
  startWeek: number;
};

type ContributionYear = {
  year: string;
  total: number;
  months: ContributionMonth[];
  weeks: ContributionCell[][];
};

type UserProfileOverviewViewProps = {
  state?: "default";
  selectedTab?: ProfileTab;
  selectedYear?: string;
  onSelectedYearChange?: (year: string) => void;
  searchPlaceholder?: string;
  profile?: {
    username: string;
    fullName: string;
    avatarSrc: string;
    company: string;
    followers: number;
    following: number;
    repositoryCount: number;
  };
  repositories?: RepositoryItem[];
  achievements?: AchievementItem[];
  years?: ContributionYear[];
};

const defaultProfile = {
  username: "OnderCampos",
  fullName: "Onder Francisco Campos Garcia",
  avatarSrc: "/Frida.png",
  company: "Softtek",
  followers: 2,
  following: 1,
  repositoryCount: 16,
};

const defaultRepositories: RepositoryItem[] = [
  {
    id: "open-interpreter",
    name: "open-interpreter",
    forkedFrom: "openinterpreter/openinterpreter",
    description: "A natural language interface for computers",
    language: "Python",
    languageColor: "#388bfd",
    visibility: "Public",
  },
  {
    id: "count-boxing-softtek",
    name: "CountBoxingSofttek",
    language: "Python",
    languageColor: "#388bfd",
    visibility: "Public",
  },
  {
    id: "count-colors",
    name: "count_colors",
    language: "Python",
    languageColor: "#388bfd",
    visibility: "Public",
  },
  {
    id: "pushtest",
    name: "pushtest",
    language: "Python",
    languageColor: "#388bfd",
    visibility: "Public",
  },
  {
    id: "sap-cleaning-frontend",
    name: "SAP-Cleaning-Frontend",
    language: "TypeScript",
    languageColor: "#2f81f7",
    visibility: "Public",
  },
  {
    id: "frida-product-planner",
    name: "FridaProductPlannerWebBackend",
    language: "Python",
    languageColor: "#388bfd",
    visibility: "Public",
  },
];

const defaultAchievements: AchievementItem[] = [
  { id: "heart", emoji: "💖", accent: "#f778ba" },
  { id: "yolo", emoji: "🫠", accent: "#d29922" },
  { id: "arctic", emoji: "🥶", accent: "#58a6ff", count: 2 },
  { id: "pair", emoji: "🫛", accent: "#7ee787" },
];

const contributionMonths: ContributionMonth[] = [
  { label: "Sep", startWeek: 0 },
  { label: "Oct", startWeek: 4 },
  { label: "Nov", startWeek: 8 },
  { label: "Dec", startWeek: 12 },
  { label: "Jan", startWeek: 17 },
  { label: "Feb", startWeek: 21 },
  { label: "Mar", startWeek: 25 },
  { label: "Apr", startWeek: 30 },
  { label: "May", startWeek: 34 },
  { label: "Jun", startWeek: 39 },
  { label: "Jul", startWeek: 43 },
  { label: "Aug", startWeek: 48 },
];

const contributionPattern = [
  [0, 0, 0, 1, 1, 0, 0],
  [0, 1, 1, 0, 0, 0, 0],
  [0, 2, 0, 0, 1, 0, 0],
  [0, 0, 0, 2, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 2, 0, 0],
  [1, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 2, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 2],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 2, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 0, 2, 0, 1, 0, 0],
  [1, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 2, 0, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 2, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 2, 2],
  [0, 0, 0, 2, 3, 4, 3],
  [0, 0, 0, 3, 4, 2, 1],
  [0, 0, 0, 2, 3, 1, 0],
  [0, 0, 0, 1, 4, 2, 0],
  [0, 0, 0, 0, 3, 1, 0],
];

const defaultYears: ContributionYear[] = [
  {
    year: "2026",
    total: 471,
    months: contributionMonths,
    weeks: contributionPattern.map((week, weekIndex) =>
      week.map((level, dayIndex) => ({
        id: `${weekIndex}-${dayIndex}`,
        level: level as ContributionCell["level"],
      }))
    ),
  },
  { year: "2025", total: 0, months: contributionMonths, weeks: contributionPattern.map((week, weekIndex) => week.map((_, dayIndex) => ({ id: `2025-${weekIndex}-${dayIndex}`, level: 0 as const }))) },
  { year: "2024", total: 0, months: contributionMonths, weeks: contributionPattern.map((week, weekIndex) => week.map((_, dayIndex) => ({ id: `2024-${weekIndex}-${dayIndex}`, level: 0 as const }))) },
  { year: "2023", total: 0, months: contributionMonths, weeks: contributionPattern.map((week, weekIndex) => week.map((_, dayIndex) => ({ id: `2023-${weekIndex}-${dayIndex}`, level: 0 as const }))) },
];

const contributionColorByLevel = [
  "#212830",
  "#143d1f",
  "#1f6f31",
  "#2ea043",
  "#56d364",
];

function GithubProfileHeader({
  username,
  searchValue,
  onSearchChange,
}: {
  username: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <header className="border-b border-border bg-[linear-gradient(180deg,#0d1117_0%,#101720_100%)]">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon-sm" className="border-border bg-transparent text-muted-foreground hover:bg-card hover:text-foreground">
            <Menu className="size-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-foreground text-background">
              <span className="text-lg font-bold">G</span>
            </div>
            <span className="text-sm font-semibold">{username}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden lg:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Type / to search"
              className="h-9 w-[300px] rounded-md border-border bg-background pl-9 text-sm"
            />
          </div>
          {[BookOpen, Bell, Plus, Grid3X3, Package].map((Icon, index) => (
            <Button
              key={`${index}-${Icon.displayName ?? "icon"}`}
              variant="outline"
              size="icon-sm"
              className="border-border bg-transparent text-muted-foreground hover:bg-card hover:text-foreground"
            >
              <Icon className="size-4" />
            </Button>
          ))}
          <Avatar className="size-8 border border-border">
            <AvatarImage src="/Frida.png" alt={username} />
            <AvatarFallback>OC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

function RepositoryCard({ repository }: { repository: RepositoryItem }) {
  return (
    <Card className="gap-0 rounded-lg border-border bg-background p-4 shadow-none">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold text-[#2f81f7]">{repository.name}</h3>
          {repository.forkedFrom ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Forked from <span className="border-b border-muted-foreground/40">{repository.forkedFrom}</span>
            </p>
          ) : null}
        </div>
        {repository.visibility ? (
          <Badge
            variant="outline"
            className="rounded-full border-border bg-transparent px-2 py-0.5 text-[11px] text-muted-foreground"
          >
            {repository.visibility}
          </Badge>
        ) : null}
      </div>
      {repository.description ? (
        <p className="mt-4 min-h-10 text-[13px] leading-5 text-muted-foreground">{repository.description}</p>
      ) : (
        <div className="mt-4 min-h-10" />
      )}
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="size-3 rounded-full" style={{ backgroundColor: repository.languageColor }} />
        <span>{repository.language}</span>
      </div>
    </Card>
  );
}

function AchievementsRow({ items }: { items: AchievementItem[] }) {
  return (
    <div className="flex items-center gap-2">
      {items.map((item) => (
        <div key={item.id} className="relative">
          <div
            className="flex size-12 items-center justify-center rounded-full border border-white/20 text-[24px] shadow-[var(--shadow-card)]"
            style={{ background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${item.accent} 65%, ${item.accent} 100%)` }}
          >
            <span className="translate-y-[1px]">{item.emoji}</span>
          </div>
          {item.count ? (
            <span className="absolute -bottom-1 -right-1 rounded-full border border-background bg-[#d29922] px-1.5 text-[10px] font-semibold text-background">
              x{item.count}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ContributionsHeatmap({
  year,
  selectedYear,
  onSelectedYearChange,
}: {
  year: ContributionYear;
  selectedYear: string;
  onSelectedYearChange: (year: string) => void;
}) {
  const weekdayLabels = ["Mon", "Wed", "Fri"];
  const allYears = ["2026", "2025", "2024", "2023"];

  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-[28px] font-normal text-foreground">
          {year.total} contributions in the last year
        </h2>
        <div className="hidden items-center gap-3 text-xs text-muted-foreground lg:flex">
          <button className="hover:text-foreground">Contribution settings ▾</button>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_112px]">
        <Card className="gap-0 rounded-lg border-border bg-background p-4 shadow-none">
          <div className="grid grid-cols-[32px_minmax(0,1fr)] gap-2">
            <div />
            <div className="grid grid-cols-12 text-xs text-muted-foreground">
              {year.months.map((month) => (
                <span
                  key={month.label}
                  className="justify-self-start"
                  style={{ gridColumn: `${month.startWeek + 1} / span 1` }}
                >
                  {month.label}
                </span>
              ))}
            </div>
            <div className="space-y-[18px] pt-3 text-xs text-muted-foreground">
              {weekdayLabels.map((label) => (
                <div key={label}>{label}</div>
              ))}
            </div>
            <div className="overflow-hidden pt-1">
              <div className="grid grid-flow-col grid-rows-7 gap-[3px] justify-start">
                {year.weeks.flat().map((cell) => (
                  <div
                    key={cell.id}
                    className="size-[11px] rounded-[2px] border border-black/10"
                    style={{ backgroundColor: contributionColorByLevel[cell.level] }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-4 text-xs text-muted-foreground">
            <button className="hover:text-foreground">Learn how we count contributions</button>
            <div className="flex items-center gap-2">
              <span>Less</span>
              <div className="flex items-center gap-[3px]">
                {contributionColorByLevel.map((color, index) => (
                  <span
                    key={color}
                    className={cn("size-[10px] rounded-[2px]", index === 0 && "border border-black/10")}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </Card>
        <div className="space-y-2">
          {allYears.map((yearOption) => {
            const isSelected = yearOption === selectedYear;
            return (
              <button
                key={yearOption}
                onClick={() => onSelectedYearChange(yearOption)}
                className={cn(
                  "flex h-8 w-full items-center rounded-md px-3 text-left text-sm transition-colors",
                  isSelected
                    ? "bg-[#1f6feb] text-white"
                    : "text-muted-foreground hover:bg-card hover:text-foreground"
                )}
              >
                {yearOption}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function UserProfileOverviewView({
  state = "default",
  selectedTab = "overview",
  selectedYear,
  onSelectedYearChange,
  searchPlaceholder = "Type / to search",
  profile = defaultProfile,
  repositories = defaultRepositories,
  achievements = defaultAchievements,
  years = defaultYears,
}: UserProfileOverviewViewProps) {
  const [searchValue, setSearchValue] = useState("");
  const [tabValue, setTabValue] = useState<ProfileTab>(selectedTab);
  const [internalYear, setInternalYear] = useState(selectedYear ?? years[0]?.year ?? "2026");

  const activeYear = selectedYear ?? internalYear;
  const currentYear = useMemo(
    () => years.find((item) => item.year === activeYear) ?? years[0],
    [years, activeYear]
  );

  const handleYearChange = (year: string) => {
    if (!selectedYear) setInternalYear(year);
    onSelectedYearChange?.(year);
  };

  return (
    <div data-state={state} className="min-h-screen bg-background text-foreground">
      <GithubProfileHeader
        username={profile.username}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      <div className="border-b border-border px-4 lg:px-6">
        <Tabs value={tabValue} onValueChange={(value) => setTabValue(value as ProfileTab)} className="gap-0">
          <TabsList className="h-auto w-full justify-start gap-1 rounded-none bg-transparent p-0">
            {[
              { value: "overview", label: "Overview", icon: BookOpen },
              { value: "repositories", label: "Repositories", icon: BookOpen, count: profile.repositoryCount },
              { value: "projects", label: "Projects", icon: Grid3X3 },
              { value: "packages", label: "Packages", icon: Package },
              { value: "stars", label: "Stars", icon: Star },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.value === tabValue;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "relative h-12 flex-none rounded-none border-0 px-4 text-sm text-muted-foreground shadow-none data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none",
                    isActive && "after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:rounded-full after:bg-[#f78166]"
                  )}
                >
                  <Icon className="size-4" />
                  {tab.label}
                  {"count" in tab && tab.count ? (
                    <span className="rounded-full bg-card px-1.5 py-0.5 text-[11px] text-foreground">
                      {tab.count}
                    </span>
                  ) : null}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      <main className="mx-auto grid max-w-[1280px] gap-8 px-4 py-8 lg:grid-cols-[296px_minmax(0,1fr)] lg:px-6">
        <aside>
          <div className="sticky top-6">
            <div className="relative w-fit">
              <Avatar className="size-[296px] border border-border shadow-[var(--shadow-card)]">
                <AvatarImage src={profile.avatarSrc} alt={profile.fullName} className="object-cover" />
                <AvatarFallback className="text-4xl">OC</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-8 right-4 flex size-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-[var(--shadow-card)] hover:text-foreground">
                <Smile className="size-4" />
              </button>
            </div>

            <div className="mt-4">
              <h1 className="text-[38px] leading-10 font-semibold">{profile.fullName}</h1>
              <p className="mt-1 text-[26px] leading-8 text-muted-foreground">{profile.username}</p>
              <Button variant="outline" className="mt-4 h-8 w-full border-border bg-card text-sm font-semibold hover:bg-[--panel-hover]">
                Edit profile
              </Button>
            </div>

            <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="size-4" />
              <span className="text-foreground">{profile.followers}</span>
              <span>followers</span>
              <span>·</span>
              <span className="text-foreground">{profile.following}</span>
              <span>following</span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-foreground">
              <Building2 className="size-4 text-muted-foreground" />
              <span>{profile.company}</span>
            </div>

            <div className="mt-5 border-t border-border pt-5">
              <h2 className="text-[22px] font-semibold">Achievements</h2>
              <div className="mt-3">
                <AchievementsRow items={achievements} />
              </div>
            </div>

            <div className="mt-5 border-t border-border pt-5">
              <h2 className="text-[22px] font-semibold">Organizations</h2>
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-2xl font-normal">Popular repositories</h2>
            <button className="text-xs text-[#2f81f7] hover:underline">Customize your pins</button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {repositories.map((repository) => (
              <RepositoryCard key={repository.id} repository={repository} />
            ))}
          </div>

          <div className="mt-8">
            <ContributionsHeatmap
              year={currentYear}
              selectedYear={activeYear}
              onSelectedYearChange={handleYearChange}
            />
          </div>

          <section className="mt-8">
            <h2 className="text-[32px] font-normal">Contribution activity</h2>
            <div className="mt-4 flex items-center gap-4 text-sm text-foreground">
              <span className="font-semibold text-[#4493f8]">September 2026</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default function HomePage() {
  return <UserProfileOverviewView state="default" />;
}
