var currentPlayer = "player1";
$("#player").html("Player One");
function switchPlayer() {
    if (currentPlayer == "player1") {
        currentPlayer = "player2";
        $("#player").html("Player Two");
    } else if (currentPlayer == "player2") {
        currentPlayer = "player1";
        $("#player").html("Player One");
        console.log(currentPlayer);
    }
}

function victoryCheck(slots) {
    var slotsAsString = "";
    for (var slot of slots) {
        if ($(slot).hasClass("player1")) {
            slotsAsString += "1";
        } else if ($(slot).hasClass("player2")) {
            slotsAsString += "2";
        } else {
            slotsAsString += "0";
        }
    }
    //console.log("slotsAsString", slotsAsString);

    if (slotsAsString.includes("1111")) {
        return true;
    } else if (slotsAsString.includes("2222")) {
        return true;
    } else {
        return false;
    }
}

function diagonalCheck(slot) {
    var potentialWins = [
        [0, 7, 14, 21],
        [7, 14, 21, 28],
        [14, 21, 28, 35],
        [1, 8, 15, 22],
        [8, 15, 22, 29],
        [2, 9, 16, 23],
        [6, 13, 20, 27],
        [13, 20, 27, 34],
        [20, 27, 34, 41],
        [12, 19, 26, 33],
        [19, 26, 33, 40],
        [18, 25, 32, 39],
        [24, 19, 14, 9],
        [19, 14, 9, 4],
        [24, 19, 14, 9],
        [19, 14, 9, 4],
        [30, 25, 20, 15],
        [25, 20, 15, 10],
        [20, 15, 10, 5],
        [36, 31, 26, 21],
        [26, 21, 16, 11],
        [37, 32, 27, 22],
        [32, 27, 22, 17],
        [38, 33, 28, 23],
    ];

    var allSlots = $(".slot");
    // console.log("allSlots", allSlots);
    for (var potentialWin of potentialWins) {
        var slotsInDiagonal = [];
        for (var index of potentialWin) {
            slotsInDiagonal.push(allSlots[index]);
        }
        //console.log("potentialWin", potentialWin);
        //console.log("slotsInDiagonal", slotsInDiagonal);
        var hasWon = victoryCheck(slotsInDiagonal);
        if (hasWon) {
            return true;
        }
    }
}

$(".column").on("click", function (event) {
    var clickedColumn = $(event.currentTarget);
    var slotsInColumn = clickedColumn.children();

    var reversedSlots = slotsInColumn.toArray().reverse();

    for (var slot of reversedSlots) {
        var alreadyUsed =
            $(slot).hasClass("player1") || $(slot).hasClass("player2");

        if (!alreadyUsed) {
            $(slot).addClass(currentPlayer);
            var winVert = victoryCheck(slotsInColumn);

            var slotRowNumber = slotsInColumn.index(slot);
            var slotsInRow = $(".row" + slotRowNumber);
            var winHorizont = victoryCheck(slotsInRow);

            var winDiagonal = diagonalCheck(slot);
            //console.log("winDiagonal", winDiagonal);

            if (winVert || winHorizont || winDiagonal) {
                console.log("VICTORY!!11!!!!");

                $("#popup").fadeIn("slow");
            }

            switchPlayer();
            break;
        }
    }
});
