export default class Card {
  //класс создаёт карточку с текстом и ссылкой на изображение
  //принимает в конструктор данные карточки и селектор её template-элемента;
  constructor({place, link}, cardSelector, {handleCardClick}) {
    this._place = place;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._elementName = this._element.querySelector('.element__name');
    this._deleteButton = this._element.querySelector('.element__delete-button');
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
    this._addListeners();
    // Добавим данные
    this._cardImage.src = this._link
    this._cardImage.alt = this._place
    this._elementName.textContent = this._place
    // Вернём элемент наружу
    return this._element;
  }

//устанавливаем слушателей событий:
//здесь нужна стрелочная функция, т.к. она позволяет обратиться к обработчикам через this:

  _addListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._handleDelete();
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });
    this._cardImage.addEventListener('click', (evt) => {
      this._handleCardClick(evt);
    });
  };

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  _handleLike() {
    this._likeButton.classList.toggle('element__like-button_active');
  }
}
