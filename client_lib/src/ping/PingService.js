import { SocketEvents } from '/shared/src/index.js'

export class PingService {
  constructor(socket) {
    this.socket = socket
    this.pingDiv = this.createPingDiv()
    this.init()
  }

  createPingDiv() {
    const id = 'ping'
    let pingDiv = document.getElementById(id)
    if (!pingDiv) {
      pingDiv = document.createElement('div')
      pingDiv.id = id
      document.body.appendChild(pingDiv)
    }
    return pingDiv
  }

  init() {
    this.socket.on(SocketEvents.Client.PING, (message) =>
      this.handlePing(message)
    )
  }

  handlePing(message) {
    this.pingDiv.textContent = message
  }
}
