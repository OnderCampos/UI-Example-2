import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const users = pgTable("users", {
    id: uuid("id").primaryKey(), // UUID from Supabase Auth
    email: text("email").notNull().unique(),
    name: text("name"),
    created_at: timestamp("created_at").defaultNow(),
});

// Infer types from the schema
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
