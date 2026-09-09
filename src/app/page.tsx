"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowUp,
  BookText,
  Bot,
  ChevronDown,
  CircleDot,
  Clock3,
  Filter,
  GitBranch,
  Github,
  Grip,
  House,
  Inbox,
  Menu,
  MessageSquare,
  Monitor,
  PanelsTopLeft,
  Plus,
  Search,
  Sparkles,
  Star,
  Workflow,
  X,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type DashboardHomeState = "default";

type RepoItem = {
  name: string;
  icon: string;
  accent?: string;
};

type FeedItem = {
  name: string;
  description?: string;
  language: string;
  languageColor: string;
  stars: string;
  avatar: string;
};

type FeedSection = {
  title: string;
  action: string;
  items: FeedItem[];
};

type ChangelogItem = {
  time: string;
  title: string;
};

type DashboardHomeProps = {
  state?: DashboardHomeState;
};

const topRepositories: RepoItem[] = [
  { name: "OnderCampos/CountBoxingSofttek", icon: "O" },
  { name: "Fridaplatform/cp-cloudagents", icon: "F", accent: "#f778ba" },
  { name: "OnderCampos/UI-Agent-Example", icon: "O" },
  { name: "Fridaplatform/ReqGen-Backend", icon: "F", accent: "#f778ba" },
  { name: "Fridaplatform/ProductPlanner", icon: "F", accent: "#f778ba" },
  { name: "Fridaplatform/reqgen_frontend", icon: "F", accent: "#f778ba" },
  { name: "OnderCampos/FridaProductPlannerWebBackend", icon: "O" },
];

const feedSections: FeedSection[] = [
  {
    title: "Trending repositories",
    action: "See more",
    items: [
      {
        name: "ayghri/i-have-adhd",
        description: "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
        language: "Python",
        languageColor: "#3572A5",
        stars: "33.6k",
        avatar: "🧠",
      },
      {
        name: "spotify/portal-ai-plugins",
        language: "TypeScript",
        languageColor: "#3178C6",
        stars: "716",
        avatar: "🟢",
      },
    ],
  },
  {
    title: "Recommended for you",
    action: "",
    items: [
      {
        name: "jasonkylelol/graphrag-chinese",
        description: "支持中文CNCCN 的 microsoft/graphrag",
        language: "Python",
        languageColor: "#3572A5",
        stars: "51",
        avatar: "🐼",
      },
    ],
  },
];

const changelogItems: ChangelogItem[] = [
  { time: "3 hours ago", title: "Remediate Code Quality findings with agentic autofix" },
  { time: "13 hours ago", title: "Enterprise-managed sandbox in Copilot for JetBrains" },
  { time: "18 hours ago", title: "GitHub Enterprise Server 3.22 is now generally available" },
  { time: "Yesterday", title: "New customer portal help.github.com" },
];

function AppIconButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="h-8 w-8 rounded-md border border-[var(--border)] bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
    >
      {children}
    </Button>
  );
}

function DashboardHomeView({ state = "default" }: DashboardHomeProps) {
  const [headerSearch, setHeaderSearch] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [question, setQuestion] = useState("");
  const [audience, setAudience] = useState("all");
  const [copilotMode, setCopilotMode] = useState("auto");
  const [activePrompt, setActivePrompt] = useState("Ask");

  const filteredRepos = useMemo(() => {
    return topRepositories.filter((repo) =>
      repo.name.toLowerCase().includes(sidebarSearch.toLowerCase())
    );
  }, [sidebarSearch]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="flex h-[var(--layout-header-height)] items-center justify-between border-b border-[var(--border)] bg-[var(--background-deep)] px-3">
        <div className="flex items-center gap-3">
          <AppIconButton>
            <Menu className="h-4 w-4" />
          </AppIconButton>
          <div className="flex items-center gap-3 text-sm font-medium text-[var(--text-secondary)]">
            <Github className="h-7 w-7 text-[var(--foreground)]" />
            <span className="text-[15px] font-semibold text-[var(--foreground)]">Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-[300px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <Input
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              placeholder="Type / to search"
              className="h-8 rounded-md border-[var(--border)] bg-transparent pl-9 pr-3 text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)]"
            />
          </div>
          <div className="flex items-center gap-2">
            <AppIconButton><Grip className="h-4 w-4" /></AppIconButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <AppIconButton><ChevronDown className="h-4 w-4" /></AppIconButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]">
                <DropdownMenuItem>Notifications</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Separator orientation="vertical" className="mx-1 h-5 bg-[var(--border)]" />
            <AppIconButton><Plus className="h-4 w-4" /></AppIconButton>
            <AppIconButton><CircleDot className="h-4 w-4" /></AppIconButton>
            <AppIconButton><GitBranch className="h-4 w-4" /></AppIconButton>
            <AppIconButton><Monitor className="h-4 w-4" /></AppIconButton>
            <AppIconButton><Inbox className="h-4 w-4" /></AppIconButton>
            <Separator orientation="vertical" className="mx-1 h-5 bg-[var(--border)]" />
            <Avatar className="h-8 w-8 border border-[var(--border)]">
              <AvatarImage src="/Frida.png" alt="OnderCampos" />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-var(--layout-header-height))] grid-cols-[var(--layout-sidebar-width)_minmax(0,1fr)_var(--layout-right-rail-width)]">
        <aside className="border-r border-[var(--border)] bg-[var(--surface)] px-4 py-6">
          <button className="mb-8 flex items-center gap-3 rounded-md text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--foreground)]">
            <Avatar className="h-5 w-5">
              <AvatarImage src="/Frida.png" alt="OnderCampos" />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
            <span>OnderCampos</span>
            <ChevronDown className="h-4 w-4 text-[var(--text-muted)]" />
          </button>

          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[var(--text-secondary)]">Top repositories</h2>
            <Button className="h-7 rounded-md border border-transparent bg-[var(--success)] px-3 text-xs font-semibold text-white hover:bg-[var(--success-hover)]">
              <BookText className="h-3.5 w-3.5" />
              New
            </Button>
          </div>

          <Input
            value={sidebarSearch}
            onChange={(e) => setSidebarSearch(e.target.value)}
            placeholder="Find a repository..."
            className="mb-4 h-8 rounded-md border-[var(--border)] bg-[var(--background)] text-sm placeholder:text-[var(--text-muted)]"
          />

          <nav className="space-y-2">
            {filteredRepos.map((repo) => (
              <button
                key={repo.name}
                className="flex w-full items-start gap-2 rounded-md px-1 py-1 text-left text-[15px] text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
              >
                <span
                  className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] text-[10px] font-semibold text-white"
                  style={{ backgroundColor: repo.accent ?? "#6e7681" }}
                >
                  {repo.icon}
                </span>
                <span className="leading-5 break-all">{repo.name}</span>
              </button>
            ))}
          </nav>

          <button className="mt-3 text-sm text-[var(--text-muted)] hover:text-[var(--foreground)]">Show more</button>
        </aside>

        <main className="bg-[linear-gradient(180deg,var(--background-deep)_0%,var(--background)_20%,var(--background)_100%)] px-8 py-10">
          <div className="mx-auto max-w-[805px]">
            <h1 className="mb-6 text-4xl font-semibold tracking-[-0.02em]">Home</h1>

            <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-sm)]">
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask anything or type @ to add context"
                className="min-h-[110px] resize-none border-0 bg-transparent px-4 py-4 text-[30px] leading-[1.35] shadow-none focus-visible:ring-0"
              />
              <div className="flex items-center justify-between border-t border-[var(--border)] px-3 py-3">
                <div className="flex items-center gap-2">
                  {[
                    { label: "Ask", icon: MessageSquare },
                  ].map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      onClick={() => setActivePrompt(label)}
                      className={`flex h-8 items-center gap-2 rounded-md border px-3 text-sm font-medium ${
                        activePrompt === label
                          ? "border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)]"
                          : "border-[var(--border)] bg-transparent text-[var(--text-secondary)]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  ))}
                  <Select value={audience} onValueChange={setAudience}>
                    <SelectTrigger className="h-8 rounded-md border-[var(--border)] bg-[var(--surface-elevated)] text-[var(--foreground)]">
                      <PanelsTopLeft className="h-4 w-4 text-[var(--text-muted)]" />
                      <SelectValue placeholder="All repositories" />
                    </SelectTrigger>
                    <SelectContent className="border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]">
                      <SelectItem value="all">All repositories</SelectItem>
                      <SelectItem value="top">Top repositories</SelectItem>
                      <SelectItem value="starred">Starred</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-[var(--border)] bg-transparent hover:bg-[var(--surface-hover)]">
                    <Plus className="h-4 w-4 text-[var(--text-secondary)]" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Select value={copilotMode} onValueChange={setCopilotMode}>
                    <SelectTrigger className="h-8 rounded-md border-0 bg-transparent px-2 text-[var(--text-secondary)] shadow-none hover:bg-[var(--surface-hover)]">
                      <Sparkles className="h-4 w-4 text-[var(--text-muted)]" />
                      <SelectValue placeholder="Auto" />
                    </SelectTrigger>
                    <SelectContent className="border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]">
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="assist">Assist</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                    </SelectContent>
                  </Select>
                  <AppIconButton><Clock3 className="h-4 w-4" /></AppIconButton>
                  <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-full border border-[var(--border)] bg-transparent hover:bg-[var(--surface-hover)]">
                    <ArrowUp className="h-4 w-4 text-[var(--text-secondary)]" />
                  </Button>
                </div>
              </div>
            </section>

            <div className="mt-4 flex flex-wrap gap-3">
              {[
                [BugIcon, "Debug"],
                [Bot, "Agent"],
                [CircleDashedIcon, "Create issue"],
                [BookText, "Write code"],
                [GitBranch, "Git"],
                [Workflow, "Pull requests"],
              ].map(([Icon, label]) => (
                <Button
                  key={label}
                  variant="outline"
                  className="h-11 rounded-full border-[var(--border)] bg-[var(--background-deep)] px-4 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  <ChevronDown className="h-4 w-4 text-[var(--text-muted)]" />
                </Button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Feed</h2>
              <Button variant="outline" className="h-8 rounded-md border-[var(--border)] bg-[var(--surface-elevated)] px-3 text-sm text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="mt-4 space-y-4">
              {feedSections.map((section) => (
                <Card key={section.title} className="gap-0 rounded-lg border-[var(--border)] bg-[var(--surface)] py-0 shadow-[var(--shadow-sm)]">
                  <CardContent className="px-0 py-0">
                    <div className="flex items-center gap-2 px-4 py-4 text-base text-[var(--text-muted)]">
                      <TrendingIcon className="h-4 w-4" />
                      <span>{section.title}</span>
                      {section.action ? (
                        <>
                          <span>·</span>
                          <button className="text-[var(--primary)] hover:text-[var(--primary-hover)]">{section.action}</button>
                        </>
                      ) : null}
                    </div>
                    {section.items.map((item, index) => (
                      <div key={item.name} className={index > 0 ? "border-t border-[var(--border)]" : ""}>
                        <div className="flex items-start justify-between gap-4 px-4 py-4">
                          <div className="min-w-0">
                            <div className="mb-2 flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--surface-elevated)] text-sm">{item.avatar}</span>
                              <button className="truncate text-left text-lg font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]">
                                {item.name}
                              </button>
                            </div>
                            {item.description ? (
                              <p className="mb-3 max-w-[520px] text-[15px] text-[var(--text-secondary)]">{item.description}</p>
                            ) : null}
                            <div className="flex items-center gap-5 text-sm text-[var(--text-muted)]">
                              <span className="flex items-center gap-1.5">
                                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.languageColor }} />
                                {item.language}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Star className="h-3.5 w-3.5" />
                                {item.stars}
                              </span>
                            </div>
                          </div>
                          <div className="flex shrink-0 overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface-elevated)]">
                            <button className="flex h-8 items-center gap-2 border-r border-[var(--border)] px-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]">
                              <Star className="h-4 w-4" />
                              Star
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]">
                              <ChevronDown className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>

        <aside className="px-5 py-9">
          <Card className="overflow-hidden gap-0 rounded-lg border-[var(--border)] bg-[var(--surface)] py-0 shadow-[var(--shadow-sm)]">
            <div className="relative h-[72px] w-full overflow-hidden border-b border-[var(--border)] bg-[linear-gradient(135deg,#9be9a8_0%,#3fb950_30%,#ffffff_32%,#2ea043_52%,#58a6ff_70%,#3fb950_100%)]">
              <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.45)_25%,rgba(255,255,255,0.45)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.45)_75%)] [background-size:70px_70px]" />
              <button className="absolute right-3 top-3 text-[var(--text-muted)] hover:text-[var(--foreground)]"><X className="h-4 w-4" /></button>
            </div>
            <CardContent className="px-4 py-4">
              <div className="mb-3 text-xs font-semibold tracking-[0.04em] text-[var(--text-muted)] uppercase">September 10 · 8:00 AM PT</div>
              <h3 className="mb-3 text-[28px] font-semibold leading-tight">GitHub Copilot Day</h3>
              <ul className="mb-4 space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-[2px] bg-[var(--success)]" />See how HydraFusion combines AI models to match the right model to the task</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-[2px] bg-[var(--success)]" />Learn to automate work, run parallel agents, and use your own models</li>
                <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-[2px] bg-[var(--success)]" />Turn your best coding approaches into reusable Agent Skills</li>
              </ul>
              <Button className="h-10 w-full rounded-md bg-[#f6f8fa] text-sm font-semibold text-[#24292f] hover:bg-white">Set your reminder</Button>
            </CardContent>
          </Card>

          <Card className="mt-6 rounded-xl border-[var(--border)] bg-[var(--surface)] py-0 shadow-[var(--shadow-sm)]">
            <CardContent className="px-4 py-4">
              <h3 className="mb-5 text-xl font-semibold">Latest from our changelog</h3>
              <div className="relative ml-2 space-y-5 before:absolute before:left-[3px] before:top-2 before:h-[calc(100%-48px)] before:w-px before:bg-[var(--border)]">
                {changelogItems.map((item) => (
                  <div key={item.title} className="relative pl-6">
                    <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-[var(--border)]" />
                    <div className="mb-1 text-sm text-[var(--text-muted)]">{item.time}</div>
                    <button className="text-left text-[15px] leading-6 text-[var(--text-secondary)] hover:text-[var(--foreground)]">{item.title}</button>
                  </div>
                ))}
              </div>
              <button className="mt-6 text-sm text-[var(--text-muted)] hover:text-[var(--foreground)]">View changelog →</button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function TrendingIcon(props: React.ComponentProps<typeof House>) {
  return <House {...props} />;
}

function BugIcon(props: React.ComponentProps<typeof Sparkles>) {
  return <Sparkles {...props} />;
}

function CircleDashedIcon(props: React.ComponentProps<typeof Sparkles>) {
  return <Sparkles {...props} />;
}

export default function HomePage() {
  return <DashboardHomeView state="default" />;
}
