"use client";

import { Bell, CirclePlus, Github, Menu, Search, Settings2, SquareDashed, UserRound } from "lucide-react";
import { useState } from "react";

export function DashboardHeader() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const iconButton = (label: string, Icon: typeof Bell) => (
    <button
      key={label}
      type="button"
      aria-label={label}
      aria-pressed={activeTool === label}
      onClick={() => setActiveTool(activeTool === label ? null : label)}
      className={`dash-icon-button ${activeTool === label ? "dash-icon-active" : ""}`}
    ><Icon size={17} /></button>
  );

  return <header className="dash-header">
    <div className="flex items-center gap-3">
      <button type="button" aria-label="Open navigation" className="dash-icon-button"><Menu size={19} /></button>
      <Github className="text-[#e6edf3]" size={34} fill="currentColor" strokeWidth={1.5} />
      <span className="text-sm font-semibold">Dashboard</span>
    </div>
    <div className="flex items-center gap-2">
      <label className="dash-global-search"><Search size={17} /><input aria-label="Search" placeholder="Type / to search" /></label>
      {iconButton("Copilot", SquareDashed)}
      {iconButton("Create new", CirclePlus)}
      {iconButton("Issues", Settings2)}
      {iconButton("Pull requests", SquareDashed)}
      {iconButton("Notifications", Bell)}
      <button type="button" aria-label="Account menu" className="dash-avatar"><img src="/Frida.png" alt="OnderCampos" /></button>
    </div>
  </header>;
}
