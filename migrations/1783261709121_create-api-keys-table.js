/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable("api_keys", {
        id: {
            type: "uuid",
            primaryKey: true,
            default: pgm.func("gen_random_uuid()")
        },
        key_hash:{
            type: "varchar(255)",
            notNull: true,
            unique: true
        },
        application_id: {
            type: "uuid",
            notNull: true,
            references: '"applications"',
            onDelete: "CASCADE",
        },
        name: {
            type: "varchar(255)",
            notNull: true,
        },
        is_active: {
            type: "boolean",
            notNull: true,
            default: true,
        },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        last_used_at:{
            type: "timestamp",
            notNull: false,
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
