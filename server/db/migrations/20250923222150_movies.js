/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('movies', (table) => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.float('rating')
    table.text('overview')
    table.string('release_date')
    table.text('poster')
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
