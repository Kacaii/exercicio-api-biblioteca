INSERT INTO livro (title, author, isbn, publishing, available)
VALUES ((:title), (:author), (:isbn), (:publishing), (:available))
RETURNING id, title, author, isbn, publishing, available;
