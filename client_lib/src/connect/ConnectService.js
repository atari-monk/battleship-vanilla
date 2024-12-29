import { SocketEvents } from '/shared/src/index.js'

export class ConnectService {
  constructor(socket, playerId) {
    this.socket = socket
    this.playerId = playerId

    this.setupListeners()
  }

  setupListeners() {
    this.socket.on(SocketEvents.Client.CONNECT, () => this.handleConnect())
    this.socket.on(SocketEvents.Client.RECONNECT, () => this.handleReconnect())
    this.socket.on(SocketEvents.Client.DISCONNECT, () =>
      this.handleDisconnect()
    )
  }

  handleConnect() {
    console.log(`Connected with player ID: ${this.playerId}`)
    this.registerPlayer()
  }

  registerPlayer() {
    this.socket.emit(SocketEvents.Client.REGISTER_PLAYER, this.playerId)
  }

  handleReconnect() {
    console.log(`Reconnected with player ID: ${this.playerId}`)
    this.registerPlayer()
  }

  handleDisconnect() {
    console.log('Disconnected. Trying to reconnect...')
  }
}
