export class Client {
  constructor(url, options) {
    this.url = url
    this.options = options
    this.socket = null
  }

  initialize() {
    this.socket = io(this.url, this.options)
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
