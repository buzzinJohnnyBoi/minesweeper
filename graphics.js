var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
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

// function update() {
//     updateCanvas();
//     updateBoard();

// }

// function updateCanvas() {
//     canvas.style.left = renderer.x + "px";
//     canvas.style.top = renderer.y + "px";
//     canvas.width = renderer.width;
//     canvas.height = renderer.height;

//     ctx.fillStyle = renderer.Background;
//     ctx.fillRect(0, 0, renderer.width, renderer.height);
// }

// function updateBoard() {
//     for (let i = 0; i < BoardArray.length; i++) {
//         for (let j = 0; j < BoardArray.length; j++) {
//             ctx.beginPath();
//             ctx.rect(j * renderer.Squaresize, i * renderer.Squaresize, renderer.Squaresize, renderer.Squaresize);
//             ctx.fillStyle = renderer.squareColor;
//             ctx.fillRect(j * renderer.Squaresize, i * renderer.Squaresize, renderer.Squaresize, renderer.Squaresize);
//             ctx.fillStyle = "red";
//             if(BoardArray[i][j] == "B") {ctx.fillStyle = "green";}
//             ctx.fillText(BoardArray[i][j], j * renderer.Squaresize + renderer.Squaresize/2, i * renderer.Squaresize + renderer.Squaresize/2);
//             ctx.stroke();
//         } 
//     }    
// }
