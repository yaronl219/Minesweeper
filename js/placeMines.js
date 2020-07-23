'use strict'

var gManualMode = false
var gManuallyPlacesMines = false
var gMineArray = []

function changeManualModeButton() {
    var parentEl = document.querySelector('.manual-div')
    var el = document.querySelectorAll('.manual-mode')
    if (el.length === 1) {
        parentEl.innerHTML = '<button class="manual-ok" onclick="setManualMinesAndStartLevel()">OK</button>'
    } else {
        parentEl.innerHTML = '<button class="manual-mode" onclick="manualModeOn()">Manual Mode</button>'
    }
}

function manualModeOn() {
    startLevel()
    renderBoard()
    gManualMode = true
    changeManualModeButton()
    renderSmileyFace('saboteur')
}

function placeMine(i, j) {
    if (!gBoard[i][j].isMined) {
        setCellAttribute(gBoard, i, j, 'isMined')
        setCellAttribute(gBoard, i, j, 'isOpen')
    } else {
        setCellAttribute(gBoard, i, j, 'isMined', false)
        setCellAttribute(gBoard, i, j, 'isOpen', false)
    }
    setSingleCellState(gBoard, i, j)
    renderBoard()
}

function setManualMinesAndStartLevel() {
    var manualyMined = getCellWithAttributeArray(gBoard, 'isMined', true)
    gMineArray = manualyMined
    changeManualModeButton()
    gManualMode = false
    gManuallyPlacesMines = true
    startLevel()
}