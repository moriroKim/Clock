/* -----------------------------------------------------------------------------*/
// <요구사항>
// 1. 실시간으로 시간이 업데이트되는 시계를 생성해야 합니다.
// 2. 1초마다 현재 시각으로 업데이트될 수 있도록 해야 합니다. (setInterval)
// 3. 형식은 ' 🕖현재 시각은 00시 00분 00초 입니다.' 로 작성해주세요.
// 4. stop 버튼을 클릭하면, 시계가 정지해야 합니다. (clearInterval)
// 5. 정각이 되기까지 몇 분이 남았는지 표시하도록 해야 합니다.
// 6. 형식은 '정각까지 00분 남았습니다!'로 작성해주세요.
// 7. 스타일은 마음껏 수정해도 좋습니다.
/* -----------------------------------------------------------------------------*/

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

if (localStorage.getItem('mode') === 'Dark Mode') {
	body.classList.add('dark');
	modeSwitch.textContent = 'Light Mode';
}

const updateTime = () => {
	let date = new Date();

	const seconds = date.getSeconds();
	const minutes = date.getMinutes();
	const hours = date.getHours();

	let secToDeg = (seconds / 60) * 360;
	let minToDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
	let hourToDeg = (hours / 12) * 360 + (minutes / 60) * 30;

	secHand.style.transform = `rotate(${secToDeg}deg)`;
	minHand.style.transform = `rotate(${minToDeg}deg)`;
	hourHand.style.transform = `rotate(${hourToDeg}deg)`;

  // 초침 돌아가는 버그 수정
if (secToDeg === 0) {
    secHand.style.transition = 'none';
    setTimeout(() => {
	secHand.style.transition = 'all 1s ease-out';
    }, 1000);
}

	timeNow.textContent = `${hours}h ${minutes}m ${seconds}s`;
	timeLeftHour.textContent = `${hours + 1}`;
	timeLeftMin.textContent = `${60 - minutes}`;
};

modeSwitch.addEventListener('click', () => {
	body.classList.toggle('dark');

	// .dark를 포함하고있으면 true, 없으면 false
	const isDarkMode = body.classList.contains('dark');

	// .dark가 true면 버튼텍스트가 "Light Mode", false면 "Dark Mode"
	modeSwitch.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';

	// .dark가 true면 로컬스토리지 value가 "Dark Mode", false면 "Light Mode"
	localStorage.setItem('mode', isDarkMode ? 'Dark Mode' : 'Light Mode');

  // if(isDarkMode) {
  //     modeSwitch.textContent = "Dark Mode";
  // } else {
  //     modeSwitch.textContent = "Light Mode";
  // }
});

modeStop.addEventListener('click', () => {
	if (modeStop.textContent === 'Start') {
		modeStop.textContent = 'Stop';
		intervalId = setInterval(updateTime, 1000);
	} else {
		clearInterval(intervalId);
		modeStop.textContent = 'Start';
	}
});
