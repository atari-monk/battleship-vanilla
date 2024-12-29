import { GameServer, ConnectService, pingHandler } from 'server_lib'

const server = new GameServer(3000)

server.registerHandler((socket) => {
  pingHandler(socket)
})
new ConnectService(server.io)

server.start()
