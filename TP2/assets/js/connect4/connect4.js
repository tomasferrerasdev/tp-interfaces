



let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d')
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let winnerScreen = document.getElementById('winner')
let winnerName = document.getElementById('winner-name')
let form = document.querySelector('form')

document.getElementById('reset-btn').onclick = function() {
    document.querySelector('form').style.display = "flex"
    document.getElementById("winner").style.display = "none";

    //reset (arreglar fondo)
    clearAll();
}

let img = document.getElementById('connect4-img');
let arrow = document.getElementById('arrow');
let reload = document.getElementById('reload');

let characterPic_1;
let characterPic_2;
let timer;
let gameData;
let game ;
let board = [];
let squarePos = [];
let boardPositions ;
let font = new FontFace('alarm-font', 'url(assets/font/alarm-clock.ttf)');

font.load().then(function(font) {
    document.fonts.add(font);
})



let characters = [
    {
        name: "benny",
        chip: "./assets/img/chip/poker.png",
    },
    {
        name: "sheriff",
        chip: "./assets/img/chip/nut.png",
    },
    {
        name: "ncr",
        chip: "./assets/img/chip/nuka_cola.png",
    },
    {
        name: "npc",
        chip: "./assets/img/chip/coin.png",
        
    }
]

let formData = document.querySelector('form')
.addEventListener('submit', e => {
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    gameData = data;
    init(data)
})



canvas.addEventListener('mouseup', (e) => {
    mouseUp(e);
})
canvas.addEventListener('mousedown', (e) => {
    mouseDown(e);
})
canvas.addEventListener('mousemove', (e) => {
    dragChip(e);
})

function init(data) {
    form.style.display = 'none';
    game = new Game();
    boardPositions = game.getBoardPositions();
    setRules(data);
}



function setRules(data){
    let rules = data.connect;
    let row = 6;
    let column = 7;
    let cant = 21;
    

    if(rules == 5){
        row += 1
        column += 1
        cant = 28
    }else if(rules == 6){
        row += 2
        column += 2
        cant = 36;
    }
    chargueBoard(row,column);
    setCharacters(data.player_1, data.player_2, cant);
    drawTimer()
}

function setCharacters(player_1, player_2, cant){
    let player_character_1 = characters.find(o => o.name === player_1)
    let player_character_2 = characters.find(o => o.name === player_2)

    let chips_1 = player_character_1.chip
    let chips_2 = player_character_2.chip

    characterPic_1 = document.querySelector(`#${player_character_1.name}Pic`)
    characterPic_2 = document.querySelector(`#${player_character_2.name}Pic`)

    game.addPlayers(player_character_1, player_character_2)
    createChips(cant, chips_1, chips_2)
    
}

function drawCharacters(){
    let x = canvasWidth / 2
    let y = canvasHeight - 20
    ctx.font = "30px alarm-font";
    ctx.fillStyle = "#01fe78";
    ctx.textAlign = "center";
    ctx.fillText(`${gameData.player_1}`, x - 500 , y-500)
    ctx.fillText(`${gameData.player_2}`, x + 500 , y-500)
}

function drawTimer() {
    if(reload) reload.addEventListener

    let i = 30;
    interval = setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBoard()
        drawChips()
        let x = canvasWidth / 2
        let y = canvasHeight - 20
        ctx.font = "30px alarm-font";
        ctx.fillStyle = "#01fe78";
        ctx.textAlign = "center";
        ctx.fillText(`${i} seconds`, x-(60 * gameData.connect), y);
        if(gameData.connect != 6){
            ctx.fillText(` - `, x + 20, y);
        }
        ctx.fillText(`reset`,  x+(60 * gameData.connect) , y);
        i--;
        if(i === 0) {
            game.setTurn()
            i = 30;
        }
    }, 1000);
}

function chargueBoard(row,column){
    for (let i = 0; i < row; i++) {
        let row = []
        for (let j = 0; j < column; j++) {
            row.push(null)
        }
        boardPositions.push(row);    
    }
}

function createChips(cant, chips_1, chips_2) {
    let players = game.getPlayers();
    for (let j = 0; j < players.length; j++) {
        for (let i = 0; i < cant; i++) {
            if (players[j].getId() === 1) {
                let x = Math.floor(Math.random() * (160 - 10 + 1)) + 10;
                let y = Math.floor(Math.random() * (310 - 10 + 1)) + 80;
                let img = chips_1;
                
                let chip = new Chip(
                    x,
                    y,
                    img,
                    players[j].getId(),
                    players[j].getIsPlaying()
                );

                players[j].addChip(chip);
            } else {
                let x = Math.floor(Math.random() * (1180 - 1050 + 1)) + 1050;
                let y = Math.floor(Math.random() * (310 - 10 + 1)) + 80;
                let img = chips_2;

                let chip = new Chip(
                    x,
                    y,
                    img,
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
    let pos = canvas.width/2 - 540/2 ;
    let posy= canvas.height/2 - 420/2;
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
    let players = game.getPlayers();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacters()
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
        if(!(x < squarePos[i].x || x > squarePos[i].x + squarePos[i].w || y < squarePos[i].y || y > squarePos[i].y + squarePos[i].h)){
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
            clearInterval(interval)
            drawTimer()
            let winner = game.checkWinner(columnPos, rowPos , gameData.connect)
            let winner_names = game.getPlayers()
            if(winner != undefined) {
                if(winner[0] === true) {
                    winnerScreen.style.display = "flex"
                    winnerName.innerHTML = `<h1>${winner_names[winner[1]-1].name}</h1>`
                }
            }
        }else{
            game.getPreviusSelectedChip().resetPosition();
            drawChips();
        }
    }
    game.setIsDragging(false)
    
}

function addChip(rowPos, columnPos){
    boardPositions[rowPos][columnPos] = game.getPreviusSelectedChip();
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
    let players = game.getPlayers();
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
                        drawChips();
                        game.setIsDragging(true);

                }
            }
        }
        }
    }else if(checkResetArea(clickX, clickY)){
       clearAll();
       setRules(gameData)
    }
}

function clearAll(){
    boardPositions = [];
    game.removePlayers();
    clearInterval(interval)
}

function checkResetArea(clickX, clickY){
    let x = (canvasWidth / 2) + (60 * gameData.connect) - 25
    let y = canvasHeight - 20
    if(!(clickX < x || clickX > x + 60 || clickY < 60 || clickY > y + 60)){
        return true
    }
    return false
}


function findClicked(clickX, clickY) {
    let players = game.getPlayers();
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
