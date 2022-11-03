// CONTROLA LAS FICHAS

class Chip {
  constructor(x, y, img, owner, turn) {
    this.originalX = x;
    this.originalY = y;
    this.x = x;
    this.y = y
    this.radius = 20;
    this.img = img;
    this.isSelected = false;
    this.turn = turn;
    this.owner = owner;

    this.context = ctx;
  }

  getOwner() {
    return this.owner;
  }

  getTurn() {
    return this.turn;
  }

  getIsSelected(){
    return this.isSelected;
  }

  setIsSelected(boolean){
    this.isSelected = boolean;
  }

  setTurn(boolean) {
    this.turn = boolean
  }
  
  setX(x){
    this.x = x
  }

  setY(y){
    this.y = y;
  }

  resetPosition(){
    this.setX(this.originalX);
    this.setY(this.originalY);
  }

  draw() {
    console.log(this.img)
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    let image = new Image()
    image.src = this.img;
      // create pattern
      let ptrn = this.context.createPattern(image,'repeat');
      this.context.fillStyle = ptrn;
    this.context.strokeStyle = '#01FE78';

    if (this.isSelected) {
      this.context.lineWidth = 2.5;
    } else {
      this.context.lineWidth = 1;
    }

    this.context.fill();
    this.context.stroke();
  }

  isClicked(x, y) {
    let _x = this.x - x;
    let _y = this.y - y;

    return Math.sqrt(_x * _x + _y * _y) <= this.radius;
  }
}

//21 fichas
