"use client";

import { useState } from "react";
import {
  Bell,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Circle,
  Cpu,
  FileCode2,
  Filter,
  GitBranch,
  Github,
  Home,
  LayoutGrid,
  Menu,
  MessageSquare,
  MonitorPlay,
  Play,
  Plus,
  Search,
  Sparkles,
  Star,
  Triangle,
  Users,
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
import { cn } from "@/lib/utils";

type RepositoryItem = {
  owner: string;
  name: string;
  description?: string;
  language: string;
  stars: string;
  avatar?: string;
  languageColor?: string;
  source?: "github" | "spotify" | "custom";
};

type FeedSection = {
  id: string;
  title: string;
  actionLabel?: string;
  items: RepositoryItem[];
};

type DashboardHomeViewProps = {
  state?: "default";
  userName?: string;
  userAvatar?: string;
  topRepositories?: string[];
  searchPlaceholder?: string;
  sections?: FeedSection[];
};

const defaultSections: FeedSection[] = [
  {
    id: "trending",
    title: "Trending repositories",
    actionLabel: "See more",
    items: [
      {
        owner: "ayghri",
        name: "i-have-adhd",
        description:
          "A skill to stop your coding agent from burying the answer. ADHD-friendly output.",
        language: "Python",
        stars: "33.6k",
        languageColor: "#58A6FF",
        source: "custom",
      },
      {
        owner: "spotify",
        name: "portal-ai-plugins",
        language: "TypeScript",
        stars: "716",
        languageColor: "#58A6FF",
        source: "spotify",
      },
    ],
  },
  {
    id: "recommended",
    title: "Recommended for you",
    items: [
      {
        owner: "jasonkylelol",
        name: "graphrag-chinese",
        description: "支持中文CNCCN 的 microsoft/graphrag",
        language: "Python",
        stars: "51",
        languageColor: "#58A6FF",
        source: "github",
      },
    ],
  },
];

const defaultTopRepositories = [
  "OnderCampos/CountBoxingSofttek",
  "Fridaplatform/cp-cloudagents",
  "OnderCampos/UI-Agent-Example",
  "Fridaplatform/ReqGen-Backend",
  "Fridaplatform/ProductPlanner",
  "Fridaplatform/reggen_frontend",
  "OnderCampos/FridaProductPlannerWebBackend",
];

const changelogItems = [
  {
    time: "3 hours ago",
    text: "Remediate Code Quality findings with agentic autofix",
  },
  {
    time: "13 hours ago",
    text: "Enterprise-managed sandbox in Copilot for JetBrains",
  },
  {
    time: "18 hours ago",
    text: "GitHub Enterprise Server 3.22 is now generally available",
  },
  {
    time: "Yesterday",
    text: "New customer portal help.github.com",
  },
];

const modelOptions = ["Auto", "GPT-4.1", "Claude 3.7 Sonnet", "Gemini 2.5 Pro"];
const askScopes = ["Ask", "Explain", "Summarize"];
const repoScopes = ["All repositories", "My repositories", "Top repositories"];
const starActions = ["Star", "Ignore", "Save for later"];

function RepoIcon({ source = "github" }: { source?: RepositoryItem["source"] }) {
  if (source === "spotify") {
    return (
      <div className="flex size-5 items-center justify-center rounded-full bg-[#1ED760] text-[#151B23]">
        <Circle className="size-2.5 fill-current stroke-0" />
      </div>
    );
  }

  if (source === "custom") {
    return (
      <div className="flex size-5 items-center justify-center rounded-full bg-[color:var(--accent)] text-[color:var(--warning)]">
        <Sparkles className="size-3.5" />
      </div>
    );
  }

  return (
    <div className="flex size-5 items-center justify-center rounded-full bg-[color:var(--muted)] text-[color:var(--foreground)]">
      <Github className="size-3.5" />
    </div>
  );
}

function HeaderIconButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-transparent text-muted-foreground transition hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
    </button>
  );
}

function RepositoryRow({ item }: { item: RepositoryItem }) {
  const [selectedAction, setSelectedAction] = useState(starActions[0]);

  return (
    <div className="flex items-start justify-between gap-4 border-t border-border px-4 py-4 first:border-t-0">
      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
          <RepoIcon source={item.source} />
          <span className="truncate">{item.owner}/{item.name}</span>
        </div>
        {item.description ? (
          <p className="mb-2 text-[15px] leading-6 text-foreground">{item.description}</p>
        ) : null}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: item.languageColor ?? "#58A6FF" }}
            />
            {item.language}
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="size-3.5" />
            {item.stars}
          </span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-md border-border bg-accent px-3 text-foreground hover:bg-[#3a434d]"
          >
            <Star className="size-3.5" />
            {selectedAction}
            <ChevronDown className="size-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 border-border bg-card text-foreground">
          {starActions.map((action) => (
            <DropdownMenuItem key={action} onSelect={() => setSelectedAction(action)}>
              {action}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function FeedCard({ section }: { section: FeedSection }) {
  return (
    <Card className="gap-0 overflow-hidden rounded-lg border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
      <div className="flex items-center gap-2 px-4 py-4 text-sm text-muted-foreground">
        <Triangle className="size-3.5 fill-current stroke-0" />
        <span>{section.title}</span>
        {section.actionLabel ? (
          <button type="button" className="text-[#58A6FF] hover:underline">
            {section.actionLabel}
          </button>
        ) : null}
      </div>
      {section.items.map((item) => (
        <RepositoryRow key={`${item.owner}-${item.name}`} item={item} />
      ))}
    </Card>
  );
}

export default function DashboardHomeView({
  state = "default",
  userName = "OnderCampos",
  userAvatar = "/Frida.png",
  topRepositories = defaultTopRepositories,
  searchPlaceholder = "Find a repository…",
  sections = defaultSections,
}: DashboardHomeViewProps) {
  const [globalSearch, setGlobalSearch] = useState("");
  const [repoSearch, setRepoSearch] = useState("");
  const [askScope, setAskScope] = useState(askScopes[0]);
  const [repoScope, setRepoScope] = useState(repoScopes[0]);
  const [model, setModel] = useState(modelOptions[0]);
  const [composerText, setComposerText] = useState("Ask anything or type @ to add context");
  const [copilotDismissed, setCopilotDismissed] = useState(false);

  const filteredTopRepositories = topRepositories.filter((repository) =>
    repository.toLowerCase().includes(repoSearch.toLowerCase())
  );

  return (
    <div data-state={state} className="min-h-screen bg-[color:var(--panel)] text-foreground">
      <header className="border-b border-border bg-[color:var(--panel)] px-3 py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <HeaderIconButton>
              <Menu className="size-4" />
            </HeaderIconButton>
            <Github className="size-8 text-foreground" />
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <span>Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Type / to search"
                className="h-8 w-[270px] rounded-md border-border bg-transparent pl-9 text-sm"
              />
            </div>
            <HeaderIconButton>
              <LayoutGrid className="size-4" />
            </HeaderIconButton>
            <HeaderIconButton>
              <Plus className="size-4" />
            </HeaderIconButton>
            <HeaderIconButton>
              <Circle className="size-4 fill-current stroke-0" />
            </HeaderIconButton>
            <HeaderIconButton>
              <GitBranch className="size-4" />
            </HeaderIconButton>
            <HeaderIconButton>
              <MonitorPlay className="size-4" />
            </HeaderIconButton>
            <HeaderIconButton>
              <Bell className="size-4" />
            </HeaderIconButton>
            <Avatar className="size-8 border border-border">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userName.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-49px)] grid-cols-1 xl:grid-cols-[300px_minmax(0,1fr)_312px]">
        <aside className="border-r border-border bg-sidebar px-5 py-8">
          <div className="mb-10 flex items-center gap-3">
            <Avatar className="size-6 border border-border">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <button type="button" className="flex items-center gap-1 text-sm font-semibold text-foreground">
              {userName}
              <ChevronDown className="size-4 text-muted-foreground" />
            </button>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Top repositories</h2>
            <Button className="h-8 rounded-md bg-primary px-3 text-sm font-semibold text-primary-foreground hover:bg-[#36A653]">
              <BookOpen className="size-4" />
              New
            </Button>
          </div>

          <Input
            value={repoSearch}
            onChange={(e) => setRepoSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="mb-4 h-8 rounded-md border-border bg-transparent text-sm"
          />

          <div className="space-y-2 text-sm text-muted-foreground">
            {filteredTopRepositories.map((repository) => (
              <button
                key={repository}
                type="button"
                className="flex w-full items-start gap-2 text-left hover:text-foreground"
              >
                <span className="mt-1 h-3 w-3 rounded-sm bg-[#f778ba]/20 text-xs text-[#f778ba]" />
                <span className="break-all leading-5">{repository}</span>
              </button>
            ))}
          </div>

          <button type="button" className="mt-4 text-sm text-muted-foreground hover:text-foreground">
            Show more
          </button>
        </aside>

        <main className="px-6 py-10 xl:px-14">
          <div className="max-w-[805px]">
            <h1 className="mb-6 text-[36px] font-semibold tracking-[-0.02em] text-foreground">Home</h1>

            <div className="mb-4 rounded-2xl border border-border bg-card p-4 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <textarea
                value={composerText}
                onChange={(e) => setComposerText(e.target.value)}
                className="min-h-[70px] w-full resize-none bg-transparent text-[17px] text-muted-foreground outline-none placeholder:text-muted-foreground"
              />
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 rounded-md border-border bg-transparent text-foreground hover:bg-accent">
                        <MessageSquare className="size-4" />
                        {askScope}
                        <ChevronDown className="size-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="border-border bg-card text-foreground">
                      {askScopes.map((option) => (
                        <DropdownMenuItem key={option} onSelect={() => setAskScope(option)}>
                          {option}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 rounded-md border-border bg-transparent text-foreground hover:bg-accent">
                        <Home className="size-4" />
                        {repoScope}
                        <ChevronDown className="size-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="border-border bg-card text-foreground">
                      {repoScopes.map((option) => (
                        <DropdownMenuItem key={option} onSelect={() => setRepoScope(option)}>
                          {option}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button variant="outline" size="icon-sm" className="border-border bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground">
                    <Plus className="size-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button type="button" className="flex items-center gap-1 hover:text-foreground">
                        <Users className="size-4" />
                        {model}
                        <ChevronDown className="size-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="border-border bg-card text-foreground">
                      {modelOptions.map((option) => (
                        <DropdownMenuItem key={option} onSelect={() => setModel(option)}>
                          {option}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <button type="button" className="rounded-md p-1 hover:bg-accent hover:text-foreground">
                    <Cpu className="size-4" />
                  </button>
                  <button type="button" className="rounded-md p-1 hover:bg-accent hover:text-foreground">
                    <Play className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-3 flex flex-wrap items-center gap-3">
              {[
                { icon: Sparkles, label: "Debug" },
                { icon: Cpu, label: "Agent" },
                { icon: Circle, label: "Create issue" },
                { icon: FileCode2, label: "Write code" },
                { icon: GitBranch, label: "Git" },
                { icon: ChevronRight, label: "Pull requests" },
              ].map(({ icon: Icon, label }) => (
                <Button
                  key={label}
                  variant="outline"
                  className="h-10 rounded-full border-border bg-[color:var(--panel)] px-5 text-sm text-foreground hover:bg-accent"
                >
                  <Icon className="size-4" />
                  {label}
                </Button>
              ))}
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">Feed</h2>
              <Button variant="outline" size="sm" className="h-8 rounded-md border-border bg-accent px-3 text-foreground hover:bg-[#3a434d]">
                <Filter className="size-4" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {sections.map((section) => (
                <FeedCard key={section.id} section={section} />
              ))}
            </div>
          </div>
        </main>

        <aside className="px-5 py-9">
          <div className="space-y-6">
            {!copilotDismissed ? (
              <Card className="gap-0 overflow-hidden rounded-lg border-border bg-card py-0 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
                <div className="relative h-[72px] bg-[linear-gradient(135deg,#7adc97_0%,#dff7e5_30%,#5ee66f_55%,#7adc97_100%)]">
                  <button
                    type="button"
                    onClick={() => setCopilotDismissed(true)}
                    className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-white/20 hover:text-foreground"
                    aria-label="Dismiss event card"
                  >
                    ×
                  </button>
                </div>
                <div className="border-t border-border px-4 py-3 text-xs font-medium uppercase tracking-wide text-[#58A6FF]">
                  September 10 · 8:00 AM PT
                </div>
                <div className="px-4 pb-4">
                  <h3 className="mb-3 text-[28px] font-semibold leading-8 text-foreground">GitHub Copilot Day</h3>
                  <ul className="mb-4 space-y-2 text-sm leading-5 text-muted-foreground">
                    <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-success" />See how HydraFusion combines AI models to match the right model to the task</li>
                    <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-success" />Learn to automate work, run parallel agents, and use your own models</li>
                    <li className="flex gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-success" />Turn your best coding approaches into reusable Agent skills</li>
                  </ul>
                  <Button className="h-9 w-full rounded-md bg-[#f6f8fa] text-[#24292f] hover:bg-white">Set your reminder</Button>
                </div>
              </Card>
            ) : null}

            <Card className="rounded-lg border-border bg-card px-4 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
              <h3 className="mb-4 text-[22px] font-semibold text-foreground">Latest from our changelog</h3>
              <div className="space-y-4">
                {changelogItems.map((item) => (
                  <div key={item.text} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-border" />
                    </div>
                    <div>
                      <div className="mb-1 text-xs text-muted-foreground">{item.time}</div>
                      <button type="button" className="text-left text-[15px] leading-6 text-foreground hover:text-[#58A6FF]">
                        {item.text}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" className="mt-4 text-sm text-[#58A6FF] hover:underline">
                View changelog →
              </button>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
