"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BookText,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Filter,
  FolderGit2,
  GitBranch,
  Github,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Sparkles,
  Star,
  Triangle,
  Users,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type RepositoryItem = {
  name: string;
  description?: string;
  language: string;
  stars: string;
  ownerAvatar?: string;
  accent?: string;
};

type DashboardSection = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: RepositoryItem[];
};

type GithubHomeDashboardProps = {
  state?: "default";
  userName?: string;
  leftRepositories?: string[];
  sections?: DashboardSection[];
};

const defaultSections: DashboardSection[] = [
  {
    title: "Trending repositories",
    icon: Triangle,
    items: [
      {
        name: "ayghri/i-have-adhd",
        description:
          "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
        language: "Python",
        stars: "33.6k",
        ownerAvatar: "/Frida.png",
      },
      {
        name: "spotify/portal-ai-plugins",
        language: "TypeScript",
        stars: "716",
        accent: "spotify",
      },
    ],
  },
  {
    title: "Recommended for you",
    icon: Star,
    items: [
      {
        name: "jasonkylelol/graphrag-chinese",
        description: "支持中文CNCCN 的 microsoft/graphrag",
        language: "Python",
        stars: "51",
        ownerAvatar: "/Frida.png",
      },
    ],
  },
];

const topRepositories = [
  "OnderCampos/CountBoxingSofttek",
  "Fridaplatform/cp-cloudagents",
  "OnderCampos/UI-Agent-Example",
  "Fridaplatform/ReqGen-Backend",
  "Fridaplatform/ProductPlanner",
  "Fridaplatform/reqgen_frontend",
  "OnderCampos/FridaProductPlannerWebBackend",
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

const askScopes = ["All repositories", "My repositories", "Starred repositories"];
const actionLabels = ["Debug", "Agent", "Create issue", "Write code", "Git", "Pull requests"];

function GithubHomeDashboard({
  state = "default",
  userName = "OnderCampos",
  leftRepositories = topRepositories,
  sections = defaultSections,
}: GithubHomeDashboardProps) {
  const [headerSearch, setHeaderSearch] = useState("");
  const [repoSearch, setRepoSearch] = useState("");
  const [askText, setAskText] = useState("");
  const [askScope, setAskScope] = useState(askScopes[0]);
  const [autoMode, setAutoMode] = useState("Auto");
  const [starredRepos, setStarredRepos] = useState<Record<string, boolean>>({});

  const filteredRepositories = useMemo(
    () =>
      leftRepositories.filter((repo) =>
        repo.toLowerCase().includes(repoSearch.toLowerCase())
      ),
    [leftRepositories, repoSearch]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between gap-4 px-3 md:px-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" className="border border-border bg-transparent text-foreground hover:bg-card">
              <Menu className="size-4" />
            </Button>
            <Github className="size-8" />
            <button type="button" className="text-sm font-semibold">
              Dashboard
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden w-[340px] md:block">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                value={headerSearch}
                onChange={(e) => setHeaderSearch(e.target.value)}
                placeholder="Type / to search"
                className="h-8 rounded-md border-border bg-transparent pl-9 pr-3 text-sm"
              />
            </div>
            <Button variant="ghost" size="icon-sm" className="border border-border hover:bg-card"><Sparkles className="size-4" /></Button>
            <Separator orientation="vertical" className="hidden h-5 md:block" />
            <Button variant="ghost" size="icon-sm" className="border border-border hover:bg-card"><Plus className="size-4" /></Button>
            <Button variant="ghost" size="icon-sm" className="border border-border hover:bg-card"><CircleDot className="size-4" /></Button>
            <Button variant="ghost" size="icon-sm" className="border border-border hover:bg-card"><GitBranch className="size-4" /></Button>
            <Button variant="ghost" size="icon-sm" className="border border-border hover:bg-card"><Bell className="size-4" /></Button>
            <Avatar className="size-8 border border-border">
              <AvatarImage src="/Frida.png" alt={userName} />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-56px)] grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_320px]">
        <aside className="border-r border-border bg-card/50 xl:block">
          <div className="flex h-full flex-col p-4">
            <div className="mb-6 flex items-center gap-3">
              <Avatar className="size-7 border border-border">
                <AvatarImage src="/Frida.png" alt={userName} />
                <AvatarFallback>OC</AvatarFallback>
              </Avatar>
              <button type="button" className="flex items-center gap-1 text-sm font-semibold">
                {userName}
                <ChevronDown className="size-3 text-muted-foreground" />
              </button>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Top repositories</h2>
              <Button className="h-8 rounded-md bg-[var(--color-github-primary)] px-3 text-[13px] font-medium text-[var(--color-github-primary-foreground)] hover:bg-[var(--color-github-primary-hover)]">
                <BookText className="size-4" />
                New
              </Button>
            </div>

            <Input
              value={repoSearch}
              onChange={(e) => setRepoSearch(e.target.value)}
              placeholder="Find a repository..."
              className="mb-4 h-8 bg-background text-sm"
            />

            <ScrollArea className="flex-1 pr-2">
              <div className="space-y-3">
                {filteredRepositories.map((repo) => (
                  <button
                    key={repo}
                    type="button"
                    className="flex w-full items-start gap-2 text-left text-sm text-foreground hover:text-[var(--color-github-primary)]"
                  >
                    <span className="mt-1 inline-flex size-4 items-center justify-center rounded-sm bg-[#f778ba]/20 text-[10px] font-bold text-[#f778ba]">
                      F
                    </span>
                    <span className="leading-5 break-all">{repo}</span>
                  </button>
                ))}
              </div>
            </ScrollArea>

            <button type="button" className="mt-4 text-left text-sm text-muted-foreground hover:text-foreground">
              Show more
            </button>
          </div>
        </aside>

        <main className="px-4 py-8 md:px-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-4 text-[40px] leading-none font-semibold tracking-tight">Home</h1>

            <Card className="gap-0 rounded-2xl border-border bg-card py-0 shadow-[var(--shadow-card)]">
              <CardContent className="p-4">
                <Input
                  value={askText}
                  onChange={(e) => setAskText(e.target.value)}
                  placeholder="Ask anything or type @ to add context"
                  className="mb-6 h-8 border-0 bg-transparent px-0 text-lg shadow-none focus-visible:ring-0"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 rounded-md border-border bg-transparent hover:bg-secondary">
                      <MessageSquare className="size-4" />
                      Ask
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 rounded-md border-border bg-transparent hover:bg-secondary">
                          <FolderGit2 className="size-4" />
                          {askScope}
                          <ChevronDown className="size-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {askScopes.map((scope) => (
                          <DropdownMenuItem key={scope} onSelect={() => setAskScope(scope)}>
                            {scope}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-transparent hover:bg-secondary">
                      <Plus className="size-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 rounded-md px-2 text-muted-foreground hover:bg-transparent hover:text-foreground">
                          <Users className="size-4" />
                          {autoMode}
                          <ChevronDown className="size-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {['Auto', 'Copilot', 'Manual'].map((option) => (
                          <DropdownMenuItem key={option} onSelect={() => setAutoMode(option)}>
                            {option}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-md hover:bg-secondary">
                      <CheckCircle2 className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-md hover:bg-secondary">
                      <ChevronDown className="size-4 rotate-[-90deg]" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 flex flex-wrap gap-3">
              {actionLabels.map((label) => (
                <Button key={label} variant="outline" className="h-10 rounded-full border-border bg-background px-5 text-sm font-medium hover:bg-card">
                  {label === 'Debug' && <CircleDot className="size-4" />}
                  {label === 'Agent' && <Sparkles className="size-4" />}
                  {label === 'Create issue' && <CircleDot className="size-4" />}
                  {label === 'Write code' && <BookText className="size-4" />}
                  {label === 'Git' && <GitBranch className="size-4" />}
                  {label === 'Pull requests' && <GitBranch className="size-4" />}
                  {label}
                  {(label === 'Write code' || label === 'Git' || label === 'Pull requests') && <ChevronDown className="size-3" />}
                </Button>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Feed</h2>
              <Button variant="outline" size="sm" className="h-8 rounded-md border-border bg-card px-3 hover:bg-secondary">
                <Filter className="size-4" />
                Filter
              </Button>
            </div>

            <div className="mt-3 space-y-4">
              {sections.map((section) => (
                <Card key={section.title} className="gap-0 rounded-lg border-border bg-card py-0 shadow-[var(--shadow-card)]">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2 border-b border-border px-4 py-4 text-sm text-muted-foreground">
                      <section.icon className="size-4" />
                      <span>{section.title}</span>
                      {section.title === 'Trending repositories' && (
                        <button type="button" className="text-[var(--color-github-accent)] underline-offset-2 hover:underline">
                          See more
                        </button>
                      )}
                    </div>

                    {section.items.map((item, index) => {
                      const starred = starredRepos[item.name] ?? true;

                      return (
                        <div
                          key={item.name}
                          className={cn(
                            "flex items-start justify-between gap-4 px-4 py-4",
                            index !== section.items.length - 1 && "border-b border-border"
                          )}
                        >
                          <div className="min-w-0">
                            <div className="mb-2 flex items-center gap-2">
                              {item.ownerAvatar ? (
                                <Avatar className="size-5 border border-border">
                                  <AvatarImage src={item.ownerAvatar} alt={item.name} />
                                  <AvatarFallback>R</AvatarFallback>
                                </Avatar>
                              ) : (
                                <span className="inline-flex size-5 items-center justify-center rounded-full bg-[#1f6feb] text-[10px] font-bold text-white">
                                  S
                                </span>
                              )}
                              <p className="text-sm font-semibold text-foreground">{item.name}</p>
                            </div>
                            {item.description && (
                              <p className="mb-3 max-w-2xl text-[15px] leading-6 text-foreground">{item.description}</p>
                            )}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1.5">
                                <span className={cn("size-3 rounded-full bg-[#58a6ff]", item.accent === 'spotify' && 'bg-[#1ed760]')} />
                                {item.language}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Star className="size-3.5" />
                                {item.stars}
                              </span>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 rounded-md border-border bg-secondary px-3 hover:bg-[#2e353e]">
                                <Star className={cn("size-4", starred && 'fill-current')} />
                                Star
                                <ChevronDown className="size-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onSelect={() => setStarredRepos((prev) => ({ ...prev, [item.name]: !starred }))}>
                                {starred ? 'Unstar repository' : 'Star repository'}
                              </DropdownMenuItem>
                              <DropdownMenuItem>Fork</DropdownMenuItem>
                              <DropdownMenuItem>Add to list</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>

        <aside className="border-l border-border px-4 py-8 md:px-6">
          <div className="space-y-6">
            <Card className="gap-0 overflow-hidden rounded-lg border-border bg-card py-0 shadow-[var(--shadow-card)]">
              <div className="h-[72px] bg-[linear-gradient(115deg,#b3f6c8_0%,#53d77a_20%,#ecfdf3_45%,#92e5b1_62%,#7c3aed_85%,#53d77a_100%)]" />
              <CardContent className="p-4">
                <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">September 10 · 8:00 AM PT</p>
                <h3 className="mb-3 text-[28px] leading-8 font-semibold">GitHub Copilot Day</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2"><span className="mt-2 size-1.5 rounded-full bg-[var(--color-github-primary)]" />See how HydraFusion combines AI models to match the right model to the task</li>
                  <li className="flex gap-2"><span className="mt-2 size-1.5 rounded-full bg-[var(--color-github-primary)]" />Learn to automate work, run parallel agents, and use your own models</li>
                  <li className="flex gap-2"><span className="mt-2 size-1.5 rounded-full bg-[var(--color-github-primary)]" />Turn your best coding approaches into reusable Agent Skills</li>
                </ul>
                <Button className="mt-4 h-8 w-full rounded-md bg-secondary text-foreground hover:bg-[#d0d7de] hover:text-background">
                  Set your reminder
                </Button>
              </CardContent>
            </Card>

            <Card className="gap-0 rounded-xl border-border bg-card py-0 shadow-[var(--shadow-card)]">
              <CardContent className="p-4">
                <h3 className="mb-4 text-xl leading-6 font-semibold">Latest from our changelog</h3>
                <div className="space-y-4">
                  {changelogItems.map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <div className="flex flex-col items-center pt-1">
                        <span className="size-2 rounded-full bg-border" />
                        <span className="mt-1 h-full w-px bg-border" />
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-muted-foreground">{item.time}</p>
                        <p className="text-sm leading-6 text-foreground">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" className="mt-4 text-sm text-muted-foreground hover:text-foreground">
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
  return <GithubHomeDashboard state="default" />;
}
