import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { SocketEvents } from 'shared'

export class GameServer {
  constructor(port = 3000) {
    this.port = port
    this.app = express()
    this.server = http.createServer(this.app)
    this.io = new Server(this.server, { cors: { origin: '*' } })

    this.handlers = []

    this.initializeMiddleware()
    this.initializeSocketHandlers()
  }

  initializeMiddleware() {
    this.app.use(cors())
  }

  initializeSocketHandlers() {
    this.io.on(SocketEvents.Server.CONNECTION, (socket) => {
      this.handlers.forEach((handler) => handler(socket))

      socket.on(SocketEvents.Client.DISCONNECT, () => {})
    })
  }

  registerHandler(handler) {
    if (typeof handler === 'function') {
      this.handlers.push(handler)
    } else {
      console.error('Handler must be a function')
    }
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`)
    })
  }
}
