/**
 * CLI for managing Supabase cron jobs via pg_cron.
 *
 * Usage:
 *   npx tsx server/cron/run.ts <command> [args...]
 *
 * Commands:
 *   schedule  <name> <schedule> <command>   Create or replace a cron job
 *   alter     <name> [--schedule=...] [--command=...] [--active=true|false]
 *   activate  <name>                        Activate a paused job
 *   deactivate <name>                       Pause a job without deleting it
 *   list                                    List all registered jobs
 *
 * Examples:
 *   npx tsx server/cron/run.ts schedule "nightly-vacuum" "0 3 * * *" "VACUUM"
 *   npx tsx server/cron/run.ts alter "nightly-vacuum" --schedule="0 4 * * *"
 *   npx tsx server/cron/run.ts activate "nightly-vacuum"
 *   npx tsx server/cron/run.ts deactivate "nightly-vacuum"
 *   npx tsx server/cron/run.ts list
 */

import {
  activateCronJob,
  alterCronJob,
  deactivateCronJob,
  listCronJobs,
  scheduleCronJob,
} from "./cron-client";

const [, , command, ...rest] = process.argv;

async function main() {
  switch (command) {
    case "schedule": {
      const [name, schedule, ...cmdParts] = rest;
      if (!name || !schedule || cmdParts.length === 0) {
        console.error("Usage: run.ts schedule <name> <schedule> <command>");
        process.exit(1);
      }
      await scheduleCronJob(name, schedule, cmdParts.join(" "));
      break;
    }

    case "alter": {
      const [name, ...flags] = rest;
      if (!name) {
        console.error("Usage: run.ts alter <name> [--schedule=...] [--command=...] [--active=true|false]");
        process.exit(1);
      }
      const options: { schedule?: string; command?: string; active?: boolean } = {};
      for (const flag of flags) {
        if (flag.startsWith("--schedule=")) options.schedule = flag.slice("--schedule=".length);
        if (flag.startsWith("--command=")) options.command = flag.slice("--command=".length);
        if (flag.startsWith("--active=")) options.active = flag.slice("--active=".length) === "true";
      }
      await alterCronJob(name, options);
      break;
    }

    case "activate": {
      const [name] = rest;
      if (!name) { console.error("Usage: run.ts activate <name>"); process.exit(1); }
      await activateCronJob(name);
      break;
    }

    case "deactivate": {
      const [name] = rest;
      if (!name) { console.error("Usage: run.ts deactivate <name>"); process.exit(1); }
      await deactivateCronJob(name);
      break;
    }

    case "list": {
      const jobs = await listCronJobs();
      if (jobs.length === 0) {
        console.log("No cron jobs found.");
      } else {
        console.log("\nRegistered cron jobs:\n");
        for (const job of jobs) {
          const status = job.active ? "✓ active" : "✗ inactive";
          console.log(`  [${status}] "${job.jobname}"`);
          console.log(`    Schedule : ${job.schedule}`);
          console.log(`    Command  : ${job.command}`);
          console.log();
        }
      }
      break;
    }

    default: {
      console.error(`Unknown command: "${command}"`);
      console.error("Available: schedule, alter, activate, deactivate, list");
      process.exit(1);
    }
  }
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
