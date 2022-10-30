let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let game = new Game();
game.play();
