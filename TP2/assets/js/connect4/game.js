// CONTROLA TODO EL JOGO

class Game {
  constructor() {
    this.ctx = ctx;
    this.ready = false;
    this.players = [];
    this.isDragging = false;
    this.previousSelectedChip = null;
    this.boardPositions = []
    this.init();
  }

  getBoardPositions(){
    return this.boardPositions;
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
      this.setTurn()
      console.log("change")
      this.turn();
    }, 3000000000000);
  }

  setTurn(){
    this.players[0].setIsPlaying(!this.players[0].getIsPlaying());
    this.players[1].setIsPlaying(!this.players[1].getIsPlaying());
  }

  checkWinner(columnPos, rowPos){
    let row = this.boardPositions[rowPos]
    let i = 0;
      if(this.checkHorizontal(row,columnPos)){
        console.log("winner horizontal")
      }else if(this.checkVertical(rowPos,columnPos)){
        console.log("winner vertical")
      }
      
      
    
  }

  checkVertical(rowPos, columnPos){
    let nulls = 0;
    let vert = 1;
    let aux;
    
    if(rowPos == this.boardPositions.length-1){
      nulls++;
      aux = rowPos-1
    }else{
      aux = rowPos+1
    }

    while(nulls < 2){
      

      if(aux == this.boardPositions.length-1){
        nulls++
        if(rowPos == 0){
          return vert >= 4
        }
        aux = rowPos-1
      }
      let circle = this.boardPositions[aux][columnPos]
      
      if(circle == null){
        nulls++
      }else{
        vert++;
      }

      if(nulls == 0){
        aux++
      }else{
        aux--
      }
    }

    return vert >= 4
  }

  checkHorizontal(row, pos){
    let nulls = 0;
    let aux = pos+1;
    let hori = 1;
    while(nulls <= 2){
      if(row[aux] == null){
        nulls++;
        aux = pos-1
      }else{
        hori++;
      }
      if(nulls == 0){
        aux++
      }else{
        aux--;
      }
    }
    return hori >= 4
}
}
