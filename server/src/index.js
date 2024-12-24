import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { getRandomNumber } from 'shared'

console.log(getRandomNumber(1, 10))

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

const port = 3000

app.use(cors())

io.on('connection', (socket) => {
  console.log('New client connected')

  // Send a ping every 5 seconds
  setInterval(() => {
    socket.emit('ping', `Ping at ${new Date().toLocaleTimeString()}`)
  }, 5000)

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
