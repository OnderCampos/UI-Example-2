import { Client } from "pg";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

/**
 * Creates and connects a pg Client using DATABASE_URL.
 * Always call client.end() after use.
 */
export async function createClient(): Promise<Client> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set in .env.local");
  }

  const client = new Client({ connectionString });
  await client.connect();
  return client;
}

