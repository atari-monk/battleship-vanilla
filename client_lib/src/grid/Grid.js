export class Grid {
  constructor(container) {
    this.container = container
    this.gridElement = null
    this.getCellColor = null
  }

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

  clearContainer() {
    this.container.innerHTML = ''
  }

  createGridElement(gridState) {
    this.gridElement = document.createElement('div')
    this.gridElement.classList.add('battleship-grid')
    this.gridElement.style.display = 'grid'
    this.gridElement.style.gridTemplateColumns = `repeat(${gridState.length}, 30px)`
    this.gridElement.style.gap = '0px'
  }

  setCellColorFunction(getCellColor) {
    this.getCellColor = getCellColor
  }

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

  getCellElement(x, y) {
    return this.gridElement.querySelector(
      `.grid-cell[data-x="${x}"][data-y="${y}"]`
    )
  }
}
