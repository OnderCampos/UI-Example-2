"use client";

import { Bell, CirclePlus, Github, GitPullRequest, Inbox, Menu, Search, Settings2, SquareDashed } from "lucide-react";
import { useState } from "react";

export function DashboardHeader({ username = "OnderCampos" }: { username?: string }) {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const iconButton = (label: string, Icon: typeof Bell) => <button key={label} type="button" aria-label={label} aria-pressed={activeTool === label} onClick={() => setActiveTool(activeTool === label ? null : label)} className={`dash-icon-button ${activeTool === label ? "dash-icon-active" : ""}`}><Icon size={17} /></button>;

  return <header className="dash-header">
    <div className="header-brand"><button type="button" aria-label="Open navigation" className="dash-icon-button"><Menu size={19} /></button><Github className="github-mark" size={34} fill="currentColor" strokeWidth={1.5} /><strong>{username}</strong></div>
    <div className="header-tools"><label className="dash-global-search"><Search size={17} /><input aria-label="Search" placeholder="Type / to search" /><kbd>/</kbd></label>{iconButton("Copilot", SquareDashed)}<button type="button" className="dash-icon-button create-button" aria-label="Create new"><CirclePlus size={17} /><span>⌄</span></button>{iconButton("Issues", Settings2)}{iconButton("Pull requests", GitPullRequest)}{iconButton("Notifications", Inbox)}<button type="button" aria-label="Account menu" className="dash-avatar"><img src="/Frida.png" alt="OnderCampos" /></button></div>
  </header>;
}
