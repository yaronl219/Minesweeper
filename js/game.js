'use strict'

var gLevel = {
    isOn: false,
    mineAmount: 2,
    boardSize: 4,
    hintsRemaining: 3,
    livesRemaining: 3,
    safeClicksRemaining: 3,
    flagCount: 0
}

var gGameInterval;
var gSecondsPlayed;



function gameOver() {
    console.log('gameover')
        // get all the mines on the board
    var mineArray = getCellWithAttributeArray(gBoard, 'isMined', true)
        // loop over the array and open all the mines
    for (var mine = 0; mine < mineArray.length; mine++) {
        setCellAttribute(gBoard, mineArray[mine].i, mineArray[mine].j, 'isOpen')
    }
}

function flagCell(el, i, j) {
    if (gBoard[i][j].isOpen) {
        // if the cell is not flagged and open - do nothing
        return
    } else if (!gBoard[i][j].isFlagged) {
        // set the cell atributes to flagged
        setCellAttribute(gBoard, i, j, 'isFlagged')
        setCellAttribute(gBoard, i, j, 'cellState', 'flag')
        gLevel.flagCount++;
    } else {
        setCellAttribute(gBoard, i, j, 'isFlagged', false)
        setCellAttribute(gBoard, i, j, 'cellState', 'closed')
        gLevel.flagCount--;
    }
    renderBoard()
}

function clickMine(board, i, j) {
    // change the original clicked mine state to detonated
    board[i][j].cellState = 'detonated'
    board[i][j].isOpen = 'true'
        // if player still has lives - remove one life
    if (gLevel.livesRemaining > 1) {
        gLevel.livesRemaining--
            console.log('life:', gLevel.livesRemaining)
    } else {
        // if out of lives - game over
        gameOver()
    }
    // render the board
    renderBoard()
}

function startLevel() {
    gBoard = buildBoard(gLevel.boardSize)
    renderBoard()
}

function startTimerInterval(ms) {
    var startTime = Date.now()
    gGameInterval = setInterval(function() {
        var now = Date.now()
        gSecondsPlayed = Math.round((now - startTime) / 1000)
    }, ms)
}


function clickCell(el, i, j) {
    // console.log('el', el)
    // console.log('i', i)
    // console.log('j', j)

    if (gBoard[i][j].isMined === true) {
        clickMine(gBoard, i, j)
    } else if (!gBoard[i][j].isOpen) {
        // if the cell clicked is not open, go through all other steps
        // set the cell attribute to open
        setCellAttribute(gBoard, i, j, 'isOpen')
            // set the state to reflect that
        setSingleCellState(gBoard, i, j)
            // if this the first click - initiate the first click function
        if (!gLevel.isOn) {
            gLevel.isOn = true
            firstClick(gBoard, i, j, gLevel.mineAmount)
        }
        // finally - render the board
        openAdjCells(gBoard, i, j)
        renderBoard()
    }
}

function openAdjCells(board, celli, cellj) {
    if (board[celli][cellj].minedNeighbors === 0) {
        for (var i = celli - 1; i <= celli + 1; i++) {
            for (var j = cellj - 1; j <= cellj + 1; j++) {
                // if out of bounds - continue without testing
                if (i < 0 || i >= board.length || j < 0 || j >= board.length) continue
                    // if reached the current cell - do not run
                if (!(j === cellj && i === celli)) {
                    // if the coordinates are populated - add 1 to totalPopulatedNeighbors
                    clickCell(board, i, j)
                }
            }
        }
    }
}


function firstClick(board, i, j, mineAmount) {
    setNeighborsToBeNotMineable(board, i, j)
    placeRandomMines(board, mineAmount)
    calculateAllMinesNeighbors(board)
    setAllCellsState(board)
    renderBoard()
}

function setNeighborsToBeNotMineable(board, celli, cellj) {
    for (var i = celli - 1; i <= celli + 1; i++) {
        for (var j = cellj - 1; j <= cellj + 1; j++) {
            // if out of bounds - continue without testing
            if (i < 0 || i >= board.length || j < 0 || j >= board.length) continue
                // if the coordinates are populated - add 1 to totalPopulatedNeighbors
            setCellAttribute(gBoard, i, j, 'isMineable', false)

        }
    }
}