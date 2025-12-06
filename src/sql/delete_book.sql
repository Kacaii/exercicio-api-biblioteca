DELETE FROM book
WHERE id = :id
RETURNING
    id,
    title,
    author,
    isbn,
    publishing,
    available;
