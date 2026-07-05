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
    pgm.createTable("policies", {
        id: {
            type: "serial",
            primaryKey: true,
        },
        plan: {
            type: "varchar(50)",
            notNull: true,
            unique: true,
        },
        algorithm: {
            type: "varchar(50)",
            notNull: true,
        },
        capacity: {
            type: "integer",
            notNull: true,
        },
        refill_rate: {
            type: "integer",
            notNull: true,
        },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        updated_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable("policies");
};
