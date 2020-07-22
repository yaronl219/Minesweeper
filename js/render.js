'use strict'
const MINE = 'm'
const CLOSED = 'c'
const FLAGGED = 'f'
const EMPTYCELL = ' '



function renderCellContent(board, i, j) {
    if (board[i][j].isFlagged) {
        // if the cell is flagged - return flagged state
        return FLAGGED
    } else if (!board[i][j].isOpen) {
        // if the cell is closed - nothing to display - render closed state
        return CLOSED
    } else if (board[i][j].isMined) {
        // if the cell is mined and open - return mined state
        return MINE
    } else if (board[i][j].minedNeighbors > 0) {
        // if has more than one mined neighbor - return the amount
        return board[i][j].minedNeighbors
    } else {
        // if all else fails - this should be an empty cell
        return EMPTYCELL
    }
}

function renderBoard() {
    var gameBoardEl = document.querySelector('.board-area')
    gameBoardEl.innerHTML = createHtmlString(gBoard)
}

function createHtmlString(board) {
    var outputHtmlString = '<table id="game-board" border="1px"> '
        // console.log(nextNum)
    for (var i = 0; i < board.length; i++) {
        outputHtmlString += '<tr>'
        for (var j = 0; j < board.length; j++) {
            outputHtmlString += '<td id="cell' + i + '-' + j + '" class="cell ' + board[i][j].cellState + '" onclick="clickCell(this,' + board[i][j].i + ',' + board[i][j].j + ')" oncontextmenu="flagCell(this,' + i + ',' + j + ')">' + renderCellContent(board, i, j) + '</td>'
        }
        outputHtmlString += '</tr>'
    }
    outputHtmlString += '</table>'
    return outputHtmlString
}