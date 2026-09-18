"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  ChevronDown,
  Filter,
  FolderGit2,
  GitBranch,
  Github,
  History,
  House,
  LayoutGrid,
  Menu,
  MessageSquare,
  MoonStar,
  Plus,
  Play,
  Search,
  Sparkles,
  Star,
  Triangle,
  UserCircle2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type RepoItem = {
  name: string;
  description?: string;
  language: string;
  stars: string;
  ownerAvatar?: string;
  icon?: "avatar" | "spotify";
};

type FeedSection = {
  title: string;
  items: RepoItem[];
  showMore?: boolean;
};

type DashboardHomeFeedProps = {
  state?: "default";
  userName?: string;
  searchPlaceholder?: string;
  feedSections?: FeedSection[];
};

const defaultTopRepositories = [
  "OnderCampos/CountBoxingSofttek",
  "Fridaplatform/cp-cloudagents",
  "OnderCampos/UI-Agent-Example",
  "Fridaplatform/ReqGen-Backend",
  "Fridaplatform/ProductPlanner",
  "Fridaplatform/reggen_frontend",
  "OnderCampos/FridaProductPlannerWebBackend",
];

const defaultFeedSections: FeedSection[] = [
  {
    title: "Trending repositories",
    showMore: true,
    items: [
      {
        name: "ayghri/i-have-adhd",
        description: "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
        language: "Python",
        stars: "33.6k",
        ownerAvatar: "https://avatars.githubusercontent.com/u/12165759?v=4",
        icon: "avatar",
      },
      {
        name: "spotify/portal-ai-plugins",
        language: "TypeScript",
        stars: "716",
        icon: "spotify",
      },
    ],
  },
  {
    title: "Recommended for you",
    items: [
      {
        name: "jasonkylelol/graphrag-chinese",
        description: "支持中文CNCCN 的 microsoft/graphrag",
        language: "Python",
        stars: "51",
        ownerAvatar: "https://avatars.githubusercontent.com/u/9919?v=4",
        icon: "avatar",
      },
    ],
  },
];

const changelogItems = [
  { age: "3 hours ago", title: "Remediate Code Quality findings with agentic autofix" },
  { age: "13 hours ago", title: "Enterprise-managed sandbox in Copilot for JetBrains" },
  { age: "18 hours ago", title: "GitHub Enterprise Server 3.22 is now generally available" },
  { age: "Yesterday", title: "New customer portal help.github.com" },
];

function DashboardHomeFeed({
  state = "default",
  userName = "OnderCampos",
  searchPlaceholder = "Find a repository...",
  feedSections = defaultFeedSections,
}: DashboardHomeFeedProps) {
  const [repositorySearch, setRepositorySearch] = useState("");
  const [heroPrompt, setHeroPrompt] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");
  const [askMode, setAskMode] = useState("Ask");
  const [repositoryScope, setRepositoryScope] = useState("All repositories");
  const [starredRepos, setStarredRepos] = useState<Record<string, boolean>>({});
  const [headerMenu, setHeaderMenu] = useState("Projects");
  const [headerNotice, setHeaderNotice] = useState("Issues");

  const filteredRepositories = useMemo(
    () =>
      defaultTopRepositories.filter((repo) =>
        repo.toLowerCase().includes(repositorySearch.toLowerCase())
      ),
    [repositorySearch]
  );

  const toggleStar = (repoName: string) => {
    setStarredRepos((prev) => ({ ...prev, [repoName]: !prev[repoName] }));
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="flex h-14 items-center justify-between border-b border-border/90 bg-background px-3">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-transparent hover:bg-card">
            <Menu className="h-4 w-4" />
          </Button>
          <Github className="h-8 w-8" fill="currentColor" />
          <span className="text-sm font-semibold">Dashboard</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden h-8 w-[290px] items-center rounded-md border border-border bg-transparent px-3 text-sm text-muted-foreground lg:flex">
            <Search className="mr-2 h-4 w-4" />
            <Input
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Type / to search"
              className="h-auto border-0 bg-transparent px-0 py-0 text-sm shadow-none focus-visible:ring-0"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-transparent hover:bg-card">
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setHeaderMenu("Projects")}>Projects</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setHeaderMenu("Repositories")}>Repositories</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator orientation="vertical" className="hidden h-5 md:block" />

          <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-transparent hover:bg-card">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-transparent hover:bg-card">
            <Bell className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon-sm" className="relative h-8 w-8 rounded-md border-border bg-transparent hover:bg-card">
                <GitBranch className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setHeaderNotice("Pull requests")}>Pull requests</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setHeaderNotice("Issues")}>Issues</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Avatar className="h-8 w-8 border border-border">
            <AvatarImage src="https://avatars.githubusercontent.com/u/583231?v=4" alt={userName} />
            <AvatarFallback>OC</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-56px)] grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_316px]">
        <aside className="border-r border-border bg-card px-5 py-8">
          <div className="mb-8 flex items-center gap-3 text-sm font-semibold">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://avatars.githubusercontent.com/u/583231?v=4" alt={userName} />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
            <button type="button" className="flex items-center gap-1 text-left">
              {userName}
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Top repositories</h2>
            <Button className="h-8 rounded-md bg-primary px-3 text-[13px] font-semibold text-primary-foreground hover:bg-primary-hover">
              <BookOpen className="h-4 w-4" />
              New
            </Button>
          </div>

          <Input
            value={repositorySearch}
            onChange={(e) => setRepositorySearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="mb-4 h-8 rounded-md border-border bg-background px-3 text-sm"
          />

          <nav className="space-y-3 text-[15px] text-foreground/95">
            {filteredRepositories.map((repo) => (
              <button key={repo} type="button" className="block w-full text-left leading-6 hover:text-primary">
                {repo}
              </button>
            ))}
          </nav>

          <button type="button" className="mt-4 text-sm text-muted-foreground hover:text-foreground">
            Show more
          </button>
        </aside>

        <section className="px-6 py-10 xl:px-14">
          <div className="mx-auto max-w-[805px]">
            <h1 className="mb-6 font-[600] text-[36px] leading-none tracking-[-0.02em]">Home</h1>

            <Card className="gap-0 rounded-2xl border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <CardContent className="p-4">
                <Input
                  value={heroPrompt}
                  onChange={(e) => setHeroPrompt(e.target.value)}
                  placeholder="Ask anything or type @ to add context"
                  className="mb-11 h-auto border-0 bg-transparent px-0 py-0 text-[29px] leading-[1.3] text-muted-foreground shadow-none focus-visible:ring-0"
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-9 rounded-md border-border bg-background px-3 hover:bg-card">
                          <MessageSquare className="h-4 w-4" />
                          {askMode}
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onSelect={() => setAskMode("Ask")}>Ask</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setAskMode("Explain")}>Explain</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="h-9 rounded-md border-border bg-background px-3 hover:bg-card">
                          <FolderGit2 className="h-4 w-4" />
                          {repositoryScope}
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuItem onSelect={() => setRepositoryScope("All repositories")}>All repositories</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setRepositoryScope("Top repositories")}>Top repositories</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="outline" size="icon-sm" className="h-9 w-9 rounded-md border-border bg-background hover:bg-card">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <button type="button" className="flex items-center gap-1 hover:text-foreground">
                      <Sparkles className="h-4 w-4" />
                      Auto
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <button type="button" className="hover:text-foreground">
                      <History className="h-4 w-4" />
                    </button>
                    <button type="button" className="hover:text-foreground">
                      <Play className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-5 flex flex-wrap gap-3">
              {[
                { label: "Debug", icon: Triangle },
                { label: "Agent", icon: MoonStar },
                { label: "Create issue", icon: Sparkles },
                { label: "Write code", icon: BookOpen },
                { label: "Git", icon: GitBranch },
                { label: "Pull requests", icon: GitBranch },
              ].map(({ label, icon: Icon }) => (
                <Button key={label} variant="outline" className="h-10 rounded-full border-border bg-background px-5 hover:bg-card">
                  <Icon className="h-4 w-4" />
                  {label}
                  {label === "Write code" || label === "Git" || label === "Pull requests" ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : null}
                </Button>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Feed</h2>
              <Button variant="outline" className="h-8 rounded-md border-border bg-card px-3 hover:bg-card/80">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="mt-3 space-y-4">
              {feedSections.map((section) => (
                <Card key={section.title} className="gap-0 rounded-lg border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
                  <CardContent className="p-0">
                    <div className="flex items-center gap-2 border-b border-border px-4 py-3 text-[22px] font-medium text-muted-foreground">
                      <Star className="h-4 w-4" />
                      <span className="text-base font-normal text-muted-foreground">{section.title}</span>
                      {section.showMore ? (
                        <button type="button" className="text-sm text-link underline-offset-2 hover:underline">
                          See more
                        </button>
                      ) : null}
                    </div>

                    {section.items.map((item, index) => {
                      const isStarred = Boolean(starredRepos[item.name]);
                      return (
                        <div
                          key={item.name}
                          className={cn("flex items-start justify-between px-4 py-4", index < section.items.length - 1 && "border-b border-border")}
                        >
                          <div className="pr-4">
                            <div className="mb-2 flex items-center gap-2 text-[15px] font-semibold">
                              {item.icon === "spotify" ? (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1ed760] text-black">♬</span>
                              ) : (
                                <Avatar className="h-5 w-5">
                                  <AvatarImage src={item.ownerAvatar} alt={item.name} />
                                  <AvatarFallback>R</AvatarFallback>
                                </Avatar>
                              )}
                              <span>{item.name}</span>
                            </div>
                            {item.description ? <p className="mb-2 text-[15px] leading-6 text-foreground">{item.description}</p> : null}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1.5">
                                <span className="h-3 w-3 rounded-full bg-[#4493f8]" />
                                {item.language}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Star className="h-3.5 w-3.5" />
                                {item.stars}
                              </span>
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            className="h-8 rounded-md border-border bg-background px-4 text-sm hover:bg-card"
                            onClick={() => toggleStar(item.name)}
                          >
                            <Star className={cn("h-4 w-4", isStarred && "fill-current text-primary")} />
                            {isStarred ? "Starred" : "Star"}
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <aside className="px-5 py-9">
          <div className="space-y-6">
            <Card className="gap-0 overflow-hidden rounded-lg border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <div className="h-[72px] bg-[linear-gradient(135deg,#7adc97_0%,#d7ffe1_25%,#3fb950_48%,#8b5cf6_74%,#7adc97_100%)] opacity-95" />
              <CardContent className="border-t border-border p-0">
                <div className="border-b border-border px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">September 10 · 8:00 AM PT</div>
                <div className="space-y-4 p-4">
                  <div>
                    <h3 className="mb-3 text-[28px] font-semibold leading-8">GitHub Copilot Day</h3>
                    <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                      <li className="flex gap-2"><span className="mt-2 h-2 w-2 rounded-[2px] bg-primary" />See how HydraFusion combines AI models to match the right model to the task</li>
                      <li className="flex gap-2"><span className="mt-2 h-2 w-2 rounded-[2px] bg-primary" />Learn to automate work, run parallel agents, and use your own models</li>
                      <li className="flex gap-2"><span className="mt-2 h-2 w-2 rounded-[2px] bg-primary" />Turn your best coding approaches into reusable Agent Skills</li>
                    </ul>
                  </div>
                  <Button className="h-8 w-full rounded-md bg-primary text-primary-foreground hover:bg-primary-hover">Set your reminder</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="gap-0 rounded-lg border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <CardContent className="p-4">
                <h3 className="mb-5 text-[22px] font-semibold leading-7">Latest from our changelog</h3>
                <div className="space-y-5">
                  {changelogItems.map((item) => (
                    <div key={item.title} className="grid grid-cols-[14px_1fr] gap-3">
                      <div className="flex justify-center">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-border" />
                      </div>
                      <div>
                        <p className="mb-1 text-sm text-muted-foreground">{item.age}</p>
                        <p className="text-[15px] leading-6 text-foreground">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" className="mt-5 text-sm text-muted-foreground hover:text-foreground">View changelog →</button>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>

      <div className="hidden">{state}{headerMenu}{headerNotice}</div>
    </main>
  );
}

export default function HomePage() {
  return <DashboardHomeFeed />;
}
