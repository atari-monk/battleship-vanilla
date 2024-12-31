export class Fleet {
  constructor(dataService, playerID, fleet) {
    this.dataService = dataService
    this.playerID = playerID
    this.fleet = fleet
    this.currentShipIndex = 0
    this.placementDirection = 'horizontal'
  }

  togglePlacementDirection() {
    this.placementDirection =
      this.placementDirection === 'horizontal' ? 'vertical' : 'horizontal'
  }

  previewPlacement(startX, startY, getCellElement) {
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

      const cell = getCellElement(x, y)
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

  clearPreview(startX, startY, getCellElement) {
    const shipSize = this.fleet[this.currentShipIndex]
    const gridSize = this.dataService.getPlayerGrid(this.playerID).length

    for (let i = 0; i < shipSize; i++) {
      const x = startX + (this.placementDirection === 'horizontal' ? i : 0)
      const y = startY + (this.placementDirection === 'vertical' ? i : 0)

      if (x >= gridSize || y >= gridSize) {
        break
      }

      const cell = getCellElement(x, y)
      if (cell) {
        const cellStatus = this.dataService.getPlayerGrid(this.playerID)[x][y]
        cell.style.backgroundColor = this.getCellColor(cellStatus)
      }
    }
  }

  placeShip(startX, startY, renderGrid, renderControls, alertCallback) {
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
        renderGrid()
        renderControls()
      } else {
        alertCallback('All ships placed!')
      }
    } else {
      alertCallback('Invalid placement!')
    }
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
