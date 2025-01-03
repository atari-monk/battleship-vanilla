export const SocketEvents = {
  Client: {
    PING: 'ping',
    CONNECT: 'connect',
    RECONNECT: 'reconnect',
    DISCONNECT: 'disconnect',
    REGISTER_PLAYER: 'registerPlayer',
    SET_FLEET: 'setFleet',
  },
  Server: {
    CONNECTION: 'connection',
    SET_FLEET: 'setFleet',
  },
}
