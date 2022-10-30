// PLAYER
class Player {
  constructor(name, id, character) {
    this.chips = [];
    this.name = name;
    this.id = id;
    this.character = character;
    this.isDragging = false;
    this.previousSelectedChip = null;
    this.init();
  }

  getName(){
    return this.name;
  }

  getChips(){
    return this.chips;
  }

  getId(){
    return this.id;
  }
  init() {
    this.createChips();
    this.onMouseDown();
    this.onMouseUp();
    this.onMouseMove();
  }

  // addChip(x, y, color){
  //   let chip = new Chip(x, y, color);
  //   this.chips.push(chip);
  // }

  createChips() {
    for (let i = 0; i < 21; i++) {
      if (this.id === 1) {
        let x = Math.round(Math.random() * canvas.width / 2 - 50);
        let y = Math.round(Math.random() * canvas.height / 2 - 50);
        let color = '#000000';
        let chip = new Chip(x, y, color);
        this.chips.push(chip);
      } else {
        let x = Math.round(Math.random() * (canvas.width / 2 - 400));
        let y = Math.round(Math.random() * (canvas.height / 2 - 50));
        let color = 'green';
        let chip = new Chip(x, y, color);
        this.chips.push(chip);
      }
    }
    this.drawChips();
  }

  drawChips() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < this.chips.length; i++) {
      this.chips[i].draw();
    }
  }

  findClicked(clickX, clickY) {
    for (let i = this.chips.length - 1; i >= 0; i--) {
      let chip = this.chips[i];
      if (chip.isClicked(clickX, clickY)) {
        return chip;
      }
    }
  }

  onMouseUp() {
    canvas.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
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

        clickedChip.isSelected = true;

        this.isDragging = true;

        clickedChip.draw();
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
