"use client";

import { Fragment, useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  Building2,
  ChevronDown,
  Github,
  Grid3X3,
  Menu,
  Monitor,
  Search,
  Star,
  Users,
  FolderGit2,
  Package,
  SmilePlus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type UserProfileOverviewState = "default";

export type UserProfileOverviewProps = {
  state?: UserProfileOverviewState;
  profile?: ProfileData;
  selectedYear?: string;
  contributionSetting?: string;
  searchPlaceholder?: string;
};

type ProfileNavItem = {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
};

type RepositoryCard = {
  name: string;
  visibility: string;
  source?: string;
  description?: string;
  language: string;
  languageColor: string;
};

type Achievement = {
  id: string;
  emoji: string;
  background: string;
  count?: string;
};

type ContributionMonth = {
  label: string;
  start: number;
};

type ProfileData = {
  username: string;
  fullName: string;
  avatarSrc: string;
  followers: number;
  following: number;
  company: string;
  repositoriesCount: number;
  repositories: RepositoryCard[];
  achievements: Achievement[];
  contributionTotal: number;
  contributionMonths: ContributionMonth[];
  contributionGrid: number[][];
  years: string[];
  activityMonth: string;
};

const profileNavItems: ProfileNavItem[] = [
  { key: "overview", label: "Overview", icon: BookOpen },
  { key: "repositories", label: "Repositories", icon: FolderGit2, count: 16 },
  { key: "projects", label: "Projects", icon: Grid3X3 },
  { key: "packages", label: "Packages", icon: Package },
  { key: "stars", label: "Stars", icon: Star },
];

const defaultProfile: ProfileData = {
  username: "OnderCampos",
  fullName: "Onder Francisco Campos Garcia",
  avatarSrc: "/Frida.png",
  followers: 2,
  following: 1,
  company: "Softtek",
  repositoriesCount: 16,
  repositories: [
    {
      name: "open-interpreter",
      visibility: "Public",
      source: "Forked from openinterpreter/openinterpreter",
      description: "A natural language interface for computers",
      language: "Python",
      languageColor: "var(--token-python)",
    },
    {
      name: "CountBoxingSofttek",
      visibility: "Public",
      language: "Python",
      languageColor: "var(--token-python)",
    },
    {
      name: "count_colors",
      visibility: "Public",
      language: "Python",
      languageColor: "var(--token-python)",
    },
    {
      name: "pushtest",
      visibility: "Public",
      language: "Python",
      languageColor: "var(--token-python)",
    },
    {
      name: "SAP-Cleaning-Frontend",
      visibility: "Public",
      language: "TypeScript",
      languageColor: "var(--token-typescript)",
    },
    {
      name: "FridaProductPlannerWebBackend",
      visibility: "Public",
      language: "Python",
      languageColor: "var(--token-python)",
    },
  ],
  achievements: [
    { id: "1", emoji: "🧠", background: "linear-gradient(135deg,#f7b6d2,#d681ff,#83d0ff)" },
    { id: "2", emoji: "🥇", background: "linear-gradient(135deg,#ffe08a,#ff9f43,#ffcd56)" },
    { id: "3", emoji: "🧊", background: "linear-gradient(135deg,#79c0ff,#58a6ff,#1f6feb)", count: "x2" },
    { id: "4", emoji: "🫛", background: "linear-gradient(135deg,#d2f4c8,#7ee787,#2ea043)" },
  ],
  contributionTotal: 471,
  contributionMonths: [
    { label: "Sep", start: 0 },
    { label: "Oct", start: 4 },
    { label: "Nov", start: 9 },
    { label: "Dec", start: 13 },
    { label: "Jan", start: 18 },
    { label: "Feb", start: 22 },
    { label: "Mar", start: 27 },
    { label: "Apr", start: 31 },
    { label: "May", start: 36 },
    { label: "Jun", start: 40 },
    { label: "Jul", start: 45 },
    { label: "Aug", start: 49 },
  ],
  contributionGrid: [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,2],
    [0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,3,2,0,0,0,0,0,2,0,0,0,0,2,3,0,0,0,0,0,0,0,0,2,0,3,4,3],
    [0,0,0,1,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,1,0,2,1,4,0,0,0,2,0,3,0,1,0,0,0,2,0,0,0,2,2,0,0,0,0,0,4,0,1],
    [2,0,1,0,0,0,2,0,0,0,2,0,2,0,0,0,0,2,0,0,0,2,0,2,0,2,0,0,0,2,0,2,0,0,2,0,0,0,0,0,0,2,0,0,0,0,2,0,0,3,4,0],
    [1,2,0,0,2,0,2,1,0,2,0,0,0,0,0,0,2,0,2,0,2,0,0,2,0,0,2,0,2,0,2,0,0,0,2,0,0,0,0,0,2,0,0,0,2,0,0,0,0,4,3,0],
    [2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,2,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0],
  ],
  years: ["2026", "2025", "2024", "2023"],
  activityMonth: "September 2026",
};

export function UserProfileOverview({
  state = "default",
  profile = defaultProfile,
  selectedYear = "2026",
  contributionSetting = "Contribution settings",
  searchPlaceholder = "Type / to search",
}: UserProfileOverviewProps) {
  const [searchValue, setSearchValue] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [yearValue, setYearValue] = useState(selectedYear);
  const [settingsValue, setSettingsValue] = useState(contributionSetting);

  const contributionLegend = [0, 1, 2, 3, 4];

  const activeYear = useMemo(() => {
    return profile.years.includes(yearValue) ? yearValue : profile.years[0];
  }, [profile.years, yearValue]);

  return (
    <div data-state={state} className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-[var(--token-background-deep)]">
        <div className="mx-auto flex h-[var(--layout-header-height)] max-w-[1600px] items-center justify-between gap-4 px-4 lg:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <HeaderSquareButton aria-label="Open navigation">
              <Menu className="size-4" />
            </HeaderSquareButton>
            <Github className="size-8 shrink-0 text-foreground" />
            <span className="truncate text-sm font-semibold text-foreground">{profile.username}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden w-[272px] xl:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--token-text-muted)]" />
              <Input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder={searchPlaceholder}
                className="h-8 rounded-[var(--radius-sm)] border-border bg-input pl-9 pr-3 text-sm text-foreground shadow-none placeholder:text-[var(--token-text-muted)]"
              />
            </div>
            <HeaderSquareButton aria-label="Applications">
              <Grid3X3 className="size-4" />
            </HeaderSquareButton>
            <HeaderDivider />
            <HeaderSquareButton aria-label="Create new item" hasChevron>
              <span className="text-base leading-none">+</span>
            </HeaderSquareButton>
            <HeaderSquareButton aria-label="Issues">
              <BookOpen className="size-4" />
            </HeaderSquareButton>
            <HeaderSquareButton aria-label="Pull requests">
              <FolderGit2 className="size-4" />
            </HeaderSquareButton>
            <HeaderSquareButton aria-label="Discussions">
              <Monitor className="size-4" />
            </HeaderSquareButton>
            <HeaderSquareButton aria-label="Notifications">
              <Bell className="size-4" />
            </HeaderSquareButton>
            <Avatar className="size-8 border border-border">
              <AvatarImage src={profile.avatarSrc} alt={profile.username} />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="mx-auto flex max-w-[1600px] items-end gap-2 overflow-x-auto px-4 lg:px-6">
          {profileNavItems.map((item) => {
            const active = item.key === activeTab;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveTab(item.key)}
                className={cn(
                  "relative flex h-12 shrink-0 items-center gap-2 border-b-2 px-2 text-sm transition-colors",
                  active
                    ? "border-[var(--token-tab-indicator)] text-foreground"
                    : "border-transparent text-[var(--token-text-secondary)] hover:text-foreground"
                )}
              >
                <item.icon className="size-4" />
                <span>{item.label}</span>
                {item.count ? (
                  <span className="rounded-full bg-[var(--token-surface-elevated)] px-1.5 py-[1px] text-xs text-[var(--token-text-secondary)]">
                    {item.count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </header>

      <div className="border-b border-border" />

      <main className="mx-auto max-w-[1280px] px-6 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[296px_minmax(0,1fr)] lg:gap-6">
          <aside>
            <div className="relative w-fit">
              <Avatar className="size-[296px] border border-border">
                <AvatarImage src={profile.avatarSrc} alt={profile.fullName} className="object-cover" />
                <AvatarFallback className="text-4xl font-semibold">OC</AvatarFallback>
              </Avatar>
              <button
                type="button"
                aria-label="Edit status"
                className="absolute bottom-8 right-0 flex size-10 items-center justify-center rounded-full border border-border bg-[var(--token-surface)] text-[var(--token-text-secondary)] shadow-[var(--shadow-md)] hover:bg-[var(--token-surface-hover)] hover:text-foreground"
              >
                <SmilePlus className="size-4" />
              </button>
            </div>

            <div className="mt-4 space-y-1">
              <h1 className="max-w-[260px] text-[2rem] leading-[1.1] font-semibold tracking-[-0.02em] text-foreground">{profile.fullName}</h1>
              <p className="text-[20px] text-[var(--token-text-muted)]">{profile.username}</p>
            </div>

            <Button
              type="button"
              variant="outline"
              className="mt-4 h-8 w-full justify-center rounded-[var(--radius-sm)] border-border bg-[var(--token-surface-elevated)] text-sm font-medium text-foreground shadow-none hover:bg-[var(--token-surface-hover)]"
            >
              Edit profile
            </Button>

            <div className="mt-4 flex flex-wrap items-center gap-1 text-sm text-[var(--token-text-secondary)]">
              <Users className="size-4 text-[var(--token-text-muted)]" />
              <button type="button" className="font-semibold hover:text-[var(--token-primary)]">{profile.followers} followers</button>
              <span className="text-[var(--token-text-muted)]">·</span>
              <button type="button" className="font-semibold hover:text-[var(--token-primary)]">{profile.following} following</button>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-[var(--token-text-secondary)]">
              <Building2 className="size-4 text-[var(--token-text-muted)]" />
              <button type="button" className="hover:text-[var(--token-primary)]">{profile.company}</button>
            </div>

            <Separator className="my-6 bg-[var(--token-surface-elevated)]" />

            <section>
              <h2 className="text-base font-semibold text-foreground">Achievements</h2>
              <div className="mt-3 flex items-center gap-2">
                {profile.achievements.map((achievement) => (
                  <div key={achievement.id} className="relative">
                    <div
                      className="flex size-12 items-center justify-center rounded-full border border-white/30 text-[24px] shadow-[var(--shadow-sm)]"
                      style={{ background: achievement.background }}
                    >
                      <span aria-hidden="true">{achievement.emoji}</span>
                    </div>
                    {achievement.count ? (
                      <span className="absolute -bottom-1 -right-1 rounded-full border border-[var(--token-background-deep)] bg-[#f1c27d] px-1.5 text-[10px] font-semibold leading-5 text-black">
                        {achievement.count}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>

            <Separator className="my-6 bg-[var(--token-surface-elevated)]" />

            <section>
              <h2 className="text-base font-semibold text-foreground">Organizations</h2>
            </section>
          </aside>

          <section className="min-w-0">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-base font-normal text-foreground">Popular repositories</h2>
              <button type="button" className="text-sm text-[var(--token-primary)] hover:text-[var(--token-primary-hover)]">
                Customize your pins
              </button>
            </div>

            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {profile.repositories.map((repository) => (
                <RepositoryOverviewCard key={repository.name} repository={repository} />
              ))}
            </div>

            <div className="mt-8 flex items-start justify-between gap-6">
              <h2 className="text-[28px] leading-none font-normal text-foreground">{profile.contributionTotal} contributions in the last year</h2>
              <Select value={settingsValue} onValueChange={setSettingsValue}>
                <SelectTrigger className="h-8 border-0 bg-transparent px-2 text-sm text-[var(--token-text-muted)] shadow-none hover:bg-[var(--token-surface-hover)] focus-visible:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-border bg-[var(--token-surface)] text-foreground">
                  <SelectItem value="Contribution settings">Contribution settings</SelectItem>
                  <SelectItem value="Private contributions">Private contributions</SelectItem>
                  <SelectItem value="Activity overview">Activity overview</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-3 grid gap-6 xl:grid-cols-[minmax(0,1fr)_96px]">
              <Card className="rounded-[var(--radius-md)] border-border bg-card py-0 shadow-none">
                <CardContent className="px-4 py-4">
                  <div className="grid grid-cols-[30px_repeat(52,minmax(0,1fr))] gap-x-[3px] gap-y-[3px] text-xs text-[var(--token-text-muted)]">
                    <div />
                    {profile.contributionMonths.map((month) => (
                      <div key={month.label} className="col-span-4 text-center" style={{ gridColumn: `${month.start + 2} / span 4` }}>
                        {month.label}
                      </div>
                    ))}
                    {profile.contributionGrid.map((row, rowIndex) => (
                      <Fragment key={`row-${rowIndex}`}>
                        <div className="pr-2 pt-[2px] text-right">
                          {rowIndex === 1 ? "Mon" : rowIndex === 3 ? "Wed" : rowIndex === 5 ? "Fri" : ""}
                        </div>
                        {row.map((value, cellIndex) => (
                          <span
                            key={`${rowIndex}-${cellIndex}`}
                            className="h-[10px] w-[10px] rounded-[2px] border border-transparent"
                            style={{ backgroundColor: getContributionColor(value) }}
                          />
                        ))}
                      </Fragment>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--token-text-muted)]">
                    <button type="button" className="hover:text-[var(--token-primary)]">Learn how we count contributions</button>
                    <div className="flex items-center gap-2">
                      <span>Less</span>
                      <div className="flex items-center gap-[3px]">
                        {contributionLegend.map((value) => (
                          <span
                            key={value}
                            className="h-[10px] w-[10px] rounded-[2px]"
                            style={{ backgroundColor: getContributionColor(value) }}
                          />
                        ))}
                      </div>
                      <span>More</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-2 pt-1">
                {profile.years.map((year) => {
                  const active = year === activeYear;
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => setYearValue(year)}
                      className={cn(
                        "h-8 rounded-[var(--radius-sm)] px-3 text-left text-sm transition-colors",
                        active
                          ? "bg-[var(--token-primary-active)] font-medium text-foreground"
                          : "text-[var(--token-text-muted)] hover:bg-[var(--token-surface-hover)] hover:text-foreground"
                      )}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>

            <section className="mt-8">
              <h2 className="text-[28px] leading-none font-normal text-foreground">Contribution activity</h2>
              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-semibold text-[var(--token-primary)]">{profile.activityMonth}</span>
                <div className="h-px flex-1 bg-border" />
              </div>
            </section>
          </section>
        </div>
      </main>
    </div>
  );
}

function HeaderSquareButton({
  children,
  hasChevron,
  ...props
}: React.ComponentProps<typeof Button> & { hasChevron?: boolean }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      className={cn(
        "h-8 min-w-8 rounded-[var(--radius-sm)] border-border bg-transparent px-0 text-[var(--token-text-muted)] shadow-none hover:bg-[var(--token-surface-hover)] hover:text-foreground",
        hasChevron && "w-auto gap-1 px-2"
      )}
      {...props}
    >
      {children}
      {hasChevron ? <ChevronDown className="size-3.5" /> : null}
    </Button>
  );
}

function HeaderDivider() {
  return <Separator orientation="vertical" className="mx-1 hidden h-5 bg-border md:block" />;
}

function RepositoryOverviewCard({ repository }: { repository: RepositoryCard }) {
  return (
    <Card className="rounded-[var(--radius-md)] border-border bg-card py-0 shadow-none">
      <CardContent className="flex h-full min-h-[129px] flex-col px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <button type="button" className="text-left text-base font-semibold text-[var(--token-primary)] hover:text-[var(--token-primary-hover)]">
            {repository.name}
          </button>
          <Badge variant="outline" className="h-5 rounded-full border-border px-2 text-[11px] text-[var(--token-text-muted)]">
            {repository.visibility}
          </Badge>
        </div>
        {repository.source ? <p className="mt-1 text-xs text-[var(--token-text-muted)]">{repository.source}</p> : null}
        {repository.description ? <p className="mt-4 text-sm text-[var(--token-text-muted)]">{repository.description}</p> : null}
        <div className="mt-auto pt-5 text-sm text-[var(--token-text-muted)]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: repository.languageColor }} />
            {repository.language}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function getContributionColor(value: number) {
  switch (value) {
    case 1:
      return "var(--token-contribution-low)";
    case 2:
      return "var(--token-contribution-medium)";
    case 3:
      return "var(--token-contribution-high)";
    case 4:
      return "var(--token-contribution-highest)";
    default:
      return "#161b22";
  }
}
