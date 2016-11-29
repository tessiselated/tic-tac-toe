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
            boardBox.id = "position" + i + j;
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
        event.target.classList.add("imperial", "in-play");
        event.target.classList.remove("empty");
        clickerCount++;
    } else if (event.target.classList.contains("empty") && (clickerCount % 2 != 0)) {
        event.target.classList.add("alliance", "in-play");
        event.target.classList.remove("empty");
        clickerCount++;
    }
    checkWinner();
    console.log(gameWinner);
})


// After each click the game should check if someone wins
// I need to write logic to check for this
// I need a way to identify all elements in a row, column or diagonal


// a row is position 00 position 01 and position 02
// or position 10 position 11 and position 12
// or position 20 position 21 and position 22

var gameState = true;
var gameWinner

var winConditions = [
    ["position00", "position01", "position02"],
    ["position10", "position11", "position12"],
    ["position20", "position21", "position22"],
    ["position00", "position10", "position20"],
    ["position01", "position11", "position21"],
    ["position02", "position12", "position22"],
    ["position00", "position11", "position22"],
    ["position02", "position11", "position20"]
];



function checkWinner() {
    var inPlay = document.getElementsByClassName("in-play"); //returns an object of all clicked elements
    var allianceIds = [];
    var imperialIds = [];
    for (i = 0; i < inPlay.length; i++) {
        if (inPlay[i].classList.contains("alliance")) {
            allianceIds.push(inPlay[i].id);

        } else if (inPlay[i].classList.contains("imperial")) {
            imperialIds.push(inPlay[i].id);
        }

    }
    for (j = 0; j < winConditions.length; j++) {
        var didAllianceWin = winConditions[j].every(function(val) {
            return allianceIds.indexOf(val) >= 0; });
            if (didAllianceWin === true){
                gameState = false;
                gameWinner = "Alliance";
            }
    }
    for (k = 0; k < winConditions.length; k++) {
        var didImperialsWin = winConditions[k].every(function(val) {
            return imperialIds.indexOf(val) >= 0; });
            if (didImperialsWin === true) {
                gameState = false;
                gameWinner = "Imperials";
            }

    }

}
