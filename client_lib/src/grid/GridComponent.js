export class GridComponent {
  constructor(dataService, playerID, fleet) {
    this.dataService = dataService
    this.playerID = playerID
    this.fleet = fleet
    this.currentShipIndex = 0
    this.placementDirection = 'horizontal'
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

        cell.addEventListener('mouseenter', () => this.previewPlacement(x, y))
        cell.addEventListener('mouseleave', () => this.clearPreview(x, y))
        cell.addEventListener('click', () => this.placeShip(x, y))

        gridElement.appendChild(cell)
      })
    })

    this.container.appendChild(gridElement)
  }

  renderControls() {
    const controlsElement = document.createElement('div')
    controlsElement.classList.add('battleship-controls')

    const directionButton = document.createElement('button')
    directionButton.textContent = `Direction: ${this.placementDirection}`
    directionButton.addEventListener('click', () => {
      this.placementDirection =
        this.placementDirection === 'horizontal' ? 'vertical' : 'horizontal'
      directionButton.textContent = `Direction: ${this.placementDirection}`
    })

    const infoElement = document.createElement('p')
    infoElement.textContent = `Place ship of size: ${
      this.fleet[this.currentShipIndex]
    }`

    controlsElement.appendChild(directionButton)
    controlsElement.appendChild(infoElement)

    this.container.appendChild(controlsElement)
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

  previewPlacement(startX, startY) {
    const shipSize = this.fleet[this.currentShipIndex]
    const gridSize = this.dataService.getPlayerGrid(this.playerID).length
    const valid = this.dataService.isPlacementValid(
      this.playerID,
      startX,
      startY,
      shipSize,
      this.placementDirection
    )

    for (let i = 0; i < shipSize; i++) {
      const x = startX + (this.placementDirection === 'horizontal' ? i : 0)
      const y = startY + (this.placementDirection === 'vertical' ? i : 0)

      if (x >= gridSize || y >= gridSize) {
        break
      }

      const cell = this.getCellElement(x, y)
      if (cell) {
        const cellStatus = this.dataService.getPlayerGrid(this.playerID)[x][y]
        if (cellStatus === 'ship') {
          cell.style.backgroundColor = 'blue'
        } else {
          cell.style.backgroundColor = valid ? 'green' : 'red'
        }
      }
    }
  }

  clearPreview(startX, startY) {
    const shipSize = this.fleet[this.currentShipIndex]
    const gridSize = this.dataService.getPlayerGrid(this.playerID).length

    for (let i = 0; i < shipSize; i++) {
      const x = startX + (this.placementDirection === 'horizontal' ? i : 0)
      const y = startY + (this.placementDirection === 'vertical' ? i : 0)

      if (x >= gridSize || y >= gridSize) {
        break
      }

      const cell = this.getCellElement(x, y)
      if (cell) {
        const cellStatus = this.dataService.getPlayerGrid(this.playerID)[x][y]
        cell.style.backgroundColor = this.getCellColor(cellStatus)
      }
    }
  }

  placeShip(startX, startY) {
    const shipSize = this.fleet[this.currentShipIndex]
    const valid = this.dataService.isPlacementValid(
      this.playerID,
      startX,
      startY,
      shipSize,
      this.placementDirection
    )

    if (valid) {
      this.dataService.placeShip(
        this.playerID,
        startX,
        startY,
        shipSize,
        this.placementDirection
      )

      this.currentShipIndex++
      if (this.currentShipIndex < this.fleet.length) {
        this.renderGrid()
        this.renderControls()
      } else {
        alert('All ships placed!')
      }
    } else {
      alert('Invalid placement!')
    }
  }

  getCellElement(x, y) {
    return this.container.querySelector(
      `.grid-cell[data-x="${x}"][data-y="${y}"]`
    )
  }
}
