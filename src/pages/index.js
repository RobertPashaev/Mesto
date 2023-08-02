import './index.css';
import { Card } from '/src/components/Card.js';
import { FormValidator } from '/src/components/validate.js';
import { Section } from '/src/components/Section.js';
import { Popup } from '/src/components/Popup.js';
import { PopupWithForm } from '/src/components/popupWithForm.js';
import { UserInfo } from '/src/components/UserInfo.js';
import { initialCards } from '/src/constants/constants.js';
import { Api } from '/src/components/Api.js';
import {
  editPopup,
  addImgPopup,
  imgContainer,
  editAvarat,
} from '/src/constants/constants';
import { saveBtn } from '/src/constants/constants.js';

// Api Setting
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '7d44fa7e-04ef-41d7-b07e-efc6bd06cf53',
    'Content-Type': 'application/json',
  },
});

export { api };

// Загрузка информации о пользователе
api.getUserInfo().then((userInfo) => {
  const userName = document.querySelector('.profile__name');
  const userAbout = document.querySelector('.discription');
  const userAvatar = document.querySelector('.profile__image');

  userName.textContent = userInfo.name;
  userAbout.textContent = userInfo.about;
  userAvatar.src = userInfo.avatar;
});

const userInfoInstance = new UserInfo('.profile__name', '.discription');

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfoInstance.setUserInfo(userData.name, userData.about);
  })
  .catch((error) => {
    console.log(error);
  });

let section;
// Отрисовка секции карточек

api.getInitialCards().then((cards) => {
  section = new Section(
    {
      data: cards.slice(0, 6),
      renderer: (item) => {
        const card = new Card(item, api);
        const cardElement = card.generateCard();
        section.addItem(cardElement);
      },
    },
    '#elements__grid'
  );

  section.renderItems();
});

const avatarBtn = document.querySelector('.profile__avatar');

editPopup.setEventListener();
addImgPopup.setEventListener();
imgContainer.setEventListener();
editAvarat.setEventListener();

editAvarat.addOpenEventListener(avatarBtn);

const editButton = document.querySelector('.profile__btn_edit');
editPopup.addOpenEventListener(editButton);

const addImgButton = document.querySelector('.profile__btn_add');
addImgPopup.addOpenEventListener(addImgButton);

saveBtn.addEventListener('click', () => {
  const userName = document.querySelector('[name="user"]').value;
  const userAbout = document.querySelector('[name="user__description"]').value;

  // Изменение текста кнопки перед началом запроса
  saveBtn.textContent = 'Сохраняю...';

  api
    .updateUserInfo({ name: userName, about: userAbout })
    .then((updatedUserInfo) => {
      userInfo.setUserInfo(updatedUserInfo.name, updatedUserInfo.about);
      editPopup.close();
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    })
    .finally(() => {
      saveBtn.textContent = 'Сохранить';
    });
});

// Создание экземпляра класса UserInfo
const userInfo = new UserInfo('.profile__name', '.discription');

function deleteLastCard() {
  const cards = document.querySelectorAll('.grid__element');
  if (cards.length >= 6) {
    const lastCard = cards[cards.length - 1];
    lastCard.remove();
  }
}

const saveImgButton = document.getElementById('saveImgBtn');

// Обработчик события нажатия кнопки сохранения картинки
saveImgButton.addEventListener('click', () => {
  const imageTitle = document.querySelector('[name="nameImg"]').value;
  const imageUrl = document.querySelector('[name="img_link"]').value;

  // Сначала делаем запрос к API
  api
    .addNewCard({
      name: imageTitle,
      link: imageUrl,
    })
    .then((cardData) => {
      const newCard = new Card(cardData, api);

      deleteLastCard();
      const newCardElement = newCard.generateCard();
      section.addItem(newCardElement, true);
      addImgPopup.close();
      document.querySelector('[name="addImg"]').reset();
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
});

document.querySelector('.profile__avatar').addEventListener('mouseover', () => {
  document.querySelector('.profile__overlay-icon').style.opacity = '1';
});

document.querySelector('.profile__avatar').addEventListener('mouseout', () => {
  document.querySelector('.profile__overlay-icon').style.opacity = '0';
});

document
  .querySelector('.modal_update')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const avatarUrl = document.querySelector('#linAvatar').value;
    console.log(avatarUrl);
    api
      .updateAvatar(avatarUrl)
      .then((data) => {
        document.querySelector('.profile__image').src = data.avatar;
        editAvarat.close();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    document.querySelector('body').classList.add('loaded');
  }, 300);
});
