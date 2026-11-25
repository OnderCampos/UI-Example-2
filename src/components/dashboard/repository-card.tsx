"use client";

import { ChevronDown, Star } from "lucide-react";
import { useState } from "react";

export type RepositoryCardItem = { name: string; description?: string; language: string; stars: string; avatar?: string };

export function RepositoryCard({ title, items, initialStarred = false }: { title: string; items: RepositoryCardItem[]; initialStarred?: boolean }) {
  const [starred, setStarred] = useState(initialStarred);
  return <section className="repo-card">
    <div className="repo-card-title"><Star size={17} /> <span>{title}</span></div>
    {items.map((repo, index) => <article className="repo-item" key={repo.name}>
      <div className="repo-content">
        <div className="repo-name"><span className="repo-avatar">{repo.avatar ?? "◉"}</span><button type="button">{repo.name}</button></div>
        {repo.description && <p>{repo.description}</p>}
        <div className="repo-meta"><span><i className="language-dot" />{repo.language}</span><span><Star size={16} /> {repo.stars}</span></div>
      </div>
      <div className="star-control"><button type="button" aria-pressed={starred} onClick={() => setStarred(!starred)}><Star size={17} fill={starred ? "currentColor" : "none"} /> {starred ? "Starred" : "Star"}</button><button type="button" aria-label={`Star options for ${repo.name}`}><ChevronDown size={15} /></button></div>
      {index < items.length - 1 && <div className="repo-divider" />}
    </article>)}
  </section>;
}
