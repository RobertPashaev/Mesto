export class Card {
  constructor(card) {
    this._name = card.name;
    this._link = card.link;
    this._imageElement = document.querySelector('grid__image');
    this._parentElement = document.querySelector('.elements__grid');
  }

  _getTemplate() {
    const cardElement = document.createElement('div');
    cardElement.classList.add('grid__element');

    const imageElement = document.createElement('img');
    imageElement.classList.add('grid__image');
    imageElement.src = this._link;
    imageElement.alt = 'image';

    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('elements_discription');

    const titleElement = document.createElement('h2');
    titleElement.classList.add('elements__text');
    titleElement.textContent = this._name;

    const likeButton = document.createElement('button');
    likeButton.classList.add('like');

    const trashIcon = document.createElement('div');
    trashIcon.classList.add('trash-icon');
    trashIcon.style.backgroundImage = "url('/images/Trash.svg')";

    descriptionElement.appendChild(trashIcon);
    descriptionElement.appendChild(titleElement);
    descriptionElement.appendChild(likeButton);

    cardElement.appendChild(imageElement);
    cardElement.appendChild(descriptionElement);

    return cardElement;
  }

  setEventListener() {
    const trashIcon = this._element.querySelector('.trash-icon');
    const likeButton = this._element.querySelector('.like');

    trashIcon.addEventListener('click', () => {
      this._element.remove();
    });

    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('liked');
      if (likeButton.classList.contains('liked')) {
        likeButton.style.backgroundImage = "url('/images/Union.svg')";
      } else {
        likeButton.style.backgroundImage = "url('/images/like.svg')";
      }
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this.setEventListener();

    const imageElement = this._element.querySelector('.grid__image');
    imageElement.addEventListener('click', () => {
      const modalContainer = document.getElementById('modal-container');
      const modalImage = document.getElementById('modal-image');
      const imageUrl = this._link;
      modalImage.src = imageUrl;
      modalContainer.style.visibility = 'visible';
      modalContainer.style.opacity = '1';
    });

    return this._element;
  }
}
