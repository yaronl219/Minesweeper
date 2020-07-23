'use strict'

function keylogger(event) {
    console.log(event)
}

function toggleMenuModal(el) {
    var menuEl = document.querySelector(el)
    if (menuEl.hidden === true) {
        menuEl.hidden = false
    } else { menuEl.hidden = true }
}

function selectDifficulty() {
    const rbs = document.querySelectorAll('input[name="choice"]');
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }

    const selectedCustomValues = document.querySelectorAll('input[type="range"]');
    var customGridSize = selectedCustomValues[0].value
    var customMineAmount = selectedCustomValues[1].value
    toggleDifficultyModal()
    if (selectedValue === 'custom') {
        setDifficulty(selectedValue, customGridSize, customMineAmount)
    } else {
        setDifficulty(selectedValue)
    }
}

function toggleDifficultyModal() {
    var background = document.querySelector('.popup-modal')
    var textBoxWindows = document.querySelector('#popup-window-difficulty')
    if (background.hidden === true) {
        textBoxWindows.hidden = false
        background.hidden = false
    } else {
        background.hidden = true
        textBoxWindows.hidden = true
    }
}

function showInstructions() {
    var content = 'Welcome to Minesweeper 98, the novel groundbreaking game!<br>You can trip on mines 3 times. use right-click to plant a flag where theres a mine.<br>You have 3 shields and 3 hints.<br> hints will show you a small area for one second, and shields will show you one safe location you can click. <br>Every open cell is one point. <br>Find all the mines as fast as you can!'
    popupGeneralInformation(content)
}

function popupGeneralInformation(info) {
    toggleGeneralModal()
    var el = document.querySelector('.general-window-text').firstElementChild
    el.innerHTML = info
}

function showAbout() {
    var content = 'Proudly built by Yaron Lipshitz'
    popupGeneralInformation(content)
}


function toggleGeneralModal() {
    var background = document.querySelector('.popup-modal')
    var textBoxWindows = document.querySelector('#popup-window-general')
    if (background.hidden === true) {
        textBoxWindows.hidden = false
        background.hidden = false
    } else {
        background.hidden = true
        textBoxWindows.hidden = true
    }
}