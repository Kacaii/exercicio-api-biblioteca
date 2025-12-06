import { Context } from "@hono/hono";
import sql from "./db.ts";

type Opts = { pathToQueries: string };
type SqlQuery = "insert_book";

type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishing: string;
  available: boolean;
};

export default class BookManager {
  async addBook(c: Context) {
    const body: Omit<Book, "id"> = await c.req.json();

    const result = await sql`
        INSERT INTO livro (title, author, isbn, publishing, available)
        VALUES ($title, $author, $isbn, $publishing, $available)
        RETURNING id, title, author, isbn, publishing, available;
        `;
  }
}
