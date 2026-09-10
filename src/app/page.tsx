"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BookText,
  ChevronDown,
  CircleDot,
  Code2,
  Filter,
  GitBranch,
  Github,
  Home,
  LayoutGrid,
  Menu,
  MessageSquare,
  MonitorPlay,
  Plus,
  Search,
  Settings,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type FeedState = "default";

type RepositoryItem = {
  owner: string;
  name: string;
  description?: string;
  language: string;
  languageColor: string;
  stars: string;
  avatar: string;
  source: "trending" | "recommended";
};

type SidebarRepository = {
  name: string;
  accent: string;
};

type ChangelogItem = {
  age: string;
  title: string;
};

const sidebarRepositories: SidebarRepository[] = [
  { name: "OnderCampos/CountBoxingSofttek", accent: "bg-[#58a6ff]" },
  { name: "Fridaplatform/cp-cloudagents", accent: "bg-pink-500" },
  { name: "OnderCampos/UI-Agent-Example", accent: "bg-[#58a6ff]" },
  { name: "Fridaplatform/ReqGen-Backend", accent: "bg-pink-500" },
  { name: "Fridaplatform/ProductPlanner", accent: "bg-pink-500" },
  { name: "Fridaplatform/reqgen_frontend", accent: "bg-pink-500" },
  { name: "OnderCampos/FridaProductPlannerWebBackend", accent: "bg-[#58a6ff]" },
];

const repositories: RepositoryItem[] = [
  {
    owner: "ayghri",
    name: "i-have-adhd",
    description: "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
    language: "Python",
    languageColor: "#3572A5",
    stars: "33.6k",
    avatar: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=64&q=80",
    source: "trending",
  },
  {
    owner: "spotify",
    name: "portal-ai-plugins",
    language: "TypeScript",
    languageColor: "#3178c6",
    stars: "716",
    avatar: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=64&q=80",
    source: "trending",
  },
  {
    owner: "jasonkylelol",
    name: "graphrag-chinese",
    description: "支持中文版CNNCN 的 microsoft/graphrag",
    language: "Python",
    languageColor: "#3572A5",
    stars: "51",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=64&q=80",
    source: "recommended",
  },
];

const changelogItems: ChangelogItem[] = [
  { age: "3 hours ago", title: "Remediate Code Quality findings with agentic autofix" },
  { age: "13 hours ago", title: "Enterprise-managed sandbox in Copilot for JetBrains" },
  { age: "18 hours ago", title: "GitHub Enterprise Server 3.22 is now generally available" },
  { age: "Yesterday", title: "New customer portal help.github.com" },
];

const toolbarActions = [
  { label: "Debug", icon: Sparkles },
  { label: "Agent", icon: MessageSquare },
  { label: "Create issue", icon: CircleDot },
  { label: "Write code", icon: BookText, hasDropdown: true },
  { label: "Git", icon: GitBranch, hasDropdown: true },
  { label: "Pull requests", icon: GitBranch, hasDropdown: true },
] as const;

function RepoActionButton({ starred, onToggle }: { starred: boolean; onToggle: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 rounded-md border-border bg-[#2b313a] px-3 text-[12px] text-foreground hover:bg-[#353c46]"
        >
          <Star className={cn("size-3.5", starred && "fill-current text-primary")} />
          <span>{starred ? "Starred" : "Star"}</span>
          <ChevronDown className="size-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={onToggle}>{starred ? "Remove star" : "Star repository"}</DropdownMenuItem>
        <DropdownMenuItem>Add to list</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FeedCard({
  title,
  icon,
  items,
  starredMap,
  onToggleStar,
  showMore,
}: {
  title: string;
  icon: React.ReactNode;
  items: RepositoryItem[];
  starredMap: Record<string, boolean>;
  onToggleStar: (key: string) => void;
  showMore?: boolean;
}) {
  return (
    <Card className="gap-0 overflow-hidden rounded-lg border-border bg-card py-0 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
        {icon}
        <span>{title}</span>
        {showMore ? <button className="text-[#58a6ff] hover:underline">See more</button> : null}
      </div>
      {items.map((item, index) => {
        const repoKey = `${item.owner}/${item.name}`;
        return (
          <div key={repoKey} className="border-t border-border px-4 py-4 first:border-t-0">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Avatar className="size-5">
                    <AvatarImage src={item.avatar} alt={repoKey} />
                    <AvatarFallback>{item.owner.slice(0, 1).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="truncate">{repoKey}</span>
                </div>
                {item.description ? (
                  <p className="mt-2 max-w-2xl text-[13px] leading-5 text-foreground">{item.description}</p>
                ) : null}
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="size-3 rounded-full" style={{ backgroundColor: item.languageColor }} />
                    {item.language}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="size-3.5" />
                    {item.stars}
                  </span>
                </div>
              </div>
              <RepoActionButton starred={starredMap[repoKey]} onToggle={() => onToggleStar(repoKey)} />
            </div>
            {index !== items.length - 1 ? <Separator className="mt-4" /> : null}
          </div>
        );
      })}
    </Card>
  );
}

function DashboardHomeFeed({ state = "default" }: { state?: FeedState }) {
  const [search, setSearch] = useState("");
  const [repositorySearch, setRepositorySearch] = useState("");
  const [askScope, setAskScope] = useState("all");
  const [assistantMode, setAssistantMode] = useState("ask");
  const [visibilityFilter, setVisibilityFilter] = useState("auto");
  const [starredMap, setStarredMap] = useState<Record<string, boolean>>({});

  const filteredSidebarRepositories = useMemo(
    () => sidebarRepositories.filter((repo) => repo.name.toLowerCase().includes(repositorySearch.toLowerCase())),
    [repositorySearch]
  );

  const visibleRepositories = useMemo(() => {
    const query = search.toLowerCase();
    return repositories.filter((repo) => `${repo.owner}/${repo.name} ${repo.description ?? ""}`.toLowerCase().includes(query));
  }, [search]);

  const trendingItems = visibleRepositories.filter((repo) => repo.source === "trending");
  const recommendedItems = visibleRepositories.filter((repo) => repo.source === "recommended");

  return (
    <div className="min-h-screen bg-background text-foreground" data-state={state}>
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" className="border border-border bg-background hover:bg-card">
              <Menu className="size-4" />
            </Button>
            <Github className="size-8" />
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span>Dashboard</span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-end gap-3">
            <div className="hidden w-full max-w-[420px] items-center gap-2 rounded-md border border-border bg-background px-3 md:flex">
              <Search className="size-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Type / to search"
                className="h-9 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="hidden items-center gap-2 md:flex">
              {[LayoutGrid, Plus, Bell, Users, MonitorPlay, Settings].map((Icon, index) => (
                <Button key={`${Icon.displayName ?? Icon.name}-${index}`} variant="ghost" size="icon-sm" className="border border-border hover:bg-card">
                  <Icon className="size-4" />
                </Button>
              ))}
            </div>
            <Avatar className="size-8 border border-border">
              <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" alt="OnderCampos" />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-56px)] grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_312px]">
        <aside className="hidden border-r border-border bg-[#1b222c] xl:block">
          <div className="px-5 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Avatar className="size-5">
                  <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" alt="OnderCampos" />
                  <AvatarFallback>OC</AvatarFallback>
                </Avatar>
                <span>OnderCampos</span>
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Top repositories</h2>
              <Button className="h-7 rounded-md bg-primary px-3 text-[12px] font-semibold text-primary-foreground hover:bg-[var(--color-primary-hover)]">
                <Plus className="size-3.5" />
                New
              </Button>
            </div>

            <div className="mt-3">
              <Input
                value={repositorySearch}
                onChange={(event) => setRepositorySearch(event.target.value)}
                placeholder="Find a repository..."
                className="h-8 rounded-md border-border bg-background text-sm"
              />
            </div>

            <div className="mt-4 space-y-2 text-sm text-foreground">
              {filteredSidebarRepositories.map((repo) => (
                <button key={repo.name} className="flex w-full items-start gap-2 rounded-md px-1 py-1 text-left hover:bg-card">
                  <span className={cn("mt-1 size-2.5 rounded-sm", repo.accent)} />
                  <span className="line-clamp-2">{repo.name}</span>
                </button>
              ))}
            </div>

            <button className="mt-3 text-sm text-muted-foreground hover:text-foreground">Show more</button>
          </div>
        </aside>

        <main className="px-6 py-10 xl:px-14">
          <div className="mx-auto max-w-[805px]">
            <h1 className="text-[36px] font-semibold tracking-[-0.02em]">Home</h1>

            <Card className="mt-6 gap-0 rounded-2xl border-border bg-card py-0 shadow-[var(--shadow-card)]">
              <div className="p-4 pb-3">
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Ask anything or type @ to add context"
                  className="h-14 border-0 bg-transparent px-0 text-[16px] text-muted-foreground shadow-none focus-visible:ring-0"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAssistantMode("ask")}
                    className={cn("h-8 rounded-md border-border bg-transparent px-3", assistantMode === "ask" && "bg-[#2b313a]")}
                  >
                    <MessageSquare className="size-3.5" />
                    Ask
                    <ChevronDown className="size-3.5 opacity-60" />
                  </Button>
                  <Select value={askScope} onValueChange={setAskScope}>
                    <SelectTrigger className="h-8 rounded-md border-border bg-transparent text-sm text-foreground">
                      <SelectValue placeholder="All repositories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All repositories</SelectItem>
                      <SelectItem value="top">Top repositories</SelectItem>
                      <SelectItem value="public">Public repositories</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon-sm" className="h-8 rounded-md border-border bg-transparent hover:bg-card">
                    <Plus className="size-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Users className="size-4" />
                    <span>Auto</span>
                    <ChevronDown className="size-3.5" />
                  </div>
                  <Sparkles className="size-4" />
                  <Button variant="ghost" size="icon-sm" className="size-7 hover:bg-card">
                    <Code2 className="size-4" />
                  </Button>
                </div>
              </div>
            </Card>

            <div className="mt-4 flex flex-wrap gap-3">
              {toolbarActions.map(({ label, icon: Icon, hasDropdown }) => (
                <Button key={label} variant="outline" size="sm" className="h-9 rounded-full border-border bg-background px-4 text-sm hover:bg-card">
                  <Icon className="size-4" />
                  {label}
                  {hasDropdown ? <ChevronDown className="size-3.5 opacity-60" /> : null}
                </Button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Feed</h2>
              <Select value={visibilityFilter} onValueChange={setVisibilityFilter}>
                <SelectTrigger className="h-8 rounded-md border-border bg-card px-3 text-sm">
                  <Filter className="size-3.5" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Filter</SelectItem>
                  <SelectItem value="trending">Trending only</SelectItem>
                  <SelectItem value="recommended">Recommended only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-3 space-y-4">
              {(visibilityFilter === "auto" || visibilityFilter === "trending") && trendingItems.length > 0 ? (
                <FeedCard
                  title="Trending repositories ·"
                  icon={<Home className="size-4" />}
                  items={trendingItems}
                  starredMap={starredMap}
                  onToggleStar={(key) => setStarredMap((current) => ({ ...current, [key]: !current[key] }))}
                  showMore
                />
              ) : null}

              {(visibilityFilter === "auto" || visibilityFilter === "recommended") && recommendedItems.length > 0 ? (
                <FeedCard
                  title="Recommended for you"
                  icon={<Star className="size-4" />}
                  items={recommendedItems}
                  starredMap={starredMap}
                  onToggleStar={(key) => setStarredMap((current) => ({ ...current, [key]: !current[key] }))}
                />
              ) : null}
            </div>
          </div>
        </main>

        <aside className="hidden px-6 py-9 xl:block">
          <div className="space-y-6">
            <Card className="gap-0 overflow-hidden rounded-xl border-border bg-card py-0 shadow-[var(--shadow-card)]">
              <div className="relative h-[120px] overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(122,220,151,0.85),_transparent_38%),linear-gradient(135deg,#52d17c_0%,#d3f3de_24%,#7adc97_38%,#212830_39%,#212830_100%)]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0_26%,rgba(255,255,255,0.8)_26%_38%,transparent_38%_100%)] opacity-50" />
                <button className="absolute right-3 top-3 text-muted-foreground">×</button>
              </div>
              <div className="border-t border-border px-4 py-3 text-xs font-medium uppercase tracking-[0.04em] text-[#58a6ff]">
                September 10 · 8:00 AM PT
              </div>
              <div className="space-y-4 px-4 pb-4">
                <div>
                  <h3 className="text-2xl font-semibold">GitHub Copilot Day</h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {[
                      "See how HydraFusion combines AI models to match the right model to the task",
                      "Learn to automate work, run parallel agents, and use your own models",
                      "Turn your best coding approaches into reusable Agent Skills",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 size-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="h-9 w-full rounded-md bg-[#e6edf3] font-semibold text-[#151b23] hover:bg-white">Set your reminder</Button>
              </div>
            </Card>

            <Card className="rounded-xl border-border bg-card py-0 shadow-[var(--shadow-card)]">
              <div className="px-4 py-4">
                <h3 className="text-xl font-semibold">Latest from our changelog</h3>
                <div className="mt-5 space-y-5">
                  {changelogItems.map((item) => (
                    <div key={item.title} className="relative pl-6">
                      <span className="absolute left-1 top-1 size-2 rounded-full bg-border" />
                      <span className="absolute left-[7px] top-3 h-[calc(100%+12px)] w-px bg-border last:hidden" />
                      <div className="text-xs text-muted-foreground">{item.age}</div>
                      <div className="mt-1 text-sm leading-6 text-foreground">{item.title}</div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 text-sm text-[#58a6ff] hover:underline">View changelog →</button>
              </div>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function HomePage() {
  return <DashboardHomeFeed state="default" />;
}
