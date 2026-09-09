"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Bell,
  BookMarked,
  Bot,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Filter,
  FolderGit2,
  GitBranch,
  Github,
  Home,
  Menu,
  Monitor,
  Plus,
  Search,
  Sparkles,
  SquareTerminal,
  Star,
  Zap,
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

type FeedItem = {
  id: string;
  owner: string;
  name: string;
  description: string;
  language: string;
  stars: string;
  accent: string;
  avatar?: string;
};

type FeedSection = {
  id: string;
  title: string;
  linkLabel?: string;
  items: FeedItem[];
};

type DashboardHomeFeedViewProps = {
  state?: "default";
  username?: string;
  searchPlaceholder?: string;
  askPlaceholder?: string;
  sections?: FeedSection[];
};

const topRepositories = [
  "OnderCampos/CountBoxingSofttek",
  "Fridaplatform/cp-cloudagents",
  "OnderCampos/UI-Agent-Example",
  "Fridaplatform/ReqGen-Backend",
  "Fridaplatform/ProductPlanner",
  "OnderCampos/FridaProductPlannerWebBackend",
];

const defaultSections: FeedSection[] = [
  {
    id: "trending",
    title: "Trending repositories",
    linkLabel: "See more",
    items: [
      {
        id: "adhd",
        owner: "ayyhri",
        name: "i-have-adhd",
        description:
          "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
        language: "Python",
        stars: "33.6k",
        accent: "#2f81f7",
        avatar: "/Frida.png",
      },
      {
        id: "spotify",
        owner: "spotify",
        name: "portal-ai-plugins",
        description: "",
        language: "TypeScript",
        stars: "716",
        accent: "#2f81f7",
      },
    ],
  },
  {
    id: "recommended",
    title: "Recommended for you",
    items: [
      {
        id: "graphrag",
        owner: "jasonkylelol",
        name: "graphrag-chinese",
        description: "支持中文版CNCCN 的 microsoft/graphrag",
        language: "Python",
        stars: "51",
        accent: "#2f81f7",
      },
    ],
  },
];

const changelogItems = [
  ["3 hours ago", "Remediate Code Quality findings with agentic autofix"],
  ["13 hours ago", "Enterprise-managed sandbox in Copilot for JetBrains"],
  ["18 hours ago", "GitHub Enterprise Server 3.22 is now generally available"],
  ["Yesterday", "New customer portal help.github.com"],
] as const;

const actionPills = [
  { label: "Debug", icon: SquareTerminal },
  { label: "Agent", icon: Bot },
  { label: "Create issue", icon: CircleDot },
  { label: "Write code", icon: BookMarked, menu: true },
  { label: "Git", icon: GitBranch, menu: true },
  { label: "Pull requests", icon: GitBranch, menu: true },
];

const navIcons = [Github, Bell, Plus, Monitor, FolderGit2];

function RepoRow({ item }: { item: FeedItem }) {
  const [starred, setStarred] = useState(false);
  const [forked, setForked] = useState(false);

  return (
    <div className="flex items-start justify-between gap-4 border-t border-border px-4 py-4 first:border-t-0 sm:px-5">
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Avatar className="size-5 border border-border">
            {item.avatar ? <AvatarImage src={item.avatar} alt={item.owner} /> : null}
            <AvatarFallback className="bg-[--surface-muted] text-[10px] text-muted-foreground">
              {item.owner.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="truncate">
            {item.owner}/{item.name}
          </span>
        </div>
        {item.description ? (
          <p className="mb-3 text-[13px] leading-5 text-foreground/95">{item.description}</p>
        ) : null}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span
              className="size-3 rounded-full"
              style={{ backgroundColor: item.accent }}
            />
            {item.language}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="size-3.5" />
            {item.stars}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-8 rounded-md border-border bg-[--surface-muted] px-3 text-xs text-foreground hover:bg-[--panel-hover]",
            starred && "border-primary bg-primary/15 text-primary"
          )}
          onClick={() => setStarred((value) => !value)}
        >
          <Star className={cn("size-3.5", starred && "fill-current")} />
          {starred ? "Starred" : "Star"}
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label={forked ? "Forked repository" : "Fork repository"}
          className={cn(
            "h-8 w-8 rounded-md border-border bg-[--surface-muted] text-muted-foreground hover:bg-[--panel-hover]",
            forked && "border-primary text-primary"
          )}
          onClick={() => setForked((value) => !value)}
        >
          <GitBranch className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}

function FeedSectionCard({ section }: { section: FeedSection }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-lg border-border bg-card py-0 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground sm:px-5">
        <Sparkles className="size-4" />
        <span className="font-medium text-foreground">{section.title}</span>
        {section.linkLabel ? (
          <button className="text-primary hover:underline">{section.linkLabel}</button>
        ) : null}
      </div>
      {section.items.map((item) => (
        <RepoRow key={item.id} item={item} />
      ))}
    </Card>
  );
}

function DashboardHomeFeedView({
  state = "default",
  username = "OnderCampos",
  searchPlaceholder = "Find a repository...",
  askPlaceholder = "Ask anything or type @ to add context",
  sections = defaultSections,
}: DashboardHomeFeedViewProps) {
  const [globalSearch, setGlobalSearch] = useState("");
  const [repoSearch, setRepoSearch] = useState("");
  const [askValue, setAskValue] = useState("");
  const [repoScope, setRepoScope] = useState("All repositories");
  const [sortMode, setSortMode] = useState("Auto");
  const filteredRepos = useMemo(
    () =>
      topRepositories.filter((repo) =>
        repo.toLowerCase().includes(repoSearch.toLowerCase())
      ),
    [repoSearch]
  );

  return (
    <div data-state={state} className="min-h-screen bg-background text-foreground">
      <header className="flex h-14 items-center justify-between border-b border-border bg-[#0d1117] px-3 sm:px-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon-sm"
            className="border-border bg-transparent text-foreground hover:bg-[--surface-muted]"
          >
            <Menu className="size-4" />
          </Button>
          <Github className="size-8 text-white" />
          <span className="text-sm font-semibold">Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={globalSearch}
              onChange={(event) => setGlobalSearch(event.target.value)}
              placeholder="Type / to search"
              className="h-9 w-72 rounded-md border-border bg-background pl-9 text-sm"
            />
          </div>
          {navIcons.map((Icon, index) => (
            <Button
              key={`${Icon.displayName ?? "icon"}-${index}`}
              variant="outline"
              size="icon-sm"
              className="border-border bg-transparent text-muted-foreground hover:bg-[--surface-muted] hover:text-foreground"
            >
              <Icon className="size-4" />
            </Button>
          ))}
          <Avatar className="size-8 border border-border">
            <AvatarImage src="/Frida.png" alt={username} />
            <AvatarFallback>OC</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-56px)] grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_312px]">
        <aside className="border-r border-border bg-[--sidebar-bg] px-4 py-7">
          <div className="mb-8 flex items-center gap-3 text-sm font-semibold">
            <Avatar className="size-6 border border-border">
              <AvatarImage src="/Frida.png" alt={username} />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
            <span>{username}</span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Top repositories</h2>
            <Button className="h-8 rounded-md bg-primary px-3 text-[13px] font-semibold text-primary-foreground hover:bg-[--primary-hover]">
              <Plus className="size-3.5" />
              New
            </Button>
          </div>
          <Input
            value={repoSearch}
            onChange={(event) => setRepoSearch(event.target.value)}
            placeholder={searchPlaceholder}
            className="mb-4 h-8 rounded-md border-border bg-background text-sm"
          />
          <div className="space-y-2 text-sm text-[13px]">
            {filteredRepos.map((repo, index) => (
              <button
                key={repo}
                className="flex w-full items-start gap-2 rounded-md px-1 py-1 text-left text-foreground/95 hover:bg-[--surface-muted]"
              >
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-sm bg-[#30363d] text-[9px] font-semibold text-pink-300">
                  {index < 5 ? "F" : "O"}
                </span>
                <span className="line-clamp-2 break-all">{repo}</span>
              </button>
            ))}
          </div>
          <button className="mt-4 text-sm text-muted-foreground hover:text-foreground">
            Show more
          </button>
        </aside>

        <main className="px-5 py-8 sm:px-8 xl:px-14">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-5 text-[2rem] font-semibold tracking-[-0.02em]">Home</h1>

            <Card className="gap-0 rounded-2xl border-border bg-card py-0 shadow-[var(--shadow-card)]">
              <div className="p-4 pb-3">
                <textarea
                  value={askValue}
                  onChange={(event) => setAskValue(event.target.value)}
                  placeholder={askPlaceholder}
                  className="min-h-22 w-full resize-none border-0 bg-transparent text-[1.05rem] text-foreground outline-none placeholder:text-muted-foreground"
                />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-md border-border bg-[--surface-muted] text-foreground hover:bg-[--panel-hover]"
                    >
                      <Sparkles className="size-3.5" />
                      Ask
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 rounded-md border-border bg-[--surface-muted] text-foreground hover:bg-[--panel-hover]"
                        >
                          <FolderGit2 className="size-3.5" />
                          {repoScope}
                          <ChevronDown className="size-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {["All repositories", "Top repositories", "Starred only"].map((option) => (
                          <DropdownMenuItem key={option} onSelect={() => setRepoScope(option)}>
                            {option}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      className="h-8 w-8 rounded-md border-border bg-[--surface-muted] text-muted-foreground hover:bg-[--panel-hover]"
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 rounded-md px-2 text-muted-foreground hover:bg-transparent hover:text-foreground"
                        >
                          <Bot className="size-4" />
                          {sortMode}
                          <ChevronDown className="size-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {["Auto", "Fast", "Detailed"].map((option) => (
                          <DropdownMenuItem key={option} onSelect={() => setSortMode(option)}>
                            {option}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-muted-foreground hover:bg-transparent hover:text-foreground"
                    >
                      <Zap className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="text-muted-foreground hover:bg-transparent hover:text-foreground"
                    >
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {actionPills.map(({ label, icon: Icon, menu }) => (
                <Button
                  key={label}
                  variant="outline"
                  size="sm"
                  className="h-10 rounded-full border-border bg-background px-4 text-sm text-foreground shadow-[var(--shadow-card)] hover:bg-[--surface-muted]"
                >
                  <Icon className="size-4" />
                  {label}
                  {menu ? <ChevronDown className="size-3.5 text-muted-foreground" /> : null}
                </Button>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Feed</h2>
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-md border-border bg-[--surface-muted] text-foreground hover:bg-[--panel-hover]"
              >
                <Filter className="size-3.5" />
                Filter
              </Button>
            </div>

            <div className="mt-3 space-y-4">
              {sections.map((section) => (
                <FeedSectionCard key={section.id} section={section} />
              ))}
            </div>
          </div>
        </main>

        <aside className="px-4 py-9 sm:px-6 xl:pr-8">
          <div className="mx-auto flex max-w-[280px] flex-col gap-5">
            <Card className="gap-0 overflow-hidden rounded-xl border-border bg-card py-0 shadow-[var(--shadow-card)]">
              <div className="relative h-[72px] overflow-hidden border-b border-border bg-[linear-gradient(135deg,#8ff0a4_0%,#59d98e_30%,#c6f6d5_55%,#7ee787_100%)]">
                <div className="absolute inset-0 opacity-80 [background-image:linear-gradient(45deg,rgba(255,255,255,0.4)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.4)_75%,transparent_75%,transparent)] [background-size:48px_48px]" />
                <button className="absolute right-3 top-3 text-[#57606a] hover:text-[#24292f]">×</button>
              </div>
              <div className="p-4">
                <div className="mb-2 text-xs font-medium tracking-wide text-[#58a6ff] uppercase">
                  September 10 · 8:00 AM PT
                </div>
                <h3 className="mb-2 text-2xl font-semibold">GitHub Copilot Day</h3>
                <ul className="space-y-2 text-sm leading-5 text-muted-foreground">
                  {[
                    "See how HydraFusion combines AI models to match the right model to the task",
                    "Learn to automate work, run parallel agents, and use your own models",
                    "Turn your best coding approaches into reusable Agent Skills",
                  ].map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-2 size-1.5 rounded-full bg-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-4 h-8 w-full rounded-md bg-white text-[#24292f] hover:bg-white/90">
                  Set your reminder
                </Button>
              </div>
            </Card>

            <Card className="gap-0 rounded-xl border-border bg-card py-0 shadow-[var(--shadow-card)]">
              <div className="p-4">
                <h3 className="mb-4 text-lg font-semibold">Latest from our changelog</h3>
                <div className="space-y-4">
                  {changelogItems.map(([time, title], index) => (
                    <div key={title} className="grid grid-cols-[14px_1fr] gap-3">
                      <div className="flex flex-col items-center">
                        <span className="mt-1 size-2 rounded-full bg-border" />
                        {index < changelogItems.length - 1 ? (
                          <span className="mt-1 h-full w-px bg-border" />
                        ) : null}
                      </div>
                      <div>
                        <div className="mb-1 text-xs text-muted-foreground">{time}</div>
                        <div className="text-sm leading-5 text-foreground">{title}</div>
                      </div>
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
  return <DashboardHomeFeedView state="default" />;
}
