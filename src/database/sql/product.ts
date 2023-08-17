const TABLE_NAME = "public.products"

const deleteUsersTable: string = `DROP TABLE IF EXISTS ${TABLE_NAME}`

const createUsersTable: string = `
    CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
        id bigserial NOT NULL,
        username varchar NOT NULL,
        password varchar NOT NULL,
        salt varchar NOT NULL,
        created_at timestamp NOT NULL DEFAULT NOW(),
        deleted_at timestamp NULL,
        CONSTRAINT users_pk PRIMARY KEY (id)
    );
    CREATE UNIQUE INDEX IF NOT EXISTS users_username_idx ON public.users (username);`
const selectAll: string = `
    SELECT * FROM ${TABLE_NAME};`
const insertRow: string = `
    INSERT INTO ${TABLE_NAME} (id, title, description, price, stock) VALUES(DEFAULT, $1, $2, $3, $4) RETURNING *;`

const fetchUserByUsername: string = `
    SELECT id, username, password, salt, created_at FROM ${TABLE_NAME} WHERE deleted_at IS NULL AND username = $1`


export {
    selectAll,
    insertRow,
}