'use strict'
var gGodMode = false
var gShouldRemoveHints = true

// this is for cheating
var gCheatTimeout;
var gCheatBuffer = []
var gCheatLastEnteredKey;

// if one of the cheats exists do the function
function checkCheat() {
    var textEntered = gCheatBuffer.join('')
    switch (textEntered.toLowerCase()) {
        case 'iddqd':
            setGodMode()
            break;
        case 'idkfa':
            toggleUnlimitedHelp()
            break;
        case 'idclip':
            logCellContent(gBoard, 'isMined')
            break;
    }
}

// save all key logs to the buffer
// if no keystrokes for more than 1 seconds, reset the buffer
function keylogger(event) {
    var currentTime = Date.now()
    if (currentTime - gCheatLastEnteredKey > 1000) {
        gCheatBuffer = [];
    }
    gCheatBuffer.push(event.key)
    gCheatLastEnteredKey = currentTime
    if (gCheatBuffer.length >= 5) {
        checkCheat()
    }
}

function setGodMode() {
    console.log('GOD MODE')
    gGodMode = true
    renderSmileyFace('doom')
}

function toggleUnlimitedHelp() {
    console.log('unlimited ammo')
        // if on - does not remove hints when used
    gShouldRemoveHints = (gShouldRemoveHints) ? false : true
}

function logCellContent(board, att) {
    // printing to the console all cells with a certain attribute
    var outputBoard = []
    for (var i = 0; i < board.length; i++) {
        var row = []
        for (var j = 0; j < board.length; j++) {
            // looping over the entire board and adding the attribute selected 
            row.push(board[i][j][att])
        }
        outputBoard.push(row)

    }
    console.table(outputBoard)
    return outputBoard
}