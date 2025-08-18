/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('casos', function(table) {
    table.increments('id').primary();
    table.string('titulo').notNullable();
    table.string('descricao');
    table.string('status').notNullable();
    table.integer('agente_id').unsigned().references('id').inTable('agentes');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('casos');
};
