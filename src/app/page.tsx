"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Filter,
  FlaskConical,
  FolderGit2,
  GitBranch,
  GitFork,
  Github,
  Home,
  LayoutGrid,
  Menu,
  MonitorPlay,
  Plus,
  Search,
  Sparkles,
  SquareTerminal,
  Star,
  Users,
  Zap,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type RepoItem = {
  owner: string;
  name: string;
  description: string;
  language: string;
  stars: string;
  avatar?: string;
  accent?: string;
};

type FeedSection = {
  title: string;
  items: RepoItem[];
  showMore?: boolean;
};

type DashboardHomeViewProps = {
  state?: "default";
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

const feedSections: FeedSection[] = [
  {
    title: "Trending repositories",
    showMore: true,
    items: [
      {
        owner: "ayghri",
        name: "i-have-adhd",
        description:
          "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
        language: "Python",
        stars: "33.6k",
        avatar: "/next.svg",
      },
      {
        owner: "spotify",
        name: "portal-ai-plugins",
        description: "",
        language: "TypeScript",
        stars: "716",
        accent: "#1DB954",
      },
    ],
  },
  {
    title: "Recommended for you",
    items: [
      {
        owner: "jasonkylelol",
        name: "graphrag-chinese",
        description: "支持中文CNCCN 的 microsoft/graphrag",
        language: "Python",
        stars: "51",
        avatar: "/Frida.png",
      },
    ],
  },
];

const changelogItems = [
  {
    time: "3 hours ago",
    text: "Remediate Code Quality findings with agentic autofix",
  },
  {
    time: "13 hours ago",
    text: "Enterprise-managed sandbox in Copilot for JetBrains",
  },
  {
    time: "18 hours ago",
    text: "GitHub Enterprise Server 3.22 is now generally available",
  },
  {
    time: "Yesterday",
    text: "New customer portal help.github.com",
  },
];

const headerIcons = [LayoutGrid, Plus, Bell, GitBranch, MonitorPlay, Home];
const actionChips = [
  { label: "Debug", icon: FlaskConical },
  { label: "Agent", icon: Sparkles },
  { label: "Create issue", icon: CircleDot },
  { label: "Write code", icon: BookOpen, withChevron: true },
  { label: "Git", icon: GitBranch, withChevron: true },
  { label: "Pull requests", icon: GitFork, withChevron: true },
];

function RepoAvatar({ label, accent, src }: { label: string; accent?: string; src?: string }) {
  return (
    <div
      className="flex size-6 items-center justify-center overflow-hidden rounded-full border border-border bg-background text-[10px] font-semibold text-foreground"
      style={accent ? { backgroundColor: accent, borderColor: accent, color: "#ffffff" } : undefined}
    >
      {src ? (
        <Avatar className="size-6 rounded-full">
          <AvatarImage src={src} alt={label} />
          <AvatarFallback>{label.slice(0, 1)}</AvatarFallback>
        </Avatar>
      ) : (
        label.slice(0, 1).toUpperCase()
      )}
    </div>
  );
}

function RepoRow({ item, compact = false }: { item: RepoItem; compact?: boolean }) {
  const [starred, setStarred] = useState(false);
  const [menuValue, setMenuValue] = useState("Star");

  return (
    <div className={cn("flex items-start justify-between gap-4 py-4", compact && "py-3")}>
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-2">
          <RepoAvatar label={item.owner} accent={item.accent} src={item.avatar} />
          <button className="truncate text-left text-[15px] font-semibold text-foreground hover:text-primary">
            {item.owner}/{item.name}
          </button>
        </div>
        {item.description ? (
          <p className="mb-2 text-[15px] leading-6 text-foreground">{item.description}</p>
        ) : null}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[var(--language-blue)]" />
            {item.language}
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="size-3.5" />
            {item.stars}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 items-center overflow-hidden rounded-md border border-border bg-[var(--color-surface)]">
        <Button
          variant="ghost"
          className={cn(
            "h-8 rounded-none border-0 px-4 text-xs font-semibold text-foreground hover:bg-[var(--color-hover-surface)] hover:text-foreground",
            starred && "text-primary"
          )}
          onClick={() => setStarred((value) => !value)}
        >
          <Star className={cn("size-3.5", starred && "fill-current")} />
          {starred ? "Starred" : menuValue}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-none border-l border-border text-muted-foreground hover:bg-[var(--color-hover-surface)] hover:text-foreground"
            >
              <ChevronDown className="size-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36 border-border bg-card text-card-foreground">
            {[
              "Star",
              "Watch",
              "Save",
            ].map((option) => (
              <DropdownMenuItem key={option} onClick={() => setMenuValue(option)}>
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function DashboardHomeView({ state = "default" }: DashboardHomeViewProps) {
  const [sidebarQuery, setSidebarQuery] = useState("");
  const [headerQuery, setHeaderQuery] = useState("");
  const [prompt, setPrompt] = useState("");
  const [contextScope, setContextScope] = useState("All repositories");
  const [answerMode, setAnswerMode] = useState("Auto");

  const filteredRepos = useMemo(
    () =>
      topRepositories.filter((repo) =>
        repo.toLowerCase().includes(sidebarQuery.toLowerCase())
      ),
    [sidebarQuery]
  );

  return (
    <main data-state={state} className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
          <div className="flex h-14 items-center justify-between gap-4 px-3">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="size-8 border border-border text-muted-foreground hover:bg-[var(--color-hover-surface)] hover:text-foreground">
                <Menu className="size-4" />
              </Button>
              <Github className="size-8" />
              <span className="text-sm font-semibold">Dashboard</span>
            </div>
            <div className="flex flex-1 items-center justify-end gap-3">
              <div className="relative hidden w-full max-w-[420px] lg:block">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={headerQuery}
                  onChange={(event) => setHeaderQuery(event.target.value)}
                  placeholder="Type / to search"
                  className="h-8 rounded-md border-border bg-background pl-9 text-sm"
                />
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                {headerIcons.map((Icon, index) => (
                  <Button
                    key={`${Icon.displayName}-${index}`}
                    variant="ghost"
                    size="icon"
                    className="size-8 border border-transparent hover:border-border hover:bg-[var(--color-hover-surface)] hover:text-foreground"
                  >
                    <Icon className="size-4" />
                  </Button>
                ))}
              </div>
              <Avatar className="size-8 border border-border">
                <AvatarImage src="/Frida.png" alt="OnderCampos" />
                <AvatarFallback>OC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="grid flex-1 grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_318px]">
          <aside className="border-r border-border px-4 py-6 xl:block">
            <div className="mb-8 flex items-center gap-3">
              <Avatar className="size-6 border border-border">
                <AvatarImage src="/Frida.png" alt="OnderCampos" />
                <AvatarFallback>OC</AvatarFallback>
              </Avatar>
              <button className="flex items-center gap-1 text-sm font-semibold hover:text-primary">
                OnderCampos
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </button>
            </div>

            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Top repositories</h2>
              <Button className="h-8 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground hover:bg-[var(--color-primary-hover)]">
                <Plus className="size-3.5" />
                New
              </Button>
            </div>

            <Input
              value={sidebarQuery}
              onChange={(event) => setSidebarQuery(event.target.value)}
              placeholder="Find a repository..."
              className="mb-4 h-8 rounded-md border-border bg-background text-sm"
            />

            <div className="space-y-2 text-sm">
              {filteredRepos.map((repo, index) => (
                <button
                  key={repo}
                  className="flex w-full items-start gap-2 rounded-md px-1 py-1 text-left text-foreground hover:bg-[var(--color-hover-surface)]"
                >
                  <span className="mt-0.5 flex size-4 items-center justify-center rounded-sm bg-[#30363d] text-[9px] font-bold text-[#f778ba]">
                    {index < 2 ? "◼" : "F"}
                  </span>
                  <span className="line-clamp-2">{repo}</span>
                </button>
              ))}
            </div>

            <button className="mt-4 text-sm text-muted-foreground hover:text-foreground">
              Show more
            </button>
          </aside>

          <section className="px-6 py-10 xl:px-14">
            <h1 className="mb-4 text-[2rem] font-semibold tracking-[-0.02em]">Home</h1>

            <Card className="gap-0 rounded-2xl border-border bg-card py-0 shadow-[var(--shadow-card)]">
              <CardContent className="p-4">
                <textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Ask anything or type @ to add context"
                  className="min-h-24 w-full resize-none border-0 bg-transparent text-lg text-foreground outline-none placeholder:text-muted-foreground"
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" className="h-8 border-border bg-transparent text-sm text-foreground hover:bg-[var(--color-hover-surface)] hover:text-foreground">
                      <SquareTerminal className="size-4" />
                      Ask
                      <ChevronDown className="size-3.5" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-8 border-border bg-transparent text-sm text-foreground hover:bg-[var(--color-hover-surface)] hover:text-foreground">
                          <FolderGit2 className="size-4" />
                          {contextScope}
                          <ChevronDown className="size-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="border-border bg-card text-card-foreground">
                        {[
                          "All repositories",
                          "My repositories",
                          "Starred repositories",
                        ].map((option) => (
                          <DropdownMenuItem key={option} onClick={() => setContextScope(option)}>
                            {option}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="icon-sm" className="border-border bg-transparent text-foreground hover:bg-[var(--color-hover-surface)] hover:text-foreground">
                      <Plus className="size-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 px-2 text-sm text-muted-foreground hover:bg-[var(--color-hover-surface)] hover:text-foreground">
                          <Users className="size-4" />
                          {answerMode}
                          <ChevronDown className="size-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-border bg-card text-card-foreground">
                        {["Auto", "Solo", "Team"].map((option) => (
                          <DropdownMenuItem key={option} onClick={() => setAnswerMode(option)}>
                            {option}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:bg-[var(--color-hover-surface)] hover:text-foreground">
                      <Zap className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:bg-[var(--color-hover-surface)] hover:text-foreground">
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 flex flex-wrap gap-3">
              {actionChips.map(({ label, icon: Icon, withChevron }) => (
                <Button
                  key={label}
                  variant="outline"
                  className="h-9 rounded-full border-border bg-background px-4 text-sm text-foreground hover:bg-[var(--color-hover-surface)] hover:text-foreground"
                >
                  <Icon className="size-4" />
                  {label}
                  {withChevron ? <ChevronDown className="size-3.5" /> : null}
                </Button>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Feed</h2>
              <Button variant="outline" className="h-8 border-border bg-[var(--color-surface)] px-3 text-sm text-foreground hover:bg-[var(--color-hover-surface)] hover:text-foreground">
                <Filter className="size-4" />
                Filter
              </Button>
            </div>

            <div className="mt-3 space-y-4">
              {feedSections.map((section) => (
                <Card key={section.title} className="gap-0 rounded-lg border-border bg-card py-0 shadow-[var(--shadow-card)]">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2 px-4 pt-4 text-sm text-muted-foreground">
                      <Star className="size-4" />
                      <span>{section.title}</span>
                      {section.showMore ? (
                        <button className="text-primary hover:underline">See more</button>
                      ) : null}
                    </div>
                    <div className="px-4 pb-2">
                      {section.items.map((item, index) => (
                        <div key={`${item.owner}/${item.name}`}>
                          <RepoRow item={item} compact={section.items.length > 1} />
                          {index !== section.items.length - 1 ? <Separator className="bg-border" /> : null}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <aside className="border-l border-border px-6 py-9">
            <Card className="gap-0 overflow-hidden rounded-xl border-border bg-card py-0 shadow-[var(--shadow-card)]">
              <div className="h-18 bg-[linear-gradient(135deg,#b3f0cb_0%,#54c878_35%,#d7f7e2_60%,#7adc97_100%)]" />
              <CardContent className="p-0">
                <div className="border-b border-border px-4 py-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  September 10 · 8:00 AM PT
                </div>
                <div className="space-y-4 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-semibold">GitHub Copilot Day</h3>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground">×</button>
                  </div>
                  <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                    {[
                      "See how HydraFusion combines AI models to match the right model to the task",
                      "Learn to automate work, run parallel agents, and use your own models",
                      "Turn your best coding approaches into reusable Agent Skills",
                    ].map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 size-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="h-10 w-full rounded-md bg-[#e6edf3] text-sm font-semibold text-background hover:bg-white/90">
                    Set your reminder
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-5 gap-0 rounded-xl border-border bg-card py-0 shadow-[var(--shadow-card)]">
              <CardContent className="p-4">
                <h3 className="mb-4 text-2xl font-semibold">Latest from our changelog</h3>
                <div className="space-y-5">
                  {changelogItems.map((item, index) => (
                    <div key={item.text} className="relative pl-6">
                      {index !== changelogItems.length - 1 ? (
                        <span className="absolute top-4 left-[7px] h-[calc(100%+16px)] w-px bg-border" />
                      ) : null}
                      <span className="absolute top-1 left-0 size-3 rounded-full border border-border bg-background" />
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                      <p className="mt-1 text-sm leading-6 text-foreground">{item.text}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-5 text-sm text-muted-foreground hover:text-foreground">
                  View changelog →
                </button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default function HomePage() {
  return <DashboardHomeView state="default" />;
}
