'use strict'

var saveBoardArray = []
var saveGameState = []

function saveToArray() {
    // adds to save array a replicate of the board state
    saveBoardArray.push(replicateNestedArrays(gBoard))
    saveGameState.push(replicateGameState(gLevel))
}

function loadFromArray() {
    // gets the last save array and returns it to the board
    gBoard = replicateNestedArrays(saveBoardArray.pop())
    gLevel = replicateGameState(saveGameState.pop())
    renderBoard()
    resetAllHelp()
}

function replicateGameState(originalObj) {
    return {
        isOn: originalObj.isOn,
        mineAmount: originalObj.isOn,
        boardSize: originalObj.boardSize,
        hintsRemaining: originalObj.hintsRemaining,
        livesRemaining: originalObj.livesRemaining,
        safeClicksRemaining: originalObj.safeClicksRemaining
    }
}


function replicateCell(cell) {
    return {
        i: cell.i,
        j: cell.j,
        isMined: cell.isMined,
        isOpen: cell.isOpen,
        isFlagged: cell.isFlagged,
        minedNeighbors: cell.minedNeighbors,
        isMineable: cell.isMineable,
        cellState: cell.cellState,
        flagCount: cell.flagCount
    }
}