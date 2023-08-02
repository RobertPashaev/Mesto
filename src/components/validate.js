export class FormValidator {
  constructor(form) {
    this._form = form;
  }

  _showInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling.nextElementSibling;
    inputElement.classList.add('form__input_error');
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = inputElement.nextElementSibling.nextElementSibling;
    inputElement.classList.remove('form__input_error');
    errorElement.textContent = '';
  }

  _toggleButtonState(input) {
    const submitButton = this._form.querySelector('button[type="submit"]');
    const inputs = Array.from(this._form.querySelectorAll('.form__input'));
    const isValid = inputs.every((input) => input.validity.valid);
    if (isValid) {
      submitButton.removeAttribute('disabled');
      submitButton.classList.remove('save__btn_disabled');
      this._hideInputError(input);
    } else {
      submitButton.setAttribute('disabled', true);
      submitButton.classList.add('save__btn_disabled');
      this._showInputError(input);
    }
  }

  _setEventListeners() {
    const inputs = Array.from(this._form.querySelectorAll('.form__input'));
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._toggleButtonState(input);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault(evt);
    });
  }
}

const formElementEdit = document.querySelector('form[name="add"]');
const formElement = document.querySelector('form[name="addImg"]');
const formElementAvatar = document.querySelector('[name=avatarEdit]');

const validatorAvatar = new FormValidator(formElementAvatar);
const validatorEdit = new FormValidator(formElementEdit);
const validatorAdd = new FormValidator(formElement);

validatorAvatar.enableValidation();
validatorAdd.enableValidation();
validatorEdit.enableValidation();
