'use strict'

function showHint(ms = 1000) {
    gLevel.hintsRemaining--
        // show hint should show a cell and it's neighbors for 1 second
        var randHintCell = findRandomHint(0)
    for (var i = randHintCell.i - 1; i <= randHintCell.i + 1; i++) {
        for (var j = randHintCell.j - 1; j <= randHintCell.j + 1; j++) {
            // if out of bounds - continue without testing
            if (i < 0 || i >= gBoard.length || j < 0 || j >= gBoard.length) continue
                // if the coordinates are populated - add 1 to totalPopulatedNeighbors
            setCellAttribute(gBoard, i, j, 'isOpen', true)
        }
    }
    renderBoard()

    setTimeout(function() {
        for (var i = randHintCell.i - 1; i <= randHintCell.i + 1; i++) {
            for (var j = randHintCell.j - 1; j <= randHintCell.j + 1; j++) {
                // if out of bounds - continue without testing
                if (i < 0 || i >= gBoard.length || j < 0 || j >= gBoard.length) continue
                    // if the coordinates are populated - add 1 to totalPopulatedNeighbors
                setCellAttribute(gBoard, i, j, 'isOpen', false)
            }
        }
        renderBoard()
    }, ms)

}

function findRandomHint(neg) {
    // save to an array all cells with neg amount of neighbors
    var possibleHintsArray = getCellWithAttributeArray(gBoard, 'minedNeighbors', neg)
        // loop over received array, and remove cells that are already open
    for (var i = possibleHintsArray.length - 1; i >= 0; i--) {
        // saving the variable for comfort sake
        var currCoords = possibleHintsArray[i]
            // if the current coords are already open - remove them from the possible array
        if (gBoard[currCoords.i][currCoords.j].isOpen) {
            possibleHintsArray.splice(i, 1)
        }
    }
    // if stuck in recursion loop - return null
    if (neg > 8) {
        return null
    } else if (possibleHintsArray.length === 0) {
        // if the array is empty (no cells found)
        // recall showHint with one more neighbor
        findRandomHint(neg + 1)
    }
    // returns a coord object
    return possibleHintsArray[getRandomInteger(0, possibleHintsArray.length, false)]
}

function safeClick(ms = 1000) {
    // safe click should highlight a location that can be clicked safely
    var hintCell = findRandomHint(0)
    gBoard[hintCell.i][hintCell.j].cellState = 'safe'
    renderBoard()
    setTimeout(function() {
        gBoard[hintCell.i][hintCell.j].cellState = 'closed'
        renderBoard()
    }, ms)
}