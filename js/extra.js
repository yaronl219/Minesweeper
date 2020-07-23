'use strict'
// change to worry face on mousedown
document.addEventListener("mousedown", function() {
    if (gLevel.isOn && !gLevel.isGameOver) {
        renderSmileyFace('worried')
    }
})

// change to regular face when user lifts the mouse back up
document.addEventListener("mouseup", function() {
    if (gLevel.isOn && !gLevel.isGameOver) {
        renderSmileyFace('regular')
    }
})


// opens and closes the menu
function toggleMenuModal(el) {
    var menuEl = document.querySelector(el)
    if (menuEl.hidden === true) {
        menuEl.hidden = false
    } else { menuEl.hidden = true }
}

// selecting difficulty from the modal
function selectDifficulty() {
    // find all 'choice' inputs
    const rbs = document.querySelectorAll('input[name="choice"]');
    // initialize the slectedValue
    let selectedValue;
    // finding the checked radio button
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }
    // if user selected custom
    const selectedCustomValues = document.querySelectorAll('input[type="range"]');
    // query the grid size
    var customGridSize = selectedCustomValues[0].value
        // query the mine amount
    var customMineAmount = selectedCustomValues[1].value
        // close the modal
    toggleDifficultyModal()
        // if the user selected custom - set the difficulty accordingly
    if (selectedValue === 'custom') {
        setDifficulty(selectedValue, customGridSize, customMineAmount)
            // else set the difficulty according to the presets
    } else {
        setDifficulty(selectedValue)
    }
}

// opening and closing the difficulty Modal
function toggleDifficultyModal() {
    var background = document.querySelector('.popup-modal')
    var textBoxWindows = document.querySelector('#popup-window-difficulty')
        // if hidden, show, else - hide
    if (background.hidden === true) {
        textBoxWindows.hidden = false
        background.hidden = false
    } else {
        background.hidden = true
        textBoxWindows.hidden = true
    }
}

function showInstructions() {
    // display the game instructions
    var content = 'Welcome to Minesweeper 98, the novel groundbreaking game!<br>You can trip on mines 3 times. use right-click to plant a flag where theres a mine.<br>You have 3 shields and 3 hints.<br> hints will show you a small area for one second, and shields will show you one safe location you can click. <br>Every open cell is one point. <br>Find all the mines as fast as you can!'
    popupGeneralInformation(content)
}

function popupGeneralInformation(info) {
    // this function will display a "warning" window with custom text
    toggleGeneralModal()
    var el = document.querySelector('.general-window-text').firstElementChild
    el.innerHTML = info
}

function showAbout() {
    // showing the about text
    var content = 'Proudly built by Yaron Lipshitz'
    popupGeneralInformation(content)
}


function toggleGeneralModal() {
    // opening and closing the general modal
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