export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
    this._popupContainer = this._popup.querySelector('.popup__container');
  }
  open() {
    this._popup.classList.remove('popup_fade-out');
    this._popup.classList.add('popup_fade-in');
    setTimeout(()=>{
      this._popup.classList.add('popup_opened');
      }, 10);
    document.addEventListener('keydown',(evt) => {
      this._handleEscClose(evt);
    } );
  }

  close() {
    this._popup.classList.remove('popup_fade-in');
    this._popup.classList.add('popup_fade-out');
    setTimeout(()=>{
      this._popup.classList.remove('popup_opened');
      }, 400);
    document.removeEventListener('keydown', (evt) => {
      _handleEscClose(evt);
    });
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape'){
      this.close();
    }
}

  _closeOnClick = (evt) => {
  if ((evt.target.classList.contains('popup_opened')) && (evt.target.closest('.popup__container') != this._popupContainer) || (evt.target.closest('.popup__close-button') == this._popupCloseButton)) {
      this.close();
    }
  }

//добавляет слушатель иконке закрытия
setEventListeners() {
  this._popup.addEventListener('mousedown', (evt) => {
    this._closeOnClick(evt);
  } );
}
}



