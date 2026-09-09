import { DashboardHome } from "@/components/dashboard-home";
import { UserProfileOverview } from "@/components/user-profile-overview";

type HomePageProps = {
  searchParams?: Promise<{
    view?: string;
    state?: string;
  }>;
};

const supportedViews = {
  "dashboard-home": "dashboard-home",
  "user-profile-overview": "user-profile-overview",
} as const;

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = (await searchParams) ?? {};
  const view = params.view === supportedViews["dashboard-home"] ? supportedViews["dashboard-home"] : supportedViews["user-profile-overview"];
  const state = params.state === "default" ? "default" : "default";

  if (view === supportedViews["dashboard-home"]) {
    return <DashboardHome state={state} />;
  }

  return <UserProfileOverview state={state} />;
}
