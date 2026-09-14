"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Boxes,
  Building2,
  ChevronDown,
  Circle,
  GitBranch,
  Github,
  Globe,
  Menu,
  Monitor,
  Package,
  Plus,
  Search,
  Star,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export type GithubUserProfileOverviewState = "default";

type ProfileTab = {
  value: string;
  label: string;
  count?: number;
  icon: React.ComponentType<{ className?: string }>;
};

type RepositoryCard = {
  name: string;
  description?: string;
  meta?: string;
  language: string;
  languageColor: string;
  visibility: string;
};

type AchievementBadge = {
  emoji: string;
  tone: string;
  label: string;
  extraLabel?: string;
};

type ContributionYear = {
  label: string;
  selected?: boolean;
};

export type GithubUserProfileOverviewProps = {
  state?: GithubUserProfileOverviewState;
  userHandle?: string;
  fullName?: string;
  bio?: string;
  company?: string;
  followers?: number;
  following?: number;
  repositoryCount?: number;
  selectedTab?: string;
  tabs?: ProfileTab[];
  repositories?: RepositoryCard[];
  achievements?: AchievementBadge[];
  years?: ContributionYear[];
  contributionCount?: number;
  contributionCells?: number[];
};

const defaultTabs: ProfileTab[] = [
  { value: "overview", label: "Overview", icon: BookOpen },
  { value: "repositories", label: "Repositories", count: 16, icon: GitBranch },
  { value: "projects", label: "Projects", icon: Monitor },
  { value: "packages", label: "Packages", icon: Package },
  { value: "stars", label: "Stars", icon: Star },
];

const defaultRepositories: RepositoryCard[] = [
  {
    name: "open-interpreter",
    meta: "Forked from openinterpreter/openinterpreter",
    description: "A natural language interface for computers",
    language: "Python",
    languageColor: "#1f6feb",
    visibility: "Public",
  },
  {
    name: "CountBoxingSofttek",
    language: "Python",
    languageColor: "#1f6feb",
    visibility: "Public",
  },
  {
    name: "count_colors",
    language: "Python",
    languageColor: "#1f6feb",
    visibility: "Public",
  },
  {
    name: "pushtest",
    language: "Python",
    languageColor: "#1f6feb",
    visibility: "Public",
  },
  {
    name: "SAP-Cleaning-Frontend",
    language: "TypeScript",
    languageColor: "#1f6feb",
    visibility: "Public",
  },
  {
    name: "FridaProductPlannerWebBackend",
    language: "Python",
    languageColor: "#1f6feb",
    visibility: "Public",
  },
];

const defaultAchievements: AchievementBadge[] = [
  { emoji: "💮", tone: "linear-gradient(135deg, #f7b6d2, #f0a8d8)", label: "Achievement" },
  { emoji: "🤠", tone: "linear-gradient(135deg, #ffd36a, #ffb44f)", label: "Achievement" },
  { emoji: "🧊", tone: "linear-gradient(135deg, #66b3ff, #58a6ff)", label: "Achievement", extraLabel: "x2" },
  { emoji: "🫛", tone: "linear-gradient(135deg, #c5f79c, #7adc97)", label: "Achievement" },
];

const defaultYears: ContributionYear[] = [
  { label: "2026", selected: true },
  { label: "2025" },
  { label: "2024" },
  { label: "2023" },
];

const defaultContributionCells = [
  0,0,0,0,0,0,0,0,1,0,2,0,0,0,0,0,1,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,
  0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,
  0,0,2,0,0,1,0,0,0,0,0,2,0,0,1,0,2,0,0,0,0,1,0,2,0,0,1,0,0,0,0,0,
  1,0,0,2,0,1,0,0,0,1,2,0,0,0,0,0,1,0,0,2,0,0,0,1,0,0,0,0,0,0,0,0,
  0,2,0,0,0,1,0,0,0,0,2,0,0,1,0,0,0,0,0,2,0,1,0,0,0,0,1,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,1,0,0,2,
  0,0,1,0,0,0,0,0,2,0,0,1,0,2,0,0,0,1,0,0,0,0,0,1,0,0,2,0,0,3,0,2,
  0,0,1,0,0,2,0,4,0,3,0,2,0,0,0,1,0,2,0,4,0,3,0,1,0,0,0,0,0,0,2,0,
  0,1,0,0,0,0,2,0,0,0,0,1,0,2,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,
  0,0,0,0,1,0,0,2,0,0,0,1,0,0,3,0,0,2,0,0,4,0,0,3,0,2,0,0,0,1,0,0,
  0,0,0,0,0,0,1,0,0,2,0,0,3,0,0,4,0,0,2,0,0,1,0,0,0,0,2,0,1,0,0,0,
  0,2,0,0,0,1,0,0,2,0,0,4,0,0,3,0,0,1,0,0,2,0,0,0,0,1,0,0,3,0,0,4
];

const monthLabels = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const weekdayLabels = ["Mon", "Wed", "Fri"];
const contributionLegend = [0, 1, 2, 3, 4];

function TopNavButton({ children }: { children: React.ReactNode }) {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="size-8 rounded-md border border-[color:var(--github-border-subtle)] bg-transparent text-[var(--github-text-primary)] hover:bg-[var(--github-surface-alt)] hover:text-[var(--github-text-primary)]"
    >
      {children}
    </Button>
  );
}

function RepositoryTile({ repository }: { repository: RepositoryCard }) {
  return (
    <Card className="gap-0 rounded-lg border-[color:var(--github-border-subtle)] bg-transparent px-4 py-4 shadow-none">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <button type="button" className="truncate text-left text-[16px] font-semibold text-[#2f81f7] hover:underline">
            {repository.name}
          </button>
          {repository.meta ? (
            <div className="mt-1 text-[12px] text-[var(--github-text-muted)]">{repository.meta}</div>
          ) : null}
        </div>
        <span className="rounded-full border border-[color:var(--github-border-subtle)] px-2 py-0.5 text-[12px] text-[var(--github-text-muted)]">
          {repository.visibility}
        </span>
      </div>
      {repository.description ? (
        <p className="mt-4 text-[14px] text-[var(--github-text-secondary)]">{repository.description}</p>
      ) : null}
      <div className="mt-5 flex items-center gap-2 text-[13px] text-[var(--github-text-muted)]">
        <span className="size-3 rounded-full" style={{ backgroundColor: repository.languageColor }} />
        {repository.language}
      </div>
    </Card>
  );
}

function AchievementPill({ badge }: { badge: AchievementBadge }) {
  return (
    <div className="relative flex size-12 items-center justify-center rounded-full border-2 border-white/80 text-[24px] shadow-[var(--github-card-shadow)]" style={{ background: badge.tone }} aria-label={badge.label}>
      <span>{badge.emoji}</span>
      {badge.extraLabel ? (
        <span className="absolute -right-1 -bottom-1 rounded-full bg-[var(--github-surface)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--github-text-primary)]">
          {badge.extraLabel}
        </span>
      ) : null}
    </div>
  );
}

function contributionColor(level: number) {
  if (level <= 0) return "#263040";
  if (level === 1) return "#0e4429";
  if (level === 2) return "#006d32";
  if (level === 3) return "#26a641";
  return "#39d353";
}

export function GithubUserProfileOverview({
  state = "default",
  userHandle = "OnderCampos",
  fullName = "Onder Francisco Campos Garcia",
  bio = "OnderCampos",
  company = "Softtek",
  followers = 2,
  following = 1,
  repositoryCount = 16,
  selectedTab = "overview",
  tabs = defaultTabs,
  repositories = defaultRepositories,
  achievements = defaultAchievements,
  years = defaultYears,
  contributionCount = 471,
  contributionCells = defaultContributionCells,
}: GithubUserProfileOverviewProps) {
  const [activeTab, setActiveTab] = useState(selectedTab);
  const [searchValue, setSearchValue] = useState("Type / to search");
  const [selectedYear, setSelectedYear] = useState(years.find((year) => year.selected)?.label ?? years[0]?.label ?? "2026");

  const resolvedTabs = useMemo(
    () => tabs.map((tab) => (tab.value === "repositories" ? { ...tab, count: tab.count ?? repositoryCount } : tab)),
    [tabs, repositoryCount]
  );

  const monthColumns = useMemo(() => {
    const columns = [] as number[][];
    for (let index = 0; index < contributionCells.length; index += 7) {
      columns.push(contributionCells.slice(index, index + 7));
    }
    return columns;
  }, [contributionCells]);

  return (
    <div data-state={state} className="min-h-screen bg-[var(--github-bg)] text-[var(--github-text-primary)]">
      <div className="border-b border-[color:var(--github-border-subtle)] bg-[linear-gradient(180deg,#0f1724_0%,#111827_100%)]">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <TopNavButton>
              <Menu className="size-4" />
            </TopNavButton>
            <Github className="size-8 text-white" />
            <span className="text-[20px] font-semibold">{userHandle}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden h-8 w-[340px] items-center gap-2 rounded-md border border-[color:var(--github-border-subtle)] bg-transparent px-3 text-[13px] text-[var(--github-text-muted)] md:flex">
              <Search className="size-4" />
              <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} className="w-full bg-transparent outline-none" />
              <span className="rounded border border-[color:var(--github-border-subtle)] px-1.5 py-0.5 text-[11px]">/</span>
            </div>
            <TopNavButton>
              <Boxes className="size-4" />
            </TopNavButton>
            <TopNavButton>
              <Plus className="size-4" />
            </TopNavButton>
            <TopNavButton>
              <Circle className="size-4" />
            </TopNavButton>
            <TopNavButton>
              <GitBranch className="size-4" />
            </TopNavButton>
            <TopNavButton>
              <Monitor className="size-4" />
            </TopNavButton>
            <TopNavButton>
              <Package className="size-4" />
            </TopNavButton>
            <Avatar className="size-8 border border-[color:var(--github-border-subtle)]">
              <AvatarImage src="/Frida.png" alt={userHandle} />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="flex items-center gap-5 overflow-x-auto px-4 lg:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full gap-0">
            <TabsList className="h-auto gap-1 rounded-none bg-transparent p-0">
              {resolvedTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="h-12 rounded-none border-x-0 border-t-0 border-b-2 border-transparent bg-transparent px-3 text-[14px] font-normal text-[var(--github-text-secondary)] shadow-none data-[state=active]:border-[var(--github-accent)] data-[state=active]:bg-transparent data-[state=active]:text-[var(--github-text-primary)] data-[state=active]:shadow-none"
                  >
                    <Icon className="size-4" />
                    {tab.label}
                    {tab.count ? <span className="ml-1 rounded-full bg-[var(--github-surface-alt)] px-1.5 py-0.5 text-[12px] leading-none">{tab.count}</span> : null}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-[296px_minmax(0,1fr)] lg:px-6">
        <aside>
          <div className="sticky top-8">
            <div className="relative inline-block">
              <Avatar className="size-[296px] border border-[color:var(--github-border-subtle)]">
                <AvatarImage src="/Frida.png" alt={fullName} className="object-cover" />
                <AvatarFallback>OC</AvatarFallback>
              </Avatar>
              <button type="button" className="absolute right-3 bottom-7 flex size-9 items-center justify-center rounded-full border border-[color:var(--github-border-subtle)] bg-[var(--github-surface)] text-[var(--github-text-muted)] shadow-[var(--github-card-shadow)] hover:bg-[var(--github-surface-alt)]">
                <Globe className="size-4" />
              </button>
            </div>

            <div className="mt-5">
              <h1 className="text-[40px] leading-10 font-semibold tracking-[-0.02em]">{fullName}</h1>
              <div className="mt-1 text-[28px] leading-8 font-light text-[var(--github-text-muted)]">{bio}</div>
            </div>

            <Button variant="outline" className="mt-5 h-8 w-full border-[color:var(--github-border-subtle)] bg-[var(--github-surface-alt)] text-[14px] text-[var(--github-text-primary)] hover:bg-[#30363d] hover:text-[var(--github-text-primary)]">
              Edit profile
            </Button>

            <div className="mt-4 flex items-center gap-1 text-[14px] text-[var(--github-text-secondary)]">
              <Users className="size-4 text-[var(--github-text-muted)]" />
              <button type="button" className="font-semibold hover:text-[#2f81f7]">{followers} followers</button>
              <span>·</span>
              <button type="button" className="font-semibold hover:text-[#2f81f7]">{following} following</button>
            </div>

            <div className="mt-5 flex items-center gap-2 text-[14px] text-[var(--github-text-secondary)]">
              <Building2 className="size-4 text-[var(--github-text-muted)]" />
              <span>{company}</span>
            </div>

            <div className="mt-6 border-t border-[color:var(--github-border-subtle)] pt-5">
              <h2 className="text-[22px] font-semibold">Achievements</h2>
              <div className="mt-4 flex gap-2.5">
                {achievements.map((badge) => (
                  <AchievementPill key={`${badge.emoji}-${badge.extraLabel ?? "base"}`} badge={badge} />
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-[color:var(--github-border-subtle)] pt-5">
              <h2 className="text-[22px] font-semibold">Organizations</h2>
            </div>
          </div>
        </aside>

        <main>
          <div className="flex items-center justify-between">
            <h2 className="text-[24px] font-medium">Popular repositories</h2>
            <button type="button" className="text-[12px] text-[#2f81f7] hover:underline">Customize your pins</button>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {repositories.map((repository) => (
              <RepositoryTile key={repository.name} repository={repository} />
            ))}
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-[32px] leading-8 font-normal">{contributionCount} contributions in the last year</h2>
              <div className="flex items-center gap-6 text-[12px] text-[var(--github-text-muted)]">
                <button type="button" className="inline-flex items-center gap-1 hover:text-[var(--github-text-primary)]">
                  Contribution settings
                  <ChevronDown className="size-3" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_86px]">
              <Card className="gap-0 rounded-lg border-[color:var(--github-border-subtle)] bg-transparent px-4 py-4 shadow-none">
                <div className="grid grid-cols-[28px_minmax(0,1fr)] gap-3">
                  <div className="pt-9 text-[12px] leading-6 text-[var(--github-text-muted)]">
                    {weekdayLabels.map((label) => (
                      <div key={label}>{label}</div>
                    ))}
                  </div>
                  <div>
                    <div className="mb-2 grid grid-cols-12 text-[12px] text-[var(--github-text-muted)]">
                      {monthLabels.map((month) => (
                        <div key={month}>{month}</div>
                      ))}
                    </div>
                    <div className="flex gap-[3px] overflow-hidden">
                      {monthColumns.map((column, columnIndex) => (
                        <div key={`col-${columnIndex}`} className="grid gap-[3px]">
                          {Array.from({ length: 7 }).map((_, rowIndex) => {
                            const level = column[rowIndex] ?? 0;
                            return (
                              <div
                                key={`cell-${columnIndex}-${rowIndex}`}
                                className="size-[10px] rounded-[2px] border border-black/10"
                                style={{ backgroundColor: contributionColor(level) }}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[12px] text-[var(--github-text-muted)]">
                      <button type="button" className="hover:text-[var(--github-text-primary)]">Learn how we count contributions</button>
                      <div className="flex items-center gap-2">
                        <span>Less</span>
                        <div className="flex gap-[3px]">
                          {contributionLegend.map((level) => (
                            <span key={level} className="size-[10px] rounded-[2px] border border-black/10" style={{ backgroundColor: contributionColor(level) }} />
                          ))}
                        </div>
                        <span>More</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="space-y-2 text-[14px]">
                {years.map((year) => {
                  const isSelected = selectedYear === year.label;
                  return (
                    <button
                      key={year.label}
                      type="button"
                      onClick={() => setSelectedYear(year.label)}
                      className={cn(
                        "block w-full rounded-md px-4 py-3 text-left transition-colors",
                        isSelected
                          ? "bg-[#1f6feb] text-white"
                          : "text-[var(--github-text-muted)] hover:bg-[var(--github-surface-alt)] hover:text-[var(--github-text-primary)]"
                      )}
                    >
                      {year.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-[32px] font-normal">Contribution activity</h2>
            <div className="mt-4 flex items-center gap-3 text-[14px] text-[var(--github-text-secondary)]">
              <span className="font-semibold">September 2026</span>
              <div className="h-px flex-1 bg-[color:var(--github-border-subtle)]" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
