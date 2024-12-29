import { DataService } from 'shared'
import { GameServer, ConnectService, pingHandler } from 'server_lib'

const server = new GameServer(3000)

server.registerHandler((socket) => {
  pingHandler(socket)
})
new ConnectService(server.io, new DataService())

server.start()
