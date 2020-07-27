var gameOn = false;
var opponentTurn = false;

window.addEventListener("DOMContentLoaded", function() {
    initBoard(24, 24);
    initEvent();
});

function initBoard(widthBoard, heightBoard) {
    var rowIndex, columnIndex;
    var board = document.getElementById("boardGame");

    for(rowIndex = 0; rowIndex < heightBoard; rowIndex++) {
        var row = document.createElement("div");
        row.className = "row";
        for(columnIndex = 0; columnIndex < widthBoard; columnIndex++) {
            var cell = document.createElement("span");
            cell.className = "cell";
            cell.dataset.column = columnIndex;
            cell.dataset.row = rowIndex;
            row.appendChild(cell);
        }
        board.appendChild(row);
    }

    // set with board base on cells
    var widthBoardPixel = (widthBoard * 54);
    board.style.width = widthBoardPixel + "px";

    // scroll to center board
    var wrapBoard = document.getElementById("wrapBoard");
    wrapBoard.scrollLeft = (widthBoardPixel / 2) / 2;
    wrapBoard.scrollTop = ((heightBoard * 54) / 2) / 2;
}

function initEvent() {
    // event tick on cell
    var cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.addEventListener("click", function() {
            tick(this);
        });
    });
}

function tick(element) {
    //1. check exist in cell
    if(element.hasChildNodes()) {
        return;
    }

    //2. render image
    var image = document.createElement("img");
    image.classList = "image-fluid";

    if(opponentTurn) {
        image.src = "./image/red.png";
        image.classList.add("red");
        element.dataset.flag = "red";
        opponentTurn = false;
    } else {
        image.src = "./image/black.png";
        image.classList.add("black");
        element.dataset.flag = "black";
        opponentTurn = true;
    }

    element.appendChild(image);

    //3. calculate result
    evaluateResult(element);
}

function evaluateResult(element) {
    let currentRow = Number.parseInt(element.dataset.row);
    let currentColumn = Number.parseInt(element.dataset.column);
    let imageFlag = element.dataset.flag;

    // Vertical evaluation
    let verticalPoint = evaluateVertical(imageFlag, currentRow, currentColumn);
    if(verticalPoint >= 5) {
        
        endGame();

    }
    // horizontal evaluation

    // slash evaluation

    // back slash evaluation

}

function evaluateVertical(flag, row, column) {
    var totalPoint = 0;
    // bellow current row
    for (let index = 0; index < 5; index++) {
        var nextElement = document.querySelector("[data-column = '"+ column +"'][data-row='"+ (row + index) +"']");
        if(!nextElement || (nextElement.dataset.flag !== flag)) {
            break;
        }
        totalPoint++;
    }
    // above current row
    for (let index = 0; index < 5; index++) {
        var nextElement = document.querySelector("[data-column = '"+ column +"'][data-row='"+ (row - index - 1) +"']");
        if(!nextElement || (nextElement.dataset.flag !== flag)) {
            break;
        }
        totalPoint++;
    }
    return totalPoint;
}

 function endGame() {
     gameOn = false;
     // reset board;
 }