import { MemberCheckInResultView } from "@/components/member-check-in-result-view";

type HomePageProps = {
  searchParams?: Promise<{
    state?: "success-active-member" | "payment-method-invalid-past-due" | "membership-cancelled-access-denied";
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = (await searchParams) ?? {};

  return <MemberCheckInResultView state={params.state ?? "success-active-member"} />;
}
