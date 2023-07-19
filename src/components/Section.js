import { Card } from './Card.js';

export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._initialArray = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, prepend = false) {
    if (prepend) {
      this._container.prepend(element);
    } else {
      this._container.appendChild(element);
    }
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      const card = new Card(item);
      const cardElement = card.generateCard();
      this.addItem(cardElement);
    });
  }
}
