export class Battle {
  constructor(dataService, player1ID, player2ID) {
    this.dataService = dataService
    this.player1ID = player1ID
    this.player2ID = player2ID
    this.currentPlayer = player1ID
  }

  /**
   * Switches the turn to the next player.
   */
  switchTurn() {
    this.currentPlayer =
      this.currentPlayer === this.player1ID ? this.player2ID : this.player1ID
  }

  /**
   * Handles a player's attack.
   * @param {number} targetX - X coordinate of the attack.
   * @param {number} targetY - Y coordinate of the attack.
   * @param {Function} renderGrid - Callback to re-render the grid.
   * @param {Function} alertCallback - Callback for user alerts.
   */
  attack(targetX, targetY, renderGrid, alertCallback) {
    const opponentID =
      this.currentPlayer === this.player1ID ? this.player2ID : this.player1ID
    const grid = this.dataService.getPlayerGrid(opponentID)
    this.dataService.attackPlayer(opponentID, targetX, targetY)

    // Check if already attacked
    const cellStatus = grid[targetX][targetY]
    if (cellStatus === 'hit' || cellStatus === 'miss') {
      alertCallback('Cell already attacked!')
      return
    }

    // Determine hit or miss
    if (cellStatus === 'ship') {
      grid[targetX][targetY] = 'hit'
      alertCallback('Hit!')
      if (this.isFleetDestroyed(opponentID)) {
        alertCallback(`${this.currentPlayer} wins!`)
      }
    } else {
      grid[targetX][targetY] = 'miss'
      alertCallback('Miss!')
      this.switchTurn()
    }

    renderGrid()
  }

  /**
   * Checks if a player's fleet is completely destroyed.
   * @param {string} playerID - ID of the player to check.
   * @returns {boolean} - True if the fleet is destroyed, false otherwise.
   */
  isFleetDestroyed(playerID) {
    const grid = this.dataService.getPlayerGrid(playerID)
    return grid.every((row) => row.every((cell) => cell !== 'ship'))
  }
}
