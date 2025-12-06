SELECT
    id,
    title,
    author,
    isbn,
    publishing,
    available
FROM book
WHERE id = :id;
