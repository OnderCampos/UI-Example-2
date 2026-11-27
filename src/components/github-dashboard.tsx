"use client";

import { useState } from "react";
import {
  Bell, Bot, ChevronDown, CircleDot, Command, FileCode2, Filter,
  GitBranch, Github, GitPullRequest, Grip, Inbox, Menu, Monitor,
  Plus, Search, Send, Settings2, Star, UsersRound, X,
} from "lucide-react";

type Repo = { name: string; description?: string; language?: string; stars?: string; avatar?: string };

const repositories = [
  "OnderCampos/CountBoxingSofttek", "Fridaplatform/cp-cloudagents", "OnderCampos/UI-Agent-Example",
  "Fridaplatform/ReqGen-Backend", "Fridaplatform/ProductPlanner", "Fridaplatform/reggen_frontend", "OnderCampos/FridaProductPlannerWebBackend",
];

const trending: Repo[] = [
  { name: "ayghri/i-have-adhd", description: "A skill to stop your coding agent from burying the answer. ADHD-friendly output.", language: "Python", stars: "33.6k", avatar: "🌌" },
  { name: "spotify/portal-ai-plugins", language: "TypeScript", stars: "716", avatar: "🟢" },
];
const recommended: Repo[] = [{ name: "jasonkylelol/agraphag-chinese", description: "支持中文CNNCN 的 microsoft/agraphag", language: "Python", stars: "51", avatar: "🌿" }];

function IconButton({ children, label }: { children: React.ReactNode; label: string }) {
  return <button aria-label={label} className="gh-icon-button">{children}</button>;
}

function SplitButton({ label, icon }: { label: string; icon?: React.ReactNode }) {
  const [selected, setSelected] = useState(label);
  return <div className="gh-split"><button onClick={() => setSelected(label)}>{icon}{selected}</button><button aria-label={`${label} menu`} onClick={() => setSelected(selected === label ? `${label} selected` : label)}><ChevronDown size={14}/></button></div>;
}

function RepositoryCard({ title, items }: { title: string; items: Repo[] }) {
  const [starred, setStarred] = useState<Record<string, boolean>>({});
  return <section className="repo-card">
    <div className="repo-section-title"><Star size={17}/><span>{title}</span>{title === "Trending repositories" && <><span>·</span><a href="#more">See more</a></>}</div>
    {items.map((repo, index) => <article className="repo-item" key={repo.name}>
      <div className="repo-top"><div className="repo-name"><span className="repo-avatar">{repo.avatar}</span><a href={`#${repo.name}`}>{repo.name}</a></div><SplitButton label={starred[repo.name] ? "Starred" : "Star"} icon={<Star size={16}/>} /></div>
      {repo.description && <p>{repo.description}</p>}
      <div className="repo-meta"><span><i className="language-dot"/> {repo.language}</span><span><Star size={16}/> {repo.stars}</span></div>
      {index !== items.length - 1 && <div className="repo-divider"/>}
    </article>)}
  </section>;
}

export function GitHubDashboard({ mode = "default" }: { mode?: "default" }) {
  const [query, setQuery] = useState("");
  const [ask, setAsk] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(true);
  const visibleRepos = repositories.filter((r) => r.toLowerCase().includes(query.toLowerCase()));
  return <div className="github-dashboard" data-mode={mode}>
    <header className="gh-header">
      <div className="header-left"><IconButton label="Open navigation"><Menu size={21}/></IconButton><Github className="github-mark" fill="currentColor" size={34}/><strong>Dashboard</strong></div>
      <div className="header-actions"><label className="global-search"><Search size={18}/><input aria-label="Search" placeholder="Type / to search"/><kbd>/</kbd></label><IconButton label="Copilot"><Bot size={18}/></IconButton><IconButton label="Create new"><Plus size={19}/></IconButton><IconButton label="Issues"><CircleDot size={19}/></IconButton><IconButton label="Pull requests"><GitPullRequest size={19}/></IconButton><IconButton label="Inbox"><Inbox size={19}/></IconButton><IconButton label="Notifications"><Bell size={19}/></IconButton><span className="profile-avatar">👨🏻</span></div>
    </header>
    <div className="dashboard-body">
      <aside className="left-sidebar"><div className="account"><span className="small-avatar">👨🏻</span><strong>OnderCampos</strong><ChevronDown size={14}/></div><div className="sidebar-heading"><strong>Top repositories</strong><button className="new-button"><Monitor size={15}/> New</button></div><input className="repo-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a repository..." aria-label="Find a repository"/>
        <nav className="repo-list">{visibleRepos.map((repo, i) => <a href={`#${repo}`} key={repo}><span className={i === 0 || i === 2 || i === 6 ? "small-avatar" : "org-avatar"}>{i === 0 || i === 2 || i === 6 ? "👨🏻" : "F"}</span>{repo}</a>)}</nav><button className="show-more">Show more</button>
      </aside>
      <main className="feed"><h1>Home</h1><section className="ask-box"><textarea value={ask} onChange={(e) => setAsk(e.target.value)} placeholder="Ask anything or type @ to add context" aria-label="Ask Copilot"/><div className="ask-footer"><div><SplitButton label="Ask" icon={<Bot size={18}/>}/><SplitButton label="All repositories" icon={<Monitor size={17}/>}/><IconButton label="Add context"><Plus size={19}/></IconButton></div><div className="ask-right"><UsersRound size={17}/><span>Auto</span><ChevronDown size={13}/><Settings2 size={18}/><Send size={20}/></div></div></section>
        <div className="quick-actions"><button><Settings2 size={18}/>Debug</button><button><Command size={18}/>Agent</button><button><Grip size={18}/>Create issue</button><button><FileCode2 size={18}/>Write code<ChevronDown size={14}/></button><button><GitBranch size={18}/>Git<ChevronDown size={14}/></button><button><GitPullRequest size={18}/>Pull requests<ChevronDown size={14}/></button></div>
        <div className="feed-heading"><strong>Feed</strong><button onClick={() => setFilterOpen(!filterOpen)} className={filterOpen ? "filter active" : "filter"}><Filter size={18}/>Filter</button></div>{filterOpen && <div className="filter-panel"><label>Show <select defaultValue="all"><option value="all">All activity</option><option>Trending only</option><option>Recommended only</option></select></label></div>}
        <RepositoryCard title="Trending repositories" items={trending}/><RepositoryCard title="Recommended for you" items={recommended}/>
      </main>
      <aside className="right-sidebar">{eventOpen && <section className="copilot-card"><div className="event-art"><div className="cube c1"/><div className="cube c2"/><div className="cube c3"/><Bot size={35}/><button onClick={() => setEventOpen(false)} aria-label="Dismiss event"><X size={17}/></button></div><div className="event-time">SEPTEMBER 10 · 8:00 AM PT</div><div className="event-content"><h2>GitHub Copilot Day</h2><ul><li>See how HydraFusion combines AI models to match the right model to the task</li><li>Learn to automate work, run parallel agents, and use your own models</li><li>Turn your best coding approaches into reusable Agent Skills</li></ul><button>Set your reminder</button></div></section>}
        <section className="changelog-card"><h2>Latest from our changelog</h2>{[["3 hours ago","Remediate Code Quality findings with agentic autofix"],["13 hours ago","Enterprise-managed sandbox in Copilot for JetBrains"],["18 hours ago","GitHub Enterprise Server 3.22 is now generally available"],["Yesterday","New customer portal help.github.com"]].map(([time,text]) => <div className="change" key={text}><i/><div><small>{time}</small><a href="#change">{text}</a></div></div>)}<a className="view-changelog" href="#changelog">View changelog →</a></section>
      </aside>
    </div>
  </div>;
}
