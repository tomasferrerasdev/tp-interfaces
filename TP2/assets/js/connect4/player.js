// PLAYER
class Player {
  constructor(name, id, character, isPlaying) {
    this.chips = [];
    this.name = name;
    this.id = id;
    this.character = character;
    this.isPlaying = isPlaying;
  }

  getCharacter(){
    return this.character;
  }

  getId() {
    return this.id;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  getChips(){
    return this.chips;
  }

  setIsPlaying(boolean) {
    this.isPlaying = boolean;
    for (let i = 0; i < this.chips.length; i++) {
      this.chips[i].setTurn(boolean);
    }
  }

  addChip(chip) {
    this.chips.push(chip);
  }
}
