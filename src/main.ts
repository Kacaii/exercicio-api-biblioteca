import { Hono } from "@hono/hono";
import { Database } from "@db/sqlite";
import BookManager from "./BookManager.ts";

function main() {
  const app = new Hono();
  const db = new Database(":memory:");
  const manager = new BookManager({ database: db, queriesPath: "src/sql" });

  app.post("/book", async (c) => await manager.addBook(c, db));

  Deno.serve(app.fetch);
}

if (import.meta.main) main();
