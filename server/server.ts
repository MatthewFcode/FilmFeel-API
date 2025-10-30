import express from 'express'
import * as Path from 'node:path'
import movieRoutes from './routes/movies.ts'
import cors from 'cors'
import { createServer } from 'http'
import { WebSocketServer } from 'ws'

if (process.env.NODE_ENV !== 'production') {
  import('dotenv')
    .then((dotenv) => dotenv.config())
    .catch((err) => {
      console.error('Failed to load dotenv: ', err)
    })
}

//console.log('TMDB_API_KEY:', process.env.TMDB_API_KEY)

const app = express()

app.use(cors()) // By default this allows for allows for all origins for requests from anyone not just my front end

app.use(express.json())

const server = createServer(app) // setting up the websocket
const wss = new WebSocketServer({ server }) // setups the websocket server

app.use('/api/v1/movies', movieRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(Path.resolve('public')))
  app.use('/assets', express.static(Path.resolve('./dist/assets')))
  app.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

wss.on('connection', (ws) => {
  // when a client connects to the server the we console.log the client connected
  console.log('client connected')

  ws.on('message', (message) => {
    console.log(`received the message ${message}`)
  }) // runs when ever a client sends a message to the server

  ws.on('close', () => {
    console.log('Client disconnected')
  }) // whenever a client disconnects from the open connection
})

export { wss, server, app }
export default app
