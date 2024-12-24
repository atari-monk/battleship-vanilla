const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')

const app = express()
const server = http.createServer(app)
const io = socketIo(server, { cors: { origin: '*' } })

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
