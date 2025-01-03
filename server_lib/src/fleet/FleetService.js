import { SocketEvents } from 'shared'

export class FleetService {
  constructor(io, dataService) {
    this.io = io
    this.dataService = dataService
    this.initializeSocketEvents()
  }

  initializeSocketEvents() {
    this.io.on(SocketEvents.Server.CONNECTION, (socket) => {
      socket.on(SocketEvents.Client.SET_FLEET, (data) => {
        this.handleSetFleet(socket, data)
      })
    })
  }

  handleSetFleet(socket, data) {
    const { playerId, players } = data
    console.log(
      `Handle set fleet with playerID: ${playerId}, socketID: ${socket.id}`
    )

    try {
    } catch (error) {
      console.error(`Error setting fleet: ${error.message}`)
    }
  }
}
