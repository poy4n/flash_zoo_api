
-- name
CREATE DATABASE flashzoo;

-- users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(200) not null
);

-- words table
CREATE TABLE words (
    id SERIAL PRIMARY KEY,
    english VARCHAR(200),
    german VARCHAR(200),
    french VARCHAR(200),
    italian VARCHAR(200),
    image_url TEXT
);

-- cards table
CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    language VARCHAR(100),
    status VARCHAR(100),
    word_id INTEGER not null,
    FOREIGN KEY (word_id) REFERENCES words (id) on DELETE CASCADE,
    user_id INTEGER not null,
    FOREIGN KEY (user_id) REFERENCES users (id) on DELETE CASCADE
);