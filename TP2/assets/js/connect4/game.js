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

  play() {
    this.turn();
  }

  init() {
    this.addPlayers();
    this.createChips();
    this.onMouseDown();
    this.onMouseUp();
    this.onMouseMove();
  }

  addPlayers() {
    let p1 = new Player('PUTO', 1, 'QUIROGA', true);
    let p2 = new Player('HOMO', 2, 'POSCO', false);
    this.players.push(p1, p2);
  }

  createChips() {
    for (let j = 0; j < this.players.length; j++) {
      for (let i = 0; i < 21; i++) {
        if (this.players[j].getId() === 1) {
          let x = Math.floor(Math.random() * (160 - 10 + 1)) + 10;
          let y = Math.floor(Math.random() * (310 - 10 + 1)) + 10;

          let color = '#000000';
          let chip = new Chip(
            x,
            y,
            color,
            this.players[j].getId(),
            this.players[j].getIsPlaying()
          );

          this.players[j].addChip(chip);
        } else {
          let x = Math.floor(Math.random() * (1180 - 1050 + 1)) + 1050;
          let y = Math.floor(Math.random() * (310 - 10 + 1)) + 10;

          let color = 'green';
          let chip = new Chip(
            x,
            y,
            color,
            this.players[j].getId(),
            this.players[j].getIsPlaying()
          );
          this.players[j].addChip(chip);
        }
      }
      this.drawChips();
    }
  }

  turn() {
    setTimeout(() => {
      this.players[0].setIsPlaying(!this.players[0].getIsPlaying());
      this.players[1].setIsPlaying(!this.players[1].getIsPlaying());
      this.turn();
    }, 300000);
  }

  findClicked(clickX, clickY) {
    for (let p = 0; p < this.players.length; p++) {
      for (let i = this.players[p].chips.length - 1; i >= 0; i--) {
        let chip = this.players[p].chips[i];
        if (chip.isClicked(clickX, clickY)) {
          return chip;
        }
      }
    }
  }

  onMouseUp() {
    canvas.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
  }

  drawChips() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let j = 0; j < this.players.length; j++) {
      for (let i = 0; i < this.players[j].chips.length; i++) {
        this.players[j].chips[i].draw();
      }
    }
  }

  onMouseDown() {
    canvas.addEventListener('mousedown', (e) => {
      let clickX = e.pageX - canvas.offsetLeft;
      let clickY = e.pageY - canvas.offsetTop;

      let clickedChip = this.findClicked(clickX, clickY);

      if (clickedChip != null) {
        if (this.previousSelectedChip != null)
          this.previousSelectedChip.isSelected = false;
        this.previousSelectedChip = clickedChip;

        for (let p = 0; p < this.players.length; p++) {
          if (this.players[p].isPlaying == true) {
            if (clickedChip.getOwner() === this.players[p].getId()) {
              if (clickedChip.getTurn()) {
                clickedChip.isSelected = true;
                this.isDragging = true;
              }
            }
          }
        }

        return;
      }
    });
  }

  onMouseMove() {
    canvas.addEventListener('mousemove', (e) => {
      this.dragChip(e);
    });
  }

  dragChip(e) {
    if (this.isDragging == true) {
      if (this.previousSelectedChip != null) {
        let x = e.pageX - canvas.offsetLeft;
        let y = e.pageY - canvas.offsetTop;

        this.previousSelectedChip.x = x;
        this.previousSelectedChip.y = y;

        this.drawChips();
      }
    }
  }
}
