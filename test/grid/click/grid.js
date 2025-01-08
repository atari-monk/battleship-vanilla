import { Grid } from '../../../client_lib/src/index.js'

const container = document.getElementById('battleship-container')
const gridGUI = new Grid(container)

const size = 10
const gridData = Array(size)
  .fill(null)
  .map(() =>
    Array(size)
      .fill(null)
      .map(() => 'empty')
  )

console.log('Test to display grid.')
console.log('Data format of grid:', gridData)

function renderGrid() {
  gridGUI.init(
    gridData,
    (x, y) => {},
    (x, y) => {},
    (x, y) => {
      gridData[x][y] = 'click'
      renderGrid()
    },
    (cellValue) => {
      switch (cellValue) {
        case 'click':
          return 'red'
        case 'empty':
          return 'pink'
        default:
          return 'white'
      }
    }
  )
}

renderGrid()
