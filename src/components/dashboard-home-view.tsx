"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  Bot,
  ChevronDown,
  Circle,
  Filter,
  Github,
  GitBranch,
  Globe,
  House,
  Laptop,
  Menu,
  MessageSquare,
  Play,
  Plus,
  Search,
  Sparkles,
  SquareTerminal,
  Star,
  TextCursor,
  Users,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type RepositoryItem = {
  id: string;
  owner: string;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: string;
  icon?: "spotify" | "avatar";
};

type SidebarRepository = {
  id: string;
  name: string;
  accent?: string;
};

type ChangelogItem = {
  id: string;
  time: string;
  title: string;
};

export type DashboardHomeViewProps = {
  state?: "default";
  userName?: string;
  searchPlaceholder?: string;
  topRepositories?: SidebarRepository[];
  trendingRepositories?: RepositoryItem[];
  recommendedRepositories?: RepositoryItem[];
  changelogItems?: ChangelogItem[];
};

const defaultTopRepositories: SidebarRepository[] = [
  { id: "1", name: "OnderCampos/CountBoxingSofttek" },
  { id: "2", name: "Fridaplatform/cp-cloudagents", accent: "#db61a2" },
  { id: "3", name: "OnderCampos/UI-Agent-Example" },
  { id: "4", name: "Fridaplatform/ReqGen-Backend", accent: "#db61a2" },
  { id: "5", name: "Fridaplatform/ProductPlanner", accent: "#db61a2" },
  { id: "6", name: "Fridaplatform/reqgen_frontend", accent: "#db61a2" },
  { id: "7", name: "OnderCampos/FridaProductPlannerWebBackend" },
];

const defaultTrendingRepositories: RepositoryItem[] = [
  {
    id: "t1",
    owner: "ayghri",
    name: "i-have-adhd",
    description:
      "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
    language: "Python",
    languageColor: "#58a6ff",
    stars: "33.6k",
    icon: "avatar",
  },
  {
    id: "t2",
    owner: "spotify",
    name: "portal-ai-plugins",
    description: "",
    language: "TypeScript",
    languageColor: "#58a6ff",
    stars: "716",
    icon: "spotify",
  },
];

const defaultRecommendedRepositories: RepositoryItem[] = [
  {
    id: "r1",
    owner: "jasonkylelol",
    name: "graphrag-chinese",
    description: "支持中文CNCCN 的 microsoft/graphrag",
    language: "Python",
    languageColor: "#58a6ff",
    stars: "51",
    icon: "avatar",
  },
];

const defaultChangelogItems: ChangelogItem[] = [
  {
    id: "c1",
    time: "3 hours ago",
    title: "Remediate Code Quality findings with agentic autofix",
  },
  {
    id: "c2",
    time: "13 hours ago",
    title: "Enterprise-managed sandbox in Copilot for JetBrains",
  },
  {
    id: "c3",
    time: "18 hours ago",
    title: "GitHub Enterprise Server 3.22 is now generally available",
  },
  {
    id: "c4",
    time: "Yesterday",
    title: "New customer portal help.github.com",
  },
];

function RepositoryAvatar({ type = "avatar" }: { type?: "spotify" | "avatar" }) {
  if (type === "spotify") {
    return (
      <div className="flex size-5 items-center justify-center rounded-full bg-[#1ed760] text-[#0d1117]">
        <Circle className="size-2.5 fill-current stroke-none" />
      </div>
    );
  }

  return (
    <Avatar className="size-5 border border-border">
      <AvatarImage src="/Frida.png" alt="Repository" />
      <AvatarFallback className="bg-muted text-[10px] text-foreground">
        R
      </AvatarFallback>
    </Avatar>
  );
}

function RepoActionButton({ label }: { label: string }) {
  const [starred, setStarred] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1 rounded-md border-border bg-[#30363d] px-3 text-[12px] text-foreground hover:bg-[#3b434d]"
          onClick={() => setStarred((value) => !value)}
        >
          <Star className={cn("size-3.5", starred && "fill-current text-primary")} />
          {starred ? `Starred` : label}
          <ChevronDown className="size-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 border-border bg-card">
        <DropdownMenuItem onSelect={() => setStarred((value) => !value)}>
          {starred ? "Remove star" : "Star repository"}
        </DropdownMenuItem>
        <DropdownMenuItem>View lists</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FeedRepositoryRow({ repository }: { repository: RepositoryItem }) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-4 first:pt-3 last:pb-3">
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
          <RepositoryAvatar type={repository.icon} />
          <span className="truncate">{repository.owner}/{repository.name}</span>
        </div>
        {repository.description ? (
          <p className="mb-3 max-w-2xl text-[13px] leading-5 text-foreground">
            {repository.description}
          </p>
        ) : null}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: repository.languageColor }}
            />
            {repository.language}
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="size-3.5" />
            {repository.stars}
          </span>
        </div>
      </div>
      <RepoActionButton label="Star" />
    </div>
  );
}

function FeedSection({
  title,
  titleIcon,
  subtitle,
  repositories,
}: {
  title: string;
  titleIcon: React.ReactNode;
  subtitle?: React.ReactNode;
  repositories: RepositoryItem[];
}) {
  return (
    <Card className="gap-0 overflow-hidden rounded-lg border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3 text-sm text-muted-foreground">
        {titleIcon}
        <span>{title}</span>
        {subtitle}
      </div>
      <div className="divide-y divide-border">
        {repositories.map((repository) => (
          <FeedRepositoryRow key={repository.id} repository={repository} />
        ))}
      </div>
    </Card>
  );
}

export function DashboardHomeView({
  state = "default",
  userName = "OnderCampos",
  searchPlaceholder = "Find a repository…",
  topRepositories = defaultTopRepositories,
  trendingRepositories = defaultTrendingRepositories,
  recommendedRepositories = defaultRecommendedRepositories,
  changelogItems = defaultChangelogItems,
}: DashboardHomeViewProps) {
  const [prompt, setPrompt] = useState("");
  const [repoSearch, setRepoSearch] = useState("");
  const [scope, setScope] = useState("all");
  const [feedFilter, setFeedFilter] = useState("all");

  const visibleTopRepositories = useMemo(() => {
    const query = repoSearch.toLowerCase();
    return topRepositories.filter((repository) =>
      repository.name.toLowerCase().includes(query)
    );
  }, [repoSearch, topRepositories]);

  return (
    <div
      data-state={state}
      className="min-h-screen bg-[var(--panel)] text-foreground"
    >
      <header className="sticky top-0 z-20 border-b border-[#30363d] bg-[var(--panel)]/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between gap-4 px-3 md:px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-md border border-border bg-transparent text-foreground hover:bg-accent"
            >
              <Menu className="size-4" />
            </Button>
            <Github className="size-8 text-white" />
            <div className="text-sm font-semibold">Dashboard</div>
          </div>

          <div className="hidden max-w-[560px] flex-1 items-center justify-end gap-2 lg:flex">
            <div className="flex h-8 min-w-[320px] items-center gap-2 rounded-md border border-border bg-background px-3 text-sm text-muted-foreground">
              <Search className="size-4" />
              <input
                value={repoSearch}
                onChange={(event) => setRepoSearch(event.target.value)}
                placeholder="Type / to search"
                className="h-full w-full bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            {[BookOpen, Plus, Bell, GitBranch, Laptop, Globe].map((Icon, index) => (
              <Button
                key={`${index + 1}`}
                variant="ghost"
                size="icon-sm"
                className="rounded-md border border-border text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <Icon className="size-4" />
              </Button>
            ))}
            <Avatar className="size-8 border border-border">
              <AvatarImage src="/Frida.png" alt={userName} />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1568px] grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_320px]">
        <aside className="hidden min-h-[calc(100vh-56px)] border-r border-[#30363d] bg-[#1b222c] px-4 py-8 xl:block">
          <div className="mb-8 flex items-center gap-2 text-sm font-semibold">
            <Avatar className="size-5 border border-border">
              <AvatarImage src="/Frida.png" alt={userName} />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
            <span>{userName}</span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Top repositories</h2>
            <Button className="h-8 rounded-md bg-success px-3 text-[12px] font-semibold text-white hover:bg-[#2d7a3b]">
              <SquareTerminal className="size-3.5" />
              New
            </Button>
          </div>

          <Input
            value={repoSearch}
            onChange={(event) => setRepoSearch(event.target.value)}
            placeholder={searchPlaceholder}
            className="mb-4 h-8 rounded-md border-[#30363d] bg-background text-sm"
          />

          <div className="space-y-1.5">
            {visibleTopRepositories.map((repository) => (
              <button
                key={repository.id}
                className="flex w-full items-start gap-2 rounded-md px-1 py-1.5 text-left text-[13px] text-foreground hover:bg-accent"
              >
                <span
                  className="mt-1 size-3 rounded-[3px]"
                  style={{ backgroundColor: repository.accent ?? "#8b949e" }}
                />
                <span className="line-clamp-2">{repository.name}</span>
              </button>
            ))}
          </div>

          <button className="mt-4 text-sm text-muted-foreground hover:text-foreground">
            Show more
          </button>
        </aside>

        <main className="min-w-0 px-4 py-8 md:px-8 xl:px-14">
          <div className="mx-auto max-w-[805px]">
            <h1 className="mb-6 text-[36px] font-semibold tracking-[-0.02em] text-foreground">
              Home
            </h1>

            <Card className="gap-0 rounded-2xl border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <div className="border-b border-transparent px-4 pt-4 pb-3">
                <textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Ask anything or type @ to add context"
                  className="min-h-16 w-full resize-none bg-transparent text-[28px] leading-9 text-foreground outline-none placeholder:text-[#7d8590]"
                />
              </div>
              <div className="flex flex-col gap-3 px-4 pb-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 rounded-md border-border bg-background px-3 text-sm hover:bg-accent">
                    <MessageSquare className="size-4" />
                    Ask
                    <ChevronDown className="size-4 opacity-60" />
                  </Button>
                  <Select value={scope} onValueChange={setScope}>
                    <SelectTrigger size="sm" className="h-8 rounded-md border-border bg-background text-sm text-foreground">
                      <Laptop className="size-4 text-muted-foreground" />
                      <SelectValue placeholder="All repositories" />
                    </SelectTrigger>
                    <SelectContent className="border-border bg-card text-foreground">
                      <SelectItem value="all">All repositories</SelectItem>
                      <SelectItem value="private">Private repositories</SelectItem>
                      <SelectItem value="starred">Starred repositories</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-background hover:bg-accent">
                    <Plus className="size-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-foreground">
                    <Users className="size-4" />
                    Auto
                    <ChevronDown className="size-4" />
                  </button>
                  <button className="hover:text-foreground">
                    <Sparkles className="size-4" />
                  </button>
                  <button className="hover:text-foreground">
                    <Play className="size-4" />
                  </button>
                </div>
              </div>
            </Card>

            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { label: "Debug", icon: Sparkles },
                { label: "Agent", icon: Bot },
                { label: "Create issue", icon: Circle },
                { label: "Write code", icon: TextCursor },
                { label: "Git", icon: GitBranch },
                { label: "Pull requests", icon: House },
              ].map((item) => (
                <Button
                  key={item.label}
                  variant="outline"
                  className="h-10 rounded-full border-border bg-[var(--panel)] px-4 text-sm text-foreground hover:bg-accent"
                >
                  <item.icon className="size-4 text-muted-foreground" />
                  {item.label}
                  {item.label === "Write code" || item.label === "Git" || item.label === "Pull requests" ? (
                    <ChevronDown className="size-4 text-muted-foreground" />
                  ) : null}
                </Button>
              ))}
            </div>

            <div className="mt-8 mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Feed</h2>
              <Select value={feedFilter} onValueChange={setFeedFilter}>
                <SelectTrigger size="sm" className="h-8 rounded-md border-border bg-[#30363d] text-sm">
                  <Filter className="size-4 text-muted-foreground" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent className="border-border bg-card text-foreground">
                  <SelectItem value="all">All activity</SelectItem>
                  <SelectItem value="trending">Trending only</SelectItem>
                  <SelectItem value="recommended">Recommended only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {feedFilter !== "recommended" ? (
                <FeedSection
                  title="Trending repositories"
                  titleIcon={<Sparkles className="size-4" />}
                  subtitle={
                    <button className="text-sm text-[#58a6ff] hover:underline">
                      · See more
                    </button>
                  }
                  repositories={trendingRepositories}
                />
              ) : null}

              {feedFilter !== "trending" ? (
                <FeedSection
                  title="Recommended for you"
                  titleIcon={<Star className="size-4" />}
                  repositories={recommendedRepositories}
                />
              ) : null}
            </div>
          </div>
        </main>

        <aside className="hidden px-6 py-9 xl:block">
          <div className="sticky top-[88px] space-y-6">
            <Card className="gap-0 overflow-hidden rounded-xl border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <div className="relative h-[72px] overflow-hidden border-b border-border bg-[linear-gradient(135deg,#dbffdf_0%,#7adc97_38%,#97f0ba_56%,#7f5af0_100%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.85),transparent_22%),radial-gradient(circle_at_55%_50%,rgba(255,255,255,0.8),transparent_18%),radial-gradient(circle_at_84%_30%,rgba(255,255,255,0.7),transparent_18%)] opacity-80" />
                <button className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
                  ×
                </button>
              </div>
              <div className="p-4">
                <div className="mb-3 text-xs font-medium uppercase tracking-[0.04em] text-[#79c0ff]">
                  September 10 · 8:00 AM PT
                </div>
                <h3 className="mb-3 text-2xl font-semibold">GitHub Copilot Day</h3>
                <ul className="mb-4 space-y-1.5 text-sm leading-5 text-muted-foreground">
                  {[
                    "See how HydraFusion combines AI models to match the right model to the task",
                    "Learn to automate work, run parallel agents, and use your own models",
                    "Turn your best coding approaches into reusable Agent Skills",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 size-1.5 rounded-full bg-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="h-9 w-full rounded-md bg-[#f6f8fa] text-sm font-semibold text-[#24292f] hover:bg-white">
                  Set your reminder
                </Button>
              </div>
            </Card>

            <Card className="rounded-xl border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <div className="p-4">
                <h3 className="mb-4 text-[22px] font-semibold">Latest from our changelog</h3>
                <div className="space-y-4 border-l border-[#30363d] pl-4">
                  {changelogItems.map((item) => (
                    <div key={item.id} className="relative pl-2">
                      <span className="absolute -left-[22px] top-1.5 size-2 rounded-full bg-[#30363d]" />
                      <div className="mb-1 text-xs text-muted-foreground">{item.time}</div>
                      <div className="text-sm leading-6 text-foreground">{item.title}</div>
                    </div>
                  ))}
                </div>
                <button className="mt-5 text-sm text-[#58a6ff] hover:underline">
                  View changelog →
                </button>
              </div>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
