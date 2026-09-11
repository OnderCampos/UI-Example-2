"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  Bot,
  ChevronDown,
  CircleDot,
  CopyPlus,
  FolderGit2,
  GitBranch,
  Github,
  Home,
  Menu,
  MessageSquare,
  MonitorPlay,
  PanelTop,
  Play,
  Plus,
  Search,
  Sparkles,
  Star,
  BookCopy,
  Filter,
  Eye,
  BookOpen,
  Settings,
  Laptop,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type DashboardState = "default";

type RepositoryItem = {
  id: string;
  owner: string;
  name: string;
  description: string;
  language: string;
  stars: string;
  icon?: string;
  accent?: "purple" | "green" | "yellow" | "blue";
};

type SidebarRepo = {
  id: string;
  name: string;
  accent?: "purple" | "green" | "yellow" | "blue";
};

type ChangelogItem = {
  id: string;
  time: string;
  text: string;
};

type GithubDashboardHomeProps = {
  state?: DashboardState;
  initialPrompt?: string;
  initialScope?: string;
  initialVisibility?: string;
};

const sidebarRepos: SidebarRepo[] = [
  { id: "1", name: "OnderCampos/CountBoxingSofttek" },
  { id: "2", name: "Fridaplatform/cp-cloudagents", accent: "purple" },
  { id: "3", name: "OnderCampos/UI-Agent-Example" },
  { id: "4", name: "Fridaplatform/ReqGen-Backend", accent: "purple" },
  { id: "5", name: "Fridaplatform/ProductPlanner", accent: "purple" },
  { id: "6", name: "Fridaplatform/reqgen_frontend", accent: "purple" },
  { id: "7", name: "OnderCampos/FridaProductPlannerWebBackend" },
];

const trendingRepos: RepositoryItem[] = [
  {
    id: "1",
    owner: "ayghri",
    name: "i-have-adhd",
    description: "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
    language: "Python",
    stars: "33.6k",
    accent: "blue",
  },
  {
    id: "2",
    owner: "spotify",
    name: "portal-ai-plugins",
    description: "",
    language: "TypeScript",
    stars: "716",
    icon: "spotify",
    accent: "blue",
  },
];

const recommendedRepos: RepositoryItem[] = [
  {
    id: "3",
    owner: "jasonkylelol",
    name: "graphrag-chinese",
    description: "支持中文CNCCN 的 microsoft/graphrag",
    language: "Python",
    stars: "51",
    accent: "blue",
  },
];

const changelogItems: ChangelogItem[] = [
  { id: "1", time: "3 hours ago", text: "Remediate Code Quality findings with agentic autofix" },
  { id: "2", time: "13 hours ago", text: "Enterprise-managed sandbox in Copilot for JetBrains" },
  { id: "3", time: "18 hours ago", text: "GitHub Enterprise Server 3.22 is now generally available" },
  { id: "4", time: "Yesterday", text: "New customer portal help.github.com" },
];

const accentMap = {
  purple: "bg-[#ca7cff]",
  green: "bg-[var(--color-success)]",
  yellow: "bg-[var(--color-warning)]",
  blue: "bg-[#4493f8]",
};

function HeaderIconButton({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-border)] bg-transparent text-[var(--color-text)] transition hover:bg-[var(--color-surface)]"
        >
          <Icon className="h-4 w-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent sideOffset={6}>{label}</TooltipContent>
    </Tooltip>
  );
}

function RepoBadge({ accent = "purple" }: { accent?: keyof typeof accentMap }) {
  return <span className={cn("mt-1 h-3 w-3 rounded-sm", accentMap[accent])} />;
}

function RepoActionMenu({ label, options }: { label: string; options: string[] }) {
  const [selected, setSelected] = useState(options[0] ?? "Star");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 rounded-md border-[var(--color-border)] bg-[#30363d] px-3 text-xs font-semibold text-[var(--color-text)] hover:bg-[#373e47]"
        >
          <Star className="h-3.5 w-3.5" />
          {selected}
          <ChevronDown className="h-3.5 w-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]">
        {options.map((option) => (
          <DropdownMenuItem key={option} onClick={() => setSelected(option)} className="cursor-pointer">
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FeedCard({ title, actionText, items }: { title: string; actionText?: string; items: RepositoryItem[] }) {
  return (
    <Card className="gap-0 rounded-xl border-[var(--color-border)] bg-[var(--color-surface)] py-0 shadow-[var(--shadow-card)]">
      <CardContent className="px-0">
        <div className="flex items-center gap-2 px-4 py-3 text-sm text-[var(--color-text-muted)]">
          <PanelTop className="h-4 w-4" />
          <span>{title}</span>
          {actionText ? <span className="text-[var(--color-text-muted)]">·</span> : null}
          {actionText ? <button type="button" className="text-[#4493f8] hover:underline">{actionText}</button> : null}
        </div>
        <Separator className="bg-[var(--color-border)]" />
        {items.map((item, index) => (
          <div key={item.id}>
            <div className="flex items-start justify-between gap-4 px-4 py-4">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2">
                  {item.icon === "spotify" ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1DB954] text-black">
                      <span className="text-[10px] font-bold">S</span>
                    </div>
                  ) : (
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="bg-[var(--color-border)] text-[10px] text-[var(--color-text)]">
                        {item.owner.slice(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <span className="truncate text-sm font-semibold text-[var(--color-text)]">{item.owner}/{item.name}</span>
                </div>
                {item.description ? <p className="mb-2 text-sm text-[var(--color-text)]">{item.description}</p> : null}
                <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("h-3 w-3 rounded-full", accentMap[item.accent ?? "blue"])} />
                    {item.language}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5" />
                    {item.stars}
                  </div>
                </div>
              </div>
              <RepoActionMenu label="Repository action" options={["Star", "Fork", "Watch"]} />
            </div>
            {index < items.length - 1 ? <Separator className="bg-[var(--color-border)]" /> : null}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function GithubDashboardHome({
  state = "default",
  initialPrompt = "",
  initialScope = "all",
  initialVisibility = "Auto",
}: GithubDashboardHomeProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [scope, setScope] = useState(initialScope);
  const [visibility, setVisibility] = useState(initialVisibility);
  const [search, setSearch] = useState("");

  const filteredSidebar = useMemo(
    () => sidebarRepos.filter((repo) => repo.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  return (
    <div data-state={state} className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] [color-scheme:dark]">
      <header className="flex h-14 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-background)] px-3">
        <div className="flex items-center gap-3">
          <HeaderIconButton icon={Menu} label="Open navigation" />
          <Github className="h-8 w-8" />
          <div className="text-sm font-semibold">Dashboard</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-md border border-[var(--color-border)] bg-transparent px-3 md:flex md:w-[340px]">
            <Search className="h-4 w-4 text-[var(--color-text-muted)]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Type / to search"
              className="h-8 w-full bg-transparent text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)]"
            />
          </div>
          <HeaderIconButton icon={CopyPlus} label="Apps" />
          <Separator orientation="vertical" className="hidden h-6 bg-[var(--color-border)] md:block" />
          <HeaderIconButton icon={Plus} label="Create new" />
          <HeaderIconButton icon={CircleDot} label="Issues" />
          <HeaderIconButton icon={GitBranch} label="Pull requests" />
          <HeaderIconButton icon={MonitorPlay} label="Notifications" />
          <HeaderIconButton icon={Bell} label="Tray" />
          <Avatar className="h-8 w-8 border border-[var(--color-border)]">
            <AvatarFallback className="bg-[var(--color-surface)] text-xs text-[var(--color-text)]">OC</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-56px)] grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_320px]">
        <aside className="border-r border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-6">
          <div className="mb-10 flex items-center gap-3 text-sm font-semibold">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-[var(--color-border)] text-[10px]">OC</AvatarFallback>
            </Avatar>
            OnderCampos
            <ChevronDown className="h-4 w-4 text-[var(--color-text-muted)]" />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Top repositories</h2>
            <Button className="h-8 rounded-md bg-[var(--color-primary)] px-3 text-xs font-semibold text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)]">
              <BookCopy className="h-3.5 w-3.5" />
              New
            </Button>
          </div>

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Find a repository..."
            className="mb-4 h-8 rounded-md border-[var(--color-border)] bg-[var(--color-background)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]"
          />

          <div className="space-y-2">
            {filteredSidebar.map((repo) => (
              <button
                key={repo.id}
                type="button"
                className="flex w-full items-start gap-2 rounded-md px-1 py-1.5 text-left text-sm text-[var(--color-text)] transition hover:bg-[rgba(255,255,255,0.03)]"
              >
                <RepoBadge accent={repo.accent} />
                <span className="line-clamp-2">{repo.name}</span>
              </button>
            ))}
          </div>

          <button type="button" className="mt-3 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
            Show more
          </button>
        </aside>

        <main className="px-6 py-10 xl:px-14">
          <div className="max-w-[805px]">
            <h1 className="mb-6 text-[40px] font-semibold leading-none tracking-[-0.02em]">Home</h1>

            <Card className="gap-0 rounded-2xl border-[var(--color-border)] bg-[var(--color-surface)] py-0 shadow-[var(--shadow-card)]">
              <CardContent className="p-4">
                <textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Ask anything or type @ to add context"
                  className="min-h-[66px] w-full resize-none bg-transparent text-[22px] leading-8 text-[var(--color-text)] outline-none placeholder:text-[#8f98a2]"
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 rounded-md border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] text-xs font-semibold text-[var(--color-text)] hover:bg-[rgba(255,255,255,0.05)]">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Ask
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                    <Select value={scope} onValueChange={setScope}>
                      <SelectTrigger size="sm" className="h-8 rounded-md border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] text-xs font-semibold text-[var(--color-text)]">
                        <SelectValue placeholder="All repositories" />
                      </SelectTrigger>
                      <SelectContent className="border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]">
                        <SelectItem value="all">All repositories</SelectItem>
                        <SelectItem value="top">Top repositories</SelectItem>
                        <SelectItem value="starred">Starred</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] text-[var(--color-text)] hover:bg-[rgba(255,255,255,0.05)]">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button type="button" className="flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                          <Bot className="h-4 w-4" />
                          {visibility}
                          <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]">
                        {[
                          "Auto",
                          "Focused",
                          "Creative",
                        ].map((item) => (
                          <DropdownMenuItem key={item} onClick={() => setVisibility(item)} className="cursor-pointer">
                            {item}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <button type="button" aria-label="Reset prompt" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                      <Sparkles className="h-4 w-4" />
                    </button>
                    <button type="button" aria-label="Submit prompt" className="text-[var(--color-text-muted)] hover:text-[var(--color-text)]">
                      <Play className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { icon: Laptop, text: "Debug" },
                { icon: Bot, text: "Agent" },
                { icon: CircleDot, text: "Create issue" },
                { icon: Home, text: "Write code" },
                { icon: GitBranch, text: "Git" },
                { icon: FolderGit2, text: "Pull requests" },
              ].map((item) => (
                <Button
                  key={item.text}
                  variant="outline"
                  className="h-9 rounded-full border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] px-4 text-sm text-[var(--color-text)] hover:bg-[rgba(255,255,255,0.05)]"
                >
                  <item.icon className="h-4 w-4" />
                  {item.text}
                </Button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Feed</h2>
              <Button variant="outline" size="sm" className="h-8 rounded-md border-[var(--color-border)] bg-[rgba(255,255,255,0.02)] px-3 text-xs text-[var(--color-text)] hover:bg-[rgba(255,255,255,0.05)]">
                <Filter className="h-3.5 w-3.5" />
                Filter
              </Button>
            </div>

            <div className="mt-3 space-y-4">
              <FeedCard title="Trending repositories" actionText="See more" items={trendingRepos} />
              <FeedCard title="Recommended for you" items={recommendedRepos} />
            </div>
          </div>
        </main>

        <aside className="px-6 py-9">
          <div className="space-y-5">
            <Card className="gap-0 overflow-hidden rounded-xl border-[var(--color-border)] bg-[var(--color-surface)] py-0 shadow-[var(--shadow-card)]">
              <div className="relative h-[72px] bg-[linear-gradient(135deg,#7adc97_0%,#ffffff_45%,#7adc97_100%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(255,255,255,0.85),transparent_24%),radial-gradient(circle_at_70%_55%,rgba(76,29,149,0.32),transparent_18%)] opacity-90" />
                <button type="button" aria-label="Dismiss card" className="absolute right-3 top-3 text-[var(--color-text-muted)]">
                  ×
                </button>
              </div>
              <CardContent className="p-4">
                <div className="mb-2 text-xs font-medium uppercase tracking-wide text-[#7d8590]">September 10 · 8:00 AM PT</div>
                <h3 className="mb-2 text-[28px] font-semibold leading-8">GitHub Copilot Day</h3>
                <ul className="mb-4 space-y-1 text-sm text-[var(--color-text-muted)]">
                  <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />See how HydraFusion combines AI models to match the right model to the task</li>
                  <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />Learn to automate work, run parallel agents, and use your own models</li>
                  <li className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />Turn your best coding approaches into reusable Agent Skills</li>
                </ul>
                <Button className="h-8 w-full rounded-md bg-[#f6f8fa] text-xs font-semibold text-[#24292f] hover:bg-white">Set your reminder</Button>
              </CardContent>
            </Card>

            <Card className="gap-0 rounded-xl border-[var(--color-border)] bg-[var(--color-surface)] py-0 shadow-[var(--shadow-card)]">
              <CardContent className="p-4">
                <h3 className="mb-4 text-lg font-semibold">Latest from our changelog</h3>
                <div className="space-y-4">
                  {changelogItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-[10px_1fr] gap-3">
                      <div className="flex justify-center pt-1">
                        <span className="h-2 w-2 rounded-full bg-[var(--color-border)]" />
                      </div>
                      <div>
                        <div className="mb-1 text-xs text-[var(--color-text-muted)]">{item.time}</div>
                        <div className="text-sm leading-6 text-[var(--color-text)]">{item.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" className="mt-4 text-sm text-[#4493f8] hover:underline">View changelog →</button>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function HomePage() {
  return <GithubDashboardHome state="default" />;
}
