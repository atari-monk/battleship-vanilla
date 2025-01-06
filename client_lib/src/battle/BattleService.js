import { SocketEvents } from '/shared/src/index.js'

export class BattleService {
  constructor(socket, playerId, dataService, renderCallback) {
    this.socket = socket
    this.playerId = playerId
    this.dataService = dataService
    this.renderCallback = renderCallback
    this.player = this.dataService.getPlayer(this.playerId)
    this.turnNr = 0
    this.setupListeners()
  }

  setupListeners() {
    this.socket.on(SocketEvents.TURN, (data) => this.handleTurn(data))
    this.socket.on(SocketEvents.ATTACK_RESULT, (data) =>
      this.handleAttackResult(data)
    )
  }

  handleTurn(data) {
    const { turnNr, playerId } = data
    if (playerId !== this.player.playerID) return

    this.turnNr = turnNr
    this.player.isYourTurn = true
    this.renderCallback()
    console.debug('Your Turn')
  }

  attack(playerId, targetX, targetY) {
    console.debug('Your attack')
    this.socket.emit(SocketEvents.ATTACK, { playerId, targetX, targetY })
  }

  handleAttackResult(data) {
    const { attackedPlayerId, x, y, result } = data
    if (attackedPlayerId === this.playerId) return

    const attacked = this.dataService.getPlayer(attackedPlayerId)
    attacked.grid.cells[x][y].status = result
    this.player.isYourTurn = false
    this.renderCallback()

    this.socket.emit(SocketEvents.TURN_END, {
      playerId: this.playerId,
      turnNr: this.turnNr++,
    })
    
    console.debug('Your turn ends')
  }
}
