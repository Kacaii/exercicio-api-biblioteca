import { Context } from "@hono/hono";
import { Database } from "@db/sqlite";

type Opts = { database: Database; queriesPath: string };
type SqlQuery = "create" | "insert_book" | "get_all_books" | "get_book";

type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishing: string;
  available: boolean;
};

export default class BookRepository {
  private queries: Map<SqlQuery, string>;

  constructor(opts: Opts) {
    //   Store queries in memory
    this.queries = loadQueries(opts.queriesPath);
    opts.database.exec(this.queries.get("create")!);
  }

  async addBook(c: Context, db: Database): Promise<Response> {
    const body: Omit<Book, "id"> = await c.req.json();
    const query = this.queries.get("insert_book")!;

    using stmt = db.prepare(query);
    const row = stmt.get(body);

    if (row == undefined) return c.notFound();

    //  201 CREATED
    c.status(201);
    return c.json(row);
  }

  getAllBooks(c: Context, db: Database) {
    const query = this.queries.get("get_all_books")!;

    using stmt = db.prepare(query);
    const rows = stmt.all<Book>();

    // 200 OK
    c.status(200);
    return c.json(rows);
  }

  getBook(c: Context, db: Database) {
    const query = this.queries.get("get_book")!;
    const idParam = c.req.param("id");

    try {
      const bookId = parseInt(idParam);

      using stmt = db.prepare(query);
      const row = stmt.get({ id: bookId });

      // 404 NOT FOUND
      if (row === undefined) return c.notFound();

      // 200 OK
      c.status(200);
      return c.json(row);
    } catch {
      // 400 Bad request
      c.status(400);
      return c.text("ID inválido");
    }
  }
}

/**   Load all SQL queries found in `path` */
function loadQueries(path: string): Map<SqlQuery, string> {
  //  0% 
  const acc: Map<SqlQuery, string> = new Map();

  for (const dirEntry of Deno.readDirSync(path)) {
    if (dirEntry.isDirectory || !dirEntry.name.endsWith(".sql")) continue;

    const filePath = path + `/${dirEntry.name}`;
    const key = dirEntry.name.replace(".sql", "") as SqlQuery;
    const value = Deno.readTextFileSync(filePath);

    acc.set(key, value);
  }

  //  100% 
  return acc;
}
