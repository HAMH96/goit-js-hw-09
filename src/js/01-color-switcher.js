const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let timer = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const colorSwitcher = () => {
  timer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    // colorSwitcher();
  }, 1000);
  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
};

const stopColorSwitcher = () => {
  clearInterval(timer);
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
};

btnStart.addEventListener('click', colorSwitcher);
btnStop.addEventListener('click', stopColorSwitcher);