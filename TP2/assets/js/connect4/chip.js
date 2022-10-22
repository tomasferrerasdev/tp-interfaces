// CONTROLA LAS FICHAS

class Chip {
  constructor() {
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = 'red';
    this.ctx.beginPath();
    this.ctx.arc(
      Math.round(Math.random() * canvasWidth),
      Math.round(Math.random() * canvasHeight),
      15,
      0,
      2 * Math.PI
    );
    this.ctx.fill();
    this.ctx.closePath();
  }
}

//21 fichas
