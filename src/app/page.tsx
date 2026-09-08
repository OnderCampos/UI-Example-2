import { MemberCheckInResult, type MemberCheckInState } from "@/components/member-check-in-result";

type HomePageProps = {
  searchParams?: Promise<{
    state?: MemberCheckInState;
  }>;
};

const validStates: MemberCheckInState[] = [
  "success-active-member",
  "payment-method-invalid-past-due",
  "membership-cancelled-access-denied",
];

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const state = validStates.includes(params?.state as MemberCheckInState)
    ? (params?.state as MemberCheckInState)
    : "payment-method-invalid-past-due";

  return <MemberCheckInResult state={state} />;
}
