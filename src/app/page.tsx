"use client";

import * as React from "react";
import {
  Bell,
  ChevronDown,
  Filter,
  Flame,
  GitBranch,
  Github,
  Grid2x2,
  House,
  Laptop,
  Menu,
  MessageSquare,
  MoonStar,
  Play,
  Plus,
  Search,
  Sparkles,
  Star,
  TriangleAlert,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type RepositoryItem = {
  owner: string;
  name: string;
  description?: string;
  language: string;
  stars: string;
  ownerAvatar?: string;
  languageColor?: string;
  icon?: "spotify" | "default";
};

type ChangelogItem = {
  time: string;
  title: string;
};

type GithubHomeDashboardProps = {
  state?: "default";
  initialSearch?: string;
};

const topRepositories = [
  "OnderCampos/CountBoxingSofttek",
  "Fridaplatform/cp-cloudagents",
  "OnderCampos/UI-Agent-Example",
  "Fridaplatform/ReqGen-Backend",
  "Fridaplatform/ProductPlanner",
  "Fridaplatform/reqgen_frontend",
  "OnderCampos/FridaProductPlannerWebBackend",
];

const trendingRepositories: RepositoryItem[] = [
  {
    owner: "ayghri",
    name: "i-have-adhd",
    description:
      "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
    language: "Python",
    stars: "33.6k",
    languageColor: "#2f81f7",
  },
  {
    owner: "spotify",
    name: "portal-ai-plugins",
    language: "TypeScript",
    stars: "716",
    icon: "spotify",
    languageColor: "#2f81f7",
  },
];

const recommendedRepositories: RepositoryItem[] = [
  {
    owner: "jasonkylelol",
    name: "graphrag-chinese",
    description: "支持中文CNCCN 的 microsoft/graphrag",
    language: "Python",
    stars: "51",
    languageColor: "#2f81f7",
  },
];

const changelogItems: ChangelogItem[] = [
  {
    time: "3 hours ago",
    title: "Remediate Code Quality findings with agentic autofix",
  },
  {
    time: "13 hours ago",
    title: "Enterprise-managed sandbox in Copilot for JetBrains",
  },
  {
    time: "18 hours ago",
    title: "GitHub Enterprise Server 3.22 is now generally available",
  },
  {
    time: "Yesterday",
    title: "New customer portal help.github.com",
  },
];

const askOptions = ["Ask", "Explain", "Summarize"];
const repositoryOptions = ["All repositories", "My repositories", "Top repositories"];
const autoOptions = ["Auto", "Fast", "Precise"];
const starActions = ["Star", "Watch", "Save"];

function GithubHomeDashboard({
  state = "default",
  initialSearch = "",
}: GithubHomeDashboardProps) {
  const [search, setSearch] = React.useState(initialSearch);
  const [repoSearch, setRepoSearch] = React.useState("");
  const [askMode, setAskMode] = React.useState(askOptions[0]);
  const [repositoryScope, setRepositoryScope] = React.useState(repositoryOptions[0]);
  const [assistMode, setAssistMode] = React.useState(autoOptions[0]);
  const [starSelections, setStarSelections] = React.useState<Record<string, string>>({});

  const visibleTopRepositories = React.useMemo(() => {
    const query = repoSearch.trim().toLowerCase();
    if (!query) return topRepositories;

    return topRepositories.filter((repository) =>
      repository.toLowerCase().includes(query)
    );
  }, [repoSearch]);

  const dashboardContent = {
    default: {
      title: "Home",
      trending: trendingRepositories,
      recommended: recommendedRepositories,
    },
  }[state];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-border bg-[#0d1117]">
          <div className="flex h-14 items-center justify-between gap-4 px-3 md:px-4">
            <div className="flex min-w-0 items-center gap-3">
              <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-transparent text-foreground hover:bg-card">
                <Menu className="size-4" />
              </Button>
              <Github className="size-8 text-foreground" />
              <div className="hidden items-center gap-2 text-sm font-semibold md:flex">
                <span>Dashboard</span>
              </div>
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-end gap-3">
              <div className="hidden w-full max-w-[360px] lg:block">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Type / to search"
                    className="h-8 rounded-md border-border bg-transparent pl-9 pr-10 text-sm"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    /
                  </span>
                </div>
              </div>

              <Button variant="outline" size="icon-sm" className="hidden h-8 w-8 rounded-md border-border bg-transparent text-muted-foreground hover:bg-card md:inline-flex">
                <Grid2x2 className="size-4" />
              </Button>
              <Separator orientation="vertical" className="hidden h-5 bg-border md:block" />
              <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-transparent text-muted-foreground hover:bg-card">
                <Plus className="size-4" />
              </Button>
              <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-transparent text-muted-foreground hover:bg-card">
                <Bell className="size-4" />
              </Button>
              <Avatar className="size-8 border border-border">
                <AvatarImage src="/Frida.png" alt="OnderCampos" />
                <AvatarFallback>OC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="grid flex-1 grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_312px]">
          <aside className="hidden border-r border-border bg-[color:var(--color-sidebar)] px-5 py-8 xl:block">
            <div className="mb-8 flex items-center gap-2 text-sm font-semibold">
              <Avatar className="size-6">
                <AvatarImage src="/Frida.png" alt="OnderCampos" />
                <AvatarFallback>OC</AvatarFallback>
              </Avatar>
              <span>OnderCampos</span>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold">Top repositories</h2>
                <Button className="h-8 rounded-md bg-[color:var(--github-primary)] px-3 text-xs font-semibold text-[color:var(--github-primary-foreground)] hover:bg-[color:var(--github-primary-hover)]">
                  <Laptop className="size-3.5" />
                  New
                </Button>
              </div>
              <Input
                value={repoSearch}
                onChange={(event) => setRepoSearch(event.target.value)}
                placeholder="Find a repository..."
                className="h-8 rounded-md border-border bg-transparent text-sm"
              />
              <div className="space-y-2.5 pt-2 text-[15px] text-foreground">
                {visibleTopRepositories.map((repository) => (
                  <div key={repository} className="flex items-start gap-2 text-sm leading-6">
                    <span className="mt-1 inline-flex size-4 items-center justify-center rounded-sm bg-muted text-[10px] font-bold text-muted-foreground">
                      F
                    </span>
                    <span className="line-clamp-2">{repository}</span>
                  </div>
                ))}
              </div>
              <button type="button" className="pt-1 text-sm text-muted-foreground hover:text-foreground">
                Show more
              </button>
            </div>
          </aside>

          <section className="px-4 py-8 md:px-8 xl:px-14">
            <div className="mx-auto max-w-[804px]">
              <h1 className="mb-4 text-[2rem] font-semibold tracking-[-0.02em]">{dashboardContent.title}</h1>

              <Card className="gap-0 rounded-2xl border-border bg-card py-0 shadow-sm">
                <div className="p-4 pb-0">
                  <textarea
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Ask anything or type @ to add context"
                    className="min-h-24 w-full resize-none bg-transparent text-[1.05rem] text-foreground outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-transparent px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <ChoiceMenu value={askMode} options={askOptions} onChange={setAskMode} icon={<MessageSquare className="size-4" />} />
                    <ChoiceMenu value={repositoryScope} options={repositoryOptions} onChange={setRepositoryScope} icon={<House className="size-4" />} />
                    <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-transparent text-muted-foreground hover:bg-muted">
                      <Plus className="size-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <ChoiceMenu value={assistMode} options={autoOptions} onChange={setAssistMode} icon={<Sparkles className="size-4" />} align="end" compact />
                    <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-muted">
                      <MoonStar className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-muted">
                      <Play className="size-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="mt-5 flex flex-wrap gap-3">
                {[
                  { label: "Debug", icon: TriangleAlert },
                  { label: "Agent", icon: Sparkles },
                  { label: "Create issue", icon: MessageSquare },
                  { label: "Write code", icon: House, hasCaret: true },
                  { label: "Git", icon: GitBranch, hasCaret: true },
                  { label: "Pull requests", icon: GitBranch, hasCaret: true },
                ].map((action) => (
                  <Button
                    key={action.label}
                    variant="outline"
                    className="h-10 rounded-full border-border bg-background px-4 text-sm text-foreground hover:bg-card"
                  >
                    <action.icon className="size-4 text-muted-foreground" />
                    {action.label}
                    {action.hasCaret ? <ChevronDown className="size-4 text-muted-foreground" /> : null}
                  </Button>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">Feed</h2>
                <Button variant="outline" className="h-8 rounded-md border-border bg-card px-3 text-sm text-foreground hover:bg-muted">
                  <Filter className="size-4 text-muted-foreground" />
                  Filter
                </Button>
              </div>

              <div className="mt-3 space-y-4">
                <FeedCard
                  title="Trending repositories"
                  icon={<Flame className="size-4 text-muted-foreground" />}
                  linkLabel="See more"
                  items={dashboardContent.trending}
                  starSelections={starSelections}
                  onStarChange={(repository, action) =>
                    setStarSelections((current) => ({ ...current, [repository]: action }))
                  }
                />
                <FeedCard
                  title="Recommended for you"
                  icon={<Star className="size-4 text-muted-foreground" />}
                  items={dashboardContent.recommended}
                  starSelections={starSelections}
                  onStarChange={(repository, action) =>
                    setStarSelections((current) => ({ ...current, [repository]: action }))
                  }
                />
              </div>
            </div>
          </section>

          <aside className="hidden border-l border-border px-5 py-9 xl:block">
            <div className="space-y-6">
              <Card className="gap-0 overflow-hidden rounded-xl border-border bg-card py-0">
                <div className="h-[72px] bg-[linear-gradient(135deg,#78dc97_0%,#d7ffe2_46%,#9af2b1_65%,#7c68ff_100%)]" />
                <div className="border-t border-border px-4 py-3 text-xs tracking-wide text-muted-foreground uppercase">
                  September 10 · 8:00 AM PT
                </div>
                <div className="space-y-3 px-4 pb-4">
                  <h3 className="text-[1.75rem] font-semibold leading-tight">GitHub Copilot Day</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {[
                      "See how HydraFusion combines AI models to match the right model to the task",
                      "Learn to automate work, run parallel agents, and use your own models",
                      "Turn your best coding approaches into reusable Agent Skills",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 size-1.5 rounded-full bg-[color:var(--github-primary)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="h-9 w-full rounded-md bg-foreground text-background hover:bg-[#c9d1d9]">
                    Set your reminder
                  </Button>
                </div>
              </Card>

              <Card className="rounded-xl border-border bg-card py-0">
                <div className="border-b border-border px-4 py-4 text-xl font-semibold">Latest from our changelog</div>
                <div className="space-y-5 px-4 py-4">
                  {changelogItems.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <span className="mt-1 size-2 rounded-full bg-border" />
                        <span className="mt-1 h-full w-px bg-border/60" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">{item.time}</div>
                        <div className="text-[15px] leading-6 text-foreground">{item.title}</div>
                      </div>
                    </div>
                  ))}
                  <button type="button" className="text-sm text-muted-foreground hover:text-foreground">
                    View changelog →
                  </button>
                </div>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function ChoiceMenu({
  value,
  options,
  onChange,
  icon,
  align = "start",
  compact = false,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  icon: React.ReactNode;
  align?: "start" | "end";
  compact?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-8 rounded-md border-border bg-transparent text-sm text-foreground hover:bg-muted",
            compact ? "px-2.5" : "px-3"
          )}
        >
          {icon}
          <span>{value}</span>
          <ChevronDown className="size-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="border-border bg-card text-foreground">
        {options.map((option) => (
          <DropdownMenuItem key={option} onSelect={() => onChange(option)}>
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FeedCard({
  title,
  icon,
  items,
  linkLabel,
  starSelections,
  onStarChange,
}: {
  title: string;
  icon: React.ReactNode;
  items: RepositoryItem[];
  linkLabel?: string;
  starSelections: Record<string, string>;
  onStarChange: (repository: string, action: string) => void;
}) {
  return (
    <Card className="gap-0 rounded-lg border-border bg-card py-0 shadow-sm">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3 text-[15px] text-muted-foreground">
        {icon}
        <span>{title}</span>
        {linkLabel ? (
          <>
            <span>·</span>
            <button type="button" className="text-[#2f81f7] hover:underline">
              {linkLabel}
            </button>
          </>
        ) : null}
      </div>
      <div>
        {items.map((item, index) => {
          const key = `${item.owner}/${item.name}`;
          return (
            <div
              key={key}
              className={cn(
                "flex items-start justify-between gap-4 px-4 py-4",
                index !== items.length - 1 && "border-b border-border"
              )}
            >
              <div className="min-w-0 space-y-2">
                <div className="flex items-center gap-2 text-[15px] font-semibold">
                  {item.icon === "spotify" ? (
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-[#1ed760] text-black">S</span>
                  ) : (
                    <Avatar className="size-5">
                      <AvatarImage src={item.ownerAvatar ?? "/Frida.png"} alt={item.owner} />
                      <AvatarFallback>{item.owner.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  )}
                  <span className="truncate">{item.owner}/{item.name}</span>
                </div>
                {item.description ? (
                  <p className="text-[15px] leading-6 text-foreground">{item.description}</p>
                ) : null}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="size-3 rounded-full"
                      style={{ backgroundColor: item.languageColor ?? "#8b949e" }}
                    />
                    {item.language}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="size-3.5" />
                    {item.stars}
                  </span>
                </div>
              </div>
              <ChoiceMenu
                value={starSelections[key] ?? starActions[0]}
                options={starActions}
                onChange={(value) => onStarChange(key, value)}
                icon={<Star className="size-4" />}
                align="end"
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default function HomePage() {
  return <GithubHomeDashboard state="default" />;
}
