"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Bell,
  BookOpen,
  Building2,
  Dot,
  Github,
  Grid3X3,
  Link2,
  Menu,
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

type ProfileTab = "overview" | "repositories" | "projects" | "packages" | "stars";

type RepositoryItem = {
  id: string;
  name: string;
  description?: string;
  language: string;
  languageColor: string;
  isFork?: boolean;
  forkedFrom?: string;
  visibility?: "Public";
};

export type UserProfileOverviewViewProps = {
  state?: "default";
  selectedTab?: ProfileTab;
  user?: {
    handle: string;
    fullName: string;
    company: string;
    followers: number;
    following: number;
    organization: string;
    avatarSrc: string;
  };
  repositories?: RepositoryItem[];
  contributionCount?: number;
  contributionYear?: string;
};

const defaultUser = {
  handle: "OnderCampos",
  fullName: "Onder Francisco Campos Garcia",
  company: "Softtek",
  followers: 2,
  following: 1,
  organization: "Softtek",
  avatarSrc: "/Frida.png",
};

const defaultRepositories: RepositoryItem[] = [
  {
    id: "1",
    name: "open-interpreter",
    description: "A natural language interface for computers",
    language: "Python",
    languageColor: "#4493f8",
    isFork: true,
    forkedFrom: "openinterpreter/openinterpreter",
    visibility: "Public",
  },
  {
    id: "2",
    name: "CountBoxingSofttek",
    language: "Python",
    languageColor: "#4493f8",
    visibility: "Public",
  },
  {
    id: "3",
    name: "count_colors",
    language: "Python",
    languageColor: "#4493f8",
    visibility: "Public",
  },
  {
    id: "4",
    name: "pushtest",
    language: "Python",
    languageColor: "#4493f8",
    visibility: "Public",
  },
  {
    id: "5",
    name: "SAP-Cleaning-Frontend",
    language: "TypeScript",
    languageColor: "#2f81f7",
    visibility: "Public",
  },
  {
    id: "6",
    name: "FridaProductPlannerWebBackend",
    language: "Python",
    languageColor: "#4493f8",
    visibility: "Public",
  },
];

const tabItems: Array<{ value: ProfileTab; label: string; count?: number }> = [
  { value: "overview", label: "Overview" },
  { value: "repositories", label: "Repositories", count: 16 },
  { value: "projects", label: "Projects" },
  { value: "packages", label: "Packages" },
  { value: "stars", label: "Stars" },
];

const contributionLevels = ["#212830", "#0e4429", "#006d32", "#26a641", "#39d353"];

function RepositoryCard({ repository }: { repository: RepositoryItem }) {
  return (
    <Card className="min-h-[102px] gap-0 rounded-lg border border-border bg-background px-4 py-4 shadow-none">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-[20px] font-semibold text-[#2f81f7]">{repository.name}</h3>
          {repository.isFork && repository.forkedFrom ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Forked from <span className="border-b border-muted-foreground">{repository.forkedFrom}</span>
            </p>
          ) : null}
        </div>
        <span className="rounded-full border border-border px-2 py-[1px] text-xs text-muted-foreground">
          {repository.visibility ?? "Public"}
        </span>
      </div>
      {repository.description ? (
        <p className="mt-4 text-sm leading-5 text-foreground">{repository.description}</p>
      ) : (
        <div className="mt-4 h-5" />
      )}
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <span
          className="size-3 rounded-full"
          style={{ backgroundColor: repository.languageColor }}
        />
        <span>{repository.language}</span>
      </div>
    </Card>
  );
}

function ContributionHeatmap({ contributionCount, contributionYear }: { contributionCount: number; contributionYear: string }) {
  const cells = useMemo(() => {
    return Array.from({ length: 53 * 7 }, (_, index) => {
      const column = Math.floor(index / 7);
      const row = index % 7;
      const wave = Math.sin(column / 3) + Math.cos((column + row) / 5);
      const cluster = [4, 5, 18, 19, 20, 27, 28, 29, 42, 48, 49, 50].includes(column);
      const intensity = cluster ? 4 - (row % 2) : wave > 1 ? 3 : wave > 0.35 ? 2 : wave > -0.1 ? 1 : 0;
      return contributionLevels[Math.max(0, Math.min(4, intensity))];
    });
  }, []);

  const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const years = [contributionYear, "2025", "2024", "2023"];

  return (
    <div className="mt-8 flex gap-6">
      <div className="min-w-0 flex-1">
        <div className="mb-3 text-[30px] font-normal text-foreground">
          {contributionCount} contributions in the last year
        </div>
        <Card className="gap-0 rounded-lg border border-border bg-background px-4 py-4 shadow-none">
          <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
            <div className="ml-8 flex gap-[26px]">
              {months.map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
            <button className="hover:text-foreground">Contribution settings ▾</button>
          </div>
          <div className="flex gap-3">
            <div className="mt-2 flex flex-col gap-[10px] text-xs text-muted-foreground">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
              {cells.map((color, index) => (
                <button
                  key={index + 1}
                  aria-label={`Contribution day ${index + 1}`}
                  className="size-[11px] rounded-[2px] border border-black/10"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <button className="hover:text-foreground">Learn how we count contributions</button>
            <div className="flex items-center gap-2">
              <span>Less</span>
              <div className="flex gap-[3px]">
                {contributionLevels.map((color) => (
                  <span
                    key={color}
                    className="size-[10px] rounded-[2px]"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </Card>
        <div className="mt-8">
          <div className="mb-4 text-[28px] font-normal text-foreground">Contribution activity</div>
          <div className="flex items-center gap-4 text-sm font-semibold text-foreground">
            <span>September {contributionYear}</span>
            <div className="h-px flex-1 bg-border" />
          </div>
        </div>
      </div>
      <div className="hidden w-[104px] shrink-0 sm:block">
        <div className="space-y-2 pt-[34px]">
          {years.map((year, index) => (
            <button
              key={year}
              className={cn(
                "flex h-11 w-full items-center rounded-md px-4 text-sm text-muted-foreground hover:bg-card hover:text-foreground",
                index === 0 && "bg-[#2f67c4] text-white hover:bg-[#2f67c4]"
              )}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function UserProfileOverviewView({
  state = "default",
  selectedTab = "overview",
  user = defaultUser,
  repositories = defaultRepositories,
  contributionCount = 471,
  contributionYear = "2026",
}: UserProfileOverviewViewProps) {
  const [activeTab, setActiveTab] = useState<ProfileTab>(selectedTab);
  const [searchValue, setSearchValue] = useState("");

  const visibleRepositories = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return repositories;
    return repositories.filter((repository) => repository.name.toLowerCase().includes(query));
  }, [repositories, searchValue]);

  return (
    <div data-state={state} className="min-h-screen bg-background text-foreground">
      <header className="border-b border-[#30363d] bg-panel">
        <div className="flex h-22 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon-sm" className="rounded-md border border-border bg-transparent text-muted-foreground hover:bg-card hover:text-foreground">
              <Menu className="size-4" />
            </Button>
            <Github className="size-8 text-white" />
            <div className="text-[22px] font-semibold">{user.handle}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-md border border-border bg-background px-3 md:flex md:h-10 md:w-[340px]">
              <Search className="size-4 text-muted-foreground" />
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Type / to search"
                className="h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            {[BookOpen, Bell, Plus].map((Icon, index) => (
              <Button key={index + 1} variant="ghost" size="icon-sm" className="rounded-md border border-border text-muted-foreground hover:bg-card hover:text-foreground">
                <Icon className="size-4" />
              </Button>
            ))}
            <Avatar className="size-9 border border-border">
              <AvatarImage src={user.avatarSrc} alt={user.handle} />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="border-t border-[#21262d] px-4 lg:px-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ProfileTab)} className="gap-0">
            <TabsList className="h-auto w-full justify-start gap-6 rounded-none bg-transparent p-0 text-sm">
              {tabItems.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:text-foreground relative h-12 rounded-none border-0 px-0 text-[20px] font-normal text-muted-foreground shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-none after:absolute after:right-0 after:bottom-[-1px] after:left-0 after:h-0.5 after:rounded-full after:bg-transparent data-[state=active]:after:bg-[#f78166]"
                >
                  {tab.label}
                  {tab.count ? <span className="rounded-full bg-card px-2 py-[1px] text-xs text-foreground">{tab.count}</span> : null}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </header>

      <main className="mx-auto max-w-[1150px] px-4 py-8 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-[296px_minmax(0,1fr)]">
          <aside>
            <div className="relative w-full max-w-[296px]">
              <Avatar className="h-[296px] w-[296px] border border-border">
                <AvatarImage src={user.avatarSrc} alt={user.fullName} className="object-cover" />
                <AvatarFallback className="text-5xl">OC</AvatarFallback>
              </Avatar>
              <button className="absolute right-3 bottom-7 flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground">
                <BadgeCheck className="size-4" />
              </button>
            </div>

            <div className="mt-5 max-w-[296px]">
              <h1 className="text-[26px] leading-8 font-semibold">{user.fullName}</h1>
              <div className="mt-1 text-[22px] text-muted-foreground">{user.handle}</div>
              <Button variant="outline" className="mt-5 h-10 w-full rounded-md border-border bg-card text-[15px] font-semibold hover:bg-[#2e353e]">
                Edit profile
              </Button>
              <div className="mt-5 flex items-center text-[15px] text-muted-foreground">
                <Users className="mr-1 size-4" />
                <span className="font-semibold text-foreground">{user.followers}</span>
                <span className="ml-1">followers</span>
                <Dot className="size-4" />
                <span className="font-semibold text-foreground">{user.following}</span>
                <span className="ml-1">following</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[15px] text-foreground">
                <Building2 className="size-4 text-muted-foreground" />
                {user.company}
              </div>
              <div className="mt-4 flex items-center gap-2 text-[15px] text-foreground">
                <Link2 className="size-4 text-muted-foreground" />
                {user.organization}
              </div>
              <div className="mt-6 border-t border-[#30363d] pt-6">
                <div className="mb-4 text-[22px] font-semibold">Achievements</div>
                <div className="flex items-center gap-1.5">
                  {[
                    ["#f4b8c6", "✿"],
                    ["#f4d166", "🤠"],
                    ["#7dc7ff", "❄"],
                    ["#9ee6a1", "🫛"],
                  ].map(([color, label], index) => (
                    <div key={index + 1} className="relative flex size-[52px] items-center justify-center rounded-full border-2 border-white/70 text-2xl shadow-sm" style={{ backgroundColor: color }}>
                      <span>{label}</span>
                      {index === 2 ? <span className="absolute -right-2 bottom-0 rounded-full bg-[#c58b57] px-1.5 text-[11px] font-semibold text-black">x2</span> : null}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 border-t border-[#30363d] pt-6">
                <div className="mb-4 text-[22px] font-semibold">Organizations</div>
                <div className="flex items-center gap-2 text-[15px] text-foreground">
                  <Grid3X3 className="size-4 text-muted-foreground" />
                  Softtek
                </div>
              </div>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[28px] font-normal">Popular repositories</h2>
              <button className="text-sm text-[#2f81f7] hover:underline">Customize your pins</button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {visibleRepositories.map((repository) => (
                <RepositoryCard key={repository.id} repository={repository} />
              ))}
            </div>
            <ContributionHeatmap contributionCount={contributionCount} contributionYear={contributionYear} />
          </section>
        </div>
      </main>
    </div>
  );
}
