export default class Card {
  constructor(data, userId, cardSelector, {handleCardClick}, {deleteClickHandler}, {likeClickHandler}, {resetLikeClickHandler}) {
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
    this._userId = userId;
    this._deleteClickHandler = deleteClickHandler;
    this._likeClickHandler = likeClickHandler;
    this._resetlikeClickHandler = resetLikeClickHandler;
    this._isLiked = this._data.likes.map((el) => el._id).includes(this._userId);
  }
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
    this._cardImage.src = this._link
    this._cardImage.alt = this._name
    this._elementName.textContent = this._name
    this._likeCounter.textContent = this._numberOfLikes.length.toString()

    if (this._isLiked) {
      this._likeButton.classList.add("element__like-button_active");
    }

    if (this._ownerId === this._userId) {
      this._deleteButton.style.display = "grid";
    }

    return this._element;
  }

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
    this._element.remove();
    this._element = null;
  }

  handleSetLike(data) {
    this._likeCounter.textContent = data.likes.length.toString();
    this._likeButton.classList.add("element__like-button_active");
    this._isLiked = true;
  }
  handleResetLike(data) {
    this._likeCounter.textContent = data.likes.length.toString();
    this._likeButton.classList.remove("element__like-button_active");
    this._isLiked = false;

  }
}
