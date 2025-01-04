import { GridModel } from './GridModel.js'

export class DataModel {
  constructor(playerID, socketID, gridSize = 10) {
    this.playerID = playerID
    this.socketID = socketID
    this.grid = new GridModel(gridSize)
    this.isFleetSet = false
    this.isYourTurn = false
  }
}
