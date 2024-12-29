import { SocketEvents } from 'shared'

export class ConnectService {
  constructor(io, dataService) {
    this.io = io
    this.dataService = dataService
    this.initializeSocketEvents()
  }

  initializeSocketEvents() {
    this.io.on(SocketEvents.Server.CONNECTION, (socket) => {
      socket.on(SocketEvents.Client.REGISTER_PLAYER, (playerId) => {
        this.registerPlayer(socket, playerId)
      })

      socket.on(SocketEvents.Client.DISCONNECT, () => {
        this.handleDisconnect(socket)
      })
    })
  }

  registerPlayer(socket, playerId) {
    console.log(`Connected with playerID: ${playerId}, socketID: ${socket.id}`)

    try {
      this.dataService.addPlayer(playerId, socket.id)
    } catch (error) {
      console.error(`Error registering player: ${error.message}`)
    }
  }

  handleDisconnect(socket) {
    const playerId = this.dataService.getPlayerIdBySocket(socket.id)

    if (playerId) {
      this.dataService.removePlayer(playerId)
      console.log(
        `Disconnected with playerID: ${playerId}, socketID: ${socket.id}`
      )
    }
  }
}
