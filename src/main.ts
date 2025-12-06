import { Hono } from "@hono/hono";
import { Database } from "@db/sqlite";
import BookRepository from "./BookRepository.ts";
import Controller from "./Controller.ts";

function main() {
  const server = new Hono();
  const db = new Database(":memory:");
  const repo = new BookRepository({ database: db, queriesPath: "src/sql" });
  const controller = new Controller({ server: server, repo: repo, db: db });

  //   START
  Deno.serve(controller.serveHttp());
}

if (import.meta.main) main();
