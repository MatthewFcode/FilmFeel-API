import request from 'superagent'
import { Movie } from '../../models/movies.ts'
const rootURL = new URL(`/api/v1`, document.baseURI)

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
