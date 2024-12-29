import { SocketEvents } from 'shared'

export class ConnectService {
  constructor(io) {
    this.io = io
    this.playerSessions = {}
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

    this.playerSessions[playerId] = socket.id
  }

  handleDisconnect(socket) {
    const playerId = Object.keys(this.playerSessions).find(
      (id) => this.playerSessions[id] === socket.id
    )

    if (playerId) {
      delete this.playerSessions[playerId]
      console.log(
        `Disconnected with playerID: ${playerId}, socketID ${socket.id}`
      )
    }
  }
}
