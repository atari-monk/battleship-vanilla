import { showMessage, messageType } from '../message/message.js'

export class Client {
  constructor(url, options) {
    this.url = url
    this.options = options
    this.socket = null
  }

  initialize() {
    try {
      this.socket = io(this.url, this.options)

      this.socket.on('connect_error', (err) => {
        showMessage(
          'Cant connect to server, game is broken!',
          messageType.error
        )
        this.socket = null
      })
    } catch (error) {
      console.error('Failed to initialize socket')
      this.socket = null
    }
  }

  getSocket() {
    if (!this.socket) {
      throw new Error(
        'Socket has not been initialized. Call initialize() first.'
      )
    }
    return this.socket
  }
}
