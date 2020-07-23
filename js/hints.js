'use strict'

function showHint(ms = 1000) {
    if (gLevel.hintsRemaining === 1) {
        // if last help, render the button disabled
        var btnEl = document.querySelector('.hint-btn')
        btnEl.disabled = true
    }
    // show hint should show a cell and it's neighbors for 1 second
    var randHintCell = findRandomHint(0)
        // if there are no available hints 0 do nothing
    if (randHintCell === undefined) return null
        // initializing the array. this will hold the original state of all cells in order to restore them
    var originalCellArray = []
    removeOneHelp('hint')
    for (var i = randHintCell.i - 1; i <= randHintCell.i + 1; i++) {
        for (var j = randHintCell.j - 1; j <= randHintCell.j + 1; j++) {
            // if out of bounds - continue without testing
            if (i < 0 || i >= gBoard.length || j < 0 || j >= gBoard.length) continue
            originalCellArray.push(replicateCell(gBoard[i][j]))
            setCellAttribute(gBoard, i, j, 'isOpen', true)
            setCellAttribute(gBoard, i, j, 'cellState', 'hint-cell')
            if (gBoard[i][j].isMined) setCellAttribute(gBoard, i, j, 'cellState', 'mined')
        }
    }
    renderBoard()

    setTimeout(function() {
        // var runs = originalCellArray.length
        for (var i = randHintCell.i - 1; i <= randHintCell.i + 1; i++) {
            for (var j = randHintCell.j - 1; j <= randHintCell.j + 1; j++) {
                // if out of bounds - continue without testing
                if (i < 0 || i >= gBoard.length || j < 0 || j >= gBoard.length) continue
                    // if the coordinates are populated - add 1 to totalPopulatedNeighbors
                gBoard[i][j] = originalCellArray.shift()
                    // setCellAttribute(gBoard, i, j, 'isOpen', false)
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
        if (gBoard[currCoords.i][currCoords.j].isOpen || gBoard[currCoords.i][currCoords.j].isMined) {
            possibleHintsArray.splice(i, 1)
        }
    }

    // if stuck in recursion loop - return null
    if (neg > 8) {
        return []
    } else if (possibleHintsArray.length === 0) {
        // if the array is empty (no cells found)
        // recall showHint with one more neighbor

        return findRandomHint(neg + 1)
    }
    // returns a coord object
    var randomIdx = getRandomInteger(0, possibleHintsArray.length, false)
    return possibleHintsArray[randomIdx]
}

function safeClick(ms = 1000) {
    if (gLevel.safeClicksRemaining === 1) {
        // if last help, render the button disabled
        var btnEl = document.querySelector('.safe-btn')
        btnEl.disabled = true
    }
    // safe click should highlight a location that can be clicked safely
    var hintCell = findRandomHint(0)
    gBoard[hintCell.i][hintCell.j].cellState = 'safe'
    removeOneHelp('shield')
    renderBoard()
    setTimeout(function() {
        gBoard[hintCell.i][hintCell.j].cellState = 'closed'
        renderBoard()
    }, ms)
}

function removeOneHelp(help) {
    if (gShouldRemoveHints) {
        switch (help) {
            case 'hint':
                gLevel.hintsRemaining--
                    console.log(gLevel.hintsRemaining)
                renderHelpChange('.hint', 'hint-off')
                break
            case 'shield':
                gLevel.safeClicksRemaining--
                    console.log(gLevel.safeClicksRemaining)
                renderHelpChange('.shield', 'shield-off')

                break
        }
    }
}