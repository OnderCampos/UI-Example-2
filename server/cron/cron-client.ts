import { createClient } from "../db-tools/db-client";

export interface CronJob {
  jobid: number;
  jobname: string;
  schedule: string;
  command: string;
  active: boolean;
}

/**
 * Creates or replaces a cron job in Supabase (pg_cron).
 *
 * Job names are case sensitive and cannot be renamed after creation.
 * Calling this with the same name overwrites the existing job (upsert).
 *
 * @param name     - Unique job name (case sensitive, permanent)
 * @param schedule - Cron expression or interval string 
 * @param command  - SQL to run (e.g. "SELECT my_fn()" or "CALL my_proc()")
 */
export async function scheduleCronJob(
  name: string,
  schedule: string,
  command: string
): Promise<void> {
  const client = await createClient();
  try {
    await client.query(
      "SELECT cron.schedule($1, $2, $3)",
      [name, schedule, command]
    );
    console.log(`✓ Cron job scheduled: "${name}" (${schedule})`);
  } finally {
    await client.end();
  }
}

/**
 * Edits an existing cron job. Only pass the properties you want to change.
 *
 * @param name     - Name of the existing job to edit
 * @param options  - Fields to update (schedule, command, active)
 */
export async function alterCronJob(
  name: string,
  options: { schedule?: string; command?: string; active?: boolean }
): Promise<void> {
  const client = await createClient();
  try {
    const { rows } = await client.query<{ jobid: number }>(
      "SELECT jobid FROM cron.job WHERE jobname = $1",
      [name]
    );

    if (rows.length === 0) {
      throw new Error(`Cron job not found: "${name}"`);
    }

    const jobId = rows[0].jobid;
    const parts: string[] = [`job_id := ${jobId}`];

    if (options.schedule !== undefined) parts.push(`schedule := '${options.schedule}'`);
    if (options.command !== undefined) parts.push(`command := '${options.command}'`);
    if (options.active !== undefined) parts.push(`active := ${options.active}`);

    await client.query(`SELECT cron.alter_job(${parts.join(", ")})`);
    console.log(`✓ Cron job updated: "${name}"`);
  } finally {
    await client.end();
  }
}

/**
 * Activates a previously deactivated cron job.
 *
 * @param name - Name of the job to activate
 */
export async function activateCronJob(name: string): Promise<void> {
  await alterCronJob(name, { active: true });
  console.log(`✓ Cron job activated: "${name}"`);
}

/**
 * Deactivates a cron job without deleting it.
 * The job definition is preserved and can be reactivated later.
 *
 * @param name - Name of the job to deactivate
 */
export async function deactivateCronJob(name: string): Promise<void> {
  await alterCronJob(name, { active: false });
  console.log(`✓ Cron job deactivated: "${name}"`);
}

/**
 * Lists all cron jobs currently registered in the database.
 *
 * @returns Array of job objects with id, name, schedule, command, active status
 */
export async function listCronJobs(): Promise<CronJob[]> {
  const client = await createClient();
  try {
    const { rows } = await client.query<CronJob>(
      "SELECT jobid, jobname, schedule, command, active FROM cron.job ORDER BY jobname"
    );
    return rows;
  } finally {
    await client.end();
  }
}
