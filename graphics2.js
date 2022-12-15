var clickedArray = []
var numMarkedSquares = 0;
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
    Squaresize:25
}

function CreateElement(type, path, attributes, text)
{
  const parent = document.querySelector("#" + path);
  const el = document.createElement(type);
  if(text != undefined) {
      const node = document.createTextNode(text);
      el.appendChild(node);
  }
  for(var attribute in attributes)
  {
    el.setAttribute(attribute, attributes[attribute]);
  }
  parent.appendChild(el);
  return "#" + attributes["id"];
}

function opensquare(row, col) {
    document.getElementById("BR" + row + "C" + col).style.display = "none";
    clickedArray[col][row] = 1;
}

function SetUpBoard() {
    var size = renderer.Squaresize;
    for (let i = 0; i < game.height; i++) {
    clickedArray.push([]) 
        for (let j = 0; j < game.length; j++) {
            CreateElement("div", "board", {class: "sq", id: "SR" + j + "C" + i, style: "background-color: "+renderer.squareColor+"; width:" + size +"px; height:" + size +"px; position:absolute; left: " + j * size + "px; top: "+ i * size +"px;"}, BoardArray[i][j]); 
            CreateElement("button", "board", {oncontextmenu: "markAsFlag("+j +", " + i+")", class: "but", id: "BR" + j + "C" + i, onclick: "clicked("+j +", " + i+")", style: "width:" + size +"px; height:" + size +"px; position:absolute; left: " + j * size + "px; top: "+ i * size +"px;"}, undefined);
            clickedArray[i].push(0);
            
        } 
    }    
}

var sqauresToOpen = []

function clicked(row, col) {
    if (!game.gameStarted) {
        game.gameStarted = true;        
    }
    if(document.getElementById("BR" + row + "C" + col).style.backgroundColor != "red" && game.gameOver == false && MarkingOn == false && document.getElementById("BR" + row + "C" + col).innerHTML == "") {
        var clickedSquare = BoardArray[col][row];
        opensquare(row, col);
        if(clickedSquare == " ") {
            openClickedOnZero(row, col);
            var i = 0;
            while(sqauresToOpen.length > i) {
                openClickedOnZero(sqauresToOpen[i][0], sqauresToOpen[i][1]);
                // console.log(sqauresToOpen[i])
                // sqauresToOpen.splice(1);
                i++;
            }
            sqauresToOpen.splice(0)
        }
        else if(clickedSquare == "💣") {
            lost();
        }
        if(checkifwon()) {
            win();
        }
    }
    else if(MarkingOn == true && document.getElementById("BR" + row + "C" + col).style.backgroundColor != "red" && document.getElementById("BR" + row + "C" + col).innerHTML == "") {
        markAsFlag(row, col);
    }
    else if(document.getElementById("BR" + row + "C" + col).style.backgroundColor = "red" && document.getElementById("BR" + row + "C" + col).innerHTML == "") {
        document.getElementById("BR" + row + "C" + col).innerHTML = "?";
        document.getElementById("BR" + row + "C" + col).style.backgroundColor = ''
    }
  else if(document.getElementById("BR" + row + "C" + col).innerHTML == "?") {
    document.getElementById("BR" + row + "C" + col).innerHTML = "";
  }
}


function open(row, col) {
    var clickedSquare = BoardArray[col][row];
    if(clickedSquare == " ") {
        sqauresToOpen.push([row, col]);
    }
    opensquare(row, col);
}

function openClickedOnZero(row, col) {
    var Checks = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    //----------------
    for (let k = 0; k < Checks.length; k++) {
        var xSquare = row + Checks[k][1];
        var ySquare = col + Checks[k][0];
        if(!(xSquare < 0 || xSquare > game.length - 1 || ySquare < 0 || ySquare > game.height - 1)) {
            if(clickedArray[ySquare][xSquare] == " ") {
                open(xSquare, ySquare);
            }
        }
    }     
}

var allButtons;
function markAsFlag(row, col) {
    if(game.gameOver == false) {
        if (!game.gameStarted) {
            game.gameStarted = true;        
        }
        if(document.getElementById("BR" + row + "C" + col).style.backgroundColor == "red") {
            numMarkedSquares--;
            document.getElementById("BR" + row + "C" + col).style.backgroundColor = '';
        }
        else {
            numMarkedSquares++;
            document.getElementById("BR" + row + "C" + col).style.backgroundColor = "red";  
        }
    }
}

function lost() {
    allButtons = document.querySelectorAll(".but");
    allButtons.forEach(i => {
        i.style.display = "none";
      });
      var sq = document.querySelectorAll(".sq");
      for (let i = 0; i < game.height; i++) {
        for (let j = 0; j < game.length; j++) {
            if (BoardArray[i][j] == "💣") {
                sq[game.length * i + j].style.backgroundColor = "red";
            }
        }
      }
      document.querySelector("#loseButton").style.left = window.innerWidth/2 - 80 + "px";
        document.querySelector("#loseButton").style.top = window.innerHeight/2 - 7.5 + "px";
      document.querySelector("#loseButton").style.display = "block";
      game.gameWon = false;
      gameOver();
    // console.log(allButtons)
    // allButtons.style.display = "none";
}

function checkifwon() {
    for (let i = 0; i < clickedArray.length; i++) {
        for (let j = 0; j < clickedArray[i].length; j++) {
            if (clickedArray[i][j] == 1) {
                
            }
            else if(BoardArray[i][j] == "💣"){

            }
            else {
                return false;
            }
        }
    }
    return true;
}

function win() {
    // alert("you win");
    game.gameWon = true;
    document.querySelector("#game-time").innerHTML = game.time;
    var sq = document.querySelectorAll(".sq");
    sq.forEach(i => {
        i.style.backgroundColor = "green";
    });
    gameOver();
}

function gameOver() {
    game.gameOver = true;
    var winCount = localStorage.getItem(game.gameMode + "-WinCount");
    var Completedgames = localStorage.getItem(game.gameMode + "-CompletedGames");
    var totalTime = localStorage.getItem(game.gameMode + "-TotalTime");
    var fastestTime = localStorage.getItem(game.gameMode + "-FastestTime");
    var totalWinTime = localStorage.getItem(game.gameMode + "-TotalWinTime");

    if(winCount == null) {winCount = 0;}
    if(Completedgames == null) {Completedgames = 0;}
    if(totalTime == null) {totalTime = 0;}
    if(fastestTime == null) {fastestTime = Infinity;}
    if(totalWinTime == null) {totalWinTime = 0;}

    totalTime = parseInt(totalTime) + game.time;
    Completedgames = parseInt(Completedgames) + 1
    
    if (game.gameWon === true) {
        winCount = parseInt(winCount) + 1;
        if(game.time < fastestTime) {
            fastestTime = game.time
        }
        totalWinTime = parseInt(totalWinTime) + game.time;
        // console.log(totalWinTime) 
    }

    localStorage.setItem(game.gameMode + "-WinCount", winCount);
    localStorage.setItem(game.gameMode + "-CompletedGames", Completedgames);
    localStorage.setItem(game.gameMode + "-TotalTime", totalTime);
    localStorage.setItem(game.gameMode + "-FastestTime", fastestTime);
    localStorage.setItem(game.gameMode + "-TotalWinTime", totalWinTime);
    updateMenu();
}
