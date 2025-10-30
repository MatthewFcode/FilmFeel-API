import {
  describe,
  it,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
  vi,
} from 'vitest'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import app from '../../server.ts'
import connection from '../../db/connection.ts'
import superagent from 'superagent'

vi.mock('superagent') // tells vitest whenever any code imports superagent don't use the real one use a mocked version that I control

const mockedSuperagent = superagent as unknown as {
  // mocked superagent version that overrieds how the get request behaves
  get: ReturnType<typeof vi.fn>
}

const db = connection

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe('getting all the movies', () => {
  it('route allows for users to query all of the moves in the database', async () => {
    await db('movies').insert([
      {
        title: 'Avatar',
        rating: 8.6,
        overview:
          'Jake, a paraplegic marine, replaces his brother on the Navi-inhabited Pandora for a corporate mission.',
        release_date: '17th December 2009',
        poster: '',
        language: 'en',
        mood: 'excited',
      },
    ])

    const result = await request(app).get('/api/v1/movies')

    expect(result.status).toBe(StatusCodes.OK)
    expect(result.body[0]).toEqual({
      id: expect.any(Number),
      title: 'Avatar',
      rating: 8.6,
      overview:
        'Jake, a paraplegic marine, replaces his brother on the Navi-inhabited Pandora for a corporate mission.',
      release_date: '17th December 2009',
      poster: '',
      language: 'en',
      mood: 'excited',
    })
  })
})

describe('Gets all Movies by the mood associated with them', () => {
  it('allows users to querie the database by a mood tag', async () => {
    await db('movies').insert([
      {
        title: 'Avatar',
        rating: 8.6,
        overview:
          'Jake, a paraplegic marine, replaces his brother on the Navi-inhabited Pandora for a corporate mission.',
        release_date: '17th December 2009',
        poster: '',
        language: 'en',
        mood: 'excited',
      },
    ])

    const result = await request(app).get(`/api/v1/movies/${'excited'}`)
    expect(result.status).toBe(StatusCodes.OK)
    expect(result.body[0]).toEqual({
      id: expect.any(Number),
      title: 'Avatar',
      rating: 8.6,
      overview:
        'Jake, a paraplegic marine, replaces his brother on the Navi-inhabited Pandora for a corporate mission.',
      release_date: '17th December 2009',
      poster: '',
      language: 'en',
      mood: 'excited',
    })
  })
})

describe('Adding a movie to the database', () => {
  it('takes a movies mood and title and passed the title into an external api and then receives other data about that movie from the api and adds it to the database', async () => {
    const fakeAPIResponse = {
      // simiulating exactly what the TMBD would return
      body: {
        results: [
          {
            title: 'Up',
            vote_average: 7.959,
            overview:
              'Carl Fredricksen spent his entire life dreaming of exploring the globe and experiencing life to its fullest. But at age 78, life seems to have passed him by, until a twist of fate (and a persistent 8-year old Wilderness Explorer named Russell) gives him a new lease on life.',
            release_date: '2009-05-28',
            poster_path: '/mFvoEwSfLqbcWwFsDjQebn9bzFe.jpg',
            original_language: 'en',
          },
        ],
      },
    }

    mockedSuperagent.get.mockReturnValue({
      // telling vitest what happends when get is called so when the code calls superagent .get() it just returns this object so it never hits the external API
      query: vi.fn().mockResolvedValue(fakeAPIResponse),
    })

    const response = await request(app)
      .post('/api/v1/movies')
      .send({ title: 'Up', mood: 'Excited' })

    expect(response.status).toBe(StatusCodes.CREATED)

    expect(response.body[0]).toEqual({
      id: expect.any(Number),
      title: 'Up',
      rating: 7.959,
      overview:
        'Carl Fredricksen spent his entire life dreaming of exploring the globe and experiencing life to its fullest. But at age 78, life seems to have passed him by, until a twist of fate (and a persistent 8-year old Wilderness Explorer named Russell) gives him a new lease on life.',
      release_date: '2009-05-28',
      poster: 'https://image.tmdb.org/t/p/w500/mFvoEwSfLqbcWwFsDjQebn9bzFe.jpg',
      language: 'en',
      mood: 'Excited',
    })
  })
})

describe('Getting all mood tags', () => {
  it('returns all the mood tags from the database', async () => {
    await db('movies').insert([
      {
        title: 'Avatar',
        rating: 8.6,
        overview:
          'Jake, a paraplegic marine, replaces his brother on the Navi-inhabited Pandora for a corporate mission.',
        release_date: '17th December 2009',
        poster: '',
        language: 'en',
        mood: 'excited',
      },
    ])
    const result = await request(app).get('/api/v1/movies/moods')
    expect(result.status).toBe(StatusCodes.OK)
    expect(result.body[0]).toEqual('excited')
  })
})
