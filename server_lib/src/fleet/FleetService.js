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
    try {
      const serverPlayer = this.dataService.getPlayer(playerID)
      serverPlayer.grid.cells = player.grid.cells
      serverPlayer.isFleetSet = true
      this.printGrids(playerID, true)
      console.debug(this.dataService.getIds())
      if (this.isGameReady()) {
        const turnData = {
          Nr: 1,
          player: this.selectPlayer(),
        }
        console.debug('SocketEvents.Server.TURN', turnData)
        this.io.emit(SocketEvents.Server.TURN, turnData)
      }
    } catch (error) {
      console.error(`Error setting fleet: ${error.message}`)
    }
  }

  printGrids(playerID, isActive = false) {
    if (!isActive) return
    const players = this.dataService.players
    for (const player of players.values()) {
      player.grid.printGrid(playerID)
    }
  }

  isGameReady() {
    const players = this.dataService.players
    for (const player of players.values()) {
      if (!player.isFleetSet) return false
    }
    return true
  }

  selectPlayer() {
    const ids = this.dataService.getIds()

    if (ids.length !== 2) {
      throw new Error('Expected exactly 2 IDs, but found ' + ids.length)
    }

    const randomIndex = Math.floor(Math.random() * ids.length)
    return ids[randomIndex]
  }
}
