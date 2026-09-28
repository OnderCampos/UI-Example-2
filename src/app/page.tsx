import { UserProfileOverviewView } from "@/components/user-profile-overview-view";

export default function HomePage() {
  return <UserProfileOverviewView state="populated-default" initialTab="overview" />;
}
