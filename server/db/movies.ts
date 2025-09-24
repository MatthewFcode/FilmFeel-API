import connection from './connection.ts'
import { Movie } from '../../models/movies.ts'

const db = connection

// getting all the movies in the api for api call
export async function getAllMovies(): Promise<Movie[] | undefined> {
  try {
    const result = await db('movies').select()
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
  }
}

// getting all movies by the tag for the api call for moods
export async function getMovieByMood(
  mood: string,
): Promise<Movie[] | undefined> {
  try {
    const result = await db('movies').where('movies.mood', mood).select()
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
  }
}

// posting a movie by the title and the mood
export async function addMovie(newMovie: {
  title: string
  rating: number
  overview: string
  release_date: string
  poster: string | null
  language: string
  mood: string
}): Promise<Movie[] | undefined> {
  try {
    const result = await db('movies').insert(newMovie).returning('*')
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
  }
}

//getting all moods that are being used to display in the docs of the api in the tags section and as buttons for the get requests in the suggestion component
export async function getAllMoods(): Promise<string[] | undefined> {
  try {
    const result = await db('movies').distinct('mood').pluck('mood') //distinct ensures that there are no duplicates || pluck extracts the mood values into a flat string
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
  }
}
