"use client";

import { BookOpen, Building2, Cube, GitFork, Smile, Star, Users } from "lucide-react";
import { useState } from "react";
import { ContributionGraph } from "@/components/dashboard/contribution-graph";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProfileRepositoryCard, type ProfileRepository } from "@/components/dashboard/profile-repository-card";

const repositories: ProfileRepository[] = [
  { name: "open-interpreter", fork: "openinterpreter/openinterpreter", description: "A natural language interface for computers", language: "Python" },
  { name: "CountBoxingSofttek", language: "Python" }, { name: "count_colors", language: "Python" }, { name: "pushtest", language: "Python" }, { name: "SAP-Cleaning-Frontend", language: "TypeScript" }, { name: "FridaProductPlannerWebBackend", language: "Python" },
];
const tabs = [{ label: "Overview", icon: BookOpen }, { label: "Repositories", icon: GitFork, count: 16 }, { label: "Projects", icon: Building2 }, { label: "Packages", icon: Cube }, { label: "Stars", icon: Star }];

export default function UserProfileOverview({ state = "default" }: { state?: "default" }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [profileEdited, setProfileEdited] = useState(false);
  return <main className="profile-page" data-state={state}><DashboardHeader /><nav className="profile-tabs" aria-label="Profile navigation">{tabs.map(({ label, icon: Icon, count }) => <button type="button" key={label} onClick={() => setActiveTab(label)} className={activeTab === label ? "active" : ""}><Icon size={18} />{label}{count && <b>{count}</b>}</button>)}</nav><div className="profile-layout"><aside className="profile-sidebar"><div className="profile-avatar-wrap"><img src="/Frida.png" alt="Onder Francisco Campos Garcia" /><button type="button" aria-label="Set status"><Smile size={17} /></button></div><h1>Onder Francisco Campos<br />Garcia</h1><p className="profile-handle">OnderCampos</p><button type="button" className="edit-profile" onClick={() => setProfileEdited(!profileEdited)}>{profileEdited ? "Profile updated" : "Edit profile"}</button><p className="followers"><Users size={17} /> <strong>2</strong> followers · <strong>1</strong> following</p><p className="company"><Building2 size={18} /> Softtek</p><div className="profile-rule" /><h2>Achievements</h2><div className="achievements"><span>💕</span><span>👑</span><span>🤖<b>×2</b></span><span>🫛</span></div><div className="profile-rule" /><h2>Organizations</h2></aside><section className="profile-content"><div className="popular-heading"><h2>Popular repositories</h2><button type="button">Customize your pins</button></div><div className="popular-repositories">{repositories.map((repository) => <ProfileRepositoryCard repository={repository} key={repository.name} />)}</div><ContributionGraph contributionCount={471} /><h2 className="activity-title">Contribution activity</h2><div className="activity-month"><b>September <span>2026</span></b><div /></div></section></div></main>;
}
