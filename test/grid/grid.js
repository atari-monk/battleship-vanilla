import { Grid } from '../../client_lib/src/index.js'

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

console.debug('gridData', gridData)

gridGUI.init(
  gridData,
  (x, y) => {},
  (x, y) => {},
  (x, y) => {},
  (cellValue) => {
    switch (cellValue) {
      case 'empty':
        return 'pink'
      default:
        return 'white'
    }
  }
)
