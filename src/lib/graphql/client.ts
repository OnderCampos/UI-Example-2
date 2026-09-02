import { GraphQLClient } from "graphql-request";
import { supabase } from "@/lib/supabase";

const SUPABASE_GRAPHQL_URL = process.env.NEXT_PUBLIC_SUPABASE_URL + "/graphql/v1";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Base client with anon key
const supabaseGraphQLClient = new GraphQLClient(SUPABASE_GRAPHQL_URL, {
  headers: {
    apikey: SUPABASE_ANON_KEY,
  },
});

// Returns the client with or without the JWT of the authenticated user
export async function getSupabaseGraphQLClient(): Promise<GraphQLClient> {
  const { data: { session } } = await supabase.auth.getSession();

  if (session?.access_token) {
    supabaseGraphQLClient.setHeader(
      "Authorization",
      `Bearer ${session.access_token}`
    );
  } else {
    supabaseGraphQLClient.setHeader("Authorization", "");
  }

  return supabaseGraphQLClient;
}
