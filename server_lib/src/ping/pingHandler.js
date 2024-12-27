import { SocketEvents } from 'shared'

export function pingHandler(socket) {
  const sendPing = () => {
    socket.emit(
      SocketEvents.Client.PING,
      `Ping at ${new Date().toLocaleTimeString()}`
    )
  }

  sendPing()

  setInterval(sendPing, 60000)
}
