import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector('.form-prorile');
  }
  _getInputValues() {
    const obj = {};
    const _inputList = this._form.querySelectorAll('.form__input');
    _inputList.forEach((el) => {
      obj[el.name] = el.value;
    });
    return obj;
  }
  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', async (evt) => {
      evt.preventDefault();
      await this._submit(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
}
