"use client";

import * as React from "react";
import {
  BookOpen,
  Box,
  Building2,
  CalendarDays,
  Eye,
  Github,
  Menu,
  Monitor,
  Package,
  Search,
  Star,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type ProfileTab = "overview" | "repositories" | "projects" | "packages";

type Repository = {
  name: string;
  description?: string;
  language: string;
  languageColor: string;
  forkedFrom?: string;
  isPublic?: boolean;
};

type ContributionLevel = 0 | 1 | 2 | 3 | 4;

type ContributionWeek = {
  month?: string;
  days: ContributionLevel[];
};

type GithubUserProfileViewProps = {
  state?: "overview";
  initialSearch?: string;
  initialTab?: ProfileTab;
};

const profileTabs: Array<{ value: ProfileTab; label: string; icon: React.ComponentType<{ className?: string }>; count?: number }> = [
  { value: "overview", label: "Overview", icon: BookOpen },
  { value: "repositories", label: "Repositories", icon: Monitor, count: 16 },
  { value: "projects", label: "Projects", icon: Box },
  { value: "packages", label: "Packages", icon: Package },
];

const popularRepositories: Repository[] = [
  {
    name: "open-interpreter",
    forkedFrom: "Forked from openinterpreter/openinterpreter",
    description: "A natural language interface for computers",
    language: "Python",
    languageColor: "#2f81f7",
    isPublic: true,
  },
  {
    name: "CountBoxingSofttek",
    language: "Python",
    languageColor: "#2f81f7",
    isPublic: true,
  },
  {
    name: "count_colors",
    language: "Python",
    languageColor: "#2f81f7",
    isPublic: true,
  },
  {
    name: "pushtest",
    language: "Python",
    languageColor: "#2f81f7",
    isPublic: true,
  },
  {
    name: "SAP-Cleaning-Frontend",
    language: "TypeScript",
    languageColor: "#3178c6",
    isPublic: true,
  },
  {
    name: "FridaProductPlannerWebBackend",
    language: "Python",
    languageColor: "#2f81f7",
    isPublic: true,
  },
];

const contributionWeeks: ContributionWeek[] = [
  { month: "Sep", days: [0, 0, 0, 1, 0, 1, 1] },
  { month: "Oct", days: [0, 1, 0, 0, 0, 1, 0] },
  { month: "Nov", days: [1, 0, 0, 0, 1, 0, 0] },
  { month: "Dec", days: [0, 0, 1, 0, 0, 1, 0] },
  { month: "Jan", days: [0, 1, 0, 0, 0, 0, 0] },
  { month: "Feb", days: [0, 0, 0, 1, 0, 0, 1] },
  { month: "Mar", days: [1, 1, 0, 0, 2, 1, 0] },
  { month: "Apr", days: [0, 0, 1, 0, 1, 0, 0] },
  { month: "May", days: [0, 1, 0, 0, 2, 1, 0] },
  { month: "Jun", days: [1, 1, 0, 0, 1, 0, 2] },
  { month: "Jul", days: [0, 1, 0, 0, 1, 0, 0] },
  { month: "Aug", days: [0, 0, 2, 3, 0, 0, 0] },
  { days: [0, 1, 0, 0, 0, 1, 1] },
  { days: [0, 1, 0, 0, 1, 0, 2] },
  { days: [0, 0, 1, 0, 0, 1, 0] },
  { days: [0, 0, 0, 1, 0, 0, 0] },
  { days: [0, 0, 0, 0, 0, 0, 0] },
  { days: [0, 1, 0, 0, 1, 0, 0] },
  { days: [0, 0, 1, 0, 0, 1, 0] },
  { days: [0, 0, 0, 0, 0, 0, 0] },
  { days: [1, 0, 0, 0, 1, 0, 1] },
  { days: [0, 0, 1, 0, 0, 1, 0] },
  { days: [0, 1, 0, 0, 1, 0, 0] },
  { days: [0, 1, 0, 0, 0, 1, 0] },
  { days: [0, 0, 0, 1, 0, 0, 1] },
  { days: [1, 1, 0, 0, 2, 1, 0] },
  { days: [0, 0, 1, 0, 3, 0, 1] },
  { days: [1, 0, 0, 1, 0, 1, 0] },
  { days: [0, 1, 0, 0, 2, 0, 1] },
  { days: [0, 0, 1, 0, 1, 0, 0] },
  { days: [0, 0, 0, 0, 0, 1, 0] },
  { days: [0, 1, 0, 0, 1, 0, 0] },
  { days: [0, 0, 1, 0, 0, 1, 0] },
  { days: [0, 0, 0, 0, 0, 0, 0] },
  { days: [0, 1, 0, 0, 1, 0, 2] },
  { days: [0, 0, 1, 0, 0, 1, 0] },
  { days: [0, 0, 0, 1, 0, 0, 0] },
  { days: [0, 1, 0, 0, 0, 1, 0] },
  { days: [0, 0, 0, 0, 0, 0, 0] },
  { days: [0, 0, 1, 0, 1, 0, 0] },
  { days: [0, 0, 0, 0, 0, 1, 0] },
  { days: [0, 1, 0, 0, 0, 0, 0] },
  { days: [0, 0, 0, 0, 0, 0, 0] },
  { days: [0, 1, 0, 0, 1, 0, 0] },
  { days: [0, 0, 1, 0, 0, 1, 0] },
  { days: [0, 0, 0, 0, 0, 0, 0] },
  { days: [1, 0, 0, 0, 1, 0, 1] },
  { days: [0, 0, 1, 0, 0, 1, 0] },
  { days: [0, 0, 0, 0, 0, 0, 0] },
  { days: [0, 1, 0, 0, 1, 0, 0] },
  { days: [0, 0, 4, 3, 2, 4, 2] },
  { days: [0, 0, 2, 1, 0, 3, 1] },
];

const contributionLegend: ContributionLevel[] = [0, 1, 2, 3, 4];
const yearOptions = ["2026", "2025", "2024", "2023"];

function GithubUserProfileView({
  state = "overview",
  initialSearch = "",
  initialTab = "overview",
}: GithubUserProfileViewProps) {
  const [search, setSearch] = React.useState(initialSearch);
  const [selectedTab, setSelectedTab] = React.useState<ProfileTab>(initialTab);
  const [selectedYear, setSelectedYear] = React.useState(yearOptions[0]);

  const visibleRepositories = React.useMemo(() => {
    if (!search.trim()) return popularRepositories;
    const query = search.toLowerCase();
    return popularRepositories.filter((repository) => repository.name.toLowerCase().includes(query));
  }, [search]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-[#0d1117]">
          <div className="flex h-18 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon-sm" className="border-border bg-transparent text-foreground hover:bg-card">
                <Menu className="size-4" />
              </Button>
              <Github className="size-8 text-foreground" />
              <span className="text-[20px] font-semibold">OnderCampos</span>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative hidden w-[272px] lg:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Type / to search"
                  className="h-8 rounded-md border-border bg-transparent pl-9 pr-10 text-sm"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  /
                </span>
              </div>
              {[
                <BookOpen key="pulls" className="size-4" />,
                <PlusIcon key="plus" />,
                <Eye key="issues" className="size-4" />,
                <Users key="network" className="size-4" />,
                <Package key="projects" className="size-4" />,
              ].map((icon, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon-sm"
                  className="border-border bg-transparent text-muted-foreground hover:bg-card"
                >
                  {icon}
                </Button>
              ))}
              <Avatar className="size-8 border border-border">
                <AvatarImage src="/Frida.png" alt="OnderCampos" />
                <AvatarFallback>OC</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <nav className="flex items-center gap-1 overflow-x-auto px-4 md:px-6">
            {profileTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedTab === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setSelectedTab(tab.value)}
                  className={cn(
                    "flex h-12 items-center gap-2 border-b-2 px-3 text-sm whitespace-nowrap transition-colors",
                    isActive
                      ? "border-[color:var(--github-danger)] text-foreground"
                      : "border-transparent text-foreground hover:border-border hover:text-foreground"
                  )}
                >
                  <Icon className="size-4 text-muted-foreground" />
                  <span>{tab.label}</span>
                  {tab.count ? (
                    <span className="rounded-full bg-secondary px-1.5 py-0.5 text-xs text-foreground">{tab.count}</span>
                  ) : null}
                </button>
              );
            })}
            <button type="button" className="flex h-12 items-center gap-2 border-b-2 border-transparent px-3 text-sm text-foreground">
              <Star className="size-4 text-muted-foreground" />
              <span>Stars</span>
            </button>
          </nav>
        </header>

        <div className="mx-auto grid max-w-[1120px] gap-8 px-4 py-8 md:px-6 lg:grid-cols-[296px_minmax(0,1fr)]">
          <aside>
            <div className="sticky top-8">
              <div className="relative mx-auto w-[296px] max-w-full">
                <Avatar className="size-[264px] border border-border shadow-sm">
                  <AvatarImage src="/Frida.png" alt="Onder Campos" className="object-cover" />
                  <AvatarFallback className="text-5xl">OC</AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  className="absolute bottom-8 right-0 inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm hover:bg-secondary"
                >
                  <Eye className="size-4" />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <h1 className="text-[38px] leading-10 font-semibold tracking-[-0.02em]">Onder Francisco Campos Garcia</h1>
                <p className="text-[20px] text-muted-foreground">OnderCampos</p>
              </div>

              <Button variant="outline" className="mt-4 h-8 w-full border-border bg-secondary px-4 text-sm font-semibold hover:bg-[#373e47]">
                Edit profile
              </Button>

              <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="size-4" />
                <span className="font-semibold text-foreground">2</span>
                <span>followers ·</span>
                <span className="font-semibold text-foreground">1</span>
                <span>following</span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm">
                <Building2 className="size-4 text-muted-foreground" />
                <span>Softtek</span>
              </div>

              <Separator className="mt-6" />

              <section className="mt-5">
                <h2 className="text-[22px] font-semibold">Achievements</h2>
                <div className="mt-3 flex items-center gap-2">
                  {[
                    { label: "YOLO", color: "#f3a4c1" },
                    { label: "Pro", color: "#f0c24b" },
                    { label: "Pull", color: "#61a5fa" },
                    { label: "Pair", color: "#8bd38a" },
                  ].map((item, index) => (
                    <div key={item.label} className="relative">
                      <div
                        className="flex size-12 items-center justify-center rounded-full border-2 border-[#d0d7de] text-xs font-bold text-background"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.label}
                      </div>
                      {index === 2 ? (
                        <span className="absolute -bottom-1 -right-1 rounded-full bg-[#d18616] px-1.5 py-0.5 text-[10px] font-semibold text-black">
                          x2
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>

              <Separator className="mt-6" />

              <section className="mt-5">
                <h2 className="text-[22px] font-semibold">Organizations</h2>
                <div className="mt-3 flex size-10 items-center justify-center rounded-md bg-[#2f81f7]/20 text-sm font-semibold text-[#79c0ff]">
                  S
                </div>
              </section>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-medium">Popular repositories</h2>
              <button type="button" className="text-sm text-[#2f81f7] hover:underline">
                Customize your pins
              </button>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {visibleRepositories.map((repository) => (
                <RepositoryCard key={repository.name} repository={repository} />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <h3 className="text-[28px] leading-8 font-normal">471 contributions in the last year</h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <button type="button" className="inline-flex items-center gap-1 hover:text-foreground">
                  Contribution settings
                  <span className="text-xs">▾</span>
                </button>
              </div>
            </div>

            <div className="mt-3 flex gap-6 rounded-md border border-border p-4">
              <div className="min-w-0 flex-1 overflow-x-auto">
                <div className="mb-2 grid grid-cols-[28px_repeat(12,minmax(0,1fr))] items-center gap-2 text-xs text-muted-foreground">
                  <span />
                  {contributionWeeks.slice(0, 12).map((week, index) => (
                    <span key={`${week.month ?? index}`} className="text-center">
                      {week.month ?? ""}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-[28px_1fr] gap-2">
                  <div className="grid grid-rows-7 gap-[3px] text-xs text-muted-foreground">
                    {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((label, index) => (
                      <div key={`${label}-${index}`} className="flex h-[10px] items-center justify-start">
                        {label}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-[3px]">
                    {contributionWeeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
                        {week.days.map((day, dayIndex) => (
                          <span
                            key={`${weekIndex}-${dayIndex}`}
                            className="size-[10px] rounded-[2px] border border-black/10"
                            style={{ backgroundColor: contributionColor(day) }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <button type="button" className="hover:text-foreground">
                    Learn how we count contributions
                  </button>
                  <div className="flex items-center gap-2">
                    <span>Less</span>
                    <div className="flex gap-[3px]">
                      {contributionLegend.map((level) => (
                        <span
                          key={level}
                          className="size-[10px] rounded-[2px] border border-black/10"
                          style={{ backgroundColor: contributionColor(level) }}
                        />
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </div>

              <div className="flex w-[92px] flex-col gap-2">
                {yearOptions.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setSelectedYear(year)}
                    className={cn(
                      "rounded-md px-3 py-2 text-left text-sm transition-colors",
                      selectedYear === year
                        ? "bg-[#1f6feb] text-white"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <section className="mt-8">
              <h3 className="text-[28px] leading-8 font-normal">Contribution activity</h3>
              <div className="mt-5 flex items-center gap-4">
                <button type="button" className="text-sm font-semibold text-[#79c0ff] hover:underline">
                  September 2026
                </button>
                <div className="h-px flex-1 bg-border" />
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}

function RepositoryCard({ repository }: { repository: Repository }) {
  return (
    <article className="rounded-md border border-border bg-background p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-[20px] font-semibold text-[#2f81f7]">{repository.name}</h3>
          {repository.forkedFrom ? (
            <p className="mt-1 text-sm text-muted-foreground underline decoration-muted-foreground/30 underline-offset-2">
              {repository.forkedFrom}
            </p>
          ) : null}
        </div>
        {repository.isPublic ? (
          <Badge variant="outline" className="rounded-full border-border px-2.5 py-0.5 text-xs text-muted-foreground">
            Public
          </Badge>
        ) : null}
      </div>

      {repository.description ? (
        <p className="mt-4 min-h-10 text-sm text-muted-foreground">{repository.description}</p>
      ) : (
        <div className="mt-4 min-h-10" />
      )}

      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <span className="size-3 rounded-full" style={{ backgroundColor: repository.languageColor }} />
        <span>{repository.language}</span>
      </div>
    </article>
  );
}

function contributionColor(level: ContributionLevel) {
  switch (level) {
    case 0:
      return "#2d333b";
    case 1:
      return "#0e4429";
    case 2:
      return "#006d32";
    case 3:
      return "#26a641";
    case 4:
      return "#39d353";
    default:
      return "#2d333b";
  }
}

function PlusIcon() {
  return <span className="text-base leading-none">＋</span>;
}

export default function HomePage() {
  return <GithubUserProfileView state="overview" initialTab="overview" />;
}
