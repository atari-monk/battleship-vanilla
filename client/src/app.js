import { DataService } from '/shared/src/index.js'
import {
  Client,
  PingService,
  IdService,
  ConnectService,
  GridComponent,
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
const gridComponent = new GridComponent(dataService, playerId, [5, 4, 3, 3, 2])
gridComponent.init(document.getElementById('battleship-container'))
