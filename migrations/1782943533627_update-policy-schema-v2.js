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
    pgm.alterColumn("policies", "capacity", {
        notNull: false
    });
    pgm.alterColumn("policies", "refill_rate", {
        notNull: false
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.alterColumn("policies", "capacity", {
        notNull: true,
    });

    pgm.alterColumn("policies", "refill_rate", {
        notNull: true,
    });
};
