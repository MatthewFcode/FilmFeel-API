import nock from 'nock'
import { getMoviesByMood, getAllMoods, addMovie } from '../movies.ts'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { Movie } from '../../../models/movies.ts'

//import request from 'superagent'

// nock is a node.js library that intercepts HTTP requests and returns fake responses without the request ever leaving your machine
beforeAll(() => {
  nock.cleanAll()
}) // before all tests clears all active nock interceptors

beforeEach(() => {
  nock.cleanAll()
}) // before each tests clears all nock interceptors

afterAll(() => {
  expect(nock.isDone()).toBe(true)
}) // ensures that all HTTP tests I told nock to expect actually happened

describe('Testing getting movies by mood API', () => {
  it('calls the api getMoviesByMood() with a mood tag and responds with movies by that mood tag', async () => {
    const backEndConnection: string = 'http://localhost:3000'
    const mood: string = 'excited'

    const fakeResponse: Movie[] = [
      {
        title: 'Avatar',
        rating: 8.5,
        overview: 'Movie about blue people',
        release_date: '17th December 2009',
        poster: 'no poster',
        language: 'en',
        mood: 'excited',
      },
    ]
    nock(backEndConnection)
      .get(`/api/v1/movies/${mood}`)
      .reply(200, fakeResponse)

    const result: Movie[] | undefined = await getMoviesByMood(mood)

    expect(result as Movie[]).toEqual(fakeResponse)
  })
})

describe('adds a movie using addMovie()', () => {
  it('Adds a movie by sending the movie name and the mood you were in to the server', async () => {
    const backEndConnection: string = 'http://localhost:3000'
    const fakeResponse: Movie = {
      title: 'Avatar',
      rating: 8.5,
      overview: 'Movie about blue people',
      release_date: '17th December 2009',
      poster: 'no poster',
      language: 'en',
      mood: 'excited',
    }

    const newMovie = { title: 'Avatar', mood: 'excited' }

    nock(backEndConnection)
      .post('/api/v1/movies', newMovie)
      .reply(200, fakeResponse)

    const result = await addMovie(newMovie)

    expect(result as Movie).toStrictEqual(fakeResponse)
  })
})

describe('get all mood tags using getAllMoods', () => {
  it('makes a request to get all mood tags to the server', async () => {
    const backEndConnection: string = 'http://localhost:3000'
    const fakeResponse: string[] = ['Excited', 'Nostalgic']

    nock(backEndConnection).get('/api/v1/movies/moods').reply(200, fakeResponse)
    const result = await getAllMoods()

    expect(result as string[]).toStrictEqual(fakeResponse)
  })
})
