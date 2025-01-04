import { SocketEvents } from '/shared/src/index.js'

export class FleetService {
  constructor(socket, playerId, dataService) {
    this.socket = socket
    this.playerId = playerId
    this.dataService = dataService
  }

  emitSetFleet(player) {
    console.debug('emitSetFleet!')
    this.socket.emit(SocketEvents.Client.SET_FLEET, { player })
  }
}
