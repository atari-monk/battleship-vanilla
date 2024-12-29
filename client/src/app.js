import {
  Client,
  PingService,
  IdService,
  ConnectService,
} from '/client_lib/src/index.js'

const client = new Client('http://localhost:3000', {
  cors: {
    origin: '*',
  },
})
client.initialize()
const socket = client.getSocket()

new PingService(socket, 'messages')
new ConnectService(socket, new IdService().getId())
