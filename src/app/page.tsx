"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  BookOpen,
  Boxes,
  Building2,
  ChevronDown,
  Eye,
  Github,
  Menu,
  Package,
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

type UserProfileOverviewState = "default";

type RepositoryItem = {
  name: string;
  description?: string;
  language: "Python" | "TypeScript";
  forkedFrom?: string;
  isPublic?: boolean;
};

type UserProfileOverviewViewProps = {
  state?: UserProfileOverviewState;
  activeTab?: "overview" | "repositories" | "projects" | "packages" | "stars";
  selectedYear?: "2026" | "2025" | "2024" | "2023";
};

const repositories: RepositoryItem[] = [
  {
    name: "open-interpreter",
    description: "A natural language interface for computers",
    language: "Python",
    forkedFrom: "openinterpreter/openinterpreter",
    isPublic: true,
  },
  { name: "CountBoxingSofttek", language: "Python", isPublic: true },
  { name: "count_colors", language: "Python", isPublic: true },
  { name: "pushtest", language: "Python", isPublic: true },
  { name: "SAP-Cleaning-Frontend", language: "TypeScript", isPublic: true },
  { name: "FridaProductPlannerWebBackend", language: "Python", isPublic: true },
];

const contributionMonths = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const contributionRows = ["Mon", "Wed", "Fri"];
const contributionData = [
  [0,0,0,0,1,2,0,0,0,0,0,0,0,0,2,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,3,4,2],
  [0,0,1,0,0,1,0,0,0,2,0,0,0,1,0,0,0,0,3,0,0,1,4,0,0,0,0,3,0,1,0,0,0,0,0,0,0,2,0,0,0,4,2,1],
  [2,1,0,0,0,0,0,1,0,0,0,2,0,0,0,0,1,0,0,0,2,0,1,0,0,3,0,1,0,0,0,0,4,0,0,0,0,1,0,2,0,0,4,3],
  [0,2,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,2,0,3,0,0,0,1,0,2,0,0,3,0,0,0,0,0,0,2,0,0,0,0,1,4,0,0],
  [1,0,0,0,1,0,0,0,2,0,0,0,0,0,0,1,0,4,0,0,1,0,0,2,0,0,4,1,0,0,0,0,0,0,0,0,0,0,3,0,0,2,4,0],
  [0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,2,0,1,0,0,0,0,0,1,0,0,3,0,0,0,0,0,1,0,0,0,0,0,0,0,3,2,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

function contributionColor(level: number) {
  if (level >= 4) return "bg-[#7adc97]";
  if (level === 3) return "bg-[#4caf50]";
  if (level === 2) return "bg-[#2e7d32]";
  if (level === 1) return "bg-[#1f4d2f]";
  return "bg-[#2d333b]";
}

function ProfileRepositoryCard({ repository }: { repository: RepositoryItem }) {
  return (
    <Card className="gap-0 rounded-lg border-border bg-background py-0 shadow-none">
      <CardContent className="flex h-full min-h-[88px] flex-col justify-between p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <button className="truncate text-left text-[15px] font-semibold text-[#4493f8] hover:underline">
              {repository.name}
            </button>
            {repository.forkedFrom ? (
              <p className="mt-1 text-xs text-muted-foreground">
                Forked from <span className="border-b border-muted-foreground/50">{repository.forkedFrom}</span>
              </p>
            ) : null}
            {repository.description ? (
              <p className="mt-4 text-sm text-foreground/90">{repository.description}</p>
            ) : null}
          </div>
          {repository.isPublic ? (
            <Badge variant="outline" className="rounded-full border-border bg-transparent px-2 py-0 text-[11px] text-muted-foreground">
              Public
            </Badge>
          ) : null}
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className={cn("size-3 rounded-full", repository.language === "TypeScript" ? "bg-[#3178c6]" : "bg-[#58a6ff]")} />
          <span>{repository.language}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function UserProfileOverviewView({
  state = "default",
  activeTab = "overview",
  selectedYear = "2026",
}: UserProfileOverviewViewProps) {
  const [searchValue, setSearchValue] = useState("");
  const [tabValue, setTabValue] = useState(activeTab);
  const [yearValue, setYearValue] = useState(selectedYear);
  const [settingsLabel, setSettingsLabel] = useState("Contribution settings");

  const filteredRepositories = useMemo(() => {
    if (!searchValue.trim()) return repositories;
    return repositories.filter((repo) => repo.name.toLowerCase().includes(searchValue.toLowerCase()));
  }, [searchValue]);

  return (
    <main data-state={state} className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-[#0d1117] px-4">
        <div className="mx-auto flex h-[88px] max-w-[1280px] flex-col justify-center gap-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon-sm" className="border border-border text-muted-foreground hover:bg-[var(--color-hover-surface)] hover:text-foreground">
                <Menu className="size-4" />
              </Button>
              <Github className="size-8" />
              <span className="text-sm font-semibold">OnderCampos</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden w-[340px] md:block">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Type / to search"
                  className="h-8 border-border bg-transparent pl-9 text-sm"
                />
              </div>
              <div className="flex items-center gap-2">
                {[
                  <BookOpen key="book" className="size-4" />,
                  <Package key="package" className="size-4" />,
                  <PlusIcon key="plus" />,
                  <Eye key="eye" className="size-4" />,
                ].map((icon, index) => (
                  <Button key={index} variant="ghost" size="icon-sm" className="border border-border text-muted-foreground hover:bg-[var(--color-hover-surface)] hover:text-foreground">
                    {icon}
                  </Button>
                ))}
                <Avatar className="size-8 border border-border">
                  <AvatarImage src="/Frida.png" alt="OnderCampos" />
                  <AvatarFallback>OC</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          <Tabs value={tabValue} onValueChange={(value) => setTabValue(value as UserProfileOverviewViewProps["activeTab"])} className="gap-0">
            <TabsList className="h-auto w-full justify-start gap-5 rounded-none bg-transparent p-0 text-sm">
              {[
                { value: "overview", label: "Overview", icon: BookOpen },
                { value: "repositories", label: "Repositories", icon: Package, count: 16 },
                { value: "projects", label: "Projects", icon: Boxes },
                { value: "packages", label: "Packages", icon: Package },
                { value: "stars", label: "Stars", icon: Star },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="h-11 rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-3 text-sm text-muted-foreground shadow-none data-[state=active]:border-[#f78166] data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    <Icon className="size-4" />
                    {tab.label}
                    {tab.count ? (
                      <span className="ml-1 rounded-full bg-card px-1.5 py-0 text-[11px] leading-5 text-foreground">{tab.count}</span>
                    ) : null}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[296px_minmax(0,1fr)]">
        <aside>
          <div className="relative mx-auto w-fit lg:mx-0">
            <Avatar className="size-[260px] border border-border lg:size-[264px]">
              <AvatarImage src="/Frida.png" alt="OnderCampos" className="object-cover" />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
            <button className="absolute right-2 bottom-8 flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:bg-[var(--color-hover-surface)] hover:text-foreground">
              <BadgeCheck className="size-4" />
            </button>
          </div>

          <div className="mt-5">
            <h1 className="text-[2rem] leading-9 font-semibold">Onder Francisco Campos Garcia</h1>
            <p className="mt-1 text-[26px] leading-8 text-muted-foreground">OnderCampos</p>
          </div>

          <Button variant="outline" className="mt-5 h-8 w-full border-border bg-[#21262d] text-sm font-semibold text-foreground hover:bg-[var(--color-hover-surface)] hover:text-foreground">
            Edit profile
          </Button>

          <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="size-4" />
            <button className="hover:text-foreground">2 followers</button>
            <span>·</span>
            <button className="hover:text-foreground">1 following</button>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-foreground/90">
            <Building2 className="size-4 text-muted-foreground" />
            <span>Softtek</span>
          </div>

          <div className="mt-6 border-t border-border pt-4">
            <h2 className="text-xl font-semibold">Achievements</h2>
            <div className="mt-4 flex items-center gap-2">
              {[
                { label: "YOLO", color: "from-pink-300 to-orange-300" },
                { label: "Ninja", color: "from-yellow-300 to-orange-400" },
                { label: "Arctic", color: "from-sky-300 to-blue-400" },
                { label: "Pair", color: "from-lime-300 to-emerald-400" },
              ].map((item, index) => (
                <div key={item.label} className="relative">
                  <div className={cn("flex size-12 items-center justify-center rounded-full border border-white/50 bg-gradient-to-br text-[11px] font-bold text-background", item.color)}>
                    {item.label}
                  </div>
                  {index === 2 ? (
                    <span className="absolute -right-1 -bottom-1 rounded-full border border-background bg-[#f2cc60] px-1.5 text-[10px] font-semibold text-background">x2</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-4">
            <h2 className="text-xl font-semibold">Organizations</h2>
          </div>
        </aside>

        <section>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-medium">Popular repositories</h2>
            <button className="text-sm text-[#4493f8] hover:underline">Customize your pins</button>
          </div>

          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {filteredRepositories.map((repository) => (
              <ProfileRepositoryCard key={repository.name} repository={repository} />
            ))}
          </div>

          <div className="mt-8 flex items-end justify-between gap-4">
            <h2 className="text-[28px] leading-8 font-normal">471 contributions in the last year</h2>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <button
                className="flex items-center gap-1 hover:text-foreground"
                onClick={() => setSettingsLabel(settingsLabel === "Contribution settings" ? "Contribution visibility" : "Contribution settings")}
              >
                {settingsLabel}
                <ChevronDown className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-[minmax(0,1fr)_76px] gap-4">
            <Card className="gap-0 rounded-lg border-border bg-background py-0 shadow-none">
              <CardContent className="p-4">
                <div className="ml-8 grid grid-cols-12 gap-x-6 text-xs text-muted-foreground">
                  {contributionMonths.map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
                <div className="mt-2 flex gap-3">
                  <div className="flex w-7 flex-col gap-[14px] pt-2 text-xs text-muted-foreground">
                    {contributionRows.map((day) => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>
                  <div className="grid flex-1 grid-rows-7 gap-1 overflow-hidden">
                    {contributionData.map((row, rowIndex) => (
                      <div key={rowIndex} className="grid grid-cols-44 gap-1">
                        {row.map((value, columnIndex) => (
                          <button
                            key={`${rowIndex}-${columnIndex}`}
                            aria-label={`Week ${columnIndex + 1}, day ${rowIndex + 1}, level ${value}`}
                            className={cn("h-[11px] w-[11px] rounded-[2px] transition-transform hover:scale-110", contributionColor(value))}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <button className="hover:text-foreground">Learn how we count contributions</button>
                  <div className="flex items-center gap-2">
                    <span>Less</span>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2, 3, 4].map((value) => (
                        <span key={value} className={cn("h-[10px] w-[10px] rounded-[2px]", contributionColor(value))} />
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-2 pt-1 text-sm text-muted-foreground">
              {(["2026", "2025", "2024", "2023"] as const).map((year) => (
                <button
                  key={year}
                  onClick={() => setYearValue(year)}
                  className={cn(
                    "rounded-md px-3 py-2 text-left transition-colors hover:bg-[var(--color-hover-surface)] hover:text-foreground",
                    yearValue === year && "bg-[#1f6feb] text-white hover:bg-[#1f6feb]"
                  )}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-[32px] font-normal">Contribution activity</h2>
            <div className="mt-4 flex items-center gap-3 text-sm text-[#4493f8]">
              <span>September 2026</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function PlusIcon() {
  return <span className="text-base leading-none">＋</span>;
}

export default function HomePage() {
  return <UserProfileOverviewView state="default" />;
}
