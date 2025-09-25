import express from 'express'
import * as Path from 'node:path'
import dotenv from 'dotenv'
import movieRoutes from './routes/movies.ts'
import cors from 'cors'

dotenv.config()

console.log('TMDB_API_KEY:', process.env.TMDB_API_KEY)

const server = express()

server.use(cors()) // By default this allows for allows for all origins for requests from anyone not just my front end

server.use(express.json())

server.use('/api/v1/movies', movieRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('yes*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
