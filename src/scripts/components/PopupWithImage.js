import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  //перезаписать open используя логику полиморфизма
  open(element) {
    this._popupImage.src = element.link;
    this._popupImage.alt = element.place;
    this._popupCaption.textContent = element.place;
    super.open();
  }
}
