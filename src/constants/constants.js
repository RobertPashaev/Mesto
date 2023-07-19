import { Popup } from '../components/Popup.js';
import { Section } from '../components/Section.js';
export const parentElement = document.querySelector('.elements__grid');
export const cardList = document.querySelector('.grid-element');
export const editPopup = new Popup('#my-modal');
export const addPopup = new Popup('#my-modal_add');
export const saveBtn = document.querySelector('.save__btn');
export const closeModalBtn = document.getElementById('close-my-modal-btn');
export const addBtn = document.getElementById('addBtn');
export const closeModalBtnAdd = document.getElementById(
  'close-my-modal-btn_add'
);
export const modalContainer = document.getElementById('modal-container');
export const overlay = document.getElementById('overlay');
export const closeBtn = document.getElementById('close-my-modal-btn2');
export const nameInput = document.querySelector('input[name="nameImg"]');
export const linkInput = document.querySelector('input[name="img_link"]');
export const createButton = document.querySelector('.save__btn_add');

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
