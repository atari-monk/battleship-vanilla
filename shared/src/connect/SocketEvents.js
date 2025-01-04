export const SocketEvents = {
  ATTACK: 'attack',
  ATTACK_RESULT: 'attackResult',
  Client: {
    PING: 'ping',
    CONNECT: 'connect',
    RECONNECT: 'reconnect',
    DISCONNECT: 'disconnect',
    REGISTER_PLAYER: 'registerPlayer',
    SET_FLEET: 'setFleet',
    TURN: 'turn',
  },
  Server: {
    CONNECTION: 'connection',
    SET_FLEET: 'setFleet',
    TURN: 'turn',
  },
}
