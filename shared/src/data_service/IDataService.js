export class IDataService {
  addPlayer(playerID, socketID) {
    throw new Error("Method 'addPlayer()' must be implemented.")
  }

  getPlayer(playerID) {
    throw new Error("Method 'getPlayer()' must be implemented.")
  }

  getPlayerIdBySocket(socketID) {
    throw new Error("Method 'getPlayerIdBySocket()' must be implemented.")
  }

  updateSocketID(playerID, newSocketID) {
    throw new Error("Method 'updateSocketID()' must be implemented.")
  }

  removePlayer(playerID) {
    throw new Error("Method 'removePlayer()' must be implemented.")
  }

  listPlayers() {
    throw new Error("Method 'listPlayers()' must be implemented.")
  }
}
