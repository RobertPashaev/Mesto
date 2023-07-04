import { Card } from './Card.js';
import { FormValidator } from './validate.js';

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Москва',
    link: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const parentElement = document.querySelector('.elements__grid');

for (let i = 0; i < initialCards.length; i++) {
  const cardData = initialCards[i];
  const card = new Card(cardData);
  const cardElement = card.generateCard();
  parentElement.appendChild(cardElement);
}

// Добавление новой карточки
document.addEventListener('DOMContentLoaded', function () {
  const nameInput = document.querySelector('input[name="nameImg"]');
  const linkInput = document.querySelector('input[name="img_link"]');
  const createButton = document.querySelector('.save__btn_add');

  createButton.addEventListener('click', function (event) {
    event.preventDefault();

    const nameValue = nameInput.value;
    const linkValue = linkInput.value;

    if (nameValue && linkValue) {
      const newCard = {
        name: nameValue,
        link: linkValue,
      };

      const card = new Card(newCard);
      const cardElement = card.generateCard();

      if (parentElement.children.length >= 6) {
        parentElement.lastChild.remove();
      }

      parentElement.insertBefore(cardElement, parentElement.firstChild);

      nameInput.value = '';
      linkInput.value = '';

      document.getElementById('my-modal_add').classList.remove('open');
    }
  });
});

//Закрытие модального окна по клику на оверлей

document.querySelector('.overlay').addEventListener('click', function () {
  document.getElementById('my-modal_add').classList.remove('open');
});

// Закрытие модального окна через Esc
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    document.getElementById('my-modal_add').classList.remove('open');
    document.getElementById('my-modal').classList.remove('open');
  }
});

//Open Edit modal
document.getElementById('btnEdit').addEventListener('click', function () {
  const nameValue = document.getElementById('name-active').textContent;
  const descriptionValue =
    document.getElementById('discription-active').textContent;

  document.querySelector('input[name="user"]').value = nameValue;
  document.querySelector('input[name="user__description"]').value =
    descriptionValue;

  document.getElementById('my-modal').classList.add('open');
});

document.querySelector('.overlayEdit').addEventListener('click', function () {
  document.getElementById('my-modal').classList.remove('open');
});

const overlayModal = document.querySelector('.overlay');
const saveBtn = document.querySelector('.save__btn');
const closeModalBtn = document.getElementById('close-my-modal-btn');

saveBtn.addEventListener('click', () => {
  saveData();
});

const addBtn = document.getElementById('addBtn');
const closeModalBtnAdd = document.getElementById('close-my-modal-btn_add');

//Кнопка открытия модального окна
addBtn.addEventListener('click', function () {
  document.getElementById('my-modal_add').classList.add('open');
});

closeModalBtnAdd.addEventListener('click', function () {
  document.getElementById('my-modal_add').classList.remove('open');
});

closeModalBtn.addEventListener('click', () => {
  event.preventDefault();
  document.getElementById('my-modal').classList.remove('open');
});

function saveData() {
  const nameInput = document.querySelector('input[name="user"]');
  const descriptionInput = document.querySelector(
    'input[name="user__description"]'
  );
  const profileName = document.querySelector('.profile__name');
  const profileDescription = document.querySelector('.discription');

  if (nameInput.validity.valid && descriptionInput.validity.valid) {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;

    document.getElementById('my-modal').classList.remove('open');
  }
  event.preventDefault();
}

const modalContainer = document.getElementById('modal-container');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close-my-modal-btn2');
const trashIcon = document.createElement('div');

function closeModal() {
  modalContainer.style.visibility = 'hidden';
  modalContainer.style.opacity = '0';
}

overlay.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);

trashIcon.classList.add('trash-icon');
trashIcon.style.backgroundImage = "url('/images/Trash.svg')";
