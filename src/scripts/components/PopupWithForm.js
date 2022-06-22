import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormHandler) {
    super(popupSelector);
    this._submitFormHandler = submitFormHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _submitFormHandlerFunction = (evt) => {
    evt.preventDefault();
    this._submitFormHandler(this._getInputValues());
}

  _getInputValues(){
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[ input.name ] = input.value;
    });
    return  this._formValues
  }

  setEventListeners(){
    this._form.addEventListener('submit', this._submitFormHandlerFunction);
    super.setEventListeners();
  }

  close(){;
    this._form.reset();
    super.close();
  }
}
