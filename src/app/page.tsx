"use client"

import { useMemo, useState } from "react"
import {
  Bell,
  BookOpen,
  Building2,
  ChevronDown,
  Eye,
  GitBranch,
  Github,
  Grip,
  Menu,
  Package,
  Search,
  SlidersHorizontal,
  Star,
  Users,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

type UserProfileOverviewState = "default"

type HeaderAction = {
  id: string
  kind: "button" | "divider" | "avatar"
  icon?: React.ComponentType<{ className?: string }>
  hasDot?: boolean
}

type ProfileTab = {
  key: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  count?: number
}

type Achievement = {
  id: string
  emoji: string
  gradient: string
  countLabel?: string
}

type RepositoryCardItem = {
  name: string
  visibility: "Public"
  description?: string
  source?: string
  language: "Python" | "TypeScript"
}

type YearOption = "2026" | "2025" | "2024" | "2023"

type ContributionLevel = 0 | 1 | 2 | 3 | 4

type UserProfileOverviewProps = {
  state?: UserProfileOverviewState
}

const profileTabs: ProfileTab[] = [
  { key: "overview", label: "Overview", icon: BookOpen },
  { key: "repositories", label: "Repositories", icon: GitBranch, count: 16 },
  { key: "projects", label: "Projects", icon: Grip },
  { key: "packages", label: "Packages", icon: Package },
  { key: "stars", label: "Stars", icon: Star },
]

const headerActions: HeaderAction[] = [
  { id: "bell", kind: "button", icon: Bell },
  { id: "split-a", kind: "divider" },
  { id: "grid", kind: "button", icon: Grip },
  { id: "plus", kind: "button", icon: SlidersHorizontal },
  { id: "split-b", kind: "divider" },
  { id: "issues", kind: "button", icon: Eye },
  { id: "pulls", kind: "button", icon: GitBranch },
  { id: "projects", kind: "button", icon: BookOpen },
  { id: "profile", kind: "avatar", hasDot: true },
]

const achievements: Achievement[] = [
  { id: "pair", emoji: "🧬", gradient: "from-pink-300 via-orange-200 to-purple-300" },
  { id: "yolo", emoji: "🤠", gradient: "from-yellow-300 via-orange-300 to-yellow-500" },
  { id: "pull", emoji: "🥶", gradient: "from-sky-300 via-blue-300 to-indigo-400", countLabel: "x2" },
  { id: "arctic", emoji: "🫛", gradient: "from-lime-200 via-green-200 to-lime-400" },
]

const repositories: RepositoryCardItem[] = [
  {
    name: "open-interpreter",
    visibility: "Public",
    source: "Forked from openinterpreter/openinterpreter",
    description: "A natural language interface for computers",
    language: "Python",
  },
  { name: "CountBoxingSofttek", visibility: "Public", language: "Python" },
  { name: "count_colors", visibility: "Public", language: "Python" },
  { name: "pushtest", visibility: "Public", language: "Python" },
  { name: "SAP-Cleaning-Frontend", visibility: "Public", language: "TypeScript" },
  { name: "FridaProductPlannerWebBackend", visibility: "Public", language: "Python" },
]

const monthLabels = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]
const contributionLegend: { level: ContributionLevel; label: string }[] = [
  { level: 0, label: "Less" },
  { level: 1, label: "" },
  { level: 2, label: "" },
  { level: 3, label: "" },
  { level: 4, label: "More" },
]

const contributionData: ContributionLevel[][] = [
  [0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1,2,0,0,1,0,2,0,0,1,2,0,0,0,0,1,2,0,0,0,0,0,0,0,2,1,3],
  [0,0,0,1,2,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,2,3,0,1,0,1,1,2,0,0,1,2,0,0,0,1,2,0,0,1,0,0,0,0,1,3,4],
  [0,0,0,0,1,0,0,0,1,0,2,0,0,1,0,0,0,0,1,0,0,2,1,0,1,0,0,2,1,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,0,2,3,2],
  [1,0,1,0,0,0,0,1,0,1,0,0,1,0,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,0,1,0,0,0,1,1,0,0,0,1,0,0,1,0,1,0,4,1],
  [2,1,1,0,0,0,1,0,0,2,0,1,0,0,0,2,0,0,0,2,0,0,1,0,0,2,0,0,1,0,0,2,0,0,0,2,0,0,0,1,0,0,2,0,0,0,3,0],
  [1,2,0,1,0,0,1,0,0,1,0,2,0,0,1,1,0,0,2,1,0,1,0,0,1,0,0,2,0,0,0,1,2,0,0,1,0,0,0,2,0,1,1,0,0,0,4,3],
  [0,1,0,1,0,0,0,1,0,1,0,0,0,1,0,1,2,0,1,0,0,1,0,1,0,0,0,1,2,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,2,4],
]

const languageDotClass: Record<RepositoryCardItem["language"], string> = {
  Python: "bg-python",
  TypeScript: "bg-typescript",
}

const contributionCellClass: Record<ContributionLevel, string> = {
  0: "bg-card",
  1: "bg-[var(--contribution-low)]",
  2: "bg-[var(--contribution-medium)]",
  3: "bg-[var(--contribution-high)]",
  4: "bg-[var(--contribution-highest)]",
}

function HeaderButton({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="h-8 w-8 rounded-md border border-border bg-transparent text-muted-foreground hover:bg-surface-hover hover:text-foreground"
        >
          <Icon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-border bg-card text-foreground">
        <DropdownMenuItem>Action</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ProfileNav({ activeTab, onTabChange }: { activeTab: string; onTabChange: (value: string) => void }) {
  return (
    <nav className="border-b border-border bg-background-deep px-6">
      <div className="mx-auto flex h-12 max-w-[1280px] items-end gap-1">
        {profileTabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={cn(
                "relative flex h-full items-center gap-2 rounded-t-md px-4 text-sm text-text-secondary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                isActive && "text-foreground"
              )}
            >
              <Icon className={cn("size-4", isActive ? "text-foreground" : "text-muted-foreground")} />
              <span>{tab.label}</span>
              {tab.count ? (
                <span className="rounded-full border border-border bg-surface-elevated px-1.5 text-xs text-text-secondary">
                  {tab.count}
                </span>
              ) : null}
              {isActive ? <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#f78166]" /> : null}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

function RepositoryCard({ repository }: { repository: RepositoryCardItem }) {
  return (
    <Card className="gap-4 rounded-md border-border bg-card p-4 shadow-none">
      <div className="flex items-start justify-between gap-3">
        <button type="button" className="text-left text-base font-semibold text-primary hover:text-[var(--primary-hover)] hover:underline">
          {repository.name}
        </button>
        <Badge variant="outline" className="rounded-full border-border bg-transparent px-2 py-0 text-xs font-medium text-muted-foreground">
          {repository.visibility}
        </Badge>
      </div>
      <div className="min-h-[52px] space-y-2 text-sm leading-5 text-muted-foreground">
        {repository.source ? <p>{repository.source}</p> : null}
        {repository.description ? <p>{repository.description}</p> : null}
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className={cn("size-3 rounded-full", languageDotClass[repository.language])} />
        <span>{repository.language}</span>
      </div>
    </Card>
  )
}

function AchievementBadge({ item }: { item: Achievement }) {
  return (
    <div className="relative">
      <div className={cn("flex size-13 items-center justify-center rounded-full border border-white/60 bg-gradient-to-br text-2xl shadow-sm", item.gradient)}>
        <span aria-hidden="true">{item.emoji}</span>
      </div>
      {item.countLabel ? (
        <span className="absolute -bottom-1.5 right-0 rounded-full border border-background bg-[#c9a26b] px-1.5 py-0.5 text-[10px] font-semibold text-background-deep">
          {item.countLabel}
        </span>
      ) : null}
    </div>
  )
}

function ContributionGraph({ selectedYear, onYearChange }: { selectedYear: YearOption; onYearChange: (year: YearOption) => void }) {
  const [settings, setSettings] = useState("private")

  return (
    <div className="flex items-start gap-6">
      <div className="min-w-0 flex-1">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[28px] font-semibold text-foreground">471 contributions in the last year</h2>
          <Select value={settings} onValueChange={setSettings}>
            <SelectTrigger size="sm" className="h-8 border-0 bg-transparent px-0 text-sm text-muted-foreground shadow-none hover:text-foreground focus-visible:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-border bg-card text-foreground">
              <SelectItem value="private">Contribution settings</SelectItem>
              <SelectItem value="public">Public contributions only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border border-border bg-card p-4">
          <div className="grid grid-cols-[28px_minmax(0,1fr)] gap-3">
            <div />
            <div className="grid grid-cols-12 text-xs text-muted-foreground">
              {monthLabels.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
            <div className="grid grid-rows-7 gap-[3px] pt-[2px] text-xs text-muted-foreground">
              <span className="leading-2">Mon</span>
              <span />
              <span className="leading-2">Wed</span>
              <span />
              <span className="leading-2">Fri</span>
            </div>
            <div className="grid grid-cols-48 gap-[3px]">
              {contributionData[0].map((_, columnIndex) => (
                <div key={`col-${columnIndex}`} className="grid grid-rows-7 gap-[3px]">
                  {contributionData.map((row, rowIndex) => (
                    <span
                      key={`cell-${rowIndex}-${columnIndex}`}
                      className={cn("block size-[10px] rounded-[2px] border border-black/0", contributionCellClass[row[columnIndex]])}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-4 text-xs text-muted-foreground">
            <button type="button" className="hover:text-text-secondary">
              Learn how we count contributions
            </button>
            <div className="flex items-center gap-1.5">
              {contributionLegend.map((item, index) => (
                <div key={`${item.label}-${index.toString()}`} className="flex items-center gap-1.5">
                  {item.label === "Less" ? <span>{item.label}</span> : null}
                  <span className={cn("block size-[10px] rounded-[2px]", contributionCellClass[item.level])} />
                  {item.label === "More" ? <span>{item.label}</span> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[92px] flex-col gap-3 pt-11">
        {(["2026", "2025", "2024", "2023"] as YearOption[]).map((year) => {
          const isSelected = year === selectedYear
          return (
            <button
              key={year}
              type="button"
              onClick={() => onYearChange(year)}
              className={cn(
                "h-8 rounded-md px-3 text-left text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                isSelected && "bg-[#1f6feb] text-white hover:text-white"
              )}
            >
              {year}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function UserProfileOverviewView({ state = "default" }: UserProfileOverviewProps) {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedYear, setSelectedYear] = useState<YearOption>("2026")

  const visibleRepositories = useMemo(() => repositories, [])

  return (
    <div data-state={state} className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background-deep px-4">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" className="h-10 w-10 rounded-lg border border-border bg-transparent text-muted-foreground hover:bg-surface-hover hover:text-foreground">
              <Menu className="size-5" />
            </Button>
            <Github className="size-8 text-foreground" />
            <span className="text-sm font-semibold text-foreground">OnderCampos</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-[260px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Type / to search"
                className="h-8 rounded-md border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center gap-2">
              {headerActions.map((action) => {
                if (action.kind === "divider") {
                  return <Separator key={action.id} orientation="vertical" className="h-5 bg-border" />
                }

                if (action.kind === "avatar") {
                  return (
                    <button key={action.id} type="button" className="relative rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60">
                      {action.hasDot ? <span className="absolute -right-0.5 top-0 size-2 rounded-full bg-primary" /> : null}
                      <Avatar className="size-8 border border-border">
                        <AvatarImage src="/Frida.png" alt="OnderCampos" />
                        <AvatarFallback>OC</AvatarFallback>
                      </Avatar>
                    </button>
                  )
                }

                const Icon = action.icon!
                return <HeaderButton key={action.id} icon={Icon} />
              })}
            </div>
          </div>
        </div>
      </header>

      <ProfileNav activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto max-w-[1280px] px-6 py-8">
        <div className="grid grid-cols-[296px_minmax(0,1fr)] gap-8">
          <aside>
            <div className="relative mx-auto w-fit">
              <Avatar className="size-[264px] border border-border">
                <AvatarImage src="/Frida.png" alt="Onder Francisco Campos Garcia" className="object-cover" />
                <AvatarFallback>OC</AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon-sm"
                className="absolute bottom-8 right-2 h-8 w-8 rounded-full border border-border bg-surface-elevated text-muted-foreground shadow-none hover:bg-surface-hover hover:text-foreground"
              >
                <Eye className="size-4" />
              </Button>
            </div>

            <div className="mt-5 space-y-3">
              <div>
                <h1 className="text-[37px] leading-10 font-semibold tracking-[-0.02em] text-text-secondary">
                  Onder Francisco Campos Garcia
                </h1>
                <p className="mt-1 text-[22px] font-light text-muted-foreground">OnderCampos</p>
              </div>

              <Button variant="outline" className="h-8 w-full rounded-md border-border bg-secondary text-sm font-medium text-foreground shadow-none hover:bg-surface-hover">
                Edit profile
              </Button>

              <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                <Users className="size-4" />
                <button type="button" className="font-medium text-text-secondary hover:text-foreground">2 followers</button>
                <span>·</span>
                <button type="button" className="font-medium text-text-secondary hover:text-foreground">1 following</button>
              </div>

              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <Building2 className="size-4 text-muted-foreground" />
                <button type="button" className="hover:text-foreground">Softtek</button>
              </div>
            </div>

            <Separator className="my-5 bg-[var(--border-muted)]" />

            <section>
              <h2 className="mb-3 text-base font-semibold text-foreground">Achievements</h2>
              <div className="flex items-center gap-2">
                {achievements.map((item) => (
                  <AchievementBadge key={item.id} item={item} />
                ))}
              </div>
            </section>

            <Separator className="my-5 bg-[var(--border-muted)]" />

            <section>
              <h2 className="text-base font-semibold text-foreground">Organizations</h2>
            </section>
          </aside>

          <section className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-foreground">Popular repositories</h2>
              <button type="button" className="text-sm text-primary hover:text-[var(--primary-hover)] hover:underline">
                Customize your pins
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {visibleRepositories.map((repository) => (
                <RepositoryCard key={repository.name} repository={repository} />
              ))}
            </div>

            <div className="mt-8">
              <ContributionGraph selectedYear={selectedYear} onYearChange={setSelectedYear} />
            </div>

            <section className="mt-8">
              <h2 className="text-[28px] font-semibold text-foreground">Contribution activity</h2>
              <div className="mt-4 flex items-center gap-4">
                <span className="text-sm font-semibold text-text-secondary">September 2026</span>
                <Separator className="bg-[var(--border-muted)]" />
              </div>
            </section>
          </section>
        </div>
      </main>
    </div>
  )
}

export default function HomePage() {
  return <UserProfileOverviewView state="default" />
}
