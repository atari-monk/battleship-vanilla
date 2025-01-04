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
        this.handleAttack(socket, data)
      })
    })
  }

  handleAttack(socket, data) {
    const { playerId, targetX, targetY } = data
    console.log(
      `Handle attack with playerId: ${playerId}, x: ${targetX}, y: ${targetY} from socketId: ${socket.id}`
    )
    try {
      const enemy = this.dataService.getEnemyOfPlayer(playerId)
      console.debug('enemy:', enemy)
      const result = enemy.grid.attack(targetX, targetY)
      console.debug('atack result', result)
      this.io.emit(SocketEvents.ATTACK_RESULT, {
        attackedPlayerId: enemy.playerID,
        x: targetX,
        y: targetY,
        result,
      })
    } catch (error) {
      console.error(`Error in battle attack: ${error.message}`)
    }
  }
}
