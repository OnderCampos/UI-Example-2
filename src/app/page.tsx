import { MemberCheckInResult, type MemberCheckInState } from "@/components/member-check-in-result";

const state: MemberCheckInState = "check-in-success";

export default function HomePage() {
  return <MemberCheckInResult state={state} />;
}
