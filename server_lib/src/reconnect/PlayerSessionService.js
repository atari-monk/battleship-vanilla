import { SocketEvents } from 'shared'

export class PlayerSessionService {
  constructor(io) {
    this.io = io
    this.playerSessions = {}
    this.initializeSocketEvents()
  }

  initializeSocketEvents() {
    this.io.on(SocketEvents.Server.CONNECTION, (socket) => {
      console.log('New connection: ' + socket.id)

      socket.on(SocketEvents.Client.REGISTER_PLAYER, (playerId) => {
        this.registerPlayer(socket, playerId)
      })

      socket.on(SocketEvents.Client.DISCONNECT, () => {
        this.handleDisconnect(socket)
      })
    })
  }

  registerPlayer(socket, playerId) {
    console.log('Player connected with ID: ' + playerId)

    this.playerSessions[playerId] = socket.id

    socket.emit(SocketEvents.Server.WELCOME, `Welcome back, player ${playerId}`)
  }

  handleDisconnect(socket) {
    console.log('Player disconnected: ' + socket.id)

    const playerId = Object.keys(this.playerSessions).find(
      (id) => this.playerSessions[id] === socket.id
    )

    if (playerId) {
      delete this.playerSessions[playerId]
      console.log(`Player session removed for ID: ${playerId}`)
    }
  }
}
