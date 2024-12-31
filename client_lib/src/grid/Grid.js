export class Grid {
  constructor(container) {
    this.container = container
    this.gridElement = null
    this.getCellColor = null // Placeholder for getCellColor function
  }

  // Initialize the grid with state and event handlers
  init(
    gridState,
    onCellMouseEnter,
    onCellMouseLeave,
    onCellClick,
    getCellColor
  ) {
    this.clearContainer()
    this.createGridElement(gridState)
    this.setCellColorFunction(getCellColor)
    this.populateGrid(
      gridState,
      onCellMouseEnter,
      onCellMouseLeave,
      onCellClick
    )
    this.container.appendChild(this.gridElement)
  }

  // Clears the container element before rendering a new grid
  clearContainer() {
    this.container.innerHTML = ''
  }

  // Creates the grid element with appropriate styles
  createGridElement(gridState) {
    this.gridElement = document.createElement('div')
    this.gridElement.classList.add('battleship-grid')
    this.gridElement.style.display = 'grid'
    this.gridElement.style.gridTemplateColumns = `repeat(${gridState.length}, 30px)`
    this.gridElement.style.gap = '0px'
  }

  // Sets the function to determine the color of a cell
  setCellColorFunction(getCellColor) {
    this.getCellColor = getCellColor
  }

  // Populates the grid with cells based on the grid state
  populateGrid(gridState, onCellMouseEnter, onCellMouseLeave, onCellClick) {
    gridState.forEach((row, x) => {
      row.forEach((cellStatus, y) => {
        const cell = this.createCell(x, y, cellStatus)
        this.addCellEventListeners(
          cell,
          x,
          y,
          onCellMouseEnter,
          onCellMouseLeave,
          onCellClick
        )
        this.gridElement.appendChild(cell)
      })
    })
  }

  // Creates a single cell element and applies styles
  createCell(x, y, cellStatus) {
    const cell = document.createElement('div')
    cell.classList.add('grid-cell')
    cell.dataset.x = x
    cell.dataset.y = y
    cell.style.width = '30px'
    cell.style.height = '30px'
    cell.style.border = '1px solid #ccc'
    cell.style.backgroundColor = this.getCellColor(cellStatus)
    return cell
  }

  // Adds event listeners to a cell for mouse interactions
  addCellEventListeners(
    cell,
    x,
    y,
    onCellMouseEnter,
    onCellMouseLeave,
    onCellClick
  ) {
    if (onCellMouseEnter) {
      cell.addEventListener('mouseenter', () => onCellMouseEnter(x, y))
    }
    if (onCellMouseLeave) {
      cell.addEventListener('mouseleave', () => onCellMouseLeave(x, y))
    }
    if (onCellClick) {
      cell.addEventListener('click', () => onCellClick(x, y))
    }
  }

  // Returns the cell element for a specific coordinate
  getCellElement(x, y) {
    return this.gridElement.querySelector(
      `.grid-cell[data-x="${x}"][data-y="${y}"]`
    )
  }
}
