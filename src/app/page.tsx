import { MemberCheckInResult, type MemberCheckInState } from "@/components/member-check-in-result";

type HomePageProps = {
  searchParams?: Promise<{
    state?: string;
  }>;
};

const validStates: MemberCheckInState[] = [
  "check-in-success",
  "payment-method-invalid",
  "membership-cancelled",
];

function resolveState(state?: string): MemberCheckInState {
  if (state && validStates.includes(state as MemberCheckInState)) {
    return state as MemberCheckInState;
  }

  return "membership-cancelled";
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const state = resolveState(params?.state);

  return <MemberCheckInResult state={state} />;
}
