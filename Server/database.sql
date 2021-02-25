CREATE DATABASE matcha;

--download exstension
create extension if not exists "uuid-ossp";

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_first_name VARCHAR(255) NOT NULL,
    user_last_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
);

--insert fake users

INSERT INTO users(user_first_name, user_last_name, user_email, user_password) VALUES ("first_name", "last_name", "email@email.com", "password");