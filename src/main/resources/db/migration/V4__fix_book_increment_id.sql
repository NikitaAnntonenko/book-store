CREATE SEQUENCE IF NOT EXISTS books_id_seq START 1;

ALTER TABLE books ALTER COLUMN id SET DEFAULT nextval('books_id_seq');
