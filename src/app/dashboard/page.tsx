"use client";

import { ChevronDown, Filter, Plus, Rss, Sparkles } from "lucide-react";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { RepositoryCard, type RepositoryCardItem } from "@/components/dashboard/repository-card";

const latestRepositories: RepositoryCardItem[] = [
  { name: "frida/FridaProductPlannerWebBackend", description: "Planner application backend services", language: "Python", stars: "" },
  { name: "OnderCampos/SAP-Cleaning-Frontend", description: "Frontend interface for SAP cleaning workflows", language: "TypeScript", stars: "" },
];

const popularRepositories: RepositoryCardItem[] = [
  { name: "openinterpreter/open-interpreter", description: "A natural language interface for computers", language: "Python", stars: "57.8k", avatar: "◒" },
  { name: "microsoft/vscode", description: "Visual Studio Code", language: "TypeScript", stars: "179k", avatar: "◆" },
];

export default function DashboardHome({ state = "default" }: { state?: "default" }) {
  const [feed, setFeed] = useState<"Following" | "For you">("Following");
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <main className="dashboard-page" data-state={state}>
      <DashboardHeader />
      <div className="dashboard-layout">
        <section className="dashboard-feed" aria-label="Dashboard activity">
          <div className="feed-heading">
            <div><h1>Home</h1><p>Updates from people and repositories you follow</p></div>
            <button type="button" className="feed-filter" onClick={() => setFilterOpen(!filterOpen)} aria-expanded={filterOpen}><Filter size={16} /> Filter <ChevronDown size={14} /></button>
          </div>
          {filterOpen && <div className="filter-panel"><button type="button" onClick={() => setFeed("Following")} className={feed === "Following" ? "selected" : ""}>Following</button><button type="button" onClick={() => setFeed("For you")} className={feed === "For you" ? "selected" : ""}>For you</button></div>}
          <div className="feed-tabs" role="tablist"><button type="button" role="tab" aria-selected={feed === "Following"} className={feed === "Following" ? "active" : ""} onClick={() => setFeed("Following")}>Following</button><button type="button" role="tab" aria-selected={feed === "For you"} className={feed === "For you" ? "active" : ""} onClick={() => setFeed("For you")}>For you</button></div>
          <div className="feed-message"><Rss size={20} /><div><strong>{feed === "Following" ? "All caught up!" : "Explore projects picked for you"}</strong><p>{feed === "Following" ? "You’re up to date with recent activity." : "Discover repositories and activity from the community."}</p></div></div>
          <RepositoryCard title="Latest changes" items={latestRepositories} />
        </section>
        <aside className="dashboard-sidebar">
          <section className="sidebar-section"><div className="sidebar-title"><h2>Top repositories</h2><button type="button" aria-label="Repository options"><ChevronDown size={16} /></button></div><RepositoryCard title="Popular" items={popularRepositories} /></section>
          <section className="dashboard-start"><Sparkles size={19} /><h2>Discover projects</h2><p>Find repositories and people to follow.</p><button type="button"><Plus size={16} /> Explore GitHub</button></section>
        </aside>
      </div>
    </main>
  );
}
