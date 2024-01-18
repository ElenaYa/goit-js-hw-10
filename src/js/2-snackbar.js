'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('input[name="delay"]');
const form = document.querySelector('.form');

form.addEventListener('submit', onGeneratePromise);

function onGeneratePromise(event) {
    event.preventDefault();
    const delayInput = form.delay.value;
    const userChoice = form.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
             if (userChoice === 'fulfilled') {
        resolve(delayInput);
      } else if (userChoice === 'rejected') {
        reject(delayInput);
      }
    }, delayInput);
   
    });
    promise
        .then(delay =>
            iziToast.success({
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topCenter',
                titleColor: '#FFF',
                titleSize: '16px',
    messageColor: '#FFF',
                messageSize: '16px',
     backgroundColor: '#59A10D',
            }))
        .catch(delay =>
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topCenter',
                titleColor: '#FFF',
                titleSize: '16px',
                messageColor: '#FFF',
                messageSize: '16px',
                backgroundColor: '#EF4040',
            }));
    form.reset();
    input.value = '';
}