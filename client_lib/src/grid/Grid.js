export class Grid {
  constructor(container) {
    this.container = container
    this.gridElement = null
    this.getCellColor = null // Placeholder for getCellColor function
  }

  init(
    gridState,
    onCellMouseEnter,
    onCellMouseLeave,
    onCellClick,
    getCellColor
  ) {
    this.container.innerHTML = ''
    this.gridElement = document.createElement('div')
    this.gridElement.classList.add('battleship-grid')
    this.gridElement.style.display = 'grid'
    this.gridElement.style.gridTemplateColumns = `repeat(${gridState.length}, 30px)`
    this.gridElement.style.gap = '0px'

    // Set the getCellColor function
    this.getCellColor = getCellColor

    gridState.forEach((row, x) => {
      row.forEach((cellStatus, y) => {
        const cell = document.createElement('div')
        cell.classList.add('grid-cell')
        cell.dataset.x = x
        cell.dataset.y = y
        cell.style.width = '30px'
        cell.style.height = '30px'
        cell.style.border = '1px solid #ccc'
        if (cellStatus === 'hit') console.log(gridState)
        cell.style.backgroundColor = this.getCellColor(cellStatus)

        if (onCellMouseEnter) {
          cell.addEventListener('mouseenter', () => onCellMouseEnter(x, y))
        }
        if (onCellMouseLeave) {
          cell.addEventListener('mouseleave', () => onCellMouseLeave(x, y))
        }
        if (onCellClick) {
          cell.addEventListener('click', () => onCellClick(x, y))
        }

        this.gridElement.appendChild(cell)
      })
    })

    this.container.appendChild(this.gridElement)
  }

  getCellElement(x, y) {
    return this.gridElement.querySelector(
      `.grid-cell[data-x="${x}"][data-y="${y}"]`
    )
  }
}
