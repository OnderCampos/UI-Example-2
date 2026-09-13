"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  Bot,
  ChevronDown,
  Circle,
  CircleDot,
  Filter,
  GitBranch,
  Github,
  Home,
  Menu,
  Monitor,
  PackagePlus,
  Plus,
  Search,
  Sparkles,
  SquarePen,
  Star,
  Telescope,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type FeedState = "default";

type QuickAction = {
  label: string;
  icon: typeof Bot;
  trailing?: boolean;
};

type RepoItem = {
  owner: string;
  name: string;
  description?: string;
  language: string;
  languageColor: string;
  stars: string;
  avatar?: string;
  badge?: string;
};

type FeedGroup = {
  title: string;
  accentIcon: typeof Telescope;
  linkLabel?: string;
  items: RepoItem[];
};

type TimelineItem = {
  age: string;
  title: string;
};

type DashboardHomeFeedProps = {
  state?: FeedState;
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

const feedGroups: Record<FeedState, FeedGroup[]> = {
  default: [
    {
      title: "Trending repositories",
      accentIcon: Telescope,
      linkLabel: "See more",
      items: [
        {
          owner: "ayghri",
          name: "i-have-adhd",
          description:
            "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
          language: "Python",
          languageColor: "#58A6FF",
          stars: "33.6k",
        },
        {
          owner: "spotify",
          name: "portal-ai-plugins",
          language: "TypeScript",
          languageColor: "#58A6FF",
          stars: "716",
          badge: "Spotify",
        },
      ],
    },
    {
      title: "Recommended for you",
      accentIcon: Star,
      items: [
        {
          owner: "jasonkylelol",
          name: "graphrag-chinese",
          description: "支持中文CNCCN 的 microsoft/graphrag",
          language: "Python",
          languageColor: "#58A6FF",
          stars: "51",
        },
      ],
    },
  ],
};

const changelogItems: TimelineItem[] = [
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

const navigationItems = [
  { label: "Overview", icon: Home },
  { label: "Repositories", icon: Github },
  { label: "Projects", icon: Monitor },
];

const controlActions = [
  { icon: Github, label: "Copilot" },
  { icon: Plus, label: "Add" },
  { icon: CircleDot, label: "Issues" },
  { icon: GitBranch, label: "Pull requests" },
  { icon: PackagePlus, label: "Packages" },
  { icon: Bell, label: "Notifications" },
] as const;

const quickActions: QuickAction[] = [
  { label: "Debug", icon: Sparkles },
  { label: "Agent", icon: Bot },
  { label: "Create issue", icon: CircleDot },
  { label: "Write code", icon: SquarePen, trailing: true },
  { label: "Git", icon: GitBranch, trailing: true },
  { label: "Pull requests", icon: GitBranch, trailing: true },
];

function DashboardShell({ state = "default" }: DashboardHomeFeedProps) {
  const [searchValue, setSearchValue] = useState("");
  const [repoFilter, setRepoFilter] = useState("");
  const [askValue, setAskValue] = useState("");
  const [scope, setScope] = useState("All repositories");
  const [feedFilter, setFeedFilter] = useState("Filter");
  const [starSelections, setStarSelections] = useState<Record<string, string>>({});

  const groups = feedGroups[state];

  const filteredTopRepos = useMemo(() => {
    return topRepositories.filter((repo) =>
      repo.toLowerCase().includes(repoFilter.toLowerCase())
    );
  }, [repoFilter]);

  const filteredGroups = useMemo(() => {
    return groups.map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        const haystack = `${item.owner}/${item.name} ${item.description ?? ""}`.toLowerCase();
        return haystack.includes(searchValue.toLowerCase());
      }),
    }));
  }, [groups, searchValue]);

  const toggleStar = (repoKey: string, value: string) => {
    setStarSelections((current) => ({ ...current, [repoKey]: value }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-[#0f1620]">
        <div className="flex h-14 items-center gap-3 px-3">
          <Button variant="outline" size="icon-sm" className="border-border bg-transparent hover:bg-accent">
            <Menu className="size-4" />
          </Button>
          <div className="flex items-center gap-3 pr-2">
            <Github className="size-8 text-foreground" />
            <span className="text-sm font-semibold">Dashboard</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <InputGroup className="h-8 w-[210px] border-border bg-background/70 shadow-none">
              <InputGroupAddon>
                <Search className="size-4 text-muted-foreground" />
              </InputGroupAddon>
              <InputGroupInput
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Type / to search"
                className="h-8 text-sm"
              />
              <InputGroupAddon align="inline-end">
                <Kbd>/</Kbd>
              </InputGroupAddon>
            </InputGroup>
            <div className="flex items-center gap-2">
              {controlActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  size="icon-sm"
                  className="border-border bg-transparent hover:bg-accent"
                  aria-label={action.label}
                >
                  <action.icon className="size-4" />
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

      <div className="grid min-h-[calc(100vh-56px)] grid-cols-[300px_minmax(0,1fr)_316px]">
        <aside className="border-r border-border bg-sidebar">
          <div className="p-5">
            <div className="mb-8 flex items-center gap-3">
              <Avatar className="size-7 border border-border">
                <AvatarImage src="/Frida.png" alt="OnderCampos" />
                <AvatarFallback>OC</AvatarFallback>
              </Avatar>
              <button type="button" className="flex items-center gap-2 text-sm font-semibold">
                OnderCampos
                <ChevronDown className="size-4 text-muted-foreground" />
              </button>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Top repositories</h2>
              <Button className="h-8 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground hover:bg-[#36A653]">
                <Monitor className="size-3.5" />
                New
              </Button>
            </div>

            <Input
              value={repoFilter}
              onChange={(event) => setRepoFilter(event.target.value)}
              placeholder="Find a repository..."
              className="mb-4 h-9 border-border bg-background text-sm shadow-none placeholder:text-muted-foreground"
            />

            <nav className="mb-4 space-y-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="h-8 w-full justify-start gap-2 px-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Button>
              ))}
            </nav>

            <div className="space-y-2 text-sm">
              {filteredTopRepos.map((repo) => (
                <button
                  key={repo}
                  type="button"
                  className="flex w-full items-start gap-2 rounded-md px-1 py-1.5 text-left text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <span className="mt-0.5 flex size-4 items-center justify-center rounded-[3px] bg-[#f778ba] text-[10px] font-bold text-white">
                    F
                  </span>
                  <span className="leading-5 break-all">{repo}</span>
                </button>
              ))}
            </div>

            <Button variant="ghost" className="mt-3 h-8 px-1 text-sm text-muted-foreground hover:bg-transparent hover:text-foreground">
              Show more
            </Button>
          </div>
        </aside>

        <main className="bg-background px-14 py-10">
          <div className="max-w-[805px]">
            <h1 className="mb-6 text-[36px] leading-none font-semibold tracking-[-0.02em]">Home</h1>

            <Card className="gap-0 rounded-2xl border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <CardContent className="p-4">
                <textarea
                  value={askValue}
                  onChange={(event) => setAskValue(event.target.value)}
                  placeholder="Ask anything or type @ to add context"
                  className="min-h-[72px] w-full resize-none bg-transparent text-[30px] leading-[1.32] text-foreground outline-none placeholder:text-[#7d8590]"
                />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-8 border-border bg-background px-3 text-sm hover:bg-accent">
                      <Bot className="size-4" />
                      Ask
                      <ChevronDown className="size-4 text-muted-foreground" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-8 border-border bg-background px-3 text-sm hover:bg-accent">
                          <Monitor className="size-4" />
                          {scope}
                          <ChevronDown className="size-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-52 border-border bg-card text-foreground">
                        {[
                          "All repositories",
                          "Top repositories",
                          "Following",
                        ].map((option) => (
                          <DropdownMenuItem key={option} onClick={() => setScope(option)}>
                            {option}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="icon-sm" className="border-border bg-background hover:bg-accent">
                      <Plus className="size-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <button type="button" className="flex items-center gap-1.5 hover:text-foreground">
                      <Users className="size-4" />
                      Auto
                      <ChevronDown className="size-4" />
                    </button>
                    <button type="button" className="hover:text-foreground">
                      <Sparkles className="size-4" />
                    </button>
                    <button type="button" className="hover:text-foreground">
                      <PackagePlus className="size-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 flex flex-wrap gap-3">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-9 rounded-full border-border bg-background px-4 text-sm font-medium hover:bg-accent"
                >
                  <action.icon className="size-4" />
                  {action.label}
                  {action.trailing && <ChevronDown className="size-4 text-muted-foreground" />}
                </Button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <h2 className="text-base font-semibold">Feed</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-8 border-border bg-card px-3 text-sm hover:bg-accent">
                    <Filter className="size-4" />
                    {feedFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="border-border bg-card text-foreground">
                  {[
                    "Filter",
                    "Following only",
                    "Starred repositories",
                  ].map((option) => (
                    <DropdownMenuItem key={option} onClick={() => setFeedFilter(option)}>
                      {option}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-3 space-y-4">
              {filteredGroups.map((group) => (
                <Card key={group.title} className="gap-0 rounded-lg border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
                  <CardHeader className="flex flex-row items-center gap-2 px-4 py-4">
                    <group.accentIcon className="size-4 text-muted-foreground" />
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {group.title}
                    </CardTitle>
                    {group.linkLabel && (
                      <button type="button" className="text-sm text-[#58A6FF] hover:underline">
                        · {group.linkLabel}
                      </button>
                    )}
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    {group.items.map((item, index) => {
                      const repoKey = `${item.owner}/${item.name}`;
                      const starred = starSelections[repoKey] ?? "Star";
                      return (
                        <div key={repoKey}>
                          <div className="flex items-start justify-between gap-4 px-4 pb-5">
                            <div>
                              <div className="flex items-center gap-2">
                                <Avatar className="size-5 border border-border">
                                  <AvatarFallback className="bg-muted text-[10px] text-foreground">
                                    {item.owner.slice(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <button type="button" className="text-[15px] font-semibold hover:text-[#58A6FF] hover:underline">
                                  {repoKey}
                                </button>
                                {item.badge && (
                                  <Badge variant="secondary" className="rounded-full bg-[rgba(122,220,151,0.15)] px-2 py-0 text-[11px] text-primary">
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              {item.description && (
                                <p className="mt-2 max-w-[540px] text-[15px] text-foreground">{item.description}</p>
                              )}
                              <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5">
                                  <span
                                    className="size-3 rounded-full"
                                    style={{ backgroundColor: item.languageColor }}
                                  />
                                  {item.language}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Star className="size-3.5" />
                                  {item.stars}
                                </span>
                              </div>
                            </div>
                            <ButtonGroup>
                              <Button
                                variant="outline"
                                className="h-7 border-border bg-secondary px-3 text-xs font-semibold hover:bg-accent"
                                onClick={() => toggleStar(repoKey, starred === "Star" ? "Starred" : "Star")}
                              >
                                <Star className={cn("size-3.5", starred === "Starred" && "fill-current text-primary")} />
                                {starred}
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" className="h-7 w-8 border-border bg-secondary px-0 hover:bg-accent">
                                    <ChevronDown className="size-3.5" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="border-border bg-card text-foreground">
                                  <DropdownMenuItem onClick={() => toggleStar(repoKey, "Star")}>Star</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toggleStar(repoKey, "Starred")}>Starred</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toggleStar(repoKey, "Unstar")}>Unstar</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </ButtonGroup>
                          </div>
                          {index < group.items.length - 1 && <Separator className="bg-border" />}
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>

        <aside className="border-l border-border bg-background px-18 py-9">
          <div className="space-y-6">
            <Card className="gap-0 overflow-hidden rounded-xl border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <div className="relative h-[72px] bg-[linear-gradient(135deg,#d0f5ce_0%,#79df95_35%,#212830_100%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(255,255,255,0.5),transparent_25%),radial-gradient(circle_at_72%_32%,rgba(122,220,151,0.65),transparent_20%),linear-gradient(135deg,transparent_30%,rgba(255,255,255,0.25)_30%,rgba(255,255,255,0.25)_44%,transparent_44%,transparent_56%,rgba(255,255,255,0.18)_56%,rgba(255,255,255,0.18)_70%,transparent_70%)]" />
                <button type="button" className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
                  ×
                </button>
              </div>
              <CardContent className="p-4">
                <div className="mb-3 text-xs font-medium tracking-wide text-[#79c0ff] uppercase">
                  September 10 · 8:00 AM PT
                </div>
                <h3 className="mb-3 text-[28px] leading-8 font-semibold">GitHub Copilot Day</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "See how HydraFusion combines AI models to match the right model to the task",
                    "Learn to automate work, run parallel agents, and use your own models",
                    "Turn your best coding approaches into reusable Agent Skills",
                  ].map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="mt-1.5 size-1.5 rounded-full bg-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-4 h-8 w-full bg-[#f6f8fa] text-[#24292f] hover:bg-white">
                  Set your reminder
                </Button>
              </CardContent>
            </Card>

            <Card className="gap-0 rounded-xl border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <CardHeader className="px-4 py-4">
                <CardTitle className="text-base font-semibold">Latest from our changelog</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="space-y-4">
                  {changelogItems.map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <Circle className="size-3 fill-muted text-muted" />
                        <div className="mt-1 h-full w-px bg-border last:hidden" />
                      </div>
                      <div>
                        <div className="mb-1 text-xs text-muted-foreground">{item.age}</div>
                        <button type="button" className="text-left text-[15px] leading-6 hover:text-[#58A6FF] hover:underline">
                          {item.title}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" className="mt-4 text-sm text-[#58A6FF] hover:underline">
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
  return <DashboardShell state="default" />;
}
