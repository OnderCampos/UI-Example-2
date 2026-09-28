"use client"

import Image from "next/image"
import { useState } from "react"
import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  FolderKanban,
  Github,
  Menu,
  Monitor,
  Package,
  Search,
  SmilePlus,
  Star,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type ProfileTab = "overview" | "repositories" | "projects" | "packages" | "stars"

type RepositoryCard = {
  name: string
  description?: string
  language: string
  languageColor: string
  visibility: string
  forkedFrom?: string
}

type ContributionMonth = {
  label: string
  values: number[]
}

type ActivityYear = "2026" | "2025" | "2024" | "2023"

export type GithubProfileOverviewProps = {
  state?: "default"
  activeTab?: ProfileTab
  selectedYear?: ActivityYear
  searchValue?: string
  onSearchValueChange?: (value: string) => void
}

const navItems: { key: ProfileTab; label: string; count?: string; icon: typeof BookOpen }[] = [
  { key: "overview", label: "Overview", icon: BookOpen },
  { key: "repositories", label: "Repositories", count: "16", icon: BookOpen },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "packages", label: "Packages", icon: Package },
  { key: "stars", label: "Stars", icon: Star },
]

const repositories: RepositoryCard[] = [
  {
    name: "open-interpreter",
    forkedFrom: "openinterpreter/openinterpreter",
    description: "A natural language interface for computers",
    language: "Python",
    languageColor: "bg-[var(--gh-blue)]",
    visibility: "Public",
  },
  {
    name: "CountBoxingSofttek",
    language: "Python",
    languageColor: "bg-[var(--gh-blue)]",
    visibility: "Public",
  },
  {
    name: "count_colors",
    language: "Python",
    languageColor: "bg-[var(--gh-blue)]",
    visibility: "Public",
  },
  {
    name: "pushtest",
    language: "Python",
    languageColor: "bg-[var(--gh-blue)]",
    visibility: "Public",
  },
  {
    name: "SAP-Cleaning-Frontend",
    language: "TypeScript",
    languageColor: "bg-[var(--gh-blue)]",
    visibility: "Public",
  },
  {
    name: "FridaProductPlannerWebBackend",
    language: "Python",
    languageColor: "bg-[var(--gh-blue)]",
    visibility: "Public",
  },
]

const months: ContributionMonth[] = [
  { label: "Sep", values: [0, 1, 0, 0] },
  { label: "Oct", values: [0, 2, 0, 1] },
  { label: "Nov", values: [0, 1, 2, 0] },
  { label: "Dec", values: [0, 0, 1, 0] },
  { label: "Jan", values: [0, 1, 0, 0] },
  { label: "Feb", values: [0, 0, 3, 1] },
  { label: "Mar", values: [2, 1, 0, 2] },
  { label: "Apr", values: [1, 3, 0, 1] },
  { label: "May", values: [0, 2, 0, 0] },
  { label: "Jun", values: [1, 0, 0, 0] },
  { label: "Jul", values: [0, 1, 0, 0] },
  { label: "Aug", values: [2, 4, 3, 2] },
]

const contributionGrid = Array.from({ length: 53 }, (_, week) =>
  Array.from({ length: 7 }, (_, day) => {
    const wave = Math.sin((week + day) / 4)
    if (week > 48) return ((week + day) % 5) as 0 | 1 | 2 | 3 | 4
    if (week < 5 && day % 3 === 0) return 1 as const
    if (wave > 0.78) return 4 as const
    if (wave > 0.38) return 3 as const
    if (wave > 0.05) return 2 as const
    if (wave > -0.3 && week % 2 === 0) return 1 as const
    return 0 as const
  })
)

const intensityClasses = [
  "bg-[var(--gh-heat-0)]",
  "bg-[var(--gh-heat-1)]",
  "bg-[var(--gh-heat-2)]",
  "bg-[var(--gh-heat-3)]",
  "bg-[var(--gh-heat-4)]",
]

function TopHeader({ searchValue, onSearchValueChange }: { searchValue: string; onSearchValueChange: (value: string) => void }) {
  return (
    <header className="border-b border-border bg-[linear-gradient(90deg,var(--background),#0f1824_46%,#111a24)] px-4 py-3">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm text-foreground">
          <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-transparent transition-colors hover:bg-accent" type="button" aria-label="Open navigation menu">
            <Menu className="size-4" />
          </button>
          <Github className="size-8" />
          <span className="text-[18px] font-semibold">OnderCampos</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden w-[330px] md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchValue}
              onChange={(event) => onSearchValueChange(event.target.value)}
              placeholder="Type / to search"
              className="h-8 rounded-md border-border bg-transparent pl-9 pr-10 text-sm"
              aria-label="Search profile"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border px-1.5 text-[11px] leading-5 text-muted-foreground">
              /
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            {[BookOpen, Star, PlusIcon, Monitor, SmilePlus].map((Icon, index) => (
              <button key={index} type="button" className="flex h-8 w-8 items-center justify-center rounded-md border border-border transition-colors hover:bg-accent" aria-label="Header action">
                <Icon className="size-4" />
              </button>
            ))}
            <Avatar className="size-8 border border-border">
              <AvatarImage src="/Frida.png" alt="User avatar" />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}

function PlusIcon(props: React.ComponentProps<typeof Star>) {
  return (
    <div className={cn("relative size-4", props.className)}>
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-current" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rounded-full bg-current" />
    </div>
  )
}

function ProfileTabs({ activeTab, onTabChange }: { activeTab: ProfileTab; onTabChange: (tab: ProfileTab) => void }) {
  return (
    <nav className="border-b border-border px-4">
      <div className="mx-auto flex max-w-[1500px] items-center gap-6 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.key === activeTab
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onTabChange(item.key)}
              className={cn(
                "flex items-center gap-2 border-b-2 px-1 py-4 text-sm text-muted-foreground transition-colors hover:text-foreground",
                isActive ? "border-[var(--gh-orange)] text-foreground" : "border-transparent"
              )}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
              {item.count ? <span className="rounded-full bg-accent px-1.5 py-0.5 text-[11px] leading-none text-foreground">{item.count}</span> : null}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

function RepoCard({ repo }: { repo: RepositoryCard }) {
  return (
    <Card className="gap-0 rounded-lg border-border bg-card px-4 py-4 shadow-none">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-[20px] font-semibold leading-6 text-[var(--gh-link)]">{repo.name}</h3>
          {repo.forkedFrom ? (
            <p className="text-xs text-muted-foreground">
              Forked from <span className="border-b border-muted-foreground/40">{repo.forkedFrom}</span>
            </p>
          ) : null}
        </div>
        <Badge variant="outline" className="rounded-full border-border px-2 py-0.5 text-xs text-muted-foreground">{repo.visibility}</Badge>
      </div>
      {repo.description ? <p className="mt-5 text-sm text-foreground/90">{repo.description}</p> : <div className="mt-5 h-[21px]" />}
      <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
        <span className={cn("h-3 w-3 rounded-full", repo.languageColor)} />
        <span>{repo.language}</span>
      </div>
    </Card>
  )
}

function ContributionHeatmap({ selectedYear, onYearChange }: { selectedYear: ActivityYear; onYearChange: (year: ActivityYear) => void }) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-[32px] font-medium tracking-[-0.02em] text-foreground">471 contributions in the last year</h2>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <NativeSelect
            aria-label="Contribution settings"
            className="h-8 min-w-[168px] border-0 bg-transparent pr-8 shadow-none focus-visible:ring-0"
            value="Contribution settings"
            onChange={() => undefined}
          >
            <NativeSelectOption value="Contribution settings">Contribution settings</NativeSelectOption>
          </NativeSelect>
        </div>
      </div>
      <div className="flex gap-6 xl:gap-8">
        <div className="min-w-0 flex-1 rounded-lg border border-border bg-card px-5 py-6">
          <div className="mb-4 ml-12 flex text-xs text-muted-foreground">
            {months.map((month, index) => (
              <div key={month.label} className="text-center" style={{ width: `${month.values.length * 13}px`, marginLeft: index === 0 ? 0 : 4 }}>
                {month.label}
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <div className="grid grid-rows-7 gap-[3px] pt-[14px] text-xs text-muted-foreground">
              <span className="h-[10px]">Mon</span>
              <span className="h-[10px] opacity-0">Tue</span>
              <span className="h-[10px]">Wed</span>
              <span className="h-[10px] opacity-0">Thu</span>
              <span className="h-[10px]">Fri</span>
              <span className="h-[10px] opacity-0">Sat</span>
              <span className="h-[10px] opacity-0">Sun</span>
            </div>
            <div className="grid min-w-0 grid-flow-col gap-[3px] overflow-hidden">
              {contributionGrid.map((week, weekIndex) => (
                <div key={`week-${weekIndex}`} className="grid grid-rows-7 gap-[3px]">
                  {week.map((value, dayIndex) => (
                    <div key={`day-${weekIndex}-${dayIndex}`} className={cn("h-[10px] w-[10px] rounded-[2px] border border-black/10", intensityClasses[value])} />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <button type="button" className="hover:text-foreground">Learn how we count contributions</button>
            <div className="flex items-center gap-2">
              <span>Less</span>
              <div className="flex items-center gap-[3px]">
                {intensityClasses.map((className, index) => (
                  <div key={index} className={cn("h-[10px] w-[10px] rounded-[2px] border border-black/10", className)} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
        <div className="flex w-[108px] flex-col gap-2 pt-1">
          {(["2026", "2025", "2024", "2023"] as ActivityYear[]).map((year) => (
            <button
              key={year}
              type="button"
              onClick={() => onYearChange(year)}
              className={cn(
                "rounded-md px-4 py-3 text-left text-sm transition-colors",
                year === selectedYear ? "bg-[var(--gh-selection)] text-white" : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export function GithubProfileOverview({
  state = "default",
  activeTab: activeTabProp = "overview",
  selectedYear: selectedYearProp = "2026",
  searchValue: searchValueProp,
  onSearchValueChange,
}: GithubProfileOverviewProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>(activeTabProp)
  const [selectedYear, setSelectedYear] = useState<ActivityYear>(selectedYearProp)
  const [internalSearch, setInternalSearch] = useState(searchValueProp ?? "")

  const searchValue = searchValueProp ?? internalSearch

  const handleSearchChange = (value: string) => {
    if (searchValueProp === undefined) setInternalSearch(value)
    onSearchValueChange?.(value)
  }

  return (
    <div data-state={state} className="min-h-screen bg-background text-foreground [color-scheme:dark]">
      <TopHeader searchValue={searchValue} onSearchValueChange={handleSearchChange} />
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto grid max-w-[1120px] gap-8 px-6 py-8 lg:grid-cols-[296px_minmax(0,1fr)] lg:px-8">
        <aside className="space-y-5">
          <div className="relative w-fit">
            <Image src="/Frida.png" alt="Onder Francisco Campos Garcia" width={264} height={264} className="h-[264px] w-[264px] rounded-full border border-border object-cover" />
            <button type="button" className="absolute bottom-7 right-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-[var(--shadow-elevated)] hover:text-foreground" aria-label="Change status">
              <SmilePlus className="size-4" />
            </button>
          </div>

          <div>
            <h1 className="font-[family-name:var(--font-github-sans)] text-[42px] leading-[1.05] font-semibold tracking-[-0.03em]">Onder Francisco Campos Garcia</h1>
            <p className="mt-2 text-[28px] font-light leading-none text-muted-foreground">OnderCampos</p>
          </div>

          <Button variant="outline" className="h-8 w-full rounded-md border-border bg-secondary text-sm font-medium text-foreground shadow-none hover:bg-accent">
            Edit profile
          </Button>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="size-4" />
            <span><strong className="font-semibold text-foreground">2</strong> followers · <strong className="font-semibold text-foreground">1</strong> following</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-foreground">
            <Building2 className="size-4 text-muted-foreground" />
            <span>Softtek</span>
          </div>

          <Separator className="bg-border/70" />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Achievements</h2>
            <div className="flex items-center gap-1">
              {[
                { emoji: "🦄", bg: "from-pink-300 to-orange-200" },
                { emoji: "🤠", bg: "from-yellow-300 to-orange-400" },
                { emoji: "🐳", bg: "from-sky-300 to-blue-500", label: "x2" },
                { emoji: "🫛", bg: "from-lime-300 to-green-500" },
              ].map((item, index) => (
                <div key={index} className={cn("relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/70 bg-gradient-to-br text-2xl shadow-sm", item.bg)}>
                  <span>{item.emoji}</span>
                  {item.label ? <span className="absolute -bottom-1 -right-1 rounded-full bg-[#d2a8ff] px-1.5 text-[10px] font-semibold text-black">{item.label}</span> : null}
                </div>
              ))}
            </div>
          </section>

          <Separator className="bg-border/70" />

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold">Organizations</h2>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <div className="flex h-6 w-6 items-center justify-center rounded-md border border-border bg-card">
                <BriefcaseBusiness className="size-3.5" />
              </div>
              <span>Softtek</span>
            </div>
          </section>
        </aside>

        <section className="space-y-10">
          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-[30px] font-medium tracking-[-0.01em]">Popular repositories</h2>
              <button type="button" className="text-sm text-[var(--gh-link)] hover:underline">Customize your pins</button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {repositories.map((repo) => (
                <RepoCard key={repo.name} repo={repo} />
              ))}
            </div>
          </div>

          <ContributionHeatmap selectedYear={selectedYear} onYearChange={setSelectedYear} />

          <section className="space-y-4">
            <h2 className="text-[30px] font-medium tracking-[-0.01em]">Contribution activity</h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">September 2026</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </section>
        </section>
      </main>
    </div>
  )
}
