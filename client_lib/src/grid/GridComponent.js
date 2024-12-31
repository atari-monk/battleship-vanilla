export class GridComponent {
  constructor(dataService, playerID, fleetPlacement) {
    this.dataService = dataService
    this.playerID = playerID
    this.fleetPlacement = fleetPlacement
    this.container = null
  }

  init(container) {
    this.container = container
    container.innerHTML = ''
    this.renderGrid()
    this.renderControls()
  }

  renderGrid() {
    const gridState = this.dataService.getPlayerGrid(this.playerID)

    this.container.innerHTML = ''

    const gridElement = document.createElement('div')
    gridElement.classList.add('battleship-grid')
    gridElement.style.display = 'grid'
    gridElement.style.gridTemplateColumns = `repeat(${gridState.length}, 30px)`
    gridElement.style.gap = '0px'

    gridState.forEach((row, x) => {
      row.forEach((cellStatus, y) => {
        const cell = document.createElement('div')
        cell.classList.add('grid-cell')
        cell.dataset.x = x
        cell.dataset.y = y
        cell.style.width = '30px'
        cell.style.height = '30px'
        cell.style.border = '1px solid #ccc'
        cell.style.backgroundColor = this.getCellColor(cellStatus)

        cell.addEventListener('mouseenter', () =>
          this.fleetPlacement.previewPlacement(x, y, (x, y) =>
            this.getCellElement(x, y)
          )
        )
        cell.addEventListener('mouseleave', () =>
          this.fleetPlacement.clearPreview(x, y, (x, y) =>
            this.getCellElement(x, y)
          )
        )
        cell.addEventListener('click', () =>
          this.fleetPlacement.placeShip(
            x,
            y,
            () => this.renderGrid(),
            () => this.renderControls(),
            (message) => alert(message)
          )
        )

        gridElement.appendChild(cell)
      })
    })

    this.container.appendChild(gridElement)
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

  getCellElement(x, y) {
    return this.container.querySelector(
      `.grid-cell[data-x="${x}"][data-y="${y}"]`
    )
  }

  getCellColor(cellStatus) {
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
}
