export class Battle {
  constructor(dataService, playerID) {
    this.dataService = dataService
    this.playerID = playerID
    this.player = this.dataService.getPlayer(playerID)
  }

  setBattleService(battleService) {
    this.battleService = battleService
  }

  attack(targetX, targetY, renderGrid, messageCallback) {
    if (!this.player.isYourTurn) {
      console.log('not your turn')
      return
    }

    if (this.battleService)
      this.battleService.attack(this.playerID, targetX, targetY)
    else {
      console.warn('battleService undefined')
    }
    //const grid = this.dataService.getPlayerGrid(opponentID)
    // if (this.isCellAlreadyAttacked(grid, targetX, targetY)) {
    //   messageCallback('Cell already attacked!')
    //   return
    // }

    // const attackResult = this.attackCell(opponentID, targetX, targetY)
    // this.handleAttackResult(attackResult, opponentID, messageCallback)

    // renderGrid()
  }

  isCellAlreadyAttacked(grid, targetX, targetY) {
    const cellStatus = grid[targetX][targetY]
    return cellStatus === 'hit' || cellStatus === 'miss'
  }

  attackCell(opponentID, targetX, targetY) {
    return this.dataService.attackPlayer(opponentID, targetX, targetY)
  }

  handleAttackResult(attackResult, opponentID, alertCallback) {
    if (attackResult === 'hit') {
      alertCallback('Hit!')
      if (this.isFleetDestroyed(opponentID)) {
        alertCallback(`${this.currentPlayer} wins!`)
      }
    } else {
      alertCallback('Miss!')
      this.switchTurn()
    }
  }

  isFleetDestroyed(playerID) {
    const grid = this.dataService.getPlayerGrid(playerID)
    return grid.every((row) => row.every((cell) => cell !== 'ship'))
  }
}
