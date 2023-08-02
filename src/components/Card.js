import { Api } from './Api.js';

export class Card {
  constructor(card) {
    this._name = card.name;
    this._link = card.link;
    this._id = card._id;
    this._likes = card.likes;
    this._ownerId = card.owner._id; // добавьте эту строку
    this._api = new Api({
      baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
      headers: {
        authorization: '7d44fa7e-04ef-41d7-b07e-efc6bd06cf53',
        'Content-Type': 'application/json',
      },
    });
  }

  _getTemplate() {
    const cardElement = document.createElement('div');
    cardElement.classList.add('grid__element');

    const imageElement = document.createElement('img');
    imageElement.classList.add('grid__image');
    imageElement.src = this._link;
    imageElement.alt = 'image';

    imageElement.onerror = function () {
      cardElement.remove();
    };

    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('elements_discription');

    const titleElement = document.createElement('h2');
    titleElement.classList.add('elements__text');
    titleElement.textContent = this._name;

    this.likeButton = document.createElement('button');
    this.likeButton.classList.add('like');

    this.likeCounter = document.createElement('h3');
    this.likeCounter.classList.add('likes');
    this.likeCounter.textContent = this._likes.length;

    const userId = window.localStorage.getItem('userId');
    if (this._likes.some((like) => like._id === userId)) {
      this.likeButton.classList.add('liked');
      this.likeButton.style.backgroundImage = "url('assets/images/Union.svg')";
    }

    const trashIcon = document.createElement('div');
    trashIcon.classList.add('trash-icon');
    trashIcon.style.display = 'table-row-group'; // скрыть иконку корзины по умолчанию
    trashIcon.style.backgroundImage = "<%= require('./images/Trash.svg') %>";
    descriptionElement.appendChild(trashIcon);

    this._api
      .getUserInfo()
      .then((userInfo) => {
        window.localStorage.setItem('userId', userInfo._id);
      })
      .catch((error) => {
        console.error('Ошибка при получении информации о пользователе:', error);
      });

    if (this._ownerId === userId) {
      trashIcon.style.display = 'block'; // показать иконку корзины, если пользователь является владельцем
      trashIcon.addEventListener('click', () => {
        document.getElementById('deleteModal').classList.add('open');
        document.querySelector('.overlayDelete').style.display = 'block';

        document.querySelector('.accept').addEventListener('click', () => {
          // Вызовите функцию удаления карточки с API здесь
          this._api
            .deleteCard(this._id) // предполагаем, что cardId содержит id карточки
            .then(() => {
              cardElement.remove();
              document.getElementById('deleteModal').classList.remove('open');
              document.querySelector('.overlayDelete').style.display = 'none';
            })
            .catch((err) => {
              console.log(err); // Вывод ошибок
            });
        });
      });
      trashIcon.addEventListener('click', () => {
        document.getElementById('deleteModal').classList.add('open');
        document.querySelector('.overlayDelete').style.display = 'block';

        document.querySelector('.accept').addEventListener('click', () => {
          // Вызовите функцию удаления карточки с API здесь
          this._api
            .deleteCard(this._id) // предполагаем, что cardId содержит id карточки
            .then(() => {
              cardElement.remove();
              document.getElementById('deleteModal').classList.remove('open');
              document.querySelector('.overlayDelete').style.display = 'none';
            })
            .catch((err) => {
              console.log(err); // Вывод ошибок
            });
        });

        const overlay = document.querySelector('.overlayDelete'); // Предполагаем, что оверлей имеет класс 'overlay'
        const closeIcon = document.querySelector('.close-my-modal-btn-delete'); // Предполагаем, что иконка закрытия имеет класс 'closeIcon'

        overlay.addEventListener('click', () => {
          document.getElementById('deleteModal').classList.remove('open');
          document.querySelector('.overlayDelete').style.display = 'none';
        });

        closeIcon.addEventListener('click', () => {
          document.getElementById('deleteModal').classList.remove('open');
          document.querySelector('.overlayDelete').style.display = 'none';
        });
      });
    }

    this.likeButton.appendChild(this.likeCounter);

    descriptionElement.appendChild(titleElement);
    descriptionElement.appendChild(this.likeButton);
    cardElement.appendChild(imageElement);
    cardElement.appendChild(descriptionElement);

    return cardElement;
  }

  handleLike() {
    this.likeButton.addEventListener('click', () => {
      if (this.likeButton.classList.contains('liked')) {
        this.likeButton.style.backgroundImage = "url('assets/images/like.svg')";
        this.likeButton.classList.remove('liked');
        this._api
          .unLikeCard(this._id)
          .then((data) => {
            this._likes = data.likes;
            this.likeCounter.textContent = data.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.likeButton.classList.add('liked');
        this.likeButton.style.backgroundImage =
          "url('assets/images/Union.svg')";
        this._api
          .likeCard(this._id)
          .then((data) => {
            this._likes = data.likes;
            this.likeCounter.textContent = data.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this.handleLike();

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
