import { IDataService } from './IDataService.js'
import { DataModel } from './DataModel.js'

export class DataService extends IDataService {
  constructor() {
    super()
    this._players = new Map()
  }

  get players() {
    return this._players
  }

  addPlayer(playerID, socketID) {
    if (this._players.has(playerID)) {
      throw new Error(`Player with ID ${playerID} already exists.`)
    }
    const player = new DataModel(playerID, socketID)
    this._players.set(playerID, player)
  }

  addEnemy(playerID) {
    if (this._players.has(playerID)) return
    const player = new DataModel(playerID, '')
    this._players.set(playerID, player)
  }

  getPlayer(playerID) {
    return this._players.get(playerID) || null
  }

  getEnemyOfPlayer(playerID) {
    const players = this.listPlayers()
    return players.find((p) => p.playerID !== playerID) || null
  }

  getIds() {
    return Array.from(this._players.keys())
  }

  getPlayerIdBySocket(socketID) {
    const players = this.listPlayers()
    const player = players.find((p) => p.socketID === socketID)
    return player ? player.playerID : null
  }

  updateSocketID(playerID, newSocketID) {
    const player = this._players.get(playerID)
    if (!player) {
      throw new Error(`Player with ID ${playerID} not found.`)
    }
    player.socketID = newSocketID
  }

  removePlayer(playerID) {
    if (!this._players.has(playerID)) {
      throw new Error(`Player with ID ${playerID} not found.`)
    }
    this._players.delete(playerID)
  }

  listPlayers() {
    return Array.from(this._players.values())
  }

  getPlayerGrid(playerID) {
    const player = this._players.get(playerID)
    if (!player) {
      throw new Error(`Player with ID ${playerID} not found.`)
    }
    return player.grid.getGridState()
  }

  getEnemyGridForPlayer(playerID) {
    return this.getEnemyOfPlayer(playerID)?.grid?.getGridState() || null
  }

  isPlacementValid(playerID, startX, startY, length, direction) {
    const player = this._players.get(playerID)
    if (!player) {
      throw new Error(`Player with ID ${playerID} not found.`)
    }

    return player.grid.isPlacementValid(startX, startY, length, direction)
  }

  placeShip(playerID, startX, startY, length, direction) {
    const player = this._players.get(playerID)
    if (!player) {
      throw new Error(`Player with ID ${playerID} not found.`)
    }
    player.grid.placeShip(startX, startY, length, direction)
  }

  attackPlayer(playerID, x, y) {
    const player = this._players.get(playerID)
    if (!player) {
      throw new Error(`Player with ID ${playerID} not found.`)
    }
    return player.grid.attack(x, y)
  }
}
