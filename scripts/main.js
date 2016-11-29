// function to create a board
// Board needs to have three divs with class row and board-row, row needs to contain three divs with class
// col-md-4 and board-box


var boardDOMElement = document.getElementById("board");
var resultDOMElement = document.getElementById("winner-text");
var resetDOMElement = document.getElementById("reset-game");

function createBoard() {
    boardDOMElement.innerHTML = "";
    resultDOMElement.innerHTML = "";
    resetDOMElement.classList.add("hidden");
    clickerCount = 0;
    gameState = true;
    gameWinner = undefined;
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
var gameState = true;
var gameWinner;


boardDOMElement.addEventListener("click", function() {
    if (event.target.classList.contains("empty") && (clickerCount % 2 === 0) && gameState === true) {
        event.target.classList.add("imperial", "in-play");
        event.target.classList.remove("empty");
        clickerCount++;
    } else if (event.target.classList.contains("empty") && (clickerCount % 2 !== 0) && gameState === true) {
        event.target.classList.add("alliance", "in-play");
        event.target.classList.remove("empty");
        clickerCount++;
    }
    checkGameState();
    if (gameState === false) {
        printWinner();
    }
});


// winConditions is an array containing arrays of all possible win conditions

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



function checkGameState() {
    var inPlay = document.getElementsByClassName("in-play"); //returns an object of all clicked elements
    if (inPlay.length === 9) {
        gameState = false;
    }
    var allianceIds = [];
    var imperialIds = [];
    for (i = 0; i < inPlay.length; i++) {
        if (inPlay[i].classList.contains("alliance")) {
            allianceIds.push(inPlay[i].id); //pushes the ids (ie the position) of all alliance blocks to an array

        } else if (inPlay[i].classList.contains("imperial")) {
            imperialIds.push(inPlay[i].id); //pushes the ids (ie the position) of all imperial blocks to an array
        }

    }
    // the following for loop checks if the ids of alliance and imperial blocks matches any of the winning combos
    for (j = 0; j < winConditions.length; j++) {
        var didAllianceWin = winConditions[j].every(function(val) {
            return allianceIds.indexOf(val) >= 0;
        });
        var didImperialsWin = winConditions[j].every(function(val) {
            return imperialIds.indexOf(val) >= 0;
        });

        if (didAllianceWin === true) {
            gameState = false;
            gameWinner = "Alliance";
        }

        if (didImperialsWin === true) {
            gameState = false;
            gameWinner = "Imperials";
        }
    }
}





function printWinner() {
    if (gameWinner !== undefined) {
        resultDOMElement.innerText = "The winner is " + gameWinner;

    } else {
        resultDOMElement.innerText = "It's a draw";
    }
    resetDOMElement.classList.remove("hidden");

}

resetDOMElement.addEventListener("click", createBoard);
