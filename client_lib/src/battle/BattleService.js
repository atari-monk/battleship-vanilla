import { SocketEvents } from '/shared/src/index.js'

export class BattleService {
  constructor(socket, playerId, dataService, renderCallback) {
    this.socket = socket
    this.playerId = playerId
    this.dataService = dataService
    this.renderCallback = renderCallback
    console.debug('popatrz na mnie', this.playerId)
    this.setupListeners()
  }

  setupListeners() {
    this.socket.on(SocketEvents.Client.TURN, (data) => this.handleTurn(data))
    this.socket.on(SocketEvents.ATTACK_RESULT, (data) =>
      this.handleAttackResult(data)
    )
  }

  handleTurn(data) {
    const { turnNr, playerId } = data
    console.debug('turn', turnNr, playerId)
    //if (turnNr === 1 || turnNr === 2) this.dataService.addEnemy(playerId)
    console.debug(this.dataService.players)
    const player = this.dataService.getPlayer(this.playerId)
    if (player.playerID === playerId) {
      player.isYourTurn = true
      console.debug('sdasdasdsadsadasd')
    }
    console.debug(player.playerID, playerId)
    console.debug('moj playerrrrrr', player)
    this.renderCallback()
  }

  attack(playerId, targetX, targetY) {
    console.debug('attack from client')
    this.socket.emit(SocketEvents.ATTACK, { playerId, targetX, targetY })
  }

  handleAttackResult(data) {
    const { attackedPlayerId, x, y, result } = data
    console.debug('handleAttackResult:', data)
    const attacked = this.dataService.getPlayer(attackedPlayerId)
    console.debug('attacked:', attacked)
    attacked.grid.cells[x][y].status = result
    console.debug('Atack result', attacked.grid.cells)
    this.renderCallback()
  }
}
