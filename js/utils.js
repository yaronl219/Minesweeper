'use strict'

// this bit of code removes the right click menu and allows flag usage
window.oncontextmenu = function() {
    return false; // cancel default menu
}

function getRandomInteger(min, max, isIncluse = true) {
    var inclusive = (isIncluse) ? 0 : 1
    return Math.floor(Math.random() * ((max - inclusive) - (min - 1))) + min
}

function replicateNestedArrays(arr) {
    var outputArray = []
    for (var i = 0; i < arr.length; i++) {
        var row = []
        for (var j = 0; j < arr.length; j++) {
            row.push(replicateCell(arr[i][j]))
        }
        // console.log(row)
        outputArray.push(row)
    }
    return outputArray
}


function replicateObject(obj) {
    var newObj = {}
    for (var key in obj) {
        newObj[key] = obj[key]
    }
    return newObj
}