import { Context } from "@hono/hono";
import { Database } from "@db/sqlite";

type Opts = { database: Database };
// type SqlQuery = "insert_book";

type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishing: string;
  available: boolean;
};

export default class BookManager {
  constructor(opts: Opts) {
    opts.database.sql`
      CREATE TABLE IF NOT EXISTS livro (
          id INTEGER NOT NULL PRIMARY KEY,
          title TEXT NOT NULL,
          author TEXT NOT NULL,
          isbn TEXT NOT NULL,
          publishing DATE NOT NULL,
          available BOOLEAN NOT NULL
      );
      `;
  }

  async addBook(c: Context, db: Database) {
    const body: Omit<Book, "id"> = await c.req.json();
    const results = db.sql`
      INSERT INTO livro (title, author, isbn, publishing, available)
      VALUES (${body.title}, ${body.author}, ${body.isbn}, ${body.publishing}, ${body.available})
      RETURNING id, title, author, isbn, publishing, available;
      `;

    if (results.length === 0) return c.notFound();
    return c.json(results);
  }
}
