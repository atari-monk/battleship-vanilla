import { SocketClient, ClientPing } from '/shared/src/index.js'

const client = new SocketClient('http://localhost:3000', {
  cors: {
    origin: '*',
  },
})
client.initialize()
const socket = client.getSocket()
new ClientPing(socket, 'messages')
