import { SocketEvents } from '/shared/src/index.js'

export class ConnectService {
  constructor(socket, playerId, dataService) {
    this.socket = socket
    this.playerId = playerId
    this.dataService = dataService

    this.setupListeners()
  }

  setupListeners() {
    this.socket.on(SocketEvents.Client.CONNECT, () => this.handleConnect())
    this.socket.on(SocketEvents.Client.RECONNECT, () => this.handleReconnect())
    this.socket.on(SocketEvents.Client.DISCONNECT, () =>
      this.handleDisconnect()
    )
    this.socket.on(SocketEvents.SET_PLAYERS, (data) =>
      this.handleSetPlayers(data)
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

  handleSetPlayers(data) {
    const { players } = data
    for (const player of players) {
      if (!this.dataService.players.has(player)) {
        this.dataService.addPlayer(player, '')
        console.debug('Enemy player added', player)
      }
    }
  }
}
