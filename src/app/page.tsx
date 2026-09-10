"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Box,
  Building2,
  Camera,
  CircleDot,
  Github,
  Link as LinkIcon,
  Menu,
  Package,
  Search,
  Star,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type ProfileTab = "overview" | "repositories" | "projects" | "packages";

type Repository = {
  name: string;
  description?: string;
  language: string;
  languageColor: string;
  visibility: "Public" | "Private";
  forkedFrom?: string;
};

type ContributionLevel = 0 | 1 | 2 | 3 | 4;

type ContributionMonth = {
  label: string;
  width: number;
};

type ContributionDay = {
  level: ContributionLevel;
};

type Achievement = {
  label: string;
  emoji: string;
  count?: string;
  tint: string;
};

type UserProfileOverviewViewProps = {
  state?: "default";
  selectedTab?: ProfileTab;
  onSelectedTabChange?: (tab: ProfileTab) => void;
  selectedYear?: string;
  onSelectedYearChange?: (year: string) => void;
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;
  user?: {
    displayName: string;
    handle: string;
    avatarSrc?: string;
    following: number;
    followers: number;
    organization: string;
  };
  repositories?: Repository[];
  pinnedActionLabel?: string;
  contributionTotal?: number;
  months?: ContributionMonth[];
  contributionGrid?: ContributionDay[][];
  years?: string[];
  achievements?: Achievement[];
};

const defaultUserProfile = {
  displayName: "Onder Francisco Campos Garcia",
  handle: "OnderCampos",
  avatarSrc: "/Frida.png",
  following: 1,
  followers: 2,
  organization: "Softtek",
};

const defaultRepositories: Repository[] = [
  {
    name: "open-interpreter",
    description: "A natural language interface for computers",
    language: "Python",
    languageColor: "#58A6FF",
    visibility: "Public",
    forkedFrom: "Forked from openinterpreter/openinterpreter",
  },
  {
    name: "CountBoxingSofttek",
    language: "Python",
    languageColor: "#58A6FF",
    visibility: "Public",
  },
  {
    name: "count_colors",
    language: "Python",
    languageColor: "#58A6FF",
    visibility: "Public",
  },
  {
    name: "pushtest",
    language: "Python",
    languageColor: "#58A6FF",
    visibility: "Public",
  },
  {
    name: "SAP-Cleaning-Frontend",
    language: "TypeScript",
    languageColor: "#58A6FF",
    visibility: "Public",
  },
  {
    name: "FridaProductPlannerWebBackend",
    language: "Python",
    languageColor: "#58A6FF",
    visibility: "Public",
  },
];

const defaultMonths: ContributionMonth[] = [
  { label: "Sep", width: 4 },
  { label: "Oct", width: 4 },
  { label: "Nov", width: 4 },
  { label: "Dec", width: 5 },
  { label: "Jan", width: 4 },
  { label: "Feb", width: 4 },
  { label: "Mar", width: 5 },
  { label: "Apr", width: 4 },
  { label: "May", width: 4 },
  { label: "Jun", width: 4 },
  { label: "Jul", width: 4 },
  { label: "Aug", width: 4 },
];

const defaultAchievements: Achievement[] = [
  { label: "Pull Shark", emoji: "🪼", tint: "from-pink-300 to-rose-400" },
  { label: "YOLO", emoji: "🤠", tint: "from-amber-200 to-yellow-500" },
  { label: "Arctic Code Vault", emoji: "🥶", count: "x2", tint: "from-sky-200 to-blue-500" },
  { label: "Pair Extraordinaire", emoji: "🫛", tint: "from-lime-200 to-green-400" },
];

const contributionPalette = ["#2D333B", "#0E4429", "#006D32", "#26A641", "#39D353"];
const profileTabs: Array<{ value: ProfileTab; label: string; icon: React.ComponentType<{ className?: string }>; count?: string }> = [
  { value: "overview", label: "Overview", icon: BookOpen },
  { value: "repositories", label: "Repositories", icon: Box, count: "16" },
  { value: "projects", label: "Projects", icon: Building2 },
  { value: "packages", label: "Packages", icon: Package },
];

function createContributionGrid(): ContributionDay[][] {
  const pattern = [
    [0, 0, 0, 1, 0, 0, 1],
    [0, 1, 0, 0, 0, 2, 0],
    [1, 0, 0, 0, 1, 0, 0],
    [0, 2, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 0, 2, 0],
    [1, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 2, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0],
    [1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 2, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0],
    [0, 0, 1, 0, 2, 0, 0],
    [0, 0, 0, 2, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 1, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 1, 0, 0, 0, 0, 3],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 1, 0, 0, 0],
    [0, 0, 2, 0, 0, 0, 0],
    [0, 1, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2],
    [0, 0, 1, 0, 0, 1, 0],
    [0, 2, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 2, 0, 0],
    [1, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 2, 0, 1, 0],
    [3, 4, 2, 4, 3, 4, 2],
  ];

  return pattern.map((column) => column.map((level) => ({ level: level as ContributionLevel })));
}

function HeaderIconButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md border border-border bg-transparent text-muted-foreground transition hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      {children}
    </button>
  );
}

function VisibilityBadge({ visibility }: { visibility: Repository["visibility"] }) {
  return (
    <span className="inline-flex h-6 items-center rounded-full border border-border px-2 text-xs font-medium text-muted-foreground">
      {visibility}
    </span>
  );
}

function RepositoryCard({ repository }: { repository: Repository }) {
  return (
    <Card className="gap-0 rounded-lg border-border bg-card px-4 py-4 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-[20px] font-semibold leading-6 text-[#2F81F7]">{repository.name}</h3>
          {repository.forkedFrom ? (
            <p className="mt-1 text-xs text-muted-foreground underline decoration-muted-foreground/60 underline-offset-2">
              {repository.forkedFrom}
            </p>
          ) : null}
        </div>
        <VisibilityBadge visibility={repository.visibility} />
      </div>
      {repository.description ? (
        <p className="mt-5 min-h-10 pr-4 text-sm leading-6 text-foreground/90">{repository.description}</p>
      ) : (
        <div className="mt-5 min-h-10" />
      )}
      <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: repository.languageColor }} />
        <span>{repository.language}</span>
      </div>
    </Card>
  );
}

function AchievementBadge({ achievement }: { achievement: Achievement }) {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-[color:var(--surface)] shadow-[0_0_0_2px_var(--background)]">
      <div className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-lg", achievement.tint)}>
        {achievement.emoji}
      </div>
      {achievement.count ? (
        <span className="absolute -bottom-1 -right-1 rounded-full bg-[#24292F] px-1.5 py-0.5 text-[10px] font-semibold text-[#F0F6FC] shadow">
          {achievement.count}
        </span>
      ) : null}
    </div>
  );
}

function ContributionHeatmap({ months, grid }: { months: ContributionMonth[]; grid: ContributionDay[][] }) {
  return (
    <div className="rounded-lg border border-border bg-background px-4 py-4">
      <div className="ml-8 flex gap-1.5 text-xs text-muted-foreground">
        {months.map((month) => (
          <div key={month.label} style={{ width: `${month.width * 12}px` }}>
            {month.label}
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-3">
        <div className="grid grid-rows-7 gap-1 pt-1 text-xs text-muted-foreground">
          <span className="h-3">Mon</span>
          <span className="h-3 opacity-0">Tue</span>
          <span className="h-3">Wed</span>
          <span className="h-3 opacity-0">Thu</span>
          <span className="h-3">Fri</span>
        </div>
        <div className="grid grid-flow-col grid-rows-7 gap-1">
          {grid.map((column, columnIndex) => (
            <div key={`column-${columnIndex}`} className="grid grid-rows-7 gap-1">
              {column.map((day, rowIndex) => (
                <button
                  key={`day-${columnIndex}-${rowIndex}`}
                  type="button"
                  className="h-3 w-3 rounded-[2px] transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{ backgroundColor: contributionPalette[day.level] }}
                  aria-label={`Contribution level ${day.level}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <button type="button" className="hover:text-foreground">
          Learn how we count contributions
        </button>
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex gap-1">
            {contributionPalette.map((color) => (
              <span key={color} className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: color }} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

export default function UserProfileOverviewView({
  state = "default",
  selectedTab,
  onSelectedTabChange,
  selectedYear,
  onSelectedYearChange,
  searchValue,
  onSearchValueChange,
  user = defaultUserProfile,
  repositories = defaultRepositories,
  pinnedActionLabel = "Customize your pins",
  contributionTotal = 471,
  months = defaultMonths,
  contributionGrid = createContributionGrid(),
  years = ["2026", "2025", "2024", "2023"],
  achievements = defaultAchievements,
}: UserProfileOverviewViewProps) {
  const [internalTab, setInternalTab] = useState<ProfileTab>(selectedTab ?? "overview");
  const [internalYear, setInternalYear] = useState(selectedYear ?? years[0]);
  const [internalSearch, setInternalSearch] = useState(searchValue ?? "");

  const activeTab = selectedTab ?? internalTab;
  const activeYear = selectedYear ?? internalYear;
  const activeSearch = searchValue ?? internalSearch;

  const filteredRepositories = useMemo(
    () => repositories.filter((repository) => repository.name.toLowerCase().includes(activeSearch.toLowerCase())),
    [repositories, activeSearch],
  );

  const handleTabChange = (tab: string) => {
    const nextTab = tab as ProfileTab;
    setInternalTab(nextTab);
    onSelectedTabChange?.(nextTab);
  };

  const handleYearChange = (year: string) => {
    setInternalYear(year);
    onSelectedYearChange?.(year);
  };

  const handleSearchChange = (value: string) => {
    setInternalSearch(value);
    onSearchValueChange?.(value);
  };

  return (
    <div data-state={state} className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-[linear-gradient(90deg,#0D1420_0%,#151B23_45%,#111923_100%)]">
        <div className="flex h-14 items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <HeaderIconButton>
              <Menu className="size-4" />
            </HeaderIconButton>
            <Github className="size-8 text-foreground" />
            <span className="text-sm font-semibold text-foreground">{user.handle}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden lg:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={activeSearch}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Type / to search"
                className="h-8 w-[260px] border-border bg-transparent pl-9 text-sm"
              />
            </div>
            <HeaderIconButton>
              <Box className="size-4" />
            </HeaderIconButton>
            <HeaderIconButton>
              <Star className="size-4" />
            </HeaderIconButton>
            <HeaderIconButton>
              <Users className="size-4" />
            </HeaderIconButton>
            <Avatar className="size-8 border border-border">
              <AvatarImage src={user.avatarSrc} alt={user.handle} />
              <AvatarFallback>{user.handle.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="border-t border-white/5 px-4">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="gap-0">
            <TabsList className="h-auto w-auto rounded-none bg-transparent p-0">
              {profileTabs.map(({ value, label, icon: Icon, count }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="relative h-12 rounded-none border-0 px-4 text-sm font-medium text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <Icon className="size-4" />
                  {label}
                  {count ? <span className="rounded-full bg-accent px-1.5 py-0.5 text-xs text-foreground">{count}</span> : null}
                  <span
                    className={cn(
                      "absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-transparent",
                      activeTab === value && "bg-[#F78166]",
                    )}
                  />
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1160px] px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside>
            <div className="relative mx-auto w-full max-w-[266px]">
              <Avatar className="h-[266px] w-[266px] border border-border shadow-[var(--shadow-card)]">
                <AvatarImage src={user.avatarSrc} alt={user.displayName} className="object-cover" />
                <AvatarFallback>{user.displayName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <button
                type="button"
                className="absolute bottom-8 right-2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-[var(--shadow-card)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Change profile photo"
              >
                <Camera className="size-4" />
              </button>
            </div>

            <div className="mt-5 max-w-[266px]">
              <h1 className="text-[24px] font-semibold leading-8 text-foreground">{user.displayName}</h1>
              <p className="text-[32px] font-light leading-9 text-muted-foreground">{user.handle}</p>

              <Button variant="outline" className="mt-4 h-8 w-full border-border bg-accent/25 text-sm font-semibold text-foreground hover:bg-accent">
                Edit profile
              </Button>

              <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="size-4" />
                <span className="text-foreground">{user.followers}</span>
                <span>followers</span>
                <span>·</span>
                <span className="text-foreground">{user.following}</span>
                <span>following</span>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm text-foreground">
                <Building2 className="size-4 text-muted-foreground" />
                <span>{user.organization}</span>
              </div>

              <div className="mt-5 border-t border-border pt-5">
                <h2 className="text-base font-semibold text-foreground">Achievements</h2>
                <div className="mt-3 flex items-center gap-2">
                  {achievements.map((achievement) => (
                    <AchievementBadge key={achievement.label} achievement={achievement} />
                  ))}
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-5">
                <h2 className="text-base font-semibold text-foreground">Organizations</h2>
                <div className="mt-3 flex items-center gap-2 text-sm text-foreground">
                  <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#0F6CBD] text-xs font-bold text-white">S</div>
                  <span>{user.organization}</span>
                </div>
              </div>
            </div>
          </aside>

          <section>
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-medium text-foreground">Popular repositories</h2>
              <button type="button" className="text-sm text-[#2F81F7] hover:underline">
                {pinnedActionLabel}
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredRepositories.map((repository) => (
                <RepositoryCard key={repository.name} repository={repository} />
              ))}
            </div>

            <section className="mt-8">
              <div className="mb-3 flex items-center justify-between gap-4">
                <h2 className="text-[28px] font-normal leading-8 text-foreground">{contributionTotal} contributions in the last year</h2>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <button type="button" className="flex items-center gap-1 hover:text-foreground">
                    Contribution settings
                    <span className="text-xs">▼</span>
                  </button>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_116px]">
                <ContributionHeatmap months={months} grid={contributionGrid} />
                <div className="space-y-2">
                  {years.map((year) => {
                    const active = activeYear === year;
                    return (
                      <button
                        key={year}
                        type="button"
                        onClick={() => handleYearChange(year)}
                        className={cn(
                          "flex h-8 w-full items-center rounded-md px-3 text-left text-sm transition",
                          active ? "bg-[#1F6FEB] text-white" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                        )}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="mt-6 border-t border-border pt-6">
              <h2 className="text-[28px] font-normal leading-8 text-foreground">Contribution activity</h2>
              <div className="mt-6 flex items-center gap-3 text-sm font-medium text-[#58A6FF]">
                <span>September 2026</span>
                <div className="h-px flex-1 bg-border" />
              </div>
            </section>
          </section>
        </div>
      </main>
    </div>
  );
}
