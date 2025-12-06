import { Hono } from "@hono/hono";
import { Database } from "@db/sqlite";
import BookRepository from "./BookRepository.ts";

function main() {
  const app = new Hono();
  const db = new Database(":memory:");
  const books = new BookRepository({ database: db, queriesPath: "src/sql" });

  //   ROUTER -----------------------------------------------------------------
  app.post("/api/livros", async (c) => await books.addBook(c, db));
  app.get("/api/livros", (c) => books.getAllBooks(c, db));
  app.put("/api/livros/{id}", (c) => c.text("todo"));
  app.delete("/api/livros", (c) => c.text("todo"));

  //   START
  Deno.serve(app.fetch);
}

if (import.meta.main) main();
