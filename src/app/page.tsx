"use client"

import { useMemo, useState } from "react"
import {
  Bell,
  ChevronDown,
  CircleDot,
  GitBranch,
  Github,
  Globe,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Sparkles,
  Square,
  Star,
  TrendingUp,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { NativeSelect } from "@/components/ui/native-select"
import { cn } from "@/lib/utils"

type DashboardHomeState = "default"

type RepoItem = {
  id: string
  owner: string
  name: string
  description: string
  language: string
  languageColor: string
  stars: string
  icon?: "spotify" | "default"
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

type DashboardHomeProps = {
  state?: DashboardHomeState
  initialSearch?: string
}

const sidebarRepos: SidebarRepo[] = [
  { id: "1", name: "OnderCampos/CountBoxingSofttek", accent: "#8b949e" },
  { id: "2", name: "Fridaplatform/cp-cloudagents", accent: "#f778ba" },
  { id: "3", name: "OnderCampos/UI-Agent-Example", accent: "#8b949e" },
  { id: "4", name: "Fridaplatform/ReqGen-Backend", accent: "#f778ba" },
  { id: "5", name: "Fridaplatform/ProductPlanner", accent: "#f778ba" },
  { id: "6", name: "OnderCampos/FridaProductPlannerWebBackend", accent: "#8b949e" },
]

const trendingRepos: RepoItem[] = [
  {
    id: "1",
    owner: "ayghri",
    name: "i-have-adhd",
    description:
      "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
    language: "Python",
    languageColor: "#4493f8",
    stars: "33.6k",
  },
  {
    id: "2",
    owner: "spotify",
    name: "portal-ai-plugins",
    description: "",
    language: "TypeScript",
    languageColor: "#4493f8",
    stars: "716",
    icon: "spotify",
  },
]

const recommendedRepos: RepoItem[] = [
  {
    id: "3",
    owner: "jasonkylelol",
    name: "graphrag-chinese",
    description: "支持中文CNCCN 的 microsoft/graphrag",
    language: "Python",
    languageColor: "#4493f8",
    stars: "51",
  },
]

const changelogItems: ChangelogItem[] = [
  {
    id: "1",
    time: "3 hours ago",
    title: "Remediate Code Quality findings with agentic autofix",
  },
  {
    id: "2",
    time: "13 hours ago",
    title: "Enterprise-managed sandbox in Copilot for JetBrains",
  },
  {
    id: "3",
    time: "18 hours ago",
    title: "GitHub Enterprise Server 3.22 is now generally available",
  },
  {
    id: "4",
    time: "Yesterday",
    title: "New customer portal help.github.com",
  },
]

const quickActions = ["Debug", "Agent", "Create issue", "Write code", "Git", "Pull requests"]

const topNavIcons = [Square, Plus, CircleDot, GitBranch, Bell]

const feedSections = [
  {
    id: "trending",
    title: "Trending repositories",
    hint: "See more",
    items: trendingRepos,
  },
  {
    id: "recommended",
    title: "Recommended for you",
    hint: "",
    items: recommendedRepos,
  },
]

function DashboardHome({
  state = "default",
  initialSearch = "",
}: DashboardHomeProps) {
  const [sidebarSearch, setSidebarSearch] = useState(initialSearch)
  const [globalSearch, setGlobalSearch] = useState("Type / to search")
  const [assistantPrompt, setAssistantPrompt] = useState(
    "Ask anything or type @ to add context"
  )
  const [scope, setScope] = useState("All repositories")
  const [answerMode, setAnswerMode] = useState("Auto")
  const [starredRepos, setStarredRepos] = useState<Record<string, boolean>>({})

  const filteredSidebarRepos = useMemo(
    () =>
      sidebarRepos.filter((repo) =>
        repo.name.toLowerCase().includes(sidebarSearch.toLowerCase())
      ),
    [sidebarSearch]
  )

  const toggleStar = (repoId: string) => {
    setStarredRepos((current) => ({ ...current, [repoId]: !current[repoId] }))
  }

  return (
    <div data-state={state} className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-transparent">
              <Menu className="size-4" />
            </Button>
            <Github className="size-8 text-foreground" />
            <span className="text-sm font-semibold">Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden w-[340px] lg:block">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                value={globalSearch}
                onChange={(event) => setGlobalSearch(event.target.value)}
                className="h-9 rounded-md border-border bg-background pl-9 pr-3 text-sm shadow-none"
              />
            </div>

            <div className="flex items-center gap-2 border-l border-border pl-3">
              {topNavIcons.map((Icon, index) => (
                <Button
                  key={`nav-${index + 1}`}
                  variant="outline"
                  size="icon-sm"
                  className="h-8 w-8 rounded-md border-border bg-transparent"
                >
                  <Icon className="size-4" />
                </Button>
              ))}
              <Avatar className="size-8 border border-border">
                <AvatarImage src="/Frida.png" alt="OnderCampos" />
                <AvatarFallback>OC</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid min-h-[calc(100vh-56px)] max-w-[1568px] grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_316px]">
        <aside className="border-r border-border bg-[var(--color-sidebar)] px-5 py-8">
          <button type="button" className="flex items-center gap-2 text-left text-sm font-semibold">
            <Avatar className="size-6 border border-border">
              <AvatarImage src="/Frida.png" alt="OnderCampos" />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
            <span>OnderCampos</span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </button>

          <div className="mt-10 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Top repositories</h2>
            <Button className="h-8 rounded-md px-3 text-sm font-semibold text-[var(--color-primary-foreground)]">
              <Plus className="size-4" />
              New
            </Button>
          </div>

          <Input
            value={sidebarSearch}
            onChange={(event) => setSidebarSearch(event.target.value)}
            placeholder="Find a repository..."
            className="mt-3 h-8 rounded-md border-border bg-background text-sm shadow-none"
          />

          <nav className="mt-4 space-y-1">
            {filteredSidebarRepos.map((repo) => (
              <button
                key={repo.id}
                type="button"
                className="flex w-full items-start gap-2 rounded-md px-1 py-1.5 text-left text-[15px] text-foreground/90 hover:bg-accent/30"
              >
                <span
                  className="mt-1 inline-block h-3 w-3 rounded-sm"
                  style={{ backgroundColor: repo.accent }}
                />
                <span className="line-clamp-2">{repo.name}</span>
              </button>
            ))}
          </nav>

          <Button variant="ghost" className="mt-2 h-auto px-1 text-sm text-muted-foreground hover:bg-transparent hover:text-foreground">
            Show more
          </Button>
        </aside>

        <main className="px-6 py-8 xl:px-14">
          <div className="mx-auto max-w-[805px]">
            <h1 className="text-[38px] leading-none font-semibold tracking-[-0.02em]">Home</h1>

            <Card className="mt-6 gap-0 rounded-2xl border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <div className="p-4 pb-3">
                <Input
                  value={assistantPrompt}
                  onChange={(event) => setAssistantPrompt(event.target.value)}
                  className="h-12 border-0 bg-transparent px-0 text-[17px] text-muted-foreground shadow-none focus-visible:ring-0"
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <GhostPill icon={<MessageSquare className="size-4" />} label="Ask" />
                    <NativeSelect
                      aria-label="Repository scope"
                      value={scope}
                      onChange={(event) => setScope(event.target.value)}
                      className="h-8 min-w-[146px] rounded-md border-border bg-background px-3 pr-9 text-sm"
                    >
                      <option>All repositories</option>
                      <option>My repositories</option>
                      <option>Starred</option>
                    </NativeSelect>
                    <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-transparent">
                      <Plus className="size-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <NativeSelect
                      aria-label="Assistant mode"
                      value={answerMode}
                      onChange={(event) => setAnswerMode(event.target.value)}
                      className="h-8 rounded-md border-border bg-background px-3 pr-9 text-sm"
                    >
                      <option>Auto</option>
                      <option>Precise</option>
                      <option>Creative</option>
                    </NativeSelect>
                    <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-md">
                      <Sparkles className="size-4" />
                    </Button>
                    <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-transparent">
                      <ChevronDown className="size-4 -rotate-90" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="mt-4 flex flex-wrap gap-3">
              {quickActions.map((action) => (
                <Button
                  key={action}
                  variant="outline"
                  className="h-10 rounded-full border-border bg-background px-4 text-sm font-medium"
                >
                  {action}
                </Button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Feed</h2>
              <Button variant="secondary" className="h-8 rounded-md px-3 text-sm font-semibold">
                Filter
              </Button>
            </div>

            <div className="mt-3 space-y-4">
              {feedSections.map((section) => (
                <FeedCard
                  key={section.id}
                  title={section.title}
                  hint={section.hint}
                  items={section.items}
                  starredRepos={starredRepos}
                  onToggleStar={toggleStar}
                />
              ))}
            </div>
          </div>
        </main>

        <aside className="px-6 py-9">
          <div className="space-y-6">
            <Card className="overflow-hidden rounded-xl border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <div className="h-[72px] bg-[linear-gradient(135deg,#84f59f_0%,#9ee7b1_25%,#d6ffdf_25%,#84f59f_50%,#edfdf1_50%,#b6f1c5_75%,#7f7bf6_90%,#31c653_100%)]" />
              <div className="border-t border-border px-4 py-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                September 10 · 8:00 AM PT
              </div>
              <div className="px-4 pb-4">
                <h3 className="text-[28px] leading-8 font-semibold">GitHub Copilot Day</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {[
                    "See how HydraFusion combines AI models to match the right model to the task",
                    "Learn to automate work, run parallel agents, and use your own models",
                    "Turn your best coding approaches into reusable Agent Skills",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-4 h-9 w-full rounded-md text-sm font-semibold text-[var(--color-primary-foreground)]">
                  Set your reminder
                </Button>
              </div>
            </Card>

            <Card className="rounded-xl border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <div className="px-4 py-4">
                <h3 className="text-[22px] leading-7 font-semibold">Latest from our changelog</h3>
                <div className="mt-4 space-y-4">
                  {changelogItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="flex flex-col items-center pt-1">
                        <span className="h-2.5 w-2.5 rounded-full bg-border" />
                        {item.id !== changelogItems[changelogItems.length - 1]?.id ? (
                          <span className="mt-2 h-full w-px bg-border" />
                        ) : null}
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                        <p className="mt-1 text-sm leading-6 text-foreground">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="mt-3 h-auto px-0 text-sm text-muted-foreground">
                  View changelog →
                </Button>
              </div>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  )
}

function GhostPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex h-8 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground">
      {icon}
      <span>{label}</span>
      <ChevronDown className="size-4 text-muted-foreground" />
    </div>
  )
}

function RepoAvatar({ icon = "default" }: { icon?: RepoItem["icon"] }) {
  if (icon === "spotify") {
    return (
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1ed760] text-black">
        <Globe className="size-3" />
      </div>
    )
  }

  return (
    <Avatar className="size-5 border border-border">
      <AvatarImage src="/Frida.png" alt="Repository owner" />
      <AvatarFallback className="text-[10px]">R</AvatarFallback>
    </Avatar>
  )
}

function FeedCard({
  title,
  hint,
  items,
  starredRepos,
  onToggleStar,
}: {
  title: string
  hint?: string
  items: RepoItem[]
  starredRepos: Record<string, boolean>
  onToggleStar: (repoId: string) => void
}) {
  return (
    <Card className="gap-0 overflow-hidden rounded-xl border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
      <div className="border-b border-border px-4 py-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          {title === "Trending repositories" ? <TrendingUp className="size-4" /> : <Star className="size-4" />}
          <span>{title}</span>
          {hint ? <span className="text-primary">· {hint}</span> : null}
        </div>
      </div>

      {items.map((item, index) => {
        const isStarred = Boolean(starredRepos[item.id])

        return (
          <div
            key={item.id}
            className={cn(
              "flex items-start justify-between gap-4 px-4 py-4",
              index !== items.length - 1 && "border-b border-border"
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <RepoAvatar icon={item.icon} />
                <span className="truncate">{item.owner}/{item.name}</span>
              </div>
              {item.description ? (
                <p className="mt-2 max-w-[580px] text-sm leading-6 text-foreground">{item.description}</p>
              ) : null}
              <div className="mt-2 flex items-center gap-5 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.languageColor }}
                  />
                  {item.language}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Star className="size-3.5" />
                  {item.stars}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="h-8 rounded-md border-border bg-background px-4 text-sm"
                onClick={() => onToggleStar(item.id)}
              >
                <Star className={cn("size-4", isStarred && "fill-current text-primary")} />
                {isStarred ? "Starred" : "Star"}
              </Button>
              <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-background">
                <ChevronDown className="size-4" />
              </Button>
            </div>
          </div>
        )
      })}
    </Card>
  )
}

export default function HomePage() {
  return <DashboardHome state="default" />
}
