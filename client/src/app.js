import {
  SocketClient,
  ClientPing,
  PlayerIdService,
  SocketService,
} from '/client_lib/src/index.js'

const client = new SocketClient('http://localhost:3000', {
  cors: {
    origin: '*',
  },
})
client.initialize()
const socket = client.getSocket()
new ClientPing(socket, 'messages')

const playerIdService = new PlayerIdService()
const playerId = playerIdService.getPlayerId()
new SocketService(socket, playerId)
