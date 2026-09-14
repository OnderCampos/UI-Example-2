"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  ChevronDown,
  CircleDashed,
  Filter,
  FolderGit2,
  GitBranch,
  Github,
  GitPullRequest,
  Grip,
  Home,
  Menu,
  MessageSquare,
  MoonStar,
  PackagePlus,
  PanelTop,
  Play,
  Plus,
  Search,
  Sparkles,
  Star,
  Telescope,
  Users,
  Workflow,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type GithubHomeDashboardState = "default";

type TopRepository = {
  name: string;
  icon?: string;
};

type FeedItem = {
  owner: string;
  name: string;
  description: string;
  language: string;
  stars: string;
  accent: string;
  icon?: string;
  actionLabel?: string;
};

type FeedSection = {
  title: string;
  linkLabel?: string;
  items: FeedItem[];
};

type ChangelogItem = {
  time: string;
  title: string;
};

export type GithubHomeDashboardProps = {
  state?: GithubHomeDashboardState;
  userName?: string;
  searchPlaceholder?: string;
  topRepositories?: TopRepository[];
  feedSections?: FeedSection[];
  changelogItems?: ChangelogItem[];
};

const defaultTopRepositories: TopRepository[] = [
  { name: "OnderCampos/CountBoxingSofttek" },
  { name: "Fridaplatform/cp-cloudagents", icon: "F" },
  { name: "OnderCampos/UI-Agent-Example" },
  { name: "Fridaplatform/ReqGen-Backend", icon: "F" },
  { name: "Fridaplatform/ProductPlanner", icon: "F" },
  { name: "OnderCampos/FridaProductPlannerWebBackend" },
];

const defaultFeedSections: FeedSection[] = [
  {
    title: "Trending repositories",
    linkLabel: "See more",
    items: [
      {
        owner: "ayyhri",
        name: "i-have-adhd",
        description:
          "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
        language: "Python",
        stars: "33.6k",
        accent: "#58a6ff",
      },
      {
        owner: "spotify",
        name: "portal-ai-plugins",
        description: "",
        language: "TypeScript",
        stars: "716",
        accent: "#58a6ff",
        icon: "spotify",
      },
    ],
  },
  {
    title: "Recommended for you",
    items: [
      {
        owner: "jasonkylelol",
        name: "graphrag-chinese",
        description: "支持中文CNCCN 的 microsoft/graphrag",
        language: "Python",
        stars: "51",
        accent: "#58a6ff",
      },
    ],
  },
];

const defaultChangelogItems: ChangelogItem[] = [
  {
    time: "3 hours ago",
    title: "Remediate Code Quality findings with agentic autofix",
  },
  {
    time: "13 hours ago",
    title: "Enterprise-managed sandbox in Copilot for JetBrains",
  },
  {
    time: "18 hours ago",
    title: "GitHub Enterprise Server 3.22 is now generally available",
  },
  {
    time: "Yesterday",
    title: "New customer portal help.github.com",
  },
];

const askOptions = ["Ask", "Explain", "Summarize"];
const repositoryScopes = ["All repositories", "My repositories", "Starred"];
const runModes = ["Auto", "Manual", "Assist"];
const starActions = ["Star", "Follow", "Save"];

function RepoIcon({ icon }: { icon?: string }) {
  if (icon === "F") {
    return (
      <div className="flex size-4 items-center justify-center rounded-[3px] bg-[#f778ba]/10 text-[10px] font-bold text-[#f778ba]">
        F
      </div>
    );
  }

  if (icon === "spotify") {
    return (
      <div className="flex size-5 items-center justify-center rounded-full bg-[#1f7a45] text-black">
        <span className="text-[10px] font-bold text-[#3fb950]">◓</span>
      </div>
    );
  }

  return <FolderGit2 className="size-4 text-[var(--dashboard-muted)]" />;
}

function Metric({ color, children }: { color: string; children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] text-[var(--dashboard-muted)]">
      <span className="size-3 rounded-full" style={{ backgroundColor: color }} />
      {children}
    </span>
  );
}

function ToolbarDropdown({
  value,
  options,
  onChange,
  icon,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 rounded-md border-[var(--dashboard-border)] bg-transparent px-3 text-[13px] text-[var(--dashboard-text)] hover:bg-[var(--dashboard-surface-alt)] hover:text-[var(--dashboard-text)]"
        >
          {icon}
          {value}
          <ChevronDown className="size-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] text-[var(--dashboard-text)]"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => onChange(option)}
            className="focus:bg-[var(--dashboard-surface-alt)]"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function StarDropdown() {
  const [value, setValue] = useState(starActions[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1 rounded-md border-[var(--dashboard-border)] bg-[var(--dashboard-surface-alt)] px-3 text-[12px] text-[var(--dashboard-text)] shadow-none hover:bg-[#353e4a] hover:text-[var(--dashboard-text)]"
        >
          <Star className="size-3.5" />
          {value}
          <ChevronDown className="size-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] text-[var(--dashboard-text)]"
      >
        {starActions.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => setValue(option)}
            className="focus:bg-[var(--dashboard-surface-alt)]"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function GithubHomeDashboard({
  state = "default",
  userName = "OnderCampos",
  searchPlaceholder = "Find a repository…",
  topRepositories = defaultTopRepositories,
  feedSections = defaultFeedSections,
  changelogItems = defaultChangelogItems,
}: GithubHomeDashboardProps) {
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [headerSearch, setHeaderSearch] = useState("Type / to search");
  const [askValue, setAskValue] = useState(askOptions[0]);
  const [scopeValue, setScopeValue] = useState(repositoryScopes[0]);
  const [modeValue, _setModeValue] = useState(runModes[0]);

  const visibleRepositories = useMemo(() => {
    const query = sidebarSearch.toLowerCase();
    return topRepositories.filter((repository) =>
      repository.name.toLowerCase().includes(query)
    );
  }, [sidebarSearch, topRepositories]);

  return (
    <div
      data-state={state}
      className="min-h-screen bg-[var(--dashboard-background)] text-[var(--dashboard-text)]"
    >
      <div className="grid min-h-screen grid-cols-[300px_minmax(0,1fr)_320px]">
        <aside className="border-r border-[var(--dashboard-border)] bg-[var(--dashboard-sidebar)]">
          <div className="flex h-14 items-center gap-3 border-b border-[var(--dashboard-border)] px-3">
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-md border border-[var(--dashboard-border)] text-[var(--dashboard-text)] hover:bg-[var(--dashboard-surface-alt)] hover:text-[var(--dashboard-text)]"
            >
              <Menu className="size-4" />
            </Button>
            <Github className="size-7 text-white" />
            <span className="text-[20px] leading-none">Dashboard</span>
          </div>

          <div className="px-4 py-8">
            <button
              type="button"
              className="mb-10 flex items-center gap-2 text-[15px] font-semibold"
            >
              <Avatar className="size-5 border border-[var(--dashboard-border)]">
                <AvatarImage src="/Frida.png" alt={userName} />
                <AvatarFallback>OC</AvatarFallback>
              </Avatar>
              {userName}
              <ChevronDown className="size-3.5 text-[var(--dashboard-muted)]" />
            </button>

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[14px] font-semibold">Top repositories</h2>
              <Button className="h-8 rounded-md bg-[var(--dashboard-primary)] px-3 text-[13px] font-medium text-[var(--dashboard-background)] hover:bg-[var(--dashboard-primary-hover)]">
                <BookOpen className="size-3.5" />
                New
              </Button>
            </div>

            <Input
              value={sidebarSearch}
              onChange={(event) => setSidebarSearch(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-8 border-[var(--dashboard-border)] bg-[var(--dashboard-background)] text-[13px] text-[var(--dashboard-text)] placeholder:text-[var(--dashboard-muted)]"
            />

            <div className="mt-4 space-y-3 text-[14px]">
              {visibleRepositories.map((repository) => (
                <button
                  key={repository.name}
                  type="button"
                  className="flex w-full items-start gap-2 text-left text-[var(--dashboard-text)] hover:text-white"
                >
                  <div className="mt-0.5 shrink-0">
                    <RepoIcon icon={repository.icon} />
                  </div>
                  <span className="leading-5 break-all">{repository.name}</span>
                </button>
              ))}
            </div>

            <Button
              variant="ghost"
              className="mt-3 h-auto px-0 text-[13px] text-[var(--dashboard-muted)] hover:bg-transparent hover:text-[var(--dashboard-text)]"
            >
              Show more
            </Button>
          </div>
        </aside>

        <main className="border-r border-[var(--dashboard-border)] bg-[radial-gradient(circle_at_top,_rgba(35,54,88,0.28),_transparent_30%),var(--dashboard-background)]">
          <header className="flex h-14 items-center justify-end gap-3 border-b border-[var(--dashboard-border)] px-4">
            <div className="flex h-8 w-[286px] items-center gap-2 rounded-md border border-[var(--dashboard-border)] bg-[var(--dashboard-background)] px-3 text-[13px] text-[var(--dashboard-muted)]">
              <Search className="size-4" />
              <input
                value={headerSearch}
                onChange={(event) => setHeaderSearch(event.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-[var(--dashboard-muted)]"
              />
              <Kbd className="h-5 min-w-5 border border-[var(--dashboard-border)] bg-[var(--dashboard-surface-alt)] px-1.5 text-[10px] text-[var(--dashboard-muted)]">
                /
              </Kbd>
            </div>
            <Button variant="ghost" size="icon-sm" className="text-[var(--dashboard-muted)] hover:bg-[var(--dashboard-surface-alt)] hover:text-[var(--dashboard-text)]"><Grip className="size-4" /></Button>
            <Separator orientation="vertical" className="!h-6 bg-[var(--dashboard-border)]" />
            <Button variant="ghost" size="icon-sm" className="text-[var(--dashboard-text)] hover:bg-[var(--dashboard-surface-alt)]"><Plus className="size-4" /></Button>
            <Button variant="ghost" size="icon-sm" className="text-[var(--dashboard-text)] hover:bg-[var(--dashboard-surface-alt)]"><Bell className="size-4" /></Button>
            <Button variant="ghost" size="icon-sm" className="text-[var(--dashboard-text)] hover:bg-[var(--dashboard-surface-alt)]"><GitBranch className="size-4" /></Button>
            <Button variant="ghost" size="icon-sm" className="text-[var(--dashboard-text)] hover:bg-[var(--dashboard-surface-alt)]"><PanelTop className="size-4" /></Button>
            <Button variant="ghost" size="icon-sm" className="text-[var(--dashboard-text)] hover:bg-[var(--dashboard-surface-alt)]"><PackagePlus className="size-4" /></Button>
            <Avatar className="size-8 border border-[var(--dashboard-border)]">
              <AvatarImage src="/Frida.png" alt={userName} />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
          </header>

          <div className="mx-auto max-w-[860px] px-14 py-10">
            <h1 className="mb-6 text-[36px] font-semibold tracking-[-0.02em]">Home</h1>

            <Card className="gap-0 rounded-2xl border-[var(--dashboard-border)] bg-[rgba(33,40,48,0.82)] py-0 shadow-[var(--dashboard-shadow)]">
              <div className="p-4 pb-3">
                <textarea
                  defaultValue="Ask anything or type @ to add context"
                  className="min-h-20 w-full resize-none bg-transparent text-[28px] leading-9 text-[var(--dashboard-muted)] outline-none"
                />
              </div>
              <div className="flex items-center justify-between border-t border-[var(--dashboard-border)] px-4 py-3">
                <div className="flex items-center gap-2">
                  <ToolbarDropdown value={askValue} options={askOptions} onChange={setAskValue} icon={<MessageSquare className="size-4" />} />
                  <ToolbarDropdown value={scopeValue} options={repositoryScopes} onChange={setScopeValue} icon={<Home className="size-4" />} />
                  <Button variant="outline" size="sm" className="h-8 rounded-md border-[var(--dashboard-border)] bg-transparent px-2 text-[var(--dashboard-muted)] hover:bg-[var(--dashboard-surface-alt)] hover:text-[var(--dashboard-text)]"><Plus className="size-4" /></Button>
                </div>
                <div className="flex items-center gap-3 text-[13px] text-[var(--dashboard-muted)]">
                  <div className="flex items-center gap-1"><Users className="size-4" /> <span>{modeValue}</span> <ChevronDown className="size-3.5" /></div>
                  <Separator orientation="vertical" className="!h-5 bg-[var(--dashboard-border)]" />
                  <MoonStar className="size-4" />
                  <Separator orientation="vertical" className="!h-5 bg-[var(--dashboard-border)]" />
                  <Play className="size-4" />
                </div>
              </div>
            </Card>

            <div className="mt-5 flex flex-wrap gap-3">
              {[
                { label: "Debug", icon: Sparkles },
                { label: "Agent", icon: Workflow },
                { label: "Create issue", icon: CircleDashed },
                { label: "Write code", icon: BookOpen },
                { label: "Git", icon: GitBranch },
                { label: "Pull requests", icon: GitPullRequest },
              ].map(({ label, icon: Icon }) => (
                <Button
                  key={label}
                  variant="outline"
                  className="h-10 rounded-full border-[var(--dashboard-border)] bg-[rgba(21,27,35,0.7)] px-4 text-[14px] text-[var(--dashboard-text)] hover:bg-[var(--dashboard-surface-alt)] hover:text-[var(--dashboard-text)]"
                >
                  <Icon className="size-4" />
                  {label}
                </Button>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <h2 className="text-[16px] font-semibold">Feed</h2>
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-md border-[var(--dashboard-border)] bg-[var(--dashboard-surface-alt)] px-3 text-[13px] text-[var(--dashboard-text)] hover:bg-[#353e4a] hover:text-[var(--dashboard-text)]"
              >
                <Filter className="size-4" />
                Filter
              </Button>
            </div>

            <div className="mt-3 space-y-4">
              {feedSections.map((section) => (
                <Card
                  key={section.title}
                  className="gap-0 rounded-lg border-[var(--dashboard-border)] bg-[rgba(33,40,48,0.92)] py-0 shadow-[var(--dashboard-shadow)]"
                >
                  <div className="flex items-center gap-2 px-4 py-3 text-[14px] text-[var(--dashboard-muted)]">
                    <Telescope className="size-4" />
                    <span>{section.title}</span>
                    {section.linkLabel ? (
                      <button
                        type="button"
                        className="text-[14px] text-[#58a6ff] hover:underline"
                      >
                        · {section.linkLabel}
                      </button>
                    ) : null}
                  </div>
                  {section.items.map((item, index) => (
                    <div
                      key={`${item.owner}/${item.name}`}
                      className={cn(
                        "flex items-start justify-between gap-4 px-4 py-4",
                        index > 0 && "border-t border-[var(--dashboard-border)]"
                      )}
                    >
                      <div className="min-w-0">
                        <div className="mb-2 flex items-center gap-2 text-[15px] font-semibold text-[var(--dashboard-text)]">
                          <RepoIcon icon={item.icon} />
                          <button type="button" className="truncate hover:text-[#58a6ff]">
                            {item.owner}/{item.name}
                          </button>
                        </div>
                        {item.description ? (
                          <p className="mb-2 text-[14px] text-[var(--dashboard-text)]">
                            {item.description}
                          </p>
                        ) : null}
                        <div className="flex items-center gap-4">
                          <Metric color={item.accent}>{item.language}</Metric>
                          <span className="inline-flex items-center gap-1.5 text-[12px] text-[var(--dashboard-muted)]">
                            <Star className="size-3.5" />
                            {item.stars}
                          </span>
                        </div>
                      </div>
                      <StarDropdown />
                    </div>
                  ))}
                </Card>
              ))}
            </div>
          </div>
        </main>

        <aside className="bg-[var(--dashboard-background)] px-4 py-6">
          <Card className="gap-0 overflow-hidden rounded-xl border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] py-0 shadow-[var(--dashboard-shadow)]">
            <div className="relative h-[72px] bg-[linear-gradient(135deg,#95f0ae_0%,#def8e6_26%,#98f0b0_42%,#212830_42%,#212830_48%,#95f0ae_48%,#ffffff_64%,#95f0ae_78%,#70d48f_100%)]">
              <Button variant="ghost" size="icon-sm" className="absolute top-3 right-3 text-[var(--dashboard-muted)] hover:bg-white/10 hover:text-white"><X className="size-4" /></Button>
            </div>
            <div className="border-t border-[var(--dashboard-border)] p-4">
              <div className="mb-2 text-[12px] uppercase tracking-[0.04em] text-[#79c0ff]">September 10 · 8:00 AM PT</div>
              <h3 className="mb-3 text-[28px] font-semibold leading-8">GitHub Copilot Day</h3>
              <ul className="space-y-2 text-[14px] text-[var(--dashboard-muted)]">
                <li className="flex gap-2"><span className="mt-2 size-1.5 rounded-full bg-[var(--dashboard-primary)]" /><span>See how HydraFusion combines AI models to match the right model to the task</span></li>
                <li className="flex gap-2"><span className="mt-2 size-1.5 rounded-full bg-[var(--dashboard-primary)]" /><span>Learn to automate work, run parallel agents, and use your own models</span></li>
                <li className="flex gap-2"><span className="mt-2 size-1.5 rounded-full bg-[var(--dashboard-primary)]" /><span>Turn your best coding approaches into reusable Agent Skills</span></li>
              </ul>
              <Button className="mt-4 h-9 w-full rounded-md bg-[#f0f6fc] text-[13px] font-medium text-[#0d1117] hover:bg-white">Set your reminder</Button>
            </div>
          </Card>

          <Card className="mt-5 rounded-xl border-[var(--dashboard-border)] bg-[var(--dashboard-surface)] py-0 shadow-[var(--dashboard-shadow)]">
            <div className="p-4">
              <h3 className="mb-5 text-[24px] font-semibold leading-7">Latest from our changelog</h3>
              <div className="space-y-4">
                {changelogItems.map((item) => (
                  <div key={item.title} className="grid grid-cols-[16px_1fr] gap-3">
                    <div className="flex justify-center pt-1">
                      <span className="size-2 rounded-full bg-[var(--dashboard-border)]" />
                    </div>
                    <div>
                      <div className="mb-1 text-[12px] text-[var(--dashboard-muted)]">{item.time}</div>
                      <button type="button" className="text-left text-[15px] leading-6 hover:text-[#79c0ff]">
                        {item.title}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="mt-4 h-auto px-0 text-[14px] text-[#79c0ff] hover:bg-transparent hover:text-[#79c0ff]">View changelog →</Button>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
