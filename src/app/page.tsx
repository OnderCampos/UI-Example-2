"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  BookOpen,
  Building2,
  ChevronDown,
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
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import * as Tabs from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type ProfileTab = "overview" | "repositories" | "projects" | "packages" | "stars";

type RepositoryItem = {
  name: string;
  description?: string;
  language: string;
  languageColor: string;
  visibility: "Public";
  isFork?: boolean;
  forkSource?: string;
};

type ContributionDay = {
  level: 0 | 1 | 2 | 3 | 4;
};

type ContributionMonth = {
  label: string;
  weeks: ContributionDay[][];
};

type UserProfileOverviewProps = {
  state?: "default";
  selectedTab?: ProfileTab;
  profileName?: string;
  userName?: string;
  bio?: string;
  repositories?: RepositoryItem[];
  contributionCount?: number;
  contributionMonths?: ContributionMonth[];
  selectedYear?: string;
};

const defaultRepositories: RepositoryItem[] = [
  {
    name: "open-interpreter",
    description: "A natural language interface for computers",
    language: "Python",
    languageColor: "#4493f8",
    visibility: "Public",
    isFork: true,
    forkSource: "openinterpreter/openinterpreter",
  },
  {
    name: "CountBoxingSofttek",
    language: "Python",
    languageColor: "#4493f8",
    visibility: "Public",
  },
  {
    name: "count_colors",
    language: "Python",
    languageColor: "#4493f8",
    visibility: "Public",
  },
  {
    name: "pushtest",
    language: "Python",
    languageColor: "#4493f8",
    visibility: "Public",
  },
  {
    name: "SAP-Cleaning-Frontend",
    language: "TypeScript",
    languageColor: "#2f81f7",
    visibility: "Public",
  },
  {
    name: "FridaProductPlannerWebBackend",
    language: "Python",
    languageColor: "#4493f8",
    visibility: "Public",
  },
];

const contributionPattern = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 2, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 2, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 3, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 4, 1, 0],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 4, 2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 3, 0],
  [2, 0, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 1, 2, 0, 0, 0, 4, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 3, 0],
  [1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const contributionMonths: ContributionMonth[] = [
  { label: "Sep", weeks: contributionPattern.map((row) => row.slice(0, 4).map((level) => ({ level: level as ContributionDay["level"] }))) },
  { label: "Oct", weeks: contributionPattern.map((row) => row.slice(4, 8).map((level) => ({ level: level as ContributionDay["level"] }))) },
  { label: "Nov", weeks: contributionPattern.map((row) => row.slice(8, 13).map((level) => ({ level: level as ContributionDay["level"] }))) },
  { label: "Dec", weeks: contributionPattern.map((row) => row.slice(13, 17).map((level) => ({ level: level as ContributionDay["level"] }))) },
  { label: "Jan", weeks: contributionPattern.map((row) => row.slice(17, 21).map((level) => ({ level: level as ContributionDay["level"] }))) },
  { label: "Feb", weeks: contributionPattern.map((row) => row.slice(21, 26).map((level) => ({ level: level as ContributionDay["level"] }))) },
  { label: "Mar", weeks: contributionPattern.map((row) => row.slice(26, 30).map((level) => ({ level: level as ContributionDay["level"] }))) },
  { label: "Apr", weeks: contributionPattern.map((row) => row.slice(30, 34).map((level) => ({ level: level as ContributionDay["level"] }))) },
  { label: "May", weeks: contributionPattern.map((row) => row.slice(34, 38).map((level) => ({ level: level as ContributionDay["level"] }))) },
  { label: "Jun", weeks: contributionPattern.map((row) => row.slice(38, 42).map((level) => ({ level: level as ContributionDay["level"] }))) },
  { label: "Jul", weeks: contributionPattern.map((row) => row.slice(42, 46).map((level) => ({ level: level as ContributionDay["level"] }))) },
  { label: "Aug", weeks: contributionPattern.map((row) => row.slice(46, 52).map((level) => ({ level: level as ContributionDay["level"] }))) },
];

const tabItems: { value: ProfileTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
  { value: "overview", label: "Overview", icon: BookOpen },
  { value: "repositories", label: "Repositories", icon: Monitor, badge: "16" },
  { value: "projects", label: "Projects", icon: BadgeCheck },
  { value: "packages", label: "Packages", icon: Package },
  { value: "stars", label: "Stars", icon: Star },
];

const yearOptions = ["2026", "2025", "2024", "2023"];

function ContributionLegendBox({ level }: { level: ContributionDay["level"] }) {
  const tone = {
    0: "bg-[#263040]",
    1: "bg-[#0e4429]",
    2: "bg-[#006d32]",
    3: "bg-[#26a641]",
    4: "bg-[#39d353]",
  }[level];

  return <span className={cn("h-[11px] w-[11px] rounded-[2px]", tone)} />;
}

function UserProfileOverview({
  state = "default",
  selectedTab = "overview",
  profileName = "Onder Francisco Campos Garcia",
  userName = "OnderCampos",
  bio = "Softtek",
  repositories = defaultRepositories,
  contributionCount = 471,
  contributionMonths = contributionMonths,
  selectedYear = "2026",
}: UserProfileOverviewProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>(selectedTab);
  const [searchValue, setSearchValue] = useState("");
  const [activeYear, setActiveYear] = useState(selectedYear);

  const filteredRepositories = useMemo(() => {
    if (!searchValue.trim()) return repositories;

    return repositories.filter((repository) =>
      repository.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [repositories, searchValue]);

  const visibleRepositories = filteredRepositories.slice(0, 6);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-[linear-gradient(90deg,#0d1521_0%,#0e1c2f_100%)]">
        <div className="flex h-[88px] items-start justify-between px-4 pt-3">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-transparent hover:bg-card">
              <Menu className="h-4 w-4" />
            </Button>
            <Github className="h-8 w-8" fill="currentColor" />
            <span className="text-base font-semibold">{userName}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden h-8 w-[310px] items-center rounded-md border border-border bg-transparent px-3 lg:flex">
              <Search className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Type / to search"
                className="h-auto border-0 bg-transparent px-0 py-0 text-sm text-foreground shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="hidden items-center gap-2 md:flex">
              {Array.from({ length: 7 }).map((_, index) => (
                <Button key={index} variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-transparent hover:bg-card">
                  <span className="text-xs text-muted-foreground">{index === 6 ? "◔" : index === 5 ? "⌂" : index === 4 ? "⋮" : index === 3 ? "○" : index === 2 ? "+" : index === 1 ? "▢" : "⌘"}</span>
                </Button>
              ))}
            </div>
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src="/Frida.png" alt={userName} />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <Tabs.Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ProfileTab)} className="gap-0">
          <Tabs.TabsList className="h-auto w-full justify-start rounded-none border-t border-border bg-transparent px-4 py-0">
            {tabItems.map((tab) => {
              const Icon = tab.icon;
              return (
                <Tabs.TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="relative h-[46px] flex-none rounded-none border-x-0 border-t-0 border-b-2 border-transparent bg-transparent px-3 text-sm font-normal text-muted-foreground shadow-none data-[state=active]:border-[#f78166] data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                  {tab.badge ? <span className="ml-1 rounded-full bg-secondary px-1.5 py-0.5 text-[11px] leading-none text-foreground">{tab.badge}</span> : null}
                </Tabs.TabsTrigger>
              );
            })}
          </Tabs.TabsList>

          <Tabs.TabsContent value="overview" className="mt-0">
            <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[260px_minmax(0,1fr)]">
              <aside>
                <div className="relative mb-4 w-fit">
                  <Avatar className="h-[266px] w-[266px] border-4 border-background shadow-[0_0_0_1px_var(--border)]">
                    <AvatarImage src="/Frida.png" alt={profileName} className="object-cover" />
                    <AvatarFallback>OC</AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    className="absolute right-3 bottom-8 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                    aria-label="Profile status"
                  >
                    ◌
                  </button>
                </div>

                <h1 className="text-[40px] leading-[1.1] font-semibold tracking-[-0.02em]">{profileName}</h1>
                <p className="mb-4 text-[28px] leading-[1.2] text-muted-foreground">{userName}</p>

                <Button variant="outline" className="mb-4 h-8 w-full rounded-md border-border bg-card text-sm font-semibold hover:bg-secondary">
                  Edit profile
                </Button>

                <div className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span className="text-foreground">2 followers</span>
                  <span>·</span>
                  <span className="text-foreground">1 following</span>
                </div>

                <div className="mb-5 flex items-center gap-2 text-sm text-foreground">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  {bio}
                </div>

                <div className="border-t border-border pt-5">
                  <h2 className="mb-4 text-2xl font-semibold">Achievements</h2>
                  <div className="flex items-center gap-2.5">
                    {[
                      { label: "Yolo", color: "from-pink-300 to-fuchsia-500" },
                      { label: "Bear", color: "from-yellow-200 to-amber-500" },
                      { label: "Shark", color: "from-sky-300 to-blue-500" },
                      { label: "Pair", color: "from-lime-200 to-green-500" },
                    ].map((badge, index) => (
                      <div key={badge.label} className="relative">
                        <div className={cn("flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-white/70 bg-gradient-to-br text-lg font-bold text-background", badge.color)}>
                          {index === 0 ? "✿" : index === 1 ? "🐻" : index === 2 ? "🦈" : "🫛"}
                        </div>
                        {index === 2 ? <span className="absolute -right-1 -bottom-1 rounded-full bg-[#f7b267] px-1.5 py-0.5 text-[10px] font-semibold text-background">x2</span> : null}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 border-t border-border pt-5">
                  <h2 className="text-2xl font-semibold">Organizations</h2>
                </div>
              </aside>

              <section>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h2 className="text-[24px] font-medium">Popular repositories</h2>
                  <button type="button" className="text-sm text-link hover:underline">
                    Customize your pins
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {visibleRepositories.map((repository) => (
                    <Card key={repository.name} className="gap-0 rounded-md border-border bg-background py-0 shadow-none">
                      <CardContent className="flex min-h-[128px] flex-col p-4">
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <a href="#" className="text-base font-semibold text-link hover:underline">
                            {repository.name}
                          </a>
                          <span className="rounded-full border border-border px-2 py-[2px] text-xs text-muted-foreground">
                            {repository.visibility}
                          </span>
                        </div>

                        {repository.isFork && repository.forkSource ? (
                          <p className="mb-3 text-xs text-muted-foreground">
                            Forked from <span className="underline underline-offset-2">{repository.forkSource}</span>
                          </p>
                        ) : (
                          <div className="mb-3 h-4" />
                        )}

                        {repository.description ? (
                          <p className="mb-5 text-sm text-foreground">{repository.description}</p>
                        ) : (
                          <div className="mb-5 flex-1" />
                        )}

                        <div className="mt-auto flex items-center gap-1.5 text-sm text-muted-foreground">
                          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: repository.languageColor }} />
                          {repository.language}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 flex items-end justify-between gap-4">
                  <h2 className="text-[32px] leading-none font-normal">{contributionCount} contributions in the last year</h2>
                  <div className="flex items-center gap-5 text-sm text-muted-foreground">
                    <button type="button" className="flex items-center gap-1 hover:text-foreground">
                      Contribution settings
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <div className="hidden md:block" />
                  </div>
                </div>

                <div className="mt-3 grid gap-5 xl:grid-cols-[minmax(0,1fr)_84px]">
                  <Card className="gap-0 rounded-md border-border bg-background py-0 shadow-none">
                    <CardContent className="p-4">
                      <div className="mb-2 grid grid-cols-[32px_repeat(12,minmax(0,1fr))] items-center gap-x-3 text-xs text-muted-foreground">
                        <span />
                        {contributionMonths.map((month) => (
                          <span key={month.label}>{month.label}</span>
                        ))}
                      </div>

                      <div className="grid grid-cols-[32px_1fr] gap-3">
                        <div className="grid grid-rows-7 gap-[3px] pt-[18px] text-xs text-muted-foreground">
                          <span />
                          <span>Mon</span>
                          <span />
                          <span>Wed</span>
                          <span />
                          <span>Fri</span>
                          <span />
                        </div>

                        <div className="grid auto-cols-max grid-flow-col gap-[3px] overflow-hidden">
                          {Array.from({ length: 52 }).map((_, weekIndex) => (
                            <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
                              {Array.from({ length: 7 }).map((__, dayIndex) => (
                                <ContributionLegendBox
                                  key={dayIndex}
                                  level={contributionPattern[dayIndex][weekIndex] as ContributionDay["level"]}
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
                          <div className="flex items-center gap-[3px]">
                            {[0, 1, 2, 3, 4].map((level) => (
                              <ContributionLegendBox key={level} level={level as ContributionDay["level"]} />
                            ))}
                          </div>
                          <span>More</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-2 pt-1">
                    {yearOptions.map((year) => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => setActiveYear(year)}
                        className={cn(
                          "flex h-8 w-full items-center rounded-md px-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground",
                          activeYear === year && "bg-[#1f6feb] text-white hover:bg-[#1f6feb]"
                        )}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="mb-4 text-[32px] leading-none font-normal">Contribution activity</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">September 2026</span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                </div>
              </section>
            </div>
          </Tabs.TabsContent>
        </Tabs.Tabs>
      </header>

      <div className="hidden">{state}</div>
    </main>
  );
}

export default function HomePage() {
  return <UserProfileOverview />;
}
