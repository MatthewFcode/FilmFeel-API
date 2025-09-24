/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex('movies').del()
  await knex('movies').insert([
    {
      title: 'Inception',
      rating: 6.5,
      overview:
        'Inception is a mind-bending sci-fi thriller about a skilled thief who enters dreams to plant ideas, blurring reality and illusion in a dangerous, layered heist.',
      release_date: '08/07/2025',
      language: 'english',
      mood: 'Angry',
    },
  ])
}
