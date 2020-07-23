'use strict'
var gBoard;


function placeAllMines(board, amount) {
    // if manual mode, use the gMineArray instead of a random one
    if (gManuallyPlacesMines) {
        var possibleLocations = gMineArray
    } else {
        var possibleLocations = placeRandomMines(gBoard, amount)
    }
    for (var i = 0; i < possibleLocations.length; i++) {
        setCellAttribute(board, possibleLocations[i].i, possibleLocations[i].j, 'isMined')
    }
}

function placeRandomMines(board, amount) {
    var mineArray = []
        // get all mineable locations
    var possibleLocations = getCellWithAttributeArray(board, 'isMineable', true)
        // loops as many mines as requested and randomly returns the locations

    for (var i = 0; i < amount; i++) {
        var randIdx = getRandomInteger(0, possibleLocations.length, false)
        var a = possibleLocations.splice(randIdx, 1)
        mineArray.push(a[0])
    }
    return mineArray
}

function getCellWithAttributeArray(board, att, val) {
    // loop over board and return all cells that have an attribute - value
    var outputArray = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j][att] === val) {
                outputArray.push({
                    i: i,
                    j: j
                })
            }
        }
    }
    return outputArray
}




function calculateAllMinesNeighbors(board) {
    // loop over entire board and set the mine count for each cell
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            setNegMineCount(board, i, j)
        }
    }
}

function setNegMineCount(board, i, j) {
    // sets a certain cell mined neighbor count
    board[i][j].minedNeighbors = countMinedNegs(board, i, j)
}

function setCellAttribute(board, i, j, att, bool = true) {
    // set a cell's attribute manually
    board[i][j][att] = bool
}

function countMinedNegs(board, celli, cellj) {
    // initializing the amount of mined neighbors to 0
    var minedNeighbors = 0
    for (var i = celli - 1; i <= celli + 1; i++) {
        for (var j = cellj - 1; j <= cellj + 1; j++) {
            // if out of bounds - continue without testing
            if (i < 0 || i >= board.length || j < 0 || j >= board.length) continue
                // if reached the current cell - do not run
            if (!(j === cellj && i === celli)) {
                // if the coordinates are populated - add 1 to totalPopulatedNeighbors
                if (board[i][j].isMined === true) {
                    minedNeighbors++
                }
            }
        }
    }
    return minedNeighbors
}


function countCellAttribute(board, att) {
    // counts how many cells have the att key
    var sum = 0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j][att]) sum++
        }
    }
    return sum
}

function setAllCellsState(board) {
    // loop over board and set the state prior to rendering
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            setSingleCellState(board, i, j)
        }
    }
}


function setSingleCellState(board, i, j) {
    if (board[i][j].isFlagged) {
        // if the cell is flagged - set flagged state
        board[i][j].cellState = 'flagged'
    } else if (!board[i][j].isOpen) {
        // if the cell is closed - set closed state
        board[i][j].cellState = 'closed'
    } else if (board[i][j].isMined) {
        // if the cell is mined and open - return mined state
        board[i][j].cellState = 'mined'
    } else if (board[i][j].minedNeighbors > 0) {
        // if has more than one mined neighbor - return the amount
        board[i][j].cellState = `minAdj negCount${board[i][j].minedNeighbors}`
    } else {
        // if all else fails - this should be an empty cell
        board[i][j].cellState = 'blankCell'
    }
}

function createCellObject(i, j) {
    return {
        i: i,
        j: j,
        isMined: false,
        isOpen: false,
        isFlagged: false,
        minedNeighbors: 0,
        isMineable: true,
        cellState: 'closed'
    }
}

function buildBoard(size) {
    var board = []
    for (var i = 0; i < size; i++) {
        var row = []
        for (var j = 0; j < size; j++) {
            row.push(createCellObject(i, j))
        }
        board.push(row)
    }
    return board
}