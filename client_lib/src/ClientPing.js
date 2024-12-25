export class ClientPing {
  constructor(socket) {
    this.socket = socket
    this.pingDiv = this.createPingDiv()
    this.init()
  }

  createPingDiv() {
    let pingDiv = document.getElementById('ping')
    if (!pingDiv) {
      pingDiv = document.createElement('div')
      pingDiv.id = 'ping'
      document.body.appendChild(pingDiv)
    }
    return pingDiv
  }

  init() {
    this.socket.on('ping', (message) => this.handlePing(message))
  }

  handlePing(message) {
    this.pingDiv.textContent = message
  }
}
