export class FleetGrid {
  constructor(dataService, playerID, grid, fleetPlacement) {
    this.dataService = dataService
    this.playerID = playerID
    this.fleetPlacement = fleetPlacement
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
      (x, y) =>
        this.fleetPlacement.previewPlacement(x, y, (x, y) =>
          this.grid.getCellElement(x, y)
        ),
      (x, y) =>
        this.fleetPlacement.clearPreview(x, y, (x, y) =>
          this.grid.getCellElement(x, y)
        ),
      (x, y) =>
        this.fleetPlacement.placeShip(
          x,
          y,
          () => this.renderGrid(),
          () => this.renderControls(),
          (message) => console.log(message)
        ),
      (cellStatus) => {
        switch (cellStatus) {
          case 'ship':
            return 'blue'
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

    const directionButton = document.createElement('button')
    directionButton.textContent = `Direction: ${this.fleetPlacement.placementDirection}`
    directionButton.addEventListener('click', () => {
      this.fleetPlacement.togglePlacementDirection()
      directionButton.textContent = `Direction: ${this.fleetPlacement.placementDirection}`
    })

    const infoElement = document.createElement('p')
    infoElement.textContent = `Place ship of size: ${
      this.fleetPlacement.fleet[this.fleetPlacement.currentShipIndex]
    }`

    controlsElement.appendChild(directionButton)
    controlsElement.appendChild(infoElement)

    this.container.appendChild(controlsElement)
  }
}
