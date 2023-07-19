// import { Popup } from './Popup.js';

// export class PopupWithImage extends Popup {
//   constructor(popupSelector) {
//     super(popupSelector);
//     this._image = this._popup.querySelector('.popup__image');
//     this._caption = this._popup.querySelector('.popup__caption');
//   }
//   open(imageLink, imageName) {
//     super.open();
//     const modalCaption = this._popup.querySelector('.modal__caption');
//     const modalImage = this._popup.querySelector('#modal-image');
//     modalCaption.textContent = imageName;
//     modalImage.src = imageLink;
//     modalImage.alt = imageName;
//   }
// }

// export class PopupWithImage {
//   constructor() {
//     this._imageName = document.querySelector('.element__text');
//     this._imageCaption = document.querySelector('.modal__caption');
//   }

//   setCaption() {
//     if (this._imageName && this._imageCaption) {
//       this._imageName.textContent = this._imageCaption.textContent;
//     }
//   }
// }
