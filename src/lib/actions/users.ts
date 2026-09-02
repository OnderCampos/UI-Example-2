"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { getSupabaseGraphQLClient } from "../graphql/client";
import { GET_USERS } from "../graphql/queries";
import { GraphQLUsersResponse } from "./types";

/**
 * Fetches all users from the database using Drizzle ORM.
 */
export async function getUsers() {
    try {
        const result = await db.select().from(users);
        return result;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
    }
}

/**
 * Fetches all users via Supabase GraphQL API.
 */
export async function getUsersGraphQL() {
    const client = await getSupabaseGraphQLClient();
    const data = await client.request<GraphQLUsersResponse>(GET_USERS);

    return data.usersCollection.edges.map((e) => e.node);
}
