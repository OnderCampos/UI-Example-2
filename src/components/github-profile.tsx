"use client";

import { useState } from "react";
import { Bell, BookOpen, Box, Building2, ChevronDown, CircleDot, GitPullRequest, Github, Menu, Package, Plus, Search, Smile, Star, Users } from "lucide-react";

const repositories = [
  ["open-interpreter", "Forked from openinterpreter/openinterpreter", "A natural language interface for computers", "Python"],
  ["CountBoxingSofttek", "", "", "Python"],
  ["count_colors", "", "", "Python"],
  ["pushtest", "", "", "Python"],
  ["SAP-Cleaning-Frontend", "", "", "TypeScript"],
  ["FridaProductPlannerWebBackend", "", "", "Python"],
] as const;

export type UserProfileOverviewProps = { state?: "default" };

function HeaderButton({ label, children }: { label: string; children: React.ReactNode }) {
  return <button className="profile-icon-button" aria-label={label} title={label}>{children}</button>;
}

function ProfileHeader() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = [[BookOpen, "Overview"], [BookOpen, "Repositories", "16"], [Box, "Projects"], [Package, "Packages"], [Star, "Stars"]] as const;
  return <header className="profile-header">
    <div className="profile-topbar">
      <div className="flex items-center gap-3"><HeaderButton label="Open navigation"><Menu size={20}/></HeaderButton><Github className="size-8 fill-gh-text text-gh-text"/><strong className="text-sm text-gh-text">OnderCampos</strong></div>
      <div className="flex items-center gap-2"><label className="profile-search"><Search size={17}/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Type / to search" aria-label="Search GitHub"/><kbd>/</kbd></label><HeaderButton label="Copilot">◉<ChevronDown size={12}/></HeaderButton><HeaderButton label="Create new"><Plus size={18}/><ChevronDown size={12}/></HeaderButton><HeaderButton label="Issues"><CircleDot size={19}/></HeaderButton><HeaderButton label="Pull requests"><GitPullRequest size={19}/></HeaderButton><HeaderButton label="Notifications"><Bell size={19}/></HeaderButton><img className="size-8 rounded-full object-cover" src="/Frida.png" alt="OnderCampos"/></div>
    </div>
    <nav className="profile-tabs" aria-label="Profile navigation">{tabs.map(([Icon, label, count]) => <button key={label} onClick={() => setActiveTab(label)} className={activeTab === label ? "active" : ""}><Icon size={18}/>{label}{count && <span className="tab-count">{count}</span>}</button>)}</nav>
  </header>;
}

function RepositoryCard({ repo }: { repo: typeof repositories[number] }) {
  return <article className="profile-repository"><div className="flex items-start justify-between gap-3"><button className="repo-name">{repo[0]}</button><span className="visibility">Public</span></div>{repo[1] && <p className="fork-note">{repo[1]}</p>}{repo[2] && <p className="repo-description">{repo[2]}</p>}<div className="repo-language"><i className={repo[3] === "TypeScript" ? "ts" : ""}/>{repo[3]}</div></article>;
}

function ContributionGraph() {
  const [year, setYear] = useState("2026");
  const levels = Array.from({ length: 53 * 7 }, (_, index) => (index * 17 + Math.floor(index / 7) * 5) % 13 < 3 ? ((index * 7) % 4) + 1 : 0);
  const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  return <section className="contribution-section"><h2>471 contributions in the last year</h2><div className="contribution-layout"><div className="contribution-card"><button className="settings">Contribution settings <ChevronDown size={13}/></button><div className="graph-row"><div className="weekdays"><span>Mon</span><span>Wed</span><span>Fri</span></div><div className="graph-area"><div className="months">{months.map((month) => <span key={month}>{month}</span>)}</div><div className="heatmap" aria-label="Contribution activity heatmap">{levels.map((level, index) => <i key={index} className={`level-${level}`}/>)}</div></div></div><div className="graph-bottom"><span>Learn how we count contributions</span><span className="legend">Less <i className="level-0"/><i className="level-1"/><i className="level-2"/><i className="level-3"/><i className="level-4"/> More</span></div></div><div className="year-list">{["2026", "2025", "2024", "2023"].map((item) => <button key={item} onClick={() => setYear(item)} className={year === item ? "selected" : ""}>{item}</button>)}</div></div></section>;
}

export function UserProfileOverview({ state = "default" }: UserProfileOverviewProps) {
  return <div className="profile-app" data-state={state}><ProfileHeader/><main className="profile-page"><aside className="profile-sidebar"><div className="avatar-wrap"><img src="/Frida.png" alt="Onder Francisco Campos Garcia"/><button aria-label="Set status"><Smile size={17}/></button></div><h1>Onder Francisco Campos<br/>Garcia</h1><p className="handle">OnderCampos</p><button className="edit-profile">Edit profile</button><p className="followers"><Users size={16}/> <a>2 followers</a> · <a>1 following</a></p><p className="company"><Building2 size={18}/> Softtek</p><div className="profile-divider"/><h2>Achievements</h2><div className="achievements"><span>💞</span><span>👑</span><span>🤖<b>x2</b></span><span>🫛</span></div><div className="profile-divider"/><h2>Organizations</h2></aside><section className="profile-content"><div className="repositories-heading"><h2>Popular repositories</h2><button>Customize your pins</button></div><div className="repository-grid">{repositories.map((repo) => <RepositoryCard key={repo[0]} repo={repo}/>)}</div><ContributionGraph/><section className="activity"><h2>Contribution activity</h2><div><b>September 2026</b><span/></div></section></section></main></div>;
}
