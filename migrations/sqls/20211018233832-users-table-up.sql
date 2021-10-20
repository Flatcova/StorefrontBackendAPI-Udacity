/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(150),
    lastName VARCHAR(150),
    password VARCHAR(150)
);