var gameOn = false;
var myTurn = true;

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
    var cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.addEventListener("click", function() {
            tick(this);
        });
    });
}

function tick(element) {
    if(myTurn) {
        element.style.backgroundImage = "URL('./image/red.png')";
    } else {
        element.style.backgroundImage = "URL('./image/black.png')"
    }
}