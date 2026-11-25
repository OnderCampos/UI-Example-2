"use client";

import { useState } from "react";
import {
  Bell, Bot, ChevronDown, CircleDot, Cpu, FileText, Filter, GitBranch, GitPullRequest, GitPullRequestArrow, GitPullRequestClosed, Github, Menu, Monitor, Plus, Search, Sparkles, Star, Users, X
} from "lucide-react";

const repositories = [
  "OnderCampos/CountBoxingSofttek", "Fridaplatform/cp-cloudagents", "OnderCampos/UI-Agent-Example", "Fridaplatform/ReqGen-Backend", "Fridaplatform/ProductPlanner", "Fridaplatform/reggen_frontend", "OnderCampos/FridaProductPlannerWebBackend"
];

const trending = [
  { name: "ayghri/i-have-adhd", description: "A skill to stop your coding agent from burying the answer. ADHD-friendly output.", language: "Python", stars: "33.6k", avatar: "🌎" },
  { name: "spotify/portal-ai-plugins", description: "", language: "TypeScript", stars: "716", avatar: "🟢" },
];

const recommended = [{ name: "jasonkylelol/graphag-chinese", description: "支持中文CNNCN 的 microsoft/graphrag", language: "Python", stars: "51", avatar: "🐼" }];

export type DashboardHomeProps = { state?: "default" };

function IconButton({ children, label }: { children: React.ReactNode; label: string }) {
  return <button aria-label={label} title={label} className="gh-icon-button">{children}</button>;
}

function StarButton() {
  const [starred, setStarred] = useState(false);
  return <div className="flex shrink-0"><button onClick={() => setStarred(!starred)} className={`gh-star ${starred ? "is-starred" : ""}`}><Star size={16} fill={starred ? "currentColor" : "none"} />{starred ? "Starred" : "Star"}</button><button aria-label="More star options" className="gh-star border-l-0 px-2"><ChevronDown size={13} /></button></div>;
}

function RepositoryCard({ repo, showDescription = true }: { repo: typeof trending[number]; showDescription?: boolean }) {
  return <article className="gh-repo-row">
    <div className="flex min-w-0 flex-1 flex-col gap-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-[#7aadff]"><span className="grid size-5 place-items-center overflow-hidden rounded-full bg-[#30363d] text-[11px]">{repo.avatar}</span><button className="hover:underline">{repo.name}</button></div>
      {showDescription && repo.description && <p className="text-sm text-gh-text">{repo.description}</p>}
      <div className="flex items-center gap-5 text-xs text-gh-muted"><span className="flex items-center gap-1"><i className="size-3 rounded-full bg-[#3572a5]" />{repo.language}</span><span className="flex items-center gap-1"><Star size={15} />{repo.stars}</span></div>
    </div>
    <StarButton />
  </article>;
}

function FeedGroup({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return <section className="gh-feed-card"><div className="flex items-center gap-2 border-b border-gh-border px-4 py-4 text-sm text-gh-muted">{icon}<span>{title}</span>{title === "Trending repositories" && <button className="text-[#58a6ff] hover:underline">See more</button>}</div>{children}</section>;
}

function DashboardHeader() {
  const [search, setSearch] = useState("");
  return <header className="gh-header"><div className="flex items-center gap-3"><IconButton label="Open navigation"><Menu size={20} /></IconButton><Github className="size-8 fill-[#e6edf3] text-[#e6edf3]" /><strong className="text-sm">Dashboard</strong></div><div className="flex items-center gap-2"><label className="gh-global-search"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Type / to search" aria-label="Search GitHub"/><kbd>/</kbd></label><IconButton label="Copilot"><Bot size={18} /></IconButton><IconButton label="Create new"><Plus size={19} /><ChevronDown size={12} /></IconButton><IconButton label="Issues"><CircleDot size={19} /></IconButton><IconButton label="Pull requests"><GitPullRequest size={19} /></IconButton><IconButton label="Notifications"><Bell size={19} /></IconButton><img className="size-8 rounded-full border border-gh-border object-cover" src="/Frida.png" alt="OnderCampos" /></div></header>;
}

function Sidebar() {
  const [query, setQuery] = useState("");
  return <aside className="gh-sidebar"><div className="mb-10 flex items-center gap-3 px-1"><img className="size-6 rounded-full object-cover" src="/Frida.png" alt=""/><button className="flex items-center gap-1 text-sm font-semibold">OnderCampos <ChevronDown size={14}/></button></div><div className="mb-2 flex items-center justify-between"><strong className="text-sm">Top repositories</strong><button className="gh-new"><Monitor size={15}/>New</button></div><input className="gh-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a repository..." aria-label="Find a repository"/><nav className="mt-4 space-y-3">{repositories.filter((name) => name.toLowerCase().includes(query.toLowerCase())).map((name, index) => <button key={name} className="flex w-full items-start gap-2 text-left text-sm leading-5 text-gh-text hover:text-white"><span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-[#30363d] text-[9px]">{index % 2 ? "F" : "👤"}</span><span className="break-all">{name}</span></button>)}</nav><button className="mt-5 text-xs text-gh-muted hover:text-[#58a6ff]">Show more</button></aside>;
}

function CopilotDay() {
 const [open, setOpen] = useState(true); const [reminded, setReminded] = useState(false);
 if (!open) return null;
 return <section className="gh-side-card overflow-hidden"><div className="relative h-[86px] overflow-hidden bg-[linear-gradient(135deg,#0a9e45_0%,#79ffab_30%,#effff2_52%,#53e8b0_65%,#0b9747_100%)]"><div className="absolute left-8 top-2 size-12 rotate-30 rounded-md bg-[#14b94e] shadow-[28px_18px_0_#0a9e45,72px_5px_0_#82ffc0,114px_27px_0_#14b94e]"/><Bot className="absolute right-16 top-6 size-8 text-[#241fbc]"/><button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-gh-muted" aria-label="Dismiss"><X size={17}/></button></div><div className="border-y border-gh-border px-3 py-3 text-xs text-[#8ba9d6]">SEPTEMBER 10 · 8:00 AM PT</div><div className="p-3"><h2 className="mb-3 font-semibold">GitHub Copilot Day</h2><ul className="mb-3 space-y-1 pl-4 text-xs leading-[18px] text-[#aab8c9]"><li>See how HydraFusion combines AI models to match the right model to the task</li><li>Learn to automate work, run parallel agents, and use your own models</li><li>Turn your best coding approaches into reusable Agent Skills</li></ul><button onClick={() => setReminded(!reminded)} className="gh-reminder">{reminded ? "Reminder set" : "Set your reminder"}</button></div></section>
}

function Changelog() { return <section className="gh-side-card p-4"><h2 className="mb-4 text-sm font-semibold">Latest from our changelog</h2><div className="border-l border-gh-border pl-7">{[["3 hours ago","Remediate Code Quality findings with agentic autofix"],["13 hours ago","Enterprise-managed sandbox in Copilot for JetBrains"],["18 hours ago","GitHub Enterprise Server 3.22 is now generally available"],["Yesterday","New customer portal help.github.com"]].map(([time,title]) => <div key={title} className="relative mb-4"><i className="absolute -left-[33px] top-1 size-2.5 rounded-full bg-[#414852]"/><div className="mb-1 text-xs text-gh-muted">{time}</div><button className="text-left text-sm leading-5 text-[#dbe7f6] hover:text-[#58a6ff]">{title}</button></div>)}<button className="text-xs text-[#8ba9d6] hover:text-[#58a6ff]">View changelog →</button></div></section> }

export function DashboardHome({ state = "default" }: DashboardHomeProps) {
 return <div data-state={state} className="gh-app"><DashboardHeader/><div className="gh-shell"><Sidebar/><main className="gh-main"><div className="gh-center"><h1>Home</h1><section className="gh-composer"><textarea placeholder="Ask anything or type @ to add context" aria-label="Ask Copilot"/><div className="flex items-center justify-between"><div className="flex gap-2"><button className="gh-compose-select"><Bot size={16}/>Ask <ChevronDown size={13}/></button><button className="gh-compose-select"><Monitor size={16}/>All repositories <ChevronDown size={13}/></button><IconButton label="Add context"><Plus size={18}/></IconButton></div><div className="flex items-center gap-3 text-sm text-gh-muted"><Users size={17}/>Auto <ChevronDown size={13}/><Sparkles size={18}/><button aria-label="Send message"><GitPullRequestArrow size={21}/></button></div></div></section><div className="gh-actions">{[[Cpu,"Debug"],[Bot,"Agent"],[GitPullRequestClosed,"Create issue"],[FileText,"Write code"],[GitBranch,"Git"],[GitPullRequest,"Pull requests"]].map(([Icon,label]) => { const Component = Icon as typeof Cpu; return <button key={String(label)}><Component size={17}/>{String(label)}{["Write code","Git","Pull requests"].includes(String(label)) && <ChevronDown size={13}/>}</button> })}</div><div className="mb-2 flex items-center justify-between"><h2 className="text-sm font-semibold">Feed</h2><button className="gh-filter"><Filter size={17}/>Filter</button></div><FeedGroup title="Trending repositories" icon={<TrendingIcon/>}>{trending.map((repo) => <RepositoryCard key={repo.name} repo={repo} showDescription/>)}</FeedGroup><FeedGroup title="Recommended for you" icon={<Star size={17}/>}>{recommended.map((repo) => <RepositoryCard key={repo.name} repo={repo}/>)}</FeedGroup></div><aside className="gh-right"><CopilotDay/><Changelog/></aside></main></div></div>
}
function TrendingIcon(){ return <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M1.5 13.5 5 10l2.2 2.2L14.5 5M10 5h4.5v4.5"/></svg> }
