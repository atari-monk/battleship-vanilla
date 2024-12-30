import { IDataService } from './IDataService.js'
import { DataModel } from './DataModel.js'

export class DataService extends IDataService {
  constructor() {
    super()
    this.players = new Map()
  }

  addPlayer(playerID, socketID) {
    if (this.players.has(playerID)) {
      throw new Error(`Player with ID ${playerID} already exists.`)
    }
    const player = new DataModel(playerID, socketID)
    this.players.set(playerID, player)
  }

  getPlayer(playerID) {
    return this.players.get(playerID) || null
  }

  getPlayerIdBySocket(socketID) {
    const players = this.listPlayers()
    const player = players.find((p) => p.socketID === socketID)
    return player ? player.playerID : null
  }

  updateSocketID(playerID, newSocketID) {
    const player = this.players.get(playerID)
    if (!player) {
      throw new Error(`Player with ID ${playerID} not found.`)
    }
    player.socketID = newSocketID
  }

  removePlayer(playerID) {
    if (!this.players.has(playerID)) {
      throw new Error(`Player with ID ${playerID} not found.`)
    }
    this.players.delete(playerID)
  }

  listPlayers() {
    return Array.from(this.players.values())
  }

  getPlayerGrid(playerID) {
    const player = this.players.get(playerID)
    if (!player) {
      throw new Error(`Player with ID ${playerID} not found.`)
    }
    return player.grid.getGridState()
  }

  isPlacementValid(playerID, startX, startY, length, direction) {
    const player = this.players.get(playerID)
    if (!player) {
      throw new Error(`Player with ID ${playerID} not found.`)
    }

    return player.grid.isPlacementValid(startX, startY, length, direction)
  }

  placeShip(playerID, startX, startY, length, direction) {
    const player = this.players.get(playerID)
    if (!player) {
      throw new Error(`Player with ID ${playerID} not found.`)
    }
    player.grid.placeShip(startX, startY, length, direction)
  }

  attackPlayer(playerID, x, y) {
    const player = this.players.get(playerID)
    if (!player) {
      throw new Error(`Player with ID ${playerID} not found.`)
    }
    return player.grid.attack(x, y)
  }
}
