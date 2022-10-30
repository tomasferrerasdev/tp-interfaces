// CONTROLA TODO EL JOGO

class Game {
  constructor() {
    this.ctx = ctx;
    this.ready = false;
    this.players = [];
    this.isDragging = false;
    this.previousSelectedChip = null;
    this.init();
  }

  getPlayers(){
    return this.players;
  }

  getReady(){
    return this.ready;
  }

  getIsDraggin(){
    return this.isDragging;
  }

  getPreviusSelectedChip(){
    return this.previousSelectedChip;
  }
  
  setIsDragging(boolean){
    this.isDragging = boolean;
  }

  setPreviusSelectedChip(Chip){
    this.previousSelectedChip = Chip;
  }

  play() {
    this.turn();
  }

  init() {
    this.addPlayers();
  }

  addPlayers() {
    let p1 = new Player('PUTO', 1, 'QUIROGA', true);
    let p2 = new Player('HOMO', 2, 'POSCO', false);
    this.players.push(p1, p2);
  }

  turn() {
    setTimeout(() => {
      this.players[0].setIsPlaying(!this.players[0].getIsPlaying());
      this.players[1].setIsPlaying(!this.players[1].getIsPlaying());
      this.turn();
    }, 300000);
  }

 
}
