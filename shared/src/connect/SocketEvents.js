export const SocketEvents = {
  SET_FLEET: 'setFleet',
  TURN: 'turn',
  ATTACK: 'attack',
  ATTACK_RESULT: 'attackResult',
  SET_PLAYERS: 'setPlayers',
  TURN_END: 'turnEnd',
  Client: {
    PING: 'ping',
    CONNECT: 'connect',
    RECONNECT: 'reconnect',
    DISCONNECT: 'disconnect',
    REGISTER_PLAYER: 'registerPlayer',
  },
  Server: {
    CONNECTION: 'connection',
  },
}
