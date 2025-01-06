import { SocketEvents } from '/shared/src/index.js'

export class FleetService {
  constructor(socket, playerId, dataService) {
    this.socket = socket
    this.playerId = playerId
    this.dataService = dataService
  }

  emitSetFleet(player) {
    console.debug('Emit SocketEvent.SET_FLEET')
    this.socket.emit(SocketEvents.SET_FLEET, { player })
  }
}
