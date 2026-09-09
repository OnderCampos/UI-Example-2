"use client";

import { ArrowRight, CalendarDays, ExternalLink, Home, LayoutGrid, Search, Settings, Sparkles, Users } from "lucide-react";
import { useMemo, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type DashboardHomeState = "default";

export type DashboardHomeViewProps = {
  state?: DashboardHomeState;
};

type QuickAction = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

type MetricCard = {
  id: string;
  label: string;
  value: string;
  change: string;
};

const quickActions: QuickAction[] = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "projects", label: "Projects", icon: LayoutGrid },
  { id: "team", label: "Team", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

const metricCards: MetricCard[] = [
  { id: "revenue", label: "Monthly revenue", value: "$48,240", change: "+12.4%" },
  { id: "active", label: "Active projects", value: "18", change: "+3" },
  { id: "tasks", label: "Open tasks", value: "64", change: "11 due today" },
  { id: "satisfaction", label: "Client satisfaction", value: "98%", change: "+2%" },
];

export function DashboardHomeView({ state = "default" }: DashboardHomeViewProps) {
  const [searchValue, setSearchValue] = useState("");
  const [activeAction, setActiveAction] = useState("overview");

  const currentState = useMemo(() => state, [state]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <main className="mx-auto flex max-w-[1180px] flex-col gap-6 px-6 py-8">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-5 shadow-[var(--shadow-sm)]">
          <div>
            <p className="text-sm font-medium text-[var(--text-muted)]">Dashboard</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-[-0.02em] text-[var(--text)]">Welcome back, Frida</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-[240px] max-w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
              <Input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search"
                className="h-10 rounded-xl border-[var(--border)] bg-[var(--input-background)] pl-9 text-sm text-[var(--text)]"
              />
            </div>
            <Button className="h-10 rounded-xl bg-[var(--primary)] px-4 text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)]">
              New report
            </Button>
            <Avatar className="h-10 w-10 border border-[var(--border)] bg-[var(--surface-elevated)]">
              <AvatarFallback>FR</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
            <p className="mb-3 text-sm font-medium text-[var(--text-muted)]">Quick actions</p>
            <div className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                const isActive = activeAction === action.id;
                return (
                  <button
                    key={action.id}
                    onClick={() => setActiveAction(action.id)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                    style={{
                      backgroundColor: isActive ? "var(--primary-active)" : "transparent",
                      color: isActive ? "#ffffff" : "var(--text-secondary)",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{action.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {metricCards.map((metric) => (
                <Card key={metric.id} className="rounded-2xl border-[var(--border)] bg-[var(--surface)] shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[var(--text-muted)]">{metric.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-semibold text-[var(--text)]">{metric.value}</div>
                    <p className="mt-2 text-sm text-[var(--primary)]">{metric.change}</p>
                  </CardContent>
                </Card>
              ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
              <Card className="rounded-2xl border-[var(--border)] bg-[var(--surface)] shadow-none">
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="text-xl text-[var(--text)]">Performance snapshot</CardTitle>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">Your latest delivery metrics at a glance.</p>
                  </div>
                  <Sparkles className="h-5 w-5 text-[var(--primary)]" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-2xl bg-[var(--surface-elevated)] p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[var(--text-muted)]">Project velocity</p>
                        <p className="mt-2 text-4xl font-semibold text-[var(--text)]">87%</p>
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary)]/15 text-[var(--primary)]">
                        <ArrowRight className="h-6 w-6" />
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-[var(--text-secondary)]">Up from 76% last month across all active teams.</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-[var(--border)] p-4">
                      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                        <CalendarDays className="h-4 w-4" />
                        Upcoming review
                      </div>
                      <p className="mt-3 text-lg font-semibold text-[var(--text)]">Quarterly planning sync</p>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">Thursday, 11:00 AM</p>
                    </div>
                    <div className="rounded-2xl border border-[var(--border)] p-4">
                      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                        <ExternalLink className="h-4 w-4" />
                        Shared update
                      </div>
                      <p className="mt-3 text-lg font-semibold text-[var(--text)]">Client status deck ready</p>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">Last edited 25 minutes ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-[var(--border)] bg-[var(--surface)] shadow-none">
                <CardHeader>
                  <CardTitle className="text-xl text-[var(--text)]">Team highlights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    ["Design sprint approved", "Alicia · 2h ago"],
                    ["Backend migration completed", "Marcus · 4h ago"],
                    ["New feedback batch added", "Support · 6h ago"],
                  ].map(([title, meta]) => (
                    <div key={title} className="rounded-2xl border border-[var(--border)] px-4 py-3">
                      <p className="font-medium text-[var(--text)]">{title}</p>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">{meta}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
          </div>
        </section>
      </main>
      <div className="hidden">{currentState}</div>
    </div>
  );
}
