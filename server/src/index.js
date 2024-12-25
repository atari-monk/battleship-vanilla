import { SocketServer } from 'server_lib'

const socketServer = new SocketServer(3000)

socketServer.registerHandler((socket) => {
  setInterval(() => {
    socket.emit('ping', `Ping at ${new Date().toLocaleTimeString()}`)
  }, 5000)
})

socketServer.start()
