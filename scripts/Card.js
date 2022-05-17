import {popupImage} from './index.js'
import {popupCaption} from './index.js'
import {openZoomPopup} from './index.js'
export default class Card {
  //класс создаёт карточку с текстом и ссылкой на изображение
  //принимает в конструктор данные карточки и селектор её template-элемента;
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector
  }
//содержит приватные методы, которые работают с разметкой
  _getTemplate() {
    const newItem = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return newItem
  }

  createCard() {
    this._element = this._getTemplate();
    this._addListeners();
    // Добавим данные
    this._element.querySelector('.element__image').src = this._link
    this._element.querySelector('.element__image').alt = this._name
    this._element.querySelector('.element__name').textContent = this._name
    // Вернём элемент наружу
    return this._element;
  }

//устанавливаем слушателей событий:

//здесь нужна стрелочная функция, т.к. она позволяет обратиться к обработчикам через this:

  _addListeners() {
  this._element.querySelector('.element__delete-button').addEventListener('click', () => {
    this._handleDelete();
  });
  this._element.querySelector('.element__like-button').addEventListener('click', () => {
    this._handleLike();
  });
  this._element.querySelector('.element__image').addEventListener('click', () => {
    this._handleOpenImage();
  });
  };

  _handleDelete() {
    this._element.remove();
  }

  _handleLike() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handleOpenImage() {
  popupImage.src = this._element.querySelector('.element__image').src;
  popupImage.alt = this._element.querySelector('.element__image').alt;
  popupCaption.textContent = this._element.querySelector('.element__name').textContent;
  openZoomPopup();
  }
}
