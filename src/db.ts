import postgres from "postgres";

const sql = postgres({
  user: Deno.env.get("PG_USER"),
  database: Deno.env.get("PG_DATABASE"),
  hostname: Deno.env.get("PG_HOSTNAME"),
  port: Deno.env.get("PG_PORT"),
});

export default sql;
