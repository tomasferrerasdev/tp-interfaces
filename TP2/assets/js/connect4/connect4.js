let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

drawBoxes();

function drawBoxes() {
  let x = canvas.offsetLeft;
  let y = canvas.offsetTop;

  ctx.beginPath();
  ctx.lineWidth = '6';
  ctx.strokeStyle = 'red';
  ctx.rect(0, 0, 200, 200);
  ctx.stroke();
  console.log(x, y);
}

let game = new Game();
game.play();
