"use client";

import { Bot, ChevronDown, CircleDotDashed, FileText, Filter, GitBranch, GitPullRequest, MessageSquare, Plus, Search, Settings } from "lucide-react";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { RepositoryCard } from "@/components/dashboard/repository-card";

const repositories = ["OnderCampos/CountBoxingSofttek", "Fridaplatform/cp-cloudagents", "OnderCampos/UI-Agent-Example", "Fridaplatform/ReqGen-Backend", "Fridaplatform/ProductPlanner", "Fridaplatform/reggen_frontend", "OnderCampos/FridaProductPlannerWebBackend"];
const trending = [{ name: "ayghri/i-have-adhd", description: "A skill to stop your coding agent from burying the answer. ADHD-friendly output.", language: "Python", stars: "33.6k", avatar: "🌎" }, { name: "spotify/portal-ai-plugins", language: "TypeScript", stars: "716", avatar: "🟢" }];
const recommended = [{ name: "jasonkylelol/agraphag-chinese", description: "支持中文CNNNN 的 microsoft/agraphag", language: "Python", stars: "51", avatar: "🌐" }];

function Sidebar() {
  const [query, setQuery] = useState("");
  return <aside className="dash-sidebar"><div className="sidebar-user"><span className="small-avatar">◉</span><strong>OnderCampos</strong><ChevronDown size={14} /></div><div className="sidebar-top"><strong>Top repositories</strong><button type="button"><Plus size={15} /> New</button></div><label className="repo-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a repository..." /></label><nav>{repositories.filter((repo) => repo.toLowerCase().includes(query.toLowerCase())).map((repo, index) => <button type="button" className="side-repo" key={repo}><span>{index === 0 || index === 2 || index === 6 ? "◉" : "F"}</span>{repo}</button>)}</nav><button type="button" className="show-more">Show more</button></aside>
}

function CopilotPanel() {
  const [reminded, setReminded] = useState(false);
  return <aside className="right-column"><section className="copilot-card"><div className="copilot-art"><div className="cube cube-one" /><div className="cube cube-two" /><div className="cube cube-three" /><button type="button" aria-label="Dismiss Copilot event">×</button></div><div className="event-date">SEPTEMBER 10 · 8:00 AM PT</div><div className="copilot-body"><h2>GitHub Copilot Day</h2><ul><li>See how HydraFusion combines AI models to match the right model to the task</li><li>Learn to automate work, run parallel agents, and use your own models</li><li>Turn your best coding approaches into reusable Agent Skills</li></ul><button type="button" onClick={() => setReminded(!reminded)}>{reminded ? "Reminder set" : "Set your reminder"}</button></div></section><section className="changelog"><h2>Latest from our changelog</h2>{[["3 hours ago", "Remediate Code Quality findings with agentic autofix"], ["13 hours ago", "Enterprise-managed sandbox in Copilot for JetBrains"], ["18 hours ago", "GitHub Enterprise Server 3.22 is now generally available"], ["Yesterday", "New customer portal help.github.com"]].map(([time, text]) => <div className="change" key={text}><i /><div><small>{time}</small><p>{text}</p></div></div>)}<button type="button">View changelog →</button></section></aside>
}

export default function DashboardHome({ state = "default" }: { state?: "default" }) {
  const [prompt, setPrompt] = useState("");
  const [scope, setScope] = useState("All repositories");
  return <main className="dashboard-shell" data-state={state}><DashboardHeader /><div className="dashboard-body"><Sidebar /><div className="dash-main"><h1>Home</h1><section className="ask-box"><textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Ask anything or type @ to add context" aria-label="Ask Copilot" /><div className="ask-toolbar"><button type="button"><MessageSquare size={17} /> Ask <ChevronDown size={14} /></button><select value={scope} onChange={(event) => setScope(event.target.value)} aria-label="Repository scope"><option>All repositories</option><option>Current repository</option><option>My repositories</option></select><button type="button" aria-label="Add context"><Plus size={18} /></button><span /><button type="button"><Bot size={17} /> Auto <ChevronDown size={14} /></button><button type="button" aria-label="Send prompt">➤</button></div></section><div className="quick-actions">{[[Settings,"Debug"],[Bot,"Agent"],[CircleDotDashed,"Create issue"],[FileText,"Write code"],[GitBranch,"Git"],[GitPullRequest,"Pull requests"]].map(([Icon, text]) => <button key={String(text)} type="button"><Icon size={18} />{String(text)}{["Write code", "Git", "Pull requests"].includes(String(text)) && <ChevronDown size={14} />}</button>)}</div><div className="feed-title"><strong>Feed</strong><button type="button"><Filter size={17} /> Filter</button></div><RepositoryCard title="Trending repositories · See more" items={trending} /><RepositoryCard title="Recommended for you" items={recommended} /></div><CopilotPanel /></div></main>;
}
