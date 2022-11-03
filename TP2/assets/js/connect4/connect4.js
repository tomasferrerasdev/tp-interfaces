let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d')
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;


let img = document.getElementById('connect4-img');
let arrow = document.getElementById('arrow');
let game = new Game();
let board = [];
let squarePos = [];
let players = game.getPlayers();
let boardPositions = game.getBoardPositions()

let form = document.querySelector('form')

let formData = document.querySelector('form')
.addEventListener('submit', e => {
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    startGame(data)
})



game.play();

canvas.addEventListener('mouseup', (e) => {
    mouseUp(e);
})
canvas.addEventListener('mousedown', (e) => {
    mouseDown(e);
})
canvas.addEventListener('mousemove', (e) => {
    dragChip(e);
})

function startGame(data) {
    init(data)
}

function init(data) {
    console.log(data)
    form.style.display = 'none'
    chargueBoard();
    createChips();
    drawBoard();
}

function chargueBoard(){
    for (let i = 0; i < 6; i++) {
        let row = []
        for (let j = 0; j < 7; j++) {
            row.push(null)
        }
        boardPositions.push(row);    
    }
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

function drawBoard(){
    squarePos = [];
    let pos = canvas.width/2 - 420/2 ;
    let posy= canvas.height/2 - 360/2;
    for (let i = 0; i < boardPositions.length; i++) {
        let row = boardPositions[i]
        for (let j = 0; j < row.length; j++) {
            if(row[j] != null){
                row[j].setX((pos + j*61)+ (60/2) )
                row[j].setY((posy + i*61)+ (60/2))
            }
            ctx.drawImage(img,pos + j*61,posy + i*61, 60 ,60)
            
            if(i == 0){
                let throwPos = {
                    x: pos + j*61,
                    y: posy - 61,
                    w : 60,
                    h : 60
                }
                
                squarePos.push(throwPos)

                ctx.drawImage(arrow,pos + j*61,posy - 61, 60 ,60)
            }
        }
    }
    
  
}
    
    


function drawChips() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    for (let j = 0; j < players.length; j++) {
        let chips = players[j].getChips();
        for (let i = 0; i < chips.length; i++) {
            chips[i].draw();
        }
    }
}

function isDropped(x,y){
    for (let i = 0; i < squarePos.length; i++) {
        if(!(x < squarePos[i].x || x > squarePos[i].x + squarePos[i].w || y < squarePos[i].h || y > squarePos[i].y + squarePos[i].h)){
            return i
        }
    }
    return -1;
}

function mouseUp(e) {
    if(game.getIsDraggin()){
        let x = e.pageX - canvas.offsetLeft;
        let y = e.pageY - canvas.offsetTop;
        let columnPos = isDropped(x,y)
        if(columnPos >= 0){
            let rowPos = checkPos(columnPos)
            addChip(rowPos, columnPos)
            drawChips();
            game.setTurn();
            game.checkWinner(columnPos, rowPos)
            
        }else{
            game.getPreviusSelectedChip().resetPosition();
            drawChips();
        }
    }


    game.setIsDragging(false)
    
}

function addChip(rowPos, columnPos){
    let row = boardPositions[rowPos]
    row[columnPos] = game.getPreviusSelectedChip();
    console.log(row)
}

function checkPos(pos){
    let i;
    for (let index = 0; index < boardPositions.length; index++) {
       let aux = boardPositions[index]
        for (let j = 0; j < aux.length; j++) {
            if(j == pos && aux[j] != null){
                return index-1
            }
            
        }
        i = index
    }
    return i;
}

function mouseDown(e) {
    let clickX = e.pageX - canvas.offsetLeft;
    let clickY = e.pageY - canvas.offsetTop;
    let previousSelectedChip = game.getPreviusSelectedChip();
    let clickedChip = findClicked(clickX, clickY);
    if (clickedChip != null) {
        if (clickedChip.getTurn()) {
        if (previousSelectedChip != null) {
            previousSelectedChip.setIsSelected(false)
        }
        game.setPreviusSelectedChip(clickedChip)
        for (let p = 0; p < players.length; p++) {
            if (players[p].getIsPlaying() == true) {
                if (clickedChip.getOwner() === players[p].getId()) {
                    
                        clickedChip.setIsSelected(true);
                        game.setIsDragging(true);
                    
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
