'use strict';
const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');
const form = document.querySelector('.form');
const inputUserPhone = form.querySelector('#user-phone');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (navMain.classList.contains('main-nav--opened')) {
      evt.preventDefault();
      navMain.classList.add('main-nav--closed');
      navMain.classList.remove('main-nav--opened');
    }
  }
});

inputUserPhone.addEventListener('invalid', () => {
  console.log(inputUserPhone.validity);
  if (inputUserPhone.validity.valueMissing) {
    inputUserPhone.setCustomValidity('Обязательное поле');
    return;
  }
  if (inputUserPhone.validity.patternMismatch) {
    inputUserPhone.setCustomValidity('Введите число');
    return;
  }
  inputUserPhone.setCustomValidity('');
  // inputUserPhone.reportValidity();
});

const resetForm = () => {
  const inputUserName = form.querySelector('#user-name');
  inputUserName.value = '';
  inputUserPhone.value = '';
  console.log(inputUserName.value);
  console.log(inputUserPhone.value);
};

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  fetchData('https://echo.htmlacademy.ru/',
    {
      method: 'POST',
      body: formData,
    }, () =>
      resetForm());
});

const fetchData = (url, options, onSuccess) => {
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => onSuccess(response));
};
