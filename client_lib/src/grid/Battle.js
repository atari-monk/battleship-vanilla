export class Battle {
  constructor(dataService, player1ID, player2ID) {
    this.dataService = dataService
    this.player1ID = player1ID
    this.player2ID = player2ID
    this.currentPlayer = player1ID
  }

  switchTurn() {
    this.currentPlayer = this.getOpponentID()
  }

  attack(targetX, targetY, renderGrid, messageCallback) {
    const opponentID = this.getOpponentID()

    const grid = this.dataService.getPlayerGrid(opponentID)
    if (this.isCellAlreadyAttacked(grid, targetX, targetY)) {
      messageCallback('Cell already attacked!')
      return
    }

    const attackResult = this.attackCell(opponentID, targetX, targetY)
    this.handleAttackResult(attackResult, opponentID, messageCallback)

    renderGrid()
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

  getOpponentID() {
    return this.currentPlayer === this.player1ID
      ? this.player2ID
      : this.player1ID
  }
}
