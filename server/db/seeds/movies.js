import dotenv from 'dotenv'
import request from 'superagent'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  dotenv.config({ path: '../../.env' })
  console.log('Loaded:', process.env.API_KEY)
  const moviesToSeed = [
    { title: 'The Dark Knight', mood: 'Intense' },
    { title: 'Whiplash', mood: 'Intense' },
    { title: 'Gladiator', mood: 'Intense' },
    { title: 'Sicario', mood: 'Intense' },
    { title: 'Prisoners', mood: 'Intense' },
    { title: 'Black Hawk Down', mood: 'Intense' },

    { title: 'The Shawshank Redemption', mood: 'Hopeful' },
    { title: 'The Pursuit of Happyness', mood: 'Hopeful' },
    { title: 'Billy Elliot', mood: 'Hopeful' },
    { title: 'Life is Beautiful', mood: 'Hopeful' },
    { title: 'Hidden Figures', mood: 'Hopeful' },
    { title: 'The Secret Life of Walter Mitty', mood: 'Hopeful' },

    { title: 'Pulp Fiction', mood: 'Edgy' },
    { title: 'Trainspotting', mood: 'Edgy' },
    { title: 'Snatch', mood: 'Edgy' },
    { title: 'American Psycho', mood: 'Edgy' },
    { title: 'Joker', mood: 'Edgy' },
    { title: 'Drive', mood: 'Edgy' },

    { title: 'Forrest Gump', mood: 'Nostalgic' },
    { title: 'Stand by Me', mood: 'Nostalgic' },
    { title: 'Back to the Future', mood: 'Nostalgic' },
    { title: 'Cinema Paradiso', mood: 'Nostalgic' },
    { title: 'The Sandlot', mood: 'Nostalgic' },
    { title: 'Almost Famous', mood: 'Nostalgic' },

    { title: 'The Matrix', mood: 'Mind-bending' },
    { title: 'Interstellar', mood: 'Mind-bending' },
    { title: 'Memento', mood: 'Mind-bending' },
    { title: 'Tenet', mood: 'Mind-bending' },
    { title: 'Donnie Darko', mood: 'Mind-bending' },
    { title: 'Predestination', mood: 'Mind-bending' },

    { title: 'Spirited Away', mood: 'Whimsical' },
    { title: 'My Neighbor Totoro', mood: 'Whimsical' },
    { title: 'The Princess Bride', mood: 'Whimsical' },
    { title: 'Paddington 2', mood: 'Whimsical' },
    { title: 'The Little Prince', mood: 'Whimsical' },
    { title: 'Fantastic Mr. Fox', mood: 'Whimsical' },

    { title: 'The Silence of the Lambs', mood: 'Anxious' },
    { title: 'Se7en', mood: 'Anxious' },
    { title: 'Zodiac', mood: 'Anxious' },
    { title: 'Nightcrawler', mood: 'Anxious' },
    { title: 'Gone Girl', mood: 'Anxious' },
    { title: 'Hereditary', mood: 'Anxious' },

    { title: 'Parasite', mood: 'Tense' },
    { title: 'No Country for Old Men', mood: 'Tense' },
    { title: 'The Revenant', mood: 'Tense' },
    { title: 'The Departed', mood: 'Tense' },
    { title: 'Oldboy', mood: 'Tense' },
    { title: 'The Prestige', mood: 'Tense' },

    { title: 'The Grand Budapest Hotel', mood: 'Quirky' },
    { title: 'Moonrise Kingdom', mood: 'Quirky' },
    { title: 'The Royal Tenenbaums', mood: 'Quirky' },
    { title: 'Napoleon Dynamite', mood: 'Quirky' },
    { title: 'Scott Pilgrim vs. the World', mood: 'Quirky' },
    { title: 'The Life Aquatic with Steve Zissou', mood: 'Quirky' },

    { title: 'Blade Runner 2049', mood: 'Melancholy' },
    { title: 'Lost in Translation', mood: 'Melancholy' },
    { title: 'Her', mood: 'Melancholy' },
    { title: 'Manchester by the Sea', mood: 'Melancholy' },
    { title: 'Blue Valentine', mood: 'Melancholy' },
    { title: 'The Green Mile', mood: 'Melancholy' },

    { title: 'Mad Max: Fury Road', mood: 'Adrenaline-pumping' },
    { title: 'John Wick', mood: 'Adrenaline-pumping' },
    { title: 'Edge of Tomorrow', mood: 'Adrenaline-pumping' },
    { title: 'Baby Driver', mood: 'Adrenaline-pumping' },
    { title: 'Top Gun: Maverick', mood: 'Adrenaline-pumping' },
    { title: 'The Raid', mood: 'Adrenaline-pumping' },

    { title: 'La La Land', mood: 'Romantic' },
    { title: 'Pride & Prejudice', mood: 'Romantic' },
    { title: 'Before Sunrise', mood: 'Romantic' },
    { title: 'The Notebook', mood: 'Romantic' },
    { title: 'About Time', mood: 'Romantic' },
    { title: 'Call Me by Your Name', mood: 'Romantic' },

    { title: 'Get Out', mood: 'Unsettling' },
    { title: 'Us', mood: 'Unsettling' },
    { title: 'The Babadook', mood: 'Unsettling' },
    { title: 'Midsommar', mood: 'Unsettling' },
    { title: 'Black Swan', mood: 'Unsettling' },
    { title: 'Under the Skin', mood: 'Unsettling' },

    { title: 'The Social Network', mood: 'Ambitious' },
    { title: 'Steve Jobs', mood: 'Ambitious' },
    { title: 'Moneyball', mood: 'Ambitious' },
    { title: 'The Wolf of Wall Street', mood: 'Ambitious' },
    { title: 'The Founder', mood: 'Ambitious' },
    { title: 'Air', mood: 'Ambitious' },

    { title: 'Eternal Sunshine of the Spotless Mind', mood: 'Heartbroken' },
    { title: 'Marriage Story', mood: 'Heartbroken' },
    { title: 'Blue Valentine', mood: 'Heartbroken' },
    { title: 'Atonement', mood: 'Heartbroken' },
    { title: 'Revolutionary Road', mood: 'Heartbroken' },
    { title: 'Her', mood: 'Heartbroken' },

    { title: 'Inception', mood: 'Mind-bending' },
    {
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      mood: 'Epic',
    },
    { title: 'The Two Towers', mood: 'Epic' },
    { title: 'The Return of the King', mood: 'Epic' },
    { title: 'Dune', mood: 'Epic' },
    { title: 'Avatar', mood: 'Epic' },
    { title: 'Braveheart', mood: 'Epic' },

    { title: 'Fight Club', mood: 'Rebellious' },
    { title: 'V for Vendetta', mood: 'Rebellious' },
    { title: 'The Breakfast Club', mood: 'Rebellious' },
    { title: 'American History X', mood: 'Rebellious' },
    { title: 'Into the Wild', mood: 'Rebellious' },
    { title: 'Natural Born Killers', mood: 'Rebellious' },

    { title: 'Goodfellas', mood: 'Gritty' },
    { title: 'The Town', mood: 'Gritty' },
    { title: 'Heat', mood: 'Gritty' },
    { title: 'Casino', mood: 'Gritty' },
    { title: 'The French Connection', mood: 'Gritty' },
    { title: 'City of God', mood: 'Gritty' },

    { title: 'The Godfather', mood: 'Powerful' },
    { title: 'Schindler’s List', mood: 'Powerful' },
    { title: '12 Years a Slave', mood: 'Powerful' },
    { title: 'The Pianist', mood: 'Powerful' },
    { title: 'Lincoln', mood: 'Powerful' },
    { title: 'The Imitation Game', mood: 'Powerful' },
  ]

  const apiKey = process.env.TMDB_API_KEY
  const apiBase = 'https://api.themoviedb.org/3'

  if (!apiKey) {
    console.error('TMDB_API_KEY is not set. Skipping seed data population.')
    return
  }

  console.log('Starting to seed movies...')

  for (const movie of moviesToSeed) {
    try {
      const apiResult = await request
        .get(`${apiBase}/search/movie`)
        .query({ api_key: apiKey, query: movie.title })

      if (apiResult.body.results.length > 0) {
        const movieData = apiResult.body.results[0]
        const newMovie = {
          title: movieData.title,
          rating: movieData.vote_average,
          overview: movieData.overview,
          release_date: movieData.release_date,
          poster: movieData.poster_path
            ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
            : null,
          language: movieData.original_language,
          mood: movie.mood,
        }
        await knex('movies').insert(newMovie)
        console.log(`Successfully seeded: ${newMovie.title}`)
      } else {
        console.warn(`Could not find movie: ${movie.title}`)
      }
    } catch (error) {
      console.error(`Error seeding ${movie.title}:`, error)
    }
  }

  console.log('Finished seeding movies.')
}
