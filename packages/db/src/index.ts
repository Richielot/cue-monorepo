import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL environment variable is not set. " +
      "Check your .env.local file or Docker environment.",
  );
}

// Connection for queries (pooled)
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });

export { and, asc, desc, eq, inArray, or, sql } from "drizzle-orm";
export * from "./schema";
export type Database = typeof db;
