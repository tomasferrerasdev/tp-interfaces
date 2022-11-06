// CONTROLA LAS FICHAS

class Chip {
  constructor(x, y, img, owner, turn) {
    this.originalX = x;
    this.originalY = y;
    this.x = x;
    this.y = y
    this.radius = 30;
    this.isSelected = false;
    this.turn = turn;
    this.owner = owner;

    this.urlimage = img;
    this.image = new Image();

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
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

      if (this.image.src === "") {
          this.image.src = this.urlimage;
          let loadImg = function () {
              this.context.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius / .5, this.radius / .5);
          }
          this.image.onload = loadImg.bind(this);
      } else {
          this.context.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius / .5, this.radius / .5);
      }
      
      this.context.closePath();
}


  isClicked(x, y) {
    let _x = this.x - x;
    let _y = this.y - y;

    return Math.sqrt(_x * _x + _y * _y) <= this.radius;
  }
}

//21 fichas
