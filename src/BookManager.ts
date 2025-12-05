import { DatabaseSync } from "node:sqlite";

type opts = { pathToQueries: string };

export class BookManager {
  private queries: Map<string, string>;

  constructor(opts: opts) {
    const queries: Map<string, string> = new Map();
    for (const entry of Deno.readDirSync(opts.pathToQueries)) {
      if (entry.isDirectory) continue;
      if (!entry.name.endsWith(".sql")) continue;

      const path = opts.pathToQueries + "/" + entry.name;

      const value = Deno.readTextFileSync(path);
      const key = entry.name.replaceAll(".sql", "");
      queries.set(key, value);
    }

    this.queries = queries;
  }

  /**   Generate necessary tables */
  createTables(db: DatabaseSync) {
    const query = this.queries.get("create")!;
    db.exec(query);
  }
}
