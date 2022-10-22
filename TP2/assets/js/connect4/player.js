// PLAYER
class Player {
  constructor(name, id, character) {
    this.name = name;
    this.id = id;
    this.character = character;
    this.chip = [];
    this.init();
  }

  init() {
    this.createChips();
  }

  createChips() {
    for (let i = 0; i < 21; i++) {
      let playerChips = new Chip();
      playerChips.draw();
      this.chip.push(playerChips);
    }
  }
}
