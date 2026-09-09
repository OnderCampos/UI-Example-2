"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowUp,
  Bot,
  ChevronDown,
  ChevronRight,
  Filter,
  GitBranch,
  GitFork,
  Github,
  Grid2x2,
  House,
  Info,
  Menu,
  MessageSquare,
  MoreHorizontal,
  PanelTop,
  Plus,
  Search,
  SendHorizonal,
  Sparkles,
  Star,
  TerminalSquare,
  Triangle,
  Bell,
  Inbox,
  Monitor,
  CircleHelp,
  Clock3,
  BookText,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type RepositoryItem = {
  id: string;
  owner: string;
  name: string;
  icon?: string;
  accent?: string;
};

type FeedRepository = {
  id: string;
  owner: string;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: string;
  icon?: string;
};

type FeedSection = {
  id: string;
  title: string;
  items: FeedRepository[];
};

type ChangelogItem = {
  id: string;
  time: string;
  title: string;
};

export type DashboardHomeState = "default";

export type DashboardHomeProps = {
  state?: DashboardHomeState;
  initialPrompt?: string;
};

const repositories: RepositoryItem[] = [
  { id: "1", owner: "OnderCampos", name: "CountBoxingSofttek", icon: "/Frida.png" },
  { id: "2", owner: "Fridaplatform", name: "cp-cloudagents", accent: "#f778ba" },
  { id: "3", owner: "OnderCampos", name: "UI-Agent-Example", icon: "/Frida.png" },
  { id: "4", owner: "Fridaplatform", name: "ReqGen-Backend", accent: "#f778ba" },
  { id: "5", owner: "Fridaplatform", name: "ProductPlanner", accent: "#f778ba" },
  { id: "6", owner: "OnderCampos", name: "FridaProductPlannerWebBackend", icon: "/Frida.png" },
];

const feedSections: FeedSection[] = [
  {
    id: "trending",
    title: "Trending repositories",
    items: [
      {
        id: "adhd",
        owner: "ayghri",
        name: "i-have-adhd",
        description: "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
        language: "Python",
        languageColor: "var(--token-python)",
        stars: "33.6k",
        icon: "/Frida.png",
      },
      {
        id: "spotify",
        owner: "spotify",
        name: "portal-ai-plugins",
        description: "",
        language: "TypeScript",
        languageColor: "var(--token-typescript)",
        stars: "716",
      },
    ],
  },
  {
    id: "recommended",
    title: "Recommended for you",
    items: [
      {
        id: "graphrag",
        owner: "jasonkylelol",
        name: "graphrag-chinese",
        description: "支持中文CNCCN 的 microsoft/graphrag",
        language: "Python",
        languageColor: "var(--token-python)",
        stars: "51",
        icon: "/Frida.png",
      },
    ],
  },
];

const changelogItems: ChangelogItem[] = [
  { id: "1", time: "3 hours ago", title: "Remediate Code Quality findings with agentic autofix" },
  { id: "2", time: "13 hours ago", title: "Enterprise-managed sandbox in Copilot for JetBrains" },
  { id: "3", time: "18 hours ago", title: "GitHub Enterprise Server 3.22 is now generally available" },
  { id: "4", time: "Yesterday", title: "New customer portal help.github.com" },
];

const actionButtons = [
  { label: "Debug", icon: TerminalSquare },
  { label: "Agent", icon: Bot },
  { label: "Create issue", icon: CircleHelp },
  { label: "Write code", icon: BookText, chevron: true },
  { label: "Git", icon: GitBranch, chevron: true },
  { label: "Pull requests", icon: GitFork, chevron: true },
];

export function DashboardHome({
  state = "default",
  initialPrompt = "",
}: DashboardHomeProps) {
  const [topSearch, setTopSearch] = useState("");
  const [repoSearch, setRepoSearch] = useState("");
  const [prompt, setPrompt] = useState(initialPrompt);
  const [mode, setMode] = useState("Ask");
  const [scope, setScope] = useState("All repositories");
  const [autoMode, setAutoMode] = useState("Auto");
  const [filterValue, setFilterValue] = useState("Filter");

  const filteredRepositories = useMemo(() => {
    const query = repoSearch.toLowerCase();
    return repositories.filter((repository) => `${repository.owner}/${repository.name}`.toLowerCase().includes(query));
  }, [repoSearch]);

  return (
    <div data-state={state} className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 flex h-[var(--layout-header-height)] items-center justify-between border-b border-border bg-[var(--token-background-deep)] px-3 sm:px-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-[var(--radius-sm)] border-border bg-transparent text-[var(--token-icon-active)] hover:bg-[var(--token-surface-hover)] hover:text-foreground">
            <Menu className="size-4" />
          </Button>
          <Github className="size-8 text-foreground" />
          <span className="text-sm font-semibold">Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden w-[340px] md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--token-text-muted)]" />
            <Input
              value={topSearch}
              onChange={(event) => setTopSearch(event.target.value)}
              placeholder="Type / to search"
              className="h-8 rounded-[var(--radius-sm)] border-border bg-input pl-9 pr-3 text-sm shadow-none placeholder:text-[var(--token-text-muted)]"
            />
          </div>
          <HeaderIconButton icon={Grid2x2} />
          <HeaderDivider />
          <HeaderIconButton icon={Plus} hasChevron />
          <HeaderIconButton icon={Inbox} />
          <HeaderIconButton icon={Bell} />
          <HeaderIconButton icon={Monitor} />
          <HeaderIconButton icon={CircleHelp} />
          <Avatar className="size-8 border border-border">
            <AvatarImage src="/Frida.png" alt="OnderCampos" />
            <AvatarFallback>OC</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-var(--layout-header-height))] grid-cols-1 xl:grid-cols-[296px_minmax(0,1fr)_320px]">
        <aside className="border-r border-border bg-sidebar px-4 py-8">
          <button className="flex items-center gap-3 rounded-[var(--radius-sm)] text-left text-sm font-semibold text-foreground transition hover:text-[var(--token-primary-hover)]">
            <Avatar className="size-5 border border-border">
              <AvatarImage src="/Frida.png" alt="OnderCampos" />
              <AvatarFallback>OC</AvatarFallback>
            </Avatar>
            <span>OnderCampos</span>
            <ChevronDown className="size-4 text-[var(--token-text-muted)]" />
          </button>

          <div className="mt-10 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[var(--token-text-secondary)]">Top repositories</h2>
            <Button className="h-7 rounded-[var(--radius-sm)] bg-[var(--token-success)] px-3 text-xs font-medium text-white hover:bg-[var(--token-success-hover)]">
              <Plus className="size-3.5" />
              New
            </Button>
          </div>

          <Input
            value={repoSearch}
            onChange={(event) => setRepoSearch(event.target.value)}
            placeholder="Find a repository..."
            className="mt-3 h-8 rounded-[var(--radius-sm)] border-border bg-input text-sm shadow-none placeholder:text-[var(--token-text-muted)]"
          />

          <div className="mt-4 space-y-2">
            {filteredRepositories.map((repository) => (
              <button
                key={repository.id}
                className="flex w-full items-start gap-2 rounded-[var(--radius-sm)] px-1 py-1 text-left text-[15px] text-[var(--token-text-secondary)] transition hover:bg-[var(--token-surface-hover)] hover:text-foreground"
              >
                {repository.icon ? (
                  <Avatar className="mt-0.5 size-4 rounded-full border border-border">
                    <AvatarImage src={repository.icon} alt={repository.owner} />
                    <AvatarFallback>{repository.owner.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                ) : (
                  <span className="mt-1 block h-4 w-4 rounded-[4px]" style={{ backgroundColor: repository.accent }} />
                )}
                <span className="leading-5 break-all">{repository.owner}/{repository.name}</span>
              </button>
            ))}
          </div>

          <button className="mt-4 text-sm text-[var(--token-text-muted)] transition hover:text-foreground">Show more</button>
        </aside>

        <main className="bg-background px-6 py-10 xl:px-14">
          <div className="mx-auto max-w-[805px]">
            <h1 className="text-[2.1rem] font-semibold tracking-[-0.02em] text-foreground">Home</h1>

            <Card className="mt-6 gap-0 rounded-[12px] border-border bg-card py-0 shadow-none">
              <CardContent className="px-0 py-0">
                <Textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Ask anything or type @ to add context"
                  className="min-h-[110px] resize-none rounded-b-none rounded-t-[12px] border-0 bg-transparent px-4 py-4 text-[17px] shadow-none focus-visible:ring-0"
                />
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-3 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <SegmentButton label="Ask" icon={MessageSquare} active={mode === "Ask"} onClick={() => setMode("Ask")} />
                    <SegmentButton label="All repositories" icon={PanelTop} active={scope === "All repositories"} onClick={() => setScope("All repositories")} chevron />
                    <Button variant="outline" size="icon-sm" className="h-8 w-8 rounded-[var(--radius-sm)] border-border bg-transparent text-[var(--token-text-muted)] hover:bg-[var(--token-surface-hover)] hover:text-foreground">
                      <Plus className="size-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <NativeSelect
                      value={autoMode}
                      onChange={(event) => setAutoMode(event.target.value)}
                      className="h-8 rounded-[var(--radius-sm)] border-0 bg-transparent pr-7 text-sm text-[var(--token-text-secondary)] shadow-none focus-visible:ring-0"
                    >
                      <NativeSelectOption>Auto</NativeSelectOption>
                      <NativeSelectOption>Fast</NativeSelectOption>
                      <NativeSelectOption>Precise</NativeSelectOption>
                    </NativeSelect>
                    <HeaderIconButton icon={Sparkles} compact />
                    <HeaderIconButton icon={Clock3} compact />
                    <Button variant="ghost" size="icon-sm" className="h-8 w-8 rounded-full text-[var(--token-text-secondary)] hover:bg-[var(--token-surface-hover)] hover:text-foreground">
                      <SendHorizonal className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-4 flex flex-wrap gap-3">
              {actionButtons.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  className="h-10 rounded-full border-border bg-[var(--token-background-deep)] px-4 text-sm font-medium text-[var(--token-text-secondary)] shadow-[var(--shadow-sm)] hover:bg-[var(--token-surface-hover)] hover:text-foreground"
                >
                  <action.icon className="size-4" />
                  {action.label}
                  {action.chevron ? <ChevronDown className="size-4" /> : null}
                </Button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Feed</h2>
              <Button variant="outline" className="h-8 rounded-[var(--radius-sm)] border-border bg-[var(--token-surface)] px-3 text-sm text-[var(--token-text-secondary)] shadow-none hover:bg-[var(--token-surface-hover)] hover:text-foreground">
                <Filter className="size-4" />
                {filterValue}
              </Button>
            </div>

            <div className="mt-3 space-y-4">
              {feedSections.map((section) => (
                <FeedCard key={section.id} section={section} />
              ))}
            </div>
          </div>
        </main>

        <aside className="bg-background px-6 py-9">
          <div className="mx-auto w-full max-w-[280px] space-y-6">
            <Card className="overflow-hidden gap-0 rounded-[8px] border-border bg-card py-0 shadow-none">
              <div className="relative h-[72px] w-full overflow-hidden border-b border-border bg-[linear-gradient(135deg,#bbf7d0_0%,#22c55e_30%,#e5e7eb_58%,#86efac_82%,#4ade80_100%)]">
                <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.75)_25%,rgba(255,255,255,0.75)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.75)_75%,rgba(255,255,255,0.75))] [background-size:44px_44px]" />
              </div>
              <CardContent className="space-y-3 px-4 py-4">
                <p className="text-[11px] font-semibold tracking-[0.08em] text-[var(--token-text-muted)] uppercase">September 10 · 8:00 AM PT</p>
                <div>
                  <h3 className="text-[1.05rem] font-semibold text-foreground">GitHub Copilot Day</h3>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--token-text-secondary)]">
                    <PromoBullet text="See how HydraFusion combines AI models to match the right model to the task" />
                    <PromoBullet text="Learn to automate work, run parallel agents, and use your own models" />
                    <PromoBullet text="Turn your best coding approaches into reusable Agent skills" />
                  </ul>
                </div>
                <Button className="mt-1 h-8 w-full rounded-[var(--radius-sm)] bg-foreground text-[13px] font-medium text-background hover:opacity-90">
                  Set your reminder
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-[12px] border-border bg-card py-0 shadow-none">
              <CardContent className="px-4 py-4">
                <h3 className="text-lg font-semibold text-foreground">Latest from our changelog</h3>
                <div className="relative mt-5 pl-5 before:absolute before:left-[7px] before:top-1 before:h-[calc(100%-24px)] before:w-px before:bg-border">
                  {changelogItems.map((item, index) => (
                    <div key={item.id} className={cn("relative pb-5", index === changelogItems.length - 1 && "pb-3")}>
                      <span className="absolute left-[-20px] top-1.5 h-2.5 w-2.5 rounded-full border border-border bg-[var(--token-surface-elevated)]" />
                      <p className="text-xs text-[var(--token-text-muted)]">{item.time}</p>
                      <button className="mt-1 text-left text-[15px] leading-6 text-[var(--token-text-secondary)] transition hover:text-[var(--token-primary)]">
                        {item.title}
                      </button>
                    </div>
                  ))}
                </div>
                <button className="text-sm text-[var(--token-text-muted)] transition hover:text-[var(--token-primary)]">View changelog →</button>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}

function HeaderDivider() {
  return <Separator orientation="vertical" className="mx-1 hidden h-5 bg-border md:block" />;
}

function HeaderIconButton({
  icon: Icon,
  hasChevron,
  compact = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  hasChevron?: boolean;
  compact?: boolean;
}) {
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={cn(
        "h-8 min-w-8 rounded-[var(--radius-sm)] border border-border bg-transparent px-0 text-[var(--token-text-muted)] hover:bg-[var(--token-surface-hover)] hover:text-foreground",
        hasChevron && "w-auto gap-1 px-2",
        compact && "rounded-full border-0"
      )}
    >
      <Icon className="size-4" />
      {hasChevron ? <ChevronDown className="size-3.5" /> : null}
    </Button>
  );
}

function SegmentButton({
  label,
  icon: Icon,
  active,
  onClick,
  chevron,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  onClick: () => void;
  chevron?: boolean;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className={cn(
        "h-8 rounded-[var(--radius-sm)] border-border bg-transparent px-3 text-sm shadow-none hover:bg-[var(--token-surface-hover)] hover:text-foreground",
        active ? "text-foreground" : "text-[var(--token-text-secondary)]"
      )}
    >
      <Icon className="size-4" />
      {label}
      {chevron ? <ChevronDown className="size-4" /> : null}
    </Button>
  );
}

function FeedCard({ section }: { section: FeedSection }) {
  return (
    <Card className="gap-0 rounded-[8px] border-border bg-card py-0 shadow-none">
      <CardContent className="px-0 py-0">
        <div className="flex items-center gap-2 px-4 py-3 text-sm text-[var(--token-text-muted)]">
          {section.id === "trending" ? <TrendingIcon /> : <Star className="size-4" />}
          <span>{section.title}</span>
          {section.id === "trending" ? (
            <>
              <span>·</span>
              <button className="text-[var(--token-primary)] hover:text-[var(--token-primary-hover)]">See more</button>
            </>
          ) : null}
        </div>
        {section.items.map((item, index) => (
          <div key={item.id}>
            {index > 0 ? <Separator className="bg-border" /> : null}
            <div className="flex items-start justify-between gap-4 px-4 py-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {item.icon ? (
                    <Avatar className="size-5 border border-border">
                      <AvatarImage src={item.icon} alt={item.owner} />
                      <AvatarFallback>{item.owner.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1db954] text-[10px] font-semibold text-white">S</span>
                  )}
                  <button className="text-left text-base font-semibold text-[var(--token-primary)] hover:text-[var(--token-primary-hover)]">
                    {item.owner}/{item.name}
                  </button>
                </div>
                {item.description ? <p className="mt-3 text-[15px] leading-6 text-[var(--token-text-secondary)]">{item.description}</p> : null}
                <div className="mt-3 flex items-center gap-4 text-sm text-[var(--token-text-muted)]">
                  <span className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.languageColor }} />
                    {item.language}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="size-4" />
                    {item.stars}
                  </span>
                </div>
              </div>
              <ButtonGroup className="shrink-0 overflow-hidden rounded-[var(--radius-sm)] border border-border">
                <Button variant="ghost" className="h-8 rounded-none border-0 bg-[var(--token-surface-elevated)] px-3 text-sm text-[var(--token-text-secondary)] hover:bg-[var(--token-surface-hover)] hover:text-foreground">
                  <Star className="size-4" />
                  Star
                </Button>
                <Button variant="ghost" size="icon-sm" className="h-8 rounded-none border-l border-border bg-[var(--token-surface-elevated)] text-[var(--token-text-secondary)] hover:bg-[var(--token-surface-hover)] hover:text-foreground">
                  <ChevronDown className="size-4" />
                </Button>
              </ButtonGroup>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function PromoBullet({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-[7px] block h-2 w-2 rounded-[1px] bg-[var(--token-success)]" />
      <span>{text}</span>
    </li>
  );
}

function TrendingIcon() {
  return (
    <div className="relative h-4 w-4 text-[var(--token-text-muted)]">
      <Triangle className="absolute left-0 top-[2px] size-4 rotate-90 fill-none stroke-current stroke-[1.5]" />
      <ChevronRight className="absolute left-[2px] top-[1px] size-3 text-[var(--token-text-muted)]" />
    </div>
  );
}
