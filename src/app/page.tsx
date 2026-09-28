"use client";

import * as React from "react";
import {
  BookOpen,
  Box,
  Building2,
  ChevronDown,
  Github,
  Grip,
  Menu,
  Monitor,
  Search,
  Star,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type UserProfileOverviewState = "populated-default";

type ProfileTab = "overview" | "repositories" | "projects" | "packages";

type RepositoryCard = {
  name: string;
  description?: string;
  language: string;
  languageColor: string;
  visibility: "Public";
  forkedFrom?: string;
};

type ContributionWeek = number[];

type ContributionMonth = {
  label: string;
  weekSpan: number;
};

type UserProfileOverviewProps = {
  state?: UserProfileOverviewState;
  initialTab?: ProfileTab;
};

const profileTabs: Array<{ value: ProfileTab; label: string; count?: number; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = [
  { value: "overview", label: "Overview", icon: BookOpen },
  { value: "repositories", label: "Repositories", icon: Monitor, count: 16 },
  { value: "projects", label: "Projects", icon: Grip },
  { value: "packages", label: "Packages", icon: Box },
];

const repositories: RepositoryCard[] = [
  {
    name: "open-interpreter",
    forkedFrom: "Forked from openinterpreter/openinterpreter",
    description: "A natural language interface for computers",
    language: "Python",
    languageColor: "#3572A5",
    visibility: "Public",
  },
  {
    name: "CountBoxingSofttek",
    language: "Python",
    languageColor: "#3572A5",
    visibility: "Public",
  },
  {
    name: "count_colors",
    language: "Python",
    languageColor: "#3572A5",
    visibility: "Public",
  },
  {
    name: "pushtest",
    language: "Python",
    languageColor: "#3572A5",
    visibility: "Public",
  },
  {
    name: "SAP-Cleaning-Frontend",
    language: "TypeScript",
    languageColor: "#3178C6",
    visibility: "Public",
  },
  {
    name: "FridaProductPlannerWebBackend",
    language: "Python",
    languageColor: "#3572A5",
    visibility: "Public",
  },
];

const months: ContributionMonth[] = [
  { label: "Sep", weekSpan: 4 },
  { label: "Oct", weekSpan: 4 },
  { label: "Nov", weekSpan: 4 },
  { label: "Dec", weekSpan: 5 },
  { label: "Jan", weekSpan: 4 },
  { label: "Feb", weekSpan: 4 },
  { label: "Mar", weekSpan: 5 },
  { label: "Apr", weekSpan: 4 },
  { label: "May", weekSpan: 4 },
  { label: "Jun", weekSpan: 4 },
  { label: "Jul", weekSpan: 4 },
  { label: "Aug", weekSpan: 4 },
  { label: "", weekSpan: 2 },
];

const contributionLevels = ["#212830", "#0e4429", "#006d32", "#26a641", "#39d353"];

const contributionGrid: ContributionWeek[] = [
  [0, 0, 0, 1, 0, 2, 0],
  [0, 0, 1, 2, 1, 0, 1],
  [0, 2, 1, 0, 0, 1, 0],
  [0, 1, 1, 0, 0, 0, 2],
  [0, 0, 0, 1, 0, 2, 0],
  [0, 0, 0, 0, 1, 0, 1],
  [0, 0, 0, 1, 0, 2, 0],
  [0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 1],
  [0, 1, 0, 0, 1, 0, 2],
  [0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 1, 0, 1],
  [0, 1, 0, 0, 0, 0, 2],
  [1, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 1, 0, 1],
  [0, 0, 1, 2, 1, 0, 2],
  [0, 1, 2, 0, 0, 0, 1],
  [0, 2, 1, 0, 0, 1, 2],
  [0, 0, 0, 1, 0, 2, 0],
  [0, 0, 1, 0, 1, 0, 0],
  [1, 2, 0, 1, 2, 0, 1],
  [0, 1, 2, 0, 0, 0, 2],
  [1, 0, 0, 1, 0, 2, 0],
  [0, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 2, 0, 1],
  [0, 2, 0, 0, 1, 0, 0],
  [0, 0, 1, 2, 0, 0, 0],
  [0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 2, 0, 0, 0],
  [0, 2, 1, 0, 0, 0, 0],
  [0, 1, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 1, 0, 0, 0],
  [2, 1, 0, 2, 0, 0, 0],
  [3, 2, 0, 3, 0, 0, 0],
  [4, 3, 1, 4, 0, 0, 0],
  [3, 4, 0, 3, 0, 0, 0],
  [2, 3, 0, 0, 0, 0, 0],
  [1, 2, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

const years = ["2026", "2025", "2024", "2023"];
const achievements = ["💞", "🤠", "🦈", "🫛"];

function HeaderIconButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-transparent text-muted-foreground transition hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
    </button>
  );
}

function RepoCard({ repository }: { repository: RepositoryCard }) {
  return (
    <Card className="gap-0 rounded-lg border-border bg-card py-0 shadow-[var(--shadow-card)]">
      <CardContent className="flex h-full min-h-[88px] flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <a href="#" className="text-[15px] font-semibold text-[#2f81f7] hover:underline">
            {repository.name}
          </a>
          <Badge
            variant="outline"
            className="rounded-full border-border bg-transparent px-2 py-0 text-[12px] font-medium text-muted-foreground"
          >
            {repository.visibility}
          </Badge>
        </div>
        {repository.forkedFrom ? (
          <p className="mb-3 text-[12px] text-muted-foreground underline decoration-muted-foreground/50 underline-offset-2">
            {repository.forkedFrom}
          </p>
        ) : null}
        {repository.description ? (
          <p className="mb-4 text-[14px] text-muted-foreground">{repository.description}</p>
        ) : null}
        <div className="mt-auto flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: repository.languageColor }}
          />
          <span>{repository.language}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function ContributionsHeatmap() {
  return (
    <div className="rounded-lg border border-border bg-background px-4 py-3">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="grid flex-1 grid-cols-[28px_1fr] gap-x-2">
          <div />
          <div className="flex text-[12px] text-muted-foreground">
            {months.map((month) => (
              <div
                key={`${month.label}-${month.weekSpan}`}
                className="shrink-0"
                style={{ width: `${month.weekSpan * 12}px` }}
              >
                {month.label}
              </div>
            ))}
          </div>
        </div>
        <a href="#" className="text-[12px] text-muted-foreground hover:text-foreground">
          Contribution settings
          <ChevronDown className="ml-1 inline h-3 w-3" />
        </a>
      </div>

      <div className="grid grid-cols-[28px_1fr] gap-x-2">
        <div className="grid grid-rows-7 gap-[3px] pt-[3px] text-[12px] text-muted-foreground">
          <span />
          <span>Mon</span>
          <span />
          <span>Wed</span>
          <span />
          <span>Fri</span>
          <span />
        </div>
        <div className="flex gap-[3px] overflow-hidden">
          {contributionGrid.map((week, weekIndex) => (
            <div key={`week-${weekIndex}`} className="grid grid-rows-7 gap-[3px]">
              {week.map((level, dayIndex) => (
                <span
                  key={`${weekIndex}-${dayIndex}`}
                  className="h-[10px] w-[10px] rounded-[2px] border border-black/10"
                  style={{ backgroundColor: contributionLevels[level] }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[12px] text-muted-foreground">
        <a href="#" className="hover:text-foreground">
          Learn how we count contributions
        </a>
        <div className="flex items-center gap-2">
          <span>Less</span>
          <div className="flex gap-[3px]">
            {contributionLevels.map((color) => (
              <span
                key={color}
                className="h-[10px] w-[10px] rounded-[2px] border border-black/10"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

function UserProfileOverviewView({
  state = "populated-default",
  initialTab = "overview",
}: UserProfileOverviewProps) {
  const [selectedTab, setSelectedTab] = React.useState<ProfileTab>(initialTab);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedYear, setSelectedYear] = React.useState("2026");

  return (
    <div className="min-h-screen bg-background text-foreground" data-state={state}>
      <header className="border-b border-border bg-[linear-gradient(180deg,#0d1624_0%,#0f1726_100%)] px-4">
        <div className="mx-auto flex h-16 max-w-[1560px] items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <HeaderIconButton>
              <Menu className="h-4 w-4" />
            </HeaderIconButton>
            <Github className="h-8 w-8 text-foreground" />
            <span className="text-[20px] font-semibold">OnderCampos</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center rounded-md border border-border bg-transparent px-3 md:flex md:h-9 md:w-[170px] lg:w-[320px]">
              <Search className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Type / to search"
                className="h-auto border-0 bg-transparent px-0 py-0 text-sm shadow-none focus-visible:ring-0"
              />
            </div>
            <HeaderIconButton>
              <Grip className="h-4 w-4" />
            </HeaderIconButton>
            <HeaderIconButton>
              <PlusIcon />
            </HeaderIconButton>
            <HeaderIconButton>
              <CircleIcon />
            </HeaderIconButton>
            <HeaderIconButton>
              <Users className="h-4 w-4" />
            </HeaderIconButton>
            <HeaderIconButton>
              <Monitor className="h-4 w-4" />
            </HeaderIconButton>
            <HeaderIconButton>
              <Box className="h-4 w-4" />
            </HeaderIconButton>
            <Avatar className="h-8 w-8 border border-border">
              <AvatarImage src="/Frida.png" alt="OnderCampos avatar" />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="mx-auto max-w-[1560px]">
          <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as ProfileTab)}>
            <TabsList className="h-auto gap-4 rounded-none bg-transparent p-0 text-sm text-muted-foreground">
              {profileTabs.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="data-[state=active]:border-b-[2px] data-[state=active]:border-[#f78166] data-[state=active]:bg-transparent data-[state=active]:text-foreground h-12 rounded-none border-b-2 border-transparent px-0 pb-3 pt-3 text-sm font-medium text-muted-foreground shadow-none focus-visible:ring-0"
                  >
                    <TabIcon className="h-4 w-4" />
                    {tab.label}
                    {typeof tab.count === "number" ? (
                      <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-[12px] text-foreground">
                        {tab.count}
                      </span>
                    ) : null}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1560px] grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:px-10">
        <aside>
          <div className="sticky top-6">
            <div className="relative mb-4 w-fit">
              <Avatar className="h-[260px] w-[260px] border-4 border-background">
                <AvatarImage src="/Frida.png" alt="OnderCampos profile photo" className="object-cover" />
                <AvatarFallback className="text-5xl">OC</AvatarFallback>
              </Avatar>
              <button
                type="button"
                className="absolute bottom-7 right-2 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-[var(--shadow-elevated)] hover:text-foreground"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <h1 className="text-[40px] leading-[1.1] font-semibold tracking-[-0.02em] text-foreground">
              Onder Francisco Campos Garcia
            </h1>
            <p className="mt-1 text-[20px] text-muted-foreground">OnderCampos</p>

            <Button variant="outline" className="mt-5 h-8 w-full bg-card text-sm font-semibold hover:bg-accent">
              Edit profile
            </Button>

            <div className="mt-4 flex items-center gap-1 text-[14px] text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="text-foreground">2 followers</span>
              <span>·</span>
              <span className="text-foreground">1 following</span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[14px]">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>Softtek</span>
            </div>

            <div className="mt-5 border-t border-border pt-5">
              <h2 className="mb-4 text-[16px] font-semibold">Achievements</h2>
              <div className="flex gap-2">
                {achievements.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/30 bg-[radial-gradient(circle_at_30%_30%,#ffffff_0,#d2a8ff_18%,#58a6ff_38%,#7adc97_70%,#f78166_100%)] text-[28px] shadow-[var(--shadow-card)]"
                  >
                    {achievement}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-border pt-5">
              <h2 className="text-[16px] font-semibold">Organizations</h2>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-[20px] font-semibold">Popular repositories</h2>
            <button type="button" className="text-[12px] text-[#2f81f7] hover:underline">
              Customize your pins
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {repositories.map((repository) => (
              <RepoCard key={repository.name} repository={repository} />
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="mb-3 text-[28px] leading-none font-normal text-foreground">
                471 contributions in the last year
              </h3>
              <ContributionsHeatmap />
            </div>
            <div className="flex flex-row gap-2 xl:flex-col xl:pt-1">
              {years.map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  className={cn(
                    "rounded-md px-4 py-3 text-left text-[14px] text-muted-foreground transition hover:bg-accent hover:text-foreground xl:min-w-[108px]",
                    selectedYear === year && "bg-[#1f6feb] text-white hover:bg-[#1f6feb]"
                  )}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-[32px] font-normal text-foreground">Contribution activity</h2>
            <div className="mt-4 flex items-center gap-4 text-[14px] font-semibold text-[#a5b4fc]">
              <span>September 2026</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 3.5v9M3.5 8h9" strokeLinecap="round" />
    </svg>
  );
}

function CircleIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="4.5" />
    </svg>
  );
}

export default function HomePage() {
  return <UserProfileOverviewView state="populated-default" initialTab="overview" />;
}
