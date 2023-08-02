import { Popup } from './Popup.js';

export class UserInfo {
  constructor(userNameSelector, userTitleSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userTitle = document.querySelector(userTitleSelector);
    this._popupEdit = document.querySelector('[name="add"]');
    this._openPopupButton = document.querySelector('.profile__btn_edit');

    this._openPopupButton.addEventListener(
      'click',
      this._handleOpenPopup.bind(this)
    );

    this._popupEdit
      .querySelector('.save__btn')
      .addEventListener('click', this._handleFormSubmit.bind(this));
  }

  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userTitle: this._userTitle.textContent,
    };
  }

  setUserInfo(name, about) {
    this._userName.textContent = name;
    this._userTitle.textContent = about;
  }

  _handleOpenPopup() {
    const { userName, userTitle } = this.getUserInfo();
    const nameInput = this._popupEdit.querySelector('[name="user"]');
    const titleInput = this._popupEdit.querySelector(
      '[name="user__description"]'
    );
    nameInput.value = userName;
    titleInput.value = userTitle;
    // Открывает модальное окно и устанавливает значения инпутов из getUserInfo
  }

  _handleFormSubmit(event) {
    event.preventDefault();

    const nameInput = this._popupEdit.querySelector('[name="user"]');
    const titleInput = this._popupEdit.querySelector(
      '[name="user__description"]'
    );

    const userName = nameInput.value;
    const userTitle = titleInput.value;

    this.setUserInfo(userName, userTitle);
  }
}
