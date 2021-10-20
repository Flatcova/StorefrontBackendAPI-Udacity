/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price money NOT NULL,
    category VARCHAR(150),
    selled integer DEFAULT 0
);

INSERT INTO products (name, price, category) VALUES ('Platinum End - Manga', 10.99, 'book');