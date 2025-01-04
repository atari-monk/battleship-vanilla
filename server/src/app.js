import { DataService } from 'shared'
import {
  GameServer,
  ConnectService,
  pingHandler,
  FleetService,
  BattleService,
} from 'server_lib'

const server = new GameServer(3000)

server.registerHandler((socket) => {
  pingHandler(socket)
})
const dataService = new DataService()
new ConnectService(server.io, dataService)
new FleetService(server.io, dataService)
new BattleService(server.io, dataService)

server.start()
