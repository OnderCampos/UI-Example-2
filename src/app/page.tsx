"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Bell,
  BookMarked,
  BookOpen,
  Boxes,
  Building2,
  ChevronDown,
  Circle,
  GitBranch,
  Github,
  LayoutGrid,
  Link as LinkIcon,
  MapPin,
  Menu,
  Monitor,
  Package,
  Plus,
  Search,
  Settings,
  SmilePlus,
  Star,
  Users,
  BadgeCheck,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type ViewId = "github-dashboard-home" | "github-user-profile-overview";
type GithubDashboardHomeState = "default";
type GithubUserProfileOverviewState = "default";
type ProfileTab = "overview" | "repositories" | "projects" | "packages" | "stars";

type Repository = {
  name: string;
  description?: string;
  language: string;
  languageColor: string;
  visibility: "Public";
  forkedFrom?: string;
};

type TrendingRepository = {
  rank: string;
  name: string;
  language: string;
  languageColor: string;
  starsToday: string;
};

type FeedItem = {
  id: string;
  actor: string;
  action: string;
  repository: string;
  time: string;
  branch?: string;
  commits?: string[];
};

type DashboardEventFilter = "for-you" | "following";

type GithubDashboardHomeProps = {
  state?: GithubDashboardHomeState;
};

type GithubUserProfileOverviewProps = {
  state?: GithubUserProfileOverviewState;
  initialTab?: ProfileTab;
  repositoryCount?: number;
};

const profileTabs: Array<{ value: ProfileTab; label: string; icon: typeof BookOpen; count?: number }> = [
  { value: "overview", label: "Overview", icon: BookOpen },
  { value: "repositories", label: "Repositories", icon: BookMarked, count: 16 },
  { value: "projects", label: "Projects", icon: LayoutGrid },
  { value: "packages", label: "Packages", icon: Package },
  { value: "stars", label: "Stars", icon: Star },
];

const repositories: Repository[] = [
  {
    name: "open-interpreter",
    description: "A natural language interface for computers",
    language: "Python",
    languageColor: "#388bfd",
    visibility: "Public",
    forkedFrom: "Forked from openinterpreter/openinterpreter",
  },
  {
    name: "CountBoxingSofttek",
    language: "Python",
    languageColor: "#388bfd",
    visibility: "Public",
  },
  {
    name: "count_colors",
    language: "Python",
    languageColor: "#388bfd",
    visibility: "Public",
  },
  {
    name: "pushtest",
    language: "Python",
    languageColor: "#388bfd",
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
    languageColor: "#388bfd",
    visibility: "Public",
  },
];

const trendingRepositories: TrendingRepository[] = [
  {
    rank: "1",
    name: "microsoft/vscode",
    language: "TypeScript",
    languageColor: "#3178c6",
    starsToday: "1,204 stars today",
  },
  {
    rank: "2",
    name: "anthropics/claude-code",
    language: "Go",
    languageColor: "#00add8",
    starsToday: "842 stars today",
  },
  {
    rank: "3",
    name: "vercel/next.js",
    language: "JavaScript",
    languageColor: "#f1e05a",
    starsToday: "796 stars today",
  },
];

const feedItems: FeedItem[] = [
  {
    id: "1",
    actor: "torvalds",
    action: "pushed to",
    repository: "torvalds/linux",
    time: "3 hours ago",
    branch: "master",
    commits: [
      "Merge tag 'for-linus' of git://git.kernel.org/pub/scm/linux/kernel/git/soc/soc",
      "Merge tag 'drm-next-2026-09-10' of git://anongit.freedesktop.org/drm/drm",
    ],
  },
  {
    id: "2",
    actor: "vercel",
    action: "released",
    repository: "vercel/next.js",
    time: "Yesterday",
  },
  {
    id: "3",
    actor: "shadcn",
    action: "starred",
    repository: "tailwindlabs/tailwindcss",
    time: "2 days ago",
  },
];

const monthLabels = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const yearOptions = ["2026", "2025", "2024", "2023"];
const contributionRows = ["Mon", "Wed", "Fri"];
const contributionLegend = [0, 1, 2, 3, 4];

const contributionMatrix = [
  [0,0,0,1,2,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,2,2,0,0,0,1,2,0,0,0,0,0,0,1,1,0,0,0,1,2,3,2,0,0,0,0],
  [0,1,1,0,1,0,0,1,0,0,1,0,0,0,0,1,1,1,0,2,0,0,1,1,0,1,2,1,0,0,1,1,0,0,0,1,2,0,0,0,1,1,0,0,0,0,3,4,2,0,0,0],
  [2,1,0,0,0,0,1,1,0,1,0,0,0,0,1,1,0,0,1,1,0,1,0,2,0,0,1,0,1,0,1,2,0,0,0,0,2,1,0,0,0,0,1,1,0,0,4,2,1,0,0,0],
  [1,1,0,0,0,1,0,0,1,0,0,1,0,0,2,2,0,0,1,0,1,0,1,1,0,0,1,1,0,0,0,1,0,0,1,0,0,0,1,1,0,0,1,0,0,0,3,4,2,0,0,0],
  [0,0,1,0,0,1,0,1,0,0,0,0,1,0,1,0,0,1,0,0,1,0,1,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,1,0,1,0,0,1,4,3,2,1,0,0],
  [1,1,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,1,0,1,2,0,0,0,1,0,1,0,1,1,0,0,0,0,0,1,1,0,0,0,1,0,0,0,3,2,1,0,0,0],
  [0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,2,0,1,0,0,1,0,1,0,0,1,0,0,1,0,2,3,1,0,0,0],
];

const levelColors = ["#212830", "#0e4429", "#006d32", "#26a641", "#39d353"];

function GithubTopBar() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="border-b border-border bg-background">
      <div className="flex h-16 items-center gap-3 px-4 text-sm">
        <Button variant="ghost" size="icon-sm" className="size-8 rounded-md border border-border bg-transparent hover:bg-card hover:text-foreground">
          <Menu className="size-4" />
        </Button>
        <Github className="size-8 text-foreground" />
        <span className="hidden font-semibold text-foreground sm:inline">OnderCampos</span>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Type / to search"
              className="h-8 w-[240px] rounded-md bg-background pl-9 text-sm shadow-none"
            />
          </div>
          <TopbarIcon icon={LayoutGrid} />
          <TopbarIcon icon={Plus} withChevron />
          <TopbarIcon icon={Bell} />
          <TopbarIcon icon={GitBranch} />
          <TopbarIcon icon={Monitor} />
          <TopbarIcon icon={Boxes} />
          <div className="relative">
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-[#2f81f7]" />
            <Avatar className="size-8 border border-border">
              <AvatarImage src="/Frida.png" alt="OnderCampos" />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}

function TopbarIcon({ icon: Icon, withChevron = false }: { icon: typeof Menu; withChevron?: boolean }) {
  return (
    <Button variant="ghost" size="icon-sm" className="size-8 rounded-md border border-border bg-transparent px-0 text-muted-foreground hover:bg-card hover:text-foreground">
      <Icon className="size-4" />
      {withChevron ? <ChevronDown className="size-3" /> : null}
    </Button>
  );
}

function DashboardSidebar() {
  const [startRepo, setStartRepo] = useState("");

  return (
    <aside className="space-y-6">
      <Card className="gap-0 rounded-lg border-border bg-card py-0 shadow-[var(--shadow-card)]">
        <CardContent className="p-4">
          <h2 className="text-base font-semibold text-foreground">Home</h2>
          <p className="mt-1 text-sm text-muted-foreground">Stay in the loop with updates from the people and repositories you follow.</p>
          <Button className="mt-4 h-8 rounded-md bg-[#238636] px-3 text-sm font-semibold text-white hover:bg-[#2ea043]">Explore repositories</Button>
        </CardContent>
      </Card>

      <Card className="gap-0 rounded-lg border-border bg-card py-0 shadow-[var(--shadow-card)]">
        <CardContent className="p-4">
          <h3 className="text-sm font-semibold text-foreground">Start a new repository</h3>
          <Input
            value={startRepo}
            onChange={(event) => setStartRepo(event.target.value)}
            placeholder="Name your repository"
            className="mt-3 h-9 bg-background"
          />
          <Button variant="secondary" className="mt-3 h-8 w-full rounded-md border border-border bg-background text-sm font-medium hover:bg-accent">
            Create repository
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}

function ActivityFeed() {
  const [filter, setFilter] = useState<DashboardEventFilter>("for-you");

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Home</h1>
          <p className="mt-1 text-sm text-muted-foreground">Stories, updates, and activity from your GitHub network.</p>
        </div>
        <div className="flex gap-2 rounded-md border border-border bg-card p-1">
          {(["for-you", "following"] as const).map((option) => {
            const isActive = filter === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm capitalize transition-colors",
                  isActive ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {option === "for-you" ? "For you" : "Following"}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {feedItems.map((item) => (
          <Card key={item.id} className="gap-0 rounded-lg border-border bg-card py-0 shadow-[var(--shadow-card)]">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="size-10 border border-border">
                  <AvatarFallback>{item.actor.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{item.actor}</span> {item.action} <span className="font-semibold text-[#2f81f7]">{item.repository}</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.time}</p>
                  {item.branch ? <p className="mt-3 text-xs text-muted-foreground">{item.branch}</p> : null}
                  {item.commits ? (
                    <div className="mt-3 space-y-2 rounded-md border border-border bg-background p-3">
                      {item.commits.map((commit) => (
                        <div key={commit} className="flex items-start gap-2 text-sm text-foreground">
                          <GitBranch className="mt-0.5 size-4 text-muted-foreground" />
                          <span>{commit}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function TrendingSidebar() {
  return (
    <aside>
      <Card className="gap-0 rounded-lg border-border bg-card py-0 shadow-[var(--shadow-card)]">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-foreground">Trending repositories</h2>
            <Settings className="size-4 text-muted-foreground" />
          </div>
          <div className="mt-4 space-y-4">
            {trendingRepositories.map((repository) => (
              <div key={repository.name} className="rounded-md border border-transparent p-2 transition-colors hover:border-border hover:bg-background">
                <p className="text-xs text-muted-foreground">{repository.rank}</p>
                <button type="button" className="mt-1 text-left text-sm font-semibold text-[#2f81f7] hover:underline">
                  {repository.name}
                </button>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: repository.languageColor }} />
                  <span>{repository.language}</span>
                  <span>•</span>
                  <span>{repository.starsToday}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

function GithubDashboardHome({ state = "default" }: GithubDashboardHomeProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <GithubTopBar />
      <main className="mx-auto max-w-[1280px] px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
          <DashboardSidebar />
          <ActivityFeed />
          <TrendingSidebar />
        </div>
      </main>
    </div>
  );
}

function RepositoryCard({ repository }: { repository: Repository }) {
  return (
    <Card className="gap-0 rounded-lg border-border bg-card py-0 shadow-[var(--shadow-card)]">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <button type="button" className="truncate text-left text-[20px] font-semibold text-[#2f81f7] hover:underline">
              {repository.name}
            </button>
            {repository.forkedFrom ? (
              <p className="mt-1 text-xs text-muted-foreground">
                <span className="border-b border-dashed border-muted-foreground/70">{repository.forkedFrom}</span>
              </p>
            ) : null}
          </div>
          <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">{repository.visibility}</span>
        </div>
        {repository.description ? <p className="mt-4 text-sm text-muted-foreground">{repository.description}</p> : <div className="mt-4 h-[21px]" />}
        <div className="mt-5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <span className="size-3 rounded-full" style={{ backgroundColor: repository.languageColor }} />
          <span>{repository.language}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function ContributionsHeatmap() {
  const [selectedYear, setSelectedYear] = useState("2026");

  return (
    <section className="mt-8">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-[20px] font-semibold text-foreground">471 contributions in the last year</h2>
        <div className="flex items-center gap-6">
          <button type="button" className="text-sm text-muted-foreground hover:text-foreground">Contribution settings ▾</button>
          <div className="hidden flex-col gap-2 text-sm lg:flex">
            {yearOptions.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className={cn(
                  "w-24 rounded-md px-4 py-2 text-left transition-colors",
                  selectedYear === year ? "bg-[#2f81f7] text-white" : "text-muted-foreground hover:bg-card hover:text-foreground"
                )}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <div className="mb-3 grid grid-cols-[28px_1fr] gap-3">
          <div />
          <div className="grid grid-cols-12 gap-2 text-xs text-muted-foreground">
            {monthLabels.map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[28px_1fr] gap-3">
          <div className="grid grid-rows-7 gap-[3px] text-xs text-muted-foreground">
            {Array.from({ length: 7 }).map((_, index) => (
              <span key={`label-${index}`} className="flex h-3 items-center">
                {contributionRows[Math.floor(index / 2)] ?? ""}
              </span>
            ))}
          </div>

          <div className="grid grid-rows-7 gap-[3px]">
            {contributionMatrix.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="grid grid-cols-52 gap-[3px]">
                {row.map((level, cellIndex) => (
                  <button
                    key={`cell-${rowIndex}-${cellIndex}`}
                    type="button"
                    className="h-3 w-3 rounded-[2px] border border-black/10 transition-transform hover:scale-110"
                    style={{ backgroundColor: levelColors[level] }}
                    aria-label={`Contribution level ${level}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <button type="button" className="hover:text-foreground">Learn how we count contributions</button>
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="flex items-center gap-1">
              {contributionLegend.map((level) => (
                <span key={level} className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: levelColors[level] }} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-[20px] font-semibold text-foreground">Contribution activity</h3>
        <div className="mt-4 flex items-center gap-4 border-b border-border pb-3">
          <span className="text-sm font-semibold text-foreground">September 2026</span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
    </section>
  );
}

function GithubUserProfileOverview({ state = "default", initialTab = "overview", repositoryCount = 16 }: GithubUserProfileOverviewProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>(initialTab);

  const activeTabs = useMemo(
    () => profileTabs.map((tab) => (tab.value === "repositories" ? { ...tab, count: repositoryCount } : tab)),
    [repositoryCount]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GithubTopBar />

      <nav className="border-b border-border bg-background px-4">
        <div className="mx-auto flex max-w-[1280px] items-center gap-1 overflow-x-auto">
          {activeTabs.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={cn(
                  "flex h-12 items-center gap-2 border-b-2 px-4 text-sm whitespace-nowrap transition-colors",
                  isActive
                    ? "border-[#f78166] text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                )}
              >
                <tab.icon className="size-4" />
                <span>{tab.label}</span>
                {tab.count ? <span className="rounded-full bg-card px-1.5 py-0.5 text-xs">{tab.count}</span> : null}
              </button>
            );
          })}
        </div>
      </nav>

      <main className="mx-auto grid max-w-[1280px] gap-8 px-4 py-8 lg:grid-cols-[296px_minmax(0,1fr)]">
        <aside>
          <div className="sticky top-8">
            <div className="relative mx-auto w-fit lg:mx-0">
              <Avatar className="size-[296px] border border-border shadow-[var(--shadow-card)]">
                <AvatarImage src="/Frida.png" alt="OnderCampos profile" className="object-cover" />
                <AvatarFallback className="text-4xl">OC</AvatarFallback>
              </Avatar>
              <button type="button" className="absolute bottom-7 right-4 flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-[var(--shadow-card)] hover:text-foreground">
                <SmilePlus className="size-4" />
              </button>
            </div>

            <div className="mt-5">
              <h1 className="text-[44px] leading-[1.1] font-semibold tracking-[-0.02em] text-foreground">Onder Francisco Campos Garcia</h1>
              <p className="mt-1 text-[32px] leading-[1.2] text-muted-foreground">OnderCampos</p>
            </div>

            <Button variant="secondary" className="mt-5 h-8 w-full rounded-md border border-border bg-card text-sm font-semibold hover:bg-[#2e353e]">
              Edit profile
            </Button>

            <div className="mt-5 flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="size-4" />
              <span><strong className="font-semibold text-foreground">2</strong> followers</span>
              <span>·</span>
              <span><strong className="font-semibold text-foreground">1</strong> following</span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-foreground">
              <Building2 className="size-4 text-muted-foreground" />
              <span>Softtek</span>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5"><MapPin className="size-4" /><span>Monterrey, Mexico</span></div>
              <div className="flex items-center gap-1.5"><LinkIcon className="size-4" /><span>github.com/OnderCampos</span></div>
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <h2 className="text-[20px] font-semibold text-foreground">Achievements</h2>
              <div className="mt-3 flex items-center gap-2">
                <Achievement icon="🌀" bg="linear-gradient(135deg,#ffb8d1,#d1a8ff)" />
                <Achievement icon="🤠" bg="linear-gradient(135deg,#ffe08a,#ffb341)" />
                <div className="relative">
                  <Achievement icon="🧊" bg="linear-gradient(135deg,#86d9ff,#4285f4)" />
                  <span className="absolute -bottom-1 -right-1 rounded-full bg-[#d29922] px-1.5 py-0.5 text-[10px] font-semibold text-black">x2</span>
                </div>
                <Achievement icon="🥒" bg="linear-gradient(135deg,#a7f3d0,#65a30d)" />
              </div>
            </div>

            <div className="mt-5 border-t border-border pt-5">
              <h2 className="text-[20px] font-semibold text-foreground">Organizations</h2>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-md border border-border bg-card text-xs font-semibold text-foreground">S</div>
                <div className="flex size-8 items-center justify-center rounded-md border border-border bg-card text-xs font-semibold text-foreground">F</div>
              </div>
            </div>
          </div>
        </aside>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[20px] font-semibold text-foreground">Popular repositories</h2>
            <button type="button" className="text-sm text-[#2f81f7] hover:underline">Customize your pins</button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {repositories.map((repository) => (
              <RepositoryCard key={repository.name} repository={repository} />
            ))}
          </div>

          <ContributionsHeatmap />
        </section>
      </main>
    </div>
  );
}

function Achievement({ icon, bg }: { icon: string; bg: string }) {
  return (
    <div className="flex size-[52px] items-center justify-center rounded-full border border-border text-2xl shadow-[var(--shadow-card)]" style={{ background: bg }}>
      {icon}
    </div>
  );
}

export default function HomePage() {
  const [view, setView] = useState<ViewId>("github-user-profile-overview");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-card/60 px-4 py-3">
        <div className="mx-auto flex max-w-[1280px] items-center gap-2">
          <Button
            variant={view === "github-dashboard-home" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setView("github-dashboard-home")}
            className="border border-border"
          >
            github-dashboard-home
          </Button>
          <Button
            variant={view === "github-user-profile-overview" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setView("github-user-profile-overview")}
            className="border border-border"
          >
            github-user-profile-overview
          </Button>
        </div>
      </div>
      {view === "github-dashboard-home" ? <GithubDashboardHome state="default" /> : <GithubUserProfileOverview state="default" />}
    </div>
  );
}
