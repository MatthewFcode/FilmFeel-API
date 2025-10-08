import request from 'superagent'
import { Movie } from '../../models/movies.ts'

// document represents the HTML page || in Node.js document doesn't exist at all -> our vitest environment is in Node so we essentially use the back end server for our test when we want to run the test instead of the faulty document.basURI which implies we have a document
const rootURL =
  typeof document !== 'undefined'
    ? new URL(`/api/v1`, document.baseURI)
    : 'http://localhost:3000/api/v1'

// api endpoint for resquesting all movies by the mood they have associated with them and is going to be used for the movie recommendation component
export async function getMoviesByMood(
  mood: string,
): Promise<Movie[] | undefined> {
  try {
    const result = await request.get(`${rootURL}/movies/${mood}`)
    return result.body as Movie[]
  } catch (err) {
    console.log(err)
  }
}

// adding a movie to the database function that could be added in the demo maybe
export async function addMovie(newMovie: {
  title: string
  mood: string
}): Promise<Movie | undefined> {
  try {
    const result = await request.post(`${rootURL}/movies`).send(newMovie)
    return result.body as Movie
  } catch (err) {
    console.log(err)
  }
}

export async function getAllMoods(): Promise<string[] | undefined> {
  try {
    const result = await request.get(`${rootURL}/movies/moods`)
    return result.body
  } catch (err) {
    console.log(err)
  }
}
