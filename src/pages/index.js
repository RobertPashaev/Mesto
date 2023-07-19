import './index.css';
import { Card } from '/src/components/Card.js';
import { FormValidator } from '/src/components/validate.js';
import { Section } from '/src/components/Section.js';
import { Popup } from '/src/components/Popup.js';
import { PopupWithForm } from '/src/components/popupWithForm.js';
import { UserInfo } from '/src/components/UserInfo.js';
import { initialCards } from '/src/constants/constants.js';

// Отрисовка секции карточек
const section = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item);
      const cardElement = card.generateCard();
      section.addItem(cardElement);
    },
  },
  '#elements__grid'
);

section.renderItems();

const editPopup = new Popup('[name="add"]');
const addImgPopup = new Popup('[name="addImg"]');
const imgContainer = new Popup('[name="containerImg"]');

editPopup.setEventListener();
addImgPopup.setEventListener();
imgContainer.setEventListener();

const editButton = document.querySelector('.profile__btn_edit');
editPopup.addOpenEventListener(editButton);

const addImgButton = document.querySelector('.profile__btn_add');
addImgPopup.addOpenEventListener(addImgButton);

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

  const newCard = new Card({
    name: imageTitle,
    link: imageUrl,
  });

  deleteLastCard();
  const newCardElement = newCard.generateCard();
  section.addItem(newCardElement, true);

  addImgPopup.close();
  document.querySelector('[name="addImg"]').reset();
});
