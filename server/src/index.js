import { SocketServer, PlayerSessionService, pingHandler } from 'server_lib'

const socketServer = new SocketServer(3000)

socketServer.registerHandler((socket) => {
  pingHandler(socket)
})

new PlayerSessionService(socketServer.io)

socketServer.start()
