"use client";

import { useState } from "react";
import { Bell, BookMarked, CircleHelp, House, Menu, Plus, Search, Users } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type DashboardFeedItem = {
  id: string;
  actor: {
    name: string;
    avatarSrc?: string;
    initials: string;
  };
  repository: string;
  action: string;
  branch?: string;
  commitMessage?: string;
  commitMeta?: string;
  relatedRepository?: string;
  timestamp: string;
};

export type DashboardTrendingRepository = {
  id: string;
  name: string;
  description: string;
  language: string;
  languageColor: string;
  starsToday: number;
};

export type DashboardHomeFeedViewProps = {
  state?: "default";
  searchPlaceholder?: string;
  signedInLabel?: string;
  feedItems?: DashboardFeedItem[];
  trendingRepositories?: DashboardTrendingRepository[];
};

const defaultFeedItems: DashboardFeedItem[] = [
  {
    id: "1",
    actor: { name: "OnderCampos", avatarSrc: "/Frida.png", initials: "OC" },
    repository: "openinterpreter/open-interpreter",
    action: "pushed to",
    branch: "main",
    commitMessage: "Improve local desktop execution flow",
    commitMeta: "2 commits",
    timestamp: "3 hours ago",
  },
  {
    id: "2",
    actor: { name: "fridaplanning", initials: "FP" },
    repository: "FridaProductPlannerWebBackend",
    action: "created repository",
    timestamp: "Yesterday",
  },
  {
    id: "3",
    actor: { name: "OnderCampos", avatarSrc: "/Frida.png", initials: "OC" },
    repository: "SAP-Cleaning-Frontend",
    action: "starred",
    relatedRepository: "vercel/next.js",
    timestamp: "2 days ago",
  },
];

const defaultTrendingRepositories: DashboardTrendingRepository[] = [
  {
    id: "1",
    name: "anthropics/claude-code",
    description: "Agentic coding tools for terminal workflows.",
    language: "TypeScript",
    languageColor: "#2f81f7",
    starsToday: 894,
  },
  {
    id: "2",
    name: "openai/codex",
    description: "Model-powered software engineering tasks and evaluation harnesses.",
    language: "Python",
    languageColor: "#388bfd",
    starsToday: 611,
  },
  {
    id: "3",
    name: "supabase/supabase",
    description: "Open source Firebase alternative with Postgres, auth, and storage.",
    language: "TypeScript",
    languageColor: "#2f81f7",
    starsToday: 438,
  },
];

function DashboardHeader({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  signedInLabel,
}: {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  signedInLabel: string;
}) {
  return (
    <header className="border-b border-border bg-[linear-gradient(180deg,#0d1117_0%,#101720_100%)]">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon-sm" className="border-border bg-transparent text-muted-foreground hover:bg-card hover:text-foreground">
            <Menu className="size-4" />
          </Button>
          <div className="flex size-8 items-center justify-center rounded-full bg-foreground text-background">
            <span className="text-lg font-bold">G</span>
          </div>
          <div className="relative hidden lg:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-9 w-[320px] rounded-md border-border bg-background pl-9 text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {[Bell, Plus, CircleHelp].map((Icon, index) => (
            <Button
              key={`${index}-${Icon.displayName ?? "icon"}`}
              variant="outline"
              size="icon-sm"
              className="border-border bg-transparent text-muted-foreground hover:bg-card hover:text-foreground"
            >
              <Icon className="size-4" />
            </Button>
          ))}
          <Avatar className="size-8 border border-border">
            <AvatarImage src="/Frida.png" alt={signedInLabel} />
            <AvatarFallback>OC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

function FeedCard({ item }: { item: DashboardFeedItem }) {
  return (
    <Card className="gap-0 rounded-lg border-border bg-background p-4 shadow-none">
      <div className="flex items-start gap-3">
        <Avatar className="size-10 border border-border">
          <AvatarImage src={item.actor.avatarSrc} alt={item.actor.name} />
          <AvatarFallback>{item.actor.initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1 text-sm">
            <span className="font-semibold text-foreground">{item.actor.name}</span>
            <span className="text-muted-foreground">{item.action}</span>
            <span className="font-semibold text-[#2f81f7]">{item.repository}</span>
            {item.branch ? <span className="rounded-full bg-card px-2 py-0.5 text-xs text-foreground">{item.branch}</span> : null}
            {item.relatedRepository ? (
              <span className="font-semibold text-[#2f81f7]">{item.relatedRepository}</span>
            ) : null}
          </div>
          {item.commitMessage ? <p className="mt-3 text-sm text-foreground">{item.commitMessage}</p> : null}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {item.commitMeta ? <span>{item.commitMeta}</span> : null}
            <span>{item.timestamp}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function TrendingCard({ repository }: { repository: DashboardTrendingRepository }) {
  return (
    <Card className="gap-0 rounded-lg border-border bg-background p-4 shadow-none">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[#2f81f7]">{repository.name}</h3>
          <p className="mt-2 text-sm leading-5 text-muted-foreground">{repository.description}</p>
        </div>
        <Button variant="outline" size="sm" className="border-border bg-card hover:bg-[--panel-hover]">
          Star
        </Button>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="size-3 rounded-full" style={{ backgroundColor: repository.languageColor }} />
        <span>{repository.language}</span>
        <span>•</span>
        <span>{repository.starsToday} stars today</span>
      </div>
    </Card>
  );
}

export function DashboardHomeFeedView({
  state = "default",
  searchPlaceholder = "Search or jump to…",
  signedInLabel = "OnderCampos",
  feedItems = defaultFeedItems,
  trendingRepositories = defaultTrendingRepositories,
}: DashboardHomeFeedViewProps) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"For you" | "Following">("For you");

  return (
    <div data-state={state} className="min-h-screen bg-background text-foreground">
      <DashboardHeader
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        searchPlaceholder={searchPlaceholder}
        signedInLabel={signedInLabel}
      />

      <main className="mx-auto grid max-w-[1280px] gap-8 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_336px] lg:px-6">
        <section>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-[32px] font-semibold">Home</h1>
              <p className="mt-1 text-sm text-muted-foreground">Stay updated with activity from repositories and people you follow.</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-1">
              {(["For you", "Following"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm transition-colors",
                    selectedFilter === filter ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {feedItems.map((item) => (
              <FeedCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <Card className="gap-0 rounded-lg border-border bg-background p-4 shadow-none">
            <div className="flex items-center gap-2">
              <House className="size-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Start a new project</h2>
            </div>
            <p className="mt-2 text-sm leading-5 text-muted-foreground">Create a repository, collaborate with your team, and ship your next release.</p>
            <Button className="mt-4 h-9 justify-start gap-2 bg-[#238636] text-white hover:bg-[#2ea043]">
              <Plus className="size-4" />
              New repository
            </Button>
          </Card>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <BookMarked className="size-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold">Trending repositories</h2>
            </div>
            <div className="space-y-3">
              {trendingRepositories.map((repository) => (
                <TrendingCard key={repository.id} repository={repository} />
              ))}
            </div>
          </div>

          <Card className="gap-0 rounded-lg border-border bg-background p-4 shadow-none">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold text-foreground">Explore developers</h2>
            </div>
            <p className="mt-2 text-sm leading-5 text-muted-foreground">Find teammates, open source maintainers, and organizations to follow next.</p>
          </Card>
        </aside>
      </main>
    </div>
  );
}
