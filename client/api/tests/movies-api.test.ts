import nock from 'nock'
import { getMoviesByMood, getAllMoods, addMovie } from '../movies.ts'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { Movie } from '../../../models/movies.ts'

//import request from 'superagent'

// nock is a node.js library that intercepts HTTP requests and returns fake responses without the request ever leaving your machine
beforeEach(() => {
  nock.cleanAll()
})

afterAll(() => {
  expect(nock.isDone()).toBe(true)
})

describe('Testing getting movies by mood API', () => {
  it('calls the api getMoviesByMood with a mood tag and responds with movies by that mood tag', async () => {
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
        mood: 'exctied',
      },
    ]
    nock(backEndConnection)
      .get(`/api/v1/movies/${mood}`)
      .reply(200, fakeResponse)

    const result = await getMoviesByMood(mood)

    if (!result) {
      console.log('result is undefined')
    }

    expect(result).toEqual(fakeResponse)
  })
})

describe

// export interface Movie {
//   title: string
//   rating: number
//   overview: string
//   release_date: string
//   poster?: string
//   language: string
//   mood: string
// }
