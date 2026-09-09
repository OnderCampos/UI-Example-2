"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  CircleDot,
  Edit2,
  Eye,
  Github,
  Grip,
  History,
  LayoutGrid,
  Menu,
  Package,
  Search,
  Star,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type UserProfileOverviewState = "default";

type UserProfileOverviewProps = {
  state?: UserProfileOverviewState;
};

type ProfileTab = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: string;
};

type RepositoryCard = {
  name: string;
  visibility: string;
  source?: string;
  description?: string;
  language: string;
  languageColorVar: string;
};

type AchievementItem = {
  id: string;
  emoji: string;
  background: string;
  count?: string;
};

type ContributionLevel = 0 | 1 | 2 | 3 | 4;

type YearOption = "2026" | "2025" | "2024" | "2023";

const profileTabs: ProfileTab[] = [
  { id: "overview", label: "Overview", icon: BookOpen },
  { id: "repositories", label: "Repositories", icon: Eye, count: "16" },
  { id: "projects", label: "Projects", icon: LayoutGrid },
  { id: "packages", label: "Packages", icon: Package },
  { id: "stars", label: "Stars", icon: Star },
];

const repositoryCards: RepositoryCard[] = [
  {
    name: "open-interpreter",
    visibility: "Public",
    source: "Forked from openinterpreter/openinterpreter",
    description: "A natural language interface for computers",
    language: "Python",
    languageColorVar: "var(--python)",
  },
  {
    name: "CountBoxingSofttek",
    visibility: "Public",
    language: "Python",
    languageColorVar: "var(--python)",
  },
  {
    name: "count_colors",
    visibility: "Public",
    language: "Python",
    languageColorVar: "var(--python)",
  },
  {
    name: "pushtest",
    visibility: "Public",
    language: "Python",
    languageColorVar: "var(--python)",
  },
  {
    name: "SAP-Cleaning-Frontend",
    visibility: "Public",
    language: "TypeScript",
    languageColorVar: "var(--typescript)",
  },
  {
    name: "FridaProductPlannerWebBackend",
    visibility: "Public",
    language: "Python",
    languageColorVar: "var(--python)",
  },
];

const achievements: AchievementItem[] = [
  { id: "1", emoji: "💖", background: "linear-gradient(135deg,#f7a1d7,#f78166)" },
  { id: "2", emoji: "🧑‍🏫", background: "linear-gradient(135deg,#f6d365,#fda085)" },
  { id: "3", emoji: "🧊", background: "linear-gradient(135deg,#58a6ff,#79c0ff)", count: "x2" },
  { id: "4", emoji: "🫛", background: "linear-gradient(135deg,#9be9a8,#3fb950)" },
];

const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const weekdays = [
  { label: "Mon", row: 1 },
  { label: "Wed", row: 3 },
  { label: "Fri", row: 5 },
];

const contributionColumns: ContributionLevel[][] = [
  [0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 2, 1, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 1, 2, 0, 0, 0, 0],
  [0, 0, 3, 0, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 2, 1, 0],
  [0, 0, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 1, 0],
  [0, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 2, 1, 0, 0],
  [0, 0, 0, 1, 3, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 0],
  [0, 1, 3, 2, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0],
  [0, 0, 0, 2, 2, 1, 0],
  [0, 1, 0, 1, 0, 0, 0],
  [0, 2, 1, 0, 0, 0, 0],
  [0, 1, 0, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 3, 2, 0],
  [0, 0, 0, 2, 2, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 2, 2, 1, 1, 0, 0],
  [0, 2, 2, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 2, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0],
  [0, 0, 1, 0, 0, 0, 0],
  [0, 1, 4, 4, 3, 2, 0],
  [0, 3, 4, 3, 2, 1, 0],
];

function HeaderIconButton({ children, hasDot = false }: { children: React.ReactNode; hasDot?: boolean }) {
  return (
    <button className="relative flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border)] bg-transparent text-[var(--icon-color)] hover:bg-[var(--surface-hover)] hover:text-[var(--icon-color-active)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">
      {hasDot ? <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[var(--primary)]" /> : null}
      {children}
    </button>
  );
}

function ContributionCell({ level }: { level: ContributionLevel }) {
  const backgrounds = [
    "var(--surface-elevated)",
    "var(--contribution-low)",
    "var(--contribution-medium)",
    "var(--contribution-high)",
    "var(--contribution-highest)",
  ];

  return (
    <span
      className="block h-[10px] w-[10px] rounded-[2px] border border-transparent"
      style={{ backgroundColor: backgrounds[level] }}
    />
  );
}

function UserProfileOverviewView({ state = "default" }: UserProfileOverviewProps) {
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedYear, setSelectedYear] = useState<YearOption>("2026");
  const [contributionMode, setContributionMode] = useState("private");

  const visibleTab = useMemo(() => {
    return profileTabs.find((tab) => tab.id === activeTab)?.id ?? state;
  }, [activeTab, state]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="border-b border-[var(--border)] bg-[linear-gradient(90deg,var(--background-deep)_0%,#0c1420_55%,var(--background-deep)_100%)]">
        <div className="mx-auto flex h-[var(--layout-header-height)] max-w-[var(--layout-content-max-width)] items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <HeaderIconButton>
              <Menu className="h-4 w-4" />
            </HeaderIconButton>
            <Github className="h-8 w-8 text-[var(--foreground)]" />
            <span className="text-[15px] font-semibold text-[var(--foreground)]">OnderCampos</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-[272px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
              <Input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Type / to search"
                className="h-8 border-[var(--border)] bg-[var(--input-background)] pl-9 pr-3 text-sm text-[var(--text)] placeholder:text-[var(--input-placeholder)]"
              />
            </div>
            <HeaderIconButton>
              <Grip className="h-4 w-4" />
            </HeaderIconButton>
            <div className="mx-1 h-5 w-px bg-[var(--border)]" />
            <HeaderIconButton>
              <span className="text-lg leading-none">＋</span>
            </HeaderIconButton>
            <HeaderIconButton>
              <CircleDot className="h-4 w-4" />
            </HeaderIconButton>
            <HeaderIconButton>
              <BriefcaseBusiness className="h-4 w-4" />
            </HeaderIconButton>
            <HeaderIconButton>
              <Package className="h-4 w-4" />
            </HeaderIconButton>
            <HeaderIconButton>
              <Bell className="h-4 w-4" />
            </HeaderIconButton>
            <div className="mx-1 h-5 w-px bg-[var(--border)]" />
            <button className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">
              <Avatar className="h-8 w-8 border border-[var(--border)]">
                <AvatarImage src="/Frida.png" alt="OnderCampos" />
                <AvatarFallback>OC</AvatarFallback>
              </Avatar>
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-[var(--layout-content-max-width)] px-4">
          <nav className="flex h-12 items-end gap-1 overflow-x-auto">
            {profileTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="relative flex h-full items-center gap-2 border-b-2 px-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]"
                  style={{ borderBottomColor: isActive ? "var(--tab-indicator)" : "transparent", color: isActive ? "var(--text)" : undefined }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.count ? (
                    <span className="rounded-full bg-[var(--surface-elevated)] px-1.5 py-[1px] text-[11px] leading-4 text-[var(--text-secondary)]">
                      {tab.count}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[var(--layout-content-max-width)] px-4 pb-12 pt-8">
        <div className="grid grid-cols-[280px_minmax(0,1fr)] gap-[var(--layout-column-gap)]">
          <aside>
            <div className="relative mb-4 w-[264px] max-w-full">
              <Image
                src="/Frida.png"
                alt="Onder Francisco Campos Garcia"
                width={264}
                height={264}
                className="h-[264px] w-[264px] rounded-full border border-[var(--border)] object-cover"
              />
              <button className="absolute bottom-8 right-2 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] shadow-[var(--shadow-md)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]">
                <Edit2 className="h-4 w-4" />
              </button>
            </div>

            <h1 className="max-w-[260px] text-[40px] leading-[1.05] font-semibold tracking-[-0.02em] text-[var(--text)]">
              Onder Francisco Campos Garcia
            </h1>
            <p className="mt-1 text-[20px] text-[var(--text-muted)]">OnderCampos</p>

            <Button
              variant="outline"
              className="mt-4 h-8 w-full justify-center border-[var(--border)] bg-[var(--surface-elevated)] text-sm font-semibold text-[var(--text)] hover:bg-[var(--surface-hover)]"
            >
              Edit profile
            </Button>

            <div className="mt-4 flex items-center gap-1 text-sm text-[var(--text-secondary)]">
              <Users className="h-4 w-4 text-[var(--text-muted)]" />
              <button className="font-medium text-[var(--text-secondary)] hover:text-[var(--primary)]">2 followers</button>
              <span>·</span>
              <button className="font-medium text-[var(--text-secondary)] hover:text-[var(--primary)]">1 following</button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <Building2 className="h-4 w-4 text-[var(--text-muted)]" />
              <button className="hover:text-[var(--primary)]">Softtek</button>
            </div>

            <Separator className="my-5 bg-[var(--border-muted)]" />

            <section>
              <h2 className="mb-4 text-[22px] font-semibold text-[var(--text)]">Achievements</h2>
              <div className="flex items-center gap-2">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="relative">
                    <button
                      className="flex h-13 w-13 items-center justify-center rounded-full border border-white/25 text-[26px] shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                      style={{ background: achievement.background }}
                    >
                      {achievement.emoji}
                    </button>
                    {achievement.count ? (
                      <span className="absolute -bottom-1 -right-1 rounded-full bg-[#d29922] px-1.5 py-[1px] text-[11px] font-semibold text-black">
                        {achievement.count}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-5 bg-[var(--border-muted)]" />

            <section>
              <h2 className="text-[22px] font-semibold text-[var(--text)]">Organizations</h2>
            </section>
          </aside>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[var(--text)]">Popular repositories</h2>
              <button className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]">
                Customize your pins
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {repositoryCards.map((repository) => (
                <Card key={repository.name} className="gap-0 rounded-md border-[var(--card-border)] bg-[var(--card-background)] py-0 shadow-none">
                  <CardContent className="flex h-full min-h-[126px] flex-col px-4 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <button className="text-left text-[20px] font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)]">
                        {repository.name}
                      </button>
                      <span className="rounded-full border border-[var(--border)] px-2 py-[1px] text-xs text-[var(--text-muted)]">
                        {repository.visibility}
                      </span>
                    </div>
                    <div className="mt-1 space-y-2 text-sm text-[var(--text-muted)]">
                      {repository.source ? <p>{repository.source}</p> : null}
                      {repository.description ? <p className="text-[var(--text-secondary)]">{repository.description}</p> : null}
                    </div>
                    <div className="mt-auto flex items-center gap-2 pt-5 text-sm text-[var(--text-muted)]">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: repository.languageColorVar }} />
                      <span>{repository.language}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-8">
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-[28px] font-semibold text-[var(--text)]">471 contributions in the last year</h2>
                  <Select value={contributionMode} onValueChange={setContributionMode}>
                    <SelectTrigger className="h-8 border-0 bg-transparent px-0 text-sm text-[var(--text-muted)] shadow-none hover:text-[var(--text)] focus-visible:ring-0">
                      <SelectValue placeholder="Contribution settings" />
                    </SelectTrigger>
                    <SelectContent className="border-[var(--border)] bg-[var(--surface)] text-[var(--text)]">
                      <SelectItem value="private">Contribution settings</SelectItem>
                      <SelectItem value="public">Public activity only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-4">
                  <div className="grid grid-cols-[32px_minmax(0,1fr)] gap-3">
                    <div className="pt-7 text-xs text-[var(--text-muted)]">
                      {weekdays.map((day) => (
                        <div key={day.label} className="h-[24px] leading-[24px]" style={{ marginTop: day.row === 1 ? 0 : 0 }}>
                          {day.label}
                        </div>
                      ))}
                    </div>
                    <div className="min-w-0">
                      <div className="mb-3 grid grid-cols-12 text-xs text-[var(--text-muted)]">
                        {months.map((month) => (
                          <span key={month}>{month}</span>
                        ))}
                      </div>
                      <div className="flex gap-[3px] overflow-hidden">
                        {contributionColumns.map((column, columnIndex) => (
                          <div key={`column-${columnIndex}`} className="grid grid-rows-7 gap-[3px]">
                            {column.map((level, rowIndex) => (
                              <ContributionCell key={`cell-${columnIndex}-${rowIndex}`} level={level} />
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-muted)]">
                        <button className="hover:text-[var(--text)]">Learn how we count contributions</button>
                        <div className="flex items-center gap-2">
                          <span>Less</span>
                          <div className="flex gap-[3px]">
                            {[0, 1, 2, 3, 4].map((level) => (
                              <ContributionCell key={`legend-${level}`} level={level as ContributionLevel} />
                            ))}
                          </div>
                          <span>More</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <section className="mt-8">
                  <h2 className="text-[28px] font-semibold text-[var(--text)]">Contribution activity</h2>
                  <div className="mt-4 flex items-center gap-4 text-sm font-semibold text-[var(--text-secondary)]">
                    <span>September 2026</span>
                    <div className="h-px flex-1 bg-[var(--border)]" />
                  </div>
                </section>
              </div>

              <div className="w-[92px] shrink-0 pt-11">
                <div className="flex flex-col gap-2 text-sm">
                  {(["2026", "2025", "2024", "2023"] as YearOption[]).map((year) => {
                    const isSelected = selectedYear === year;
                    return (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className="rounded-md px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                        style={{
                          backgroundColor: isSelected ? "var(--primary-active)" : "transparent",
                          color: isSelected ? "#ffffff" : "var(--text-muted)",
                        }}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <div className="hidden">{visibleTab}</div>
    </div>
  );
}

export default function HomePage() {
  return <UserProfileOverviewView state="default" />;
}
