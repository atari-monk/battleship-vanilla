import { DataService } from '../../shared/src/index.js'
import {
  Client,
  IdService,
  ConnectService,
  Grid,
  Fleet,
  FleetGrid,
  Battle,
  BattleGrid,
  FleetService,
  BattleService,
} from '../../client_lib/src/index.js'

const client = new Client('http://localhost:3000', {
  cors: {
    origin: '*',
  },
})
client.initialize()
const socket = client.getSocket()

const playerId = new IdService().getId()

const dataService = new DataService()

new ConnectService(socket, playerId, dataService)

dataService.addPlayer(playerId, socket.id)

const container = document.getElementById('battleship-container')
const grid = new Grid(container)

const fleetService = new FleetService(socket, playerId, dataService)
const fleet = new Fleet(dataService, playerId, [5, 4, 3, 3, 2], fleetService)
const fleetGrid = new FleetGrid(dataService, playerId, grid, fleet)
fleetGrid.init(container)

const container2 = document.getElementById('battleship-container-2')
const grid2 = new Grid(container2)

const battle = new Battle(dataService, playerId)
const battleGrid = new BattleGrid(dataService, playerId, grid2, battle)
const battleService = new BattleService(
  socket,
  playerId,
  dataService,
  battleGrid.refresh
)
battle.setBattleService(battleService)
battleGrid.init(container2)
