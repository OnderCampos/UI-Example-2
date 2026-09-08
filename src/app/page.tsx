import { MemberCheckInResultView } from "@/components/member-check-in-result-view";

type CheckInState =
  | "success-active-member"
  | "payment-method-invalid-past-due"
  | "membership-cancelled-access-denied";

const supportedStates: CheckInState[] = [
  "success-active-member",
  "payment-method-invalid-past-due",
  "membership-cancelled-access-denied",
];

type HomePageProps = {
  searchParams?: Promise<{
    state?: string;
  }>;
};

function isCheckInState(value: string | undefined): value is CheckInState {
  return supportedStates.includes(value as CheckInState);
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = (await searchParams) ?? {};
  const state = isCheckInState(params.state) ? params.state : "success-active-member";

  return <MemberCheckInResultView state={state} />;
}
