// CONTROLA TODO EL JOGO

class Game {
  constructor() {
    this.ctx = ctx;
    this.ready = false;
    this.players = [];
    this.isDragging = false;
    this.previousSelectedChip = null;
    this.boardPositions = []
  }

  getBoardPositions() {
    return this.boardPositions;
  }

  getPlayers() {
    return this.players;
  }

  getReady() {
    return this.ready;
  }

  getIsDraggin() {
    return this.isDragging;
  }

  getPreviusSelectedChip() {
    return this.previousSelectedChip;
  }

  setIsDragging(boolean) {
    this.isDragging = boolean;
  }

  setPreviusSelectedChip(Chip) {
    this.previousSelectedChip = Chip;
  }

  play() {
    this.turn();
  }


  addPlayers(player_1, player_2) {
    let p1 = new Player('Player 1', 1, player_1, true);
    let p2 = new Player('Player 2', 2, player_2, false);
    this.players.push(p1, p2);
  }

  removePlayers(){
    this.players = []
  }

  setTurn() {
    this.players[0].setIsPlaying(!this.players[0].getIsPlaying());
    this.players[1].setIsPlaying(!this.players[1].getIsPlaying());
  }

  checkWinner(columnPos, rowPos , connect) {
    let row = this.boardPositions[rowPos]
    let owner = this.boardPositions[rowPos][columnPos].getOwner();
    let diag = 1;
    if (this.checkHorizontal(row, columnPos, owner, connect)) {
      return [true, owner]
    }
    if (this.checkVertical(rowPos, columnPos, owner, connect)) {
      return [true, owner]
    }
    diag += this.checkDiagonal1(rowPos, columnPos, owner, connect) + this.checkDiagonal2(rowPos, columnPos, owner, connect)
    if (diag >= connect) {
      return [true, owner]
    }

  }

  checkDiagonal1(rowPos, columnPos, owner) {
    let row = rowPos;
    let col = columnPos;
    let diag = 0;
    while (col != this.boardPositions[row].length - 1 && row != 0) {
      row--;
      col++;
      if (this.boardPositions[row][col] != null && this.boardPositions[row][col].getOwner() == owner ) {
        diag++;
      }
    }

    row = rowPos;
    col = columnPos;
    while (row != this.boardPositions.length - 1 && col != 0) {
      row++
      col--
      if (this.boardPositions[row][col] != null && this.boardPositions[row][col].getOwner() == owner) {
        diag++;
      }
    }

    return diag 
  }

  checkDiagonal2(rowPos, columnPos, owner) {
    let row = rowPos;
    let col = columnPos;
    let diag = 0;
    while (row != 0 && col != 1) {
      row--;
      col--;
      if (this.boardPositions[row][col] != null && this.boardPositions[row][col].getOwner() == owner) {
        diag++;
      }
    }

    row = rowPos;
    col = columnPos;

    while (row != this.boardPositions.length - 1 && col != this.boardPositions[row].length - 1) {
      row++
      col++
      if (this.boardPositions[row][col] != null && this.boardPositions[row][col].getOwner() == owner) {
        diag++;
      }
    }

    return diag 
  }


  checkVertical(rowPos, columnPos, owner, connect) {
    let nulls = 0;
    let vert = 1;
    let aux;

    if (rowPos == this.boardPositions.length - 1) {
      nulls++;
      aux = rowPos - 1
    } else {
      aux = rowPos + 1
    }

    while (nulls < 2) {

      if (aux == this.boardPositions.length) {
        nulls++
        if (rowPos == 0) {
          return vert >= connect
        }
        aux = rowPos - 1
      }
      let chip = this.boardPositions[aux][columnPos]

      if (chip != null && chip.getOwner() == owner) {
        vert++;
      } else {
        return vert >= connect;
      }

      if (nulls == 0) {
        aux++
      } else {
        aux--
      }
    }

    return vert >= connect
  }

  checkHorizontal(row, pos ,owner, connect) {
    let nulls = 0;
    let aux = pos + 1;
    let hori = 1;
    while (nulls < 2) {
      if (row[aux] != null && row[aux].getOwner() == owner) {
        hori++;
      } else {
        nulls++;
        aux = pos ;
      }
      if (nulls == 0) {
        aux++
      } else {
        aux--;
      }
    }
    return hori >= connect
  }
}
