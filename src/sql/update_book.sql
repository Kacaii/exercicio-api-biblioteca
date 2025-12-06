UPDATE book SET
    title = (:title),
    author = (:author),
    isbn = (:isbn),
    publishing = (:publishing),
    available = (:available)
WHERE id = (:id)
RETURNING
    new.id,
    new.title,
    new.author,
    new.isbn,
    new.publishing,
    new.available;
