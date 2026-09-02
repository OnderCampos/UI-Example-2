/**
 * Response shape returned by Supabase GraphQL for the `usersCollection` query.
 *
 * Supabase GraphQL follows the Relay Connection spec:
 *
 * - `<Table>Collection` - the entry point for querying a table.
 * - `edges` - an array of connection edges. Each edge represents one row in the result set.
 * - `node` - the actual database row. Where the column values live.
 */
export type GraphQLUsersResponse = {
  usersCollection: {
    edges: { node: { id: string; email: string; name: string | null } }[];
  };
};
