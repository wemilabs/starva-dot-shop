import { existsSync } from "node:fs";
import { defineConfig } from "drizzle-kit";

for (const file of ["apps/web/.env.local", "apps/web/.env"]) {
  if (existsSync(file)) process.loadEnvFile(file);
}

export default defineConfig({
  schema: "./packages/db/src/schema.ts",
  out: "./packages/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
