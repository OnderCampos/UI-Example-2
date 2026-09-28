"use client"

import { useMemo, useState } from "react"
import {
  BookOpen,
  Building2,
  FolderGit2,
  Github,
  Grid3X3,
  Menu,
  Package,
  Search,
  Users,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type UserProfileOverviewState = "default"

type ProfileTab = "overview" | "repositories" | "projects" | "packages"

type PopularRepository = {
  id: string
  name: string
  description?: string
  language: string
  languageColor: string
  isFork?: boolean
  forkSource?: string
}

type ContributionLevel = 0 | 1 | 2 | 3 | 4

type ContributionWeek = {
  month?: string
  values: ContributionLevel[]
}

type UserProfileOverviewProps = {
  state?: UserProfileOverviewState
  selectedTab?: ProfileTab
  initialSearch?: string
}

const profileTabs: Array<{
  value: ProfileTab
  label: string
  icon: React.ComponentType<{ className?: string }>
  count?: number
}> = [
  { value: "overview", label: "Overview", icon: BookOpen },
  { value: "repositories", label: "Repositories", icon: FolderGit2, count: 16 },
  { value: "projects", label: "Projects", icon: Grid3X3 },
  { value: "packages", label: "Packages", icon: Package },
]

const popularRepositories: PopularRepository[] = [
  {
    id: "open-interpreter",
    name: "open-interpreter",
    description: "A natural language interface for computers",
    language: "Python",
    languageColor: "#4493f8",
    isFork: true,
    forkSource: "openinterpreter/openinterpreter",
  },
  {
    id: "count-boxing-softtek",
    name: "CountBoxingSofttek",
    language: "Python",
    languageColor: "#4493f8",
  },
  {
    id: "count-colors",
    name: "count_colors",
    language: "Python",
    languageColor: "#4493f8",
  },
  {
    id: "pushtest",
    name: "pushtest",
    language: "Python",
    languageColor: "#4493f8",
  },
  {
    id: "sap-cleaning-frontend",
    name: "SAP-Cleaning-Frontend",
    language: "TypeScript",
    languageColor: "#2f81f7",
  },
  {
    id: "frida-product-planner-web-backend",
    name: "FridaProductPlannerWebBackend",
    language: "Python",
    languageColor: "#4493f8",
  },
]

const contributionWeeks: ContributionWeek[] = [
  { month: "Sep", values: [0, 0, 0, 0, 1, 0, 0] },
  { values: [0, 1, 2, 0, 0, 0, 1] },
  { values: [0, 0, 1, 0, 0, 0, 0] },
  { month: "Oct", values: [0, 1, 0, 0, 2, 0, 0] },
  { values: [0, 0, 0, 0, 0, 1, 0] },
  { values: [1, 0, 0, 0, 0, 0, 0] },
  { values: [0, 0, 2, 0, 1, 0, 0] },
  { month: "Nov", values: [0, 0, 0, 1, 0, 0, 0] },
  { values: [0, 1, 0, 0, 0, 2, 0] },
  { values: [0, 0, 1, 0, 0, 0, 0] },
  { values: [1, 0, 0, 0, 1, 0, 1] },
  { month: "Dec", values: [0, 0, 0, 1, 0, 0, 0] },
  { values: [0, 0, 0, 0, 0, 0, 0] },
  { values: [1, 0, 1, 0, 0, 2, 0] },
  { values: [0, 0, 0, 0, 1, 0, 0] },
  { values: [0, 0, 0, 0, 0, 0, 0] },
  { month: "Jan", values: [0, 0, 1, 1, 0, 0, 0] },
  { values: [0, 0, 0, 2, 0, 0, 1] },
  { values: [1, 0, 0, 0, 0, 0, 2] },
  { values: [0, 1, 1, 0, 0, 0, 0] },
  { month: "Feb", values: [0, 0, 2, 0, 0, 0, 0] },
  { values: [1, 0, 0, 1, 0, 0, 0] },
  { values: [2, 3, 0, 0, 0, 1, 0] },
  { values: [0, 4, 0, 2, 0, 0, 0] },
  { month: "Mar", values: [0, 0, 1, 0, 0, 0, 1] },
  { values: [2, 0, 0, 0, 0, 0, 0] },
  { values: [0, 1, 0, 2, 0, 1, 0] },
  { values: [0, 0, 1, 0, 0, 0, 0] },
  { month: "Apr", values: [2, 0, 0, 1, 0, 1, 0] },
  { values: [0, 2, 0, 0, 0, 0, 0] },
  { values: [1, 0, 0, 0, 2, 0, 0] },
  { values: [0, 0, 0, 1, 0, 0, 0] },
  { month: "May", values: [0, 0, 0, 0, 0, 0, 2] },
  { values: [0, 1, 2, 0, 0, 0, 2] },
  { values: [0, 0, 0, 0, 0, 0, 0] },
  { values: [0, 0, 0, 0, 0, 0, 0] },
  { month: "Jun", values: [2, 0, 0, 0, 0, 0, 2] },
  { values: [2, 0, 0, 0, 0, 0, 1] },
  { values: [0, 0, 0, 0, 0, 0, 0] },
  { values: [0, 0, 0, 0, 0, 0, 0] },
  { month: "Jul", values: [0, 0, 1, 0, 0, 0, 0] },
  { values: [0, 1, 0, 0, 0, 0, 0] },
  { values: [0, 0, 0, 1, 0, 0, 0] },
  { values: [0, 0, 0, 0, 0, 0, 0] },
  { month: "Aug", values: [2, 0, 0, 0, 0, 0, 0] },
  { values: [1, 0, 0, 0, 0, 0, 0] },
  { values: [0, 0, 0, 0, 0, 2, 4] },
  { values: [0, 0, 0, 0, 0, 4, 2] },
  { values: [0, 0, 0, 0, 0, 4, 1] },
]

function UserProfileOverview({
  state = "default",
  selectedTab = "overview",
  initialSearch = "",
}: UserProfileOverviewProps) {
  const [searchValue, setSearchValue] = useState(initialSearch)
  const [activeTab, setActiveTab] = useState<ProfileTab>(selectedTab)
  const [selectedYear, setSelectedYear] = useState("2026")

  const filteredRepositories = useMemo(
    () =>
      popularRepositories.filter((repository) =>
        repository.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue]
  )

  const years = ["2026", "2025", "2024", "2023"]

  return (
    <div data-state={state} className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-[linear-gradient(90deg,#0f1722_0%,#131d28_55%,#151b23_100%)]">
        <div className="flex h-[88px] items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-transparent hover:bg-secondary">
              <Menu className="size-4" />
            </Button>
            <Github className="size-8" />
            <span className="text-[21px] font-semibold tracking-[-0.01em]">OnderCampos</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden w-[330px] lg:block">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                aria-label="Search repositories"
                className="h-8 rounded-md border-border bg-transparent pl-9 pr-3 text-sm shadow-none"
              />
            </div>
            <HeaderIconButton />
            <HeaderIconButton />
            <HeaderIconButton label="+" />
            <HeaderIconButton />
            <HeaderIconButton />
            <HeaderIconButton />
            <Avatar className="size-8 border border-border">
              <AvatarImage src="/Frida.png" alt="OnderCampos" />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ProfileTab)} className="gap-0">
          <TabsList className="h-auto w-full justify-start gap-5 rounded-none border-t border-border bg-transparent px-4 pb-0 pt-0 lg:px-6">
            {profileTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="relative h-[51px] rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 text-sm font-medium text-foreground shadow-none data-[state=active]:border-[var(--tab-active)] data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <Icon className="size-4 text-muted-foreground" />
                  <span>{tab.label}</span>
                  {tab.count ? <Badge className="ml-1 h-5 rounded-full bg-secondary px-1.5 text-[11px] text-foreground hover:bg-secondary">{tab.count}</Badge> : null}
                </TabsTrigger>
              )
            })}
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <main className="mx-auto grid max-w-[1120px] gap-5 px-4 py-8 lg:grid-cols-[296px_minmax(0,1fr)] lg:px-6">
              <aside>
                <div className="relative w-fit">
                  <Avatar className="size-[266px] border border-border shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
                    <AvatarImage src="/Frida.png" alt="Onder Francisco Campos Garcia" className="object-cover" />
                    <AvatarFallback>OC</AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    aria-label="Update profile status"
                    className="absolute right-2 bottom-6 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition hover:bg-secondary"
                  >
                    <span className="text-lg">☺</span>
                  </button>
                </div>

                <div className="mt-4">
                  <h1 className="text-[42px] leading-[1.05] font-semibold tracking-[-0.02em]">Onder Francisco Campos Garcia</h1>
                  <p className="mt-1 text-[27px] text-muted-foreground">OnderCampos</p>
                </div>

                <Button variant="secondary" className="mt-4 h-7 w-full rounded-md border border-border bg-secondary text-sm font-semibold hover:bg-[#363d46]">
                  Edit profile
                </Button>

                <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="size-4" />
                  <span className="text-foreground">2 followers</span>
                  <span>·</span>
                  <span className="text-foreground">1 following</span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-foreground">
                  <Building2 className="size-4 text-muted-foreground" />
                  <span>Softtek</span>
                </div>

                <div className="mt-5 border-t border-border pt-5">
                  <h2 className="text-[24px] font-semibold">Achievements</h2>
                  <div className="mt-4 flex items-center gap-2.5">
                    <AchievementBadge label="YOLO" gradient="from-[#ffb8c6] via-[#f59bc9] to-[#ffce8a]" />
                    <AchievementBadge label="🏆" gradient="from-[#ffe39a] via-[#ffb347] to-[#d8841b]" />
                    <AchievementBadge label="🧊" gradient="from-[#69c2ff] via-[#3a7dff] to-[#9fd9ff]" count="x2" />
                    <AchievementBadge label="🫛" gradient="from-[#88dfa3] via-[#63c478] to-[#c7f5af]" />
                  </div>
                </div>

                <div className="mt-5 border-t border-border pt-5">
                  <h2 className="text-[24px] font-semibold">Organizations</h2>
                </div>
              </aside>

              <section>
                <div className="flex items-center justify-between">
                  <h2 className="text-[30px] font-semibold">Popular repositories</h2>
                  <Button variant="link" className="h-auto px-0 text-sm text-[#2f81f7] hover:text-[#58a6ff]">Customize your pins</Button>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {filteredRepositories.map((repository) => (
                    <PopularRepositoryCard key={repository.id} repository={repository} />
                  ))}
                </div>

                <div className="mt-8 flex items-end justify-between gap-4">
                  <h2 className="text-[32px] font-semibold tracking-[-0.01em]">471 contributions in the last year</h2>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <button type="button" className="transition hover:text-foreground">Contribution settings</button>
                    <YearSelect years={years} selectedYear={selectedYear} onSelect={setSelectedYear} />
                  </div>
                </div>

                <Card className="mt-3 rounded-md border-border bg-background py-0 shadow-none">
                  <div className="px-5 pt-4">
                    <div className="grid grid-cols-[32px_repeat(49,minmax(0,1fr))] gap-[3px] text-xs text-muted-foreground">
                      <div />
                      {contributionWeeks.map((week, index) => (
                        <div key={`month-${index}`} className="text-center">
                          {week.month ?? ""}
                        </div>
                      ))}

                      {(["Mon", "Wed", "Fri"] as const).map((label, rowIndex) => (
                        <div key={label} className="contents">
                          <div className="pr-2 pt-[2px] text-right">{label}</div>
                          {contributionWeeks.map((week, weekIndex) => (
                            <div key={`${label}-${weekIndex}`} className="grid gap-[3px]">
                              {week.values.map((value, dayIndex) => {
                                if (dayIndex !== rowIndex * 2) return null
                                return <ContributionCell key={`${label}-${weekIndex}-${dayIndex}`} level={value} />
                              })}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 flex gap-[3px] pl-8">
                      {Array.from({ length: 49 }).map((_, weekIndex) => (
                        <div key={`week-${weekIndex}`} className="grid grid-rows-7 gap-[3px]">
                          {contributionWeeks[weekIndex]?.values.map((level, dayIndex) => (
                            <ContributionCell key={`grid-${weekIndex}-${dayIndex}`} level={level} />
                          ))}
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between pb-4 text-xs text-muted-foreground">
                      <button type="button" className="transition hover:text-foreground">Learn how we count contributions</button>
                      <div className="flex items-center gap-2">
                        <span>Less</span>
                        <div className="flex gap-[3px]">
                          <ContributionCell level={0} />
                          <ContributionCell level={1} />
                          <ContributionCell level={2} />
                          <ContributionCell level={3} />
                          <ContributionCell level={4} />
                        </div>
                        <span>More</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="mt-8">
                  <h2 className="text-[30px] font-semibold">Contribution activity</h2>
                  <div className="mt-4 flex items-center gap-4 border-b border-border pb-4 text-sm">
                    <span className="font-semibold text-foreground">September 2026</span>
                  </div>
                </div>
              </section>
            </main>
          </TabsContent>

          <TabsContent value="repositories" className="mt-0" />
          <TabsContent value="projects" className="mt-0" />
          <TabsContent value="packages" className="mt-0" />
        </Tabs>
      </header>
    </div>
  )
}

function HeaderIconButton({ label }: { label?: string }) {
  return (
    <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-md border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground">
      {label ? <span className="text-base leading-none">{label}</span> : <span className="h-3.5 w-3.5 rounded-sm border border-current" />}
    </Button>
  )
}

function PopularRepositoryCard({ repository }: { repository: PopularRepository }) {
  return (
    <Card className="rounded-md border-border bg-background py-0 shadow-none">
      <div className="flex min-h-[128px] flex-col px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[22px] font-semibold text-[#2f81f7]">{repository.name}</h3>
            {repository.isFork ? (
              <p className="mt-1 text-sm text-muted-foreground">
                Forked from <span className="underline underline-offset-2">{repository.forkSource}</span>
              </p>
            ) : null}
          </div>
          <Badge variant="outline" className="rounded-full border-border bg-transparent px-2 py-0 text-xs text-muted-foreground">
            Public
          </Badge>
        </div>

        {repository.description ? (
          <p className="mt-4 text-sm text-foreground">{repository.description}</p>
        ) : null}

        <div className="mt-auto pt-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: repository.languageColor }} />
            {repository.language}
          </span>
        </div>
      </div>
    </Card>
  )
}

function ContributionCell({ level }: { level: ContributionLevel }) {
  return (
    <span
      className={cn("block h-[10px] w-[10px] rounded-[2px] border border-[#0d1117]", {
        "bg-[#212830]": level === 0,
        "bg-[#0e4429]": level === 1,
        "bg-[#006d32]": level === 2,
        "bg-[#26a641]": level === 3,
        "bg-[#39d353]": level === 4,
      })}
    />
  )
}

function AchievementBadge({
  label,
  gradient,
  count,
}: {
  label: string
  gradient: string
  count?: string
}) {
  return (
    <div className="relative">
      <div className={cn("flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/80 bg-gradient-to-br text-2xl shadow-[0_1px_3px_rgba(0,0,0,0.3)]", gradient)}>
        <span>{label}</span>
      </div>
      {count ? (
        <span className="absolute right-[-2px] bottom-[-2px] rounded-full bg-[#f2cc60] px-1.5 py-0.5 text-[10px] font-semibold text-black">
          {count}
        </span>
      ) : null}
    </div>
  )
}

function YearSelect({
  years,
  selectedYear,
  onSelect,
}: {
  years: string[]
  selectedYear: string
  onSelect: (year: string) => void
}) {
  return (
    <div className="flex overflow-hidden rounded-md border border-border bg-transparent">
      {years.map((year) => (
        <button
          key={year}
          type="button"
          onClick={() => onSelect(year)}
          className={cn(
            "px-4 py-2 text-sm transition",
            year === selectedYear
              ? "bg-[#1f6feb] text-white"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          )}
        >
          {year}
        </button>
      ))}
    </div>
  )
}

export default function HomePage() {
  return <UserProfileOverview state="default" selectedTab="overview" />
}
