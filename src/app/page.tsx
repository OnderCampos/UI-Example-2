"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Bell,
  BookText,
  Bot,
  ChevronDown,
  CircleDot,
  FileCode2,
  Filter,
  FolderGit2,
  Github,
  GitFork,
  Grip,
  Home,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Sparkles,
  Star,
  Target,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
  InputGroupText,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type FeedItem = {
  id: string;
  owner: string;
  name: string;
  description: string;
  language: string;
  stars: string;
  languageColor: string;
  avatarColor: string;
  avatarLabel: string;
};

type FeedSection = {
  id: string;
  title: string;
  items: FeedItem[];
  showSeeMore?: boolean;
};

type DashboardHomeFeedViewProps = {
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
    id: "trending",
    title: "Trending repositories",
    showSeeMore: true,
    items: [
      {
        id: "adhd",
        owner: "aygiri",
        name: "i-have-adhd",
        description:
          "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
        language: "Python",
        stars: "33.6k",
        languageColor: "bg-[#388BFD]",
        avatarColor: "bg-linear-to-br from-[#f4c86b] to-[#7fd4ff]",
        avatarLabel: "A",
      },
      {
        id: "spotify",
        owner: "spotify",
        name: "portal-ai-plugins",
        description: "",
        language: "TypeScript",
        stars: "716",
        languageColor: "bg-[#388BFD]",
        avatarColor: "bg-[#1DB954]",
        avatarLabel: "S",
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
        description: "支持中文CNCCN 的 microsoft/graphrag",
        language: "Python",
        stars: "51",
        languageColor: "bg-[#388BFD]",
        avatarColor: "bg-linear-to-br from-[#f3e7c3] to-[#8590ff]",
        avatarLabel: "G",
      },
    ],
  },
];

const changelogItems = [
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

function RepoBadge({ item }: { item: FeedItem }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white",
          item.avatarColor,
        )}
      >
        {item.avatarLabel}
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-foreground">
          {item.owner}/{item.name}
        </div>
        {item.description ? (
          <p className="mt-2 text-[13px] text-foreground">{item.description}</p>
        ) : null}
        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className={cn("size-2.5 rounded-full", item.languageColor)} />
            {item.language}
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="size-3.5" />
            {item.stars}
          </span>
        </div>
      </div>
    </div>
  );
}

function FeedCard({ section }: { section: FeedSection }) {
  return (
    <Card className="gap-0 rounded-lg border-border bg-card py-0 shadow-none">
      <CardContent className="px-0">
        <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
          <Star className="size-4" />
          <span>{section.title}</span>
          {section.showSeeMore ? (
            <button type="button" className="text-[#4493F8] hover:underline">
              · See more
            </button>
          ) : null}
        </div>
        <div>
          {section.items.map((item, index) => (
            <div key={item.id}>
              {index > 0 ? <Separator className="bg-border/80" /> : null}
              <div className="flex items-start justify-between gap-4 px-4 py-4">
                <RepoBadge item={item} />
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 min-w-[88px] rounded-md border-border bg-[#30363d] px-3 text-xs text-foreground hover:bg-[#3a414a]"
                >
                  <Star className="size-3.5" />
                  Star
                  <ChevronDown className="ml-1 size-3.5 opacity-70" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TopNavIcon({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex size-8 items-center justify-center rounded-md border border-border bg-transparent text-muted-foreground transition hover:bg-accent hover:text-foreground"
    >
      {children}
    </button>
  );
}

export default function HomePage({ state = "default" }: DashboardHomeFeedViewProps) {
  const [prompt, setPrompt] = useState("");
  const [search, setSearch] = useState("");
  const [repoSearch, setRepoSearch] = useState("");
  const [scope, setScope] = useState("All repositories");
  const [assistantMode, setAssistantMode] = useState("Ask");
  const [autoRun, setAutoRun] = useState(true);
  const [filtersEnabled, setFiltersEnabled] = useState(true);
  const [starredRepos, setStarredRepos] = useState<Record<string, boolean>>({});

  const visibleRepositories = useMemo(() => {
    const query = repoSearch.toLowerCase();
    return topRepositories.filter((repo) => repo.toLowerCase().includes(query));
  }, [repoSearch]);

  const visibleSections = useMemo(() => {
    if (!filtersEnabled) {
      return feedSections;
    }
    return feedSections.filter((section) =>
      section.items.some((item) => {
        const haystack = `${item.owner}/${item.name} ${item.description}`.toLowerCase();
        return haystack.includes(search.toLowerCase());
      }),
    );
  }, [search, filtersEnabled]);

  const headerActions = state === "default";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between gap-4 px-3">
          <div className="flex items-center gap-3">
            <TopNavIcon>
              <Menu className="size-4" />
            </TopNavIcon>
            <Github className="size-8 text-foreground" />
            <div className="text-sm font-semibold">Dashboard</div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block lg:w-[340px]">
              <InputGroup className="h-8 rounded-md border-border bg-background shadow-none">
                <InputGroupAddon>
                  <Search className="size-4" />
                </InputGroupAddon>
                <InputGroupInput
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Type / to search"
                  className="h-8 text-sm"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText className="rounded border border-border px-1.5 py-0 text-[10px] text-muted-foreground">
                    /
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <TopNavIcon>
              <Grip className="size-4" />
            </TopNavIcon>
            <Separator orientation="vertical" className="hidden h-6 md:block" />
            <TopNavIcon>
              <Plus className="size-4" />
            </TopNavIcon>
            <TopNavIcon>
              <CircleDot className="size-4" />
            </TopNavIcon>
            <TopNavIcon>
              <GitFork className="size-4" />
            </TopNavIcon>
            <TopNavIcon>
              <BookText className="size-4" />
            </TopNavIcon>
            <TopNavIcon>
              <Bell className="size-4" />
            </TopNavIcon>
            <Avatar className="size-8 border border-border">
              <AvatarImage src="/Frida.png" alt="OnderCampos" />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-56px)] grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_314px]">
        <aside className="hidden border-r border-border bg-[color:var(--sidebar)] xl:block">
          <div className="flex h-full flex-col p-5">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <Avatar className="size-5">
                <AvatarImage src="/Frida.png" alt="OnderCampos" />
                <AvatarFallback>OC</AvatarFallback>
              </Avatar>
              OnderCampos
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </div>

            <div className="mt-10 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Top repositories</h2>
              <Button className="h-8 rounded-md px-3 text-xs font-semibold text-primary-foreground">
                <BookText className="size-3.5" />
                New
              </Button>
            </div>

            <div className="mt-2">
              <InputGroup className="h-8 rounded-md border-border bg-background shadow-none">
                <InputGroupInput
                  value={repoSearch}
                  onChange={(event) => setRepoSearch(event.target.value)}
                  placeholder="Find a repository..."
                  className="h-8 text-sm"
                />
              </InputGroup>
            </div>

            <nav className="mt-3 space-y-1 text-sm text-muted-foreground">
              {visibleRepositories.map((repo) => (
                <button
                  key={repo}
                  type="button"
                  className="flex w-full items-start gap-2 rounded-md px-1 py-1.5 text-left transition hover:bg-accent hover:text-foreground"
                >
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[4px] bg-[#c94b72] text-[10px] font-semibold text-white">
                    F
                  </span>
                  <span className="break-all">{repo}</span>
                </button>
              ))}
            </nav>

            <button type="button" className="mt-3 text-left text-sm text-muted-foreground hover:text-foreground">
              Show more
            </button>
          </div>
        </aside>

        <main className="px-5 py-8 lg:px-8 xl:px-14">
          <div className="mx-auto max-w-[805px]">
            <div className="mb-4 flex items-center gap-2 text-4xl">
              <Home className="size-0" />
              <h1 className="text-[2.05rem] font-semibold tracking-[-0.02em]">Home</h1>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <InputGroup className="min-h-[92px] items-start rounded-xl border-border bg-transparent shadow-none">
                <InputGroupTextarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Ask anything or type @ to add context"
                  className="min-h-[78px] px-0 pt-0 text-[15px]"
                />
                <InputGroupAddon align="block-end" className="flex flex-wrap items-center justify-between gap-3 border-0 px-0 pb-0 pt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant={assistantMode === "Ask" ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setAssistantMode("Ask")}
                      className="h-8 rounded-md border-border bg-[#2a313c] px-3 text-sm text-foreground hover:bg-[#333b46]"
                    >
                      <MessageSquare className="size-3.5" />
                      Ask
                      <ChevronDown className="size-3.5" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-8 rounded-md border border-border bg-[#2a313c] px-3 text-sm text-foreground hover:bg-[#333b46]"
                        >
                          <FolderGit2 className="size-3.5" />
                          {scope}
                          <ChevronDown className="size-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-44">
                        {[
                          "All repositories",
                          "Starred repositories",
                          "Recent repositories",
                        ].map((option) => (
                          <DropdownMenuCheckboxItem
                            key={option}
                            checked={scope === option}
                            onCheckedChange={() => setScope(option)}
                          >
                            {option}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      className="rounded-md border-border bg-transparent hover:bg-accent"
                      aria-label="Add context"
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button type="button" className="flex items-center gap-1 hover:text-foreground">
                          <Bot className="size-4" />
                          Auto
                          <ChevronDown className="size-3.5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuCheckboxItem
                          checked={autoRun}
                          onCheckedChange={setAutoRun}
                        >
                          Auto
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={!autoRun}
                          onCheckedChange={(checked) => setAutoRun(!checked)}
                        >
                          Manual
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Target className="size-4" />
                    <button type="button" className="text-muted-foreground hover:text-foreground">
                      <Sparkles className="size-4" />
                    </button>
                  </div>
                </InputGroupAddon>
              </InputGroup>
            </div>

            {headerActions ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  [FileCode2, "Debug"],
                  [Bot, "Agent"],
                  [CircleDot, "Create issue"],
                  [FileCode2, "Write code"],
                  [GitFork, "Git"],
                  [GitFork, "Pull requests"],
                ].map(([Icon, label]) => (
                  <Button
                    key={label}
                    variant="outline"
                    className="h-9 rounded-full border-border bg-transparent px-4 text-sm text-foreground hover:bg-accent"
                  >
                    <Icon className="size-4" />
                    {label}
                    {label === "Write code" || label === "Git" || label === "Pull requests" ? (
                      <ChevronDown className="size-3.5" />
                    ) : null}
                  </Button>
                ))}
              </div>
            ) : null}

            <div className="mt-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Feed</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFiltersEnabled((value) => !value)}
                className="h-8 rounded-md border-border bg-[#30363d] px-3 text-sm text-foreground hover:bg-[#3a414a]"
              >
                <Filter className="size-4" />
                Filter
              </Button>
            </div>

            <div className="mt-3 space-y-4">
              {visibleSections.map((section) => (
                <FeedCard key={section.id} section={section} />
              ))}
            </div>
          </div>
        </main>

        <aside className="hidden px-6 py-9 xl:block">
          <div className="space-y-5">
            <Card className="gap-0 overflow-hidden rounded-xl border-border bg-card py-0 shadow-none">
              <div className="relative h-[72px] border-b border-border bg-[#d6f0dd]">
                <Image src="/Frida.png" alt="Copilot Day" fill className="object-cover opacity-35" />
                <div className="absolute inset-0 bg-linear-to-r from-[#7ADC97]/45 to-[#388BFD]/20" />
              </div>
              <CardContent className="px-4 py-4">
                <div className="text-xs font-medium tracking-wide text-[#7aa2f7] uppercase">
                  September 10 · 8:00 AM PT
                </div>
                <h3 className="mt-3 text-[28px] leading-8 font-semibold tracking-[-0.02em] text-foreground">
                  GitHub Copilot Day
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {[
                    "See how HydraFusion combines AI models to match the right model to the task",
                    "Learn to automate work, run parallel agents, and use your own models",
                    "Turn your best coding approaches into reusable Agent Skills",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-4 h-9 w-full rounded-md bg-[#e6edf3] text-[#151b23] hover:bg-white">
                  Set your reminder
                </Button>
              </CardContent>
            </Card>

            <Card className="gap-0 rounded-xl border-border bg-card py-0 shadow-none">
              <CardContent className="px-4 py-4">
                <h3 className="text-lg font-semibold">Latest from our changelog</h3>
                <div className="mt-5 space-y-5">
                  {changelogItems.map((item) => (
                    <div key={item.title} className="relative pl-6">
                      <span className="absolute top-1 left-0 size-2 rounded-full bg-border" />
                      <div className="text-xs text-muted-foreground">{item.time}</div>
                      <div className="mt-1 text-sm leading-6 text-foreground">{item.title}</div>
                    </div>
                  ))}
                </div>
                <button type="button" className="mt-5 text-sm text-muted-foreground hover:text-foreground">
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
