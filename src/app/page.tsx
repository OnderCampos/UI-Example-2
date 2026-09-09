"use client"

import { useMemo, useState } from "react"
import {
  ArrowUp,
  Bell,
  ChevronDown,
  ChevronsUpDown,
  Clock3,
  Filter,
  GitBranch,
  Github,
  Home,
  ListFilter,
  Menu,
  Minus,
  Monitor,
  MoonStar,
  Plus,
  Search,
  SendHorizonal,
  Sparkles,
  SquarePen,
  Star,
  Sun,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

type DashboardHomeState = "default"

type RepoItem = {
  name: string
  owner: string
  initials: string
  accent?: string
}

type FeedRepo = {
  name: string
  description?: string
  language: string
  languageColor: string
  stars: string
  ownerInitials: string
  accent?: string
}

type FeedSection = {
  title: string
  repos: FeedRepo[]
}

type DashboardHomeViewProps = {
  state?: DashboardHomeState
}

const topRepositories: RepoItem[] = [
  { name: "CountBoxingSofttek", owner: "OnderCampos", initials: "O" },
  { name: "cp-cloudagents", owner: "Fridaplatform", initials: "F", accent: "bg-pink-500/70" },
  { name: "UI-Agent-Example", owner: "OnderCampos", initials: "O" },
  { name: "ReqGen-Backend", owner: "Fridaplatform", initials: "F", accent: "bg-pink-500/70" },
  { name: "ProductPlanner", owner: "Fridaplatform", initials: "F", accent: "bg-pink-500/70" },
  { name: "reqgen_frontend", owner: "Fridaplatform", initials: "F", accent: "bg-pink-500/70" },
  { name: "FridaProductPlannerWebBackend", owner: "OnderCampos", initials: "O" },
]

const feedSections: FeedSection[] = [
  {
    title: "Trending repositories",
    repos: [
      {
        name: "ayghri/i-have-adhd",
        description: "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
        language: "Python",
        languageColor: "bg-[var(--color-python)]",
        stars: "33.6k",
        ownerInitials: "A",
      },
      {
        name: "spotify/portal-ai-plugins",
        language: "TypeScript",
        languageColor: "bg-[var(--color-typescript)]",
        stars: "716",
        ownerInitials: "S",
        accent: "bg-green-500",
      },
    ],
  },
  {
    title: "Recommended for you",
    repos: [
      {
        name: "jasonkylelol/graphrag-chinese",
        description: "支持中文CNCCN 的 microsoft/graphrag",
        language: "Python",
        languageColor: "bg-[var(--color-python)]",
        stars: "51",
        ownerInitials: "J",
      },
    ],
  },
]

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
]

const quickActions = [
  { label: "Debug", icon: Sparkles },
  { label: "Agent", icon: ArrowUp },
  { label: "Create issue", icon: Minus },
  { label: "Write code", icon: SquarePen, dropdown: true },
  { label: "Git", icon: GitBranch, dropdown: true },
  { label: "Pull requests", icon: ChevronsUpDown, dropdown: true },
]

const headerIcons = [Bell, Plus, Home, GitBranch, Monitor]

function SmallOwnerBadge({ initials, accent }: { initials: string; accent?: string }) {
  return (
    <div
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated text-[10px] font-semibold text-foreground",
        accent
      )}
    >
      {initials}
    </div>
  )
}

function IconShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-8 items-center justify-center rounded-md border border-border bg-transparent text-muted-foreground hover:bg-surface-hover hover:text-foreground">
      {children}
    </div>
  )
}

function HeaderIconButton({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-md border border-border text-muted-foreground hover:bg-surface-hover hover:text-foreground">
      <Icon className="size-4" />
    </Button>
  )
}

function FeedCard({ section }: { section: FeedSection }) {
  return (
    <Card className="gap-0 rounded-md border-border bg-card py-0 shadow-none">
      <CardHeader className="border-b border-border px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Sparkles className="size-4 text-muted-foreground" />
          <CardTitle className="text-sm font-medium text-text-secondary">{section.title}</CardTitle>
          {section.title === "Trending repositories" ? (
            <>
              <span className="text-text-subtle">·</span>
              <button type="button" className="text-sm text-primary hover:underline">
                See more
              </button>
            </>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="px-0">
        {section.repos.map((repo, index) => (
          <div key={repo.name} className={cn("flex items-start justify-between gap-4 px-4 py-4", index < section.repos.length - 1 && "border-b border-border")}>
            <div className="flex min-w-0 gap-3">
              <div className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated text-[11px] font-semibold text-foreground", repo.accent)}>
                {repo.ownerInitials}
              </div>
              <div className="min-w-0 space-y-2">
                <button type="button" className="block truncate text-left text-base font-semibold text-primary hover:underline">
                  {repo.name}
                </button>
                {repo.description ? <p className="text-[15px] leading-6 text-text-secondary">{repo.description}</p> : null}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className={cn("size-3 rounded-full", repo.languageColor)} />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="size-4" />
                    {repo.stars}
                  </span>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 min-w-[96px] rounded-md border-border bg-secondary px-0 text-text-secondary shadow-none hover:bg-surface-hover hover:text-foreground">
                  <span className="flex flex-1 items-center justify-center gap-2 border-r border-border px-3">
                    <Star className="size-4" />
                    Star
                  </span>
                  <span className="px-2">
                    <ChevronDown className="size-4" />
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 border-border bg-card text-foreground">
                <DropdownMenuItem>Star repository</DropdownMenuItem>
                <DropdownMenuItem>Add to list</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function DashboardHomeView({ state = "default" }: DashboardHomeViewProps) {
  const [headerSearch, setHeaderSearch] = useState("")
  const [repoSearch, setRepoSearch] = useState("")
  const [prompt, setPrompt] = useState("")
  const [mode, setMode] = useState("Ask")
  const [autoMode, setAutoMode] = useState("Auto")

  const filteredRepos = useMemo(() => {
    const query = repoSearch.trim().toLowerCase()
    if (!query) return topRepositories
    return topRepositories.filter((repo) => `${repo.owner}/${repo.name}`.toLowerCase().includes(query))
  }, [repoSearch])

  return (
    <div data-state={state} className="min-h-screen bg-background text-foreground">
      <header className="flex h-16 items-center justify-between border-b border-border bg-background-deep px-3 text-sm">
        <div className="flex items-center gap-3">
          <IconShell>
            <Menu className="size-4" />
          </IconShell>
          <Github className="size-8 text-foreground" />
          <span className="text-sm font-semibold text-foreground">Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-[280px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={headerSearch}
              onChange={(event) => setHeaderSearch(event.target.value)}
              placeholder="Type / to search"
              className="h-8 rounded-md border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-2">
            <HeaderIconButton icon={Bell} />
            <Separator orientation="vertical" className="h-5 bg-border" />
            {headerIcons.slice(1, 3).map((Icon, index) => (
              <HeaderIconButton key={index.toString()} icon={Icon} />
            ))}
            <Separator orientation="vertical" className="h-5 bg-border" />
            {headerIcons.slice(3).map((Icon, index) => (
              <HeaderIconButton key={index.toString()} icon={Icon} />
            ))}
            <div className="relative">
              <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary" />
              <Avatar className="size-8 border border-border">
                <AvatarImage src="/Frida.png" alt="OnderCampos" />
                <AvatarFallback>OC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-64px)] grid-cols-[296px_minmax(0,1fr)_320px]">
        <aside className="border-r border-border bg-card px-4 py-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="mb-8 h-auto w-full justify-start gap-3 px-0 py-0 text-left hover:bg-transparent hover:text-foreground">
                <Avatar className="size-5 border border-border">
                  <AvatarImage src="/Frida.png" alt="OnderCampos" />
                  <AvatarFallback>OC</AvatarFallback>
                </Avatar>
                <span className="font-semibold text-text-secondary">OnderCampos</span>
                <ChevronDown className="size-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="border-border bg-card text-foreground">
              <DropdownMenuItem>OnderCampos</DropdownMenuItem>
              <DropdownMenuItem>Fridaplatform</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-text-secondary">Top repositories</h2>
            <Button className="h-6 rounded-md bg-success px-2.5 text-xs font-semibold text-white hover:bg-success-hover">
              <Plus className="size-3.5" />
              New
            </Button>
          </div>

          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={repoSearch}
              onChange={(event) => setRepoSearch(event.target.value)}
              placeholder="Find a repository..."
              className="h-8 rounded-md border-border bg-background pl-9 text-sm placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-3">
            {filteredRepos.map((repo) => (
              <button key={repo.name} type="button" className="flex w-full items-start gap-2 text-left text-sm text-text-secondary hover:text-foreground">
                <SmallOwnerBadge initials={repo.initials} accent={repo.accent} />
                <span className="leading-6 break-words text-[15px]">
                  {repo.owner}/{repo.name}
                </span>
              </button>
            ))}
          </div>

          <button type="button" className="mt-5 text-sm text-muted-foreground hover:text-foreground">
            Show more
          </button>
        </aside>

        <main className="bg-background px-14 py-10">
          <div className="mx-auto max-w-[805px] space-y-6">
            <h1 className="text-[2rem] font-semibold leading-none">Home</h1>

            <Card className="gap-0 rounded-xl border-border bg-card py-0 shadow-none">
              <CardContent className="px-0">
                <Textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Ask anything or type @ to add context"
                  className="min-h-[110px] resize-none rounded-b-none rounded-t-xl border-0 bg-card px-4 py-4 text-[15px] leading-6 shadow-none focus-visible:ring-0"
                />
              </CardContent>
              <CardFooter className="justify-between border-t border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setMode("Ask")}
                    className={cn(
                      "h-8 rounded-md border-border bg-secondary text-text-secondary shadow-none hover:bg-surface-hover hover:text-foreground",
                      mode === "Ask" && "text-foreground"
                    )}
                  >
                    <MessageBubble />
                    Ask
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 rounded-md border-border bg-secondary text-text-secondary shadow-none hover:bg-surface-hover hover:text-foreground">
                    <Monitor className="size-4" />
                    All repositories
                    <ChevronDown className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-secondary text-text-secondary shadow-none hover:bg-surface-hover hover:text-foreground">
                    <Plus className="size-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={autoMode} onValueChange={setAutoMode}>
                    <SelectTrigger size="sm" className="h-8 rounded-md border-border bg-card text-text-secondary shadow-none hover:bg-surface-hover">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-border bg-card text-foreground">
                      <SelectItem value="Auto">Auto</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-surface-hover hover:text-foreground">
                    <Clock3 className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-surface-hover hover:text-foreground">
                    <Sparkles className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-full border border-border text-muted-foreground hover:bg-surface-hover hover:text-foreground">
                    <SendHorizonal className="size-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <div className="flex flex-wrap gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Button key={action.label} variant="outline" className="h-10 rounded-full border-border bg-background-deep px-4 text-sm font-medium text-text-secondary shadow-none hover:bg-surface-hover hover:text-foreground">
                    <Icon className="size-4" />
                    {action.label}
                    {action.dropdown ? <ChevronDown className="size-4" /> : null}
                  </Button>
                )
              })}
            </div>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Feed</h2>
                <Button variant="outline" size="sm" className="h-8 rounded-md border-border bg-secondary px-3 text-text-secondary shadow-none hover:bg-surface-hover hover:text-foreground">
                  <Filter className="size-4" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {feedSections.map((section) => (
                  <FeedCard key={section.title} section={section} />
                ))}
              </div>
            </section>
          </div>
        </main>

        <aside className="space-y-6 bg-background px-5 py-9">
          <Card className="gap-0 overflow-hidden rounded-lg border-border bg-card py-0 shadow-none">
            <div className="relative h-[72px] w-full overflow-hidden border-b border-border bg-[linear-gradient(135deg,#8be28b_0%,#e8fff0_36%,#5de88a_68%,#1cbd61_100%)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.9),transparent_18%),radial-gradient(circle_at_55%_20%,rgba(255,255,255,0.85),transparent_16%),radial-gradient(circle_at_85%_40%,rgba(104,78,255,0.55),transparent_14%)]" />
            </div>
            <CardContent className="space-y-4 px-4 py-4">
              <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">September 10 · 8:00 AM PT</div>
              <div className="space-y-3">
                <h3 className="text-[30px] font-semibold leading-8 tracking-tight text-foreground">GitHub Copilot Day</h3>
                <ul className="space-y-1 text-sm leading-5 text-text-secondary">
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-success" /><span>See how HydraFusion combines AI models to match the right model to the task</span></li>
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-success" /><span>Learn to automate work, run parallel agents, and use your own models</span></li>
                  <li className="flex gap-2"><span className="mt-1 size-1.5 rounded-full bg-success" /><span>Turn your best coding approaches into reusable Agent Skills</span></li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="px-4 pb-4 pt-0">
              <Button className="h-8 w-full rounded-md bg-foreground text-background hover:bg-white/90">Set your reminder</Button>
            </CardFooter>
          </Card>

          <Card className="rounded-xl border-border bg-card py-0 shadow-none">
            <CardHeader className="px-4 py-4">
              <CardTitle className="text-xl font-semibold text-foreground">Latest from our changelog</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="relative space-y-4 pl-6 before:absolute before:left-[5px] before:top-1 before:h-[calc(100%-20px)] before:w-px before:bg-border">
                {changelogItems.map((item) => (
                  <div key={item.title} className="relative">
                    <span className="absolute -left-6 top-1.5 size-2 rounded-full bg-border" />
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                      <button type="button" className="text-left text-[15px] leading-6 text-text-secondary hover:text-foreground">
                        {item.title}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" className="mt-4 text-sm text-primary hover:underline">View changelog →</button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}

function MessageBubble() {
  return <ListFilter className="size-4" />
}

export default function HomePage() {
  return <DashboardHomeView state="default" />
}
