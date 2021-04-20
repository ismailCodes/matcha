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
    is_complete BOOLEAN NOT NULL DEFAULT FALSE,
    reset_password_token VARCHAR(255) NOT NULL DEFAULT 0,--??????
    reset_password_expiry VARCHAR(255),
    user_gender gender,
    user_sexual_preference sexual_preference DEFAULT 'Bisexual',
    user_biography VARCHAR(600),
    user_age smallint,
    user_last_connected TIMESTAMP,
    user_interests TEXT
    [],
    user_lon NUMERIC NOT NULL DEFAULT 0,
    user_lat NUMERIC NOT NULL DEFAULT 0,
    user_city VARCHAR
    (255) NOT NULL DEFAULT 0,
    user_score smallint DEFAULT 0
    -- user_biography VARCHAR(255) NOT NULL
    -- ????????
);

    CREATE TABLE likes (
    like_id INT GENERATED ALWAYS AS IDENTITY,
    from_user_id VARCHAR
    (255) NOT NULL,
    to_user_id VARCHAR
    (255) NOT NULL
);

    CREATE TABLE blocks(
    block_id INT GENERATED ALWAYS AS IDENTITY,
    from_user_id VARCHAR
    (255) NOT NULL,
    to_user_id VARCHAR
    (255) NOT NULL
);

    CREATE TABLE profile_look (
    look_id INT GENERATED ALWAYS AS IDENTITY,
    from_user_id VARCHAR
    (255) NOT NULL,
    to_user_id VARCHAR
    (255) NOT NULL
    );

    CREATE TABLE NOTIFICATIONS (
        notif_id INT GENERATED ALWAYS AS IDENTITY,
        to_user_id VARCHAR
    (255) NOT NULL,
        from_user_id VARCHAR
    (255) NOT NULL,
        notif_message VARCHAR
    (255) NOT NULL,
        is_read BOOLEAN NOT NULL DEFAULT FALSE,
    );

    CREATE TABLE black_list(
        black_list INT GENERATED ALWAYS AS IDENTITY,
        token VARCHAR NOT NULL,
        timestamp timestamp NOT NULL DEFAULT NOW
    ()
    );

    -- https://www.the-art-of-web.com/sql/trigger-delete-old/
    CREATE FUNCTION delete_old_rows() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
        DELETE FROM black_list WHERE timestamp < NOW() - INTERVAL
        '1 hour';
    RETURN NULL;
    END;
$$;


    CREATE TRIGGER trigger_delete_old_rows
    AFTER
    INSERT ON
    black_list
    EXECUTE PROCEDURE delete_old_rows
    ();