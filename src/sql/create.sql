CREATE TABLE IF NOT EXISTS livro (
    id INTEGER NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    isbn TEXT NOT NULL,
    publishing DATE NOT NULL,
    available BOOLEAN NOT NULL
);
