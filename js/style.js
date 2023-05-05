//initialize
const minuteDisplay = document.querySelector(".minutes")
const secondDisplay = document.querySelector(".seconds")
const message = document.querySelector(".message")
const animationGif = document.querySelector(".animation-gif")
const settingPopUp = document.querySelector(".setting-wrapper")
const settingAlert = document.querySelector(".setting-alert")
const theme = document.querySelector(".container")
const sound = new Audio('/sound/ding-sound.mp3')

//variable of displayed timer
let pomodoro = 50
let shortBreak = 5
let longBreak = 10

let minutesReplace
let seconds = "00"

let runTime
let paused = false

let cntClickedPlay = 0


let choiceState = 1

//rotate the icon restart each time click
function rotate(icon) {
    icon.style.animationName = "spin"
    setTimeout(function () {
        icon.style.animationName = "none"
    }, 1000)
}

//change choiceState each time user switch the mode
const choices = document.querySelectorAll(".pomo_action__choice")
choices.forEach(choice => {
    choice.addEventListener("click", event => {
        //change background and color of choice when being actived
        removeActived()
        choice.classList.add("actived")

        if (choice.classList.contains('shortBreak')) {
            choiceState = 2
        } else if (choice.classList.contains('longBreak')) {
            choiceState = 3
        } else {
            choiceState = 1
        }

        restart()
    })
})

function removeActived() {
    choices.forEach(choice => {
        choice.classList.remove("actived")
    })
}

function displayTime(choice) {
    choice < 10 ? (minuteDisplay.innerHTML = "0" + choice) : minuteDisplay.innerHTML = choice
    secondDisplay.innerHTML = seconds
}

displayTime(pomodoro)

function start() {
    document.querySelector(".fa-circle-play").style.display = "none"
    document.querySelector(".fa-circle-pause").style.display = "block"
    cntClickedPlay++

    if (cntClickedPlay == 1) {
        if (choiceState == 1) {
            minutesReplace = pomodoro
        } else if (choiceState == 2) {
            minutesReplace = shortBreak
        } else {
            minutesReplace = longBreak
        }

        minutesReplace--
        seconds = 59
        displayTime(minutesReplace)
    }

    runTime = setInterval(countDown, 1000)
}

function countDown() {
    seconds--
    if (seconds < 0) {
        minutesReplace--
        seconds = 59
        displayTime(minutesReplace)
    } else if (seconds < 10 && minutesReplace < 10) {
        minuteDisplay.innerHTML = "0" + minutesReplace
        secondDisplay.innerHTML = "0" + seconds
    } else if (seconds < 10) {
        minuteDisplay.innerHTML = minutesReplace
        secondDisplay.innerHTML = "0" + seconds
    } else {
        displayTime(minutesReplace)
    }

    if (minutesReplace < 0) {
        showPopUp()
        playSound()
        clearInterval(runTime)
        restart()
    }
}

function playSound() {
    sound.play();
}

function showPopUp() {
    if (animationGif.childElementCount >= 2) {
        animationGif.removeChild(animationGif.lastElementChild)
    }

    if (choiceState == 1) {
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
    } else if (choiceState == 2) {
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
    if (choiceState == 1) {
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
    } else if (choiceState == 2) {
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

    cntClickedPlay = 0

    seconds = "00"
    clearInterval(runTime)

    if (choiceState == 1) {
        displayTime(pomodoro)
    } else if (choiceState == 2) {
        displayTime(shortBreak)
    } else {
        displayTime(longBreak)
    }
}

//handle setting
function openSetting() {
    document.querySelector(".pomodoro-container").style.display = "none"
    settingPopUp.style.display = "flex"
    document.getElementById("bg-change").value = ""
}

function closeSetting() {
    settingAlert.style.display = "none"
    settingPopUp.style.display = "none"
    document.querySelector(".pomodoro-container").style.display = "flex"
}

function saveChanges() {
    restart()

    let pomoTime = parseInt(document.getElementById("pomo-time").value)
    let shortTime = parseInt(document.getElementById("short-time").value)
    let longTime = parseInt(document.getElementById("long-time").value)
    let newTheme = document.getElementById("bg-change").value

    //handle time setting
    if (document.getElementById("pomo-time").value.length == 0 || document.getElementById("short-time").value.length == 0 || document.getElementById("long-time").value.length == 0) {
        settingAlert.innerHTML = `* Please fill out all input fields!`
        settingAlert.style.display = "block"
    } else if ((pomoTime < 1 || pomoTime > 120) || (shortTime < 1 || shortTime > 5) || (longTime < 6 || longTime > 20)) {
        settingAlert.innerHTML = `* Invalid input value! Please enter again!`
        settingAlert.style.display = "block"
    } else {
        settingAlert.style.display = "none"

        //re assign the value for display timer
        pomodoro = pomoTime
        shortBreak = shortTime
        longBreak = longTime

        closeSetting()

        //display the pomo in default when enter save button and close setting
        choiceState = 1
        displayTime(pomodoro)
        removeActived()
        document.querySelector(".pomo").classList.add("actived")
        document.querySelector(".pomodoro-container").style.display = "flex"
    }

    //change the theme
    theme.style.backgroundImage = `url(/img/${newTheme}.jpg)`

}

//switch setting
function showSettingTimer() {
    document.querySelector(".title-theme").style.border = "none"
    document.querySelector(".title-timer").style.borderBottom = "3px solid white"
    document.querySelector(".setting-timer").style.display = "flex"
    document.querySelector(".setting-guide").style.display = "block"
    document.querySelector(".setting-theme").style.display = "none"
}

function showSettingTheme() {
    document.querySelector(".title-timer").style.border = "none"
    document.querySelector(".title-theme").style.borderBottom = "3px solid white"
    document.querySelector(".setting-timer").style.display = "none"
    document.querySelector(".setting-guide").style.display = "none"
    document.querySelector(".setting-theme").style.display = "block"
}