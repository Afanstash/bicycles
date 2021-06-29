'use strict';
var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var form = document.querySelector('.form');
var inputUserPhone = form.querySelector('#user-phone');
var anchors = document.querySelectorAll('a[href*="#"]');

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

// for (var anchor of anchors) {
//   anchor.addEventListener("click", function(evt) {
//     evt.preventDefault();
//   })
// }

anchors.forEach(function (anchor) {
  anchor.addEventListener('click', function (evt) {
    evt.preventDefault();

    var blockId = anchor.getAttribute('href');
    document.querySelector('' + blockId).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

inputUserPhone.addEventListener('invalid', function () {
  console.log(inputUserPhone.validity);
  if (inputUserPhone.validity.valueMissing) {
    inputUserPhone.setCustomValidity('Обязательное поле');
    return;
  }
  if (inputUserPhone.validity.patternMismatch) {
    inputUserPhone.setCustomValidity('Вводите только числа');
    return;
  }
  inputUserPhone.setCustomValidity('');
});

var resetForm = function () {
  var inputUserName = form.querySelector('#user-name');
  inputUserName.value = '';
  inputUserPhone.value = '';
  console.log(inputUserName.value);
  console.log(inputUserPhone.value);
};

form.addEventListener('submit', function (evt) {
  evt.preventDefault();

  var formData = new FormData(evt.target);

  fetchData('https://echo.htmlacademy.ru/',
      {
        method: 'POST',
        body: formData,
      }, function () {
        resetForm();
      });
});

var fetchData = function (url, options, onSuccess) {
  fetch(url, options)
    .then(function (response) {
      response.json();
    })
    .then(function (response) {
      onSuccess(response);
    });
};
