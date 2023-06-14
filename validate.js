const userInput = document.querySelector('input[name="user"]');
const descriptionInput = document.querySelector(
  'input[name="user__description"]'
);
const errorMessage = document.querySelector('.form__input-error');
const errorMessage2 = document.querySelector('.form__input-error_des');
const buttonState = document.querySelector('.save__btn');
const form = document.forms.add;
const user = form.elements.user;
const description = form.elements.user__description;

userInput.addEventListener('input', function (event) {
  if (!event.target.validity.valid) {
    errorMessage.classList.add('form__input-error');
    errorMessage.textContent = event.target.validationMessage;
  } else {
    errorMessage.classList.remove('form__input-error');
    errorMessage.textContent = event.target.validationMessage;
  }

  checkFormValidity();
});

descriptionInput.addEventListener('input', function (event) {
  if (!event.target.validity.valid) {
    errorMessage2.classList.add('form__input-error_des');
    errorMessage2.textContent = event.target.validationMessage;
  } else {
    errorMessage2.classList.remove('form__input-error_des');
    errorMessage2.textContent = event.target.validationMessage;
  }

  checkFormValidity();
});

function checkFormValidity() {
  if (user.validity.valid && description.validity.valid) {
    buttonState.disabled = false;
  } else {
    buttonState.disabled = true;
  }
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
});

const nameInput = document.querySelector('input[name="nameImg"]');
const linkInput = document.querySelector('input[name="img_link"]');
const formIm = document.forms.addImg;
const formName = formIm.elements.nameImg;
const formLink = formIm.elements.img_link;
const errorMessageImg = document.querySelector('.form__input-error-name');
const errorMessageLink = document.querySelector('.form__input-error-link');
const buttonStateImg = document.querySelector('.save__btn_add');

nameInput.addEventListener('input', function (event) {
  if (!event.target.validity.valid) {
    errorMessageImg.classList.add('form__input-error-name');
    errorMessageImg.textContent = event.target.validationMessage;
  } else {
    errorMessageImg.classList.remove('form__input-error-name');
    errorMessageImg.textContent = '';
  }

  checkFormImgValidity();
});

linkInput.addEventListener('input', function (event) {
  if (!event.target.validity.valid) {
    errorMessageLink.classList.add('form__input-error-link');
    errorMessageLink.textContent = event.target.validationMessage;
  } else {
    errorMessageLink.classList.remove('form__input-error-link');
    errorMessageLink.textContent = '';
  }

  checkFormImgValidity();
});

function checkFormImgValidity() {
  if (formName.validity.valid && formLink.validity.valid) {
    buttonStateImg.disabled = false;
  } else {
    buttonStateImg.disabled = true;
  }
}

formIm.addEventListener('submit', function (event) {
  event.preventDefault();
  // Дополнительный код для отправки формы или обработки данных
});
