import Popup from '../components/Popup.js';

export default class Card {
  //класс создаёт карточку с текстом и ссылкой на изображение
  //принимает в конструктор данные карточки и селектор её template-элемента;
  constructor(data, cardSelector, {handleCardClick}, {deleteClickHandler}, {likeClickHandler}, {resetLikeClickHandler}) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._elementName = this._element.querySelector('.element__name');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._likeCounter = this._element.querySelector('.element__like-number');
    this._numberOfLikes = data.likes;
    this._ownerId = data.owner._id;
    this._deleteClickHandler = deleteClickHandler;
    this._likeClickHandler = likeClickHandler;
    this._resetlikeClickHandler = resetLikeClickHandler
    this._isLiked = this._data.likes.map((el) => el._id).includes('11ab6d8f551dd307035c1b67');

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
    //condition - if card created by me (not initial)
    this._addListeners();
    // Добавим данные
    this._cardImage.src = this._link
    this._cardImage.alt = this._name
    this._elementName.textContent = this._name
    this._likeCounter.textContent = this._numberOfLikes.length.toString()
    // Вернём элемент наружу

    if (this._isLiked) {
      this._likeButton.classList.add("element__like-button_active");
    }

    if (this._ownerId === "11ab6d8f551dd307035c1b67") {
      this._deleteButton.style.display = "grid";
    }

    return this._element;
  }

//устанавливаем слушателей событий:
//здесь нужна стрелочная функция, т.к. она позволяет обратиться к обработчикам через this:

  _getId() {
    return this._data._id;
  }

  _addListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._deleteClickHandler(this._getId());
    });
    this._likeButton.addEventListener('click', () => {
      this._likeHandler(this._getId());
    });
    this._cardImage.addEventListener('click', (evt) => {
      this._handleCardClick(evt);
    });
  };

  _likeHandler(){
    if (this._isLiked) {
      this._resetlikeClickHandler(this._getId());

    } else {
      this._likeClickHandler(this._getId());
    }
  }

  handleElementDelete() {
    // const deletePopuper = new Popup('.popup_delete');
    // deletePopuper.open();
    this._element.remove();
    this._element = null;
  }

  handleSetLike(data) {
    this._likeCounter.textContent = data.likes.length.toString();
    this._likeButton.classList.add("element__like-button_active");
    // const liked = data.likes.map((el) => el._id).includes('11ab6d8f551dd307035c1b67');
    this._isLiked = true;
  }
  handleResetLike(data) {
    this._likeCounter.textContent = data.likes.length.toString();
    this._likeButton.classList.remove("element__like-button_active");
    // const liked = data.likes.map((el) => el._id).includes('11ab6d8f551dd307035c1b67');
    this._isLiked = false;

  }
}
