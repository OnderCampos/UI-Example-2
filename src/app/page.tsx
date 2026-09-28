"use client";

import * as React from "react";
import {
  Bell,
  ChevronDown,
  FileCode2,
  Filter,
  FolderGit2,
  GitBranch,
  Github,
  History,
  Menu,
  MessageSquare,
  Play,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Star,
  Target,
  Workflow,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

type DashboardHomeState = "populated-default";

type RepoItem = {
  owner: string;
  name: string;
  description?: string;
  language: string;
  languageColor: string;
  stars: string;
  avatar?: string;
  initials?: string;
};

type QuickAction = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  hasCaret?: boolean;
};

type EventCard = {
  date: string;
  title: string;
  bullets: string[];
  cta: string;
};

type ChangelogItem = {
  time: string;
  title: string;
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

const feedSections = [
  {
    title: "Trending repositories",
    showSeeMore: true,
    items: [
      {
        owner: "ayghri",
        name: "i-have-adhd",
        description:
          "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
        language: "Python",
        languageColor: "#3572A5",
        stars: "33.6k",
        initials: "A",
      },
      {
        owner: "spotify",
        name: "portal-ai-plugins",
        language: "TypeScript",
        languageColor: "#3178C6",
        stars: "716",
        initials: "S",
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
        languageColor: "#3572A5",
        stars: "51",
        initials: "J",
      },
    ],
  },
];

const quickActions: QuickAction[] = [
  { label: "Debug", icon: Settings2 },
  { label: "Agent", icon: Sparkles },
  { label: "Create issue", icon: Target },
  { label: "Write code", icon: FileCode2, hasCaret: true },
  { label: "Git", icon: GitBranch, hasCaret: true },
  { label: "Pull requests", icon: Workflow, hasCaret: true },
];

const copilotCard: EventCard = {
  date: "SEPTEMBER 10 · 8:00 AM PT",
  title: "GitHub Copilot Day",
  bullets: [
    "See how HydraFusion combines AI models to match the right model to the task",
    "Learn to automate work, run parallel agents, and use your own models",
    "Turn your best coding approaches into reusable Agent Skills",
  ],
  cta: "Set your reminder",
};

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

function IconButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={cn(
        "h-8 w-8 rounded-md border border-border bg-transparent text-foreground hover:bg-accent",
        className
      )}
    >
      {children}
    </Button>
  );
}

function RepoActionButton() {
  const [selectedAction, setSelectedAction] = React.useState("Star");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1 rounded-md border-border bg-[#30363d] px-3 text-[12px] text-foreground hover:bg-[#3a424c]"
        >
          <Star className="h-3.5 w-3.5" />
          {selectedAction}
          <ChevronDown className="h-3.5 w-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-32 rounded-md border-border bg-card text-card-foreground"
      >
        {['Star', 'Watch', 'Fork'].map((action) => (
          <DropdownMenuItem
            key={action}
            onClick={() => setSelectedAction(action)}
            className="cursor-pointer"
          >
            {action}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function RepositoryRow({ item }: { item: RepoItem }) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-border px-4 py-4 first:border-t-0">
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Avatar className="h-5 w-5 border border-border">
            <AvatarImage src={item.avatar} alt={`${item.owner} avatar`} />
            <AvatarFallback className="bg-muted text-[10px] text-foreground">
              {item.initials}
            </AvatarFallback>
          </Avatar>
          <span className="truncate text-[15px]">
            {item.owner}/{item.name}
          </span>
        </div>
        {item.description ? (
          <p className="mb-2 text-[14px] text-foreground">{item.description}</p>
        ) : null}
        <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.languageColor }}
            />
            {item.language}
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5" />
            {item.stars}
          </span>
        </div>
      </div>
      <RepoActionButton />
    </div>
  );
}

function DashboardHomeView({ state = "populated-default" }: { state?: DashboardHomeState }) {
  const [search, setSearch] = React.useState("Type / to search");
  const [askMode, setAskMode] = React.useState("Ask");
  const [scope, setScope] = React.useState("All repositories");
  const [filterOpen, setFilterOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-[linear-gradient(90deg,#1a222c_0,#1a222c_299px,#0d1117_299px,#0d1117_100%)] text-foreground">
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#30363d] bg-[#0d1117] px-3">
        <div className="flex items-center gap-3">
          <IconButton>
            <Menu className="h-4 w-4" />
          </IconButton>
          <div className="flex items-center gap-3">
            <Github className="h-8 w-8 text-white" />
            <span className="text-sm font-semibold">Dashboard</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden h-8 items-center gap-2 rounded-md border border-border bg-transparent px-3 text-sm text-muted-foreground lg:flex lg:w-[320px]">
            <Search className="h-4 w-4" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              placeholder="Type / to search"
            />
          </div>
          <IconButton className="hidden sm:flex">
            <Bell className="h-4 w-4" />
          </IconButton>
          <Separator orientation="vertical" className="hidden h-5 bg-border md:block" />
          <IconButton>
            <Plus className="h-4 w-4" />
          </IconButton>
          <IconButton>
            <History className="h-4 w-4" />
          </IconButton>
          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src="/Frida.png" alt="OnderCampos" />
            <AvatarFallback>OC</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-56px)] grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_320px]">
        <aside className="border-r border-[#30363d] bg-[#1a222c] px-5 py-8">
          <div className="mb-8 flex items-center gap-3 text-sm font-semibold">
            <Avatar className="h-5 w-5 border border-border">
              <AvatarImage src="/Frida.png" alt="OnderCampos" />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
            <span>OnderCampos</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Top repositories</h2>
            <Button className="h-7 rounded-md bg-success px-3 text-[12px] font-semibold text-[#051b11] hover:bg-[#2d7a3b]">
              <FolderGit2 className="h-3.5 w-3.5" />
              New
            </Button>
          </div>

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Find a repository…"
            className="mb-4 h-8 rounded-md border-[#30363d] bg-[#151b23] text-sm"
          />

          <div className="space-y-3 text-[14px] text-[#c9d1d9]">
            {topRepositories.map((repository) => (
              <button
                key={repository}
                type="button"
                className="flex w-full items-start gap-2 text-left hover:text-white"
              >
                <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-sm bg-[#30363d] text-[10px] text-pink-300">
                  F
                </span>
                <span className="break-all leading-5">{repository}</span>
              </button>
            ))}
          </div>

          <button type="button" className="mt-4 text-sm text-muted-foreground hover:text-foreground">
            Show more
          </button>
        </aside>

        <main className="bg-[radial-gradient(circle_at_top,#0f1f35_0,#0d1117_40%)] px-6 py-10 lg:px-14">
          <div className="mx-auto max-w-[805px]">
            <h1 className="mb-6 text-[36px] font-semibold tracking-[-0.02em] text-[#f0f6fc]">Home</h1>

            <Card className="mb-4 gap-0 rounded-2xl border-[#30363d] bg-[#1a222c] py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <CardContent className="p-4">
                <textarea
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="mb-4 min-h-[64px] w-full resize-none bg-transparent text-[30px] leading-tight text-[#8b949e] outline-none placeholder:text-[#8b949e]"
                  placeholder="Ask anything or type @ to add context"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAskMode(askMode === "Ask" ? "Edit" : "Ask")}
                      className="h-8 rounded-md border-border bg-transparent text-sm text-foreground hover:bg-accent"
                    >
                      <MessageSquare className="h-4 w-4" />
                      {askMode}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setScope(
                          scope === "All repositories" ? "Current repository" : "All repositories"
                        )
                      }
                      className="h-8 rounded-md border-border bg-transparent text-sm text-foreground hover:bg-accent"
                    >
                      <FolderGit2 className="h-4 w-4" />
                      {scope}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                    <IconButton className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </IconButton>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <button
                      type="button"
                      onClick={() => setScope(scope === "Auto" ? "Manual" : "Auto")}
                      className="flex items-center gap-1.5 hover:text-foreground"
                    >
                      <Sparkles className="h-4 w-4" />
                      {scope === "Auto" ? "Manual" : "Auto"}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                    <button type="button" className="hover:text-foreground">
                      <Target className="h-4 w-4" />
                    </button>
                    <button type="button" className="hover:text-foreground">
                      <Play className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mb-3 flex flex-wrap gap-3">
              {quickActions.map((action) => {
                const ActionIcon = action.icon;
                return (
                  <Button
                    key={action.label}
                    variant="outline"
                    size="sm"
                    className="h-10 rounded-full border-border bg-[#0d1117] px-4 text-sm text-foreground hover:bg-accent"
                  >
                    <ActionIcon className="h-4 w-4" />
                    {action.label}
                    {action.hasCaret ? <ChevronDown className="h-3.5 w-3.5" /> : null}
                  </Button>
                );
              })}
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-[#c9d1d9]">Feed</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilterOpen((value) => !value)}
                className="h-8 rounded-md border-border bg-[#30363d] px-3 text-sm text-foreground hover:bg-[#3a424c]"
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            {filterOpen ? (
              <Badge className="mb-4 rounded-full border-[rgba(122,220,151,0.3)] bg-[rgba(122,220,151,0.15)] px-3 py-1 text-[12px] text-primary hover:bg-[rgba(122,220,151,0.15)]">
                Feed filters updated
              </Badge>
            ) : null}

            <div className="space-y-4">
              {feedSections.map((section) => (
                <Card
                  key={section.title}
                  className="gap-0 rounded-lg border-[#30363d] bg-[#1a222c] py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
                    <Star className="h-4 w-4" />
                    <span>{section.title}</span>
                    {section.showSeeMore ? (
                      <button type="button" className="text-[#58a6ff] hover:underline">
                        · See more
                      </button>
                    ) : null}
                  </div>
                  <div>
                    {section.items.map((item) => (
                      <RepositoryRow key={`${item.owner}-${item.name}`} item={item} />
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>

        <aside className="border-l border-[#30363d] bg-[#0d1117] px-5 py-9">
          <div className="mx-auto max-w-[280px] space-y-5">
            <Card className="gap-0 overflow-hidden rounded-xl border-[#30363d] bg-[#161b22] py-0">
              <div className="h-[72px] bg-[linear-gradient(135deg,#3fb950,#7ee787_40%,#d2a8ff)]" />
              <CardContent className="p-4">
                <div className="mb-3 text-[12px] tracking-wide text-muted-foreground uppercase">
                  {copilotCard.date}
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-[#f0f6fc]">{copilotCard.title}</h3>
                <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                  {copilotCard.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-success" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Button className="h-9 w-full rounded-md bg-[#f6f8fa] text-sm font-semibold text-[#24292f] hover:bg-white">
                  {copilotCard.cta}
                </Button>
              </CardContent>
            </Card>

            <Card className="gap-0 rounded-xl border-[#30363d] bg-[#161b22] py-0">
              <CardContent className="p-4">
                <h3 className="mb-4 text-xl font-semibold text-[#f0f6fc]">Latest from our changelog</h3>
                <div className="space-y-4">
                  {changelogItems.map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="mt-1 h-2 w-2 rounded-full bg-[#30363d]" />
                        <span className="mt-1 h-full w-px bg-[#30363d] last:hidden" />
                      </div>
                      <div>
                        <div className="mb-1 text-xs text-muted-foreground">{item.time}</div>
                        <div className="text-sm leading-6 text-[#c9d1d9]">{item.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" className="mt-4 text-sm text-[#58a6ff] hover:underline">
                  View changelog →
                </button>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function HomePage() {
  return <DashboardHomeView state="populated-default" />;
}
