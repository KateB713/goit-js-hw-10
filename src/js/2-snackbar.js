import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const delayInput = document.querySelector('input[name="delay"]');
// const stateInput = document.querySelector('input[name="state"]');
const btn = document.querySelector(".submit-btn");

form.addEventListener('submit', event => {
    event.preventDefault();

    const delay = Number(delayInput.value);
    const state = form.querySelector('input[name="state"]:checked')?.value;

    if (isNaN(delay) || delay < 0) {
        iziToast.warning({
            title: 'Помилка',
            message: 'Некоректне значення!',
            position: 'topRight',
        });
        return;
    };

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise
        .then(data => {
            iziToast.success({
                title: 'OK',
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight',
            });
        })
        .catch(data => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight',
            });
        });
});