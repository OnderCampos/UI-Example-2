"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  Building2,
  ChevronDown,
  Github,
  Grid3X3,
  Home,
  Link2,
  MapPin,
  Menu,
  Package,
  Plus,
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

type ViewName = "github-home-dashboard" | "github-user-profile";
type DashboardState = "default";
type ProfileState = "overview";
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

type DashboardFeedItem = {
  id: string;
  actor: string;
  action: string;
  repo: string;
  branch?: string;
  time: string;
  summary?: string;
};

type DashboardRepository = {
  name: string;
  visibility: "Public" | "Private";
  language: RepositoryLanguage;
  updatedAt: string;
};

type ContributionDay = {
  level: 0 | 1 | 2 | 3 | 4;
};

type SharedProfile = {
  name: string;
  username: string;
  avatarUrl: string;
  followers: number;
  following: number;
  organization: string;
  bio?: string;
  location?: string;
  website?: string;
};

type GitHubDashboardProps = {
  state?: DashboardState;
  profile?: SharedProfile;
  repositories?: DashboardRepository[];
  feedItems?: DashboardFeedItem[];
};

type GitHubUserProfileProps = {
  state?: ProfileState;
  selectedTab?: ProfileTab;
  repositoryCount?: number;
  profile?: SharedProfile;
  popularRepositories?: PopularRepository[];
  contributionCount?: number;
  contributionYear?: string;
  achievements?: { label: string; emoji: string; count?: number }[];
  contributionMonths?: string[];
  contributionGrid?: ContributionDay[][];
};

const sharedProfile: SharedProfile = {
  name: "Onder Francisco Campos Garcia",
  username: "OnderCampos",
  avatarUrl: "/Frida.png",
  followers: 2,
  following: 1,
  organization: "Softtek",
  bio: "Building practical software with Python, TypeScript, and AI workflows.",
  location: "Monterrey, Mexico",
  website: "onder.dev",
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

const dashboardRepositories: DashboardRepository[] = [
  {
    name: "open-interpreter",
    visibility: "Public",
    language: { name: "Python", color: "#58A6FF" },
    updatedAt: "Updated 2 hours ago",
  },
  {
    name: "SAP-Cleaning-Frontend",
    visibility: "Private",
    language: { name: "TypeScript", color: "#2F81F7" },
    updatedAt: "Updated yesterday",
  },
  {
    name: "count_colors",
    visibility: "Public",
    language: { name: "Python", color: "#58A6FF" },
    updatedAt: "Updated last week",
  },
];

const dashboardFeedItems: DashboardFeedItem[] = [
  {
    id: "1",
    actor: "microsoft",
    action: "starred",
    repo: "openinterpreter/open-interpreter",
    time: "3h",
    summary: "Trending in AI tooling this week",
  },
  {
    id: "2",
    actor: "OnderCampos",
    action: "pushed to",
    repo: "SAP-Cleaning-Frontend",
    branch: "main",
    time: "8h",
    summary: "3 commits pushed to main",
  },
  {
    id: "3",
    actor: "vercel",
    action: "released",
    repo: "next.js",
    time: "1d",
    summary: "Next.js 16 release notes available",
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

function GitHubChrome({
  username,
  searchValue,
  onSearchChange,
}: {
  username: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon-sm" className="border border-border bg-transparent text-foreground hover:bg-card">
            <Menu className="size-4" />
          </Button>
          <Github className="size-8" />
          <span className="text-base font-semibold">{username}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden w-[270px] lg:block">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Type / to search"
              className="h-8 border-border bg-transparent pl-9 text-sm"
            />
          </div>
          <Button variant="ghost" size="icon-sm" className="border border-border bg-transparent text-foreground hover:bg-card">
            <Plus className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="border border-border bg-transparent text-foreground hover:bg-card">
            <Bell className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="border border-border bg-transparent text-foreground hover:bg-card">
            <Settings2 className="size-4" />
          </Button>
          <Avatar className="size-8 border border-border">
            <AvatarImage src={sharedProfile.avatarUrl} alt={username} />
            <AvatarFallback>OC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

function GitHubHomeDashboard({
  state = "default",
  profile = sharedProfile,
  repositories = dashboardRepositories,
  feedItems = dashboardFeedItems,
}: GitHubDashboardProps) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedFeed, setSelectedFeed] = useState(feedItems[0]?.id ?? "");
  const [selectedRepository, setSelectedRepository] = useState(repositories[0]?.name ?? "");

  const filteredRepositories = useMemo(() => {
    return repositories.filter((repository) =>
      repository.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [repositories, searchValue]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GitHubChrome username={profile.username} searchValue={searchValue} onSearchChange={setSearchValue} />

      <main className="mx-auto max-w-[1280px] px-4 py-8">
        {state === "default" ? (
          <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="space-y-6">
              <Card className="border-border bg-card py-0 shadow-none">
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-16 border border-border">
                      <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                      <AvatarFallback>OC</AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-xl font-semibold">Home</h1>
                      <p className="text-sm text-muted-foreground">{profile.name}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{profile.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2"><MapPin className="size-4" />{profile.location}</span>
                    <span className="inline-flex items-center gap-2"><Link2 className="size-4" />{profile.website}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card py-0 shadow-none">
                <CardContent className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-sm font-semibold">Top repositories</h2>
                    <Button variant="outline" size="sm" className="h-7 border-border bg-transparent text-xs">New</Button>
                  </div>
                  <div className="space-y-3">
                    {filteredRepositories.map((repository) => (
                      <button
                        key={repository.name}
                        type="button"
                        onClick={() => setSelectedRepository(repository.name)}
                        className={cn(
                          "w-full rounded-lg border border-border p-3 text-left transition-colors hover:bg-background",
                          selectedRepository === repository.name && "bg-background"
                        )}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-medium text-[#2f81f7]">{repository.name}</span>
                          <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">{repository.visibility}</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="size-2.5 rounded-full" style={{ backgroundColor: repository.language.color }} />
                          <span>{repository.language.name}</span>
                          <span>•</span>
                          <span>{repository.updatedAt}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>

            <section className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">Latest changes</h2>
                  <p className="text-sm text-muted-foreground">Stay up to date with stars, pushes, and releases.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-border bg-transparent">Filter</Button>
                  <Button variant="outline" size="sm" className="border-border bg-transparent">Customize</Button>
                </div>
              </div>

              <div className="space-y-4">
                {feedItems.map((item) => (
                  <Card key={item.id} className="border-border bg-card py-0 shadow-none">
                    <CardContent className="p-5">
                      <button
                        type="button"
                        onClick={() => setSelectedFeed(item.id)}
                        className="w-full text-left"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "mt-1 flex size-9 items-center justify-center rounded-full border border-border",
                              selectedFeed === item.id ? "bg-[#1f6feb] text-white" : "bg-background text-muted-foreground"
                            )}>
                              {item.action === "starred" ? <Star className="size-4" /> : null}
                              {item.action === "pushed to" ? <Home className="size-4" /> : null}
                              {item.action === "released" ? <Package className="size-4" /> : null}
                            </div>
                            <div>
                              <p className="text-sm leading-6">
                                <span className="font-semibold">{item.actor}</span> {item.action} <span className="font-semibold text-[#2f81f7]">{item.repo}</span>
                                {item.branch ? <span className="text-muted-foreground"> on {item.branch}</span> : null}
                              </p>
                              {item.summary ? <p className="mt-1 text-sm text-muted-foreground">{item.summary}</p> : null}
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                        </div>
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        ) : null}
      </main>
    </div>
  );
}

function GitHubUserProfile({
  state = "overview",
  selectedTab = "overview",
  repositoryCount = 16,
  profile = sharedProfile,
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
      <GitHubChrome username={profile.username} searchValue={searchValue} onSearchChange={setSearchValue} />

      <div className="mx-auto max-w-[1600px] px-4">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ProfileTab)} className="gap-0 border-b border-border">
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
                        {["2026", "2025", "2024", "2023"].map((year) => (
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

const viewOptions: { value: ViewName; label: string }[] = [
  { value: "github-home-dashboard", label: "GitHub Home Dashboard" },
  { value: "github-user-profile", label: "GitHub User Profile" },
];

export default function HomePage() {
  const [view, setView] = useState<ViewName>("github-home-dashboard");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/40">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="text-sm font-semibold">UI audit preview</p>
            <p className="text-xs text-muted-foreground">One route keeps both generated views available.</p>
          </div>
          <div className="flex items-center gap-2">
            {viewOptions.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={view === option.value ? "default" : "outline"}
                size="sm"
                className={cn(view !== option.value && "border-border bg-transparent")}
                onClick={() => setView(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {view === "github-home-dashboard" ? <GitHubHomeDashboard state="default" /> : null}
      {view === "github-user-profile" ? <GitHubUserProfile state="overview" /> : null}
    </div>
  );
}
