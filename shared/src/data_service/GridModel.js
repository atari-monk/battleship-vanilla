export class GridModel {
  constructor(size = 10) {
    this.size = size
    this.cells = Array(size)
      .fill(null)
      .map(() =>
        Array(size)
          .fill(null)
          .map(() => ({ status: 'empty' }))
      )
  }

  isPlacementValid(startX, startY, length, direction) {
    for (let i = 0; i < length; i++) {
      const x = startX + (direction === 'horizontal' ? i : 0)
      const y = startY + (direction === 'vertical' ? i : 0)

      if (x >= this.size || y >= this.size) {
        return false
      }

      if (this.cells[x][y].status !== 'empty') {
        return false
      }
    }
    return true
  }

  placeShip(startX, startY, length, direction) {
    if (direction !== 'horizontal' && direction !== 'vertical') {
      throw new Error("Invalid direction. Use 'horizontal' or 'vertical'.")
    }

    if (direction === 'horizontal' && startX + length > this.size) {
      throw new Error('Ship cannot be placed horizontally, out of bounds.')
    }
    if (direction === 'vertical' && startY + length > this.size) {
      throw new Error('Ship cannot be placed vertically, out of bounds.')
    }

    for (let i = 0; i < length; i++) {
      const x = startX + (direction === 'horizontal' ? i : 0)
      const y = startY + (direction === 'vertical' ? i : 0)

      this.cells[x][y].status = 'ship'
    }
  }

  attack(x, y) {
    if (x >= this.size || y >= this.size) {
      throw new Error('Attack out of bounds.')
    }

    const cell = this.cells[x][y]
    if (cell.status === 'hit' || cell.status === 'miss') {
      throw new Error('Cell already attacked.')
    }

    if (cell.status === 'ship') {
      cell.status = 'hit'
      return 'hit'
    } else {
      cell.status = 'miss'
      return 'miss'
    }
  }

  getGridState() {
    return this.cells.map((row) => row.map((cell) => cell.status))
  }
}
