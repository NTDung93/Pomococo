//initialize
const minuteDisplay = document.querySelector(".minutes")
const secondDisplay = document.querySelector(".seconds")
const message = document.querySelector(".message")
const animationGif = document.querySelector(".animation-gif")
const settingPopUp = document.querySelector(".setting-wrapper")

//variable of displayed timer
let initial = 30
let pomodoro = initial

let initialShort = 2
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

function displayTime(choicState) {
    if (choicState == 1) {
        if (pomodoro < 10) {
            minuteDisplay.innerHTML = "0" + pomodoro
            secondDisplay.innerHTML = seconds
        }
        else {
            minuteDisplay.innerHTML = pomodoro
            secondDisplay.innerHTML = seconds
        }
    } else if (choicState == 2) {
        if (shortBreak < 10) {
            minuteDisplay.innerHTML = "0" + shortBreak
            secondDisplay.innerHTML = seconds
        }
        else {
            minuteDisplay.innerHTML = shortBreak
            secondDisplay.innerHTML = seconds
        }
    } else if (choicState == 3) {
        if (longBreak < 10) {
            minuteDisplay.innerHTML = "0" + longBreak
            secondDisplay.innerHTML = seconds
        }
        else {
            minuteDisplay.innerHTML = longBreak
            secondDisplay.innerHTML = seconds
        }
    }
}

displayTime(1)

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
        displayTime(choicState)
    } else if (choicState == 2 && cntClickedShort == 1) {
        shortBreak--;
        seconds = 59
        displayTime(choicState)
    } else if (choicState == 3 && cntClickedLong == 1) {
        longBreak--;
        seconds = 59
        displayTime(choicState)
    }

    if (choicState == 1) {
        runTime = setInterval(countDown, 1000, choicState)
    } else if (choicState == 2) {
        runTime = setInterval(countDown, 1000, choicState)
    } else {
        runTime = setInterval(countDown, 1000, choicState)
    }
}

function countDown(choicState) {
    if (choicState == 1) {
        seconds--
        if (seconds < 0) {
            pomodoro--
            seconds = 59
            displayTime(1)
        } else if (seconds < 10 && pomodoro < 10) {
            minuteDisplay.innerHTML = "0" + pomodoro
            secondDisplay.innerHTML = "0" + seconds
        } else if (seconds < 10) {
            minuteDisplay.innerHTML = pomodoro
            secondDisplay.innerHTML = "0" + seconds
        } else {
            displayTime(1)
        }

        if (pomodoro < 0) {
            showPopUp()
            clearInterval(runTime)
            restart()
        }
    }
    if (choicState == 2) {
        seconds--
        if (seconds < 0) {
            shortBreak--
            seconds = 59
            displayTime(2)
        } else if (seconds < 10 && shortBreak < 10) {
            minuteDisplay.innerHTML = "0" + shortBreak
            secondDisplay.innerHTML = "0" + seconds
        } else if (seconds < 10) {
            minuteDisplay.innerHTML = shortBreak
            secondDisplay.innerHTML = "0" + seconds
        } else {
            displayTime(2)
        }

        if (shortBreak < 0) {
            showPopUp()
            clearInterval(runTime)
            restart()
        }
    }
    if (choicState == 3) {
        seconds--
        if (seconds < 0) {
            longBreak--
            seconds = 59
            displayTime(3)
        } else if (seconds < 10 && longBreak < 10) {
            minuteDisplay.innerHTML = "0" + longBreak
            secondDisplay.innerHTML = "0" + seconds
        } else if (seconds < 10) {
            minuteDisplay.innerHTML = longBreak
            secondDisplay.innerHTML = "0" + seconds
        } else {
            displayTime(3)
        }

        if (longBreak < 0) {
            showPopUp()
            clearInterval(runTime)
            restart()
        }
    }
}

function showPopUp(choice) {
    if (animationGif.childElementCount >= 2) {
        animationGif.removeChild(animationGif.lastElementChild)
    }

    if (choicState == 1) {
        animationGif.innerHTML += `
        <lord-icon
        class="pomo-gif"
        src="https://cdn.lordicon.com/tqywkdcz.json"
        trigger="loop"
        delay="2000"
        colors="primary:#4bb3fd,secondary:#f28ba8,tertiary:#ffc738,quaternary:#f24c00"
        style="width: 250px; height: 250px"
        >
        </lord-icon>
      `
        message.innerHTML = `Congratulations!!! <br />
        You have just achieved your goal.`
    } else if (choicState == 2) {
        animationGif.innerHTML += ` <lord-icon
        class="short-gif"
        src="https://cdn.lordicon.com/mdbykuhq.json"
        trigger="loop"
        delay="2000"
        colors="outline:#121331,primary:#3a3347,secondary:#ffc738,tertiary:#ebe6ef"
        style="width: 250px; height: 250px"
      >
      </lord-icon>`
        message.innerHTML = `Time's out!!! <br />
        Let's get back to work.`
    } else {
        animationGif.innerHTML += `  <lord-icon
        class="long-gif"
        src="https://cdn.lordicon.com/osvvqecf.json"
        trigger="loop"
        delay="2000"
        colors="outline:#121331,primary:#f24c00,secondary:#ebe6ef,tertiary:#4bb3fd"
        style="width: 250px; height: 250px"
      >
      </lord-icon>`
        message.innerHTML = `Time's up!!! <br />
        Let's finish your work.`
    }
    document.querySelector(".pomodoro-container").style.display = "none"
    document.querySelector(".bg-wrapper").style.display = "flex"
    // removeGif()
}

function removeGif() {
    if (choicState == 1) {
        animationGif.innerHTML -= ` 
            <lord-icon
            src="https://cdn.lordicon.com/tqywkdcz.json"
            trigger="loop"
            delay="2000"
            colors="primary:#4bb3fd,secondary:#f28ba8,tertiary:#ffc738,quaternary:#f24c00"
            style="width: 250px; height: 250px"
            >
            </lord-icon>
        `
    } else if (choicState == 2) {
        animationGif.innerHTML -= ` 
            <lord-icon
                src="https://cdn.lordicon.com/mdbykuhq.json"
                trigger="loop"
                delay="2000"
                colors="outline:#121331,primary:#3a3347,secondary:#ffc738,tertiary:#ebe6ef"
                style="width:250px;height:250px">
            </lord-icon>
        `
    } else {
        animationGif.innerHTML -= ` 
            <lord-icon
                src="https://cdn.lordicon.com/osvvqecf.json"
                trigger="loop"
                delay="2000"
                colors="outline:#121331,primary:#f24c00,secondary:#ebe6ef,tertiary:#4bb3fd"
                style="width:250px;height:250px">
            </lord-icon>
        `
    }
}

function closePopUp() {
    document.querySelector(".bg-wrapper").style.display = "none"
    document.querySelector(".pomodoro-container").style.display = "flex"
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
        displayTime(1)
    } else if (choicState == 2) {
        shortBreak = initialShort
        seconds = "00"

        clearInterval(runTime)
        displayTime(2)
    } else {
        longBreak = initialLong
        seconds = "00"

        clearInterval(runTime)
        displayTime(3)
    }
}

//handle setting
function openSetting() {
    document.querySelector(".pomodoro-container").style.display = "none"
    settingPopUp.style.display = "flex"
}

function closeSetting() {
    settingPopUp.style.display = "none"
    document.querySelector(".pomodoro-container").style.display = "flex"
}

function saveChanges() {

    let pomoTime = parseInt(document.getElementById("pomo-time").value)
    let shortTime = parseInt(document.getElementById("short-time").value)
    let longTime = parseInt(document.getElementById("long-time").value)
    let settingAlert = document.querySelector(".setting-alert")

    if (document.getElementById("pomo-time").value.length == 0 || document.getElementById("short-time").value.length == 0 || document.getElementById("long-time").value.length == 0) {
        settingAlert.innerHTML = `* Please fill out all input fields!`
        settingAlert.style.display = "block"
    } else if ((pomoTime < 1 || pomoTime > 120) || (shortTime < 1 || shortTime > 5) || (longTime < 6 || longTime > 20)) {
        settingAlert.innerHTML = `* Invalid input value! Please enter again!`
        settingAlert.style.display = "block"
    } else {
        settingAlert.style.display = "none"

        //re assign the value for display timer
        initial = pomoTime
        initialShort = shortTime
        initialLong = longTime

        pomodoro = initial
        shortBreak = initialShort
        longBreak = initialLong

        console.log(initial);
        console.log(initialShort);
        console.log(initialLong);

        console.log(123);
        console.log(pomodoro);
        console.log(shortBreak);
        console.log(longBreak);

        closeSetting()

        displayTime(1)
        document.querySelector(".pomodoro-container").style.display = "flex"
    }
}