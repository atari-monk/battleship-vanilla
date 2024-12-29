export class DataService {
  constructor() {
    this.players = new Map()
  }

  addPlayer(playerID, socketID) {
    if (this.players.has(playerID)) {
      throw new Error(`Player with ID ${playerID} already exists.`)
    }
    const player = new PlayerDataModel(playerID, socketID)
    this.players.set(playerID, player)
  }

  getPlayer(playerID) {
    return this.players.get(playerID) || null
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
}
