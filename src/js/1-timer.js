'use strict';
// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import izitoast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector("#datetime-picker");
const button = document.querySelector("[data-start]");
button.disabled = true;

const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minsTimer = document.querySelector('[data-minutes]');
const secsTimer = document.querySelector('[data-seconds]');

let userSelectedDate = "";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        // console.log(selectedDates[0]);
        if (options.defaultDate > selectedDates[0]) {
            izitoast.error({
                position: 'topCenter',
                message: 'Please choose a date in the future',
                titleColor: '#FFF',
                titleSize: '16px',
                messageColor: '#FFF',
                messageSize: '16px',
                backgroundColor: '#EF4040',
      });
            button.disabled = true;
        } else {
            button.disabled = false;
      }
    
  },
};
const datePicker = flatpickr(input, options);

datePicker.selectedDates[0];

input.addEventListener('focus', () => {
  datePicker.config.defaultDate = new Date();
});

button.addEventListener('click', onStartTimer);

function onStartTimer() {
  const timer = setInterval(() => {
    const selectedDateTime = userSelectedDate.getTime();
    const currentDateTime = new Date().getTime();
    const different = selectedDateTime - currentDateTime - 1000;
    const result = convertMs(different);

    const { days, hours, minutes, seconds } = result;

    daysTimer.textContent = pad(days);
    hoursTimer.textContent = pad(hours);
    minsTimer.textContent = pad(minutes);
    secsTimer.textContent = pad(seconds);

    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0 || different <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

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
