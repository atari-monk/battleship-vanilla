export class IdService {
  constructor() {
    this.idKey = 'battleship_vanilla_id'
    this.id = this.getOrGenerateId()
  }

  getOrGenerateId() {
    let id = localStorage.getItem(this.idKey)
    if (!id) {
      id = this.generateId()
    }
    return id
  }

  generateId() {
    const id = this.generateUniqueId()
    localStorage.setItem(this.idKey, id)
    return id
  }

  generateUniqueId() {
    return Math.random().toString(36).slice(2, 9)
  }

  getId() {
    return this.id
  }
}
