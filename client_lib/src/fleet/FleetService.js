import { SocketEvents } from '/shared/src/index.js'

export class FleetService {
  constructor(socket, playerId, dataService) {
    this.socket = socket
    this.playerId = playerId
    this.dataService = dataService

    this.setupListeners()
  }

  emitSetFleet(player) {
    console.debug('emitSetFleet!')
    this.socket.emit(SocketEvents.Client.SET_FLEET, { player })
  }

  setupListeners() {
    this.socket.on(SocketEvents.Client.TURN, (data) => this.handleTurn(data))
  }

  handleTurn(data) {
    const { turnNr, playerId } = data
    console.log('turn', turnNr, playerId)
  }
}
