import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTimeChoose = document.querySelector('#datetime-picker');
const btnStartCountdown = document.querySelector('[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

let getDateTime = new Date();
let differenceBetweenDates = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    getDateTime = selectedDates[0].getTime(); //Este parametro venia con la función console.log(selectedDates[0]);
    if (getDateTime < new Date().getTime()) {
      Notify.failure('Please choose a date in the future');
    } else {
      btnStartCountdown.removeAttribute('disabled');
    }
  },
};

flatpickr("#datetime-picker", options);

const disableButton = () => {
  btnStartCountdown.setAttribute('disabled', true);
};
disableButton();

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  if (value < 10) {
    return `${value}`.padStart(2, '0');
  }
  return `${value}`;
};

const countdownTimer = () => {
  disableButton();
  const currentDate = new Date().getTime(); //Variable que contiene la fecha actual
  differenceBetweenDates = getDateTime - currentDate;
  if (getDateTime <= currentDate) {
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(differenceBetweenDates);
  daysTimer.textContent = addLeadingZero(days);
  hoursTimer.textContent = addLeadingZero(hours);
  minutesTimer.textContent = addLeadingZero(minutes);
  secondsTimer.textContent = addLeadingZero(seconds);
  setTimeout(() => {
    countdownTimer();
  }, 1000);
};

btnStartCountdown.addEventListener('click', countdownTimer);