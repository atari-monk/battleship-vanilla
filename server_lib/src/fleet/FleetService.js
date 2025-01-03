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
    const { player } = data
    const { playerID } = player
    console.log(
      `Handle set fleet with playerID: ${playerID}, socketID: ${socket.id}`
    )
    console.debug(data)
    try {
      const serverPlayer = this.dataService.getPlayer(playerID)
      //serverPlayer.grid.printGrid(playerID)
      serverPlayer.grid.cells = player.grid.cells
      //serverPlayer.grid.printGrid(playerID)
      const players = this.dataService.players
      for (const player of players.values()) {
        player.grid.printGrid(playerID)
      }
    } catch (error) {
      console.error(`Error setting fleet: ${error.message}`)
    }
  }
}
