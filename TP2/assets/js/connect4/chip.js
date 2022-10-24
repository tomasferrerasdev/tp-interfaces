// CONTROLA LAS FICHAS

class Chip {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.color = color;
    this.isSelected = false;

    this.context = ctx;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fillStyle = this.color;
    this.context.strokeStyle = '#7a470f';

    if (this.isSelected) {
      this.context.lineWidth = 5;
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
