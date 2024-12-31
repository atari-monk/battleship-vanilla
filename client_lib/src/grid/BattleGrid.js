export class BattleGrid {
  constructor(dataService, playerID, grid, battle) {
    this.dataService = dataService
    this.playerID = playerID
    this.battle = battle
    this.container = null
    this.grid = grid
  }

  init(container) {
    this.container = container
    this.container.innerHTML = ''
    this.renderGrid()
    this.renderControls()
  }

  renderGrid() {
    const gridState = this.dataService.getPlayerGrid(this.playerID)

    this.grid.init(
      gridState,
      () => {},
      () => {},
      (x, y) => {
        this.battle.attack(
          x,
          y,
          () => {
            this.renderGrid()
            this.renderControls()
          },
          (message) => console.log(message)
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
