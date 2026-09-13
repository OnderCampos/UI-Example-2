"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  Building2,
  FolderKanban,
  Github,
  Globe,
  Home,
  Menu,
  Package,
  Plus,
  Search,
  Star,
  type LucideIcon,
  UsersRound,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type AppView = "dashboard-home-feed" | "user-profile-overview";
type ViewStateMap = {
  "dashboard-home-feed": "default";
  "user-profile-overview": "default";
};
type AppViewProps<T extends AppView> = {
  view: T;
  state?: ViewStateMap[T];
};

type ProfileTab = "overview" | "repositories" | "projects" | "packages" | "stars";
type ContributionYear = "2026" | "2025" | "2024" | "2023";

type UserProfileOverviewProps = {
  state?: ViewStateMap["user-profile-overview"];
  initialTab?: ProfileTab;
  initialYear?: ContributionYear;
};

type DashboardHomeFeedProps = {
  state?: ViewStateMap["dashboard-home-feed"];
};

type RepositoryItem = {
  name: string;
  description?: string;
  language: string;
  languageColor: string;
  type: "Public";
  forkedFrom?: string;
};

type FeedCard = {
  id: string;
  title: string;
  body: string;
  meta: string;
  action: string;
};

type ProfileTabItem = {
  value: ProfileTab;
  label: string;
  icon: LucideIcon;
  count?: string;
};

const profileTabs: ProfileTabItem[] = [
  { value: "overview", label: "Overview", icon: BookOpen },
  { value: "repositories", label: "Repositories", icon: Github, count: "16" },
  { value: "projects", label: "Projects", icon: FolderKanban },
  { value: "packages", label: "Packages", icon: Package },
  { value: "stars", label: "Stars", icon: Star },
];

const popularRepositories: RepositoryItem[] = [
  {
    name: "open-interpreter",
    forkedFrom: "Forked from openinterpreter/openinterpreter",
    description: "A natural language interface for computers",
    language: "Python",
    languageColor: "#388BFD",
    type: "Public",
  },
  {
    name: "CountBoxingSofttek",
    language: "Python",
    languageColor: "#388BFD",
    type: "Public",
  },
  {
    name: "count_colors",
    language: "Python",
    languageColor: "#388BFD",
    type: "Public",
  },
  {
    name: "pushtest",
    language: "Python",
    languageColor: "#388BFD",
    type: "Public",
  },
  {
    name: "SAP-Cleaning-Frontend",
    language: "TypeScript",
    languageColor: "#3178C6",
    type: "Public",
  },
  {
    name: "FridaProductPlannerWebBackend",
    language: "Python",
    languageColor: "#388BFD",
    type: "Public",
  },
];

const dashboardFeedCards: FeedCard[] = [
  {
    id: "1",
    title: "Morning standup summary",
    body: "Review sprint blockers, confirm the demo scope, and hand off the analytics notes to product.",
    meta: "Updated 12 minutes ago",
    action: "Open summary",
  },
  {
    id: "2",
    title: "Design review",
    body: "Compare the homepage card spacing against the latest token set and confirm hover treatments.",
    meta: "Today · 10:30 AM",
    action: "Review notes",
  },
  {
    id: "3",
    title: "Customer feedback",
    body: "Three new comments mention onboarding friction in the account setup flow and search discoverability.",
    meta: "3 unread insights",
    action: "See feedback",
  },
];

const achievements = [
  { emoji: "🌀", bg: "linear-gradient(135deg,#ffa7c4,#8ec5ff)" },
  { emoji: "🤠", bg: "linear-gradient(135deg,#ffcc66,#f97316)" },
  { emoji: "🧊", bg: "linear-gradient(135deg,#62c4ff,#1d4ed8)", count: "x2" },
  { emoji: "🫛", bg: "linear-gradient(135deg,#b8ffb4,#4ade80)" },
] as const;

const contributionLevels = ["#263040", "#0e4429", "#006d32", "#26a641", "#39d353"];
const monthLabels = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const yearOptions: ContributionYear[] = ["2026", "2025", "2024", "2023"];

function buildContributionGrid() {
  return Array.from({ length: 52 }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => {
      const seed = (week * 17 + day * 13 + 7) % 11;
      const level = seed <= 4 ? 0 : ((week + day * 2) % 4) + 1;
      return contributionLevels[level];
    })
  );
}

const contributionGrid = buildContributionGrid();

function ChromeHeader({
  title,
  searchValue,
  onSearchChange,
  tabs,
  activeTab,
  onTabChange,
}: {
  title: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  tabs?: ProfileTabItem[];
  activeTab?: ProfileTab;
  onTabChange?: (tab: ProfileTab) => void;
}) {
  return (
    <header className="border-b border-border bg-[linear-gradient(90deg,#0d131c_0%,#111926_50%,#0d131c_100%)]">
      <div className="mx-auto flex h-[72px] max-w-[1560px] items-center gap-4 px-4">
        <Button variant="outline" size="icon-sm" className="border-border bg-transparent hover:bg-secondary">
          <Menu className="size-4" />
        </Button>
        <Github className="size-8 text-foreground" />
        <span className="text-[20px] font-semibold">{title}</span>

        {tabs ? (
          <nav className="ml-4 flex items-center gap-1 self-end pb-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => onTabChange?.(tab.value)}
                className={cn(
                  "flex items-center gap-2 border-b-2 border-transparent px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  tab.value === activeTab && "border-[var(--warning)] text-foreground"
                )}
              >
                <tab.icon className="size-4" />
                {tab.label}
                {tab.count && (
                  <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[11px] leading-none text-foreground">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        ) : null}

        <div className="ml-auto flex items-center gap-2">
          <div className="relative w-[270px]">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Type / to search"
              className="h-8 border-border bg-transparent pr-3 pl-9 text-sm placeholder:text-muted-foreground"
            />
          </div>
          {tabs ? (
            Array.from({ length: 7 }).map((_, index) => (
              <Button
                key={`action-${index + 1}`}
                variant="outline"
                size="icon-sm"
                className="border-border bg-transparent hover:bg-secondary"
                aria-label={`Header action ${index + 1}`}
              >
                <span className="size-3 rounded-[3px] border border-muted-foreground/70" />
              </Button>
            ))
          ) : (
            <>
              <Button variant="outline" size="icon-sm" className="border-border bg-transparent hover:bg-secondary" aria-label="Go home">
                <Home className="size-4" />
              </Button>
              <Button variant="outline" size="icon-sm" className="border-border bg-transparent hover:bg-secondary" aria-label="Create new item">
                <Plus className="size-4" />
              </Button>
              <Button variant="outline" size="icon-sm" className="border-border bg-transparent hover:bg-secondary" aria-label="Notifications">
                <Bell className="size-4" />
              </Button>
            </>
          )}
          <Avatar className="size-8 border border-border">
            <AvatarImage src="/Frida.png" alt="OnderCampos" />
            <AvatarFallback>OC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

function RepositoryCard({ repository }: { repository: RepositoryItem }) {
  return (
    <Card className="gap-0 rounded-lg border-border bg-card py-0 shadow-[var(--shadow-card)]">
      <CardContent className="flex min-h-[102px] flex-col px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <button type="button" className="text-left text-[20px] leading-6 font-semibold text-[var(--link)] hover:underline">
            {repository.name}
          </button>
          <Badge variant="outline" className="rounded-full border-border px-2 py-0.5 text-[12px] text-muted-foreground">
            {repository.type}
          </Badge>
        </div>
        {repository.forkedFrom && (
          <div className="mt-1 text-[13px] text-muted-foreground underline decoration-muted-foreground/40 underline-offset-3">
            {repository.forkedFrom}
          </div>
        )}
        {repository.description && <p className="mt-4 text-[15px] text-foreground">{repository.description}</p>}
        <div className="mt-auto pt-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-3 rounded-full" style={{ backgroundColor: repository.languageColor }} />
            {repository.language}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function ContributionHeatmap({ selectedYear, onYearChange }: { selectedYear: ContributionYear; onYearChange: (year: ContributionYear) => void }) {
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[32px] leading-9 font-normal">471 contributions in the last year</h3>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <button type="button" className="hover:text-foreground">
            Contribution settings ▾
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        <Card className="flex-1 gap-0 rounded-lg border-border bg-background py-0 shadow-none">
          <CardContent className="px-5 py-4">
            <div className="mb-3 grid grid-cols-[32px_repeat(12,minmax(0,1fr))] items-center gap-x-4 text-xs text-muted-foreground">
              <div />
              {monthLabels.map((month) => (
                <div key={month}>{month}</div>
              ))}
            </div>
            <div className="grid grid-cols-[32px_1fr] gap-4">
              <div className="grid grid-rows-7 items-center text-xs text-muted-foreground">
                <span>Mon</span>
                <span />
                <span>Wed</span>
                <span />
                <span>Fri</span>
              </div>
              <div className="flex gap-[3px]">
                {contributionGrid.map((week, weekIndex) => (
                  <div key={`week-${selectedYear}-${weekIndex}`} className="grid gap-[3px]">
                    {week.map((color, dayIndex) => (
                      <button
                        key={`cell-${weekIndex}-${dayIndex}`}
                        type="button"
                        aria-label={`Contributions for week ${weekIndex + 1}, day ${dayIndex + 1}`}
                        className="size-[11px] rounded-[2px] border border-black/10"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <button type="button" className="hover:text-foreground">
                Learn how we count contributions
              </button>
              <div className="flex items-center gap-2">
                <span>Less</span>
                <div className="flex gap-[3px]">
                  {contributionLevels.map((level) => (
                    <span key={level} className="size-[10px] rounded-[2px]" style={{ backgroundColor: level }} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex w-[96px] flex-col gap-1 pt-[2px]">
          {yearOptions.map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => onYearChange(year)}
              className={cn(
                "rounded-md px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                year === selectedYear && "bg-[var(--link)] text-white hover:bg-[var(--link)]"
              )}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserProfileOverview({ state = "default", initialTab = "overview", initialYear = "2026" }: UserProfileOverviewProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>(initialTab);
  const [selectedYear, setSelectedYear] = useState<ContributionYear>(initialYear);
  const [searchValue, setSearchValue] = useState("");

  const visibleRepositories = useMemo(() => {
    if (activeTab !== "overview") return [];

    return popularRepositories.filter((repository) => {
      const haystack = `${repository.name} ${repository.description ?? ""} ${repository.language}`.toLowerCase();
      return haystack.includes(searchValue.toLowerCase());
    });
  }, [activeTab, searchValue]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ChromeHeader
        title="OnderCampos"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        tabs={profileTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="mx-auto max-w-[1180px] px-6 py-8">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ProfileTab)} className="gap-0">
          <TabsList className="hidden" />

          <div className="grid grid-cols-[296px_minmax(0,1fr)] gap-8">
            <aside>
              <div className="sticky top-8">
                <div className="relative mx-auto mb-6 size-[260px] overflow-hidden rounded-full border border-border bg-card shadow-[var(--shadow-card)]">
                  <Avatar className="size-full rounded-full">
                    <AvatarImage src="/Frida.png" alt="Onder Campos" className="object-cover" />
                    <AvatarFallback className="text-5xl">OC</AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    className="absolute right-3 bottom-8 flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-[var(--shadow-card)] hover:text-foreground"
                    aria-label="Status"
                  >
                    ◌
                  </button>
                </div>

                <div>
                  <h1 className="text-[48px] leading-[1.05] font-semibold tracking-[-0.02em]">Onder Francisco Campos Garcia</h1>
                  <div className="mt-2 text-[32px] leading-9 text-muted-foreground">OnderCampos</div>
                </div>

                <Button variant="outline" className="mt-6 h-9 w-full border-border bg-secondary px-4 text-sm font-semibold hover:bg-[#343d46]">
                  Edit profile
                </Button>

                <div className="mt-5 flex items-center gap-1 text-[15px] text-muted-foreground">
                  <UsersRound className="size-4" />
                  <button type="button" className="hover:text-foreground">2 followers</button>
                  <span>·</span>
                  <button type="button" className="hover:text-foreground">1 following</button>
                </div>

                <div className="mt-5 flex items-center gap-2 text-[15px] text-foreground">
                  <Building2 className="size-4 text-muted-foreground" />
                  <span>Softtek</span>
                </div>

                <Separator className="my-6" />

                <section>
                  <h2 className="text-[24px] font-semibold">Achievements</h2>
                  <div className="mt-4 flex gap-2">
                    {achievements.map((item, index) => (
                      <div key={`achievement-${index + 1}`} className="relative">
                        <div
                          className="flex size-14 items-center justify-center rounded-full border-2 border-white/30 text-[28px] shadow-[var(--shadow-card)]"
                          style={{ background: item.bg }}
                        >
                          {item.emoji}
                        </div>
                        {item.count && (
                          <span className="absolute right-[-4px] bottom-[-2px] rounded-full bg-[var(--warning)] px-1.5 py-0.5 text-[10px] font-bold text-black">
                            {item.count}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                <Separator className="my-6" />

                <section>
                  <h2 className="text-[24px] font-semibold">Organizations</h2>
                </section>
              </div>
            </aside>

            <section>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-[28px] leading-8 font-normal">Popular repositories</h2>
                <button type="button" className="text-sm text-[var(--link)] hover:underline">
                  Customize your pins
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {visibleRepositories.map((repository) => (
                  <RepositoryCard key={repository.name} repository={repository} />
                ))}
              </div>

              <ContributionHeatmap selectedYear={selectedYear} onYearChange={setSelectedYear} />

              <section className="mt-8">
                <h2 className="text-[34px] leading-10 font-normal">Contribution activity</h2>
                <div className="mt-5 flex items-center gap-4 text-sm">
                  <span className="font-semibold text-foreground">September 2026</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
              </section>
            </section>
          </div>

          <div className="sr-only">
            {state}
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="repositories">Repositories</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="stars">Stars</TabsTrigger>
          </div>
        </Tabs>
      </main>
    </div>
  );
}

function DashboardHomeFeed({ state = "default" }: DashboardHomeFeedProps) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCard, setSelectedCard] = useState<string>(dashboardFeedCards[0]?.id ?? "");

  const visibleCards = useMemo(() => {
    const query = searchValue.toLowerCase();
    return dashboardFeedCards.filter((card) => `${card.title} ${card.body} ${card.meta}`.toLowerCase().includes(query));
  }, [searchValue]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ChromeHeader title="Dashboard" searchValue={searchValue} onSearchChange={setSearchValue} />

      <main className="mx-auto max-w-[1180px] px-6 py-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Workspace overview</p>
            <h1 className="mt-2 text-5xl font-semibold tracking-[-0.03em]">Home feed</h1>
          </div>
          <Button className="h-10 rounded-md bg-primary px-4 font-semibold text-primary-foreground hover:bg-primary/90">
            New update
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="space-y-4">
            {visibleCards.map((card) => (
              <Card key={card.id} className={cn("border-border bg-card shadow-[var(--shadow-card)]", selectedCard === card.id && "ring-1 ring-ring")}>
                <CardContent className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{card.meta}</p>
                      <h2 className="mt-2 text-2xl font-semibold">{card.title}</h2>
                    </div>
                    <Button variant="outline" className="border-border bg-transparent hover:bg-secondary" onClick={() => setSelectedCard(card.id)}>
                      {selectedCard === card.id ? "Selected" : "Select"}
                    </Button>
                  </div>
                  <p className="max-w-[60ch] text-base text-muted-foreground">{card.body}</p>
                  <Button variant="ghost" className="px-0 text-[var(--link)] hover:bg-transparent hover:text-[var(--link)]">
                    {card.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </section>

          <aside className="space-y-4">
            <Card className="border-border bg-card shadow-[var(--shadow-card)]">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-full bg-secondary">
                    <Globe className="size-5 text-foreground" />
                  </div>
                  <div>
                    <h2 className="font-semibold">Team pulse</h2>
                    <p className="text-sm text-muted-foreground">Default dashboard snapshot</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <button type="button" className="rounded-md border border-border bg-background px-3 py-3 text-left hover:bg-secondary">
                    <div className="text-muted-foreground">Open tasks</div>
                    <div className="mt-1 text-2xl font-semibold">18</div>
                  </button>
                  <button type="button" className="rounded-md border border-border bg-background px-3 py-3 text-left hover:bg-secondary">
                    <div className="text-muted-foreground">Mentions</div>
                    <div className="mt-1 text-2xl font-semibold">6</div>
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card shadow-[var(--shadow-card)]">
              <CardContent className="space-y-3 p-5">
                <h2 className="text-lg font-semibold">Quick actions</h2>
                <Button variant="outline" className="w-full justify-start border-border bg-transparent hover:bg-secondary">Create task</Button>
                <Button variant="outline" className="w-full justify-start border-border bg-transparent hover:bg-secondary">Invite collaborator</Button>
                <Button variant="outline" className="w-full justify-start border-border bg-transparent hover:bg-secondary">Export notes</Button>
              </CardContent>
            </Card>
          </aside>
        </div>

        <div className="sr-only">{state}</div>
      </main>
    </div>
  );
}

function AppViewRenderer<T extends AppView>({ view, state }: AppViewProps<T>) {
  if (view === "dashboard-home-feed") {
    return <DashboardHomeFeed state={state as ViewStateMap["dashboard-home-feed"]} />;
  }

  return <UserProfileOverview state={state as ViewStateMap["user-profile-overview"]} />;
}

export default function HomePage() {
  return <AppViewRenderer view="user-profile-overview" state="default" />;
}
