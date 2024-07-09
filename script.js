const body = document.querySelector('body');
const hourHand = document.querySelector('.hour');
const minHand = document.querySelector('.min');
const secHand = document.querySelector('.sec');
const modeSwitch = document.querySelector('.mode-switch');
const modeStop = document.querySelector('.mode-stop');
const timeLeftMin = document.querySelector('.time-left-min');
const timeLeftHour = document.querySelector('.time-left-hour');
const timeNow = document.querySelector('.time-digital-now');

let intervalId;

if(localStorage.getItem("mode") === "Dark Mode") {
    body.classList.add("dark");
    modeSwitch.textContent = "Light Mode";
}

const updateTime = () => {
    let date = new Date();

    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    let onTime = 60 - minutes;
    let secToDeg = (seconds / 60) * 360;
    let minToDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
    let hourToDeg = (hours / 12) * 360 + (minutes / 60) * 30;

    secHand.style.transform = `rotate(${secToDeg}deg)`
    minHand.style.transform = `rotate(${minToDeg}deg)`
    hourHand.style.transform = `rotate(${hourToDeg}deg)`

    timeNow.textContent = `${hours}h ${minutes}m ${seconds}s`
    timeLeftHour.textContent = `${hours - 1}`
    timeLeftMin.textContent = `${onTime}`
}

modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    // .dark를 포함하고있으면 true, 없으면 false
    const isDarkMode = body.classList.contains("dark");

    // .dark가 true면 버튼텍스트가 "Light Mode", false면 "Dark Mode"
    modeSwitch.textContent = isDarkMode ? "Light Mode" : "Dark Mode";

    // .dark가 true면 로컬스토리지 value가 "Dark Mode", false면 "Light Mode"
    localStorage.setItem("mode", isDarkMode ? "Dark Mode" : "Light Mode");

    // if(isDarkMode) {
    //     modeSwitch.textContent = "Dark Mode";
    // } else {
    //     modeSwitch.textContent = "Light Mode";
    // }
})

modeStop.addEventListener("click", () => {
    if(modeStop.textContent === "Start") {
        modeStop.textContent = "Stop"
        intervalId = setInterval(updateTime, 1000);
    } else {
        clearInterval(intervalId);
        modeStop.textContent = "Start";
    }
})