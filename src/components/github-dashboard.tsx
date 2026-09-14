"use client"

import { useMemo, useState } from "react"
import {
  Bell,
  BookOpen,
  Bot,
  ChevronDown,
  Circle,
  Filter,
  GitBranch,
  Github,
  Grip,
  Menu,
  MonitorPlay,
  Plus,
  Search,
  Sparkles,
  Star,
  Triangle,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type RepoItem = {
  id: string
  owner: string
  name: string
  description?: string
  language: string
  stars: string
  iconColor?: string
  iconType?: "avatar" | "spotify"
}

type SidebarRepo = {
  id: string
  name: string
  accent: string
}

type ChangelogItem = {
  id: string
  time: string
  title: string
}

export type GithubHomeDashboardProps = {
  state?: "default"
  username?: string
  mainSearchPlaceholder?: string
  repositorySearchPlaceholder?: string
  topRepositories?: SidebarRepo[]
  trendingRepos?: RepoItem[]
  recommendedRepos?: RepoItem[]
  changelogItems?: ChangelogItem[]
}

const defaultTopRepositories: SidebarRepo[] = [
  { id: "1", name: "OnderCampos/CountBoxingSofttek", accent: "#f1c40f" },
  { id: "2", name: "Fridaplatform/cp-cloudagents", accent: "#ef6ba8" },
  { id: "3", name: "OnderCampos/UI-Agent-Example", accent: "#c9d1d9" },
  { id: "4", name: "Fridaplatform/ReqGen-Backend", accent: "#ef6ba8" },
  { id: "5", name: "Fridaplatform/ProductPlanner", accent: "#ef6ba8" },
  { id: "6", name: "OnderCampos/FridaProductPlannerWebBackend", accent: "#c9d1d9" },
]

const defaultTrendingRepos: RepoItem[] = [
  {
    id: "t1",
    owner: "ayyhri",
    name: "i-have-adhd",
    description: "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
    language: "Python",
    stars: "33.6k",
    iconColor: "#58a6ff",
    iconType: "avatar",
  },
  {
    id: "t2",
    owner: "spotify",
    name: "portal-ai-plugins",
    language: "TypeScript",
    stars: "716",
    iconColor: "#1ed760",
    iconType: "spotify",
  },
]

const defaultRecommendedRepos: RepoItem[] = [
  {
    id: "r1",
    owner: "jasonkylelol",
    name: "graphrag-chinese",
    description: "支持中文CNCCN 的 microsoft/graphrag",
    language: "Python",
    stars: "51",
    iconColor: "#58a6ff",
    iconType: "avatar",
  },
]

const defaultChangelog: ChangelogItem[] = [
  { id: "c1", time: "3 hours ago", title: "Remediate Code Quality findings with agentic autofix" },
  { id: "c2", time: "13 hours ago", title: "Enterprise-managed sandbox in Copilot for JetBrains" },
  { id: "c3", time: "18 hours ago", title: "GitHub Enterprise Server 3.22 is now generally available" },
  { id: "c4", time: "Yesterday", title: "New customer portal help.github.com" },
]

const languageDotClass: Record<string, string> = {
  Python: "bg-[#58a6ff]",
  TypeScript: "bg-[#3178c6]",
}

function RepoActionButton({ label }: { label: string }) {
  const [selectedAction, setSelectedAction] = useState(label)

  return (
    <div className="flex items-center rounded-md border border-border bg-background/60 overflow-hidden">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-8 rounded-none border-0 bg-transparent px-3 text-[12px] text-foreground shadow-none hover:bg-accent/40"
        onClick={() => setSelectedAction((value) => (value === label ? `${label}ed` : label))}
      >
        <Star className="size-3.5" />
        {selectedAction}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 rounded-none border-0 border-l border-border bg-transparent px-2 text-foreground shadow-none hover:bg-accent/40"
          >
            <ChevronDown className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-32 rounded-md border-border bg-card text-card-foreground">
          <DropdownMenuItem onSelect={() => setSelectedAction("Star")}>Star</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setSelectedAction("Watch")}>Watch</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setSelectedAction("Fork")}>Fork</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function DashboardRepoCard({ title, items, showSeeMore = false }: { title: string; items: RepoItem[]; showSeeMore?: boolean }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-lg border-border bg-card py-0 shadow-[var(--shadow-card)]">
      <CardContent className="px-0">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3 text-sm text-muted-foreground">
          <Triangle className="size-4 rotate-90 text-muted-foreground" />
          <span>{title}</span>
          {showSeeMore ? <button type="button" className="text-[13px] text-[#58a6ff]">See more</button> : null}
        </div>
        <div>
          {items.map((item, index) => (
            <div key={item.id} className={cn("flex items-start justify-between gap-4 px-4 py-4", index < items.length - 1 && "border-b border-border") }>
              <div className="flex min-w-0 gap-3">
                <div className="mt-1 flex size-5 items-center justify-center overflow-hidden rounded-full bg-muted/20">
                  {item.iconType === "spotify" ? (
                    <div className="flex size-5 items-center justify-center rounded-full bg-[#1ed760] text-black text-[10px] font-bold">S</div>
                  ) : (
                    <Avatar className="size-5 border border-border">
                      <AvatarImage src="/Frida.png" alt={item.owner} />
                      <AvatarFallback className="bg-muted text-[10px] text-foreground">{item.owner[0]}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-[15px] font-semibold text-foreground">{item.owner}/{item.name}</div>
                  {item.description ? <p className="mt-2 text-[15px] leading-6 text-foreground">{item.description}</p> : null}
                  <div className="mt-2 flex items-center gap-4 text-[13px] text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className={cn("size-3 rounded-full", languageDotClass[item.language] ?? "bg-[#8b949e]")} />
                      {item.language}
                    </span>
                    <span className="flex items-center gap-1.5"><Star className="size-3.5" />{item.stars}</span>
                  </div>
                </div>
              </div>
              <RepoActionButton label="Star" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function GithubDashboard({
  state = "default",
  username = "OnderCampos",
  mainSearchPlaceholder = "Ask anything or type @ to add context",
  repositorySearchPlaceholder = "Find a repository...",
  topRepositories = defaultTopRepositories,
  trendingRepos = defaultTrendingRepos,
  recommendedRepos = defaultRecommendedRepos,
  changelogItems = defaultChangelog,
}: GithubHomeDashboardProps) {
  const [headerSearch, setHeaderSearch] = useState("Type / to search")
  const [repoSearch, setRepoSearch] = useState("")
  const [selectedScope, setSelectedScope] = useState("All repositories")
  const [selectedMode, setSelectedMode] = useState("Ask")
  const [selectedFeedFilter, setSelectedFeedFilter] = useState("Filter")

  const filteredRepositories = useMemo(() => {
    const query = repoSearch.trim().toLowerCase()
    if (!query) return topRepositories
    return topRepositories.filter((repo) => repo.name.toLowerCase().includes(query))
  }, [repoSearch, topRepositories])

  return (
    <div data-state={state} className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-background/95 px-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" className="rounded-md border border-border bg-transparent text-foreground hover:bg-accent/40">
            <Menu className="size-4" />
          </Button>
          <Github className="size-8 text-foreground" />
          <span className="text-sm font-semibold">Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden w-[400px] lg:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={headerSearch}
              onChange={(event) => setHeaderSearch(event.target.value)}
              className="h-8 rounded-md border-border bg-background pl-9 pr-3 text-sm"
            />
          </div>
          <Button variant="ghost" size="icon-sm" className="text-foreground hover:bg-accent/40"><Grip className="size-4" /></Button>
          <Separator orientation="vertical" className="!h-5 bg-border" />
          <Button variant="ghost" size="icon-sm" className="text-foreground hover:bg-accent/40"><Plus className="size-4" /></Button>
          <Button variant="ghost" size="icon-sm" className="text-foreground hover:bg-accent/40"><Circle className="size-4" /></Button>
          <Button variant="ghost" size="icon-sm" className="text-foreground hover:bg-accent/40"><GitBranch className="size-4" /></Button>
          <Button variant="ghost" size="icon-sm" className="text-foreground hover:bg-accent/40"><MonitorPlay className="size-4" /></Button>
          <Button variant="ghost" size="icon-sm" className="text-foreground hover:bg-accent/40"><Bell className="size-4" /></Button>
          <Avatar className="size-8 border border-border">
            <AvatarImage src="/Frida.png" alt={username} />
            <AvatarFallback className="bg-muted text-foreground">OC</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1568px] grid-cols-[300px_minmax(0,1fr)_312px] gap-8 px-4 py-8">
        <aside className="border-r border-border pr-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-6 border border-border">
                <AvatarImage src="/Frida.png" alt={username} />
                <AvatarFallback className="bg-muted text-xs text-foreground">OC</AvatarFallback>
              </Avatar>
              <button type="button" className="flex items-center gap-1 text-[15px] font-semibold text-foreground">
                {username}
                <ChevronDown className="size-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Top repositories</h2>
            <Button className="h-8 rounded-md bg-[var(--button-primary-bg)] px-3 text-[13px] font-medium text-[var(--button-primary-fg)] hover:bg-[var(--button-primary-hover)]">
              <BookOpen className="size-3.5" />
              New
            </Button>
          </div>

          <Input
            value={repoSearch}
            onChange={(event) => setRepoSearch(event.target.value)}
            placeholder={repositorySearchPlaceholder}
            className="mt-3 h-8 rounded-md border-border bg-background text-sm"
          />

          <nav className="mt-4 space-y-3">
            {filteredRepositories.map((repo) => (
              <button key={repo.id} type="button" className="flex w-full items-start gap-2 text-left text-[15px] text-foreground hover:text-primary">
                <span className="mt-1 flex size-4 items-center justify-center rounded-sm text-[10px] font-bold" style={{ backgroundColor: repo.accent, color: repo.accent === "#c9d1d9" ? "#151b23" : "#ffffff" }}>
                  F
                </span>
                <span className="leading-6 break-words">{repo.name}</span>
              </button>
            ))}
          </nav>

          <button type="button" className="mt-4 text-sm text-muted-foreground hover:text-foreground">Show more</button>
        </aside>

        <main className="min-w-0 px-2">
          <h1 className="text-[2rem] font-semibold tracking-[-0.02em] text-foreground">Home</h1>

          <Card className="mt-5 gap-0 rounded-xl border-border bg-card py-0 shadow-[var(--shadow-card)]">
            <CardContent className="px-4 py-4">
              <Input
                value={mainSearchPlaceholder}
                readOnly
                aria-label="Prompt preview"
                className="h-11 border-0 bg-transparent px-0 text-[1.05rem] text-muted-foreground shadow-none focus-visible:ring-0"
              />
              <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button type="button" variant="outline" size="sm" className="h-8 rounded-md border-border bg-background/30 text-sm text-foreground hover:bg-accent/40" onClick={() => setSelectedMode("Ask")}>
                    <BookOpen className="size-3.5" />
                    {selectedMode}
                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button type="button" variant="outline" size="sm" className="h-8 rounded-md border-border bg-background/30 text-sm text-foreground hover:bg-accent/40">
                        <MonitorPlay className="size-3.5" />
                        {selectedScope}
                        <ChevronDown className="size-3.5 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-md border-border bg-card text-card-foreground">
                      <DropdownMenuItem onSelect={() => setSelectedScope("All repositories")}>All repositories</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedScope("My repositories")}>My repositories</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedScope("Starred repositories")}>Starred repositories</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button type="button" variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-background/30 text-foreground hover:bg-accent/40">
                    <Plus className="size-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <button type="button" className="flex items-center gap-1 hover:text-foreground"><Users className="size-4" />Auto<ChevronDown className="size-4" /></button>
                  <button type="button" className="hover:text-foreground"><Sparkles className="size-4" /></button>
                  <button type="button" className="hover:text-foreground"><ChevronDown className="size-4 -rotate-90" /></button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 flex flex-wrap gap-3">
            {[
              { label: "Debug", icon: Bot },
              { label: "Agent", icon: Sparkles },
              { label: "Create issue", icon: Circle },
              { label: "Write code", icon: BookOpen },
              { label: "Git", icon: GitBranch },
              { label: "Pull requests", icon: GitBranch },
            ].map(({ label, icon: Icon }) => (
              <Button key={label} type="button" variant="outline" className="h-10 rounded-full border-border bg-background/40 px-4 text-sm text-foreground shadow-[var(--shadow-card)] hover:bg-accent/40">
                <Icon className="size-4" />
                {label}
                {label === "Write code" || label === "Git" || label === "Pull requests" ? <ChevronDown className="size-3.5 text-muted-foreground" /> : null}
              </Button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Feed</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" size="sm" className="h-8 rounded-md border-border bg-secondary px-3 text-sm text-foreground hover:bg-accent/40">
                  <Filter className="size-3.5" />
                  {selectedFeedFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-md border-border bg-card text-card-foreground">
                <DropdownMenuItem onSelect={() => setSelectedFeedFilter("Filter")}>Filter</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedFeedFilter("Following")}>Following</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSelectedFeedFilter("Trending")}>Trending</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-3 space-y-4">
            <DashboardRepoCard title="Trending repositories" items={trendingRepos} showSeeMore />
            <DashboardRepoCard title="Recommended for you" items={recommendedRepos} />
          </div>
        </main>

        <aside className="space-y-6">
          <Card className="gap-0 overflow-hidden rounded-lg border-border bg-card py-0 shadow-[var(--shadow-card)]">
            <div className="relative h-[70px] overflow-hidden border-b border-border bg-[linear-gradient(135deg,#9be9a8_0%,#56d364_40%,#d2a8ff_70%,#7ee787_100%)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.7),transparent_30%),radial-gradient(circle_at_80%_35%,rgba(255,255,255,0.35),transparent_25%)] opacity-90" />
              <button type="button" className="absolute right-3 top-3 text-muted-foreground hover:text-foreground">×</button>
            </div>
            <CardContent className="px-4 py-4">
              <div className="text-xs font-medium tracking-wide text-[#58a6ff] uppercase">September 10 · 8:00 AM PT</div>
              <h3 className="mt-3 text-[1.7rem] leading-8 font-semibold text-foreground">GitHub Copilot Day</h3>
              <ul className="mt-4 space-y-2 text-[15px] leading-6 text-muted-foreground">
                <li className="flex gap-2"><span className="mt-2 size-1.5 rounded-full bg-primary" />See how HydraFusion combines AI models to match the right model to the task</li>
                <li className="flex gap-2"><span className="mt-2 size-1.5 rounded-full bg-primary" />Learn to automate work, run parallel agents, and use your own models</li>
                <li className="flex gap-2"><span className="mt-2 size-1.5 rounded-full bg-primary" />Turn your best coding approaches into reusable Agent Skills</li>
              </ul>
              <Button type="button" className="mt-5 h-9 w-full rounded-md bg-[#f0f6fc] text-[#151b23] hover:bg-white">Set your reminder</Button>
            </CardContent>
          </Card>

          <Card className="gap-0 rounded-xl border-border bg-card py-0 shadow-[var(--shadow-card)]">
            <CardContent className="px-4 py-4">
              <h3 className="text-[1.45rem] font-semibold leading-8 text-foreground">Latest from our changelog</h3>
              <div className="mt-5 space-y-4">
                {changelogItems.map((item) => (
                  <div key={item.id} className="relative pl-6">
                    <span className="absolute left-[3px] top-1 size-2 rounded-full bg-muted-foreground/70" />
                    <span className="absolute left-1 top-3 h-full w-px bg-border last:hidden" />
                    <div className="text-[13px] text-muted-foreground">{item.time}</div>
                    <div className="mt-1 text-[15px] leading-6 text-foreground">{item.title}</div>
                  </div>
                ))}
              </div>
              <button type="button" className="mt-4 text-sm text-[#58a6ff] hover:underline">View changelog →</button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
