let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;





let game = new Game();
let players = game.getPlayers();
init();
game.play();

canvas.addEventListener('mouseup', (e) => {
    mouseUp();
})
canvas.addEventListener('mousedown', (e) => {
    mouseDown(e);
})
canvas.addEventListener('mousemove', (e) => {
    dragChip(e);
})


function init() {
    createChips();
}


function createChips() {
    for (let j = 0; j < players.length; j++) {
        for (let i = 0; i < 21; i++) {
            if (players[j].getId() === 1) {
                let x = Math.floor(Math.random() * (160 - 10 + 1)) + 10;
                let y = Math.floor(Math.random() * (310 - 10 + 1)) + 10;

                let color = '#000000';
                let chip = new Chip(
                    x,
                    y,
                    color,
                    players[j].getId(),
                    players[j].getIsPlaying()
                );

                players[j].addChip(chip);
            } else {
                let x = Math.floor(Math.random() * (1180 - 1050 + 1)) + 1050;
                let y = Math.floor(Math.random() * (310 - 10 + 1)) + 10;

                let color = 'green';
                let chip = new Chip(
                    x,
                    y,
                    color,
                    players[j].getId(),
                    players[j].getIsPlaying()
                );
                players[j].addChip(chip);
            }
        }
        drawChips();
    }
}

function drawChips() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let j = 0; j < players.length; j++) {
        let chips = players[j].getChips();
        for (let i = 0; i < chips.length; i++) {
            chips[i].draw();
        }
    }
}

function mouseUp(){
    game.setIsDragging(false);
}

function mouseDown(e){
    let clickX = e.pageX - canvas.offsetLeft;
    let clickY = e.pageY - canvas.offsetTop;
    let previousSelectedChip = game.getPreviusSelectedChip();


    let clickedChip = findClicked(clickX, clickY);
    console.log(clickX, clickY);


    if (clickedChip != null) {
        if (previousSelectedChip != null){

            previousSelectedChip.setIsSelected(false)
        }
        game.setPreviusSelectedChip(clickedChip)

        for (let p = 0; p < players.length; p++) {
            if (players[p].getIsPlaying() == true) {
                if (clickedChip.getOwner() === players[p].getId()) {
                    if (clickedChip.getTurn()) {
                        clickedChip.setIsSelected(true);
                        game.setIsDragging(true);
                        console.log(clickedChip)
                    }
                }
            }
        }
        return;
    }
}

        


function findClicked(clickX, clickY) {
    for (let p = 0; p < players.length; p++) {
        let chips = players[p].getChips();
        for (let i = chips.length - 1; i >= 0; i--) {
            let chip = chips[i];
            if (chip.isClicked(clickX, clickY)) {
                return chip;
            }
        }
    }
}


  

  function dragChip(e) {
    if (game.getIsDraggin() == true) {
      if (game.getPreviusSelectedChip() != null) {
        let x = e.pageX - canvas.offsetLeft;
        let y = e.pageY - canvas.offsetTop;
        game.getPreviusSelectedChip().setX(x);
        game.getPreviusSelectedChip().setY(y);

        drawChips();
      }
    }
  }
