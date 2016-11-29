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
          boardBox.classList.add("col-md-4", "board-box", "empty");
          boardRow.appendChild(boardBox);

        }
        boardDOMElement.appendChild(boardRow);
    }
}

createBoard();

// Create an event listener that changes the class of the box on click
// Click event should change class of box clicked on - but only if class is empty

var clickerCount = 0;


boardDOMElement.addEventListener("click", function() {
    if (event.target.classList.contains("empty") && (clickerCount % 2 === 0)) {
        event.target.classList.add("imperial");
        event.target.classList.remove("empty");
        clickerCount++;
    } else if (event.target.classList.contains("empty") && (clickerCount % 2 != 0)) {
        event.target.classList.add("alliance");
        event.target.classList.remove("empty");
        clickerCount++;
    }
})
