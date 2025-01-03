export class Fleet {
  constructor(dataService, playerID, fleet, fleetService) {
    this.dataService = dataService
    this.fleetService = fleetService
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
    const isValidPlacement = this.dataService.isPlacementValid(
      this.playerID,
      startX,
      startY,
      shipSize,
      this.placementDirection
    )

    for (let i = 0; i < shipSize; i++) {
      const [x, y] = this.getCoordinates(startX, startY, i)

      if (x >= gridSize || y >= gridSize) break

      const cell = getCellElement(x, y)
      if (cell) {
        const cellStatus = this.dataService.getPlayerGrid(this.playerID)[x][y]
        cell.style.backgroundColor = this.getCellBackgroundColor(
          cellStatus,
          isValidPlacement
        )
      }
    }
  }

  clearPreview(startX, startY, getCellElement) {
    const shipSize = this.fleet[this.currentShipIndex]
    const gridSize = this.dataService.getPlayerGrid(this.playerID).length
    for (let i = 0; i < shipSize; i++) {
      const [x, y] = this.getCoordinates(startX, startY, i)
      if (x >= gridSize || y >= gridSize) break
      const cell = getCellElement(x, y)
      if (cell) {
        const cellStatus = this.dataService.getPlayerGrid(this.playerID)[x][y]
        cell.style.backgroundColor = this.getCellColor(cellStatus)
      }
    }
  }

  placeShip(startX, startY, renderGrid, renderControls, messageCallback) {
    const shipSize = this.fleet[this.currentShipIndex]
    const isValidPlacement = this.dataService.isPlacementValid(
      this.playerID,
      startX,
      startY,
      shipSize,
      this.placementDirection
    )

    if (isValidPlacement) {
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
        messageCallback('All ships placed!')
        this.fleetService.emitSetFleet()
      }
    } else {
      messageCallback('Invalid placement!')
    }
  }

  getCellBackgroundColor(cellStatus, isValidPlacement) {
    if (cellStatus === 'ship') return 'blue'
    return isValidPlacement ? 'green' : 'red'
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

  getCoordinates(startX, startY, offset) {
    const x = startX + (this.placementDirection === 'horizontal' ? offset : 0)
    const y = startY + (this.placementDirection === 'vertical' ? offset : 0)
    return [x, y]
  }
}
