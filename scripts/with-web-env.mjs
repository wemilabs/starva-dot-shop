import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");

if (process.env.DATABASE_URL === undefined) {
  for (const file of ["apps/web/.env.local", "apps/web/.env"]) {
    const envFile = resolve(repoRoot, file);
    if (existsSync(envFile)) process.loadEnvFile(envFile);
  }
}

const [command, ...args] = process.argv.slice(2);
if (!command) {
  console.error("Usage: node scripts/with-web-env.mjs <command> [...args]");
  process.exitCode = 1;
} else {
  const child = spawn(command, args, {
    stdio: "inherit",
    env: process.env,
    shell: process.platform === "win32",
  });

  child.on("error", error => {
    console.error(error);
    process.exitCode = 1;
  });

  child.on("close", code => {
    process.exitCode = code ?? 1;
  });
}
