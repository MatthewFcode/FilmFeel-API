import { Router } from 'express'
import request from 'superagent'
import * as db from '../db/movies.ts'
import { Movie } from '../../models/movies.ts'

const router = Router()

const apiKey = process.env.TMDB_API_KEY
const apiBase = 'https://api.themoviedb.org/3'

router.get('/', async (req, res) => {
  try {
    const allMovies = await db.getAllMovies()

    res.status(200).json(allMovies)
  } catch (err) {
    console.log(err)
    res.status(500).json('Internal Server Error')
  }
})

router.get('/:mood', async (req, res) => {
  try {
    const mood = req.params.mood
    const result = await db.getMovieByMood(mood)
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json('Internal Server Error')
  }
})

router.get('/moods', async (req, res) => {
  try {
    const result = await db.getAllMoods()
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json('Internal Server Error')
  }
})

// post route integrating the external api

router.post('/', async (req, res) => {
  try {
    const { mood, title } = req.body

    // not adding duplicate movies (reducing api calls to the external api)
    const existingMovies = await db.getAllMovies()
    const duplicate = existingMovies?.find(
      (movie: Movie) => movie.title.toLowerCase() === title.toLowerCase(),
    )

    if (duplicate) {
      return res.status(409).json('Movie already exists in the database')
    }

    const apiResult = await request
      .get(`${apiBase}/search/movie`)
      .query({ api_key: apiKey, query: title })

    if (!apiResult.body.results.length) {
      return res
        .status(404)
        .json({ error: `Couldn't add "${title}" to the database` })
    }

    const movieData = apiResult.body.results[0]

    // prepare movie object for the database
    const newMovie = {
      title: movieData.title,
      rating: movieData.vote_average,
      overview: movieData.overview,
      release_date: movieData.release_date,
      poster: movieData.poster_path
        ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
        : null,
      language: movieData.original_language,
      mood: mood,
    }
    const insertedMovie = await db.addMovie(newMovie)
    res.status(201).json(insertedMovie)
  } catch (err) {
    console.log(err)
    res.status(400).json('Bad Post Request')
  }
})

export default router
