import { SocketEvents } from '/shared/src/index.js'

export class SocketService {
  constructor(socket, playerId) {
    this.socket = socket
    this.playerId = playerId

    this.setupListeners()
  }

  setupListeners() {
    this.socket.on(SocketEvents.Client.CONNECT, () => {
      console.log(`Connected with player ID: ${this.playerId}`)
      this.registerPlayer()
    })

    this.socket.on(SocketEvents.Client.RECONNECT, () => {
      console.log(`Reconnected with player ID: ${this.playerId}`)
      this.registerPlayer()
    })

    this.socket.on(SocketEvents.Client.DISCONNECT, () => {
      console.log('Disconnected. Trying to reconnect...')
    })
  }

  registerPlayer() {
    this.socket.emit(SocketEvents.Client.REGISTER_PLAYER, this.playerId)
  }
}
