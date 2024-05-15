DO $ $ BEGIN IF NOT EXISTS (
    SELECT
        1
    FROM
        pg_database
    WHERE
        datname = 'vilagszepdatabase'
) THEN CREATE DATABASE vilagszepdatabase;

END IF;

END $ $;

-- Switch to the new database
\ c vilagszepdatabase;

-- Create a user and grant privileges
CREATE USER user WITH PASSWORD 'uC&$@xs+f8hh3hKm';

GRANT ALL PRIVILEGES ON DATABASE vilagszepdatabase TO user;