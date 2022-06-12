export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  open() {
    this._popup.classList.remove('popup_fade-out');
    this._popup.classList.add('popup_fade-in');
    setTimeout(()=>{
      this._popup.classList.add('popup_opened');
      }, 10);
    this.setEventListeners();
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
    this._popup.removeEventListener('click', this._closeOnClick);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape'){
      const popupOpened = document.querySelector('.popup_opened');
      this.close(popupOpened);
    }
}

  _closeOnClick = (evt) => {
    const popupOpened = document.querySelector('.popup_opened');
    const popupCloseButton = popupOpened.querySelector('.popup__close-button');
    const popupContainer = popupOpened.querySelector('.popup__container');
  if ((evt.target.classList.contains('popup_opened')) && (evt.target.closest('.popup__container') != popupContainer) || (evt.target.closest('.popup__close-button') == popupCloseButton)) {
      this.close(popupOpened);
    }
  }

//добавляет слушатель иконке закрытия
setEventListeners() {
  this._popup.addEventListener('click', (evt) => {
    this._closeOnClick(evt);
  } );
  document.addEventListener('keydown',(evt) => {
    this._handleEscClose(evt);
  } );
}
}



