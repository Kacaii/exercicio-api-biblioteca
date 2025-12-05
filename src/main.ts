import { Hono } from "@hono/hono";
import { DatabaseSync } from "node:sqlite";
import { BookManager } from "./BookManager.ts";

function main() {
  const app = new Hono();
  const db = new DatabaseSync("src/sql/library.db");

  const manager = new BookManager({ pathToQueries: "src/sql" });
  manager.createTables(db);
}

if (import.meta.main) main();
