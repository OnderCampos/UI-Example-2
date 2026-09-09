"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  Building2,
  ChevronDown,
  Github,
  Grid3X3,
  Link2,
  MapPin,
  Menu,
  Package,
  Search,
  Settings2,
  Star,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type ProfileTab = "overview" | "repositories" | "projects" | "packages" | "stars";

type RepositoryLanguage = {
  name: string;
  color: string;
};

type PopularRepository = {
  name: string;
  description?: string;
  source?: string;
  visibility: "Public";
  language: RepositoryLanguage;
};

type ContributionDay = {
  level: 0 | 1 | 2 | 3 | 4;
};

type GitHubUserProfileProps = {
  state?: "overview";
  selectedTab?: ProfileTab;
  repositoryCount?: number;
  profile: {
    name: string;
    username: string;
    avatarUrl: string;
    followers: number;
    following: number;
    organization: string;
  };
  popularRepositories?: PopularRepository[];
  contributionCount?: number;
  contributionYear?: string;
  achievements?: { label: string; emoji: string; count?: number }[];
  contributionMonths?: string[];
  contributionGrid?: ContributionDay[][];
};

const profileTabs: { value: ProfileTab; label: string; count?: number; icon: typeof BookOpen }[] = [
  { value: "overview", label: "Overview", icon: BookOpen },
  { value: "repositories", label: "Repositories", count: 16, icon: BookOpen },
  { value: "projects", label: "Projects", icon: Grid3X3 },
  { value: "packages", label: "Packages", icon: Package },
  { value: "stars", label: "Stars", icon: Star },
];

const defaultRepositories: PopularRepository[] = [
  {
    name: "open-interpreter",
    source: "Forked from openinterpreter/openinterpreter",
    description: "A natural language interface for computers",
    visibility: "Public",
    language: { name: "Python", color: "#58A6FF" },
  },
  {
    name: "CountBoxingSofttek",
    visibility: "Public",
    language: { name: "Python", color: "#58A6FF" },
  },
  {
    name: "count_colors",
    visibility: "Public",
    language: { name: "Python", color: "#58A6FF" },
  },
  {
    name: "pushtest",
    visibility: "Public",
    language: { name: "Python", color: "#58A6FF" },
  },
  {
    name: "SAP-Cleaning-Frontend",
    visibility: "Public",
    language: { name: "TypeScript", color: "#2F81F7" },
  },
  {
    name: "FridaProductPlannerWebBackend",
    visibility: "Public",
    language: { name: "Python", color: "#58A6FF" },
  },
];

const contributionMonths = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

const contributionRows: ContributionDay[][] = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,2,3],
  [0,0,0,2,1,0,0,0,0,0,0,0,0,0,2,0,0,0,1,0,0,0,2,0,0,0,1,2,0,0,0,1,0,1,0,1,0,0,2,2,0,0,0,0,0,0,0,2,0,0,4,2],
  [0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1,0,2,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1],
  [0,2,0,0,1,0,0,0,0,2,0,0,1,2,0,0,0,0,0,0,0,1,0,1,0,0,2,0,0,0,2,0,0,1,0,0,0,0,2,1,0,0,0,0,0,1,0,0,0,0,4,2],
  [0,2,0,0,0,0,2,0,0,0,0,1,0,0,0,0,2,0,0,0,0,0,0,0,0,2,0,2,0,0,0,2,0,0,0,2,0,0,0,0,2,0,0,0,2,0,0,0,0,2,4,1],
  [2,0,1,2,0,0,2,0,0,0,1,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,2,1,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,3,0],
  [1,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0],
].map((row) => row.map((level) => ({ level: level as ContributionDay["level"] })));

const achievements = [
  { label: "Pull Shark", emoji: "🦈" },
  { label: "Quickdraw", emoji: "🤠" },
  { label: "Arctic Code Vault", emoji: "🥶", count: 2 },
  { label: "Pair Extraordinaire", emoji: "🫛" },
];

function getContributionColor(level: ContributionDay["level"]) {
  switch (level) {
    case 0:
      return "#2a313c";
    case 1:
      return "#0e4429";
    case 2:
      return "#006d32";
    case 3:
      return "#26a641";
    case 4:
      return "#39d353";
    default:
      return "#2a313c";
  }
}

function GitHubUserProfile({
  state = "overview",
  selectedTab = "overview",
  repositoryCount = 16,
  profile = {
    name: "Onder Francisco Campos Garcia",
    username: "OnderCampos",
    avatarUrl: "/Frida.png",
    followers: 2,
    following: 1,
    organization: "Softtek",
  },
  popularRepositories = defaultRepositories,
  contributionCount = 471,
  contributionYear = "2026",
  achievements: userAchievements = achievements,
  contributionMonths: months = contributionMonths,
  contributionGrid = contributionRows,
}: GitHubUserProfileProps) {
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState<ProfileTab>(selectedTab);
  const [selectedYear, setSelectedYear] = useState(contributionYear);
  const [settingsLabel, setSettingsLabel] = useState("Contribution settings");

  const filteredRepositories = useMemo(() => {
    return popularRepositories.filter((repo) => repo.name.toLowerCase().includes(searchValue.toLowerCase()));
  }, [popularRepositories, searchValue]);

  const tabsWithCount = profileTabs.map((tab) =>
    tab.value === "repositories" ? { ...tab, count: repositoryCount } : tab
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon-sm" className="border border-border bg-transparent text-foreground hover:bg-card">
              <Menu className="size-4" />
            </Button>
            <Github className="size-8" />
            <span className="text-base font-semibold">{profile.username}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden w-[270px] lg:block">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Type / to search"
                className="h-8 border-border bg-transparent pl-9 text-sm"
              />
            </div>
            {Array.from({ length: 7 }).map((_, index) => (
              <Button
                key={`header-action-${index}`}
                variant="ghost"
                size="icon-sm"
                className="border border-border bg-transparent text-foreground hover:bg-card"
              >
                {index === 0 ? <Grid3X3 className="size-4" /> : null}
                {index === 1 ? <ChevronDown className="size-4" /> : null}
                {index === 2 ? <span className="text-base leading-none">+</span> : null}
                {index === 3 ? <Bell className="size-4" /> : null}
                {index === 4 ? <Settings2 className="size-4" /> : null}
                {index === 5 ? <BookOpen className="size-4" /> : null}
                {index === 6 ? <Package className="size-4" /> : null}
              </Button>
            ))}
            <Avatar className="size-8 border border-border">
              <AvatarImage src={profile.avatarUrl} alt={profile.username} />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="mx-auto max-w-[1600px] px-4">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ProfileTab)} className="gap-0">
            <TabsList className="h-auto w-full justify-start gap-1 rounded-none bg-transparent p-0">
              {tabsWithCount.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="relative h-12 flex-none rounded-none border-0 border-b-2 border-transparent px-3 text-sm font-normal text-muted-foreground data-[state=active]:border-[#f78166] data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    <Icon className="size-4" />
                    {tab.label}
                    {typeof tab.count === "number" ? (
                      <span className="rounded-full bg-secondary px-1.5 py-0.5 text-xs text-foreground">{tab.count}</span>
                    ) : null}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[296px_minmax(0,1fr)]">
        <aside>
          <div className="sticky top-8">
            <div className="relative mb-5 w-fit">
              <Avatar className="size-[296px] border border-border">
                <AvatarImage src={profile.avatarUrl} alt={profile.name} className="object-cover" />
                <AvatarFallback className="text-5xl">OC</AvatarFallback>
              </Avatar>
              <button
                type="button"
                className="absolute right-2 bottom-8 flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-[var(--shadow-card)] hover:text-foreground"
              >
                <span className="text-lg">☺</span>
              </button>
            </div>

            <div className="space-y-4 border-b border-border pb-6">
              <div>
                <h1 className="font-[Arial,Helvetica,sans-serif] text-[40px] leading-10 font-semibold tracking-[-0.02em]">{profile.name}</h1>
                <p className="mt-1 text-[20px] text-muted-foreground">{profile.username}</p>
              </div>

              <Button variant="outline" className="h-8 w-full border-border bg-secondary text-sm hover:bg-[#343d46]">
                Edit profile
              </Button>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="size-4" />
                <button type="button" className="text-foreground hover:text-[var(--color-github-accent)]">
                  {profile.followers} followers
                </button>
                <span>·</span>
                <button type="button" className="text-foreground hover:text-[var(--color-github-accent)]">
                  {profile.following} following
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-foreground">
                <Building2 className="size-4 text-muted-foreground" />
                <span>{profile.organization}</span>
              </div>
            </div>

            <div className="border-b border-border py-5">
              <h2 className="mb-4 font-[Arial,Helvetica,sans-serif] text-[22px] font-semibold">Achievements</h2>
              <div className="flex flex-wrap gap-2">
                {userAchievements.map((achievement) => (
                  <div
                    key={achievement.label}
                    className="relative flex size-12 items-center justify-center rounded-full border border-white/20 bg-[radial-gradient(circle_at_30%_30%,#ffffff_0%,#f9c6d0_30%,#7c3aed_70%,#334155_100%)] text-2xl shadow-[var(--shadow-card)]"
                    title={achievement.label}
                  >
                    <span>{achievement.emoji}</span>
                    {achievement.count ? (
                      <span className="absolute -right-1 -bottom-1 rounded-full bg-[#d29922] px-1.5 text-[10px] font-semibold text-background">
                        x{achievement.count}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5">
              <h2 className="mb-4 font-[Arial,Helvetica,sans-serif] text-[22px] font-semibold">Organizations</h2>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex size-8 items-center justify-center rounded-md border border-border bg-card">S</div>
                <span>{profile.organization}</span>
              </div>
            </div>
          </div>
        </aside>

        <section>
          {state === "overview" ? (
            <>
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="font-[Arial,Helvetica,sans-serif] text-2xl font-semibold">Popular repositories</h2>
                <button type="button" className="text-sm text-[#2f81f7] hover:underline">
                  Customize your pins
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {filteredRepositories.map((repo) => (
                  <Card key={repo.name} className="gap-0 rounded-lg border-border bg-card py-0 shadow-none">
                    <CardContent className="p-4">
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <button type="button" className="truncate text-left text-base font-semibold text-[#2f81f7] hover:underline">
                            {repo.name}
                          </button>
                          {repo.source ? <p className="mt-1 text-xs text-muted-foreground">{repo.source}</p> : null}
                        </div>
                        <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                          {repo.visibility}
                        </span>
                      </div>
                      {repo.description ? (
                        <p className="mb-5 min-h-10 text-sm leading-5 text-muted-foreground">{repo.description}</p>
                      ) : (
                        <div className="mb-5 h-10" />
                      )}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="size-3 rounded-full" style={{ backgroundColor: repo.language.color }} />
                        <span>{repo.language.name}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-10">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2 className="font-[Arial,Helvetica,sans-serif] text-[32px] leading-tight font-semibold">
                    {contributionCount} contributions in the last year
                  </h2>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <button
                      type="button"
                      onClick={() => setSettingsLabel(settingsLabel === "Contribution settings" ? "Private contributions" : "Contribution settings")}
                      className="flex items-center gap-1 hover:text-foreground"
                    >
                      {settingsLabel}
                      <ChevronDown className="size-4" />
                    </button>
                  </div>
                </div>

                <Card className="gap-0 rounded-lg border-border bg-background py-0 shadow-none">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-[32px_minmax(0,1fr)_84px] gap-4">
                      <div className="pt-12 text-xs text-muted-foreground">
                        <div className="mb-4">Mon</div>
                        <div className="mb-4">Wed</div>
                        <div>Fri</div>
                      </div>

                      <div>
                        <div className="mb-3 grid grid-cols-12 gap-[3px] text-xs text-muted-foreground">
                          {months.map((month) => (
                            <span key={month}>{month}</span>
                          ))}
                        </div>
                        <div className="grid grid-flow-col gap-[3px] overflow-hidden">
                          {contributionGrid[0]?.map((_, weekIndex) => (
                            <div key={`week-${weekIndex}`} className="grid gap-[3px]">
                              {contributionGrid.map((row, rowIndex) => (
                                <div
                                  key={`cell-${weekIndex}-${rowIndex}`}
                                  className="size-[11px] rounded-[2px] border border-black/10"
                                  style={{ backgroundColor: getContributionColor(row[weekIndex]?.level ?? 0) }}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                          <button type="button" className="hover:text-foreground">
                            Learn how we count contributions
                          </button>
                          <div className="flex items-center gap-2">
                            <span>Less</span>
                            <div className="flex gap-[3px]">
                              {[0, 1, 2, 3, 4].map((level) => (
                                <span
                                  key={level}
                                  className="size-[10px] rounded-[2px]"
                                  style={{ backgroundColor: getContributionColor(level as ContributionDay["level"]) }}
                                />
                              ))}
                            </div>
                            <span>More</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {['2026', '2025', '2024', '2023'].map((year) => (
                          <button
                            key={year}
                            type="button"
                            onClick={() => setSelectedYear(year)}
                            className={cn(
                              "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                              selectedYear === year
                                ? "bg-[#1f6feb] text-white"
                                : "text-muted-foreground hover:bg-card hover:text-foreground"
                            )}
                          >
                            {year}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <h3 className="font-[Arial,Helvetica,sans-serif] text-[32px] leading-tight font-semibold">Contribution activity</h3>
                  <div className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 font-medium text-foreground">
                      <span>September {selectedYear}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </section>
      </main>
    </div>
  );
}

export default function HomePage() {
  return <GitHubUserProfile state="overview" />;
}
