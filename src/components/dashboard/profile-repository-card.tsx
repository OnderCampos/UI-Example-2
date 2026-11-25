import { Circle } from "lucide-react";

export type ProfileRepository = { name: string; description?: string; fork?: string; language: "Python" | "TypeScript" };

export function ProfileRepositoryCard({ repository }: { repository: ProfileRepository }) {
  return <article className="profile-repository-card"><div className="profile-repo-heading"><button type="button">{repository.name}</button><span>Public</span></div>{repository.fork && <p className="repo-fork">Forked from <u>{repository.fork}</u></p>}{repository.description && <p className="profile-repo-description">{repository.description}</p>}<div className="profile-language"><Circle size={12} fill={repository.language === "Python" ? "#3572a5" : "#3178c6"} />{repository.language}</div></article>;
}
