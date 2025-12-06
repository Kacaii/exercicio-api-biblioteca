import { Hono } from "@hono/hono";
import { Database } from "@db/sqlite";
import BookRepository from "./BookRepository.ts";

type Opts = { server: Hono; repo: BookRepository; db: Database };

/** 󰩩  Handles incoming HTTP Requests */
class Controller {
  private httpServer: Hono;
  private db: Database;
  private repo: BookRepository;

  constructor(opts: Opts) {
    this.httpServer = opts.server;
    this.db = opts.db;
    this.repo = opts.repo;
  }

  /**   Start server */
  serveHttp() {
    const app = this.httpServer;
    const repo = this.repo;
    const db = this.db;

    app.post("/api/livros", async (c) => await repo.addBook(c, db));
    app.get("/api/livros", (c) => repo.getAllBooks(c, db));
    app.get("/api/livros/:id", async (c) => await repo.getBook(c, db));
    app.put("/api/livros/:id", async (c) => await repo.updateBook(c, db));
    app.delete("/api/livros", async (c) => await repo.deleteBook(c, db));

    return app.fetch;
  }
}

export default Controller;
