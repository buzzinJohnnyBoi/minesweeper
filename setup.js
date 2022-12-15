
var renderer = {
    x: 0,
    y: 0,
    width: 10000,
    height: 1000,    
    Background: "black",
    Boardx: 0,
    Boardy: 0,
    Boardwidth: 500,
    Boardheight: 500,
    squareColor: "gray",
    Squaresize: 30
}

function Newgame(length, height, numBombs, GameMode) {
    return {
        length: length,
        height: height,
        squares: length * height,
        numBombs: numBombs,
        board: [],
        time: 0,
        gameStarted: false,
        gameOver: false,
        gameWon: null,
        gameMode: GameMode
    }
}

function setup(game) {
    createBoard(game);
    var bombArr = []
    while (bombArr.length < game.numBombs) {
        var temp = false;
        var tempInt;
        while (temp == false) {
            temp = true;
            tempInt = randNum(0, game.squares - 1);
            if(game.board[Math.floor(tempInt/game.length)][tempInt % game.length] == "💣") {
                temp = false;
            }
        }
        bombArr.push(tempInt);
        game.board[Math.floor(tempInt/game.length)][tempInt % game.length] = "💣";
    }
    

    //----------------
    var Checks = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    //----------------
    for (let i = 0; i < game.height; i++) {
        for (let j = 0; j < game.length; j++) {
                if(game.board[i][j] == "💣") {
                    continue;
                }
                else {
                    var numSurroundingBombs = 0;
                    for (let k = 0; k < Checks.length; k++) {
                        var xSquare = j + Checks[k][1];
                        var ySquare = i + Checks[k][0];
                        if(xSquare < 0 || xSquare > game.length - 1 || ySquare < 0 || ySquare > game.height - 1) {
                            continue;
                        }
                        if (game.board[ySquare][xSquare] == "💣") {
                            numSurroundingBombs++;
                        }
                    }
                    if(numSurroundingBombs == 0) {numSurroundingBombs = " ";}
                    game.board[i][j] = numSurroundingBombs;
                }        
            }
        }


    // console.log(bombArr);
    return game.board;

}

function createBoard(game) {
    for (let i = 0; i < game.height; i++) {
        game.board.push([]);
        for (let j = 0; j < game.length; j++) {
            game.board[i].push("");
        }
    }
}

function randNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}