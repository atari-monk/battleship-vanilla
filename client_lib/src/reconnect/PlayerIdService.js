export class PlayerIdService {
  constructor() {
    this.playerIdKey = 'playerId'
    this.playerId = this.getOrCreatePlayerId()
  }

  getOrCreatePlayerId() {
    let playerId = localStorage.getItem(this.playerIdKey)
    if (!playerId) {
      playerId = this.generateUniqueId()
      localStorage.setItem(this.playerIdKey, playerId)
    }
    return playerId
  }

  generateUniqueId() {
    return 'player-' + Math.random().toString(36).slice(2, 9)
  }

  getPlayerId() {
    return this.playerId
  }
}
