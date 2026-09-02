/**
 * CLI for managing PostgreSQL DDL objects: functions, procedures,
 * views, materialized views, and triggers.
 *
 * Usage:
 *   npm run routines -- <command> [args...]
 *
 * Commands:
 *   list                                         List all user-defined DDL objects
 *   apply    <path/to/file.sql>                  Execute a .sql file (CREATE OR REPLACE)
 *   drop-fn  <schema> <name> [arg_types...]      Drop a function
 *   drop-proc <schema> <name> [arg_types...]     Drop a procedure
 *   drop-view <schema> <name>                    Drop a view
 *   drop-mat-view <schema> <name>                Drop a materialized view
 *   drop-trigger <trigger_name> <table_schema> <table_name>  Drop a trigger
 */

import { readFileSync } from "fs";
import path from "path";
import { createClient } from "../db-client";

const [, , command, ...rest] = process.argv;

async function listAll() {
  const client = await createClient();
  try {
    // Functions & procedures
    const { rows: routines } = await client.query<{
      schema: string;
      name: string;
      kind: string;
    }>(
      `
      select n.nspname as schema,
             p.proname as name,
             case p.prokind
               when 'f' then 'FUNCTION'
               when 'p' then 'PROCEDURE'
             end as kind
      from pg_proc p
      join pg_namespace n on n.oid = p.pronamespace
      where n.nspname not in ('pg_catalog', 'information_schema', 'pg_toast')
        and p.prokind in ('f', 'p')
      order by n.nspname, p.proname;
    `,
    );

    // Views
    const { rows: views } = await client.query<{
      schema: string;
      name: string;
    }>(
      `
      select table_schema as schema, table_name as name
      from information_schema.views
      where table_schema not in ('pg_catalog', 'information_schema')
      order by table_schema, table_name;
    `,
    );

    // Materialized views
    const { rows: matViews } = await client.query<{
      schema: string;
      name: string;
    }>(
      `
      select schemaname as schema, matviewname as name
      from pg_matviews
      where schemaname not in ('pg_catalog', 'information_schema')
      order by schemaname, matviewname;
    `,
    );

    // Triggers
    const { rows: triggers } = await client.query<{
      trigger_name: string;
      event_object_schema: string;
      event_object_table: string;
      event_manipulation: string;
      action_timing: string;
    }>(
      `
      select trigger_name, event_object_schema, event_object_table,
             event_manipulation, action_timing
      from information_schema.triggers
      where trigger_schema not in ('pg_catalog', 'information_schema')
      order by event_object_schema, event_object_table, trigger_name;
    `,
    );

    const total = routines.length + views.length + matViews.length + triggers.length;
    if (total === 0) {
      console.log("No user-defined DDL objects found.");
      return;
    }

    if (routines.length > 0) {
      console.log("\nFunctions & Procedures:");
      for (const r of routines) console.log(`  [${r.kind}] ${r.schema}.${r.name}`);
    }
    if (views.length > 0) {
      console.log("\nViews:");
      for (const v of views) console.log(`  [VIEW] ${v.schema}.${v.name}`);
    }
    if (matViews.length > 0) {
      console.log("\nMaterialized Views:");
      for (const m of matViews) console.log(`  [MATVIEW] ${m.schema}.${m.name}`);
    }
    if (triggers.length > 0) {
      console.log("\nTriggers:");
      for (const t of triggers) {
        console.log(
          `  [TRIGGER] ${t.trigger_name} — ${t.action_timing} ${t.event_manipulation} ON ${t.event_object_schema}.${t.event_object_table}`,
        );
      }
    }
  } finally {
    await client.end();
  }
}

async function applySql(filePath: string) {
  const client = await createClient();
  try {
    const absolute = path.isAbsolute(filePath)
      ? filePath
      : path.join(process.cwd(), filePath);
    const sql = readFileSync(absolute, "utf8");
    await client.query(sql);
    console.log(`✓ Applied: ${filePath}`);
  } finally {
    await client.end();
  }
}

async function dropSimple(
  kind: "FUNCTION" | "PROCEDURE",
  schema: string,
  name: string,
  argTypes: string[],
) {
  const client = await createClient();
  try {
    const sig = argTypes.length > 0 ? `(${argTypes.join(", ")})` : "()";
    await client.query(`DROP ${kind} IF EXISTS ${schema}.${name}${sig};`);
    console.log(`✓ ${kind} dropped: ${schema}.${name}${sig}`);
  } finally {
    await client.end();
  }
}

async function dropView(schema: string, name: string, materialized = false) {
  const client = await createClient();
  try {
    const kind = materialized ? "MATERIALIZED VIEW" : "VIEW";
    await client.query(`DROP ${kind} IF EXISTS ${schema}.${name};`);
    console.log(`✓ ${kind} dropped: ${schema}.${name}`);
  } finally {
    await client.end();
  }
}

async function dropTrigger(
  triggerName: string,
  tableSchema: string,
  tableName: string,
) {
  const client = await createClient();
  try {
    await client.query(
      `DROP TRIGGER IF EXISTS ${triggerName} ON ${tableSchema}.${tableName};`,
    );
    console.log(
      `✓ TRIGGER dropped: ${triggerName} on ${tableSchema}.${tableName}`,
    );
  } finally {
    await client.end();
  }
}

async function main() {
  switch (command) {
    case "list": {
      await listAll();
      break;
    }
    case "apply": {
      const [filePath] = rest;
      if (!filePath) {
        console.error("Usage: routines apply <path/to/file.sql>");
        process.exit(1);
      }
      await applySql(filePath);
      break;
    }
    case "drop-fn": {
      const [schema, name, ...argTypes] = rest;
      if (!schema || !name) {
        console.error("Usage: routines drop-fn <schema> <name> [arg_types...]");
        process.exit(1);
      }
      await dropSimple("FUNCTION", schema, name, argTypes);
      break;
    }
    case "drop-proc": {
      const [schema, name, ...argTypes] = rest;
      if (!schema || !name) {
        console.error("Usage: routines drop-proc <schema> <name> [arg_types...]");
        process.exit(1);
      }
      await dropSimple("PROCEDURE", schema, name, argTypes);
      break;
    }
    case "drop-view": {
      const [schema, name] = rest;
      if (!schema || !name) {
        console.error("Usage: routines drop-view <schema> <name>");
        process.exit(1);
      }
      await dropView(schema, name, false);
      break;
    }
    case "drop-mat-view": {
      const [schema, name] = rest;
      if (!schema || !name) {
        console.error("Usage: routines drop-mat-view <schema> <name>");
        process.exit(1);
      }
      await dropView(schema, name, true);
      break;
    }
    case "drop-trigger": {
      const [triggerName, tableSchema, tableName] = rest;
      if (!triggerName || !tableSchema || !tableName) {
        console.error(
          "Usage: routines drop-trigger <trigger_name> <table_schema> <table_name>",
        );
        process.exit(1);
      }
      await dropTrigger(triggerName, tableSchema, tableName);
      break;
    }
    default: {
      console.error(`Unknown command: "${command}"`);
      console.error(
        "Available: list, apply, drop-fn, drop-proc, drop-view, drop-mat-view, drop-trigger",
      );
      process.exit(1);
    }
  }
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
