'use strict'

var gLevel = {
    isOn: false,
    mineAmount: 8,
    boardSize: 12,
    hintsRemaining: 3,
    livesRemaining: 3,
    safeClicksRemaining: 3,
    flagCount: 0,
    isGameOver: false
}

var gGameInterval;
var gSecondsPlayed;

function setDifficulty(choice, gridsize = 0, mineAmount = 0) {
    console.log(choice)
    switch (choice) {
        case 'easy':
            gLevel.mineAmount = 2
            gLevel.boardSize = 4
            break;
        case 'medium':
            gLevel.mineAmount = 12
            gLevel.boardSize = 8
            break;
        case 'expert':
            gLevel.mineAmount = 30
            gLevel.boardSize = 12
            break;
        case 'custom':
            gLevel.mineAmount = mineAmount
            gLevel.boardSize = gridsize
            break;
    }
    gManuallyPlacesMines = false
    startLevel()
}

function winLevel() {
    renderSmileyFace('cool')
    gLevel.isGameOver = true
    clearInterval(gGameInterval)
}

function checkWinState() {
    // if player claims all flags are planted

    if (gGodMode) {
        if (gBoard.length ** 2 - countCellAttribute(gBoard, 'isOpen') - (gLevel.mineAmount - gLevel.flagCount) === -1) {
            winLevel()
        }
    }
    if (gLevel.flagCount === (gLevel.mineAmount - (3 - gLevel.livesRemaining))) {

        // get all mined cells
        var minedCells = getCellWithAttributeArray(gBoard, 'isMined', true)

        for (var i = 0; i < minedCells.length; i++) {
            // if a mined cell which is not flagged is located, enter the if statement
            if (gBoard[minedCells[i].i][minedCells[i].j].isFlagged === false) {
                // if the cell is also not open - exit the function
                if (gBoard[minedCells[i].i][minedCells[i].j].isOpen === false) return
            }

        }
        // if all mined cells were found - go to winLevel function
        winLevel()
    }
}

function gameOver() {
    console.log('gameover')
    renderHelpChange('.heart', 'broken-heart')
    clearInterval(gGameInterval)
        // get all the mines on the board
    var mineArray = getCellWithAttributeArray(gBoard, 'isMined', true)
        // loop over the array and open all the mines
    for (var mine = 0; mine < mineArray.length; mine++) {
        setCellAttribute(gBoard, mineArray[mine].i, mineArray[mine].j, 'isOpen')
    }
    renderSmileyFace('dead')
    gLevel.isGameOver = true
    gLevel.isOn = false
}

function flagCell(el, i, j) {
    if (gLevel.isGameOver) return
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
    checkWinState()
    renderBoard()
}

function loseLife() {
    if (!gGodMode) {
        gLevel.livesRemaining--;
        renderHelpChange('.heart', 'broken-heart')
    }
}

function clickMine(board, i, j) {
    // change the original clicked mine state to detonated
    board[i][j].cellState = 'detonated'
    board[i][j].isOpen = 'true'
        // if player still has lives - remove one life
    if (gLevel.livesRemaining > 1) {
        loseLife()
        console.log('life:', gLevel.livesRemaining)
        checkWinState()
    } else {
        // if out of lives - game over
        gameOver()
    }
    // render the board
    renderBoard()
}

function startLevel() {
    gGodMode = false
    gLevel.isGameOver = false
    gLevel.isOn = false
    gLevel.flagCount = 0
    gBoard = buildBoard(gLevel.boardSize)
    gLevel.hintsRemaining = 3
    gLevel.livesRemaining = 3
    gLevel.safeClicksRemaining = 3
    clearInterval(gGameInterval)
    gSecondsPlayed = 0
    toggleDisabledButtons(true)
    resetAllHelp()
    renderTimer()
    renderScore()
    renderSmileyFace('regular')
    renderBoard()
}

function startTimerInterval(ms) {
    var startTime = Date.now()
    gGameInterval = setInterval(function() {
        var now = Date.now()
        gSecondsPlayed = Math.round((now - startTime) / 1000)
        renderTimer()
    }, ms)
}


function clickCell(el, i, j, userClicked = true) {
    // console.log('el', el)
    // console.log('i', i)
    // console.log('j', j)
    if (gManualMode) return placeMine(i, j)
    if (gLevel.isGameOver) return
    if (gBoard[i][j].isMined === true) {
        return clickMine(gBoard, i, j)
    } else if (gBoard[i][j].isFlagged) {
        // if the cell is flagged, unflag it first
        flagCell(gBoard, i, j)
    }
    if (!gBoard[i][j].isOpen) {
        // if the cell clicked is not open, go through all other steps
        // set the cell attribute to open
        setCellAttribute(gBoard, i, j, 'isOpen')
            // set the state to reflect that
        setSingleCellState(gBoard, i, j)
            // if this the first click - initiate the first click function
        checkWinState()
        if (!gLevel.isOn) {
            gLevel.isOn = true
            firstClick(gBoard, i, j, gLevel.mineAmount)
        }
        // finally - render the board
        openAdjCells(gBoard, i, j)
        if (userClicked) saveToArray()
        renderScore()
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
                    clickCell(board, i, j, false)
                }
            }
        }
    }
}


function firstClick(board, i, j, mineAmount) {
    console.log('first')
    setNeighborsToBeNotMineable(board, i, j)
    placeAllMines(board, mineAmount)
    calculateAllMinesNeighbors(board)
    setAllCellsState(board)
    startTimerInterval()
    toggleDisabledButtons(false)
    renderBoard()
    saveToArray()
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