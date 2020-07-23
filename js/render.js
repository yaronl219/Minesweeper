'use strict'
const MINE = ' '
const CLOSED = ' '
const FLAGGED = ' '
const EMPTYCELL = ' '

function renderTimer() {
    var timerEl = document.querySelector('.timer')
    timerEl.innerText = gSecondsPlayed
}

function renderScore() {
    var timerEl = document.querySelector('.score')
    timerEl.innerText = countCellAttribute(gBoard, 'isOpen') + countCellAttribute(gBoard, 'isFlagged')
}

function renderSmileyFace(face) {
    var playerFace = document.querySelector('.player-icon')
    console.log(playerFace)
    switch (face) {
        case 'regular':
            playerFace.style.backgroundImage = ("url(../img/smily_faces-regular.svg");
            break;
        case 'worried':
            playerFace.style.backgroundImage = ("url(img/smily_faces-worry.svg");
            break;
        case 'cool':
            playerFace.style.backgroundImage = ("url(img/smily_faces-cool.svg");
            break;
        case 'dead':
            // playerFace.style.backgroundImage = ("url(img/smily_faces-dead.svg");
            console.log('dead')
            playerFace.classList = 'player-icon dead'
            break;
        case 'doom':
            playerFace.style.backgroundImage = ("url(img/smily_faces-doom.svg");
            break;
        case 'saboteur':
            playerFace.style.backgroundImage = ("url(img/smily_faces-saboteur.svg")
            break;
    }

}

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

function toggleDisabledButtons(bool) {
    var disabledButtonArray = document.querySelectorAll('.help-btn')
    for (var i = 0; i < disabledButtonArray.length; i++) {
        if (bool) {
            disabledButtonArray[i].disabled = true
        } else {
            disabledButtonArray[i].disabled = false
        }
    }
}

function resetAllHelp() {
    var usedHelpArray = ['.broken-heart', '.shield-off', '.hint-off']
    var newHelpArray = ['heart', 'shield', 'hint']
    for (var i = 0; i < 3; i++) {
        var elAmount = document.querySelectorAll(usedHelpArray[i]).length
        for (var j = 0; j < elAmount; j++) {
            renderHelpChange(usedHelpArray[i], newHelpArray[i])
        }
    }
}

function renderHelpChange(orCls, taCls) {
    var el = document.querySelector(orCls)
    el.classList = taCls
}

function toggleCustomDifficulty(bool) {
    var el = document.querySelector('.custom-difficulty')
    el.disabled = !bool
}