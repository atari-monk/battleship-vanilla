import { SocketEvents } from 'shared'

export class BattleService {
  constructor(io, dataService) {
    this.io = io
    this.dataService = dataService
    this.initializeSocketEvents()
  }

  initializeSocketEvents() {
    this.io.on(SocketEvents.Server.CONNECTION, (socket) => {
      socket.on(SocketEvents.ATTACK, (data) => {
        this.handleAttack(data)
      })
      socket.on(SocketEvents.TURN_END, (data) => {
        this.handleTurnEnd(data)
      })
    })
  }

  handleAttack(data) {
    console.debug('Handle SocketEvent.ATTACK')
    const { playerId, targetX, targetY } = data
    try {
      const enemy = this.dataService.getEnemyOfPlayer(playerId)
      const result = enemy.grid.attack(targetX, targetY)
      console.debug('Emit SocketEvent.ATTACK_RESULT')
      this.io.emit(SocketEvents.ATTACK_RESULT, {
        attackedPlayerId: enemy.playerID,
        x: targetX,
        y: targetY,
        result,
      })
    } catch (error) {
      console.error(`Error: ${error.message}`)
    }
  }

  handleTurnEnd(data) {
    console.debug('Handle SocketEvent.TURN_END')
    const { playerId, turnNr } = data
    const enemy = this.dataService.getEnemyOfPlayer(playerId)
    console.debug('Emit SocketEvent.TURN')
    this.io.emit(SocketEvents.TURN, { turnNr, playerId: enemy.playerID })
  }
}
