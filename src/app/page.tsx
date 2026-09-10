"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  FolderKanban,
  Github,
  Home,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type SupportedView = "dashboard-home-feed" | "user-profile-overview";

type DashboardHomeFeedState = "default";
type UserProfileOverviewState = "default";

type AppState = DashboardHomeFeedState | UserProfileOverviewState;

type ProfileRepository = {
  name: string;
  description?: string;
  language: string;
  languageColor: string;
  forkedFrom?: string;
  visibility: "Public";
};

type FeedRepository = {
  name: string;
  description: string;
  language: string;
  updatedAt: string;
  stars?: string;
};

type ActivityItem = {
  title: string;
  subtitle: string;
  meta: string;
};

type ContributionLevel = 0 | 1 | 2 | 3 | 4;

type ContributionWeek = {
  month?: string;
  days: ContributionLevel[];
};

type HomePageProps = {
  view?: SupportedView;
  state?: AppState;
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

const feedRepositories: FeedRepository[] = [
  {
    name: "llm-dashboard-kit",
    description: "Reusable components and fixtures for experimentation dashboards.",
    language: "TypeScript",
    updatedAt: "Updated 4 hours ago",
    stars: "128",
  },
  {
    name: "prompt-lab",
    description: "A collection of prompt patterns, evaluations, and output snapshots.",
    language: "Python",
    updatedAt: "Updated yesterday",
    stars: "54",
  },
  {
    name: "motion-recipes",
    description: "UI motion studies with accessible presentational interactions.",
    language: "CSS",
    updatedAt: "Updated 3 days ago",
  },
];

const activityItems: ActivityItem[] = [
  {
    title: "OnderCampos starred openinterpreter/openinterpreter",
    subtitle: "A natural language interface for computers.",
    meta: "2 hours ago",
  },
  {
    title: "Softtek/design-system pushed 4 commits to main",
    subtitle: "Improved card spacing and refined dark surfaces.",
    meta: "Yesterday",
  },
  {
    title: "You opened issue #18 in llm-dashboard-kit",
    subtitle: "Discuss route fixtures for multiple generated views.",
    meta: "This week",
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
const profileTabItems = [
  { value: "overview", label: "Overview", icon: BookOpen },
  { value: "repositories", label: "Repositories", icon: BookOpen, count: "16" },
  { value: "projects", label: "Projects", icon: FolderKanban },
  { value: "packages", label: "Packages", icon: Package },
  { value: "stars", label: "Stars", icon: Star },
] as const;
const viewOptions = [
  { value: "dashboard-home-feed", label: "Dashboard" },
  { value: "user-profile-overview", label: "Profile" },
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

function AppHeader({
  search,
  onSearchChange,
  currentView,
  onViewChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  currentView: SupportedView;
  onViewChange: (value: SupportedView) => void;
}) {
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
          <div className="hidden h-8 w-[320px] items-center rounded-md border border-border bg-transparent px-3 lg:flex">
            <Search className="size-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Type / to search"
              className="h-7 border-0 bg-transparent px-2 text-sm shadow-none focus-visible:ring-0"
            />
          </div>
          <Select value={currentView} onValueChange={(value) => onViewChange(value as SupportedView)}>
            <SelectTrigger className="h-8 w-[136px] rounded-md border-border bg-transparent px-3 text-sm text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end">
              {viewOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

function ProfileTab({ value, label, count, icon: Icon }: { value: string; label: string; count?: string; icon: typeof BookOpen }) {
  return (
    <TabsTrigger
      value={value}
      className="h-11 flex-none rounded-none border-x-0 border-t-0 border-b-2 border-transparent bg-transparent px-3 text-sm font-medium text-foreground shadow-none data-[state=active]:border-[#f78166] data-[state=active]:bg-transparent data-[state=active]:text-foreground"
    >
      <Icon className="size-4 text-muted-foreground" />
      <span>{label}</span>
      {count ? <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[12px] leading-none text-foreground">{count}</span> : null}</n    </TabsTrigger>
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

function FeedRepositoryCard({ repository }: { repository: FeedRepository }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base font-semibold text-[#58a6ff]">{repository.name}</div>
          <p className="mt-2 text-sm text-muted-foreground">{repository.description}</p>
        </div>
        {repository.stars ? <span className="rounded-full border border-border px-2 py-0.5 text-[12px] text-muted-foreground">★ {repository.stars}</span> : null}
      </div>
      <div className="mt-4 flex items-center gap-3 text-[12px] text-muted-foreground">
        <span>{repository.language}</span>
        <span>•</span>
        <span>{repository.updatedAt}</span>
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

function DashboardHomeFeed({ search }: { search: string }) {
  const filteredRepositories = useMemo(() => {
    const query = search.toLowerCase();
    return feedRepositories.filter((repository) => {
      return `${repository.name} ${repository.description} ${repository.language}`.toLowerCase().includes(query);
    });
  }, [search]);

  return (
    <main className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-[240px_minmax(0,1fr)_320px]">
      <aside className="space-y-6">
        <section className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
          <div className="mb-3 flex items-center gap-3">
            <Avatar className="size-10 border border-border">
              <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" alt="OnderCampos" />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">OnderCampos</div>
              <div className="text-sm text-muted-foreground">Developer feed</div>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start border-border bg-transparent text-sm hover:bg-secondary">
            <Home className="size-4" />
            Home
          </Button>
        </section>

        <section className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
          <div className="text-sm font-semibold">Recent activity</div>
          <div className="mt-4 space-y-4">
            {activityItems.map((item) => (
              <div key={item.title} className="text-sm">
                <div>{item.title}</div>
                <div className="mt-1 text-muted-foreground">{item.subtitle}</div>
                <div className="mt-1 text-[12px] text-muted-foreground">{item.meta}</div>
              </div>
            ))}
          </div>
        </section>
      </aside>

      <section>
        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-[28px] font-semibold">Home</h1>
              <p className="mt-1 text-sm text-muted-foreground">Discover updates from repositories, people, and teams you follow.</p>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]">New issue</Button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {filteredRepositories.map((repository) => (
            <FeedRepositoryCard key={repository.name} repository={repository} />
          ))}
        </div>
      </section>

      <aside className="space-y-6">
        <section className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
          <div className="text-sm font-semibold">Explore repositories</div>
          <div className="mt-4 space-y-3">
            {feedRepositories.map((repository) => (
              <button
                key={`explore-${repository.name}`}
                className="block w-full rounded-md border border-transparent px-3 py-2 text-left hover:border-border hover:bg-secondary"
              >
                <div className="text-sm font-medium text-[#58a6ff]">{repository.name}</div>
                <div className="mt-1 text-[12px] text-muted-foreground">{repository.language}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
          <div className="text-sm font-semibold">Latest changes</div>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <p>Issue triage labels were refreshed across shared project boards.</p>
            <p>Review requested on motion-recipes/card-hover-study.</p>
            <p>Two pull requests are waiting for design review.</p>
          </div>
        </section>
      </aside>
    </main>
  );
}

function UserProfileOverview({ activeTab = "overview", selectedYear: initialYear = "2026", search }: { activeTab?: string; selectedYear?: string; search: string }) {
  const [tab, setTab] = useState(activeTab);
  const [selectedYear, setSelectedYear] = useState(initialYear);

  const filteredRepositories = useMemo(() => {
    const query = search.toLowerCase();
    return profileRepositories.filter((repository) => {
      return `${repository.name} ${repository.description ?? ""} ${repository.language}`.toLowerCase().includes(query);
    });
  }, [search]);

  return (
    <>
      <Tabs value={tab} onValueChange={setTab} className="gap-0">
        <div className="border-b border-border px-4">
          <TabsList className="h-auto gap-1 rounded-none bg-transparent p-0">
            {profileTabItems.map((item) => (
              <ProfileTab key={item.value} value={item.value} label={item.label} count={item.count} icon={item.icon} />
            ))}
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-0">
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
        </TabsContent>

        {profileTabItems.filter((item) => item.value !== "overview").map((item) => (
          <TabsContent key={item.value} value={item.value} className="mt-0">
            <main className="mx-auto max-w-[1120px] px-6 py-8">
              <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <h2 className="text-2xl font-semibold">{item.label}</h2>
                <p className="mt-2 text-sm text-muted-foreground">This tab keeps the generated profile navigation interactive while preserving the overview state shown in the design.</p>
              </div>
            </main>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}

export default function HomePage({
  view = "user-profile-overview",
  state = "default",
  activeTab = "overview",
  selectedYear = "2026",
}: HomePageProps) {
  const [currentView, setCurrentView] = useState<SupportedView>(view);
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground" data-state={state} data-view={currentView}>
      <AppHeader search={search} onSearchChange={setSearch} currentView={currentView} onViewChange={setCurrentView} />
      {currentView === "dashboard-home-feed" ? (
        <DashboardHomeFeed search={search} />
      ) : (
        <UserProfileOverview activeTab={activeTab} selectedYear={selectedYear} search={search} />
      )}
    </div>
  );
}
