export class BattleGrid {
  constructor(dataService, playerID, grid, battle) {
    this.dataService = dataService
    this.playerID = playerID
    this.battle = battle
    this.container = null
    this.grid = grid
  }

  /**
   * Initializes the BattleGrid.
   * @param {HTMLElement} container - The container to render the grid and controls.
   */
  init(container) {
    this.container = container
    this.container.innerHTML = ''

    this.renderGrid()
    this.renderControls()
  }

  /**
   * Renders the battle grid.
   */
  renderGrid() {
    const gridState = this.dataService.getPlayerGrid(this.playerID)

    this.grid.init(
      gridState,
      (x, y) => {}, // No hover effects needed for battle mode
      (x, y) => {}, // No hover-clear effects needed for battle mode
      (x, y) => {
        this.battle.attack(
          x,
          y,
          () => this.renderGrid(),
          (message) => alert(message)
        )
      },
      (cellStatus) => {
        switch (cellStatus) {
          case 'ship':
            return 'white'
          case 'hit':
            return 'red'
          case 'miss':
            return 'gray'
          default:
            return 'white'
        }
      }
    )
  }

  /**
   * Renders controls for the battle mode.
   */
  renderControls() {
    const controlsElement = document.createElement('div')
    controlsElement.classList.add('battleship-controls')

    const infoElement = document.createElement('p')
    infoElement.textContent = `It's ${
      this.battle.currentPlayer === this.playerID ? 'your' : "opponent's"
    } turn.`

    controlsElement.appendChild(infoElement)

    this.container.appendChild(controlsElement)
  }
}
