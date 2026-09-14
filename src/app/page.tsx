"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BookText,
  Bot,
  ChevronDown,
  CircleDot,
  Clock3,
  FolderGit2,
  GitBranch,
  GitFork,
  Github,
  Home,
  Menu,
  Monitor,
  PackagePlus,
  Play,
  Plus,
  Search,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type DashboardViewState = "default";

type RepositoryItem = {
  owner: string;
  name: string;
  description: string;
  language: string;
  stars: string;
  iconText?: string;
  iconColor?: string;
};

type FeedSection = {
  title: string;
  linkLabel?: string;
  items: RepositoryItem[];
};

type ChangelogItem = {
  age: string;
  title: string;
};

type GithubDashboardHomeProps = {
  state?: DashboardViewState;
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
    linkLabel: "See more",
    items: [
      {
        owner: "ayyhri",
        name: "i-have-adhd",
        description:
          "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
        language: "Python",
        stars: "33.6k",
        iconText: "A",
        iconColor: "#58a6ff",
      },
      {
        owner: "spotify",
        name: "portal-ai-plugins",
        description: "",
        language: "TypeScript",
        stars: "716",
        iconText: "S",
        iconColor: "#3fb950",
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
        iconText: "J",
        iconColor: "#e3b341",
      },
    ],
  },
];

const changelogItems: ChangelogItem[] = [
  {
    age: "3 hours ago",
    title: "Remediate Code Quality findings with agentic autofix",
  },
  {
    age: "13 hours ago",
    title: "Enterprise-managed sandbox in Copilot for JetBrains",
  },
  {
    age: "18 hours ago",
    title: "GitHub Enterprise Server 3.22 is now generally available",
  },
  {
    age: "Yesterday",
    title: "New customer portal help.github.com",
  },
];

const actionChips = [
  { label: "Debug", icon: Sparkles },
  { label: "Agent", icon: Bot },
  { label: "Create issue", icon: CircleDot },
  { label: "Write code", icon: BookText, chevron: true },
  { label: "Git", icon: GitBranch, chevron: true },
  { label: "Pull requests", icon: GitFork, chevron: true },
];

function GitHubDashboardHome({ state = "default" }: GithubDashboardHomeProps) {
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [promptValue, setPromptValue] = useState("");
  const [scope, setScope] = useState("all");
  const [mode, setMode] = useState("ask");
  const [autoMode, setAutoMode] = useState("auto");
  const [starredRepos, setStarredRepos] = useState<Record<string, boolean>>({});
  const [reminderSet, setReminderSet] = useState(false);

  const filteredRepos = useMemo(() => {
    const query = sidebarSearch.toLowerCase();
    return topRepositories.filter((repo) => repo.toLowerCase().includes(query));
  }, [sidebarSearch]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/95">
        <div className="flex h-14 items-center gap-3 px-3 md:px-4">
          <Button variant="ghost" size="icon" className="size-8 rounded-md border border-border hover:bg-card">
            <Menu className="size-4" />
          </Button>
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Github className="size-8 rounded-full bg-foreground p-1.5 text-background" />
            <span>Dashboard</span>
          </div>
          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <div className="hidden lg:flex items-center rounded-md border border-border bg-background px-3 text-sm text-muted-foreground shadow-xs min-w-80 h-8">
              <Search className="mr-2 size-4" />
              <span>Type</span>
              <Kbd className="mx-1 h-4 min-w-4 border border-border bg-card px-1 text-[10px] text-muted-foreground">/</Kbd>
              <span>to search</span>
            </div>
            <HeaderIcon icon={Home} />
            <HeaderIcon icon={Plus} dropdown />
            <HeaderIcon icon={Bell} />
            <HeaderIcon icon={GitBranch} />
            <HeaderIcon icon={Monitor} />
            <HeaderIcon icon={FolderGit2} />
            <Avatar className="size-8 border border-border">
              <AvatarFallback className="bg-[linear-gradient(135deg,#f4c786,#6e4f29)] text-[11px] font-semibold text-background">
                OC
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-56px)] grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_312px]">
        <aside className="hidden border-r border-border bg-sidebar xl:block">
          <div className="p-5">
            <button className="mb-8 flex items-center gap-2 text-sm font-semibold">
              <Avatar className="size-5 border border-border/80">
                <AvatarFallback className="bg-[linear-gradient(135deg,#f4c786,#6e4f29)] text-[9px] font-semibold text-background">
                  OC
                </AvatarFallback>
              </Avatar>
              <span>OnderCampos</span>
              <ChevronDown className="size-3 text-muted-foreground" />
            </button>

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Top repositories</h2>
              <Button className="h-8 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground hover:bg-[#36A653]">
                <PackagePlus className="size-3.5" />
                New
              </Button>
            </div>

            <Input
              value={sidebarSearch}
              onChange={(event) => setSidebarSearch(event.target.value)}
              placeholder="Find a repository..."
              className="mb-4 h-8 bg-background text-sm shadow-none"
            />

            <div className="space-y-1.5 text-sm">
              {filteredRepos.map((repo) => (
                <button
                  key={repo}
                  className="flex w-full items-start gap-2 rounded-md px-1 py-1 text-left hover:bg-card"
                >
                  <span className="mt-1 size-3 rounded-[2px] bg-[#f778ba] text-[8px] font-bold leading-3 text-background flex items-center justify-center">
                    F
                  </span>
                  <span className="break-all text-muted-foreground">{repo}</span>
                </button>
              ))}
            </div>

            <button className="mt-3 text-sm text-muted-foreground hover:text-foreground">
              Show more
            </button>
          </div>
        </aside>

        <main className="px-4 py-8 md:px-8 xl:px-14">
          <div className="mx-auto max-w-[806px]">
            <h1 className="mb-4 text-[38px] font-semibold tracking-[-0.02em] text-foreground">Home</h1>

            <Card className="gap-0 rounded-2xl border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <CardContent className="p-4">
                <textarea
                  value={promptValue}
                  onChange={(event) => setPromptValue(event.target.value)}
                  placeholder="Ask anything or type @ to add context"
                  className="min-h-20 w-full resize-none border-none bg-transparent p-0 text-[28px] leading-[1.25] tracking-[-0.02em] text-foreground outline-none placeholder:text-muted-foreground"
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setMode("ask")}
                      className={cn(
                        "flex h-8 items-center gap-2 rounded-md border px-3 text-sm font-semibold",
                        mode === "ask"
                          ? "border-border bg-background text-foreground"
                          : "border-border bg-card text-muted-foreground"
                      )}
                    >
                      <BookText className="size-4" />
                      Ask
                      <ChevronDown className="size-3" />
                    </button>
                    <div className="flex h-8 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-semibold">
                      <Users className="size-4 text-muted-foreground" />
                      <NativeSelect
                        aria-label="Repository scope"
                        value={scope}
                        onChange={(event) => setScope(event.target.value)}
                        className="h-auto border-0 bg-transparent p-0 pr-5 shadow-none focus-visible:ring-0"
                      >
                        <NativeSelectOption value="all">All repositories</NativeSelectOption>
                        <NativeSelectOption value="top">Top repositories</NativeSelectOption>
                        <NativeSelectOption value="starred">Starred</NativeSelectOption>
                      </NativeSelect>
                    </div>
                    <Button variant="ghost" size="icon-sm" className="rounded-md border border-border hover:bg-background">
                      <Plus className="size-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="size-4" />
                      <NativeSelect
                        aria-label="Automation mode"
                        value={autoMode}
                        onChange={(event) => setAutoMode(event.target.value)}
                        className="h-auto border-0 bg-transparent p-0 pr-5 shadow-none focus-visible:ring-0"
                      >
                        <NativeSelectOption value="auto">Auto</NativeSelectOption>
                        <NativeSelectOption value="manual">Manual</NativeSelectOption>
                      </NativeSelect>
                    </div>
                    <Separator orientation="vertical" className="h-5 bg-border" />
                    <Button variant="ghost" size="icon-sm" className="rounded-md text-muted-foreground hover:bg-background hover:text-foreground">
                      <Clock3 className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="rounded-md text-muted-foreground hover:bg-background hover:text-foreground">
                      <Play className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 flex flex-wrap gap-3">
              {actionChips.map((action) => (
                <button
                  key={action.label}
                  className="flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.3)] hover:bg-card"
                >
                  <action.icon className="size-4 text-muted-foreground" />
                  <span>{action.label}</span>
                  {action.chevron ? <ChevronDown className="size-3 text-muted-foreground" /> : null}
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Feed</h2>
              <Button variant="secondary" className="h-8 gap-2 rounded-md border border-border bg-card px-3 text-sm hover:bg-[#2e353e]">
                <svg className="size-4 text-muted-foreground" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 4h12M4.5 8h7M6.5 12h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                Filter
              </Button>
            </div>

            <div className="mt-4 space-y-4">
              {feedSections.map((section) => (
                <Card key={section.title} className="gap-0 rounded-lg border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2 px-4 pt-4 text-sm text-muted-foreground">
                      <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 12.5h11M3 11V3m0 8 3-3 2 2 4-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span>{section.title}</span>
                      {section.linkLabel ? (
                        <>
                          <span>·</span>
                          <button className="text-[#58a6ff] hover:underline">{section.linkLabel}</button>
                        </>
                      ) : null}
                    </div>
                    <div>
                      {section.items.map((item, index) => {
                        const key = `${item.owner}/${item.name}`;
                        const isStarred = Boolean(starredRepos[key]);

                        return (
                          <div key={key} className={cn("flex items-start justify-between gap-4 px-4 py-4", index > 0 && "border-t border-border") }>
                            <div className="min-w-0 flex-1">
                              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                                <span
                                  className="flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-background"
                                  style={{ backgroundColor: item.iconColor }}
                                >
                                  {item.iconText}
                                </span>
                                <button className="truncate hover:text-[#58a6ff]">
                                  {item.owner}/{item.name}
                                </button>
                              </div>
                              {item.description ? (
                                <p className="mb-2 text-[15px] text-foreground">{item.description}</p>
                              ) : null}
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                  <span className="size-3 rounded-full bg-[#58a6ff]" />
                                  {item.language}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Star className="size-3.5" />
                                  {item.stars}
                                </span>
                              </div>
                            </div>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                setStarredRepos((current) => ({
                                  ...current,
                                  [key]: !current[key],
                                }))
                              }
                              className="h-7 gap-2 rounded-md border border-border bg-[#30363d] px-3 text-xs font-semibold text-foreground hover:bg-[#3d444d]"
                            >
                              <Star className={cn("size-3.5", isStarred && "fill-current text-primary")} />
                              {isStarred ? "Starred" : "Star"}
                              <ChevronDown className="size-3" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>

        <aside className="px-4 py-9 md:px-8 xl:px-6">
          <div className="mx-auto flex max-w-[280px] flex-col gap-6">
            <Card className="gap-0 overflow-hidden rounded-lg border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <div className="h-[72px] bg-[linear-gradient(135deg,#8ae8a7_0%,#dcfce7_18%,#34d058_45%,#8b5cf6_75%,#50fa7b_100%)] opacity-95" />
              <CardContent className="p-0">
                <div className="border-b border-border px-4 py-3 text-xs uppercase tracking-wide text-muted-foreground">
                  September 10 · 8:00 AM PT
                </div>
                <div className="p-4">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="text-[28px] leading-8 font-semibold tracking-[-0.02em]">GitHub Copilot Day</h3>
                    <button className="text-muted-foreground hover:text-foreground">×</button>
                  </div>
                  <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-primary" /><span>See how HydraFusion combines AI models to match the right model to the task</span></li>
                    <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-primary" /><span>Learn to automate work, run parallel agents, and use your own models</span></li>
                    <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-primary" /><span>Turn your best coding approaches into reusable Agent Skills</span></li>
                  </ul>
                  <Button
                    onClick={() => setReminderSet((current) => !current)}
                    className="h-8 w-full rounded-md bg-[#f6f8fa] text-xs font-semibold text-[#24292f] hover:bg-white"
                  >
                    {reminderSet ? "Reminder set" : "Set your reminder"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="gap-0 rounded-lg border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <CardContent className="p-4">
                <h3 className="mb-4 text-xl font-semibold">Latest from our changelog</h3>
                <div className="space-y-4">
                  {changelogItems.map((item) => (
                    <div key={item.title} className="grid grid-cols-[14px_1fr] gap-3">
                      <div className="flex flex-col items-center">
                        <span className="mt-1 size-2 rounded-full bg-border" />
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-muted-foreground">{item.age}</p>
                        <button className="text-left text-[15px] leading-6 hover:text-[#58a6ff]">
                          {item.title}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-5 text-sm text-[#58a6ff] hover:underline">View changelog →</button>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}

function HeaderIcon({
  icon: Icon,
  dropdown = false,
}: {
  icon: typeof Home;
  dropdown?: boolean;
}) {
  return (
    <Button variant="ghost" size="icon" className="size-8 rounded-md border border-border text-muted-foreground hover:bg-card hover:text-foreground">
      <Icon className="size-4" />
      {dropdown ? <ChevronDown className="ml-0.5 size-3" /> : null}
    </Button>
  );
}

export default function HomePage() {
  return <GitHubDashboardHome state="default" />;
}
