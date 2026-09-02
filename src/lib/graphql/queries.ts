import { gql } from "graphql-request";

/** 
 * Fetches all users via Supabase GraphQL. 
 */
export const GET_USERS = gql`
  query GetUsers {
    usersCollection {
      edges {
        node {
          id
          email
          name
          created_at
        }
      }
    }
  }
`;