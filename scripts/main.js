// function to create a board
// Board needs to have three divs with class row and board-row, row needs to contain three divs with class
// col-md-4 and board-box


var boardDOMElement = document.getElementById("board")

function createBoard() {
    for (i = 0; i < 3; i++) {
        var boardRow = document.createElement("div");
        boardRow.classList.add("row");
        for (j = 0; j < 3; j++) {
          var boardBox = document.createElement("div");
          boardBox.classList.add("col-md-4", "board-box");
          boardRow.appendChild(boardBox);

        }
        boardDOMElement.appendChild(boardRow);
    }
}

createBoard();
