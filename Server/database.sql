CREATE DATABASE matcha;

--download exstension
create extension
if not exists "uuid-ossp";

CREATE TYPE gender AS ENUM
('M', 'F');

Create TYPE sexual_preference AS ENUM
('Heterosexual', 'Bisexual', 'Homosexual');

CREATE TABLE users
(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_first_name VARCHAR(255) NOT NULL,
    user_last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    reset_password_token VARCHAR(255) NOT NULL DEFAULT 0,--??????
    reset_password_expiry VARCHAR(255),
    user_gender gender,
    user_sexual_preference sexual_preference,
    -- user_biography VARCHAR(255) NOT NULL
    --????????
);

--insert fake users

INSERT INTO users
    (user_first_name, user_last_name, username, user_email, user_password)
VALUES
    ("first_name", "last_name", "username", "email@email.com", "password");