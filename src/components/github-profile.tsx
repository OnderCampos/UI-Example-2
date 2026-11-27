"use client";

import { useState } from "react";
import { BookOpen, Box, Building2, ChevronDown, CircleDot, Github, GitPullRequest, Inbox, Mail, Menu, Package, Plus, Search, Smile, Star, Users, Grid2X2 } from "lucide-react";

type Repository = { name: string; description?: string; language: string; color: string };
export type GitHubProfileProps = { mode?: "default"; repositories?: Repository[]; contributionCount?: number };

const defaultRepositories: Repository[] = [
  { name: "open-interpreter", description: "Forked from openinterpreter/openinterpreter\n\nA natural language interface for computers", language: "Python", color: "#3572a5" },
  { name: "CountBoxingSofttek", language: "Python", color: "#3572a5" },
  { name: "count_colors", language: "Python", color: "#3572a5" },
  { name: "pushtest", language: "Python", color: "#3572a5" },
  { name: "SAP-Cleaning-Frontend", language: "TypeScript", color: "#3178c6" },
  { name: "FridaProductPlannerWebBackend", language: "Python", color: "#3572a5" },
];

function IconControl({ label, children }: { label: string; children: React.ReactNode }) { return <button className="profile-icon-control" aria-label={label}>{children}</button>; }

export function ProfileHeader({ selectedTab, onTabChange }: { selectedTab: string; onTabChange: (tab: string) => void }) {
  const tabs = [["Overview", BookOpen], ["Repositories", BookOpen, "16"], ["Projects", Grid2X2], ["Packages", Box], ["Stars", Star]] as const;
  return <header className="profile-header"><div className="profile-topbar"><div className="profile-brand"><IconControl label="Open navigation"><Menu size={21}/></IconControl><Github size={34} fill="currentColor"/><strong>OnderCampos</strong></div><div className="profile-actions"><label className="profile-search"><Search size={17}/><input aria-label="Search GitHub" placeholder="Type / to search"/><kbd>/</kbd></label><IconControl label="Copilot"><span className="copilot-glyph">◉</span></IconControl><IconControl label="Create new"><Plus size={19}/><ChevronDown size={13}/></IconControl><IconControl label="Issues"><CircleDot size={19}/></IconControl><IconControl label="Pull requests"><GitPullRequest size={19}/></IconControl><IconControl label="Inbox"><Inbox size={19}/></IconControl><span className="user-mini">OC</span></div></div><nav className="profile-tabs" aria-label="Profile navigation">{tabs.map(([name, Icon, count]) => <button onClick={() => onTabChange(name)} className={selectedTab === name ? "active" : ""} key={name}><Icon size={18}/>{name}{count && <small>{count}</small>}</button>)}</nav></header>;
}

function RepositoryCard({ repository }: { repository: Repository }) { return <article className="profile-repository"><div className="repository-name"><a href={`#${repository.name}`}>{repository.name}</a><span>Public</span></div>{repository.description && <p>{repository.description.split("\n").map((line, index) => <span key={line}>{line}{index === 0 && <br/>}</span>)}</p>}<div className="repository-language"><i style={{ background: repository.color }}/>{repository.language}</div></article>; }

function ContributionGrid() { const weeks = Array.from({ length: 53 }, (_, week) => Array.from({ length: 7 }, (_, day) => ((week * 11 + day * 7 + (week > 46 ? 1 : 0)) % 13 < 3 ? ((week + day) % 4) + 1 : 0))); const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]; return <div className="contribution-box"><div className="month-labels">{months.map(month => <span key={month}>{month}</span>)}</div><div className="heatmap-wrap"><div className="weekday-labels"><span>Mon</span><span>Wed</span><span>Fri</span></div><div className="heatmap">{weeks.flatMap((week, wi) => week.map((level, di) => <i key={`${wi}-${di}`} data-level={level}/>))}</div></div><div className="contribution-footer"><span>Learn how we count contributions</span><div>Less <i data-level="0"/><i data-level="1"/><i data-level="2"/><i data-level="3"/><i data-level="4"/> More</div></div></div>; }

export function GitHubProfile({ mode = "default", repositories = defaultRepositories, contributionCount = 471 }: GitHubProfileProps) {
  const [selectedTab, setSelectedTab] = useState("Overview"); const [year, setYear] = useState("2026"); const [following, setFollowing] = useState(false);
  return <div className="github-profile" data-mode={mode}><ProfileHeader selectedTab={selectedTab} onTabChange={setSelectedTab}/><div className="profile-layout"><aside className="profile-sidebar"><div className="profile-photo">OC</div><button className="status-button" aria-label="Set status"><Smile size={18}/></button><h1>Onder Francisco Campos<br/>Garcia</h1><div className="profile-handle">OnderCampos</div><button className={following ? "edit-profile following" : "edit-profile"} onClick={() => setFollowing(!following)}>{following ? "Following" : "Edit profile"}</button><p className="follower-line"><Users size={16}/> <a href="#followers">2 followers</a> · <a href="#following">1 following</a></p><p className="company-line"><Building2 size={18}/> <a href="#company">Softtek</a></p><section className="achievements"><h2>Achievements</h2><div className="badges"><b>💞</b><b>👑</b><b>🤖</b><b>🫛</b></div></section><section className="organizations"><h2>Organizations</h2></section></aside><main className="profile-main"><div className="popular-heading"><h2>Popular repositories</h2><a href="#customize">Customize your pins</a></div><div className="repository-grid">{repositories.map(repository => <RepositoryCard key={repository.name} repository={repository}/>)}</div><section className="contributions"><div className="contribution-heading"><h2>{contributionCount} contributions in the last year</h2><button>Contribution settings <ChevronDown size={14}/></button></div><ContributionGrid/></section><section className="activity"><h2>Contribution activity</h2><div className="activity-line"><b>September 2026</b></div></section></main><aside className="year-selector">{["2026", "2025", "2024", "2023"].map(value => <button className={year === value ? "selected" : ""} onClick={() => setYear(value)} key={value}>{value}</button>)}</aside></div></div>;
}
