"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  Building2,
  ChevronDown,
  GitBranch,
  Github,
  Home,
  Menu,
  Monitor,
  Package,
  Plus,
  Search,
  Star,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type GithubDashboardHomeState = "default";
type GithubUserProfileOverviewState = "default";
type AppView = "github-dashboard-home" | "github-user-profile-overview";
type ProfileTab = "Overview" | "Repositories" | "Projects" | "Packages" | "Stars";
type FeedTab = "For you" | "Following";

type Repository = {
  id: string;
  name: string;
  description?: string;
  source?: string;
  language: string;
  visibility: "Public" | "Private";
};

type ContributionMonth = {
  label: string;
  count: number;
};

type DashboardUpdate = {
  id: string;
  actor: string;
  repository: string;
  action: string;
  branch?: string;
  time: string;
};

type DashboardHomeProps = {
  state?: GithubDashboardHomeState;
  initialTab?: FeedTab;
  initialSearch?: string;
};

type GithubUserProfileOverviewProps = {
  state?: GithubUserProfileOverviewState;
  initialTab?: ProfileTab;
  initialYear?: string;
  initialSearch?: string;
};

const profileTabs: ProfileTab[] = ["Overview", "Repositories", "Projects", "Packages", "Stars"];
const feedTabs: FeedTab[] = ["For you", "Following"];
const availableViews: { value: AppView; label: string }[] = [
  { value: "github-dashboard-home", label: "GitHub dashboard home" },
  { value: "github-user-profile-overview", label: "GitHub user profile overview" },
];

const repositories: Repository[] = [
  {
    id: "1",
    name: "open-interpreter",
    source: "Forked from openinterpreter/openinterpreter",
    description: "A natural language interface for computers",
    language: "Python",
    visibility: "Public",
  },
  {
    id: "2",
    name: "CountBoxingSofttek",
    language: "Python",
    visibility: "Public",
  },
  {
    id: "3",
    name: "count_colors",
    language: "Python",
    visibility: "Public",
  },
  {
    id: "4",
    name: "pushtest",
    language: "Python",
    visibility: "Public",
  },
  {
    id: "5",
    name: "SAP-Cleaning-Frontend",
    language: "TypeScript",
    visibility: "Public",
  },
  {
    id: "6",
    name: "FridaProductPlannerWebBackend",
    language: "Python",
    visibility: "Public",
  },
];

const dashboardUpdates: DashboardUpdate[] = [
  {
    id: "1",
    actor: "OnderCampos",
    repository: "open-interpreter",
    action: "pushed 3 commits to",
    branch: "main",
    time: "2 hours ago",
  },
  {
    id: "2",
    actor: "octocat",
    repository: "github-dashboard-clone",
    action: "opened a pull request in",
    time: "Yesterday",
  },
  {
    id: "3",
    actor: "reactjs",
    repository: "react.dev",
    action: "released a new version in",
    time: "2 days ago",
  },
];

const contributionMonths: ContributionMonth[] = [
  { label: "Sep", count: 24 },
  { label: "Oct", count: 20 },
  { label: "Nov", count: 22 },
  { label: "Dec", count: 19 },
  { label: "Jan", count: 18 },
  { label: "Feb", count: 17 },
  { label: "Mar", count: 21 },
  { label: "Apr", count: 19 },
  { label: "May", count: 18 },
  { label: "Jun", count: 14 },
  { label: "Jul", count: 17 },
  { label: "Aug", count: 16 },
];

const contributionLevels = ["#212830", "#0e4429", "#006d32", "#26a641", "#39d353"];

const contributionGrid = [
  [0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 2, 1, 0, 0, 2, 0, 1, 0, 0, 0, 1, 0, 0, 0, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 2, 3, 0, 1, 0],
  [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 4, 2, 0, 0],
  [1, 0, 0, 1, 0, 0, 1, 0, 2, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 1, 0, 0, 1, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 3, 0, 1, 0],
  [2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 1, 0, 2, 0, 2, 1, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 0, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 2, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 3, 0, 0, 0, 1, 0, 2, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 1, 0, 2, 0, 0, 0, 1, 0, 0, 4, 1, 0, 0],
  [0, 2, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 0, 0, 1, 0, 3, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 3, 2, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 1, 0, 0, 1, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 2, 1, 0, 0],
];

function HeaderButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-8 items-center justify-center rounded-md border border-border bg-transparent px-2.5 text-foreground transition hover:bg-card",
        className,
      )}
    >
      {children}
    </button>
  );
}

function GithubTopBar({ search, onSearchChange }: { search: string; onSearchChange: (value: string) => void }) {
  return (
    <div className="flex h-[72px] items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          <HeaderButton className="w-8 px-0">
            <Menu className="h-4 w-4" />
          </HeaderButton>
          <Github className="h-8 w-8" />
          <span className="text-sm font-semibold">OnderCampos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-md border border-border bg-transparent px-3 lg:flex lg:w-[320px]">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Type / to search"
              className="h-8 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
            />
          </div>
          <HeaderButton>
            <div className="grid h-4 w-4 grid-cols-2 gap-0.5">
              <span className="rounded-[1px] bg-muted-foreground" />
              <span className="rounded-[1px] bg-muted-foreground" />
              <span className="rounded-[1px] bg-muted-foreground" />
              <span className="rounded-[1px] bg-muted-foreground" />
            </div>
          </HeaderButton>
          <HeaderButton className="w-8 px-0">
            <Plus className="h-4 w-4" />
          </HeaderButton>
          <HeaderButton className="w-8 px-0">
            <Bell className="h-4 w-4" />
          </HeaderButton>
          <HeaderButton className="w-8 px-0">
            <GitBranch className="h-4 w-4" />
          </HeaderButton>
          <HeaderButton className="w-8 px-0">
            <Monitor className="h-4 w-4" />
          </HeaderButton>
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src="/Frida.png" alt="OnderCampos avatar" />
            <AvatarFallback>OC</AvatarFallback>
          </Avatar>
        </div>
      </div>
  );
}

function ProfileNav({ selectedTab, onTabChange }: { selectedTab: ProfileTab; onTabChange: (tab: ProfileTab) => void }) {
  const tabMeta = {
    Overview: { icon: BookOpen },
    Repositories: { icon: BookOpen, badge: "16" },
    Projects: { icon: Monitor },
    Packages: { icon: Package },
    Stars: { icon: Star },
  } as const;

  return (
    <Tabs value={selectedTab} onValueChange={(value) => onTabChange(value as ProfileTab)} className="gap-0">
      <TabsList className="h-auto w-full justify-start gap-2 rounded-none bg-transparent p-0 text-sm">
        {profileTabs.map((tab) => {
          const Icon = tabMeta[tab].icon;
          return (
            <TabsTrigger
              key={tab}
              value={tab}
              className="h-12 rounded-none border-x-0 border-t-0 border-b-2 border-transparent px-3 text-sm font-medium text-muted-foreground data-[state=active]:border-b-[#f78166] data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              <Icon className="h-4 w-4" />
              {tab}
              {"badge" in tabMeta[tab] ? (
                <span className="ml-1 rounded-full bg-card px-1.5 py-0.5 text-[11px] leading-none text-foreground">
                  {tabMeta[tab].badge}
                </span>
              ) : null}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}

function PopularRepositoryCard({ repo }: { repo: Repository }) {
  return (
    <Card className="gap-0 rounded-md border-border bg-background py-0 shadow-none">
      <CardContent className="flex h-full min-h-[118px] flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-[#2f81f7]">{repo.name}</h3>
            {repo.source ? <p className="mt-1 text-xs text-muted-foreground">{repo.source}</p> : null}
          </div>
          <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">{repo.visibility}</span>
        </div>
        {repo.description ? <p className="mb-4 text-sm text-muted-foreground">{repo.description}</p> : <div className="flex-1" />}
        <div className="mt-auto flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className={cn("h-3 w-3 rounded-full", repo.language === "TypeScript" ? "bg-[#3178c6]" : "bg-[#3572a5]")} />
          {repo.language}
        </div>
      </CardContent>
    </Card>
  );
}

function ContributionHeatmap() {
  return (
    <Card className="gap-0 rounded-md border-border bg-background py-0 shadow-none">
      <CardContent className="p-4">
        <div className="mb-3 flex items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex-1" />
          <div className="flex items-center gap-1">
            Contribution settings
            <ChevronDown className="h-3.5 w-3.5" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[650px]">
            <div className="mb-1 ml-11 grid grid-cols-12 gap-4 text-xs text-muted-foreground">
              {contributionMonths.map((month) => (
                <span key={month.label}>{month.label}</span>
              ))}
            </div>
            <div className="flex gap-3">
              <div className="grid w-8 grid-rows-7 text-xs text-muted-foreground">
                <span className="row-start-2">Mon</span>
                <span className="row-start-4">Wed</span>
                <span className="row-start-6">Fri</span>
              </div>
              <div className="grid grid-rows-7 gap-1">
                {contributionGrid.map((row, rowIndex) => (
                  <div key={`row-${rowIndex}`} className="grid grid-cols-52 gap-1">
                    {row.map((level, columnIndex) => (
                      <span
                        key={`${rowIndex}-${columnIndex}`}
                        className="h-[10px] w-[10px] rounded-[2px] border border-black/10"
                        style={{ backgroundColor: contributionLevels[level] }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <button type="button" className="hover:text-foreground">
            Learn how we count contributions
          </button>
          <div className="flex items-center gap-1">
            <span>Less</span>
            {contributionLevels.map((color) => (
              <span key={color} className="h-[10px] w-[10px] rounded-[2px]" style={{ backgroundColor: color }} />
            ))}
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function GithubDashboardHome({ state = "default", initialTab = "For you", initialSearch = "" }: DashboardHomeProps) {
  const [selectedTab, setSelectedTab] = useState<FeedTab>(initialTab);
  const [search, setSearch] = useState(initialSearch);
  const [selectedFilter, setSelectedFilter] = useState("Repositories");

  const filteredUpdates = useMemo(
    () => dashboardUpdates.filter((item) => item.repository.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  return (
    <div data-state={state} className="min-h-screen bg-background text-foreground [color-scheme:dark]">
      <GithubTopBar search={search} onSearchChange={setSearch} />
      <main className="mx-auto max-w-[1280px] px-6 py-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-[32px] font-semibold tracking-[-0.02em]">Home</h1>
            <p className="mt-1 text-sm text-muted-foreground">Stay updated on activity from the repositories and people you follow.</p>
          </div>
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="h-9 w-[170px] border-border bg-card text-sm text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-border bg-card text-foreground">
              <SelectItem value="Repositories">Repositories</SelectItem>
              <SelectItem value="Stars">Stars</SelectItem>
              <SelectItem value="People">People</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as FeedTab)} className="gap-0">
          <TabsList className="mb-6 h-auto justify-start rounded-lg bg-card p-1">
            {feedTabs.map((tab) => (
              <TabsTrigger key={tab} value={tab} className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)_280px]">
          <aside className="space-y-6">
            <Card className="border-border bg-card shadow-none">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src="/Frida.png" alt="OnderCampos avatar" />
                    <AvatarFallback>OC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">OnderCampos</p>
                    <p className="text-xs text-muted-foreground">Developer</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 h-8 w-full border-border bg-background font-semibold hover:bg-background/80">
                  Create repository
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-card shadow-none">
              <CardContent className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-semibold">Top repositories</h2>
                  <button type="button" className="text-xs text-[#2f81f7] hover:underline">View all</button>
                </div>
                <div className="space-y-3">
                  {repositories.slice(0, 4).map((repo) => (
                    <div key={repo.id} className="rounded-md border border-border bg-background p-3">
                      <p className="text-sm font-semibold text-[#2f81f7]">{repo.name}</p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className={cn("h-3 w-3 rounded-full", repo.language === "TypeScript" ? "bg-[#3178c6]" : "bg-[#3572a5]")} />
                        {repo.language}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          <section className="space-y-4">
            {filteredUpdates.map((item) => (
              <Card key={item.id} className="border-border bg-card shadow-none">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background">
                      <Home className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-6 text-foreground">
                        <span className="font-semibold">{item.actor}</span> {item.action}{" "}
                        <span className="font-semibold text-[#2f81f7]">{item.repository}</span>
                        {item.branch ? (
                          <>
                            {" "}on <span className="rounded-full border border-border px-2 py-0.5 text-xs">{item.branch}</span>
                          </>
                        ) : null}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{item.time}</p>
                    </div>
                    <Button variant="ghost" className="h-8 px-3 text-sm text-muted-foreground hover:text-foreground">Star</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          <aside className="space-y-6">
            <Card className="border-border bg-card shadow-none">
              <CardContent className="p-4">
                <h2 className="text-sm font-semibold">Latest changes</h2>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <p>Review pull requests faster with code review assignment settings.</p>
                  <p>Explore the latest repository discussions from your teams.</p>
                  <p>Security updates and Dependabot alerts appear here.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border bg-card shadow-none">
              <CardContent className="p-4">
                <h2 className="text-sm font-semibold">Explore repositories</h2>
                <div className="mt-4 space-y-3">
                  {repositories.slice(2, 5).map((repo) => (
                    <div key={repo.id} className="rounded-md border border-border bg-background p-3">
                      <p className="text-sm font-semibold text-[#2f81f7]">{repo.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{repo.description ?? "No description provided."}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}

function GithubUserProfileOverview({
  state = "default",
  initialTab = "Overview",
  initialYear = "2026",
  initialSearch = "",
}: GithubUserProfileOverviewProps) {
  const [selectedTab, setSelectedTab] = useState<ProfileTab>(initialTab);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [search, setSearch] = useState(initialSearch);

  const filteredRepositories = useMemo(
    () => repositories.filter((repo) => repo.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  return (
    <div data-state={state} className="min-h-screen bg-background text-foreground [color-scheme:dark]">
      <header className="border-b border-border bg-[linear-gradient(90deg,#0d1624_0%,#151b23_100%)]">
        <GithubTopBar search={search} onSearchChange={setSearch} />
        <div className="px-4">
          <ProfileNav selectedTab={selectedTab} onTabChange={setSelectedTab} />
        </div>
      </header>
      <main className="mx-auto max-w-[1160px] px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-[296px_minmax(0,1fr)_88px]">
          <aside>
            <div className="sticky top-8">
              <div className="relative mb-4 h-[296px] w-[296px] overflow-hidden rounded-full border border-border bg-card">
                <Image src="/Frida.png" alt="Onder Francisco Campos Garcia" fill className="object-cover" />
                <button
                  type="button"
                  aria-label="Profile status"
                  className="absolute bottom-8 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-[var(--shadow-card)] hover:text-foreground"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true"><path fill="currentColor" d="M8 1.5a6.5 6.5 0 1 0 0 13a6.5 6.5 0 0 0 0-13Zm0 1a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11Zm0 2a.75.75 0 0 1 .75.75v2.19l1.28 1.28a.75.75 0 1 1-1.06 1.06L7.47 8.22A.75.75 0 0 1 7.25 7.7V5.25A.75.75 0 0 1 8 4.5Z" /></svg>
                </button>
              </div>
              <h1 className="text-[39px] font-semibold leading-[1.1] tracking-[-0.02em]">Onder Francisco Campos Garcia</h1>
              <p className="mt-1 text-[26px] font-light text-muted-foreground">OnderCampos</p>
              <Button variant="outline" className="mt-4 h-8 w-full border-border bg-card text-sm font-semibold hover:bg-[#30363d]">
                Edit profile
              </Button>
              <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span><span className="text-foreground">2</span> followers · <span className="text-foreground">1</span> following</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-foreground">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                Softtek
              </div>
              <div className="mt-6 border-t border-border pt-5">
                <h2 className="mb-3 text-xl font-semibold">Achievements</h2>
                <div className="flex items-center gap-2">
                  {[
                    ["#f8a8d8", "✨"],
                    ["#f7c95c", "🤠"],
                    ["#7ec8ff", "🐺"],
                    ["#a7ef8a", "🫛"],
                  ].map(([background, emoji], index) => (
                    <div key={`${background}-${emoji}`} className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/15 text-3xl" style={{ backgroundColor: background }}>
                        {emoji}
                      </div>
                      {index === 2 ? <span className="absolute -bottom-1 right-0 rounded-full bg-[#d18616] px-1.5 text-[10px] font-bold text-black">x2</span> : null}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 border-t border-border pt-5">
                <h2 className="text-xl font-semibold">Organizations</h2>
              </div>
            </div>
          </aside>

          <section>
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="text-2xl font-normal">Popular repositories</h2>
              <button type="button" className="text-xs text-[#2f81f7] hover:underline">Customize your pins</button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {filteredRepositories.map((repo) => (
                <PopularRepositoryCard key={repo.id} repo={repo} />
              ))}
            </div>

            <div className="mt-8">
              <h2 className="mb-3 text-[32px] font-normal leading-none">471 contributions in the last year</h2>
              <ContributionHeatmap />
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-[32px] font-normal leading-none">Contribution activity</h2>
              <div className="border-t border-border pt-4 text-sm font-semibold text-[#2f81f7]">September 2026</div>
            </div>
          </section>

          <aside className="pt-[424px]">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="mb-3 h-8 w-full border-[#1f6feb] bg-[#1f6feb] text-sm font-medium text-white hover:bg-[#1158c7] focus-visible:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-border bg-card text-foreground">
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
            <div className="space-y-4 pl-3 text-sm text-muted-foreground">
              {["2025", "2024", "2023"].map((year) => (
                <button key={year} type="button" onClick={() => setSelectedYear(year)} className="block hover:text-foreground">
                  {year}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default function HomePage() {
  const [view, setView] = useState<AppView>("github-dashboard-home");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/70 px-6 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Generated views</p>
            <p className="text-sm text-muted-foreground">Audit switcher for the implemented GitHub screens.</p>
          </div>
          <Select value={view} onValueChange={(value) => setView(value as AppView)}>
            <SelectTrigger className="h-9 w-[290px] border-border bg-background text-sm text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-border bg-card text-foreground">
              {availableViews.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {view === "github-dashboard-home" ? <GithubDashboardHome state="default" /> : <GithubUserProfileOverview state="default" />}
    </div>
  );
}
