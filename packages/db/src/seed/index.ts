import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { tenants, users } from "../schema";

async function seed() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }

  const client = postgres(connectionString, { prepare: false });
  const db = drizzle(client);

  console.log("Seeding database...");

  // Create test tenant
  const [tenant] = await db
    .insert(tenants)
    .values({
      name: "Acme Inc.",
      slug: "acme",
    })
    .onConflictDoNothing({ target: tenants.slug })
    .returning();

  if (tenant) {
    console.log(`Created tenant: ${tenant.name} (${tenant.id})`);

    // Create test users
    const seedUsers = [
      {
        authId: "seed-owner-001",
        email: "owner@acme.test",
        name: "Alex Owner",
        role: "owner" as const,
        tenantId: tenant.id,
      },
      {
        authId: "seed-admin-001",
        email: "admin@acme.test",
        name: "Sam Admin",
        role: "admin" as const,
        tenantId: tenant.id,
      },
      {
        authId: "seed-member-001",
        email: "member@acme.test",
        name: "Jordan Member",
        role: "member" as const,
        tenantId: tenant.id,
      },
    ];

    for (const u of seedUsers) {
      const [created] = await db
        .insert(users)
        .values(u)
        .onConflictDoNothing({ target: users.authId })
        .returning();
      if (created) {
        console.log(`  Created user: ${created.name} (${created.role})`);
      }
    }
  } else {
    console.log("Tenant 'acme' already exists, skipping.");
  }

  console.log("Seed complete.");
  await client.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
