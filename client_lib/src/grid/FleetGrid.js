export class FleetGrid {
  constructor(dataService, playerID, grid, fleetPlacement) {
    this.dataService = dataService
    this.playerID = playerID
    this.fleetPlacement = fleetPlacement
    this.grid = grid
    this.container = null
  }

  init(container) {
    this.container = container
    this.container.innerHTML = ''
    this.renderGrid()
    this.renderControls()
  }

  renderGrid() {
    const gridState = this.getPlayerGridState()
    this.grid.init(
      gridState,
      this.getPreviewPlacementHandler(),
      this.getClearPreviewHandler(),
      this.getPlaceShipHandler(),
      this.getCellColorHandler()
    )
  }

  getPlayerGridState() {
    return this.dataService.getPlayerGrid(this.playerID)
  }

  getPreviewPlacementHandler() {
    return (x, y) =>
      this.fleetPlacement.previewPlacement(x, y, this.getCellElementHandler())
  }

  getClearPreviewHandler() {
    return (x, y) =>
      this.fleetPlacement.clearPreview(x, y, this.getCellElementHandler())
  }

  getPlaceShipHandler() {
    return (x, y) =>
      this.fleetPlacement.placeShip(
        x,
        y,
        this.renderGrid.bind(this),
        this.renderControls.bind(this),
        this.logMessage.bind(this)
      )
  }

  getCellColorHandler() {
    return (cellStatus) => this.getCellColor(cellStatus)
  }

  getCellElementHandler() {
    return (x, y) => this.grid.getCellElement(x, y)
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

  renderControls() {
    const controlsElement = this.createControlsElement()
    this.container.appendChild(controlsElement)
  }

  createControlsElement() {
    const controlsElement = document.createElement('div')
    controlsElement.classList.add('battleship-controls')

    const directionButton = this.createDirectionButton()
    const infoElement = this.createInfoElement()

    controlsElement.appendChild(directionButton)
    controlsElement.appendChild(infoElement)

    return controlsElement
  }

  createDirectionButton() {
    const button = document.createElement('button')
    button.textContent = `Direction: ${this.fleetPlacement.placementDirection}`
    button.addEventListener('click', () => this.toggleDirection(button))
    return button
  }

  toggleDirection(button) {
    this.fleetPlacement.togglePlacementDirection()
    button.textContent = `Direction: ${this.fleetPlacement.placementDirection}`
  }

  createInfoElement() {
    const infoElement = document.createElement('p')
    const currentShipSize =
      this.fleetPlacement.fleet[this.fleetPlacement.currentShipIndex]
    infoElement.textContent = `Place ship of size: ${currentShipSize}`
    return infoElement
  }

  logMessage(message) {
    console.log(message)
  }
}
