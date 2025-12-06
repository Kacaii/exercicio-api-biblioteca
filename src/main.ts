import { Hono } from "@hono/hono";
import BookManager from "./BookManager.ts";
import postgres from "postgres";

function main() {
  const app = new Hono();
  const manager = new BookManager();

  app.post("/book", async (c) => await manager.addBook(c, client));

  Deno.serve(app.fetch);
}

if (import.meta.main) {
  main();
}
