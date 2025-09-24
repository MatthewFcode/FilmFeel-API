/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('movies', (table) => {
    table.increments('id').primary()
    table.string('title')
    table.float('rating')
    table.string('overview')
    table.string('release_date')
    table.string('poster')
    table.string('language')
    table.string('mood')
  })
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('movies')
}
