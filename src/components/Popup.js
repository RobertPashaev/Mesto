export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    this._popup.querySelector('.modal').classList.add('open');
    this._popup.addEventListener('click', this._handleOverlayClose);
    // document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    const modalElement = this._popup.querySelector('.modal');
    if (modalElement) {
      modalElement.classList.remove('open');
    }
    this._hideModalContainer();
    // this._popup.removeEventListener('click', this._handleOverlayClose);
    // document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this._hideModalContainer();
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('overlay')) {
      this.close();
      this._hideModalContainer();
    }
  }

  _hideModalContainer() {
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
      modalContainer.style.visibility = 'hidden';
    }
  }

  setEventListener() {
    this._popup.querySelector('.icon_close').addEventListener('click', () => {
      this._hideModalContainer();
      this.close();
    });

    const overlay = document.getElementById('overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        this.close();
      });
    }
  }

  addOpenEventListener(buttonElement) {
    buttonElement.addEventListener('click', () => {
      this.open();
    });
  }
}
