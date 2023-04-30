//rotate the icon restart each time click
function rotate(icon) {
    icon.style.animationName = "spin"
    setTimeout(function () {
        icon.style.animationName = "none"
    }, 1000)
}

//change background and color of choice when being actived
const choices = document.querySelectorAll(".pomo_action__choice")
choices.forEach(choice => {
    choice.addEventListener("click", event => {
        removeActived()
        choice.classList.add("actived")

        if (choice.classList.contains('shortBreak')) {
            choicState = 2
            restart()
        } else if (choice.classList.contains('longBreak')) {
            choicState = 3
            restart()
        } else {
            choicState = 1
            restart()
        }
    })
})

function removeActived() {
    choices.forEach(choice => {
        choice.classList.remove("actived")
    })
}

//handle the timer
const minuteDisplay = document.querySelector(".minutes")
const secondDisplay = document.querySelector(".seconds")
let initial = 30
let pomodoro = initial

let initialShort = 5
let shortBreak = initialShort

let initialLong = 10
let longBreak = initialLong

let seconds = "00"
let runTime
let paused = false
let cntClickedPomo = 0
let cntClickedShort = 0
let cntClickedLong = 0

let choicState = 1

function displayTime(choice) {
    if (choice < 10) {
        minuteDisplay.innerHTML = "0" + choice
        secondDisplay.innerHTML = seconds
    }
    else {
        minuteDisplay.innerHTML = choice
        secondDisplay.innerHTML = seconds
    }

}

displayTime(pomodoro)

function start() {
    document.querySelector(".fa-circle-play").style.display = "none"
    document.querySelector(".fa-circle-pause").style.display = "block"

    if (choicState == 1) {
        cntClickedPomo++
    } else if (choicState == 2) {
        cntClickedShort++
    } else {
        cntClickedLong++
    }

    if (choicState == 1 && cntClickedPomo == 1) {
        pomodoro--;
        seconds = 59
        displayTime(pomodoro)
    } else if (choicState == 2 && cntClickedShort == 1) {
        shortBreak--;
        seconds = 59
        displayTime(shortBreak)
    } else if (choicState == 3 && cntClickedLong == 1) {
        longBreak--;
        seconds = 59
        displayTime(longBreak)
    }


    if (choicState == 1) {
        runTime = setInterval(countDown, 1000, pomodoro)
    } else if (choicState == 2) {
        runTime = setInterval(countDown, 1000, shortBreak)
    } else {
        runTime = setInterval(countDown, 1000, longBreak)
    }


}

function countDown(choice) {
    seconds--
    if (seconds < 0) {
        choice--
        seconds = 59
        displayTime(choice)
    } else if (seconds < 10 && choice < 10) {
        minuteDisplay.innerHTML = "0" + choice
        secondDisplay.innerHTML = "0" + seconds
    } else if (seconds < 10) {
        minuteDisplay.innerHTML = choice
        secondDisplay.innerHTML = "0" + seconds
    } else {
        displayTime(choice)
    }

    if (choice < 0) {
        alert("Congratulations!")
        clearInterval(runTime)
        restart()
    }
}

function pause() {
    document.querySelector(".fa-circle-play").style.display = "block"
    document.querySelector(".fa-circle-pause").style.display = "none"

    clearInterval(runTime)
}

function restart() {
    document.querySelector(".fa-circle-play").style.display = "block"
    document.querySelector(".fa-circle-pause").style.display = "none"

    cntClickedPomo = 0
    cntClickedShort = 0
    cntClickedLong = 0

    if (choicState == 1) {
        pomodoro = initial
        seconds = "00"

        clearInterval(runTime)
        displayTime(pomodoro)
    } else if (choicState == 2) {
        shortBreak = initialShort
        seconds = "00"

        clearInterval(runTime)
        displayTime(shortBreak)
    } else {
        longBreak = initialLong
        seconds = "00"

        clearInterval(runTime)
        displayTime(longBreak)
    }
}