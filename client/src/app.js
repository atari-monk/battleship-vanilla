import { DataService } from '/shared/src/index.js'
import {
  Client,
  PingService,
  IdService,
  ConnectService,
  Grid,
  Fleet,
  FleetGrid,
  Battle,
  BattleGrid,
  FleetService,
} from '/client_lib/src/index.js'

const client = new Client('http://localhost:3000', {
  cors: {
    origin: '*',
  },
})
client.initialize()
const socket = client.getSocket()

new PingService(socket, 'messages')
const playerId = new IdService().getId()
new ConnectService(socket, playerId)

const dataService = new DataService()
dataService.addPlayer(playerId, socket.id)

const container = document.getElementById('battleship-container')
const grid = new Grid(container)

const fleetService = new FleetService(socket, playerId, dataService)
const fleet = new Fleet(dataService, playerId, [5, 4, 3, 3, 2], fleetService)
const fleetGrid = new FleetGrid(dataService, playerId, grid, fleet)
fleetGrid.init(container)

const container2 = document.getElementById('battleship-container-2')
const grid2 = new Grid(container2)

const battle = new Battle(dataService, playerId, playerId)
const battleGrid = new BattleGrid(dataService, playerId, grid2, battle)
battleGrid.init(container2)
